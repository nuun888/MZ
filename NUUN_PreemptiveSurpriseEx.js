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
 * @plugindesc 先制、不意打ち独自定義
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_EventRange
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
 * ランダムエンカウントの場合上記のタグがない敵グループはデフォルト設定の判定になります。  
 * イベント判定では通常の処理になります。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/7/31 Ver.1.0.0
 * 初版
 * 
 * @param PreemptiveSurpriseSetting
 * @text 先制不意打ち設定
 * @desc 先制不意打ち設定
 * @type struct<PreemptiveSurpriseList>[]
 * @default ["{\"Name\":\"'default'\",\"RandomPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.ratePreemptive();//デフォルト'\\\"}\",\"EventPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"\\\"}\",\"RandomSurpriseSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.rateSurprise() && !this._preemptive;//デフォルト'\\\"}\",\"EventSurpriseSetting\":\"{\\\"EvalData\\\":\\\"\\\"}\"}","{\"Name\":\"'eventpresur'\",\"RandomPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.ratePreemptive();//デフォルト'\\\"}\",\"EventPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.ratePreemptive();//デフォルト'\\\"}\",\"RandomSurpriseSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.rateSurprise() && !this._preemptive;//デフォルト'\\\"}\",\"EventSurpriseSetting\":\"{\\\"EvalData\\\":\\\"'Math.random() < this.rateSurprise() && !this._preemptive;//デフォルト'\\\"}\"}","{\"Name\":\"direction\",\"RandomPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"\\\"}\",\"EventPreemptiveSetting\":\"{\\\"EvalData\\\":\\\"'this.getEventBackDirection();//イベント背後接触 要NUUN_EventPlayerDirection'\\\"}\",\"RandomSurpriseSetting\":\"{\\\"EvalData\\\":\\\"\\\"}\",\"EventSurpriseSetting\":\"{\\\"EvalData\\\":\\\"'this.getPlayerBackDirection() && !this._preemptive;//プレイヤー背後接触 要NUUN_EventPlayerDirection'\\\"}\"}"]
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
 * @option 'Math.random() < this.rateSurprise() && !this._preemptive;//デフォルト'
 * @option 'Math.random() < this.rateSurprise();//不意打ち無効なし'
 * @option '$gameSwitches.value(0);//スイッチ'
 * @default 'Math.random() < this.rateSurprise() && !this._preemptive;'
 * 
 */
/*~struct~PreemptiveSurpriseList:
 * 
 * @param Name
 * @text 名称
 * @desc 名称
 * @type string
 * @default
 * 
 * @param RandomPreemptiveSetting
 * @text ランダムエンカウント時の先制攻撃条件設定
 * @desc ランダムエンカウント先制設定
 * @type struct<PreemptiveSetting>
 * @default {"EvalData":""}
 * 
 * @param EventPreemptiveSetting
 * @text イベントエンカウント時の先制攻撃条件設定
 * @desc イベントエンカウント先制設定
 * @type struct<PreemptiveSetting>
 * @default {"EvalData":""}
 * 
 * @param RandomSurpriseSetting
 * @text ランダムエンカウント時の不意打ち条件設定
 * @desc ランダムエンカウント不意打ち設定
 * @type struct<SurpriseSetting>
 * @default {"EvalData":""}
 * 
 * @param EventSurpriseSetting
 * @text イベントエンカウント時の不意打ち条件設定
 * @desc イベントエンカウント不意打ち設定
 * @type struct<SurpriseSetting>
 * @default {"EvalData":""}
 * 
 */
/*~struct~PreemptiveSetting:
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
/*~struct~SurpriseSetting:
 * 
 * @param EvalData
 * @text 評価式
 * @desc 評価式
 * @type combo
 * @option 'Math.random() < this.rateSurprise() && !this._preemptive;//デフォルト'
 * @option 'Math.random() < this.rateSurprise();//不意打ち無効なし'
 * @option '$gameSwitches.value(0);//スイッチ'
 * @option 'this.getPlayerBackDirection() && !this._preemptive;//プレイヤー背後接触 要NUUN_EventPlayerDirection'
 * @default
 * 
 */

var Imported = Imported || {};
Imported.NNUUN_PreemptiveSurpriseEx = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_PreemptiveSurpriseEx');
    const PreemptiveSurpriseSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PreemptiveSurpriseSetting'])) : null) || [];
    const DefaultPreemptive = String(parameters['DefaultPreemptive']);
    const DefaultSurprise = String(parameters['DefaultSurprise']);

    BattleManager.onEncounter = function() {//再定義
        const tagData = $gameTroop.getPresurCommentTag();
        if (tagData) {
            const members = $gameParty;
            const troop = $gameTroop;
            const data = isNaN(tagData) ? PreemptiveSurpriseSetting.find(a => tagData === a.Name) : PreemptiveSurpriseSetting[Number(tagData) - 1];
            this._preemptive = data.RandomPreemptiveSetting && data.RandomPreemptiveSetting.EvalData ? eval(data.RandomPreemptiveSetting.EvalData) : (DefaultPreemptive ? eval(DefaultPreemptive) : false);
            this._surprise = data.RandomSurpriseSetting && data.RandomSurpriseSetting.EvalData ? eval(data.RandomSurpriseSetting.EvalData) : (DefaultSurprise ? eval(DefaultSurprise) : false);
        } else {
            this._preemptive = DefaultPreemptive ? eval(DefaultPreemptive) : false;
            this._surprise = DefaultSurprise ? eval(DefaultSurprise) : false;
        }
    };

    BattleManager.onEventEncounter = function() {
        const tagData = $gameTroop.getPresurCommentTag();
        if (tagData) {
            const members = $gameParty;
            const troop = $gameTroop;
            const data = isNaN(tagData) ? PreemptiveSurpriseSetting.find(a => tagData === a.Name) : PreemptiveSurpriseSetting[Number(tagData) - 1];
            this._preemptive = data.EventPreemptiveSetting && data.EventPreemptiveSetting.EvalData ? eval(data.EventPreemptiveSetting.EvalData) : false;
            this._surprise = data.EventSurpriseSetting && data.EventSurpriseSetting.EvalData ? eval(data.EventSurpriseSetting.EvalData) : false;
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
        const result = _Game_Interpreter_command301.call(this, params);
        if (!$gameParty.inBattle()) {
            BattleManager.onEventEncounter();
        }
        return result;
    };

})();