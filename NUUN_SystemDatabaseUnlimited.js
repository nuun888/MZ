/*:-----------------------------------------------------------------------------------
 * NUUN_SystemDatabaseUnlimited.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Exceeded database limit
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.2
 * 
 * @help
 * You can set more than the maximum number of maps (default 2000) and the maximum number of animations (default 1000).
 * To change the upper limit, execute it during test play with the plug-in command.
 * It is recommended to make a backup before execution.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 8/23/2023 Ver.1.0.2
 * Fixed to output a map JSON file when adding a new map.
 * 1/21/2023 Ver.1.0.1
 * Added the ability to add maps without restrictions.
 * 1/19/2023 Ver.1.0.0
 * First edition.
 * 
 * @command DataBaseAddAnimations
 * @desc Sets the animation database maximum.
 * @text Animation max database
 * 
 * @arg MaxDatabase
 * @text Max database
 * @desc Max database.
 * @type number
 * @default 0
 * 
 * @command DataBaseAddMaps
 * @desc Sets the map database maximum.
 * @text Map max database
 * 
 * @arg MaxDatabase
 * @text Max database
 * @desc Max database.
 * @type number
 * @default 0
 * 
 * @command AddMap
 * @desc Add a map to the database. Use it when adding more than 2000.
 * @text Add map
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc データベース上限突破
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.2
 * 
 * @help
 * マップの上限数(デフォルト2000)、アニメーションの上限数(デフォルト1000)を超えて設定できるようになります。
 * 上限の変更を行うにはプラグインコマンドでテストプレイ中に実行します。
 * 実行前にバックアップをとることを推奨いたします。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/8/23 Ver.1.0.2
 * マップ新規追加時にマップJSONファイルを出力するように修正。
 * 2023/1/21 Ver.1.0.1
 * マップを制限なく追加できる機能を追加。
 * 2023/1/19 Ver.1.0.0
 * 初版。
 * 
 * @command DataBaseAddAnimations
 * @desc アニメーションのデータベースの最大を設定します。
 * @text アニメーション最大値
 * 
 * @arg MaxDatabase
 * @text データベース最大値
 * @desc データベースの最大値。
 * @type number
 * @default 0
 * 
 * @command DataBaseAddMaps
 * @desc マップのデータベースの最大を設定します。
 * @text マップ最大値
 * 
 * @arg MaxDatabase
 * @text データベース最大値
 * @desc データベースの最大値。
 * @type number
 * @default 0
 * 
 * 
 * @command AddMap
 * @desc マップをデータベースに追加します。2000を超えて追加する場合に使用してください。
 * @text マップ追加
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SystemDatabaseUnlimited = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_SystemDatabaseUnlimited');
    const pluginName = 'NUUN_SystemDatabaseUnlimited';
    PluginManager.registerCommand(pluginName, 'DataBaseAddAnimations', args => {
        NuunManager.addSystemData('Animations.json', Number(args.MaxDatabase));
    });

    PluginManager.registerCommand(pluginName, 'DataBaseAddMaps', args => {
        NuunManager.addMapSystemData('MapInfos.json', Number(args.MaxDatabase), eval(args.CreateMapJson));
    });

    PluginManager.registerCommand(pluginName, 'AddMap', args => {
        NuunManager.addMap('MapInfos.json', eval(args.CreateMapJson));
    });

    function getSystemData(dataPass) {
        if (!$gameTemp.isPlaytest()) {
            return;
        }
        switch (dataPass) {
            case 'Animations.json':
                return $dataAnimations;
            case 'MapInfos.json':
                return $dataMapInfos;
        }
    };

    function getAnimationsSystemData(index) {
        return {"id":index,"displayType":0,"effectName":"","flashTimings":[],"name":"","offsetX":0,"offsetY":0,"rotation":{"x":0,"y":0,"z":0},"scale":100,"soundTimings":[],"speed":100};
    };

    function getMapSystemData(index) {
        const filename = "MAP%1".format(index.padZero(3));
        return {"id":index,"expanded":false,"name":filename,"order":index,"parentId":0,"scrollX":0,"scrollY":0};
    };

    function getMapData() {//1.7.0
        return {
            "autoplayBgm":false,"autoplayBgs":false,"battleback1Name":"","battleback2Name":"","bgm":{"name":"","pan":0,"pitch":100,"volume":90},"bgs":{"name":"","pan":0,"pitch":100,"volume":90},"disableDashing":false,"displayName":"","encounterList":[],"encounterStep":30,"height":13,"note":"","parallaxLoopX":false,"parallaxLoopY":false,"parallaxName":"","parallaxShow":true,"parallaxSx":0,"parallaxSy":0,"scrollType":0,"specifyBattleback":false,"tilesetId":1,"width":17,
            "data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            "events":[
            ]
            };
    };

    NuunManager.addMap = function(dataPass, CreateMapJson) {
        try {
            const dataFile = getSystemData(dataPass);
            const length = dataFile.length;
            while (true) {
                if (!dataFile[length]) {
                    break;
                }
                length++;
            }
            this.outputMapJson(length);
            dataFile.push(getMapSystemData(length));
            const fs = require("fs");
            const pass = "data/" + dataPass;
            fs.writeFileSync(pass, JSON.stringify(dataFile));
            const log = $gameSystem.isJapanese() ? "出力が完了しました。エディタを保存して確定してください。" : "Output completed. Save and confirm the editor.";
            console.log(log);
        } catch (e) {
            const elog = $gameSystem.isJapanese() ? "エラーが発生しました。" : "An error has occurred";
            console.log(elog);
        }
    };

    NuunManager.addMapSystemData = function(dataPass, MaxDatabase, CreateMapJson) {
        try {
            const dataFile = getSystemData(dataPass);
            const length = dataFile.length;
            if (MaxDatabase > 0) {
                for (let i = 1; i <= MaxDatabase; i++) {
                    if (!dataFile[i]) {
                        dataFile.push(getMapSystemData(i));
                        this.outputMapJson(i);
                    }
                }
            }
            const fs = require("fs");
            const pass = "data/" + dataPass;
            fs.writeFileSync(pass, JSON.stringify(dataFile));
            const log = $gameSystem.isJapanese() ? "出力が完了しました。エディタを保存して確定してください。" : "Output completed. Save and confirm the editor.";
            console.log(log);
        } catch (e) {
            const elog = $gameSystem.isJapanese() ? "エラーが発生しました。" : "An error has occurred";
            console.log(elog);
        }
    };

    NuunManager.addSystemData = function(dataPass, MaxDatabase) {
        try {
            const dataFile = getSystemData(dataPass);
            const length = dataFile.length;
            if (MaxDatabase > 0) {
                for (let i = 0; i <= MaxDatabase; i++) {
                    if (!dataFile[i]) {
                        dataFile.push(getAnimationsSystemData(i));
                    }
                }
            }
            const fs = require("fs");
            const pass = "data/" + dataPass;
            fs.writeFileSync(pass, JSON.stringify(dataFile));
            const log = $gameSystem.isJapanese() ? "出力が完了しました。エディタを保存して確定してください。" : "Output completed. Save and confirm the editor.";
            console.log(log);
        } catch (e) {
            const elog = $gameSystem.isJapanese() ? "エラーが発生しました。" : "An error has occurred";
            console.log(elog);
        }
    };

    NuunManager.outputMapJson = function(index) {
        const filename = "Map%1".format(index.padZero(3));
        const dataFile = getMapData();
        const fs = require("fs");
        const pass = "data/" + filename + ".json";
        fs.writeFileSync(pass, JSON.stringify(dataFile));
    };
    
})();