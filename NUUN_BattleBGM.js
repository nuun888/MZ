/*:-----------------------------------------------------------------------------------
 * NUUN_BattleBGM.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 
 */
/*:
 * @target MZ
 * @plugindesc Enemy group individual BGM
 * @version 1.1.0
 * @author NUUN
 * 
 * @help
 * Battle BGM can be set for each enemy group.
 * 
 * There are two setting methods. Please fill in "Comment" on the first page of the battle event of the enemy group.
 * 1:Set the playback BGM file name, volume, pitch, and phase from the plug-in parameters, and play it with the <battleBGMN> or <battleBGMR> tag.
 * The number displayed on the left side of the list is the playback ID of the BGM.
 * <battleBGMN:[name],[eval]>  BGM specified by [name] is played. *[eval] can be omitted.
 * <battleBGMId:[id],[eval]> The [id]th BGM in the list specified by [id] will be played. *[eval] can be omitted.
 * <battleBGMR:[id],[id],[id]...>  One of the set [id] BGM will be played randomly. If you want to specify conditions, enter the tags below.
 * <battleBGMREval:[id],[id],[id]...,[eval]>  If [eval] is true, one of the set [id] BGM will be played randomly.
 * 
 * [name]:File name (without extension)
 * [id]:List Id
 * [eval]:Playback condition (evaluation formula)
 * 
 * 2：<battleBGM>Specify file name, volume, pitch and phase directly with tags.
 * <battleBGM:[name],[volume],[pitch],[pan],[eval]> BGM specified by [name] is played. You can play it without setting it in the list.
 * *[eval] can be omitted.
 * 
 * [name]:File name (without extension)
 * [id]:List Id
 * [volume]:Volume
 * [pitch]:Pitch
 * [pan]:Pan
 * [eval]:Playback condition (evaluation formula)
 * 
 * 
 * Please fill in the BGM with conditions from the top in order of highest priority.
 * According to the specifications, if the first BGM that can be played is found, that BGM will be played.
 * 
 * BGM change switch
 * If set to 0, the BGM set by this plug-in will always be played.
 * If you specify a switch, the BGM set with this plug-in will be played when the corresponding switch is ON.
 * 
 * Example
 * <battleBGMN:Battle3> If Battle3 is set in the list, Battle3 BGM will be played.
 * <battleBGMR:1,2,3> One of the 1st, 2nd and 3rd BGM in the list will be played randomly.
 * <battleBGM:Battle2, 90, 100, 0> Battle2 BGM is played at volume 90, pitch 100, and pan 0.
 * <battleBGMN:Battle2,$gameSwitches.value(2)> If switch number 2 is True and Battle2 is set in the list, Battle2 will be played.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 11/27/2022 Ver 1.1.0
 * Added the ability to set a switch to enable settings in this plugin.
 * Changed the display in languages other than Japanese to English.
 * 12/1/2020 Ver 1.0.1
 * Added a function that can play BGM by specifying ID.
 * 11/27/2020 Ver 1.0.0
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
 * @default 0
 *  
 */
/*:ja
 * @target MZ
 * @plugindesc 敵グループの個別ＢＧＭ
 * @version 1.1.0
 * @author NUUN
 * 
 * @help
 * 敵グループごとにバトルBGMを設定できます。
 * 
 * 設定方法は２通りあります。敵グループのバトルイベントの１ページ目に注釈で記入してください。
 * １:プラグインパラメータから再生BGMファイル名、音量、ピッチ、位相を設定し、<battleBGMN>または<battleBGMR>タグで再生する。
 * リストに設定した左側に表示されている番号がBGMの再生IDとなります。
 * <battleBGMN:[name],[eval]>  [name]で指定したBGMが再生されます。※[eval]は省略できます。
 * <battleBGMId:[id],[eval]> [id]で指定したリストの[id]番目のBGMが再生されます。※[eval]は省略できます。
 * <battleBGMR:[id],[id],[id]...>  設定した[id]のBGMのうち一つがランダムに再生されます。条件指定をしたい場合は下のタグを記入します。
 * <battleBGMREval:[id],[id],[id]...,[eval]>  [eval]がtrueの場合に、設定した[id]のBGMのうち一つがランダムに再生されます。
 * 
 * [name]:ファイル名（拡張子なし）
 * [id]:リストId
 * [eval]:再生条件（評価式）
 * 
 * ２：<battleBGM>タグで直接ファイル名、音量、ピッチ、位相を指定する。
 * <battleBGM:[name],[volume],[pitch],[pan],[eval]>  [name]で指定したBGMが再生られます。リストに設定しなくても再生できます。
 * ※[eval]は省略できます。
 * 
 * [name]:ファイル名（拡張子なし）
 * [id]:リストId
 * [volume]:音量
 * [pitch]:ピッチ
 * [pan]:位相
 * [eval]:再生条件（評価式）
 * 
 * 条件付きのBGMはなるべく優先度の高い順に上から記入してください。
 * 仕様上、一番最初に再生可能なBGMが見つかったらそのBGMが再生されます。
 * 
 * BGM変更スイッチ
 * 0に設定した場合は、常時このプラグインで設定したBGMが再生されます。
 * スイッチを指定した場合は該当のスイッチがONの時にこのプラグインで設定したBGMが再生されます。
 * 
 * 例
 * <battleBGMN:Battle3>  リスト内にBattle3が設定されていれば、Battle3がBGMが再生られます。
 * <battleBGMR:1,2,3> リストの１，２，３番目のBGMのうち一つがランダムに再生されます。
 * <battleBGM:Battle2, 90, 100, 0> Battle2のBGMが音量90、ピッチ100、位相0で再生されます。
 * <battleBGMN:Battle2,$gameSwitches.value(2)> スイッチ番号２番がTrueでリスト内にBattle2が設定されていれば、Battle2が再生られます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/11/27 Ver 1.1.0
 * このプラグインでの設定を有効にするスイッチを設定できる機能を追加。
 * 日本語以外での表示を英語表示に変更。
 * 2020/12/1 Ver 1.0.1
 * ID指定でBGMを再生できる機能を追加。
 * 2020/11/27 Ver 1.0.0
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
 */ 
/*~struct~battleBgmList:ja
 * @param name
 * @text ＢＧＭファイル名
 * @desc ＢＧＭを指定します。
 * @type file
 * @dir audio/bgm
 * 
 * @param volume
 * @text ＢＧＭの音量
 * @desc ＢＧＭの音量を設定します。
 * @default 90
 * 
 * @param pitch
 * @text ＢＧＭのピッチ
 * @desc ＢＧＭのピッチを設定します。
 * @default 100
 * 
 * @param pan
 * @text ＢＧＭの位相
 * @desc ＢＧＭの位相を設定します。
 * @default 0
 *  
 */
var Imported = Imported || {};
Imported.NUUN_BattleBGM = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_BattleBGM');
  const param = JSON.parse(JSON.stringify(parameters, function(key, value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      try {
        return eval(value);
      } catch (e) {
        return value;
      }
    }
  }));

  const _Game_Troop_setup = Game_Troop.prototype.setup;
  Game_Troop.prototype.setup = function(troopId) {
    _Game_Troop_setup.call(this, troopId);
    if (param.BattleBgmOnSwitch === 0 || $gameSwitches.value(param.BattleBgmOnSwitch)) {
      const bgm = this.battleBGMsetup();
      $gameSystem.setBattleBgm(bgm);
    }
  };

  Game_Troop.prototype.battleBGMsetup = function() {
    const re = /<(?:battleBGMN):\s*(.*)>/;
    const re2 = /<(?:battleBGMR):\s*(.*(?:\s*,\s*\d+)*)>/;
    const re3 = /<(?:battleBGMREval):\s*(.*(?:\s*,\s*\d+)*)>/;
    const re4 = /<(?:battleBGM):\s*(.*)>/;
    const re5 = /<(?:battleBGMId):\s*(.*)>/;
    const pages = this.troop().pages[0];
    let list = null;
    pages.list.forEach(tag => {
      if ((tag.code === 108 || tag.code === 408) && !list) {
        let match = re.exec(tag.parameters[0]);
        let match2 = re2.exec(tag.parameters[0]);
        let match3 = re3.exec(tag.parameters[0]);
        let match4 = re4.exec(tag.parameters[0]);
        let match5 = re5.exec(tag.parameters[0]);
        if (match) {
          list = this.battleBgmNameRequest(match[1]);
        } else if(match2) {
          list = this.battleBgmRandom(match2[1], 0);
        } else if (match3) {
          list = this.battleBgmRandom(match3[1], 1);
        } else if (match4) {
          list = this.battleBgmRequest(match4[1]);
        } else if (match5) {
          list = this.battleBgmIdRequest(match5[1]);
        }
      }
    });
    return list;
  };
  Game_Troop.prototype.battleBgmNameRequest = function(data) {
    const list = data.split(',');
    if(this.battleBgmConditions(list[1])) {
      return param.BGMList.find(bgm => bgm.name === list[0]);
    }
    return null;
  };

  Game_Troop.prototype.battleBgmIdRequest = function(data) {
    const list = data.split(',');
    if(this.battleBgmConditions(list[1])) {
      return param.BGMList[Number(list[0]) - 1];
    }
    return null;
  };

  Game_Troop.prototype.battleBgmRandom = function(data, mode) {
    const list = data.split(',');
    if (this.battleBgmConditions(list[list.length -1]) && mode === 1) {
      return param.BGMList[Number(list[(Math.floor(Math.random() * (list.length - 1)))]) - 1]
    } else if(mode === 0){
      return param.BGMList[Number(list[(Math.floor(Math.random() * list.length))]) - 1]
    }
    return null;
  };

  Game_Troop.prototype.battleBgmRequest = function(data) {
    const list = data.split(',');
    if(this.battleBgmConditions(list[4])){
      return {name:list[0],volume:list[1],pitch:list[2],pan:list[3]};
    }
    return null;
  };

  Game_Troop.prototype.battleBgmConditions = function(conditions) {
    return conditions ? eval(conditions) : true;
  };

})();
