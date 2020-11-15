/*:-----------------------------------------------------------------------------------
 * NUUN_BattleBGM.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11 Ver 1.0.0
 */ 
/*:
 * @target MZ
 * @plugindesc 敵グループの個別BGM
 * @author NUUN
 * 
 * @help
 * 敵グループごとにバトルBGMを設定できます。
 * 
 * 敵グループのバトルイベントの１ページ目にコメントタグで以下の
 * コメントを入力してください。
 * 
 * <battleBGM:[name],[volume],[pitch],[pan],[conditions]> [name]で指定したBGMが再生られます。
 *  なお、指定のBGMが見つからない場合BGMは再生されません。
 * 
 * [name]:BGMファイル名（拡張子なし）
 * [volume]:音量
 * [pitch]:ピッチ
 * [pan]:位相
 * [conditions]:再生条件
 * 
 * <RandomBGM:[name],[name],[name],...> 指定したBGMの中からいずれかが再生されます。
 * 
 * [name]:BGMファイル名（拡張子なし）
 * 
 * <RandomBGM:Battle2,Battle5,Battle6> 指定したBGMの中から１つがランダムに再生します。
 * ランダムに再生したい場合はこのタグをbattleBGMタグの上に記入してください。※例１
 * <battleBGM:Battle2, 90, 100, 0> Battle2のBGMが音量90、ピッチ100、位相0で再生されます。
 * <battleBGM:Battle3, 90, 150, 0,$gameSwitches.value(2)> スイッチ番号２番がTrueなら
 *  Battle3のBGMが音量90、ピッチ150、位相0で再生されます。
 * 再生条件を指定する場合、条件付きのタグは通常表示再生するBGMの下に記入してください。
 * 
 * 例１
 * <RandomBGM:Battle2,Battle5,Battle6>
 * <battleBGM:Battle2, 90, 100, 0>
 * 
 * 複数の場合
 * <RandomBGM:Battle2,Battle5,Battle6>
 * <battleBGM:bgm, 90, 100, 0>
 * <RandomBGM:Battle1,Battle7,Battle8>
 * <battleBGM:bgm, 90, 150, 0,$gameSwitches.value(2)>
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 */ 
var Imported = Imported || {};
Imported.NUUN_BattleBGM = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_BattleBGM');

  const _Game_Troop_setup = Game_Troop.prototype.setup;
  Game_Troop.prototype.setup = function(troopId) {
    _Game_Troop_setup.call(this, troopId);
    const bgm = this.battleBGMSetup();
    if(bgm){
      $gameSystem.setBattleBgm({name:bgm[0], volume:bgm[1], pitch:bgm[2], pan:bgm[3]});
    }
  };
  const re = /<(?:battleBGM):\s*(.*)>/;
  const re2 = /<(?:RandomBGM):\s*(.*)>/;

  Game_Troop.prototype.battleBGMSetup = function() {
    const pages = this.troop().pages[0];
    let list = null;
    let bgm = null;
    pages.list.forEach(tag => {
      if (tag.code === 108 || tag.code === 408) {
        let match = re.exec(tag.parameters[0]);
        let match2 = re2.exec(tag.parameters[0]);
        if (match) {
          list = this.battleBgmRequest(match[1], bgm);
          bgm = null;
        } else if(match2) {
          bgm = this.randomBgmRequest(match2[1]);
        }
      }
    });
    return list;
  };

  Game_Troop.prototype.battleBgmConditions = function(conditions) {
    return conditions ? eval(conditions) : true;
  };

  Game_Troop.prototype.battleBgmRequest = function(data, bgm) {
    const list = data.split(',');
    if(this.battleBgmConditions(list[4])){
      if(bgm) {
        list[0] = bgm;
      }
      return list;
    }
    return null;
  };

  Game_Troop.prototype.randomBgmRequest = function(data) {
    const list = data.split(',');
    return (list[(Math.floor(Math.random() * list.length)) - 1]);
  };
})();
