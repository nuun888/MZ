/*:-----------------------------------------------------------------------------------
 * NUUN_MenuCommandDisplayOrder.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Arbitrary order of menu commands
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * You can display the menu commands in any display order.
 * The display order is displayed in the order of the ID set in the menu command setting of the plug-in parameter.
 * Unset commands are displayed after set commands.
 * 
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 1/3/2023 Ver.1.0.0
 * First edition.
 * 
 * @param MenuCommandSetting
 * @text Menu command setting
 * @desc Set menu commands.
 * @type struct<MenuCommandList>[]
 * @default []
 * 
 */
/*~struct~MenuCommandList:
 * 
 * @param CommandName
 * @text Command name
 * @desc Specifies the name of the command to apply.
 * @type string
 * @default
 * 
 * @param CommandSymbol
 * @text Symbol name
 * @desc Specifies the command symbol name to apply.
 * @type combo
 * @default
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc メニューコマンド任意表示順
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * メニューコマンドの表示順を任意の表示順に表示できます。
 * 表示順はプラグインパラメータのメニューコマンド設定での設定したID順に表示されます。
 * 未設定のコマンドは設定したコマンドの後に表示されます。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/1/3 Ver.1.0.0
 * 初版。
 * 
 * @param MenuCommandSetting
 * @text メニューコマンド設定
 * @desc メニューコマンドの設定を行います。
 * @type struct<MenuCommandList>[]
 * @default []
 * 
 */
/*~struct~MenuCommandList:ja
 * 
 * @param CommandName
 * @text コマンド名
 * @desc 適用させるコマンド名を指定します。
 * @type string
 * @default
 * 
 * @param CommandSymbol
 * @text シンボル名
 * @desc 適用させるコマンドシンボル名を指定します。
 * @type combo
 * @default
 * 
 */


var Imported = Imported || {};
Imported.NUUN_MenuCommandDisplayOrder = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_MenuCommandDisplayOrder');
    const MenuCommandSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['MenuCommandSetting'])) : null) || [];

    Window_MenuCommand.prototype.getMenuCommandEX = function(index) {
        return MenuCommandSetting.find(data => data.CommandName === this.commandName(index));
    };

    const _Window_Selectable_paint = Window_Selectable.prototype.paint;
    Window_Selectable.prototype.paint = function() {
        const className = String(this.constructor.name);
        if (className === 'Window_MenuCommand') {
            this.refreshCommandList();
        }
        _Window_Selectable_paint.call(this);
    };

    Window_MenuCommand.prototype.refreshCommandList = function() {
        const newList = [];
        const normalList = [];
        this._list.forEach(data => {
            const find = MenuCommandSetting.findIndex(command => command.CommandName === data.name || command.CommandSymbol === data.symbol);
            if (find >= 0) {
                newList[find] = data;
            } else {
                normalList.push(data);
            }
        });
        this._list = newList.concat(normalList).filter(list => !!list);
    };

    
})();