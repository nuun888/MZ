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
 * @version 1.2.0
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
 * PreemptiveSE,SurpriseSE
 * During normal battle, preemptive attack, surprise attack, you can play the SE at the start of any battle.
 * If the surprise attack start SE file is not set during the preemptive surprise attack setting, the surprise attack start SE SE will be played during the default preemptive attack.
 * In addition, during the default preemptive attack, if the file name is not specified even in the surprise battle start SE, the normal battle start SE will be played.
 * 
 * plugin command
 * EventPresurMode
 * Enable preemptive surprise attack if a battle is spawned from an event.
 * Please specify the ID of "PreemptiveSurpriseSetting".
 * The tag settings you fill in for each enemy group will take precedence.
 * It will be initialized after the preemptive surprise attack process.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/4/2023 Ver.1.3.0
 * Added a function that allows you to immediately execute a specified common event when encountering.
 * 1/29/2023 Ver.1.2.0
 * Added a function to enable preemptive surprise attack from an event with a plug-in command.
 * 12/2/2022 Ver.1.1.1
 * Fixed an issue where some of the default evaluators for normal encounters were not fetchable.
 * Added a function that allows you to set the battle start SE for normal, preemptive attack, and surprise attacks.
 * Processing fixes.
 * 11/28/2022 Ver.1.1.0
 * Added a function that allows arbitrary scripts to be executed during normal encounters, preemptive attacks, and surprise attacks.
 * Added a switch that can always execute preemptive and surprise attacks.
 * Added a switch to enable preemptive and surprise attacks for events.
 * Added a function that allows you to obtain the number of preemptive strikes and the number of surprise attacks.
 * 7/31/2022 Ver.1.0.0
 * First edition.
 * 
 * @command EventPresurMode
 * @desc Enables first strike in combat from the event.
 * @text Event preemptive surprise enabled
 * 
 * @arg SurpriseId
 * @text Preemptive surprise setting ID
 * @desc Specifies the list ID of the preemptive surprise setting.
 * @type number
 * @default 0
 * 
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
 * @param PreemptiveSE
 * @text Default preemptive attack battle start SE
 * @desc Battle start SE at the time of default preemptive attack.
 * @type struct<BattleStartSe>
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 * 
 * @param SurpriseSE
 * @text Default surprise attack battle start SE
 * @desc Battle start SE when receiving a default surprise attack.
 * @type struct<BattleStartSe>
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
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
 * @option '$gameTemp.reserveCommonEvent(0);//Common event'
 * @default []
 * 
 * @param SurprisePresurSprict
 * @text Surprise script
 * @desc A script to run when a surprise attack occurs. (multiple can be specified)
 * @type combo[]
 * @option 'EncounterEffect.setType(1);//MPP_EncounterEffect Type change'
 * @option 'EncounterEffect.setColor(255,255,255);//MPP_EncounterEffect Color change'
 * @option '$gameTemp.reserveCommonEvent(0);//Common event'
 * @default []
 * 
 * @param DefaultPresurCommonEvent
 * @desc A common event that runs on normal encounters.
 * @text Normal encounter execution common event
 * @type common_event
 * @default 0
 * 
 * @param PreemptiveCommonEvent
 * @desc A common event that executes on a First Strike encounter.
 * @text Execute Common Event on First Strike Encounter
 * @type common_event
 * @default 0
 * 
 * @param SurpriseCommonEvent
 * @desc A common event that executes when you encounter a surprise attack.
 * @text Execute common event when surprise encounter
 * @type common_event
 * @default 0
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
 * @param PreemptiveSE
 * @text Battle start SE during preemptive attack
 * @desc Battle start SE at the time of preemptive attack.
 * @type struct<BattleStartSe>
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 * 
 * @param SurpriseSE
 * @text Battle start SE when attacking by surprise
 * @desc Battle start SE when receiving a surprise attack.
 * @type struct<BattleStartSe>
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
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
 * @text Evaluation formula
 * @desc Evaluation formula.
 * @type combo
 * @option 'Math.random() < this.rateSurprise() && !preemptive;//Default'
 * @option 'Math.random() < this.rateSurprise();//No surprise attack disabled'
 * @option '$gameSwitches.value(0);//Switch'
 * @option 'this.getPlayerBackDirection() && !preemptive;//Event direction contact judgment. Required NUUN_EventPlayerDirection'
 * @default
 * 
 */
/*~struct~BattleStartSe:
 * 
 * @param name
 * @text SE file name
 * @desc Specify SE.
 * @type file
 * @dir audio/se
 * 
 * @param volume
 * @text SE volume
 * @desc Set the volume to SE.
 * @default 90
 * @min 0
 * 
 * @param pitch
 * @text SE pitch
 * @desc Sets the pitch to SE.
 * @default 100
 * 
 * @param pan
 * @text SE pan
 * @desc Sets the pan to SE.
 * @default 0
 * @max 100
 * @min -100
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 先制、不意打ちEX
 * @author NUUN
 * @version 1.3.0
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
 * 先制攻撃時戦闘開始SE、不意打ち時戦闘開始SE
 * 通常の戦闘時、先制攻撃時、不意打ち時に任意の戦闘開始時のSEを再生できます。
 * 先制不意打ち設定の先制攻撃時、不意打ち戦闘開始SEのファイルが設定されていない場合はデフォルト先制攻撃時、不意打ち戦闘開始SE
 * のSEが再生されます。
 * なお、デフォルト先制攻撃時、不意打ち戦闘開始SEでもファイル名が指定されていない場合は通常の戦闘開始SEが再生されます。
 * 
 * プラグインコマンド
 * イベント先制不意打ち有効
 * イベントから戦闘を発生された場合、先制不意打ちを有効にします。
 * 先制不意打ち設定のIDを指定してください。
 * 各敵グループに記入したタグの設定が優先されます。
 * 先制不意打ち処理後に初期化されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/7/4 Ver.1.3.0
 * エンカウント時に指定のコモンイベントを即時実行できる機能を追加。
 * 2023/1/29 Ver.1.2.0
 * プラグインコマンドでイベントからの戦闘時先制不意打ちを有効にする機能を追加。
 * 2022/12/2 Ver.1.1.1
 * 通常のエンカウント時のデフォルト評価式の一部が、取得できなかった問題を修正。
 * 通常時、先制攻撃時、不意打ち時の戦闘開始SEを設定できる機能を追加。
 * 処理の修正。
 * 2022/11/28 Ver.1.1.0
 * 通常エンカウント時、先制時、不意打ち時に任意のスクリプトを実行できる機能を追加。
 * 必ず先制、不意打ちを実行できるスイッチを追加。
 * イベントの先制、不意打ちを有効にできるスイッチを追加。
 * 先制された回数、不意打ちされた回数を取得できる機能を追加。
 * 2022/7/31 Ver.1.0.0
 * 初版
 * 
 * @command EventPresurMode
 * @desc イベントからの戦闘で先制不意打ちを有効にします。
 * @text イベント先制不意打ち有効
 * 
 * @arg SurpriseId
 * @text 先制不意打ち設定ID
 * @desc 先制不意打ち設定のリストIDを指定します。
 * @type number
 * @default 0
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
 * @param PreemptiveSE
 * @text デフォルト先制攻撃時戦闘開始SE
 * @desc デフォルトの先制攻撃時の戦闘開始SE
 * @type struct<BattleStartSe>
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 * 
 * @param SurpriseSE
 * @text デフォルト不意打ち時戦闘開始SE
 * @desc デフォルトの不意打ちを受けた時の戦闘開始SE
 * @type struct<BattleStartSe>
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
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
 * @option '$gameTemp.reserveCommonEvent(0);//コモンイベント'
 * @default []
 * 
 * @param PreemptivePresurSprict
 * @text 先制時スクリプト
 * @desc 先制攻撃時に実行するスクリプト。(複数指定可能)
 * @type combo[]
 * @option 'EncounterEffect.setType(1);//MPP_EncounterEffectタイプ変更'
 * @option 'EncounterEffect.setColor(255,255,255);//MPP_EncounterEffectカラー変更'
 * @option '$gameTemp.reserveCommonEvent(0);//コモンイベント'
 * @default []
 * 
 * @param SurprisePresurSprict
 * @text 不意打ちスクリプト
 * @desc 不意打ち時に実行するスクリプト。(複数指定可能)
 * @type combo[]
 * @option 'EncounterEffect.setType(1);//MPP_EncounterEffectタイプ変更'
 * @option 'EncounterEffect.setColor(255,255,255);//MPP_EncounterEffectカラー変更'
 * @option '$gameTemp.reserveCommonEvent(0);//コモンイベント'
 * @default []
 * 
 * @param DefaultPresurCommonEvent
 * @desc 通常エンカウント時に実行するコモンイベント。
 * @text 通常エンカウント時実行コモンイベント
 * @type common_event
 * @default 0
 * 
 * @param PreemptiveCommonEvent
 * @desc 先制攻撃エンカウント時に実行するコモンイベント。
 * @text 先制攻撃エンカウント時実行コモンイベント
 * @type common_event
 * @default 0
 * 
 * @param SurpriseCommonEvent
 * @desc 不意打ちエンカウント時に実行するコモンイベント。
 * @text 不意打ちエンカウント時実行コモンイベント
 * @type common_event
 * @default 0
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
 * @param PreemptiveSE
 * @text 先制攻撃時戦闘開始SE
 * @desc 先制攻撃時の戦闘開始SE
 * @type struct<BattleStartSe>
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 * 
 * @param SurpriseSE
 * @text 不意打ち時戦闘開始SE
 * @desc 不意打ちを受けた時の戦闘開始SE
 * @type struct<BattleStartSe>
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
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
/*~struct~BattleStartSe:ja
 * 
 * @param name
 * @text SEファイル
 * @desc SEを指定します。
 * @type file
 * @dir audio/se
 * 
 * @param volume
 * @text SEの音量
 * @desc SEを音量を設定します。
 * @default 90
 * @min 0
 * 
 * @param pitch
 * @text SEのピッチ
 * @desc SEをピッチを設定します。
 * @default 100
 * 
 * @param pan
 * @text SEの位相
 * @desc SEを位相を設定します。
 * @default 0
 * @max 100
 * @min -100
 * 
 */

var Imported = Imported || {};
Imported.NNUUN_PreemptiveSurpriseEx = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_PreemptiveSurpriseEx');
    const PreemptiveSurpriseSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PreemptiveSurpriseSetting'])) : null) || [];
    const DefaultPreemptive = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefaultPreemptive'])) : null);
    const DefaultSurprise = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefaultSurprise'])) : null);
    const PreemptiveSE = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PreemptiveSE'])) : null);
    const SurpriseSE = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SurpriseSE'])) : null);
    const EventPreSurSwitch = Number(parameters['EventPreSurSwitch'] || 0);
    const PreemptiveSwitch = Number(parameters['PreemptiveSwitch'] || 0);
    const SurpriseSwitch = Number(parameters['SurpriseSwitch'] || 0);
    const DefaultPresurSprict = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefaultPresurSprict'])) : null) || [];
    const PreemptivePresurSprict = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PreemptivePresurSprict'])) : null) || [];
    const SurprisePresurSprict = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SurprisePresurSprict'])) : null) || [];
    const DefaultPresurCommonEvent = Number(parameters['DefaultPresurCommonEvent'] || 0);
    const PreemptiveCommonEvent = Number(parameters['PreemptiveCommonEvent'] || 0);
    const SurpriseCommonEvent = Number(parameters['SurpriseCommonEvent'] || 0);

    const pluginName = "NUUN_PreemptiveSurpriseEx";
    let _eventPresurMode = 0;

    PluginManager.registerCommand(pluginName, 'EventPresurMode', args => {
        _eventPresurMode = Number(args.SurpriseId);
    });

    const _BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        this.presurSE = false;
        this._tempPreemptive = false;
        this._tempSurprise = false;
        this._presurInterpreter = null;
        _BattleManager_initMembers.call(this);
    };

    const _BattleManager_setup = BattleManager.setup;
    BattleManager.setup = function(troopId, canEscape, canLose) {
        _BattleManager_setup.call(this, troopId, canEscape, canLose);
        this.customOnEncounter();
        if (Imported.NUUN_BattleTroopBGM) {
            $gameTroop.battleBGMSetup();
        }
    };

    BattleManager.customOnEncounter = function() {
        const members = $gameParty;
        const troop = $gameTroop;
        let preemptive = false;
        let surprise = false;
        if ($gameSwitches.value(PreemptiveSwitch)) {
            preemptive = true;
        }
        if ($gameSwitches.value(SurpriseSwitch)) {
            preemptive = false;
            surprise = true;
        }
        const tagData = $gameTroop.getPresurCommentTag();
        if (tagData || _eventPresurMode > 0) {
            let data = null;
            if (tagData) {
                data = isNaN(tagData) ? PreemptiveSurpriseSetting.find(a => tagData === a.Name) : PreemptiveSurpriseSetting[Number(tagData) - 1];
            } else if ($gameTemp.onEventEncounter) {
                data = PreemptiveSurpriseSetting[_eventPresurMode - 1];
            }
            if (preemptive || surprise) {
                //this._tempPreemptive = preemptive;
                //this._tempSurprise = surprise;
            } else {
                if ($gameTemp.onEventEncounter) {
                    preemptive = data && data.EventPreemptiveSetting && data.EventPreemptiveSetting.EvalData ? eval(data.EventPreemptiveSetting.EvalData) : false;
                    surprise = !preemptive && data && data.EventSurpriseSetting && data.EventSurpriseSetting.EvalData ? eval(data.EventSurpriseSetting.EvalData) : false;
                } else {
                    preemptive = data && data.RandomPreemptiveSetting && data.RandomPreemptiveSetting.EvalData ? eval(data.RandomPreemptiveSetting.EvalData) : (DefaultPreemptive ? eval(DefaultPreemptive) : false);
                    surprise = !preemptive && data && data.RandomSurpriseSetting && data.RandomSurpriseSetting.EvalData ? eval(data.RandomSurpriseSetting.EvalData) : (DefaultSurprise ? eval(DefaultSurprise) : false);
                }
            }
            this.setPresurSe(preemptive, surprise, data);
        } else {
            if (preemptive || surprise) {
                //this._tempPreemptive = preemptive;
                //this._tempSurprise = surprise;
            } else {
                if (!$gameTemp.onEventEncounter) {
                    preemptive = DefaultPreemptive ? eval(DefaultPreemptive) : this.onDefaultPreemptive();
                    surprise = !preemptive && (DefaultSurprise ? eval(DefaultSurprise) : this.onDefaultSurprise());
                }
            }
            this.setPresurSe(preemptive, surprise);
        }
        this._tempPreemptive = preemptive;
        this._tempSurprise = surprise;
        _eventPresurMode = 0;
        this.presurEncounterSprict();
        this.presurEncounterCommonEvent();
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

    BattleManager.setPresurSe = function(preemptive, surprise, data) {
        if (data) {
            if (preemptive) {
                this.presurSE = data.PreemptiveSE && data.PreemptiveSE.name ? data.PreemptiveSE : PreemptiveSE;
            } else if (surprise) {
                this.presurSE = data.SurpriseSE && data.SurpriseSE.name ? data.SurpriseSE : SurpriseSE;
            }
        } else {
            if (preemptive) {
                this.presurSE = PreemptiveSE;
            } else if (surprise) {
                this.presurSE = SurpriseSE;
            }
        }
    };

    BattleManager.presurEncounterCommonEvent = function() {console.log()
        if (this._tempPreemptive) {
            this.preemptiveEncounterCommon();
        } else if (this._tempSurprise) {
            this.surpriseEncounterCommon();
        } else {
            this.defaultEncounterCommon();
        }
        this._presurInterpreter = null;
    };

    BattleManager.presurEncounterSprict = function() {
        if (this._tempPreemptive) {
            this.presurEncounterScriptExecution(PreemptivePresurSprict);
        } else if (this._tempSurprise) {
            this.presurEncounterScriptExecution(SurprisePresurSprict);
        } else {
            this.presurEncounterScriptExecution(DefaultPresurSprict);
        }
    };

    BattleManager.presurEncounterScriptExecution = function(list) {
        const members = $gameParty;
        const troop = $gameTroop;
        list.forEach(data => eval(data));
    };

    BattleManager.preemptiveEncounterCommon = function() {
        if (PreemptiveCommonEvent > 0) {
            this.setupBsEXCommon(PreemptiveCommonEvent);
        }
    };

    BattleManager.surpriseEncounterCommon = function() {
        if (SurpriseCommonEvent > 0) {
            this.setupBsEXCommon(SurpriseCommonEvent);
        }
    };

    BattleManager.defaultEncounterCommon = function() {
        if (DefaultPresurCommonEvent > 0) {
            this.setupBsEXCommon(DefaultPresurCommonEvent);
        }
    };

    BattleManager.presurEncounterCommon = function(id) {
        const commonEvent = $dataCommonEvents[id];
        if (commonEvent) {
            const eventId = 0;
            if (!this._presurInterpreter) {
                this._presurInterpreter = new Game_Interpreter();
            }
            this._presurInterpreter.setup(commonEvent.list, eventId);
            this._presurInterpreter.update();
        }
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

    const _SoundManager_playBattleStart = SoundManager.playBattleStart;
    SoundManager.playBattleStart = function() {
        if (BattleManager.presurSE && BattleManager.presurSE.name) {
            AudioManager.playStaticSe(BattleManager.presurSE);
        } else {
            _SoundManager_playBattleStart.call(this);
        }
    };

})();