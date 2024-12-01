/*:-----------------------------------------------------------------------------------
 * NUUN_CallingEnemy.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Skill for enemies to call allies
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * You can set skills that allow enemies to call allies.
 * 
 * Skill notes
 * <CallEnemy:[id]> Call your buddy.
 * [id]:The ID or identification name of the configuration list for the plugin parameter
 * 
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/1/2024 Ver.1.0.0
 * First edition.
 * 
 * @param CallEnemiesList
 * @desc A list of settings for enemies that call allies.
 * @text Settings List
 * @type struct<CallEnemiesData>[]
 * @default []
 * 
 * @param SuccessMessage
 * @desc Message on successful call. %1 User %2 Call enemy
 * @text Success message
 * @type string
 * @default %1 has appeared!
 * 
 * @param MissSuccessMessage
 * @desc Message when call fails. %1 User
 * @text Failure message
 * @type string
 * @default 
 * 
 * @param MaxNumberEnemy
 * @desc Specifies the maximum number of all enemies. 0 for unlimited
 * @text Max number of enemy
 * @type number
 * @default 0
 * 
 * 
 * 
 */
/*~struct~CallEnemiesData:
 *
 * @param Name
 * @desc Identification name.
 * @text Identification name
 * @type string
 * @default 
 * 
 * @param CallEnemies
 * @desc A list of enemies to call upon. If there are multiple enemies, they will be selected randomly from the list that matches the conditions.
 * @text Enemies List
 * @type struct<EnemiesData>[]
 * @default []
 * 
 * @param Probability
 * @desc Specify the probability of success in calling allies. (%)
 * @text Probability of success
 * @type number
 * @default 100
 * 
 * @param MaxNumberIdenticalEnemy
 * @desc Specify the maximum number of the same monsters that can be called as allies. 0 means unlimited
 * @text Max number of identical monsters
 * @type number
 * @default 0
 * 
 * @param AppearCoordinate
 * @desc Coordinate settings for enemies that appear. If not specified, it will be calculated from the settings below. (1) Invalid
 * @text Enemy appearance coordinate setting
 * @type struct<EnemiesCoordinate>[]
 * @default []
 * 
 * @param AppearanceX
 * @desc Appearance coordinates X. -1 is the user's coordinates
 * @text Appearance coordinate X(1)
 * @type number
 * @min -1
 * @default 404
 * 
 * @param AppearanceRangeWidth
 * @desc The horizontal range of appearance from the X coordinate.
 * @text Horizontal range that appears(1)
 * @type number
 * @default 800
 * 
 * @param AppearanceY
 * @desc Appearance coordinates Y. -1 is the user's coordinates
 * @text Appearance coordinate Y(1)
 * @type number
 * @min -1
 * @default 436
 * 
 * @param AppearanceRangeHeight
 * @desc The vertical range of appearance from the Y coordinate.
 * @text Vertical range that appears(1)
 * @type number
 * @default 50
 * 
 * @param EnableOverlapOnDeath
 * @desc Enables overlapping of coordinates when appearing upon death.
 * @text Enable overlapping of coordinates when dying
 * @type boolean
 * @default false
 * 
 * @param NoAppearXRange
 * @desc Disables the appearance of enemies within horizontal range from the enemies coordinates.
 * @text Horizontal range where overlapping is disabled(1)
 * @type number
 * @default 0
 * 
 * @param NoAppearYRange
 * @desc Disables the appearance of enemies within a vertical range from the enemies coordinates.
 * @text Vertical range where overlapping is disabled(1)
 * @type number
 * @default 0
 * 
 */

/*~struct~EnemiesData:
 *
 * @param CallEnemy
 * @desc Specify the enemy.
 * @text Enemy
 * @type enemy
 * @default 0
 * 
 * @param Cond
 * @desc Sets the call condition. If unspecified, it is true.
 * @text Conditions
 * @type combo
 * @option '$gameVariables.value(0);//Game Variables'
 * @option '$gameSwitches.value(0);//Game Switches'
 * @default 
 * 
 */

/*~struct~EnemiesCoordinate:
 *
 * @param AppearanceX
 * @desc Coordinate of appearance X.
 * @text Coordinate of appearance X
 * @type number
 * @default 0
 * 
 * @param AppearanceY
 * @desc Coordinate of appearance Y.
 * @text Coordinate of appearance Y
 * @type number
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 敵が仲間を呼ぶスキル
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * 敵が仲間を呼ぶスキルを設定できます。
 * 
 * 
 * 仲間呼び出しスキルの設定はプラグインパラメータから設定を行い、設定ID(指定IDの識別名)で指定します。
 * スキルのメモ欄
 * <CallEnemy:[id]> 仲間を呼び出します。
 * [id]:プラグインパラメータの設定リストのIDまたは識別名
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/12/1 Ver.1.0.0
 * 初版
 * 
 * @param CallEnemiesList
 * @desc 仲間を呼ぶモンスターの設定リスト。
 * @text 設定リスト
 * @type struct<CallEnemiesData>[]
 * @default []
 * 
 * @param SuccessMessage
 * @desc 呼び出し成功時のメッセージ。%1 使用者 %2 呼び出したモンスター
 * @text 成功時メッセージ
 * @type string
 * @default %1が出現した！
 * 
 * @param MissSuccessMessage
 * @desc 呼び出し失敗時のメッセージ。 %1 使用者
 * @text 失敗時メッセージ
 * @type string
 * @default 
 * 
 * @param MaxNumberEnemy
 * @desc 全てのモンスターの最大数を指定します。0で無制限
 * @text 最大モンスター数
 * @type number
 * @default 0
 * 
 * 
 * 
 */
/*~struct~CallEnemiesData:ja
 *
 * @param Name
 * @desc 識別名。
 * @text 識別名
 * @type string
 * @default 
 * 
 * @param CallEnemies
 * @desc 仲間を呼ぶモンスターリスト。複数指定の場合は条件一致したリストからランダムに選択されます。
 * @text モンスターリスト
 * @type struct<EnemiesData>[]
 * @default []
 * 
 * @param Probability
 * @desc 仲間を呼びだす成功確率を指定します。(百分率)
 * @text 成功確率
 * @type number
 * @default 100
 * 
 * @param MaxNumberIdenticalEnemy
 * @desc 仲間を呼びだす同一モンスターの最大数を指定します。0で無制限
 * @text 最大同一モンスター数
 * @type number
 * @default 0
 * 
 * @param AppearCoordinate
 * @desc 出現モンスターの座標設定。未指定の場合は下の設定から算出されます。(1)無効
 * @text 出現モンスター座標設定
 * @type struct<EnemiesCoordinate>[]
 * @default []
 * 
 * @param AppearanceX
 * @desc 出現座標X。-1で使用者の座標
 * @text 出現座標X(1)
 * @type number
 * @min -1
 * @default 404
 * 
 * @param AppearanceRangeWidth
 * @desc 出現座標Xからの出現横範囲。
 * @text 出現横範囲(1)
 * @type number
 * @default 800
 * 
 * @param AppearanceY
 * @desc 出現座標Y。-1で使用者の座標
 * @text 出現座標Y(1)
 * @type number
 * @min -1
 * @default 436
 * 
 * @param AppearanceRangeHeight
 * @desc 出現座標Yからの出現縦範囲。
 * @text 出現縦範囲(1)
 * @type number
 * @default 50
 * 
 * @param EnableOverlapOnDeath
 * @desc 死亡時の出現時の座標の重複を有効にします。
 * @text 死亡時座標重複有効
 * @type boolean
 * @default false
 * 
 * @param NoAppearXRange
 * @desc モンスターの座標からの横範囲内の敵の出現を無効にします。
 * @text 出現重複無効横範囲(1)
 * @type number
 * @default 0
 * 
 * @param NoAppearYRange
 * @desc モンスターの座標からの縦範囲内の敵の出現を無効にします。
 * @text 出現重複無効縦範囲(1)
 * @type number
 * @default 0
 * 
 */

/*~struct~EnemiesData:ja
 *
 * @param CallEnemy
 * @desc 呼び出すモンスターを指定します。
 * @text モンスター
 * @type enemy
 * @default 0
 * 
 * @param Cond
 * @desc 呼び出しの条件をしてします。未指定の場合はtrue
 * @text 条件
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option '$gameSwitches.value(0);//スイッチ'
 * @default 
 * 
 */

/*~struct~EnemiesCoordinate:ja
 *
 * @param AppearanceX
 * @desc 出現座標X。
 * @text 出現座標X
 * @type number
 * @default 0
 * 
 * @param AppearanceY
 * @desc 出現座標Y。
 * @text 出現座標Y
 * @type number
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_CallingEnemy = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.apply(this, arguments);
        this._callEnemies = [];
        this._appearEnemies = [];
    };

    const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        _Game_Action_applyItemUserEffect.apply(this, arguments);
        this.callEnemies(target);
    };

    Game_Action.prototype.callEnemies = function(target) {
        const subject = this.subject()
        if (subject.isActor()) return;
        if (!this.item().meta.CallEnemy) return;
        this.makeSuccess(target);
        const data = params.CallEnemiesList[_getCallEnemiesData(NuunManager.getMetaCode(this.item(), "CallEnemy"))];
        if (!data) return;
        if (Math.random() < data.Probability / 100) {
            const enemy = this.getCallEnemyLottery(data);
            if (enemy && this.isCallEnemy(data, enemy)) {
                $gameTemp._callEnemies.push(enemy);
                $gameTroop._enemies.push(enemy);
                $gameTroop.makeUniqueNames();
                this.setAppearEnemyMessage(true, enemy);
                return;
            }
        }
        this.setAppearEnemyMessage(false, null);
    };

    Game_Action.prototype.isCallEnemy = function(data, appearEnemy) {
        const members = $gameTroop.members();
        if (params.MaxNumberEnemy > 0 && members.length >= params.MaxNumberEnemy) return false;
        const enemyCount = {};
        for (const enemy of members) {
            if (enemy.isAlive()) {
                const name = enemy.originalName();
                const n = enemyCount[name] || 0;
                enemyCount[name] = n + 1;
            }
        }
        const appearEnemyName = appearEnemy.originalName();
        return data.MaxNumberIdenticalEnemy > 0 ? (data.MaxNumberIdenticalEnemy > enemyCount[appearEnemyName]) : true;
    };

    Game_Action.prototype.getCallEnemyLottery = function(data) {
        const list = data.CallEnemies;
        for (let i = 0; list.length > i; i++) {
            if ($dataEnemies[list[i].CallEnemy] && !list[i].Cond || eval(list[i].Cond)) {
                return this.getCallEnemyCoordinate(data, list[i].CallEnemy);
            }
        }
    };

    Game_Action.prototype.getCallEnemyCoordinate = function(data, id) {
        let x = 0;
        let y = 0;
        if (data.AppearCoordinate && data.AppearCoordinate.length > 0) {
            const coordinateList = data.AppearCoordinate.filter(coordinate => {
                for (const enemy of $gameTroop.members()) {
                    if (enemy._screenX === coordinate.AppearanceX && enemy._screenY === coordinate.AppearanceY) {
                        return data.EnableOverlapOnDeath && enemy.isDead();
                    }
                }
                return true;
            });
            if (coordinateList.length > 0) {
                const coordinateData = coordinateList[Math.randomInt(coordinateList.length)];
                x = coordinateData.AppearanceX || 0;
                y = coordinateData.AppearanceY || 0;
                x = x.clamp(0, Graphics.boxWidth);
                y = y.clamp(50, Graphics.boxHeight);
                return new Game_Enemy(id, x, y);
            }
        }
        const subject = this.subject();console.log(subject._screenY)
        let result = false;
        let count = 0;
        while (count < 5) {
            count++;
            const widthX = Math.randomInt(data.AppearanceRangeWidth) - (data.AppearanceRangeWidth / 2);
            const heightY = Math.randomInt(data.AppearanceRangeHeight) - (data.AppearanceRangeHeight / 2);
            x = (data.AppearanceX >= 0 ? data.AppearanceX : subject._screenX) + widthX;
            y = (data.AppearanceY >= 0 ? data.AppearanceY : subject._screenY) + heightY;
            x = x.clamp(0, Graphics.boxWidth);
            y = y.clamp(50, Graphics.boxHeight);
            result = $gameTroop.members().some(enemy => {
                if (this.callEnemyCoordinateRange(x, enemy._screenX, data.NoAppearXRange) && this.callEnemyCoordinateRange(y, enemy._screenY, data.NoAppearYRange)) {
                    return !data.EnableOverlapOnDeath || !(data.EnableOverlapOnDeath && enemy.isDead());
                }
                return false;
            });
            if (result) {
                continue;
            }
            break;
        }
        return result ? null : new Game_Enemy(id, x, y);
    };

    Game_Action.prototype.callEnemyCoordinateRange = function(coordinate1, coordinate2, range) {
        return coordinate1 >= coordinate2 - range && coordinate1 <= coordinate2 + range;
    };

    Game_Action.prototype.setAppearEnemyMessage = function(success, enemy) {
        if (success) {
            $gameTemp._appearEnemies.push(params.SuccessMessage.format(this.subject().name(), enemy.name()));
        } else {
            $gameTemp._appearEnemies.push(params.MissSuccessMessage.format(this.subject().name()));
        }       
    };

    Game_Troop.prototype.isCallEnemy = function(enemyId, maxEnemyNum) {
        const members = $gameTroop.members();
        if (params.MaxNumberEnemy > 0 && members.length >= params.MaxNumberEnemy) return false;
        const enemyCount = {};
        for (const enemy of members) {
            if (enemy.isAlive()) {
                const name = enemy.originalName();
                const n = enemyCount[name] || 0;
                enemyCount[name] = n + 1;
            }
        }
        const appearEnemyName = $dataEnemies[Number(enemyId)].name;
        return Number(maxEnemyNum) > enemyCount[appearEnemyName];
    };


    const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
    Sprite_Enemy.prototype.initMembers = function() {
        _Sprite_Enemy_initMembers.call(this);
        this.addEnemyCheck = true;
    };


    const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        _Spriteset_Battle_update.call(this);
        this.updateAddEnemies();
    };

    Spriteset_Battle.prototype.updateAddEnemies = function() {
        const enemies = $gameTemp._callEnemies;
        if (!enemies || enemies.length === 0) return;
        const sprites = this._enemySprites;
        for (const enemy of enemies) {
            //$gameTroop._enemies.push(enemy);
            const sprite = new Sprite_Enemy(enemy);
            sprites.push(sprite);
            enemy.onBattleStart(false);
        }
        sprites.sort(this.compareEnemySprite.bind(this));
        this._enemySprites = sprites;
        const startSpriteId = this._battleField.children.findIndex(sprite => sprite.addEnemyCheck);
        for (let i = 0; this._enemySprites.length > i; i++) {
            const index = this._battleField.children.indexOf(this._enemySprites[i]);
            if (index < 0) {
                this._battleField.addChildAt(this._enemySprites[i], i + startSpriteId);
            }
        }
        $gameTemp._callEnemies = [];
    };


    const _Window_BattleLog_displayFailure = Window_BattleLog.prototype.displayFailure;
    Window_BattleLog.prototype.displayFailure = function(target) {
        _Window_BattleLog_displayFailure.apply(this, arguments);
        this.displayCallEnmeies();
    };

    Window_BattleLog.prototype.displayCallEnmeies = function() {
        const message = $gameTemp._appearEnemies;
        if (message.length < 1) return;
        for (const text of message) {
            this.push("addText", text);
        }
        $gameTemp._appearEnemies = [];
    };


    function _getCallEnemiesData(id) {
        if (isNaN(id)) {
            return params.CallEnemiesList.findIndex(data => data.Name === id);
        }
        return Number(id) - 1;
    };
    
})();