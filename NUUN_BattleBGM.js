/*:-----------------------------------------------------------------------------------
 * NUUN_BattleBGM.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11/27 Ver 1.0.0
 * 
 * 2020/12/1 Ver 1.0.1
 *  ID指定でBGMを再生できる機能を追加。
 */ 
/*:
 * @target MZ
 * @plugindesc 敵グループの個別ＢＧＭ
 * @author NUUN
 * 
 * @help
 * 敵グループごとにバトルBGMを設定できます。
 * 
 * 設定方法は２通りあります。敵グループのバトルイベントの１ページ目に注釈で記入してください。
 * １:プラグインパラメータから再生BGMファイル名、音量、ピッチ、位相を設定し、<battleBGMN>または<battleBGMR>タグで再生する。
 *  リストに設定した左側に表示されている番号がBGMの再生IDとなります。
 *  <battleBGMN:[name],[eval]>  [name]で指定したBGMが再生されます。※[eval]は省略できます。
 *  <battleBGMId:[id],[eval]> [id]で指定したリストの[id]番目のBGMが再生されます。※[eval]は省略できます。
 *  <battleBGMR:[id],[id],[id]...>  設定した[id]のBGMのうち一つがランダムに再生されます。条件指定をしたい場合は下のタグを記入します。
 *  <battleBGMREval:[id],[id],[id]...,[eval]>  [eval]がtrueの場合に、設定した[id]のBGMのうち一つがランダムに再生されます。
 * 
 *  [name]:ファイル名（拡張子なし）
 *  [id]:リストId
 *  [eval]:再生条件（評価式）
 * 
 * ２：<battleBGM>タグで直接ファイル名、音量、ピッチ、位相を指定する。
 *  <battleBGM:[name],[volume],[pitch],[pan],[eval]>  [name]で指定したBGMが再生られます。リストに設定しなくても再生できます。
 *  ※[eval]は省略できます。
 * 
 *  [name]:ファイル名（拡張子なし）
 *  [id]:リストId
 *  [volume]:音量
 *  [pitch]:ピッチ
 *  [pan]:位相
 *  [eval]:再生条件（評価式）
 * 
 * 
 * 条件付きのBGMはなるべく優先度の高い順に上から記入してください。
 * 仕様上、一番最初に再生可能なBGMが見つかったらそのBGMが再生されます。
 * 
 * 例
 * <battleBGMN:Battle3>  リスト内にBattle3が設定されていれば、Battle3がBGMが再生られます。
 * <battleBGMR:1,2,3> リストの１，２，３番目のBGMのうち一つがランダムに再生されます。
 * <battleBGM:Battle2, 90, 100, 0> Battle2のBGMが音量90、ピッチ100、位相0で再生されます。
 * <battleBGMN:Battle2,$gameSwitches.value(2)> スイッチ番号２番がTrueでリスト内にBattle2が設定されていれば、
 *  Battle2が再生られます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 *  
 * @param BGMList
 * @text 戦闘ＢＧＭ
 * @desc ＢＧＭを設定します。
 * @default []
 * @type struct<battleBgmList>[]
 */ 
/*~struct~battleBgmList:
 * @param name
 * @text ＢＧＭファイル名
 * @desc ＢＧＭを指定します。
 * @type file
 * @dir audio/bgm
 * 
 * @param volume
 * @text ＢＧＭの音量
 * @desc ＢＧＭを音量を設定します。
 * @default 90
 * 
 * @param pitch
 * @text ＢＧＭのピッチ
 * @desc ＢＧＭをピッチを設定します。
 * @default 100
 * 
 * @param pan
 * @text ＢＧＭの位相
 * @desc ＢＧＭを位相を設定します。
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
    const bgm = this.battleBGMsetup();
    $gameSystem.setBattleBgm(bgm);
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
