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
 * @plugindesc 敵の条件画像変更
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_BattleStyleEX
 * @version 1.0.1
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
/*~struct~EnemyCondPictureList:
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
 * @parent EnemyImges
 * 
 */
/*~struct~EnemyImgList:
 * 
 * @param GraphicImg
 * @text 敵キャラ画像
 * @desc 敵キャラの画像を設定します。
 * @type file
 * @dir img/enemies/
 * 
 * @param SVGraphicImg
 * @text サイドビュー敵キャラ画像
 * @desc サイドビューの敵キャラの画像を設定します。
 * @type file
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
/*~struct~CondValue:
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
    const OnEnemyShake = eval(parameters['OnEnemyShake'] || 'false');
    const ShakeFlame = Number(parameters['ShakeFlame'] || 36);
    const ShakePower = Number(parameters['ShakePower'] || 2);
    const ShakeSpeed = Number(parameters['ShakeSpeed'] || 20);
    const DamageImgFrame = Number(parameters['DamageImgFrame'] || 30);
    const CounterImgFrame = Number(parameters['CounterImgFrame'] || 60);

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

    Game_Enemy.prototype.battleStyleImgRefresh = function() {
        let imgIndex = -1;
        let index = -1;
        this._isDeadImg = false;
        this._imgScenes = 'default';
        const enemyId = this.enemyId();
        const enemyData = getEnemyData(enemyId);
        this._battleStyleGraphicHue = null;
        if (enemyData && enemyData.EnemyImg) {
            index = enemyData.EnemyImg.findIndex(data => {
                return this.battleStyleMatchConditions(data);
            });
            if (index >= 0) {
                this.setbattleStyleGraphicId();
                const data = enemyData.EnemyImg[index];
                this._isDeadImg = this.isBSEnemyGraphicDead(data);
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
        return $gameSystem.isSideView() ? data.SVGraphicImg : data.GraphicImg;
    };

    Game_Enemy.prototype.getBattleStyleImgHue = function(data) {
        return data.Hue && data.Hue >= 0 ? data.Hue : null;
    };

    Game_Enemy.prototype.getBattleStyleImgIndex = function(data) {
        return this.batterImgIndex(data);
    };

    Game_Enemy.prototype.isBSEnemyGraphicDead = function(data) {
        return data && (data.ChangeGraphicScenes === 'death' || data.ChangeGraphicScenes === 'state' && (data.stateId === this.deathStateId() || data.ImgStateAll === this.deathStateId()));
    };
      
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
    };

    const _Sprite_Enemy_updateEffect = Sprite_Enemy.prototype.updateEffect;
    Sprite_Enemy.prototype.updateEffect = function() {
        _Sprite_Enemy_updateEffect.call(this);
        this.updateShakeDamage();
        this.updateEnemyGraphic();
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

    Sprite_Enemy.prototype.setUpdateCount = function(count) {
        this._updateCount = count;
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
            this.updateEnmeyExBitmap();
            if (!this.isDead() && this._updateCount === 0) {
                this.opacity = enemy.getBattleStyleOpacity() || 255;
                this._enemyImgesOpacity = this.opacity;
            }
        }
        if (this.isDead()) {
            this.revertToNormal();
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
            this._enemyImgesOpacity = this.opacity;
        }
        return this._enemyImgesOpacity;
    };
    
    Sprite_Enemy.prototype.getImgScenes = function(enemy) {
        return enemy._imgScenes;
    };

    Sprite_Enemy.prototype.setDeadUpdateCount = function() {
        this.setUpdateCount(1);
        this.setEnemyDead(true);
    };
    
    Sprite_Enemy.prototype.setReviveUpdateCount = function(){
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