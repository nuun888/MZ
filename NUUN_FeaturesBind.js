/*:-----------------------------------------------------------------------------------
 * NUUN_FeaturesBind.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Features you can't escape from
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.1
 * 
 * @help
 * You can set a feature that prevents you from changing members or escaping.
 * 
 * Notes with Features
 * <FeaturesBind>
 * Actors with this characteristic cannot change team members.
 * If an actor with this characteristic is included in the combat team, they cannot flee.
 * Enemies with this trait cannot flee.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/28/2024 Ver.1.0.1
 * The bind effect also applies to enemies.
 * 6/22/2024 Ver.1.0.0
 * First edition.
 * 
 * @param BindEscapeMissText
 * @text Bind escape failure text
 * @desc The message displayed when you fail to escape due to an enemy bind. %1:Target
 * @default "%1 couldn't escape."
 * @type string
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 逃げられない特徴
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.1
 * 
 * @help
 * 交代できない及び逃走出来なくなる特徴を設定できます。
 * 
 * 特徴を有するメモ欄
 * <FeaturesBind>
 * この特徴のあるアクターはメンバー変更がすることが出来ません。
 * この特徴のあるアクターが戦闘メンバーに含まれている場合、逃走することが出来ません。
 * この特徴がある敵は逃走することが出来ません。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/6/28 Ver.1.0.1
 * バインドの効果を敵にも適用。
 * 2024/6/22 Ver.1.0.0
 * 初版
 * 
 * @param BindEscapeMissText
 * @text バインド逃走失敗時テキスト
 * @desc 敵のバインドで逃走失敗したときのメッセージ。%1:ターゲット
 * @default "%1は逃げることが出来なかった。"
 * @type string
 * 
 */

var Imported = Imported || {};
Imported.NUUN_FeaturesBind = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const parameters = PluginManager.parameters('NUUN_FeaturesBind');

    const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
    Game_ActionResult.prototype.clear = function() {
        _Game_ActionResult_clear.apply(this, arguments);
        this.escapeMissedBind = false;
    };

    const _Game_Battler_escape = Game_Battler.prototype.escape;
    Game_Battler.prototype.escape = function() {
        if (this.isBind()) {
            if (this.isEnemy()) {
                this._result.escapeMissedBind = true;
            }
            return;
        }
        _Game_Battler_escape.apply(this, arguments);
    };

    Game_Battler.prototype.isNoBind = function() {
        return !this.isBind();
    };

    Game_Battler.prototype.isBind = function() {
        return this.isBind();
    };

    Game_Battler.prototype.isBind = function() {
        return this.traitObjects().find(trait => trait.meta.FeaturesBind);
    };

    const _Game_Actor_isFormationChangeOk = Game_Actor.prototype.isFormationChangeOk;
    Game_Actor.prototype.isFormationChangeOk = function() {
        return _Game_Actor_isFormationChangeOk.apply(this, arguments) && this.isNoBind();
    };

    Game_Party.prototype.isBind = function() {
        for (const member of this.battleMembers()) {
            if (member.isNoBind()) {
                return 0.0;
            }
        }
        return 1.0;
    };

    const _Window_BattleLog_displayFailure = Window_BattleLog.prototype.displayFailure;
    Window_BattleLog.prototype.displayFailure = function(target) {
        _Window_BattleLog_displayFailure.apply(this, arguments);
        this.displayEscapeMiss(target);
    };

    Window_BattleLog.prototype.displayEscapeMiss = function(target) {
        if (target.result().escapeMissedBind) {
            const fmt = params.BindEscapeMissText;
            this.push("addText", fmt.format(target.name()));
        }
    };

    const _BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
    BattleManager.makeEscapeRatio = function() {
        _BattleManager_makeEscapeRatio.apply(this, arguments);
        this._escapeRatio *= $gameParty.isBind();
    };

})();