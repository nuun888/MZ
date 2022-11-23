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
 * @plugindesc  Gold EX
 * @author NUUN
 * @version 1.2.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * Expand your money.
 * 
 * Main function
 * Can be separated by commas.
 * You can specify the maximum amount of money you have with a game variable.
 * You can change the maximum holding amount. 0: Default -1: Infinite 1 or more: Arbitrary upper limit (up to 1 quintillion)
 * 
 * plugin command
 * With the event command, you can only increase or decrease your money up to 9999999, but with this plug-in you can increase or decrease it beyond the upper limit.
 * 
 * If you store a value of -1 or less in the maximum amount of money variable, the maximum amount set in the maximum amount of money will be applied.
 * If the maximum amount of possession is less than the amount of money on hand, the current maximum value will be applied when increasing or decreasing the amount of money on hand.
 * In addition, the amount of money in your possession that exceeds the new maximum value will disappear.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 11/23/2022 Ver.1.2.0
 * Added a function to specify the maximum amount of money in the game with a game variable.
 * 6/4/2022 Ver.1.1.2
 * Added icon display class selection item for menu screen plug-in update.
 * 12/30/2021 Ver.1.1.1
 * Changed the class designation to display the money icon to the combo box.
 * 2/3/2021 Ver.1.1.0
 * Added a function to display the gold icon only for specific classes (default "Window_ShopNumber", "Window_Gold")
 * 1/24/2021 Ver.1.0.1
 * Fixed not to reflect the icon image on the save screen when applying "NUUN_SaveScreen".
 * 1/13/2021 Ver.1.0.0
 * first edition.
 * 
 * @param MaxGold
 * @desc Set the max amount of money you can have. 0: Default -1: No limit　1 or more: Arbitrary upper limit (up to 1 quintillion)
 * @text Max amount of possession
 * @type number
 * @default -1
 * @min -1
 * @max 10000000000000000
 * 
 * @param MaxGoldVariable
 * @type variable
 * @default 0
 * @text Max money variable
 * @desc A variable that stores the max amount of money you have. If none or the value of the variable is -1 or less, the setting in "Max amount of possession" will be applied.
 * 
 * @param GoldIcon
 * @desc Show gold icon.
 * @text Icon index
 * @type number
 * @default 0
 * 
 * @param GoldSeparation
 * @desc Separates the display of money in possession with a comma.
 * @text Separated by commas
 * @type boolean
 * @default true
 * 
 * @param IconShowClassData
 * @desc A class that displays an icon. (multiple can be specified)
 * @text Icon display class
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
 * @text Increase/decrease of money
 * @desc Increase/decrease of money
 * 
 * @arg Gold
 * @type number
 * @default 0
 * @text Increase/decrease amount of money in possession
 * @desc Increases or decreases possession money. Amounts above or below the event command limit are also possible. (up to 1 quintillion)
 * @min 0
 * @max 10000000000000000
 * 
 * @arg GoldMode
 * @text Increase/decrease processing
 * @desc Choose to process your money.
 * @type select
 * @option Gain
 * @value 0
 * @option Decrease
 * @value 1
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc  所持金拡張
 * @author NUUN
 * @version 1.2.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 所持金を拡張します。
 * 
 * 主な機能
 * カンマ区切りに出来ます。
 * 所持金の最大数をゲーム変数で指定できます。
 * 最大所持金額を変更出来ます。0:デフォルト -1:無限　1以上:任意の上限（１京まで）
 * 
 * プラグインコマンド
 * イベントコマンドでは所持金を9999999までしか増減できませんが、このプラグインでは上限を超えて増減出来ます。
 * 
 * 最大所持金変数に-1以下の数値を格納した場合は最大所持金額で設定した最大金額が適用されます。
 * 最大所持金額が手持ちの所持金を下回っていた場合、次の所持金の増減時に現在の最大値が適用されます。
 * なお新たな最大数の値を超えた金額の所持金は消滅します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/11/23 Ver.1.2.0
 * 所持金の最大数をゲーム変数で指定する機能を追加。
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
 * @param MaxGoldVariable
 * @type variable
 * @default 0
 * @text 最大所持金変数
 * @desc 所持金の最大金額を格納する変数。なし及び変数の値が-1以下の場合は最大所持金額での設定が適用されます。
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
const MaxGoldVariable = Number(parameters['MaxGoldVariable'] || 0);
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
  if (MaxGoldVariable > 0 && $gameVariables.value(MaxGoldVariable) >= 0) {
    return $gameVariables.value(MaxGoldVariable);
  } else if (MaxGold === -1) {
    return Infinity;
  } else if (MaxGold > 0) {
    return MaxGold;
  }
  return _Game_Party_maxGold.call(this);
};

})();