/*:-----------------------------------------------------------------------------------
 * NUUN_Destination.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc メニュー画面行動目標表示
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * メニュー画面に行動目標を表示します。
 * このプラグインはメニュー画面デフォルトタイプ(NUUN_MenuScreen_default)、メニュー画面タイプ１(NUUN_MenuScreen)、メニュー画面タイプ２(NUUN_MenuScreen_2)が必要です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/6/4 Ver.1.0.0
 * 初版
 * 
 * 
 * @command SetDestination
 * @text 行動目標変更
 * @desc メニュー画面に表示する行動目標テキストを変更します。
 *
 * @arg id
 * @text 行動目標
 * @desc 行動目標IDを指定します。
 * @type number
 * @default 0
 * 
 * 
 * 
 * @param DestinationList
 * @text デフォルトステータス座標表示設定
 * @desc デフォルトのステータスの座標、表示設定の設定を行います。
 * @default []
 * @type struct<Destination>[]
 * 
 */
/*~struct~Destination:
 * 
 * @param DestinationText
 * @text 行動目標テキスト
 * @desc 行動目標のテキストを記入します。（制御文字使用可能）
 * @default 
 * @type multiline_string
 * 
 */

var Imported = Imported || {};
Imported.NUUN_Destination = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_Destination');
    const DestinationList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DestinationList'])) : null) || [];
    
    const pluginName = "NUUN_Destination";
    PluginManager.registerCommand(pluginName, 'SetDestination', args => {
        $gameSystem.setDestinationId(Number(args.id));
    });

    Window_Base.prototype.getDestinationList = function() {
        const data = DestinationList[$gameSystem.getDestinationId() - 1];
        return data ? data.DestinationText : null;
    };

    Game_System.prototype.getDestinationId = function() {
        return this._destinationId || 0;
    };

    Game_System.prototype.setDestinationId = function(index) {
        this._destinationId = index;
    };

})();