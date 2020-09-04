/*: -----------------------------------------------------------------------------------
 * NUUN_AddDropItems.js
 * ------------------------------------------------------------------------------------
 * 
 * @target MZ
 * @plugindesc ドロップアイテム増加 ver1.0.0
 * @author ヽ(´ω`)ノ
 * 
 * @help
 * デフォルトでは敵のドロップアイテムは３つまでしか設定できませんが
 * このプラグインはドロップアイテムを４つ以上設定することが出来ます。
 * 
 * スキルのメモ欄
 * <DropItem I:13,20>
 * 設定した敵のドロップアイテムに13番のアイテムがドロップ率1/20の確率追加されます。
 * 
 * <DropItem W:18,16>
 * 設定した敵のドロップアイテムに18番の武器がドロップ率1/16の確率追加されます。
 * 
 * <DropItem A:35,32>
 * 設定した敵のドロップアイテムに35番の防具がドロップ率1/32の確率追加されます。
 * 
 */ 
var Imported = Imported || {};
Imported.NUUN_AddDropItems = true;

(() => {
const parameters = PluginManager.parameters('NUUN_AddDropItems');

const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
	_Game_Enemy_initMembers.call(this);
	this._dripItemEX = [];
};

const _Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	_Game_Enemy_setup.call(this,enemyId, x, y);
	this._dripItemEX = this.dropItemList();
};

const _Game_Enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
Game_Enemy.prototype.makeDropItems = function() {
	let dropItems = _Game_Enemy_makeDropItems.call(this);
	return dropItems.concat(this.makeDropItemsEX())
};

Game_Enemy.prototype.makeDropItemsEX = function() {
	const dropList = this._dripItemEX;
	const rate = this.dropItemRate();
	if(dropList){
  	const dropItems = dropList.reduce((r, di) => {
    	if (di.kind > 0 && Math.random() * di.denominator < rate) {
    	  return r.concat(this.itemObject(di.kind, di.dataId));
    	} else {
    	  return r;
    	}
		}, []);
		return dropItems;
	}
	return [];
}

Game_Enemy.prototype.dropItemList = function() {
	let dropItems = [];
	const re =/<(?:DropItem)\s*([IWA]):\s*(\d+(?:\s*,\s*\d+)*)>/g;
	while(true) {
		let match = re.exec(this.enemy().note);
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
