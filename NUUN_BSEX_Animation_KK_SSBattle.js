/*:-----------------------------------------------------------------------------------
 * NUUN_BSEX_Animation_KK_SSBattle.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc バトルスタイル拡張スピードスターバトル併用
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_BattleStyleEX_Base
 * @orderAfter NUUN_BattleStyleEX_Base
 * @orderAfter Keke_SpeedStarBattle
 * 
 * @help
 * バトルスタイル拡張プラグインとケケー様のスピードスターバトルと併用ででフロントビューにアニメーション、ポップアップを
 * 正常に表示するためのプラグインです。
 * 
 * バトルスタイル拡張設定用のフロントビューエフェクトをONに
 * スピードスターバトルのその他のフロントビュー対応をOFFにしてください。
 * プラグインリストの配置順は
 * バトルスタイル拡張
 * スピードスターバトル(流れるように疾走する快速バトル)
 * バトルスタイル拡張スピードスターバトル併用
 * の順に設定してください。
 * 
 * 更新履歴
 * 2021/12/27 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BSEX_Animation_KK_SSBattle = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BSEX_Animation_KK_SSBattler');
const parametersBEX = PluginManager.parameters('NUUN_BattleStyleEX');
const ActorEffectShow = eval(parametersBEX['ActorEffectShow'] || 'true');

    const _Spriteset_Battle_makeTargetSprites = Spriteset_Battle.prototype.makeTargetSprites;
    Spriteset_Battle.prototype.makeTargetSprites = function(targets) {
        const targetSprites = _Spriteset_Battle_makeTargetSprites.call(this, targets);
        return ActorEffectShow ? this._nuun_targetSprites : targetSprites;
    };


})();