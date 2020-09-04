/*: -----------------------------------------------------------------------------------
 * NUUN_EnemyBook.js
 * -------------------------------------------------------------------------------------
 */
/*:ja
 * @target MZ
 * @plugindesc エネミー図鑑 ver1.0.0
 * @author ヽ(´ω`)ノ
 * 
 * @help
 * エネミー図鑑を実装します。
 * 
 * 表示パラメータ
 * 最大HP
 * 最大MP
 * 攻撃力
 * 防御力
 * 魔法力
 * 魔法防御
 * 敏捷性
 * 運
 * 
 * 表示項目
 * 獲得経験値
 * 獲得金額
 * 倒した数
 * オリジナルパラメータ（任意のステータス）
 * 耐性属性
 * 弱点属性
 * 無効属性
 * 吸収属性（未実装　複数属性、属性吸収特徴導入時）
 * 耐性ステート
 * 弱点ステート
 * 無効ステート
 * ドロップアイテム（ドロップアイテム追加対応）
 * スティールアイテム（盗みスキル導入時）
 * 記述欄（フリーテキストスペース）
 * 
 * エネミーのメモ欄
 * <desc1:[text]>
 * <desc2:[text]>
 * <desc3:[text]>
 * [text]:表示するテキスト。リストの記述欄を選択すると表示されます。（desc1だと記述欄１）
 * 改行すれば何行でも表示可能ですので、独自の項目を追加することも可能です。
 * <book:no>
 * エネミー図鑑に表示されません。
 * <book:ShowData>
 * 未撃破でも情報がすべて表示されます。
 * <book:ShowDrop>
 * 未撃破でもドロップアイテムが表示されます。
 * <book:ShowSteal>
 * 未撃破でもスティールアイテムが表示されます。
 * 
 * 
 * 各パラメータ、経験値、お金、倒した数、オリジナルパラメータ：１行
 * 属性、ステート：２行
 * ドロップアイテム、スティールアイテム：４行
 * 記述欄：２行
 * 
 * 
 * 対応プラグイン
 * ドロップアイテム追加
 * 盗みスキル
 * 
 * 操作方法
 * 上下キー：エネミー選択
 * 左右 PgUp PgDn：ページ切り替え
 * 
 * 参考プラグイン
 * 
 * プラグインコマンド
 * 
 * @command EnemyBookOpen
 * @desc エネミー図鑑を開きます。
 * 
 * @command EnemyBookAdd
 * @desc 敵キャラを図鑑に追加。
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc エネミー
 * 
 * @command EnemyBookRemove
 * @desc 敵キャラを図鑑から削除。
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc エネミー
 * 
 * @command EnemyBookComplete
 * @desc 図鑑を完成させる。
 * 
 * @command EnemyBookClear
 * @desc 図鑑をクリアする。
 * 
 * @command EnemyBookGetDropItem
 * @desc 敵キャラのドロップアイテムを表示。
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text エネミー
 * @desc ドロップアイテムを取得済みにするエネミーを指定します。
 * 
 * @arg dropListId
 * @type number
 * @default 0
 * @text ドロップアイテムリストID
 * @desc ドロップアイテムリストIDを指定します。（0ですべて）
 * 
 * @command EnemyBookMaskDropItem
 * @desc 敵キャラ４番の番目のドロップアイテムをマスク。
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text エネミー
 * @desc ドロップアイテムを未収得にするエネミーを指定します。
 * 
 * @arg dropListId
 * @type number
 * @default 0
 * @text ドロップアイテムリストID
 * @desc ドロップアイテムリストIDを指定します。（0ですべて）
 * 
 * @command EnemyBookGetStealItem
 * @desc 敵キャラ４番の番目のスティールアイテムを表示。
 *
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text エネミー
 * @desc スティールアイテムを取得済みにするエネミーを指定します。
 * 
 * @arg stealListId
 * @type number
 * @default 0
 * @text スティールアイテムリストID
 * @desc スティールアイテムリストIDを指定します。（0ですべて）
 * 
 * @command EnemyBookMaskStealItem
 * @desc 敵キャラ４番の番目のスティールアイテムをマスク。
 * @type number
 * @default 0
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text エネミー
 * @desc スティールアイテムを未収得にするエネミーを指定します。
 * 
 * @arg stealListId
 * @type number
 * @default 0
 * @text スティールアイテムリストID
 * @desc スティールアイテムリストIDを指定します。（0ですべて）
 * 
 * パラメータ
 * 
 * @param NumberType
 * @text エネミーのナンバー表示
 * @desc エネミーのナンバーを表示します。
 * @type select
 * @option エネミーNoの表示なし
 * @value 0
 * @option エネミーNoを表示する。
 * @value 1
 * @option エネミーNoを表示する。0埋めをする。
 * @value 2
 * @desc エネミーのNo表示
 * @default 1
 * 
 * @param BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/pictures
 * 
 * @param completeName
 * @desc 完成度の名称。
 * @text 完成度の表示名
 * @type string
 * @default 完成度
 * 
 * @param UnknownStatus
 * @desc 敵を撃破していない場合のステータス表示名
 * @text 未撃破エネミーステータス名
 * @type string
 * @default ？？？
 * 
 * @param UnknownData
 * @desc 未確認の索引名です。？1文字だけ入れると名前の文字数に応じて？に置き換えられます。
 * @text 未確認エネミー及びアイテム名
 * @type string
 * @default ？
 * 
 * @param MaxPage
 * @desc 表示するページ数を設定します。
 * @text 最大ページ数
 * @type number
 * @default 3
 * @max 3
 * @min 1
 * 
 * @param ShowCommand
 * @desc メニューコマンドにエネミー図鑑を追加します。
 * @text メニューコマンド表示
 * @type boolean
 * @default false
 * 
 * @param enemyBookSwitch 
 * @desc 表示させるフラグスイッチID
 * @text メニューコマンド表示スイッチ
 * @type switch
 * @default 0
 * 
 * @param CommandName
 * @desc コマンドの名称。
 * @text コマンドの表示名
 * @type string
 * @default 魔物図鑑
 * 
 * @param dropItemsName
 * @desc 敵が落とすアイテムの名称。
 * @text ドロップアイテム名称
 * @type string
 * @default ドロップアイテム
 * 
 * @param ShowDropItemName
 * @desc 未確認のドロップアイテムを隠す。
 * @text 未確認ドロップアイテム名
 * @type boolean
 * @default false
 * 
 * @param ShowStealItems
 * @desc スティールアイテムの表示（盗みスキル　StealableItems.jsが必要）
 * @text スティールアイテム表示
 * @type boolean
 * @default false
 * 
 * @param StealItemsName
 * @desc スティールアイテムの名称。
 * @text スティールアイテムの表示名
 * @default 盗めるアイテム
 * 
 * @param ShowStealItemName
 * @desc 未確認のスティールアイテムを隠す。
 * @text 未確認スティールアイテム表示
 * @type boolean
 * @default false
 * 
 * @param ParamData
 * @text パラメータ項目設定
 * 
 * @param ParamList
 * @desc パラメータの表示するリスト。
 * @text パラメータ表示リスト
 * @type struct<ParamListData>[]
 * @default ["{\"NameColor\":\"16\",\"ShowParams\":\"1\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowParams\":\"2\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowParams\":\"3\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowParams\":\"4\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowParams\":\"5\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowParams\":\"6\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowParams\":\"7\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowParams\":\"8\",\"MaskMode\":\"false\"}"]
 * @parent ParamData
 * 
 * @param PageData
 * @text 表示項目設定
 * 
 * @param Page1List
 * @desc １ページ目に表示するリスト。
 * @text １ページ目表示リスト
 * @type struct<Page1ListData>[]
 * @default ["{\"NameColor\":\"16\",\"ShowItem\":\"1\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"2\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"0\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"3\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"10\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"11\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"15\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"16\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}"]
 * @parent PageData
 * 
 * @param Page2List
 * @desc ２ページ目に表示するリスト。
 * @text ２ページ目表示リスト
 * @type struct<Page1ListData>[]
 * @default ["{\"NameColor\":\"16\",\"ShowItem\":\"20\",\"WideMode\":\"true\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"0\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"31\",\"WideMode\":\"true\",\"MaskMode\":\"false\"}"]
 * @parent PageData
 * 
 * @param Page3List
 * @desc ３ページ目に表示するリスト。
 * @text ３ページ目表示リスト
 * @type struct<Page1ListData>[]
 * @default ["{\"NameColor\":\"16\",\"ShowItem\":\"30\",\"WideMode\":\"true\",\"MaskMode\":\"false\"}"]
 * @parent PageData
 * 
 * @param ParamEXData
 * @text 追加パラメータ項目設定
 * 
 * @param MoneyName
 * @desc 獲得金額の名称。
 * @text 獲得金額表示名
 * @type string
 * @default 獲得金額
 * @parent ParamEXData
 * 
 * @param defeatEnemyName
 * @desc 敵を倒した数の名称。
 * @text 敵を倒した数名
 * @type string
 * @default 撃破数
 * @parent ParamEXData
 * 
 * @param originalParamName
 * @desc オリジナルパラメータの名称。
 * @text オリジナルパラメータ表示名
 * @type string
 * @default 
 * @parent ParamEXData
 * 
 * @param originalParamEval
 * @desc オリジナルパラメータの式。
 * @text オリジナルパラメータ式
 * @type string
 * @default 
 * @parent ParamEXData
 * 
 * @param Desc1Name
 * @desc 記述欄１の名称。
 * @text 記述欄１表示名
 * @type string
 * @default 
 * @parent ParamEXData
 * 
 * @param Desc2Name
 * @desc 記述欄２の名称。
 * @text 記述欄２表示名
 * @type string
 * @default 生息地
 * @parent ParamEXData
 * 
 * @param Desc3Name
 * @desc 記述欄３の名称。
 * @text 記述欄３表示名
 * @type string
 * @default 
 * @parent ParamEXData
 * 
 * @param ResistWeakData
 * @text 耐性弱点設定
 * 
 * @param ElementList
 * @desc 表示する属性。
 * @text 表示属性
 * @type struct<ElementData>[]
 * @default ["{\"ElementNo\":\"1\",\"ElementIconId\":\"76\"}","{\"ElementNo\":\"2\",\"ElementIconId\":\"64\"}","{\"ElementNo\":\"3\",\"ElementIconId\":\"65\"}","{\"ElementNo\":\"4\",\"ElementIconId\":\"64\"}","{\"ElementNo\":\"5\",\"ElementIconId\":\"65\"}","{\"ElementNo\":\"6\",\"ElementIconId\":\"66\"}","{\"ElementNo\":\"7\",\"ElementIconId\":\"67\"}","{\"ElementNo\":\"8\",\"ElementIconId\":\"68\"}","{\"ElementNo\":\"9\",\"ElementIconId\":\"69\"}"]
 * @parent ResistWeakData
 * 
 * @param StateList
 * @desc 表示するステート。
 * @text 表示ステート
 * @type struct<StateData>[]
 * @default ["{\"StateId\":\"1\"}","{\"StateId\":\"4\"}","{\"StateId\":\"5\"}","{\"StateId\":\"6\"}","{\"StateId\":\"7\"}","{\"StateId\":\"8\"}","{\"StateId\":\"9\"}","{\"StateId\":\"10\"}","{\"StateId\":\"12\"}","{\"StateId\":\"13\"}"]
 * @parent ResistWeakData
 * 
 * @param WeakElementName
 * @desc 効きやすい属性の名前です。属性有効度が101%以上で表示されます。
 * @text 効きやすい属性名称。
 * @type string
 * @default 弱点属性
 * @parent ResistWeakData
 * 
 * @param ResistElementName
 * @desc 効きにくい属性の名前です。
 * @text 効きやすい属性名称。
 * @type string
 * @default 耐性属性
 * @parent ResistWeakData
 * 
 * @param ResistNoEffectElement
 * @desc 効きにくい属性に無効を反映させるか。
 * @text 効きにくい属性に無効反映
 * @type boolean
 * @default true
 * @parent ResistWeakData
 * 
 * @param NoEffectElementName
 * @desc 効かない属性の名前です。
 * @text 効かない属性名称
 * @type string
 * @default 無効属性
 * @parent ResistWeakData
 * 
 * @param WeakStateName
 * @desc 効きやすいステートの名前です。
 * @text 効きやすいステート名称
 * @type string
 * @default 弱点ステート
 * @parent ResistWeakData
 * 
 * @param NormalWeakState
 * @desc 効きやすいステート対象を有効度100%以上から反映させるか。
 * @text 効きやすい属性有効度100%反映
 * @type boolean
 * @default true
 * @parent ResistWeakData
 * 
 * @param ResistStateName
 * @desc 効きにくいステートの名前です。
 * @text 効きにくいステート名称
 * @type string
 * @default 耐性ステート
 * @parent ResistWeakData
 * 
 * @param ResistNoEffectState
 * @desc 効きにくいステートに無効を反映させるか。
 * @text 効きにくいステートに無効反映
 * @type boolean
 * @default true
 * @parent ResistWeakData
 * 
 * @param NoEffectStateName
 * @desc 効かないステートの名前です。
 * @text 効かないステート名称
 * @type string
 * @default 無効ステート
 * @parent ResistWeakData
 * 
 */
/*~struct~ParamListData:
 * 
 * @param NameColor
 * @desc 項目の文字色。
 * @text 項目文字色
 * @type number
 * @default 16
 * 
 * @param ShowParams
 * @desc 表示させる項目のリストです。奇数が左側、偶数が右側の順に表示させます。
 * @text 項目リスト
 * @type select
 * @option 表示なし
 * @value 0
 * @option 最大HP
 * @value 1
 * @option 最大MP
 * @value 2
 * @option 攻撃力
 * @value 3
 * @option 防御力
 * @value 4
 * @option 魔法力
 * @value 5
 * @option 魔法防御
 * @value 6
 * @option 敏捷性
 * @value 7
 * @option 運
 * @value 8
 * @default 0
 * 
 * @param MaskMode
 * @desc 未撃破のエネミーのステータスを表示させません。
 * @text 未撃破ステータス表示
 * @type boolean
 * @default false
 * 
 */
/*~struct~ElementData:
 * 
 * @param ElementNo
 * @desc 表示する属性番号です。
 * @text 属性番号
 * @type number
 * 
 * @param ElementIconId
 * @desc アイコンのIDを指定します。
 * @text アイコンID
 * @type number
 */
/*~struct~StateData:
 *
 * @param StateId
 * @desc 表示するステートです。
 * @text 表示ステート
 * @type state
 *
 */
/*~struct~Page1ListData:
 * 
 * @param NameColor
 * @desc 項目の文字色。
 * @text 項目文字色
 * @type number
 * @default 16
 * 
 * @param ShowItem
 * @desc 表示させる項目のリストです。奇数が左側、偶数が右側の順に表示させます。
 * @text 項目リスト
 * @type select
 * @option 表示なし
 * @value 0
 * @option 経験値
 * @value 1
 * @option 獲得金額
 * @value 2
 * @option 倒した数
 * @value 3
 * @option オリジナルパラメータ
 * @value 4
 * @option 耐性属性
 * @value 10
 * @option 弱点属性
 * @value 11
 * @option 無効属性
 * @value 12
 * @option 耐性ステート
 * @value 15
 * @option 弱点ステート
 * @value 16
 * @option 無効ステート
 * @value 17
 * @option ドロップアイテム
 * @value 20
 * @option スティールアイテム
 * @value 21
 * @option 記述欄１
 * @value 30
 * @option 記述欄２
 * @value 31
 * @option 記述欄３
 * @value 32
 * @default 0
 * 
 * @param WideMode
 * @desc 項目の横いっぱいに表示する。左側（奇数）のみ有効です。
 * 右の項目(偶数）は0（表示なし)に設定してください。
 * @text 項目２列幅表示
 * @type boolean
 * @default false
 * 
 * @param MaskMode
 * @desc 未撃破エネミーのステータス詳細情報を表示させません。
 * @text 未撃破ステータス表示
 * @type boolean
 * @default false
 * 
 */

var Imported = Imported || {};
Imported.NUUN_EnemyBook = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_EnemyBook');
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

  const pluginName = "NUUN_EnemyBook";

  PluginManager.registerCommand(pluginName, 'EnemyBookOpen', args => {
    SceneManager.push(Scene_EnemyBook);
  });

  PluginManager.registerCommand(pluginName, 'EnemyBookAdd', args => {
    $gameSystem.addToEnemyBook(Number(args.enemyId));
  });

  PluginManager.registerCommand(pluginName, 'EnemyBookRemove', args => {
    $gameSystem.removeFromEnemyBook(Number(args.enemyId));
  });

  PluginManager.registerCommand(pluginName, 'EnemyBookComplete', args => {
    $gameSystem.completeEnemyBook();
  });

  PluginManager.registerCommand(pluginName, 'EnemyBookClear', args => {
    $gameSystem.clearEnemyBook();
  });

  PluginManager.registerCommand(pluginName, 'EnemyBookGetDropItem', args => {
    $gameSystem.DropItemListFlag(args, true);
  });

  PluginManager.registerCommand(pluginName, 'EnemyBookMaskDropItem', args => {
    $gameSystem.DropItemListFlag(args, false);
  });

  PluginManager.registerCommand(pluginName, 'EnemyBookGetStealItem', args => {
    $gameSystem.StealItemListFlag(args.ememyId , args.dropListId, true);
  });

  PluginManager.registerCommand(pluginName, 'EnemyBookMaskStealItem', args => {
    $gameSystem.StealItemListFlag(args.ememyId, args.stealListId, false);
  });

  Game_System.prototype.addToEnemyBook = function(enemyId) {
    if (!this._enemyBookFlags) {
      this.clearEnemyBook();
    }
    this._enemyBookFlags[enemyId] = true;
 };

 Game_System.prototype.removeFromEnemyBook = function(enemyId) {
  if (this._enemyBookFlags) {
    this._enemyBookFlags[enemyId] = false;
  }
};

Game_System.prototype.completeEnemyBook = function() {
  this.clearEnemyBook();
  for (var i = 1; i < $dataEnemies.length; i++) {
    this._enemyBookFlags[i] = true;
    this.DropItemListFlag(i, 0, true);
    this.StealItemListFlag(i, 0, true);
    this.incrementDefeatNumber(i);
  }
};

Game_System.prototype.clearEnemyBook = function() {
  this._enemyBookFlags = [];
};

Game_System.prototype.isInEnemyBook = function(enemy) {
  if (this._enemyBookFlags && enemy) {
    return !!this._enemyBookFlags[enemy._enemyId];
  } else {
    return false;
  }
};

Game_System.prototype.clearDefeatNumber = function() {
	this._defeatNumbers = [];
};

Game_System.prototype.incrementDefeatNumber = function(id) {
	if (!this._defeatNumbers) {
		this.clearDefeatNumber();
	}
	if (!this._defeatNumbers[id]) {
		this._defeatNumbers[id] = 0;
	}
	this._defeatNumbers[id]++;
};

Game_System.prototype.defeatNumber = function(id) {
	if (!this._defeatNumbers) {
		this.clearDefeatNumber();
	}
	if (!this._defeatNumbers[id]) {
		this._defeatNumbers[id] = 0;
	}
	return this._defeatNumbers[id];
};

Game_System.prototype.clearDropItem = function() {
	this._itemDorps = [];
};

Game_System.prototype.setDropItemFlag = function(enemyId,id, flag) {
	if (!this._itemDorps) {
		this.clearDropItem();
  }
	if (!this._itemDorps[enemyId]) {
		this._itemDorps[enemyId] = [];
  }
  this._itemDorps[enemyId][id] = flag;
};

Game_System.prototype.getDropItemFlag = function(enemyId,id) {
	if (!this._itemDorps) {
		this.clearDropItem();
	}
	if (!this._itemDorps[enemyId] || !this._itemDorps[enemyId][id]) {
		return false;
  }
  return this._itemDorps[enemyId][id];
};

Game_System.prototype.clearStealItem = function() {
	this._stealItem = [];
};

Game_System.prototype.setStealItemFlag = function(enemyId,id, flag) {
	if (!this._stealItem) {
		this.clearStealItem();
  }
	if (!this._stealItem[enemyId]) {
		this._stealItem[enemyId] = [];
  }
  this._stealItem[enemyId][id] = flag;
};

Game_System.prototype.getStealItemFlag = function(enemyId,id) {
	if (!this._stealItem) {
		this.clearStealItem();
	}
	if (!this._stealItem[enemyId] || !this._stealItem[enemyId][id]) {
		return false;
  }
  return this._stealItem[enemyId][id];
};

Game_System.prototype.DropItemListFlag = function(enemyId, dropListId, mode) {
	if(enemyId > 0){
    if(dropListId > 0){
      this.setDropItemFlag(enemyId, dropListId, mode)
    } else {
      const enemy = new Game_Enemy(enemyId, 0, 0);
      let itemList = $dataEnemies[enemyId].dropItems;//.concat(Imported.NUUN_AddDropItems ? enemy._dripItemEX : []);
      itemList = itemList.concat(Imported.NUUN_AddDropItems ? enemy._dripItemEX : []);
       for(let i = 0; itemList.length > i; i++){
        this.setDropItemFlag(enemyId, i, mode);
      }
    }
  }
};

Game_System.prototype.StealItemListFlag = function(enemyId, stealListId, mode) {
	if(enemyId > 0){
    if(stealListId > 0){
      this.setDropItemFlag(enemyId, stealListId, mode)
    } else {
      const enemy = new Game_Enemy(enemyId, 0, 0);
      const itemList = (Imported.NUUN_StealableItems ? enemy._stealItems : []);
      for(let i = 0; itemList.length > i; i++){
        this.setStealItemFlag(enemyId, i, mode)
      }
    }
  }
};

const _Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
   	_Game_Troop_setup.call(this, troopId);
  	this.members().forEach(function(enemy) {
      	if (enemy.isAppeared()) {
       		$gameSystem.addToEnemyBook(enemy.enemyId());
      	}
   	}, this);
};

const _Game_Enemy_appear = Game_Enemy.prototype.appear;
Game_Enemy.prototype.appear = function() {
  	_Game_Enemy_appear.call(this);
 	$gameSystem.addToEnemyBook(this._enemyId);
};

const _Game_Enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
	_Game_Enemy_transform.call(this, enemyId);
	$gameSystem.addToEnemyBook(enemyId);
};

const _Game_Enemy_die = Game_Enemy.prototype.die;
Game_Enemy.prototype.die = function() {
	_Game_Enemy_die.call(this);
	$gameSystem.incrementDefeatNumber(this.enemyId());
};

Game_Enemy.prototype.dropItemFlag = function(drop) {
  const enemyId = this._enemyId;
  let di = this.enemy().dropItems;
  if(Imported.NUUN_AddDropItems){
    di.concat(this.dropItemList());
  }
  for (let i = 0; i < drop.length; i++){
    for(let r = 0; r < di.length; r++){
      if(drop[i].id === di[r].dataId){
        switch (di[r].kind) {
        case 1:
          if(DataManager.isItem(drop[i])){
            $gameSystem.setDropItemFlag(this._enemyId, r, true);
          } 
          break;
        case 2:
          if(DataManager.isWeapon(drop[i])){
            $gameSystem.setDropItemFlag(this._enemyId, r, true);
          }
          break;
        case 3:
          if(DataManager.isArmor(drop[i])){
            $gameSystem.setDropItemFlag(this._enemyId, r, true);
          }
          break;
        }
      }
    }
  }
};

const _Game_Enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
Game_Enemy.prototype.makeDropItems = function() {
  const drop = _Game_Enemy_makeDropItems.call(this);
  this.dropItemFlag(drop);
  return drop;
};

Game_Enemy.prototype.stealItemFlag = function() {
  const enemyId = this._enemyId;
  const number = $gameSystem._stealIndex;
  $gameSystem.setStealItemFlag(enemyId, number, true);
};

const _Game_Enemy_makeStealItems = Game_Enemy.prototype.makeStealItems;
Game_Enemy.prototype.makeStealItems = function(rate, mode) {
  const di = _Game_Enemy_makeStealItems.call(this, rate, mode)
  if(mode === 1 && di){
    this.stealItemFlag();
  }
  return di;
};

function Scene_EnemyBook() {
  this.initialize(...arguments);
}

Scene_EnemyBook.prototype = Object.create(Scene_MenuBase.prototype);
Scene_EnemyBook.prototype.constructor = Scene_EnemyBook;

Scene_EnemyBook.prototype.initialize = function() {
	Scene_MenuBase.prototype.initialize.call(this);
};

Scene_EnemyBook.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createPercentWindow();
  this.createIndexWindow();
  this.createItemWindow();
  this._indexWindow.setStatusWindow(this._enemyStatusWindow);
  this._indexWindow.setPercentWindow(this._percentWindow);
  if(param.BackGroundImg){
    this._indexWindow.opacity = 0;
		this._percentWindow.opacity = 0;
		this._enemyStatusWindow.opacity = 0;
  }
};

const _Scene_EnemyBook_createBackground = Scene_EnemyBook.prototype.createBackground;
Scene_EnemyBook.prototype.createBackground = function() {
	if (param.BackGroundImg) {
		this._backgroundSprite = new Sprite();
		this._backgroundSprite.bitmap = ImageManager.loadPicture(param.BackGroundImg);
		this.addChild(this._backgroundSprite);
		return;
	}
	_Scene_EnemyBook_createBackground.call(this);
};

Scene_EnemyBook.prototype.createPercentWindow = function() {
  const rect = this.percentWindowRect();
  this._percentWindow = new Window_EnemyBookPercent(rect);
  this.addWindow(this._percentWindow);
};

Scene_EnemyBook.prototype.percentWindowRect = function() {
  const ww = Graphics.boxWidth / 3;
  const wh = this.calcWindowHeight(1, true);
  const wx = 0;
  const wy = this.mainAreaTop();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.createIndexWindow = function() {
  const rect = this.indexWindowRect();
  this._indexWindow = new Window_EnemyBookIndex(rect);
  this._indexWindow.setHandler('cancel', this.popScene.bind(this));
  this._indexWindow.setHandler('pagedown', this.updateContentsPagedown.bind(this));
  this._indexWindow.setHandler('pageup', this.updateContentsPageup.bind(this));
  this.addWindow(this._indexWindow);
};

Scene_EnemyBook.prototype.updateContentsPagedown = function() {
	const maxPage = this.setMaxPage();
	this._enemyStatusWindow._pageMode = (this._enemyStatusWindow._pageMode + 1) % maxPage;
  this._enemyStatusWindow.refresh();
	this._indexWindow.activate();
};

Scene_EnemyBook.prototype.updateContentsPageup = function() {
	const maxPage = this.setMaxPage();
	this._enemyStatusWindow._pageMode = (this._enemyStatusWindow._pageMode + (maxPage - 1)) % maxPage;
  this._enemyStatusWindow.refresh();
	this._indexWindow.activate();
};

Scene_EnemyBook.prototype.setMaxPage = function() {
  return param.MaxPage;
};

Scene_EnemyBook.prototype.indexWindowRect = function() {
  const wx = 0;
  const wy = this.mainAreaTop() + this._percentWindow.height;
  const ww = Graphics.boxWidth / 3;
  const wh = Graphics.boxHeight - wy;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.createItemWindow = function() {
  const rect = this.itemWindowRect();
  this._enemyStatusWindow = new Window_EnemyStatus(rect);
  this.addWindow(this._enemyStatusWindow);
};

Scene_EnemyBook.prototype.itemWindowRect = function() {
  const wx = Graphics.boxWidth / 3;
  const wy = this.mainAreaTop();
  const ww = Graphics.boxWidth - wx;
  const wh = Graphics.boxHeight - wy;
  return new Rectangle(wx, wy, ww, wh);
};

const _Scene_EnemyBook_update = Scene_EnemyBook.prototype.update;
Scene_EnemyBook.prototype.update = function() {
  _Scene_EnemyBook_update.call(this);
  if (param.BackGroundImg) {
		var scaleX = (Graphics.boxWidth !== this._backgroundSprite.bitmap.width ? Graphics.boxWidth / this._backgroundSprite.bitmap.width : 1);
		var scaleY = (Graphics.boxHeight !== this._backgroundSprite.bitmap.height ? Graphics.boxHeight / this._backgroundSprite.bitmap.height : 1);
		this._backgroundSprite.scale.x = scaleX;
		this._backgroundSprite.scale.y = scaleY;
	}
	if (Input.isTriggered('left')) {
		SoundManager.playCursor();
		this.updateContentsPageup();
	} else if (Input.isTriggered('right')){
		SoundManager.playCursor();
		this.updateContentsPagedown();
	}
};

const _Scene_Menu_createCommandWindow =　Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("enemyBook", this.commandEnemyBook.bind(this));
}

Scene_Menu.prototype.commandEnemyBook = function() {
  SceneManager.push(Scene_EnemyBook);
};

const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
  _Window_MenuCommand_addOriginalCommands.call(this);
  if (param.ShowCommand) {
    if(param.enemyBookSwitch > 0 && $gameSwitches.value(param.enemyBookSwitch)) {
      this.addCommand(param.CommandName, "enemyBook");
    } else if(!param.enemyBookSwitch){
      this.addCommand(param.CommandName, "enemyBook");
    }
  }
};

Window_MenuCommand.prototype.enemyBookCommandShow = function() {
  return param.enemyBookSwitch > 0 && $gameSwitches.value(param.enemyBookSwitch);
};

function Window_EnemyBookPercent() {
  this.initialize(...arguments);
}

Window_EnemyBookPercent.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBookPercent.prototype.constructor = Window_EnemyBookPercent;

Window_EnemyBookPercent.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this._encounteredPercent = 0;
};

Window_EnemyBookPercent.prototype.encountered = function(list) {
	const encountered = list.reduce(function(r ,enemy) {
		return r + ($gameSystem.isInEnemyBook(enemy) ? 1 : 0);
	}, 0);
	this._encounteredPercent = Math.floor(encountered / list.length * 100);
};

Window_EnemyBookPercent.prototype.refresh = function() {
  const lineHeight = this.lineHeight();
  const rect = this.itemLineRect(0);
	//this.drawText('遭遇済み: '+ this._encounteredPercent +' %', 0, lineHeight * 0, this.contentsWidth(), 'center');
	this.drawText(param.completeName +': '+ this._encounteredPercent +' %', rect.x, rect.y, rect.width, 'center');
};

Window_EnemyBookPercent.prototype.update = function() {
};

function Window_EnemyBookIndex() {
  this.initialize(...arguments);
}

Window_EnemyBookIndex.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBookIndex.prototype.constructor = Window_EnemyBookIndex;

Window_EnemyBookIndex.lastTopRow = 0;
Window_EnemyBookIndex.lastIndex  = 0;

Window_EnemyBookIndex.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this.refresh();
  this.setTopRow(Window_EnemyBookIndex.lastTopRow);
  this.select(Window_EnemyBookIndex.lastIndex);
 	this.activate();
};

Window_EnemyBookIndex.prototype.maxCols = function() {
  return 1;
};

Window_EnemyBookIndex.prototype.maxItems = function() {
  return this._list ? this._list.length : 0;
};

Window_EnemyBookIndex.prototype.setPercentWindow = function(percentWindow) {
  this._percentWindow = percentWindow;
  this.updatePercent();
};

Window_EnemyBookIndex.prototype.setStatusWindow = function(statusWindow) {
  this._enemyStatusWindow = statusWindow;
  this.updateEnemyStatus();
};

Window_EnemyBookIndex.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	this.updateEnemyStatus();
};

Window_EnemyBookIndex.prototype.updatePercent = function() {
  if (this._percentWindow) {
    const enemy = this._list;
    this._percentWindow.encountered(enemy);
    this._percentWindow.refresh();
  }
};

Window_EnemyBookIndex.prototype.updateEnemyStatus = function() {
  if (this._enemyStatusWindow) {
    const enemy = this._list[this.index()];
    this._enemyStatusWindow.setEnemy(enemy);
  }
};

Window_EnemyBookIndex.prototype.refresh = function() {
	this._list = [];
	for (let i = 1; i < $dataEnemies.length; i++) {
    let enemy = $dataEnemies[i];
    if (enemy.name && enemy.meta.book !== 'no') {
			let enemys = new Game_Enemy(i, 0, 0);
      this._list.push(enemys);
    }
  }
  this.createContents();
  this.drawAllItems();
};

Window_EnemyBookIndex.prototype.EnemyNameLength = function(enemy) {
	return enemy.name().length;
};

Window_EnemyBookIndex.prototype.unknownDataLength = function(enemy) {
  const name_length = this.EnemyNameLength(enemy);
	let name = '';
	for(let i = 0; i < name_length ;i++) {
		name += param.UnknownData;
	}
	return name;
};

Window_EnemyBookIndex.prototype.drawItem = function(index) {
	const enemy = this._list[index];
	const rect = this.itemLineRect(index);
	let name = '';
 	if ($gameSystem.isInEnemyBook(enemy)) {
    name = enemy.name();
	} else {
    name = this.unknownDataLength(enemy);
  }
  let textWidth = null;
  let numberText = index += 1;
  if(param.NumberType === 1){
    textWidth = (numberText >= 1000 ? "000" : "00");
  } else if(param.NumberType === 2){
    textWidth = "000";
    numberText = (this._list.length >= 1000 ? ('0000' + numberText).slice(-4) : ('000' + numberText).slice(-3));
  }
  textWidth = (textWidth ? this.textWidth(textWidth) : 0);
  if(param.NumberType >= 1 ){
    this.drawText(numberText, rect.x, rect.y, textWidth);
    this.drawText(":", rect.x + textWidth + 6, rect.y);
    this.drawText(name, rect.x + textWidth + 16, rect.y, rect.width - textWidth - 16);
  } else {
    this.drawText(name, rect.x, rect.y, rect.width); 
  }
  
};

Window_EnemyBookIndex.prototype.processCancel = function() {
  Window_Selectable.prototype.processCancel.call(this);
  Window_EnemyBookIndex.lastTopRow = this.topRow();
  Window_EnemyBookIndex.lastIndex = this.index();
};


function Window_EnemyStatus() {
  this.initialize(...arguments);
}

Window_EnemyStatus.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyStatus.prototype.constructor = Window_EnemyStatus;

Window_EnemyStatus.prototype.initialize = function(rect) {
  Window_Base.prototype.initialize.call(this, rect);
  this._enemy = null;
  this._pageMode = 0;
  this._enemySprite = new Sprite();
  this._enemySprite.anchor.x = 0.5;
  this._enemySprite.anchor.y = 0.5;
  this._enemySprite.x = rect.width / 4;
  this._enemySprite.y = rect.height / 4 + this.lineHeight();
  this.addChildToBack(this._enemySprite);
  this.refresh();
};

Window_EnemyStatus.prototype.setEnemy = function(enemy) {
  if (this._enemy !== enemy) {
    this._enemy = enemy;
    this.refresh();
  }
};

Window_EnemyStatus.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	if (this._enemySprite.bitmap) {
    const bitmapWidth = this._enemySprite.bitmap.width;
		const bitmapHeight = this._enemySprite.bitmap.height;
    const contentsWidth = this.maxWidth();
		const contentsHeight = 350;
    let scale = 1.0;
      if (bitmapWidth > contentsWidth || bitmapHeight > contentsHeight) {
			  if (bitmapWidth - contentsWidth > bitmapHeight - contentsHeight) {
				  scale = contentsWidth / bitmapWidth;
			  } else {
			  	scale = contentsHeight / bitmapHeight;
			  }
    	}
    	this._enemySprite.scale.x = scale;
   		this._enemySprite.scale.y = scale;
  }
};

Window_EnemyStatus.prototype.maxWidth = function() {
  return this.itemWidth() / 2 - this.itemPadding() * 2;
};

Window_EnemyStatus.prototype.enemyImg = function(enemy) {
	const name = this.enemyBattlerName(enemy);
	const hue = enemy.battlerHue();
	let bitmap;
  	if ($gameSystem.isSideView()) {
      	bitmap = ImageManager.loadSvEnemy(name);
  	} else {
      	bitmap = ImageManager.loadEnemy(name);
    }
    Sprite_Battler.prototype.setHue.call(this._enemySprite, hue);
   	this._enemySprite.bitmap = bitmap;
};

Window_EnemyStatus.prototype.enemyBattlerName = function(enemy) {
	return enemy.battlerName();
};

Window_EnemyStatus.prototype.enemyName = function(enemy, x, y) {
	this.resetTextColor();
	this.drawText(enemy.name(), x, y, this.contentsWidth(), 'center');
};

Window_EnemyStatus.prototype.enemyParams = function(enemy, x, y) {
  const list = param.ParamList;
	for (let i = 0; i < list.length; i++) {
		this.changeTextColor(ColorManager.textColor(list[i].NameColor));
		this.drawText(TextManager.param(list[i].ShowParams - 1), x, y, this.maxWidth());
    this.resetTextColor();
    let text;
    if(list[i].MaskMode && !this.noUnknownStatus(enemy)){
      text = ($gameSystem.defeatNumber(enemy.enemyId()) > 0 ? enemy.param(list[i].ShowParams - 1) : param.UnknownStatus);
    } else {
      text = enemy.param(list[i].ShowParams - 1);
    }
		this.drawText(text, x, y, this.maxWidth(), 'right');
		y += this.lineHeight();
	}
};

Window_EnemyStatus.prototype.enemyExp = function(color, enemy, x, y, width, mask) {
	this.changeTextColor(ColorManager.textColor(color));
	this.drawText(TextManager.exp, x, y);
  this.resetTextColor();
  let text;
  if(mask && !this.noUnknownStatus(enemy)){
    text = ($gameSystem.defeatNumber(enemy.enemyId()) > 0 ? enemy.exp() : param.UnknownStatus);
  } else {
    text = enemy.exp();
  }
	this.drawText(text, x, y, width, 'right');
};

Window_EnemyStatus.prototype.enemyGold = function(color, enemy, x, y, width, mask) {
	this.changeTextColor(ColorManager.textColor(color));
	this.drawText(param.MoneyName, x, y);
  this.resetTextColor();
  let text;
  if(mask && !this.noUnknownStatus(enemy)){
    text = ($gameSystem.defeatNumber(enemy.enemyId()) > 0 ? enemy.gold() : param.UnknownStatus);
  } else {
    text = enemy.gold();
  }
	this.drawText(text, x, y, width, 'right');
};

Window_EnemyStatus.prototype.defeatEnemy = function(color, enemy, x, y, width, mask) {
	this.changeTextColor(ColorManager.textColor(color));
	this.drawText(param.defeatEnemyName, x, y);
  this.resetTextColor();
  let text;
  if(mask && !this.noUnknownStatus(enemy)){
    text = ($gameSystem.defeatNumber(enemy.enemyId()) > 0 ? $gameSystem.defeatNumber(enemy.enemyId()) : param.UnknownStatus);
  } else {
    text = $gameSystem.defeatNumber(enemy.enemyId())
  }
	  this.drawText(text, x, y, width, 'right');
};

Window_EnemyStatus.prototype.originalParams = function(color, enemy, x, y, width, mask) {
  if(!param.originalParamName){
    return this;
  }
	this.changeTextColor(ColorManager.textColor(color));
	this.drawText(param.originalParamName, x, y);
  this.resetTextColor();
  let text;
  if(mask && !this.noUnknownStatus(enemy)){
    text = ($gameSystem.defeatNumber(enemy.enemyId()) > 0 ? eval(param.originalParamEval) : param.UnknownStatus);
  } else {
    text = eval(param.originalParamEval);
  }
	this.drawText(text, x, y, width, 'right');
};

Window_EnemyStatus.prototype.drawResistElement = function(color, enemy, x, y, width, mask) {
  let icons = [];
  if(!param.ElementList){
    return;
  }
  this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.ResistElementName, x, y);
  if(this.unknownStatusFlag(enemy, mask) && !this.noUnknownStatus(enemy)){
    return this;
  }
  param.ElementList.forEach(Element => {
    if(Element.ElementNo){
      let rate = enemy.elementRate(Element.ElementNo);
      if(rate < 1 && param.ResistNoEffectElement || (rate < 1 && rate > 0 && !param.ResistNoEffectElement)){
        let icon= Element.ElementIconId;
        if (icon) icons.push(icon);
      }
    }
  });
	let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
		this.drawIcon(icon, x, y);
		x += dx;
	});
};

Window_EnemyStatus.prototype.drawWeakElement = function(color, enemy, x, y, width, mask) {
  let icons = [];
  if(!param.ElementList){
    return;
  }
  this.changeTextColor(ColorManager.textColor(color));
	this.drawText(param.WeakElementName, x, y);
  if(this.unknownStatusFlag(enemy, mask) && !this.noUnknownStatus(enemy)){
    return this;
  }
  param.ElementList.forEach(Element => {
    if (Element.ElementNo) {
      let rate = enemy.elementRate(Element.ElementNo);
      if (rate > 1) {
        let icon= Element.ElementIconId;
        if (icon) icons.push(icon);
      }
    }
  });
	let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
		this.drawIcon(icon, x, y);
		x += dx;
	});
};

Window_EnemyStatus.prototype.drawNoEffectElement = function(color, enemy, x, y, width, mask) {
  let icons = [];
  if(!param.ElementList){
    return;
  }
  this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.NoEffectElementName, x, y);
  if(this.unknownStatusFlag(enemy, mask) && !this.noUnknownStatus(enemy)){
    return this;
  }
  param.ElementList.forEach(Element => {
    if (Element.ElementNo) {
      let rate = enemy.elementRate(Element.ElementNo);
      if (rate <= 0) {
        let icon= Element.ElementIconId;
        if (icon) icons.push(icon);
      }
    }
  });
	let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
		this.drawIcon(icon, x, y);
		x += dx;
	});
};

Window_EnemyStatus.prototype.drawResistStates = function(color, enemy, x, y, width, mask) {
  let icons = [];
  if(!param.StateList){
    return;
  }
  this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.ResistStateName, x, y);
  if(this.unknownStatusFlag(enemy, mask) && !this.noUnknownStatus(enemy)){
    return this;
  }
  param.StateList.forEach(State => {
    if(State.StateId){
      let stateId = State.StateId;
      let rate = enemy.stateRate(stateId);
      if(rate < 1 && param.ResistNoEffectState || (rate < 1 && rate > 0 && !param.ResistNoEffectState)){
        let icon = $dataStates[stateId].iconIndex;
        if (icon) icons.push(icon);
      }
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
  });
};

Window_EnemyStatus.prototype.drawWeakStates = function(color, enemy, x, y, width, mask) {
  let icons = [];
  if(!param.StateList){
    return;
  }
  this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.WeakStateName, x, y);
  if(this.unknownStatusFlag(enemy, mask) && !this.noUnknownStatus(enemy)){
    return this;
  }
  param.StateList.forEach(State => {
  if(State.StateId){
    let stateId = State.StateId;
    let rate = enemy.stateRate(stateId);
    if (rate > 1 && !param.NormalWeakState || rate >= 1 && param.NormalWeakState) {
      let icon = $dataStates[stateId].iconIndex;
      if (icon) icons.push(icon);
      }
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
  });
};

Window_EnemyStatus.prototype.drawNoEffectStates = function(color, enemy, x, y, width, mask) {
  let icons = [];
  if(!param.StateList){
    return;
  }
  this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.NoEffectStateName, x, y);
  if(this.unknownStatusFlag(enemy, mask) && !this.noUnknownStatus(enemy)){
    return this;
  }
  param.StateList.forEach(State => {
    if(State.StateId){
      let stateId = State.StateId;
      let icon;
      let rate = enemy.stateRate(stateId);
      if (rate <= 0 || enemy.isStateResist(stateId)) {
        icon = $dataStates[stateId].iconIndex;
        if (icon) icons.push(icon);
      }
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
	});
};

Window_EnemyStatus.prototype.iconX = function(icons, width) {
	if (32 * icons.length > width) {
		return Math.floor(width / icons.length);
	}
	return 32;
};

Window_EnemyStatus.prototype.dropItems = function(color, enemy, x, y, width, mask) {
  const dataEnemy = enemy.enemy();
  const maxWidth = width;
	this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.dropItemsName, x, y);
  if(this.unknownStatusFlag(enemy, mask) && (!this.noUnknownStatus(enemy) || !this.noUnknownDrops(enemy))){
    return this;
  }
  let y2 = y + this.lineHeight();
  let list = dataEnemy.dropItems.concat(this.dropItemsEX(enemy));
  for(i = 0; i < list.length; i++){
    if(list[i].kind > 0){
      let item = enemy.itemObject(list[i].kind, list[i].dataId);
      if(param.ShowDropItemName && !$gameSystem.getDropItemFlag(enemy._enemyId, i)) {
        this.resetTextColor();
        this.drawText(this.unknownDataLength(item.name), x, y2, maxWidth,'left');
      } else {
        let rate = list[i].denominator;
        let textWidth = this.textWidth("1/" + rate);
        this.drawItemName(item, x, y2, maxWidth - textWidth - this.itemPadding());
        this.drawText("1/" + rate, x, y2, maxWidth,'right');
      }
      y2 += this.lineHeight();
    }
  }
};

Window_EnemyStatus.prototype.dropItemsEX = function(enemy) {
  if(!Imported.NUUN_AddDropItems){
    return [];
  }
  return enemy._dripItemEX;
};

Window_EnemyStatus.prototype.stealItems = function(color, enemy, x, y, width, mask) {
	if(!param.ShowStealItems || !Imported.NUUN_StealableItems) {
		return this;
	}
	const maxWidth = width;
	this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.StealItemsName, x, y);
  if(this.unknownStatusFlag(enemy, mask) && (!this.noUnknownStatus(enemy) || !this.noUnknownSteals(enemy))){
    return this;
  }
  let y2 = y + this.lineHeight();
  let list = enemy._stealItems;
  for(let i = 0; list.length > i; i++){
    if (list[i].kind > 0 && list[i].kind < 4) {
      let item = enemy.stealObject(list[i].kind, list[i].dataId);
      if(param.ShowStealItemName && !$gameSystem.getStealItemFlag(enemy._enemyId, i)) {
        this.resetTextColor();
        this.drawText(this.unknownDataLength(item.name), x, y2, maxWidth,'left');
      } else {
        let rate = list[i].denominator;
        let textWidth = this.textWidth(rate +"%");
        this.drawItemName(item, x, y2, maxWidth - textWidth - this.itemPadding());
        this.drawText(rate +"%", x, y2, maxWidth,'right');
      }
      y2 += this.lineHeight();
    }
  }
};

Window_EnemyStatus.prototype.nameLength = function(name) {
	return name.length;
};

Window_EnemyStatus.prototype.unknownDataLength = function(name) {
const name_length = this.nameLength(name);
let names = '';
for(let i = 0; i < name_length ;i++) {
  names += param.UnknownData;
}
return names;
};

Window_EnemyStatus.prototype.drawDesc1 = function(color, enemy, x, y, width, mask) {
  if (param.Desc1Name) {
    this.changeTextColor(ColorManager.textColor(color));
    this.drawText(param.Desc1Name, x, y);
    y += this.lineHeight();
  }
  if(this.unknownStatusFlag(enemy, mask) && !this.noUnknownStatus(enemy)){
    return this;
  }
  this.resetTextColor();
  const dataEnemy = enemy.enemy();
  if(dataEnemy.meta.desc1){
    this.drawTextEx(dataEnemy.meta.desc1, x, y, width);
  }
};

Window_EnemyStatus.prototype.drawDesc2 = function(color, enemy, x, y, width, mask) {
  if (param.Desc2Name) {
    this.changeTextColor(ColorManager.textColor(color));
    this.drawText(param.Desc2Name, x, y);
    y += this.lineHeight();
  }
  if(this.unknownStatusFlag(enemy, mask) && !this.noUnknownStatus(enemy)){
    return this;
  }
  this.resetTextColor();
  const dataEnemy = enemy.enemy();
  if(dataEnemy.meta.desc2){
    this.drawTextEx(dataEnemy.meta.desc2, x, y, width);
  }
};

Window_EnemyStatus.prototype.drawDesc3 = function(color, enemy, x, y, width, mask) {
  if (param.Desc3Name) {
    this.changeTextColor(ColorManager.textColor(color));
    this.drawText(param.Desc3Name, x, y);
    y += this.lineHeight();
  }
  if(this.unknownStatusFlag(enemy, mask) && !this.noUnknownStatus(enemy)){
    return this;
  }
  this.resetTextColor();
  const dataEnemy = enemy.enemy();
  if(dataEnemy.meta.desc3){
    this.drawTextEx(dataEnemy.meta.desc3, x, y, width);
  }
};


Window_EnemyStatus.prototype.page = function(enemy, x, y) {
  const list = this.pageList(this._pageMode + 1);
  if(!list) {
    return;
  }
  const lineHeight = this.lineHeight();
  let width = 0;
  let y_Left = y;
  let y_Right = y;
  let row = 0;
  for(let i = 0; list.length > i; i++){
    if(list[i].ShowItem >= 0){
      if(i % 2 === 0){
        width = this.widthMode(list[i].WideMode);
        row = this.itemShow(list[i], enemy, x, y_Right, width);
        y_Right += row * lineHeight;
      } else {
        width = this.maxWidth();
        row = this.itemShow(list[i], enemy, x + this.itemWidth() / 2, y_Left, width);
        y_Left += row * lineHeight;
      }
    }
  }
};

Window_EnemyStatus.prototype.unknownStatusFlag = function(enemy, mask) {
  return mask && !$gameSystem.defeatNumber(enemy.enemyId()) > 0;
};

Window_EnemyStatus.prototype.noUnknownStatus = function(enemy) {
  return enemy.enemy().meta.book === 'ShowData';
};

Window_EnemyStatus.prototype.noUnknownDrops = function(enemy) {
  return enemy.enemy().meta.book === 'ShowDrop';
};

Window_EnemyStatus.prototype.noUnknownSteals = function(enemy) {
  return enemy.enemy().meta.book === 'ShowSteal';
};

Window_EnemyStatus.prototype.pageList = function(page) {
  if(page === 1){
    return param.Page1List
  } else if(page === 2) {
    return param.Page2List
  } else {
    return param.Page3List
  }
};

Window_EnemyStatus.prototype.widthMode = function(mode) {
  return mode ? this.itemWidth() - this.itemPadding() * 2 : this.maxWidth();
};

Window_EnemyStatus.prototype.itemShow = function(list, enemy, x, y, width) {
  if(list.ShowItem == 1){
    this.enemyExp(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 1;
  } else if(list.ShowItem == 2) {
    this.enemyGold(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 1;
  } else if (list.ShowItem == 3) {
    this.defeatEnemy(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 1;
  } else if (list.ShowItem == 4) {
    this.originalParams(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 1;
  } else if (list.ShowItem == 10) {
    this.drawResistElement(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 2;
  } else if (list.ShowItem == 11) {
    this.drawWeakElement(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 2;
  } else if (list.ShowItem == 12) {
    this.drawNoEffectElement(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 2;
  } else if (list.ShowItem == 13) {
    //this.drawAbsorbElement(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 2;
  } else if (list.ShowItem == 15) {
    this.drawResistStates(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 2;
  } else if (list.ShowItem == 16) {
    this.drawWeakStates(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 2;
  } else if (list.ShowItem == 17) {
    this.drawNoEffectStates(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 2;
  } else if (list.ShowItem == 20) {
    this.dropItems(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 4;
  } else if (list.ShowItem == 21) {
    this.stealItems(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 4;
  } else if (list.ShowItem == 30) {
    this.drawDesc1(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 2;
  } else if (list.ShowItem == 31) {
    this.drawDesc2(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 2;
  } else if (list.ShowItem == 32) {
    this.drawDesc3(list.NameColor, enemy, x, y, width, list.MaskMode);
    return 2;
  }
  return 1;
};

Window_EnemyStatus.prototype.HDGraphics = function() {
  return Graphics.height >= 720;
};

Window_EnemyStatus.prototype.refresh = function() {
	const enemy = this._enemy;
  const padding = this.itemPadding();
  let x = padding;
  let x2 = x + this.itemWidth() / 2;
  let y = 0;
  const lineHeight = this.lineHeight();

	this.contents.clear();
  if (!enemy || !$gameSystem.isInEnemyBook(enemy)) {
    this._enemySprite.bitmap = null;
    return;
  }
  this.enemyImg(enemy);
  this.enemyName(enemy, x, y);
  y += lineHeight * (this.HDGraphics() && this.height >= 712 ? 2 : 1);
  this.enemyParams(enemy, x2, y);
  y += lineHeight * (this.height > 610 ? 9 : 8);//564:616
  if (this._pageMode === 0) {
    this.page(enemy, x, y);
  } else if (this._pageMode === 1) {
    this.page(enemy, x, y);
  } else if (this._pageMode === 2) {
    this.page(enemy, x, y);
  }
};

})();
