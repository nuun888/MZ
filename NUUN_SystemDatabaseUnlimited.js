/*:-----------------------------------------------------------------------------------
 * NUUN_SystemDatabaseUnlimited.js
 * 
 * Copyright (C) 2023 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Exceeded database limit
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * You can set more than the maximum number of maps (default 2000) and the maximum number of animations (default 1000).
 * To change the upper limit, execute it during test play with the plug-in command.
 * It is recommended to make a backup before execution.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Adult content: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 6/14/2023 Ver.1.1.0
 * Modified to run without "NUUN Base".
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
 * @version 1.1.0
 * 
 * @help
 * マップの上限数(デフォルト2000)、アニメーションの上限数(デフォルト1000)を超えて設定できるようになります。
 * 上限の変更を行うにはプラグインコマンドでテストプレイ中に実行します。
 * 実行前にバックアップをとることを推奨いたします。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 成人向け：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 6/14/2026 Ver.1.1.0
 * NUUN_Baseなしで実行できるように修正。
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
    class Nuun_PluginParams_SystemDatabaseUnlimited {
        static getPluginParams(text) {//document.currentScript
            try {
                const name = String(Utils.extractFileName(text.src).split('.').shift());
                const params = PluginManager.parameters(name);
                if (params) {
                    const pluginParam = new Nuun_PluginParamData(params);
                    pluginParam.setPluginName(name);
                    return pluginParam.getParameters();
                }
                return {pluginName: name};
            } catch (error) {
                const log = ($gameSystem.isJapanese() ? "コアスクリプトをVer.1.3.2以降に更新してください。" : "Please update the core script to version 1.3.2 or later.");
                throw ["ParameterError", log];
            }
        }
    };

    class Nuun_PluginParamData {
        constructor(text) {
            this._parameters = JSON.parse(JSON.stringify(text, this._convertParams)) || {};
        }

        _convertParams(key, code) {
            try {
                return JSON.parse(code);
            } catch (e) {
                if (isNaN(code)) {
                    if (!code) {
                        return null;
                    }
                    try {
                        if (code.indexOf("'") === 0 || code.indexOf('"' === 0)) {
                            return eval(code);//'または"を外す。
                        }
                        return !!code ? String(code) : null;
                    } catch (e) {
                        if (typeof {} === "object") {
                            return code;
                        }
                        return !!code ? String(code) : null;
                    }
                } else {
                    return String(code);
                }
            }
        }

        getParameters() {
            return this._parameters;
        }

        setPluginName(name) {
            this._parameters.pluginName = name;
        }


        getMetaTag(object, code) {
            const data = object.meta[code];
            let list = [];
            if (data !== undefined) {
                try {
                    list = data.split(',');
                } catch (error) {
                    return this.getTextCodeMeta(data);
                }
                list.forEach(a => {
                    a = this.getTextCodeMeta(a);
                });
                return list;
            } else {
                return undefined;
            }
        }

        getTextCodeMeta(text) {
            if (isNaN(text)) {
                return text;
            } else {
                return Number(text);
            }
        }
    };

    const params = Nuun_PluginParams_SystemDatabaseUnlimited.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function NuunSystemDatabaseUnlimitedManager() {
        throw new Error("This is a static class");
    }

    NuunSystemDatabaseUnlimitedManager.addMap = function(dataPass) {
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
            const log = $gameSystem.isJapanese() ? "出力が完了しました。" : "Output completed. ";
            console.log(log);
        } catch (e) {
            const elog = $gameSystem.isJapanese() ? "エラーが発生しました。" : "An error has occurred";
            console.log(elog);
        }
    };

    NuunSystemDatabaseUnlimitedManager.addMapSystemData = function(dataPass, MaxDatabase) {
        try {
            const dataFile = getSystemData(dataPass);
            const length = dataFile.length;
            if (MaxDatabase > 0) {
                for (let i = 0; i <= MaxDatabase; i++) {
                    if (!dataFile[i]) {
                        dataFile[i] = getMapSystemData(i);
                        this.outputMapJson(i);
                    }
                }
            }
            const fs = require("fs");
            const pass = "data/" + dataPass;
            fs.writeFileSync(pass, JSON.stringify(dataFile));
            const log = $gameSystem.isJapanese() ? "出力が完了しました。" : "Output completed. ";
            console.log(log);
        } catch (e) {
            const elog = $gameSystem.isJapanese() ? "エラーが発生しました。" : "An error has occurred";
            console.log(elog);
        }
    };

    NuunSystemDatabaseUnlimitedManager.addSystemData = function(dataPass, MaxDatabase) {
        try {
            const dataFile = getSystemData(dataPass);
            const length = dataFile.length;
            if (MaxDatabase > 0) {
                for (let i = 0; i <= MaxDatabase; i++) {
                    if (!dataFile[i]) {
                        dataFile[i] = getAnimationsSystemData(i);
                    }
                }
            }
            const fs = require("fs");
            const pass = "data/" + dataPass;
            fs.writeFileSync(pass, JSON.stringify(dataFile));
            const log = $gameSystem.isJapanese() ? "出力が完了しました。" : "Output completed. ";
            console.log(log);
        } catch (e) {
            const elog = $gameSystem.isJapanese() ? "エラーが発生しました。" : "An error has occurred";
            console.log(elog);
        }
    };

    NuunSystemDatabaseUnlimitedManager.outputMapJson = function(index) {
        const filename = "Map%1".format(index.padZero(3));
        const dataFile = getMapData();
        const fs = require("fs");
        const pass = "data/" + filename + ".json";
        fs.writeFileSync(pass, JSON.stringify(dataFile));
    };

    PluginManager.registerCommand(pluginName, 'DataBaseAddAnimations', args => {
        NuunSystemDatabaseUnlimitedManager.addSystemData('Animations.json', Number(args.MaxDatabase));
    });

    PluginManager.registerCommand(pluginName, 'DataBaseAddMaps', args => {
        NuunSystemDatabaseUnlimitedManager.addMapSystemData('MapInfos.json', Number(args.MaxDatabase));
    });

    PluginManager.registerCommand(pluginName, 'AddMap', args => {
        NuunSystemDatabaseUnlimitedManager.addMap('MapInfos.json');
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
    
})();