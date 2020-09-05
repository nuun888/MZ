/*:-----------------------------------------------------------------------------------
 * NUUN_BattleBGM.js
 * -------------------------------------------------------------------------------------
 * @target MZ
 * @plugindesc 敵グループの個別ＢＧＭ
 * @author ヽ(´ω`)ノ
 * 
 * @help
 * 敵グループごとにバトルBGMを設定できます。
 * また、戦闘BGMをランダムに再生する機能も実装しています。
 * 
 * プラグインパラメータからBGMを設定してください。
 * リストに設定した左側に表示されている番号がBGMの再生IDとなります。
 * 
 * 敵グループのバトルイベントの１ページ目にコメントタグで以下の
 * コメントを入力してください。
 * 指定したIDのBGMがバトルBGMとして再生されます。
 * 
 * <battleBGM:3> リストで指定した３番目のBGMが再生されます。
 * <battleBGMR:1,2,3...>設定したIDのBGMのうち一つがランダムに再生されます。
 * 
 * 利用規約
 * このプラグインの使用に制限はありません。
 * 商用、アダルト等のゲームでも使用可能です。
 * クレジット表記は任意です。
 * 
 * 更新履歴
 * ver 1.0.0（初版）
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
    const bgmId = this.battleBGMsetup();
    $gameSystem.setBattleBgm(param.BGMList[bgmId - 1]);
  };

  Game_Troop.prototype.battleBGMsetup = function() {
    const pages = this.troop().pages[0];
    const re = /<(?:battleBGM):\s*(\d+)>/;
    const re2 = /<(?:battleBGMR):\s*(\d+(?:\s*,\s*\d+)*)>/g;
    let list = 0;
    pages.list.forEach(tag => {
      if (tag.code === 108) {//注釈なら
        let match = re.exec(tag.parameters[0]);
        let match2 = re2.exec(tag.parameters[0]);
        if (match) {
          list = Number(match[1]);
        } else if (match2){
          list = this.battleBgmRandom(match2[1]);
        }
      }
    });
    return list;
  };

  Game_Troop.prototype.battleBgmRandom = function(data) {
    const list = data.split(',');
    return Number(list[(Math.floor(Math.random() * list.length))]);
  };

})();
