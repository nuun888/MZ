/*:-----------------------------------------------------------------------------------
 * NUUN_PreemptiveSurpriseEx.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Preemptive,Surprise EX
 * @author NUUN
 * @version 1.1.0
 * @base NUUN_Base
 * 
 * @help
 * You can define your own formula for preemptive surprise.
 * You can also apply surprise attack in event encounters.
 * 
 * Enter "Comment" on the first page of the enemy group's battle event.
 * <Presur:[id]or[name]>
 * [id]:Preemptive Surprise List ID
 * [name]:Designated Names for the Preemptive Surprise List
 * 
 * Acquisition variable of evaluation expression
 * members:party member
 * troop:enemy group
 * this:BattleManager
 * 
 * Get variable
 * $gameParty.preemptiveCounter:Number of preemptive strikes.
 * $gameParty.surpriseCounter:Number of times you've been caught off guard.
 * 
 * In the case of random encounters, enemy groups without the above tags will be determined by default settings.
 * Event determination is normal processing.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 11/28/2022 Ver.1.1.0
 * Added a function that allows arbitrary scripts to be executed during normal encounters, preemptive attacks, and surprise attacks.
 * Added a switch that can always execute preemptive and surprise attacks.
 * Added a switch to enable preemptive and surprise attacks for events.
 * Added a function that allows you to obtain the number of preemptive strikes and the number of surprise attacks.
 * 7/31/2022 Ver.1.0.0
 * First edition.
 * 
 * @param PreemptiveSurpriseSetting
 * @text Preemptive Surprise Setting
 * @desc Preemptive Surprise Setting.
 * @type struct<PreemptiveSurpriseList>[]
 * @default ["{\"Name\":\"'default'\",\"RandomPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.ratePreemptive();//Default'\\\"}\",\"EventPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"\\\"}\",\"RandomSurpriseSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.rateSurprise() && !preemptive;//Default'\\\"}\",\"EventSurpriseSetting\":\"{\\\"EvalData\\\":\\\"\\\"}\"}","{\"Name\":\"'eventpresur'\",\"RandomPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.ratePreemptive();//Default'\\\"}\",\"EventPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.ratePreemptive();//Default'\\\"}\",\"RandomSurpriseSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.rateSurprise() && !preemptive;//Default'\\\"}\",\"EventSurpriseSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.rateSurprise() && !preemptive;//Default'\\\"}\"}","{\"Name\":\"direction\",\"RandomPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"\\\"}\",\"EventPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"'this.getEventBackDirection();//Event direction contact judgment. Required NUUN_EventPlayerDirection'\\\"}\",\"RandomSurpriseSetting\":\"{\\\"EvalData\\\":\\\"\\\"}\",\"EventSurpriseSetting\":\"{\\\"EvalData\\\":\\\"'this.getPlayerBackDirection() && !preemptive;//Event direction contact judgment. Required NUUN_EventPlayerDirection'\\\"}\"}"]
 * 
 * @param DefaultPreemptive
 * @text Default preemptive condition
 * @desc Enter the default preemptive condition for random encounters. A blank will not trigger a preemptive attack.
 * @type combo
 * @option 'Math.random() < this.ratePreemptive();//Default'
 * @option '$gameSwitches.value(0);//switch'
 * @default 'Math.random() < this.ratePreemptive();'
 * 
 * @param DefaultSurprise
 * @text Default surprise condition
 * @desc Enter the default surprise condition for random encounters. A blank does not cause a surprise attack.
 * @type combo
 * @option 'Math.random() < this.rateSurprise() && !preemptive;//Default'
 * @option 'Math.random() < this.rateSurprise();//No surprise attack disabled'
 * @option '$gameSwitches.value(0);//switch'
 * @default 'Math.random() < this.rateSurprise() && !preemptive;'
 * 
 * @param EventPreSurSwitch
 * @text Event Preemptive Surprise Apply Switch
 * @desc Switch id to apply preemptive surprise from event command.
 * @type switch
 * @default 0
 * 
 * @param PreemptiveSwitch
 * @text Preemptive switch
 * @desc A switch ID that always preemptively attacks.
 * @type switch
 * @default 0
 * 
 * @param SurpriseSwitch
 * @text Surprise switch
 * @desc A switch ID that is always subject to surprise attacks.
 * @type switch
 * @default 0
 * 
 * @param DefaultPresurSprict
 * @text Normal encounter script
 * @desc A script to run during normal encounters. (multiple can be specified)
 * @type combo[]
 * @option 'EncounterEffect.setType(1);//MPP_EncounterEffect Type change'
 * @option 'EncounterEffect.setColor(255,255,255);//MPP_EncounterEffect Color change'
 * @default []
 * 
 * @param PreemptivePresurSprict
 * @text Preemptive script
 * @desc Script to run during preemptive strike. (multiple can be specified)
 * @type combo[]
 * @option 'EncounterEffect.setType(1);//MPP_EncounterEffect Type change'
 * @option 'EncounterEffect.setColor(255,255,255);//MPP_EncounterEffect Color change'
 * @default []
 * 
 * @param SurprisePresurSprict
 * @text Surprise script
 * @desc A script to run when a surprise attack occurs. (multiple can be specified)
 * @type combo[]
 * @option 'EncounterEffect.setType(1);//MPP_EncounterEffect Type change'
 * @option 'EncounterEffect.setColor(255,255,255);//MPP_EncounterEffect Color change'
 * @default []
 * 
 */
/*~struct~PreemptiveSurpriseList:
 * 
 * @param Name
 * @text Name
 * @desc Name.
 * @type string
 * @default
 * 
 * @param RandomPreemptiveSetting
 * @desc Preemptive attack condition setting for random encounter.
 * @text Random encounter preemptive setting
 * @type struct<PreemptiveSetting>
 * @default {"EvalData":""}
 * 
 * @param EventPreemptiveSetting
 * @desc Preemptive attack condition setting at event encounter.
 * @text Event Encounter Preemptive Settings
 * @type struct<PreemptiveSetting>
 * @default {"EvalData":""}
 * 
 * @param RandomSurpriseSetting
 * @desc Surprise condition setting at random encounter.
 * @text Random Encounter Surprise Settings
 * @type struct<SurpriseSetting>
 * @default {"EvalData":""}
 * 
 * @param EventSurpriseSetting
 * @desc Surprise condition setting at event encounter.
 * @text Event Encounter Surprise Settings
 * @type struct<SurpriseSetting>
 * @default {"EvalData":""}
 * 
 */
/*~struct~PreemptiveSetting:
 * 
 * @param EvalData
 * @text Evaluation formula
 * @desc Evaluation formula
 * @type combo
 * @option 'Math.random() < this.ratePreemptive();//Default'
 * @option '$gameSwitches.value(0);//Switch'
 * @option 'this.getEventBackDirection();//Event direction contact judgment. Required NUUN_EventPlayerDirection'
 * @default 
 * 
 */
/*~struct~SurpriseSetting:
 * 
 * @param EvalData
 * @text 評価式
 * @desc 評価式
 * @type combo
 * @option 'Math.random() < this.rateSurprise() && !preemptive;//Default'
 * @option 'Math.random() < this.rateSurprise();//No surprise attack disabled'
 * @option '$gameSwitches.value(0);//Switch'
 * @option 'this.getPlayerBackDirection() && !preemptive;//Event direction contact judgment. Required NUUN_EventPlayerDirection'
 * @default
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 先制、不意打ちEX
 * @author NUUN
 * @version 1.1.0
 * @base NUUN_Base
 * 
 * @help
 * 先制不意打ちを独自の式で定義できます。
 * またイベントでのエンカウントでも先制不意打ちを適用することができます。
 * 
 * 敵グループのバトルイベントの１ページ目に注釈(Comment)で記入
 * <Presur:[id]or[name]>
 * [id]:先制不意打ちのリストID
 * [name]:先制不意打ちリストの指定の名称
 * 
 * 評価式の取得変数
 * members:パーティメンバー
 * troop:敵グループ
 * this:BattleManager
 * 
 * 取得変数
 * $gameParty.preemptiveCounter:先制攻撃した回数。
 * $gameParty.surpriseCounter:不意打ちされた回数。
 * 
 * ランダムエンカウントの場合上記のタグがない敵グループはデフォルト設定の判定になります。  
 * イベント判定では通常の処理になります。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/11/28 Ver.1.1.0
 * 通常エンカウント時、先制時、不意打ち時に任意のスクリプトを実行できる機能を追加。
 * 必ず先制、不意打ちを実行できるスイッチを追加。
 * イベントの先制、不意打ちを有効にできるスイッチを追加。
 * 先制された回数、不意打ちされた回数を取得できる機能を追加。
 * 2022/7/31 Ver.1.0.0
 * 初版
 * 
 * @param PreemptiveSurpriseSetting
 * @text 先制不意打ち設定
 * @desc 先制不意打ち設定
 * @type struct<PreemptiveSurpriseList>[]
 * @default ["{\"Name\":\"'default'\",\"RandomPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.ratePreemptive();//Default'\\\"}\",\"EventPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"\\\"}\",\"RandomSurpriseSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.rateSurprise() && !preemptive;//Default'\\\"}\",\"EventSurpriseSetting\":\"{\\\"EvalData\\\":\\\"\\\"}\"}","{\"Name\":\"'eventpresur'\",\"RandomPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.ratePreemptive();//Default'\\\"}\",\"EventPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.ratePreemptive();//Default'\\\"}\",\"RandomSurpriseSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.rateSurprise() && !preemptive;//Default'\\\"}\",\"EventSurpriseSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.rateSurprise() && !preemptive;//Default'\\\"}\"}","{\"Name\":\"direction\",\"RandomPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"\\\"}\",\"EventPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"'this.getEventBackDirection();//Event direction contact judgment. Required NUUN_EventPlayerDirection'\\\"}\",\"RandomSurpriseSetting\":\"{\\\"EvalData\\\":\\\"\\\"}\",\"EventSurpriseSetting\":\"{\\\"EvalData\\\":\\\"'this.getPlayerBackDirection() && !preemptive;//Event direction contact judgment. Required NUUN_EventPlayerDirection'\\\"}\"}"]
 * 
 * @param DefaultPreemptive
 * @text デフォルト先制条件
 * @desc ランダムエンカウント時のデフォルトの先制条件を記入します。空白で先制攻撃は発生しません。
 * @type combo
 * @option 'Math.random() < this.ratePreemptive();//デフォルト'
 * @option '$gameSwitches.value(0);//スイッチ'
 * @default 'Math.random() < this.ratePreemptive();'
 * 
 * @param DefaultSurprise
 * @text デフォルト不意打ち条件
 * @desc ランダムエンカウント時のデフォルトの不意打ち条件を記入します。空白で不意打ちは発生しません。
 * @type combo
 * @option 'Math.random() < this.rateSurprise() && !preemptive;//デフォルト'
 * @option 'Math.random() < this.rateSurprise();//不意打ち無効なし'
 * @option '$gameSwitches.value(0);//スイッチ'
 * @default 'Math.random() < this.rateSurprise() && !preemptive;'
 * 
 * @param EventPreSurSwitch
 * @text イベント先制不意打ち適用スイッチ
 * @desc イベントコマンドからの先制不意打ちを適用するスイッチID
 * @type switch
 * @default 0
 * 
 * @param PreemptiveSwitch
 * @text 先制スイッチ
 * @desc 必ず先制するスイッチID
 * @type switch
 * @default 0
 * 
 * @param SurpriseSwitch
 * @text 不意打ちスイッチ
 * @desc 必ず不意打ちを受けるスイッチID
 * @type switch
 * @default 0
 * 
 * @param DefaultPresurSprict
 * @text 通常エンカウントスクリプト
 * @desc 通常のエンカウント時に実行するスクリプト。(複数指定可能)
 * @type combo[]
 * @option 'EncounterEffect.setType(1);//MPP_EncounterEffectタイプ変更'
 * @option 'EncounterEffect.setColor(255,255,255);//MPP_EncounterEffectカラー変更'
 * @default []
 * 
 * @param PreemptivePresurSprict
 * @text 先制時スクリプト
 * @desc 先制攻撃時に実行するスクリプト。(複数指定可能)
 * @type combo[]
 * @option 'EncounterEffect.setType(1);//MPP_EncounterEffectタイプ変更'
 * @option 'EncounterEffect.setColor(255,255,255);//MPP_EncounterEffectカラー変更'
 * @default []
 * 
 * @param SurprisePresurSprict
 * @text 不意打ちスクリプト
 * @desc 不意打ち時に実行するスクリプト。(複数指定可能)
 * @type combo[]
 * @option 'EncounterEffect.setType(1);//MPP_EncounterEffectタイプ変更'
 * @option 'EncounterEffect.setColor(255,255,255);//MPP_EncounterEffectカラー変更'
 * @default []
 * 
 */
/*~struct~PreemptiveSurpriseList:ja
 * 
 * @param Name
 * @text 名称
 * @desc 名称
 * @type string
 * @default
 * 
 * @param RandomPreemptiveSetting
 * @desc ランダムエンカウント時の先制攻撃条件設定
 * @text ランダムエンカウント先制設定
 * @type struct<PreemptiveSetting>
 * @default {"EvalData":""}
 * 
 * @param EventPreemptiveSetting
 * @desc イベントエンカウント時の先制攻撃条件設定
 * @text イベントエンカウント先制設定
 * @type struct<PreemptiveSetting>
 * @default {"EvalData":""}
 * 
 * @param RandomSurpriseSetting
 * @desc ランダムエンカウント時の不意打ち条件設定
 * @text ランダムエンカウント不意打ち設定
 * @type struct<SurpriseSetting>
 * @default {"EvalData":""}
 * 
 * @param EventSurpriseSetting
 * @desc イベントエンカウント時の不意打ち条件設定
 * @text イベントエンカウント不意打ち設定
 * @type struct<SurpriseSetting>
 * @default {"EvalData":""}
 * 
 */
/*~struct~PreemptiveSetting:ja
 * 
 * @param EvalData
 * @text 評価式
 * @desc 評価式
 * @type combo
 * @option 'Math.random() < this.ratePreemptive();//デフォルト'
 * @option '$gameSwitches.value(0);//スイッチ'
 * @option 'this.getEventBackDirection();//イベント背後接触 要NUUN_EventPlayerDirection'
 * @default 
 * 
 */
/*~struct~SurpriseSetting:ja
 * 
 * @param EvalData
 * @text 評価式
 * @desc 評価式
 * @type combo
 * @option 'Math.random() < this.rateSurprise() && !preemptive;//デフォルト'
 * @option 'Math.random() < this.rateSurprise();//不意打ち無効なし'
 * @option '$gameSwitches.value(0);//スイッチ'
 * @option 'this.getPlayerBackDirection() && !preemptive;//プレイヤー背後接触 要NUUN_EventPlayerDirection'
 * @default
 * 
 */

var Imported = Imported || {};
Imported.NNUUN_PreemptiveSurpriseEx = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_PreemptiveSurpriseEx');
    const PreemptiveSurpriseSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PreemptiveSurpriseSetting'])) : null) || [];
    const DefaultPreemptive = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefaultPreemptive'])) : null);
    const DefaultSurprise = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefaultSurprise'])) : null);
    const EventPreSurSwitch = Number(parameters['EventPreSurSwitch'] || 0);
    const PreemptiveSwitch = Number(parameters['PreemptiveSwitch'] || 0);
    const SurpriseSwitch = Number(parameters['SurpriseSwitch'] || 0);
    const DefaultPresurSprict = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefaultPresurSprict'])) : null) || [];
    const PreemptivePresurSprict = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PreemptivePresurSprict'])) : null) || [];
    const SurprisePresurSprict = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SurprisePresurSprict'])) : null) || [];

    const _BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _BattleManager_initMembers.call(this);
        this._tempPreemptive = false;
        this._tempSurprise = false;
    };

    const _BattleManager_setup = BattleManager.setup;
    BattleManager.setup = function(troopId, canEscape, canLose) {
        _BattleManager_setup.call(this, troopId, canEscape, canLose);
        this.customOnEncounter();
    };

    const _BattleManager_customOnEncounter = BattleManager.customOnEncounter;
    BattleManager.customOnEncounter = function() {
        let preemptive = false;
        let surprise = false;
        if ($gameSwitches.value(PreemptiveSwitch)) {
            preemptive = true;
        }
        if ($gameSwitches.value(SurpriseSwitch)) {
            preemptive = false;
            surprise = true;
        }
        if (preemptive || surprise) {
            this._tempPreemptive = preemptive;
            this._tempSurprise = surprise;
        } else {
            const tagData = $gameTroop.getPresurCommentTag();
            if (tagData) {
                const members = $gameParty;
                const troop = $gameTroop;
                const data = isNaN(tagData) ? PreemptiveSurpriseSetting.find(a => tagData === a.Name) : PreemptiveSurpriseSetting[Number(tagData) - 1];
                if ($gameTemp.onEventEncounter) {
                    preemptive = data.EventPreemptiveSetting && data.EventPreemptiveSetting.EvalData ? eval(data.EventPreemptiveSetting.EvalData) : false;
                    surprise = !preemptive && data.EventSurpriseSetting && data.EventSurpriseSetting.EvalData ? eval(data.EventSurpriseSetting.EvalData) : false;
                } else {
                    preemptive = data.RandomPreemptiveSetting && data.RandomPreemptiveSetting.EvalData ? eval(data.RandomPreemptiveSetting.EvalData) : (DefaultPreemptive ? eval(DefaultPreemptive) : false);
                    surprise = !preemptive && data.RandomSurpriseSetting && data.RandomSurpriseSetting.EvalData ? eval(data.RandomSurpriseSetting.EvalData) : (DefaultSurprise ? eval(DefaultSurprise) : false);
                }
            } else {
                if (!$gameTemp.onEventEncounter) {
                    preemptive = DefaultPreemptive ? eval(DefaultPreemptive) : this.onDefaultPreemptive();
                    surprise = !preemptive && (DefaultSurprise ? eval(DefaultSurprise) : this.onDefaultSurprise());
                }
            }
            this._tempPreemptive = preemptive;
            this._tempSurprise = surprise;
        }
        this.presurEncounterSprict();
    };

    BattleManager.onEncounter = function() {//再定義
        this._preemptive = this._tempPreemptive;
        this._surprise = this._tempSurprise;
        if (this._preemptive) {
            if (!$gameParty.preemptiveCounter) {
                $gameParty.preemptiveCounter = 0;
            }
            $gameParty.preemptiveCounter++;
        } else if (this._surprise) {
            if (!$gameParty.surpriseCounter) {
                $gameParty.surpriseCounter = 0;
            }
            $gameParty.surpriseCounter++;
        }
    };

    BattleManager.presurEncounterSprict = function() {
        if (this._tempPreemptive) {
            this.presurEncounterScriptExecution(PreemptivePresurSprict, $gameParty, $gameTroop);
        } else if (this._tempSurprise) {
            this.presurEncounterScriptExecution(SurprisePresurSprict, $gameParty, $gameTroop);
        } else {
            this.presurEncounterScriptExecution(DefaultPresurSprict, $gameParty, $gameTroop);
        }
    };

    BattleManager.presurEncounterScriptExecution = function(list) {
        const members = $gameParty;
        const troop = $gameTroop;
        list.forEach(data => eval(data));
    };

    Game_Troop.prototype.getPresurCommentTag = function() {
        const re = /<(?:Presur):\s*(.*)>/;
        let presur = null;
        const pages = this.troop().pages[0];
        pages.list.forEach(tag => {
            if (tag.code === 108 || tag.code === 408) {
                let match = re.exec(tag.parameters[0]);
                if (match) {
                    presur = match[1];
                }
            }
        });
        return presur;
    };

    const _Game_Interpreter_command301 = Game_Interpreter.prototype.command301;
    Game_Interpreter.prototype.command301 = function(params) {
        $gameTemp.onEventEncounter = true;
        const result = _Game_Interpreter_command301.call(this, params);
        if (!$gameParty.inBattle() && (EventPreSurSwitch === 0 || $gameSwitches.value(EventPreSurSwitch))) {
            BattleManager.onEncounter();
        }
        $gameTemp.onEventEncounter = false;
        return result;
    };

})();