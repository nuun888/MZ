/*:-----------------------------------------------------------------------------------
 * NUUN_PlaybackRateBattleLog.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc 再生率バトルログ表示
 * @author NUUN
 * @version 1.0.3
 * @orderAfter BattleLogToMessage
 * 
 * @help
 * HP、MP、TP再生率でダメージ、回復した再生量をバトルログに表示させます。
 * 
 * 更新履歴
 * 2023/8/25 Ver.1.0.3
 * バトルログのメッセージ表示プラグインとの併用で再生ログが表示されない問題を修正。
 * 2023/6/22 Ver.1.0.2
 * バトルログが消去されなかった問題を修正。
 * 2023/6/22 Ver.1.0.1
 * 回復時のテキストで-が表示されてしまう問題を修正。
 * 2022/1/21 Ver.1.0.0
 * 初版
 * 
 * @param PlaybackRateHPRecoveryText
 * @desc HP回復時のテキスト　%1:再生した対象 %2:再生量
 * @text HP回復時テキスト
 * @type string
 * @default %1のHPが%2回復した！
 * 
 * @param PlaybackRateHPDamageText
 * @desc HPダメージ時のテキスト　%1:再生した対象 %2:再生量
 * @text HPダメージ時テキスト
 * @type string
 * @default %1のHPが%2減った！
 * 
 * @param PlaybackRateMPRecoveryText
 * @desc MP回復時のテキスト　%1:再生した対象 %2:再生量
 * @text MP回復時テキスト
 * @type string
 * @default %1のMPが%2回復した！
 * 
 * @param PlaybackRateMPDamageText
 * @desc MPダメージ時のテキスト　%1:再生した対象 %2:再生量
 * @text MPダメージ時テキスト
 * @type string
 * @default %1のMPが%2減った！
 * 
 * @param PlaybackRateTPRecoveryText
 * @desc TP回復時のテキスト　%1:再生した対象 %2:再生量
 * @text TP回復時テキスト
 * @type string
 * @default %1のTPが%2溜まった！
 * 
 * @param PlaybackRateTPDamageText
 * @desc TPダメージ時のテキスト　%1:再生した対象 %2:再生量
 * @text TPダメージ時テキスト
 * @type string
 * @default %1のTPが%2減った！
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_PlaybackRateBattleLog = true;

(() => {
const parameters = PluginManager.parameters('NUUN_PlaybackRateBattleLog');
const PlaybackRateHPRecoveryText = String(parameters['PlaybackRateHPRecoveryText'] || '%1のHPが%2回復した！');
const PlaybackRateHPDamageText = String(parameters['PlaybackRateHPDamageText'] || '%1のHPが%2減った！');
const PlaybackRateMPRecoveryText = String(parameters['PlaybackRateMPRecoveryText'] || '%1のMPが%2回復した！');
const PlaybackRateMPDamageText = String(parameters['PlaybackRateMPDamageText'] || '%1のMPが%2減った！');
const PlaybackRateTPRecoveryText = String(parameters['PlaybackRateTPRecoveryText'] || '%1のTPが%2溜まった！');
const PlaybackRateTPDamageText = String(parameters['PlaybackRateTPDamageText'] || '%1のTPが%2減った！');

const _Window_BattleLog_displayRegeneration = Window_BattleLog.prototype.displayRegeneration;
Window_BattleLog.prototype.displayRegeneration = function(subject) {
    _Window_BattleLog_displayRegeneration.call(this, subject);
    this.displayPlaybackRate(subject);
};

Window_BattleLog.prototype.displayPlaybackRate = function(subject) {
    if (subject.shouldPopupDamage()) {
        const result = subject.result();
        let text = null;
        BattleManager.playbackRateLogOpen = false;
        if (result.hpDamage < 0) {
            text = PlaybackRateHPRecoveryText.format(subject.name(), -result.hpDamage);
            this.push("addText", text);
            BattleManager.playbackRateLogOpen = true;
        } else if (result.hpDamage > 0) {
            text = PlaybackRateHPDamageText.format(subject.name(), result.hpDamage);
            this.push("addText", text);
            BattleManager.playbackRateLogOpen = true;
        }
        if (result.mpDamage < 0) {
            text = PlaybackRateMPRecoveryText.format(subject.name(), -result.mpDamage);
            this.push("addText", text);
            BattleManager.playbackRateLogOpen = true;
        } else if (result.mpDamage > 0) {
            text = PlaybackRateMPDamageText.format(subject.name(), result.mpDamage);
            this.push("addText", text);
            BattleManager.playbackRateLogOpen = true;
        }
        if (result.tpDamage < 0) {
            text = PlaybackRateTPRecoveryText.format(subject.name(), -result.tpDamage);
            this.push("addText", text);
            BattleManager.playbackRateLogOpen = true;
        } else if (result.tpDamage > 0) {
            text = PlaybackRateTPDamageText.format(subject.name(), result.tpDamage);
            this.push("addText", text);
            BattleManager.playbackRateLogOpen = true;
        }
        //this.push("performPlaybackRate", subject);
        this.push("wait");
        this.push("clear");
    }
};

Window_BattleLog.prototype.performPlaybackRate = function(subject) {
    
};

//BattleLogToMessage競合対策
if (BattleManager.isStarting) {
    const _BattleManager_isStarting = BattleManager.isStarting;
    BattleManager.isStarting = function() {
        return _BattleManager_isStarting.call(this) && !BattleManager.playbackRateLogOpen;
    };

    const _BattleManager_setBattleLogClose = BattleManager.setBattleLogClose;
    BattleManager.setBattleLogClose = function(value) {
        _BattleManager_setBattleLogClose.call(this, value);
        BattleManager.playbackRateLogOpen = false;
    };
}


})();