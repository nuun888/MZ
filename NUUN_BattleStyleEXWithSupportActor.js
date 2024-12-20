/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEXWithSupportActor.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Battle Style Ex Support Actors Ver. 2.0 Compatible
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_BattleStyleEX
 * @version 1.0.0
 * 
 * @help
 * Support Actor Ver. 2.0 will be compatible with the Battle Style Ex (new version).
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/21/2024 Ver.1.0.0
 * First edition.
 * 
 * @param FrontActorSupportActorCommandPositionList
 * @desc Support actor command position when actor command is on an actor.
 * @text Support Actor Command Position
 * @type struct<CommandPositionList>[]
 * @default []
 * 
 * 
 */
/*~struct~CommandPositionList:
 * 
 * @param CommandPosition_X
 * @desc The x-coordinate of the command.
 * @text Command X coordinate
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param CommandPosition_Y
 * @desc The y-coordinate of the command.
 * @text Command Y coordinate
 * @type number
 * @min -9999
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc バトルスタイル拡張サポートアクターVer2.0対応
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * サポートアクターVer.2.0をバトルスタイル拡張(新版)に対応させます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/12/21 Ver.1.0.0
 * 初版
 * 
 * @param FrontActorSupportActorCommandPositionList
 * @desc アクターコマンドがアクター上の時のサポートアクターコマンド位置。
 * @text サポートアクターコマンド位置
 * @type struct<CommandPositionList>[]
 * @default []
 * 
 * 
 */
/*~struct~CommandPositionList:ja
 * 
 * @param CommandPosition_X
 * @desc コマンドのX座標。
 * @text コマンドX座標
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param CommandPosition_Y
 * @desc コマンドのY座標。
 * @text コマンドY座標
 * @type number
 * @min -9999
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleStyleEXWithSupportActor = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;
    const commandPositionList = params.FrontActorSupportActorCommandPositionList || [];


    Window_ActorCommand.prototype.supportActorCommandPosition = function() {
        if (!Imported.NUUN_SupportActor || !this._actor.getSupportActor()) return false;
        const index = commandPositionList.length > 1 ? Math.min($gameParty.supportActorWithinMembers().indexOf(this._actor), commandPositionList.length - 1) : 0;
        this.x = commandPositionList[index].CommandPosition_X || 0;
        this.y = commandPositionList[index].CommandPosition_Y || 0;
        return true;
    };

    const _Window_ActorCommand_selectActor = Window_ActorCommand.prototype.selectActor;
    Window_ActorCommand.prototype.selectActor = function(actor) {
        $gameTemp.omitSupportMember = true;
        return _Window_ActorCommand_selectActor.apply(this, arguments);
    };

    const _Window_BsBattleStatus_bsBattleMembers = Window_BsBattleStatus.prototype.bsBattleMembers;
    Window_BsBattleStatus.prototype.bsBattleMembers = function() {
        $gameTemp.omitSupportMember = true;
        return _Window_BsBattleStatus_bsBattleMembers.apply(this, arguments);
    };
   
})();