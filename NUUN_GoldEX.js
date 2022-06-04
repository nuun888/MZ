/*:-----------------------------------------------------------------------------------
 * NUUN_GoldEX.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  所持金拡張
 * @author NUUN
 * @version 1.1.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 所持金を拡張します。
 * 
 * 主な機能
 * カンマ区切りに出来ます。
 * 最大所持金額を変更出来ます。0:デフォルト -1:無限　1以上:任意の上限（１京まで）
 * 
 * プラグインコマンド
 * イベントコマンドでは所持金を9999999までしか増減できませんが、このプラグインでは上限を超えて増減出来ます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/6/4 Ver.1.1.2
 * メニュー画面プラグイン更新に対してのアイコン表示クラス選択項目の追加。
 * 2021/12/30 Ver.1.1.1
 * 所持金アイコンを表示させるクラス指定をコンボボックスに変更。
 * 2021/2/3 Ver.1.1.0
 * 特定のクラスのみ所持金のアイコンを表示させる機能を追加(デフォルトでは"Window_ShopNumber"、"Window_Gold")
 * 2021/1/24 Ver.1.0.1
 * 「セーブ画面拡張プラグインを使用時」、アイコン画像をセーブ画面に反映しないように修正。
 * 2021/1/13 Ver.1.0.0
 * 初版
 * 
 * @param MaxGold
 * @desc お金を所持できる最大金額を設定します。0:デフォルト -1:制限なし　1以上:任意の上限（１京まで）
 * @text 最大所持金額
 * @type number
 * @default -1
 * @min -1
 * @max 10000000000000000
 * 
 * @param GoldIcon
 * @desc アイコンを表示します。
 * @text アイコンインデックス
 * @type number
 * @default 0
 * 
 * @param GoldSeparation
 * @desc 所持金の表示をカンマ区切りにします。
 * @text カンマ区切り
 * @type boolean
 * @default true
 * 
 * @param IconShowClassData
 * @desc アイコンを表示させるクラス。(複数指定可能)
 * @text アイコン表示クラス
 * @type combo[]
 * @option "Window_ShopNumber"
 * @option "Window_Gold"
 * @option "Window_InfoMenu"
 * @option "Window_InfoHeader1"
 * @option "Window_InfoHeader2"
 * @option "Window_InfoFooter"
 * @option "Window_InfoSide"
 * @default ["\"Window_Gold\"","\"Window_ShopNumber\"","\"Window_InfoMenu\"","\"Window_InfoHeader1\"","\"Window_InfoHeader2\"","\"Window_InfoFooter\"","\"Window_InfoSide\""]
 * 
 * 
 * @command GetGold
 * @text 所持金の増減。
 * @desc 所持金増減
 * 
 * @arg Gold
 * @type number
 * @default 0
 * @text 所持金増減金額
 * @desc 所持金を増減させます。イベントコマンドの上限を超える金額または下回る金額でも可能です。（１京まで）
 * @min 0
 * @max 10000000000000000
 * 
 * @arg GoldMode
 * @text 増減処理
 * @desc 所持金の処理を選択します。
 * @type select
 * @option 増加
 * @value 0
 * @option 減少
 * @value 1
 * @default 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_GoldEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_GoldEX');
const MaxGold = Number(parameters['MaxGold'] || -1);
const GoldIcon = Number(parameters['GoldIcon'] || 0);
const GoldSeparation = eval(parameters['GoldSeparation'] || "true");
const IconShowClassData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['IconShowClassData'])) : null) || [];

const pluginName = "NUUN_GoldEX";
PluginManager.registerCommand(pluginName, "GetGold", args => {
  if (Number(args.GoldMode) === 0) {
    $gameParty.gainGold(Number(args.Gold));
  } else {
    $gameParty.loseGold(Number(args.Gold));
  }
});

const _Window_Base_drawCurrencyValue = Window_Base.prototype.drawCurrencyValue;
Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
  if (GoldSeparation) {
    value = value.toLocaleString();
  }
  if (GoldIcon > 0 && this.showGoldIconClass()) {
    this.drawIcon(GoldIcon, x, y);
    const textMargin = ImageManager.iconWidth + 4;
    x += textMargin;
    width -= textMargin;
  }
  _Window_Base_drawCurrencyValue.call(this, value, unit, x, y, width);
};

Window_Base.prototype.showGoldIconClass = function() {
  const thisClass = String(this.constructor.name);
  return IconShowClassData.some(data => data === thisClass);
};

const _Game_Party_maxGold = Game_Party.prototype.maxGold;
Game_Party.prototype.maxGold = function() {
  if (MaxGold === -1) {
    return Infinity;
  } else if (MaxGold > 0) {
    return MaxGold;
  }
  return _Game_Party_maxGold.call(this);
};

})();