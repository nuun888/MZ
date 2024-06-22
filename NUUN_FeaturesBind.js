/*:-----------------------------------------------------------------------------------
 * NUUN_BS_ActorStatusWindowVisible.js
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
 * @version 1.0.0
 * 
 * @help
 * You can set a feature that prevents you from changing members or escaping.
 * 
 * Notes with Features
 * <FeaturesBind>
 * Actors with this characteristic cannot change team members.
 * If an actor with this characteristic is included in the combat team, they cannot flee.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/22/2024 Ver.1.0.0
 * First edition.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 逃げられない特徴
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * 交代できない及び逃走出来なくなる特徴を設定できます。
 * 
 * 特徴を有するメモ欄
 * <FeaturesBind> 
 * この特徴のあるアクターはメンバー変更がすることが出来ません。
 * この特徴のあるアクターが戦闘メンバーに含まれている場合、逃走することが出来ません。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/6/22 Ver.1.0.0
 * 初版
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_FeaturesBind = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const parameters = PluginManager.parameters('NUUN_FeaturesBind');

    const _Game_Actor_isFormationChangeOk = Game_Actor.prototype.isFormationChangeOk;
    Game_Actor.prototype.isFormationChangeOk = function() {
        return _Game_Actor_isFormationChangeOk.apply(this, arguments) && this.isNoBind();
    };

    Game_Actor.prototype.isNoBind = function() {
        return !this.isBind();
    };

    Game_Actor.prototype.isBind = function() {
        return this.traitObjects().find(trait => trait.meta.FeaturesBind);
    };

    const _BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
    BattleManager.makeEscapeRatio = function() {
        _BattleManager_makeEscapeRatio.apply(this, arguments);
        this._escapeRatio *= $gameParty.isBind();
    };

    Game_Party.prototype.isBind = function() {
        for (const member of this.battleMembers()) {
            if (member.isNoBind()) {
                return 0.0;
            }
        }
        return 1.0;
    };
    
   
})();