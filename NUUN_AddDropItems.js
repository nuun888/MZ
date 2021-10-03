/*:-----------------------------------------------------------------------------------
 * NUUN_AddDropItems.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * 
 * @target MZ
 * @plugindesc ドロップアイテム追加
 * @base NUUN_Base
 * @version 1.0.1
 * @orderAfter NUUN_Base
 * @author NUUN
 * 
 * @help
 * デフォルトでは敵のドロップアイテムは３つまでしか設定できませんが、
 * このプラグインはドロップアイテムを４つ以上設定することが出来ます。
 * 
 * このプラグインは「NUUN_Base」が必要です。
 * 
 * 敵キャラのメモ欄
 * <DropItem I:13,20>
 * 設定した敵のドロップアイテムに13番のアイテムがドロップ率1/20の確率追加されます。
 * 
 * <DropItem W:18,16>
 * 設定した敵のドロップアイテムに18番の武器がドロップ率1/16の確率追加されます。
 * 
 * <DropItem A:35,32>
 * 設定した敵のドロップアイテムに35番の防具がドロップ率1/32の確率追加されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/10/3 Ver.1.0.0
 * メモに設定するときの説明が間違っていた問題を修正。
 * 2020/12/31 Ver.1.0.0
 * 初版
 * 
 */ 
var Imported = Imported || {};
Imported.NUUN_AddDropItems = true;

(() => {
const parameters = PluginManager.parameters('NUUN_AddDropItems');

const _DataManager_nuun_loadDataEnemies = DataManager.nuun_loadDataEnemies;
DataManager.nuun_loadDataEnemies = function(deta){
  _DataManager_nuun_loadDataEnemies.call(this, deta);
	deta.dropItems = this.dropItems(deta);
};

DataManager.dropItems = function(deta){
	const enemy = deta;
	const dropItems = enemy.dropItems;
	const re =/<(?:DropItem)\s*([IWA]):\s*(\d+(?:\s*,\s*\d+)*)>/g;
	while(true) {
		let match = re.exec(enemy.note);
		if (match) {
			let data = match[2].split(',');
			switch (match[1]) {
				case 'I':
					dropItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:1});
					break;
				case 'W':
					dropItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:2});
					break;
				case 'A':
					dropItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:3});
					break;
			}
		} else {
			return dropItems;
		}
	}
};
})();
