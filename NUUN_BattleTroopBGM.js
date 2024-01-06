/*:-----------------------------------------------------------------------------------
 * NUUN_BattleTroopBGM.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 
 */
/*:
 * @target MZ
 * @plugindesc Enemy group BGM settings
 * @version 1.1.1
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * You can play the specified battle BGM for the enemy group.
 * 
 * By specifying an enemy group in the plugin parameters, the set BGM will be played for that enemy group.
 * Multiple enemy groups can be selected.
 * If set in a battle event, the battle event tag will take precedence.
 * 
 * When filling out from a battle event
 * Please fill in the "comment" on page 1 of the battle event of the enemy group.
 * <BattleBGM:[id]> 
 * [id]:ID name or identification name　Specify the battle BGM list ID or identification name of the plug-in parameter.
 * 
 * If multiple battle BGM settings are specified, it will be played randomly, but if a condition is specified and the condition is met, that BGM will be played.
 * Priority increases from top to bottom.
 * 
 * Combined use with "Preemptive, Surprise EX"
 * You can specify preemptive attack and battle BGM at the time of surprise attack for condition specification.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 1/7/2024 Ver 1.1.1
 * Added a function that allows you to set the BGM during a preemptive surprise attack.
 * Processing improvements.
 * 1/7/2024 Ver 1.1.0
 * Added a function that can be set from enemy group ID.
 * 7/4/2023 Ver 1.0.0
 * First edition.
 * 
 * @param BGMList
 * @text Battle BGM
 * @desc Set battle BGM.
 * @default []
 * @type struct<battleBgmList>[]
 * 
 * @param BattleBgmOnSwitch
 * @text BGM change switch
 * @desc Allow changing the BGM set by this plug-in (ON). 0 to always allow.
 * @type switch
 * @default 0
 * 
 */ 
/*~struct~battleBgmList:
 * 
 * @param TroopId
 * @desc Specify enemy group. If not set, it will be referenced from the enemy group's battle event.
 * @text Troop
 * @type troop[]
 * @default []
 * 
 * @param Name
 * @desc Fill in the identification name. A string that is referenced when specified by name.
 * @text Identification name
 * @type string
 * @default
 * 
 * @param TroopBGMList
 * @text Battle BGM setting
 * @desc Set battle BGM.
 * @default []
 * @type struct<battleBgmData>[]
 * 
 * @param PreemptiveBGM
 * @text Preemptive default bgm
 * @desc Set the default BGM settings for pre-emptive attacks
 * @default {"name":"","volume":"90","pitch":"100","pan":"0","CondBgm":""}
 * @type struct<battleBgmData>
 * 
 * @param SurpriseBGM
 * @text Surprise default bgm
 * @desc Set the default BGM settings for surprise attacks.
 * @default {"name":"","volume":"90","pitch":"100","pan":"0","CondBgm":""}
 * @type struct<battleBgmData>
 * 
 */
/*~struct~battleBgmData:
 * 
 * @param name
 * @text BGM file name
 * @desc Specify BGM.
 * @type file
 * @dir audio/bgm
 * 
 * @param volume
 * @text BGM volume
 * @desc Set the BGM volume.
 * @default 90
 * 
 * @param pitch
 * @text BGM pitch
 * @desc Set the pitch of BGM.
 * @default 100
 * 
 * @param pan
 * @text BGM pan
 * @desc Sets the BGM pan.
 * @min -100
 * @max 100
 * @default 0
 * 
 * @param CondBgm
 * @desc Enter the condition in javascript.
 * @text Conditional expression
 * @type combo
 * @option "$gameVariables.value(0);//Game variable"
 * @option "$gameSwitches.value(0);//Switch"
 * @option "BattleManager._preemptive;//Preemptive
 * @option "BattleManager._surprise;//Surprise
 * @default 
 *  
 */
/*:ja
 * @target MZ
 * @plugindesc 敵グループのBGM設定
 * @version 1.1.1
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 敵グループに対し指定のバトルBGMを再生できます。
 * 
 * プラグインパラメータに敵グループを指定することでその敵グループでは設定されたBGMが再生されます。
 * 敵グループは複数選択できます。
 * バトルイベントで設定されている場合は、バトルイベントのタグが優先されます。
 * 
 * バトルイベントから記入する場合
 * 敵グループのバトルイベントの１ページ目に注釈で記入してください。
 * <BattleBGM:[id]> 
 * [id]:ID名または識別名 プラグインパラメータの戦闘BGMのリストIDまたは、識別名を指定します。
 * 
 * 戦闘BGM設定が複数指定されている場合はランダムに再生されますが、条件が指定されている場合で、条件を満たしている場合はそのBGMが再生されます。
 * 優先度は上から順に高くなります。
 * 
 * 先制、不意打ちEXとの併用
 * 条件指定に先制攻撃、不意打ち時の戦闘BGMを指定できます。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/1/7 Ver 1.1.1
 * 先制不意打ち時のBGMを設定できる機能を追加。
 * 処理の改修。
 * 2024/1/7 Ver 1.1.0
 * 敵グループIDから設定できる機能を追加。
 * 2023/7/4 Ver 1.0.0
 * 初版
 *  
 * @param BGMList
 * @text 戦闘ＢＧＭ
 * @desc ＢＧＭを設定します。
 * @default []
 * @type struct<battleBgmList>[]
 * 
 * @param BattleBgmOnSwitch
 * @text BGM変更スイッチ
 * @desc このプラグインで設定したBGMの変更を許可(ON)。0で常時許可
 * @type switch
 * @default 0
 * 
 * @param PreemptiveBGM
 * @text 先制攻撃時デフォルトBGM設定
 * @desc 先制攻撃時のデフォルトBGM設定を設定します。
 * @default {"name":"","volume":"90","pitch":"100","pan":"0","CondBgm":""}
 * @type struct<battleBgmData>
 * 
 * @param SurpriseBGM
 * @text 不意打ち時デフォルトBGM設定
 * @desc 不意打ち時のデフォルトBGM設定を設定します。
 * @default {"name":"","volume":"90","pitch":"100","pan":"0","CondBgm":""}
 * @type struct<battleBgmData>
 * 
 */
/*~struct~battleBgmList:ja
 * 
 * @param TroopId
 * @desc 敵グループを指定します。設定されていない場合は敵グループのバトルイベントから参照されます。
 * @text 敵グループ
 * @type troop[]
 * @default 
 * 
 * @param Name
 * @desc 識別名を記入します。名前で指定するときに参照される文字列です。
 * @text 識別名
 * @type string
 * @default
 * 
 * @param TroopBGMList
 * @text 戦闘BGM設定
 * @desc 戦闘BGMを設定します。
 * @default []
 * @type struct<battleBgmData>[]
 * 
 */
/*~struct~battleBgmData:ja
 * 
 * @param name
 * @text BGMファイル名
 * @desc BGMを指定します。
 * @type file 
 * @dir audio/bgm
 * 
 * @param volume
 * @text BGMの音量
 * @desc ＢＧＭの音量を設定します。
 * @default 90
 * 
 * @param pitch
 * @text BGMのピッチ
 * @desc BGMのピッチを設定します。
 * @default 100
 * 
 * @param pan
 * @text BGMの位相
 * @desc BGMの位相を設定します。
 * @min -100
 * @max 100
 * @default 0
 * 
 * @param CondBgm
 * @desc 条件をjavascriptで記入します。
 * @text 条件評価式
 * @type combo
 * @option "$gameVariables.value(0);//ゲーム変数"
 * @option "$gameSwitches.value(0);//スイッチ"
 * @option "BattleManager._preemptive;//先制攻撃
 * @option "BattleManager._surprise;//先制攻撃
 * @default 
 *  
 */
var Imported = Imported || {};
Imported.NUUN_BattleTroopBGM = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_BattleTroopBGM');
    const BGMList = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['BGMList'])) : [];
    const BattleBgmOnSwitch = Number(parameters['BattleBgmOnSwitch'] || 0);
    const PreemptiveBGM = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PreemptiveBGM'])) : [];
    const SurpriseBGM = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SurpriseBGM'])) : [];

    const _BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _BattleManager_initMembers.call(this);
        this._playBattleBGM = 'step1';
    };

    const _BattleManager_playBattleBgm = BattleManager.playBattleBgm;
    BattleManager.playBattleBgm = function() {
        if (this._playBattleBGM === 'step1') {
            _BattleManager_playBattleBgm.call(this);
            $gameTroop.setupBattleBGM();
            this._playBattleBGM = 'step2';
        } else if (this._playBattleBGM === 'step3') {
            _BattleManager_playBattleBgm.call(this);
        }
    };

    const _BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _BattleManager_startBattle.call(this);
        this._playBattleBGM = 'step3';
    };

    Game_Troop.prototype.setupBattleBGM = function() {
        if (BattleBgmOnSwitch === 0 || $gameSwitches.value(BattleBgmOnSwitch)) {
            this.setTroopBattleBGM();
        }
    };

    Game_Troop.prototype.battleBGMSetup = function() {
        //廃止
    };

    BattleManager.isPreemptiveBattleBGM = function() {
        return !!PreemptiveBGM && !!PreemptiveBGM.name && (PreemptiveBGM.CondBgm ? eval(PreemptiveBGM.CondBgm) : true) &&  (this._preemptive || this._tempPreemptive);
    };

    BattleManager.isSurpriseBattleBGM = function() {
        return !!SurpriseBGM && !!SurpriseBGM.name && (SurpriseBGM.CondBgm ? eval(SurpriseBGM.CondBgm) : true) && (this._surprise || this._tempSurprise);
    };

    Game_Troop.prototype.setTroopBattleBGM = function() {
        if (BattleManager.isPreemptiveBattleBGM()) {
            this.playTroopBattleBgm(PreemptiveBGM);
        } else if (BattleManager.isSurpriseBattleBGM()) {
            this.playTroopBattleBgm(SurpriseBGM);
        } else {
            const bgmData = BGMList.find(data => this.isTroopBattleBGM(data));
            const bgm = bgmData ? this.getBattleBgm(bgmData.TroopBGMList) : this.getTagTroopBgm();
            this.playTroopBattleBgm(bgm);
        }
    };

    Game_Troop.prototype.playTroopBattleBgm = function(bgm) {
        if (bgm) {
            const setBgm = {name: bgm.name, volume: bgm.volume, pitch: bgm.pitch, pan: bgm.pan};
            AudioManager.playBgm(setBgm);
        }
    };

    Game_Troop.prototype.isTroopBattleBGM = function(data) {
        try {
            return !!data.TroopId && (data.TroopId.some(id => id === this._troopId));
        } catch (error) {
            const log = ($gameSystem.isJapanese() ? "無効なIDが設定されています。" : "An invalid ID has been configured.");
            throw ["DataError", log];
        }
    };

    Game_Troop.prototype.getTagTroopBgm = function() {
        const re = /<(?:BattleBGM):\s*(.*)>/;
        const pages = this.troop().pages[0];
        let list = null;
        pages.list.forEach(tag => {
            if ((tag.code === 108 || tag.code === 408) && !list) {
              let match = re.exec(tag.parameters[0]);
              if (match) {
                list = this.battleBgmRequest(match[1]);
              }
            }
        });
        return list;
    };

    Game_Troop.prototype.battleBgmRequest = function(id) {
        const bgm = isNaN(id) ? getBgmNameData(id) : getBgmNumberData(id)
        if (bgm && bgm.TroopBGMList) {
            return this.getBattleBgm(bgm.TroopBGMList);
        }
        return null;
    };

    Game_Troop.prototype.getBattleBgm = function(list) {
        const troop = this.troop();
        const condList = list.filter(bgm => bgm.CondBgm);
        let find = condList.find(bgm => eval(bgm.CondBgm));
        if (find) {
            return find;
        }
        const newList = list.filter(bgm => !bgm.CondBgm);
        return newList[Math.floor(Math.randomInt(newList.length))];
    };

    function getBgmNameData(id) {
        return BGMList.find(data => data.Name === id);
    };

    function getBgmNumberData(id) {
        return BGMList[Number(id) - 1];
    };

})();
