/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyCondPicture.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Enemy state image change
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_BattleStyleEX
 * @version 1.2.2
 * 
 * @help
 * Switch the image of the enemy according to the conditions.
 * This plugin is an expansion plugin for Battle Style Expansion (Ver.3.12.0 or later).
 * 
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/21/2023 Ver.1.2.2
 * Opacity correction.
 * 12/21/2023 Ver.1.2.1
 * Fixed an issue where images would not switch.
 * Fixed issue where opacity was not applied.
 * 7/29/2023 Ver.1.2.0
 * Added a function to randomly display enemy images
 * 7/27/2023 Ver.1.1.0
 * Added a function that can specify a common image.
 * 7/27/2023 Ver.1.0.1
 * Fixed some processing.
 * 7/27/2023 Ver.1.0.0
 * First edition.
 * 
 * @param EnemyCondPictureData
 * @desc Set the enemy image.
 * @text Enemy image settings
 * @type struct<EnemyCondPictureList>[]
 * @default 
 * 
 * @param CommonEnemyImg
 * @text Common monster image settings
 * @desc Set the common monster image.
 * @default []
 * @type struct<EnemyImgList>[]
 * 
 * @param DamageImgFrame
 * @desc Image change frames for enemy character damage, recovery, and defense.
 * @text Damage, recovery, defense change frames
 * @type number
 * @default 30
 * @min 1
 * 
 * @param CounterImgFrame
 * @desc Image change frames when the enemy character counterattacks or reflects magic.
 * @text Counterattack, magic reflection image change frame
 * @type number
 * @default 60
 * @min 1
 * @max 9999
 * 
 * @param OnEnemyShake
 * @desc Enable shake on damage.
 * @text Damage shake enabled
 * @type boolean
 * @default false
 * 
 * @param ShakeFlame
 * @desc Shake frame when damaged. (default 36)
 * @text Shake frame
 * @type number
 * @default 36
 * @min 0
 * 
 * @param ShakePower
 * @desc The size of the shake when damaged. (default 2)
 * @text Size of shake
 * @type number
 * @default 2
 * @min 0
 * 
 * @param ShakeSpeed
 * @desc Shake speed on damage. (default 20)
 * @text Shake speed
 * @type number
 * @default 20
 * @min 0
 * 
 */
/*~struct~EnemyCondPictureList:
 * 
 * @param Enemy
 * @desc Monster id.
 * @text Monster
 * @type enemy
 * @default 
 * 
 * @param EnemyImg
 * @text Monster image settings
 * @desc Set the monster image.
 * @default []
 * @type struct<EnemyImgList>[]
 * 
 */
/*~struct~EnemyImgList:
 * 
 * @param GraphicImg
 * @text Enemy character image
 * @desc Set the image of the enemy character. Random display in case of multiple designation.
 * @type file[]
 * @dir img/enemies/
 * 
 * @param SVGraphicImg
 * @text Side view enemy character image
 * @desc Set the image of the sv enemy character. Random display in case of multiple designation.
 * @type file[]
 * @dir img/sv_enemies/
 * 
 * @param Opacity
 * @text Image opacity
 * @desc Specifies the opacity of the image.
 * @type number
 * @default 255
 * @min 0
 * @max 255
 * 
 * @param Hue
 * @text Hue
 * @desc Specifies the hue of the image. -1 is the original hue.
 * @type number
 * @default -1
 * @min -1
 * @max 360
 * 
 * @param AllMatch
 * @text Match all conditions
 * @default ------------------------------
 * 
 * @param ChangeGraphicScenes
 * @text Change scene
 * @desc Select a graphic change scene.
 * @type select
 * @option Default
 * @value 'default'
 * @option Death
 * @value 'death'
 * @option Before Enemy Appears
 * @value 'b_appeared'
 * @option Dying
 * @value 'dying'
 * @option Damage
 * @value 'damage'
 * @option Cridamage
 * @value 'cridamage'
 * @option Recovery
 * @value 'recovery'
 * @option Attack(1)
 * @value 'attack'
 * @option RecoverySkill(1)
 * @value 'recoverySkill'
 * @option UseItem(2)
 * @value 'item'
 * @option Counter
 * @value 'counter'
 * @option Reflection
 * @value 'reflection'
 * @option CounterEX(CounterExtend)(4)
 * @value 'counterEX'
 * @option Guard
 * @value 'guard'
 * @option State(3)
 * @value 'state'
 * @default 'default'
 * @parent AllMatch
 * 
 * @param ImgHP
 * @text Remaining HP
 * @desc Changes when the remaining HP is within the specified range or numerical value.
 * @type struct<CondValue>
 * @default {"CondValid":"false","UpLimit":"0","DwLimit":"0"}
 * @parent AllMatch
 * 
 * @param ImgSwitch
 * @text Switch
 * @desc Changes when all the specified switches are ON.
 * @type switch[]
 * @default
 * @parent AllMatch
 * 
 * @param ImgStateAll
 * @text State
 * @desc The condition is met when all of the specified states are applied.
 * @type state[]
 * @default 
 * @parent AllMatch
 * 
 * @param CondSetting
 * @text Condition setting
 * @default ------------------------------
 * 
 * @param Skill
 * @text Skill(1)
 * @desc Select a skill. Applies when using any skill. Blank or none applies to all skills.
 * @type skill[]
 * @default
 * @parent CondSetting
 * 
 * @param Item
 * @text Item(2)
 * @desc Select an item. Applies when using any item. Blank or None applies to all items.
 * @type item[]
 * @default
 * @parent CondSetting
 * 
 * @param stateId
 * @text Received state(3)
 * @desc Select a state. Applies to all states.
 * @type state[]
 * @default 
 * @parent CondSetting
 * 
 * @param Id
 * @text Identification tag(4)
 * @desc Specifies an identification tag. Applies when all identification tags are applicable.
 * @type string[]
 * @default 
 * @parent CondSetting
 * 
 */
/*~struct~CondValue:
 * 
 * @param CondValid
 * @desc Activate the HP condition.
 * @text HP condition valid
 * @type boolean
 * @default false
 * 
 * @param UpLimit
 * @text Upper limit
 * @desc Upper limit.
 * @type number
 * @default 0
 * 
 * @param DwLimit
 * @text Lower limit
 * @desc Lower limit.
 * @type number
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 敵の条件画像変更
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_BattleStyleEX
 * @version 1.2.2
 * 
 * @help
 * 敵の画像を条件により切り替えます。
 * このプラグインはバトルスタイル拡張(Ver.3.12.0以降)の拡張プラグインです。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/12/29 Ver 1.2.2
 * 不透明度の修正。
 * 2023/12/21 Ver.1.2.1
 * 画像が切り替わらない問題を修正。
 * 不透明度が適用されない問題を修正。
 * 2023/7/29 Ver 1.2.0
 * 敵画像をランダムに表示させる機能を追加。
 * 2023/7/21 Ver 1.1.0
 * 共通の画像を指定できる機能を追加。
 * 2023/7/18 Ver 1.0.1
 * 一部の処理を修正。
 * 2023/7/17 Ver 1.0.0
 * 初版
 * 
 * @param EnemyCondPictureData
 * @desc 敵画像の設定をします。
 * @text 敵画像設定
 * @type struct<EnemyCondPictureList>[]
 * @default 
 * 
 * @param CommonEnemyImg
 * @text 共通モンスター画像設定
 * @desc 共通のモンスター画像の設定を行います。
 * @default []
 * @type struct<EnemyImgList>[]
 * 
 * @param DamageImgFrame
 * @desc 敵キャラのダメージ、回復時、防御の画像変化フレーム。
 * @text ダメージ、回復、防御時変化フレーム
 * @type number
 * @default 30
 * @min 1
 * 
 * @param CounterImgFrame
 * @desc 敵キャラの反撃、魔法反射時の画像変化フレーム。
 * @text 反撃、魔法反射画像変化フレーム
 * @type number
 * @default 60
 * @min 1
 * @max 9999
 * 
 * @param OnEnemyShake
 * @desc ダメージ時のシェイクを有効にする。
 * @text ダメージシェイク有効
 * @type boolean
 * @default false
 * 
 * @param ShakeFlame
 * @desc ダメージ時のシェイクフレーム。（デフォルト36）
 * @text シェイクフレーム
 * @type number
 * @default 36
 * @min 0
 * 
 * @param ShakePower
 * @desc ダメージ時のシェイクの大きさ。（デフォルト2）
 * @text シェイクの大きさ
 * @type number
 * @default 2
 * @min 0
 * 
 * @param ShakeSpeed
 * @desc ダメージ時のシェイクのスピード。（デフォルト20）
 * @text シェイクスピード
 * @type number
 * @default 20
 * @min 0
 * 
 */
/*~struct~EnemyCondPictureList:ja
 * 
 * @param Enemy
 * @desc モンスター
 * @text モンスター
 * @type enemy
 * @default 
 * 
 * @param EnemyImg
 * @text モンスター画像設定
 * @desc モンスター画像の設定を行います。
 * @default []
 * @type struct<EnemyImgList>[]
 * 
 */
/*~struct~EnemyImgList:ja
 * 
 * @param GraphicImg
 * @text 敵キャラ画像
 * @desc 敵キャラの画像を設定します。複数指定の場合はランダムに表示されます。
 * @type file[]
 * @dir img/enemies/
 * 
 * @param SVGraphicImg
 * @text サイドビュー敵キャラ画像
 * @desc サイドビューの敵キャラの画像を設定します。
 * @type file[]
 * @dir img/sv_enemies/
 * 
 * @param Opacity
 * @text 画像不透明度
 * @desc 画像の不透明度を指定します。
 * @type number
 * @default 255
 * @min 0
 * @max 255
 * 
 * @param Hue
 * @text 色相
 * @desc 画像の色相を指定します。-1の場合は本来の色相になります。
 * @type number
 * @default -1
 * @min -1
 * @max 360
 * 
 * @param AllMatch
 * @text 全条件一致
 * @default ------------------------------
 * 
 * @param ChangeGraphicScenes
 * @text 変化シーン
 * @desc グラフィックの変化シーンを選択します。
 * @type select
 * @option 通常
 * @value 'default'
 * @option 戦闘不能
 * @value 'death'
 * @option 出現前
 * @value 'b_appeared'
 * @option 瀕死
 * @value 'dying'
 * @option ダメージ時
 * @value 'damage'
 * @option クリティカルダメージ時
 * @value 'cridamage'
 * @option 回復時
 * @value 'recovery'
 * @option 攻撃スキル使用時(1)
 * @value 'attack'
 * @option 回復スキル使用時(1)
 * @value 'recoverySkill'
 * @option アイテム使用時(2)
 * @value 'item'
 * @option 反撃時
 * @value 'counter'
 * @option 魔法反射時
 * @value 'reflection'
 * @option 反撃時(CounterExtend)(4)
 * @value 'counterEX'
 * @option 防御時
 * @value 'guard'
 * @option 被ステート(3)
 * @value 'state'
 * @default 'default'
 * @parent AllMatch
 * 
 * @param ImgHP
 * @text 残りHP
 * @desc 残りHPが指定の範囲内または数値の時に変化します。
 * @type struct<CondValue>
 * @default {"CondValid":"false","UpLimit":"0","DwLimit":"0"}
 * @parent AllMatch
 * 
 * @param ImgSwitch
 * @text スイッチ
 * @desc 指定したスイッチが全てONの時に変化します。
 * @type switch[]
 * @default
 * @parent AllMatch
 * 
 * @param ImgStateAll
 * @text ステート。
 * @desc 指定したステートに全てかかっている時に条件を満たします。
 * @type state[]
 * @default 
 * @parent AllMatch
 * 
 * @param CondSetting
 * @text 条件設定
 * @default ------------------------------
 * 
 * @param Skill
 * @text スキル(1)
 * @desc スキルを選択します。いずれかのスキル使用時に適用します。空白、なしの場合は全てのスキルが対象です。
 * @type skill[]
 * @default
 * @parent CondSetting
 * 
 * @param Item
 * @text アイテム(2)
 * @desc アイテムを選択します。いずれかのアイテム使用時に適用します。空白、なしの場合は全てのアイテムが対象です。
 * @type item[]
 * @default
 * @parent CondSetting
 * 
 * @param stateId
 * @text 被ステート(3)
 * @desc ステートを選択します。全てのステートにかかっている時に適用します。
 * @type state[]
 * @default 
 * @parent CondSetting
 * 
 * @param Id
 * @text 識別タグ(4)
 * @desc 識別タグを指定します。全ての識別タグが該当しているときに適用します。
 * @type string[]
 * @default 
 * @parent CondSetting
 * 
 */
/*~struct~CondValue:ja
 * 
 * @param CondValid
 * @desc HP条件を有効にします。
 * @text HP条件有効
 * @type boolean
 * @default false
 * 
 * @param UpLimit
 * @text 上限値
 * @desc 上限値
 * @type number
 * @default 0
 * 
 * @param DwLimit
 * @text 下限値
 * @desc 下限値
 * @type number
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_EnemyCondPicture = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_EnemyCondPicture');
    const EnemyCondPictureData = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EnemyCondPictureData'])) : [];
    const CommonEnemyImg = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['CommonEnemyImg'])) : [];
    const OnEnemyShake = eval(parameters['OnEnemyShake'] || 'false');
    const ShakeFlame = Number(parameters['ShakeFlame'] || 36);
    const ShakePower = Number(parameters['ShakePower'] || 2);
    const ShakeSpeed = Number(parameters['ShakeSpeed'] || 20);
    const DamageImgFrame = Number(parameters['DamageImgFrame'] || 30);
    const CounterImgFrame = Number(parameters['CounterImgFrame'] || 60);

    //直後の画像が死亡時の画像か判定し、存在すれば戦闘不能エフェクトを発動しないようにする。
    function getEnemyData(enmeyId) {
        return EnemyCondPictureData.find(data => data.Enemy === enmeyId);
    };

    Game_Enemy.prototype.setDamageEffect = function() {
        if (OnEnemyShake) {
            this._onDamageEffect = true;
        }
    };

    const _Game_Enemy_battlerName = Game_Enemy.prototype.battlerName;
    Game_Enemy.prototype.battlerName = function() {
        return this._battleStyleGraphicName ? this._battleStyleGraphicName : _Game_Enemy_battlerName.call(this);
    };

    const _Game_Enemy_battlerHue = Game_Enemy.prototype.battlerHue;
    Game_Enemy.prototype.battlerHue = function() {
        return !isNaN(this._battleStyleGraphicHue) ? this._battleStyleGraphicHue : _Game_Enemy_battlerHue.call(this);
    };

    Game_Enemy.prototype.isDeadImg = function() {
        return this.isDead() && (this.endCollapse || this.collapseType() === 3);
    };

    Game_Enemy.prototype.getBattleStyleMatchConditions = function(list) {
        return list.findIndex(data => {
            return this.battleStyleMatchConditions(data);
        });
    };

    Game_Enemy.prototype.battleStyleImgRefresh = function() {
        let imgIndex = -1;
        let index = -1;
        this._isDeadImg = false;
        this._imgScenes = 'default';
        const enemyId = this.enemyId();
        const enemyData = getEnemyData(enemyId);
        this._battleStyleGraphicHue = null;
        const list = enemyData && enemyData.EnemyImg ? enemyData.EnemyImg : CommonEnemyImg;
        if (list) {
            index = this.getBattleStyleMatchConditions(list);
            if (index >= 0) {
                this.setbattleStyleGraphicId();
                const data = list[index];
                this._isDeadImg = this.isBSEnemyGraphicDead(data);
                //this._battleStyleGraphicName = index !== this._battleStyleGraphicIndex ? this.getBattleStyleImg(data) : this._battleStyleGraphicName;
                this._battleStyleGraphicName = this.getBattleStyleImg(data);
                this._battleStyleGraphicHue = this.getBattleStyleImgHue(data);
                imgIndex = this.getBattleStyleImgIndex(data);
                this._battleStyleGraphicOpacity = data.Opacity || 255;
            } else {
                this._battleStyleGraphicName = null;
            }
        } else {
            this._battleStyleGraphicName = null;
        }
        this._battleStyleGraphicIndex = index;
        this._battleStyleImgIndex = imgIndex;
    };

    Game_Enemy.prototype.getBattleStyleImg = function(data) {
        return this.enmeyGraphicName(data);
    };

    Game_Enemy.prototype.enmeyGraphicName = function(data) {
        const images = $gameSystem.isSideView() ? data.SVGraphicImg : data.GraphicImg;
        if (Array.isArray(images)) {
            if (images.length > 1) {
                return images[Math.randomInt(images.length)];
            } else {
                return images[0];
            }
        } else {
            return $gameSystem.isSideView() ? data.SVGraphicImg : data.GraphicImg;
        }
    };

    Game_Enemy.prototype.getBattleStyleImgHue = function(data) {
        return data.Hue && data.Hue >= 0 ? data.Hue : null;
    };

    Game_Enemy.prototype.getBattleStyleImgIndex = function(data) {
        return this.batterImgIndex(data);
    };

    Game_Enemy.prototype.isBSEnemyGraphicDead = function(data) {
        return data && (data.ImgStateAll && this.getStateData(data.ImgStateAll)) || data.ChangeGraphicScenes === 'death' || (data.ChangeGraphicScenes === 'state' && (data.stateId && this.getStateData(data.stateId)));
    };
    
    Game_Enemy.prototype.getStateData = function(data) {
        return data.some(s => s === this.deathStateId());
    }
      
    Game_Enemy.prototype.getEnemyGraphicDead = function() {
        return this._isDeadImg;
    };

    Game_Enemy.prototype.resetBattleStyleImgId = function() {
        this.setBattleImgId(0, -1);
        this.battleStyleImgRefresh();
    };

    Game_Enemy.prototype.loadBattleStyleActorGraphic = function() {
        return this.bsLoadBitmap(this.battlerName());
    };

    Game_Enemy.prototype.getBSImgName = function() {
        return this.battlerName();
    };

    Game_Enemy.prototype.isBSImgName = function() {
        return this._battleStyleGraphicName;
    };

    Game_Enemy.prototype.bsLoadBitmap = function(name) {
        if ($gameSystem.isSideView()) {
            return ImageManager.loadSvEnemy(name);
        } else {
            return ImageManager.loadEnemy(name);
        }
    };
    
    const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
    Sprite_Enemy.prototype.initMembers = function() {
        _Sprite_Enemy_initMembers.call(this);
        this._imgData = null;
        this._imgScenes = 'default';
        this._apngMode = false;
        this._shakePower = ShakePower;
        this._shakeSpeed = ShakeSpeed;
        this._shakeDuration = 0;
        this._shakeDirection = 1;
        this._updateCount = 0;
        this._imgListId = -1;
        this._durationOpacity = 0;
        this._isDead = false;
        this._updateImg = false;
    };

    const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function() {
        _Sprite_Enemy_updateBitmap.call(this);
        this.updateEnemyGraphic();
    };

    Sprite_Enemy.prototype.updateEnemyGraphic = function() {
        const enemy = this._battler;
        if (enemy) {
            if (this.isEnemyGraphicDead() && enemy.isDead() && !this.isDead()) {
                this.setDeadUpdateCount();
            } else if (enemy.isAlive() && this.isDead()) {
                this.setReviveUpdateCount();
            } else if (this._imgListId !== enemy.getBSGraphicIndex()) {
                if (enemy.onImgId === 1 || enemy.onImgId === 2 || enemy.onImgId === 3 || enemy.onImgId === 15) {
                    this.setUpdateCount(this.setDamageDuration());
                } else if (enemy.onImgId === 30) {
                    this.setUpdateCount(this.setCounterDuration());
                } else if (enemy.onImgId === 20) {
                    this.setUpdateCount(Infinity);
                } else {
                    this.setUpdateCount(1);
                }
            }
        }
        this.refreshEnemyGraphic(enemy);
        if (this._startUpdate) {
            this._startUpdate = false;
        }
    };

    const _Sprite_Enemy_initVisibility = Sprite_Enemy.prototype.initVisibility;
    Sprite_Enemy.prototype.initVisibility = function() {
        if (!this._updateImg) {
            _Sprite_Enemy_initVisibility.call(this);
        }
    };

    Sprite_Enemy.prototype.refreshEnemyGraphic = function(enemy) {
        if (enemy && enemy.getBSImgName()) { 
            if (this._imgListId !== enemy.getBSGraphicIndex() && this._updateCount > 0) {
                const bitmap = enemy.getLoadBattleStyleImg();
                this._loadedBitmap = bitmap;
                if (bitmap && !bitmap.isReady()) {
                    bitmap.addLoadListener(this.setEnemyGraphic.bind(this, enemy, bitmap));
                } else if (bitmap) {
                    this.setEnemyGraphic(enemy, bitmap);
                }
                this._imgScenes = this.getImgScenes(enemy);
                this._imgListId = enemy.getBSGraphicIndex();
                this._updateImg = true;
            }
        }
        this.updateGraphicAnimation();
        if (this._imgScenes === 'chant' && !enemy.isChanting()) {
            this.resetBattleStyleImg(enemy);
        } else if (enemy.isBSActionBattlerImg()) {
            if (!enemy.isActing() && !this.isCounterSkillAction(enemy)) {
                enemy.setBSActionBattlerImg(null);
                this.resetBattleStyleImg(enemy);
            } else if (!this.isCounterSkillAction(enemy) && this.isCounter()) {
                enemy.setBSActionBattlerImg(null);
                this.resetBattleStyleImg(enemy);
            }
        } else if (this._updateCount === 0) {
            this.resetBattleStyleImg(enemy);
        }
    };




    const _Sprite_Enemy_updateEffect = Sprite_Enemy.prototype.updateEffect;
    Sprite_Enemy.prototype.updateEffect = function() {
        _Sprite_Enemy_updateEffect.call(this);
        this.updateShakeDamage();
        //this.updateEnemyGraphic();
    };

    const _Sprite_Enemy_setupEffect = Sprite_Enemy.prototype.setupEffect;
    Sprite_Enemy.prototype.setupEffect = function() {
        _Sprite_Enemy_setupEffect.call(this);
        if (OnEnemyShake && this._battler.isBSDamageEffect()) {
            this._shakeDuration = ShakeFlame;
            this._battler._onDamageEffect = false;
        }
    };

    Sprite_Enemy.prototype.updateShakeDamage = function() {
        if (this._shakeDuration > 0 || this._shake !== 0) {
            const delta =
                (this._shakePower * this._shakeSpeed * this._shakeDirection) / 10;
            if (
                this._shakeDuration <= 1 &&
                this._shake * (this._shake + delta) < 0
            ) {
                this._shake = 0;
            } else {
                this._shake += delta;
            }
            if (this._shake > this._shakePower * 2) {
                this._shakeDirection = -1;
            }
            if (this._shake < -this._shakePower * 2) {
                this._shakeDirection = 1;
            }
            this._shakeDuration--;
        }
    };

    Sprite_Enemy.prototype.setUpdateCount = function(count) {
        this._updateCount = count;
    };
    
    Sprite_Enemy.prototype.isCounter = function() {
        return this._imgScenes === 'counter' || this._imgScenes === 'reflection' || this._imgScenes === 'counterEX';
    };
    
    Sprite_Enemy.prototype.isCounterSkillAction = function(enemy) {
        return enemy.isCounterSkillAction();
    };
    
    Sprite_Enemy.prototype.resetBattleStyleImg = function(enemy) {
        enemy.resetBattleStyleImgId();
    };
    
    Sprite_Enemy.prototype.setEnemyGraphic = function(enemy, bitmap) {
        const pass = enemy.getBSImgName();
        const name = pass ? pass.split('pictures/')[1] : null;
        if (name && this.addApngChild && this.loadApngSprite(name)) {
            this.addApngChild(name);
            this._apngMode = true;
        } else {
            this.resetApngEnemyImg();
            if (this.isDead()) {
                this.revertToNormal();
                this._enemyImgesOpacity = this.isEnemyGraphicDead() ? (this.opacity - enemy.getBattleStyleOpacity()) : (this.opacity - 0);
                this._durationOpacity = this.getFadeoutOpacity();
                if (this._durationOpacity !== 0) {
                    this._updateCount = this.setDeadDuration();
                }
                this._effectDuration = 0;
            } else {
                this._enemyImgesOpacity = this.opacity - enemy.getBattleStyleOpacity();
                this._durationOpacity = this.getFadeoutOpacity();
                if (enemy.isDead()) {
                    this._durationOpacity = 0;
                } else if (this._durationOpacity !== 0) {
                    this._updateCount = 30;
                }
                this._appeared = true;
            }
        } 
    };

    Sprite_Enemy.prototype.updateEnmeyExBitmap = function() {
        Sprite_Battler.prototype.updateBitmap.call(this);
        const name = this._enemy.battlerName();
        const hue = this._enemy.battlerHue();
        if (this._battlerName !== name || this._battlerHue !== hue) {
            this._battlerName = name;
            this._battlerHue = hue;
            this.loadBitmap(name);
            this.setHue(hue);
        }
    };
    
    Sprite_Enemy.prototype.updateGraphicAnimation = function(){
        if (this._updateCount > 0) {
            this._updateCount--;
            if(this._durationOpacity > 0){
                this.opacity -= this.getFadeoutOpacity() / this.setDeadDuration();
                this.opacity = Math.max(this.opacity, 0);
                this._durationOpacity = this.opacity;
            } else if (this._durationOpacity < 0) {
                this.opacity += this.getFadeoutOpacity() / this.setDeadDuration();
                this.opacity = Math.min(this.opacity, this.getFadeoutOpacity());
                this._durationOpacity = this.opacity - this.getFadeoutOpacity();
            }
        }
    };
    
    Sprite_Enemy.prototype.getFadeoutOpacity = function() {       
        if (!this._enemyImgesOpacity) {
            this._enemyImgesOpacity = 0;
        }
        return this._enemyImgesOpacity;
    };
    
    Sprite_Enemy.prototype.getImgScenes = function(enemy) {
        return enemy._imgScenes;
    };

    Sprite_Enemy.prototype.setDeadUpdateCount = function() {
        if (this.isEnemyGraphicDead()) {
            this.setUpdateCount(1);
            this._enemyImgesOpacity = (this.opacity - this._battler.getBattleStyleOpacity());
        }
        this._durationOpacity = this.getFadeoutOpacity();
        if (this._durationOpacity !== 0) {
            this.setUpdateCount(this.setDeadDuration());
        }
        this.setEnemyDead(true);
    };
    
    Sprite_Enemy.prototype.setReviveUpdateCount = function(){
        this._enemyImgesOpacity = this.opacity - this._battler.getBattleStyleOpacity();
        this._durationOpacity = this.getFadeoutOpacity();
        if (this._durationOpacity !== 0) {
            this.setUpdateCount(this.setDeadDuration());
        }
        this.setEnemyDead(false);
    };

    Sprite_Enemy.prototype.isEnemyGraphicDead = function() {
        return this._battler.getEnemyGraphicDead();
    };
    
    Sprite_Enemy.prototype.setDeadDuration = function(){
        return this._startUpdate ? 1 : 30;
    };
    
    Sprite_Enemy.prototype.setDamageDuration = function(){
        return DamageImgFrame;
    };
    
    Sprite_Enemy.prototype.setCounterDuration = function(){
        return CounterImgFrame;
    };
    
    Sprite_Enemy.prototype.setEnemyDead = function(flag){
        this._isDead = flag;
    };
    
    Sprite_Enemy.prototype.isDead = function(){
        return this._isDead;
    };
    
    Sprite_Enemy.prototype.resetApngEnemyImg = function() {
        if (this._apngMode) {
            //this.destroyApngIfNeed();
            this._apngMode = null;
        }
    };

    const _Sprite_Enemy_startAppear = Sprite_Enemy.prototype.startAppear;
    Sprite_Enemy.prototype.startAppear = function() {
        _Sprite_Enemy_startAppear.call(this);
        this._battler.endCollapse = false;
    };

    const _Sprite_Enemy_updateCollapse = Sprite_Enemy.prototype.updateCollapse;
    Sprite_Enemy.prototype.updateCollapse = function() {
        _Sprite_Enemy_updateCollapse.call(this);
        if (this._effectDuration === 0) {
            this._battler.endCollapse = true;
        }
    };
    
    const _Sprite_Enemy_updateBossCollapse = Sprite_Enemy.prototype.updateBossCollapse;
    Sprite_Enemy.prototype.updateBossCollapse = function() {
        _Sprite_Enemy_updateBossCollapse.call(this);
        if (this._effectDuration === 0) {
            this._battler.endCollapse = true;
        }
    };
    
    const _Sprite_Enemy_updateInstantCollapse = Sprite_Enemy.prototype.updateInstantCollapse;
    Sprite_Enemy.prototype.updateInstantCollapse = function() {
        _Sprite_Enemy_updateInstantCollapse.call(this);
        if (this._effectDuration === 0) {
            this._battler.endCollapse = true;
        }
    };
    
})();