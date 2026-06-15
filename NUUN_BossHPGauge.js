/*:-----------------------------------------------------------------------------------
 * NUUN_BossHPGauge.js
 * Copyright (C) 2026 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Boss HP Gauge
 * @author NUUN
 * @version 1.0.2
 * 
 * @help
 * Display the boss gauge.
 * 
 * Boss gauge display method
 * Apply the vanish effect when the enemy is a boss or has one of the following tags.
 * 
 * Enemy note field  
 * <BossEnemy> Recognized as a boss enemy, and an HP gauge will be displayed.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial Use: Allowed
 * Adult Content: Allowed
 * Modifications: Allowed
 * Redistribution: Allowed
 * Support is not available for unofficial distribution or modified versions.
 * 
 * Log
 * 6/16/2026 Ver.1.0.2
 * Added a feature to specify the vertical display spacing of gauges.
 * 6/15/2026 Ver.1.0.1
 * Fixed so that the vanish effect also recognizes bosses as boss enemies.
 * 6/2615/2026 Ver.1.0.0
 * First edition.
 * 
 * @param BasicSettings
 * @text Basic Settings
 * @default ------------------------------
 * 
 * @param GaugePosition
 * @desc Specify the position of the gauge.
 * @text Gauge position
 * @type select
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @default left
 * @parent BasicSettings
 * 
 * @param GaugeVerticalMode
 * @desc Specify the vertical display method of the gauge.
 * @text Vertical gauge display
 * @type select
 * @option Downward
 * @value down
 * @option Upward
 * @value up
 * @default down
 * @parent BasicSettings
 * 
 * @param BossGaugeCols
 * @text Gauge display column
 * @desc Specify the number of gauge display columns.
 * @type number
 * @default 1
 * @parent BasicSettings
 * 
 * @param BossGaugeY
 * @text Specify the relative Y‑coordinate of the entire boss gauge.
 * @desc Boss gauge Y‑offset (relative)
 * @type number
 * @default 12
 * @parent BasicSettings
 * 
 * @param GaugeMargin
 * @text Gauge margin
 * @desc Specify the horizontal padding of the gauge.
 * @type number
 * @default 64
 * @parent BasicSettings
 * 
 * @param GaugeVerticalSpacing
 * @text Gauge vertical spacing
 * @desc Specifies the vertical display spacing of the gauges.
 * @type number
 * @default 52
 * @parent BasicSettings
 * 
 * @param NameSettings
 * @text Enemy name settings
 * @default ------------------------------
 * 
 * @param NamePosition
 * @desc Specify the position of the enemy name.
 * @text Enemy name position  
 * @type select
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option None
 * @value none
 * @default left
 * @parent NameSettings
 * 
 * @param NameWidth
 * @text Name width
 * @desc Specify the display width of the enemy name.
 * @type number
 * @default 9999
 * @parent NameSettings
 * 
 * @param GaugeSettings
 * @text Gauge settings
 * @default ------------------------------
 * 
 * @param GaugeStyle
 * @desc Gauge style
 * @text Specifies the style of the gauge.
 * @type select
 * @option Default
 * @value default
 * @option Image
 * @value image
 * @option Diagonal
 * @value diagonal
 * @default default
 * @parent GaugeSettings
 * 
 * @param GaugeY
 * @text Gauge Y‑offset (relative)
 * @desc Specify the relative Y‑coordinate of the gauge.
 * @type number
 * @default 12
 * @parent GaugeSettings
 * 
 * @param GaugeWidth
 * @text Gauge width
 * @desc Specify the gauge width.
 * @type number
 * @default 600
 * @parent GaugeSettings
 * 
 * @param GaugeHeight
 * @text Gauge height
 * @desc Specify the gauge height. This setting is disabled in image mode.
 * @type number
 * @default 12
 * @parent GaugeSettings
 * 
 * @param ShowValue
 * @text HP value display
 * @desc Display the HP value.
 * @type boolean
 * @default true
 * @parent GaugeSettings
 * 
 * @param EnemyGaugeImageSettings
 * @text Image gauge settings
 * @default ------------------------------
 * 
 * @param GaugeBackImage
 * @text Background gauge image  
 * @desc Specifies the background gauge image.
 * @type file
 * @dir img/
 * @default
 * @parent EnemyGaugeImageSettings
 * 
 * @param GaugeBackImageX
 * @text Background gauge image X coordinate
 * @desc Sets the X coordinate of the background gauge (relative).
 * @type number
 * @default 0
 * @parent GaugeBackImage
 * 
 * @param GaugeBackImageY
 * @text Background gauge image Y coordinate
 * @desc Sets the Y coordinate of the background gauge (relative).
 * @type number
 * @default 0
 * @parent GaugeBackImage
 * 
 * @param GaugeImage
 * @text Gauge image
 * @desc Specifies the gauge image.
 * @type file
 * @dir img/
 * @default
 * @parent EnemyGaugeImageSettings
 * 
 * @param GaugeImageX
 * @text Gauge image X coordinate
 * @desc Sets the gauge X coordinate (relative).
 * @type number
 * @default 0
 * @parent GaugeImage
 * 
 * @param GaugeImageY
 * @text Gauge image Y coordinate
 * @desc Sets the gauge Y coordinate (relative).
 * @type number
 * @default 0
 * @parent GaugeImage
 * 
 * @param GaugeFrontImage
 * @text Front gauge image
 * @desc Specifies the front gauge image.
 * @type file
 * @dir img/
 * @default
 * @parent EnemyGaugeImageSettings
 * 
 * @param GaugeFrontImageX
 * @text Front gauge image X coordinate
 * @desc Sets the front gauge X coordinate (relative).
 * @type number
 * @default 0
 * @parent GaugeFrontImage
 * 
 * @param GaugeFrontImageY
 * @text Front gauge image Y coordinate
 * @desc Sets the front gauge Y coordinate (relative).
 * @type number
 * @default 0
 * @parent GaugeFrontImage
 * 
 * @param EnemyImageSettings
 * @text Enemy image settings 
 * @default ------------------------------
 * 
 * @param ShowEnemyImage
 * @desc Display the enemy image.
 * @text Enemy image display
 * @type boolean
 * @default true
 * @parent EnemyImageSettings
 * 
 * @param EnemyWidth
 * @text Enemy display width
 * @desc Specify the width of the enemy image to be displayed.
 * @type number
 * @default 52
 * @parent EnemyImageSettings
 * 
 * @param BackgroundColor
 * @desc Specify the background color.
 * @text Background color
 * @type color
 * @default 8
 * @min -1
 * @parent EnemyImageSettings
 * 
 * @param FrameColor
 * @desc Specify the frame color.
 * @text Frame color
 * @type color
 * @default 15
 * @min -1
 * @parent EnemyImageSettings
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ボスHPゲージ
 * @author NUUN
 * @version 1.0.2
 * 
 * @help
 * ボス用のゲージを表示します。
 * 
 * ボスゲージの表示方法
 * 消滅エフェクトがボスまたは以下のタグを指定。
 * 
 * 敵キャラのメモ欄
 * <BossEnemy> ボスエネミーとして認識されHPゲージが表示されます。
 * 
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 成人向け：可能
 * 改変：可能
 * 再配布：可能
 * ※正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/6/16 Ver.1.0.2
 * ゲージの縦の表示間隔を指定できる機能を追加。
 * 2026/6/15 Ver.1.0.1
 * 消滅エフェクトがボスでもボスエネミーとして認識するように修正。
 * 2026/6/15 Ver.1.0.0
 * 初版
 * 
 * @param BasicSettings
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param GaugePosition
 * @desc ゲージの位置を指定します。
 * @text ゲージ位置
 * @type select
 * @option 左
 * @value left
 * @option 中央
 * @value center
 * @option 右
 * @value right
 * @default left
 * @parent BasicSettings
 * 
 * @param GaugeVerticalMode
 * @desc ゲージの縦方向の表示方法を指定します。
 * @text 縦方向表示
 * @type select
 * @option 下方向
 * @value down
 * @option 上方向
 * @value up
 * @default down
 * @parent BasicSettings
 * 
 * @param BossGaugeCols
 * @text ゲージ表示列
 * @desc ゲージの表示列数を指定します。
 * @type number
 * @default 1
 * @parent BasicSettings
 * 
 * @param BossGaugeY
 * @text ボスゲージ全体のY座標(相対)を指定します。
 * @desc ボスゲージY座標(相対)
 * @type number
 * @default 12
 * @parent BasicSettings
 * 
 * @param GaugeMargin
 * @text ゲージ余白
 * @desc ゲージの横方向の余白を指定します。
 * @type number
 * @default 64
 * @parent BasicSettings
 * 
 * @param GaugeVerticalSpacing
 * @text ゲージ縦間隔
 * @desc ゲージの縦の表示間隔を指定します。
 * @type number
 * @default 52
 * @parent BasicSettings
 * 
 * @param NameSettings
 * @text モンスター名設定
 * @default ------------------------------
 * 
 * @param NamePosition
 * @desc モンスター名の位置を指定します。
 * @text モンスター名位置
 * @type select
 * @option 左
 * @value left
 * @option 中央
 * @value center
 * @option なし
 * @value none
 * @default left
 * @parent NameSettings
 * 
 * @param NameWidth
 * @text 名前表示幅
 * @desc モンスター名の表示幅を指定します。
 * @type number
 * @default 9999
 * @parent NameSettings
 * 
 * @param GaugeSettings
 * @text ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeStyle
 * @desc ゲージスタイル
 * @text ゲージのスタイルを指定します。
 * @type select
 * @option 通常
 * @value default
 * @option 画像
 * @value image
 * @option 斜め
 * @value diagonal
 * @default default
 * @parent GaugeSettings
 * 
 * @param GaugeY
 * @text ゲージY座標(相対)
 * @desc ゲージのY座標(相対)を指定します。
 * @type number
 * @default 12
 * @parent GaugeSettings
 * 
 * @param GaugeWidth
 * @text ゲージ横幅
 * @desc ゲージの横幅を指定します。
 * @type number
 * @default 600
 * @parent GaugeSettings
 * 
 * @param GaugeHeight
 * @text ゲージ縦幅
 * @desc ゲージの縦幅を指定します。画像モードでは無効になります。
 * @type number
 * @default 12
 * @parent GaugeSettings
 * 
 * @param ShowValue
 * @text HP値表示
 * @desc HPの値を表示します。
 * @type boolean
 * @default true
 * @parent GaugeSettings
 * 
 * @param EnemyGaugeImageSettings
 * @text 画像ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeBackImage
 * @text 背景ゲージ画像
 * @desc 背景のゲージ画像を指定します。
 * @type file
 * @dir img/
 * @default
 * @parent EnemyGaugeImageSettings
 * 
 * @param GaugeBackImageX
 * @text 背景ゲージ画像座標X
 * @desc 背景のゲージX座標を設定します。(相対)
 * @type number
 * @default 0
 * @parent GaugeBackImage
 * 
 * @param GaugeBackImageY
 * @text 背景ゲージ画像座標Y
 * @desc 背景のゲージY座標を設定します。(相対)
 * @type number
 * @default 0
 * @parent GaugeBackImage
 * 
 * @param GaugeImage
 * @text ゲージ画像
 * @desc ゲージ画像を指定します。
 * @type file
 * @dir img/
 * @default
 * @parent EnemyGaugeImageSettings
 * 
 * @param GaugeImageX
 * @text ゲージ画像座標X
 * @desc ゲージX座標を設定します。(相対)
 * @type number
 * @default 0
 * @parent GaugeImage
 * 
 * @param GaugeImageY
 * @text ゲージ画像座標Y
 * @desc ゲージY座標を設定します。(相対)
 * @type number
 * @default 0
 * @parent GaugeImage
 * 
 * @param GaugeFrontImage
 * @text 前面ゲージ画像
 * @desc 前面のゲージ画像を指定します。
 * @type file
 * @dir img/
 * @default
 * @parent EnemyGaugeImageSettings
 * 
 * @param GaugeFrontImageX
 * @text 前面ゲージ画像座標X
 * @desc 前面のゲージX座標を設定します。(相対)
 * @type number
 * @default 0
 * @parent GaugeFrontImage
 * 
 * @param GaugeFrontImageY
 * @text 前面ゲージ画像座標Y
 * @desc 前面のゲージY座標を設定します。(相対)
 * @type number
 * @default 0
 * @parent GaugeFrontImage
 * 
 * @param EnemyImageSettings
 * @text 敵キャラ画像設定
 * @default ------------------------------
 * 
 * @param ShowEnemyImage
 * @desc 敵キャラの画像を表示します。
 * @text 敵キャラ画像表示
 * @type boolean
 * @default true
 * @parent EnemyImageSettings
 * 
 * @param EnemyWidth
 * @text モンスター表示横幅
 * @desc 表示するモンスター画像の横幅を指定します。
 * @type number
 * @default 52
 * @parent EnemyImageSettings
 * 
 * @param BackgroundColor
 * @desc 背景色を指定します。
 * @text 背景色
 * @type color
 * @default 8
 * @min -1
 * @parent EnemyImageSettings
 * 
 * @param FrameColor
 * @desc フレーム色を指定します。
 * @text フレーム色
 * @type color
 * @default 15
 * @min -1
 * @parent EnemyImageSettings
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BossHPGauge = true;

(() => {

    class Nuun_PluginParams_BossHPGauge {
        static getPluginParams(text) {//document.currentScript
            try {
                const name = String(Utils.extractFileName(text.src).split('.').shift());
                const params = PluginManager.parameters(name);
                if (params) {
                    const pluginParam = new Nuun_PluginParamData(params);
                    pluginParam.setPluginName(name);
                    return pluginParam.getParameters();
                }
                return {pluginName: name};
            } catch (error) {
                const log = ($gameSystem.isJapanese() ? "コアスクリプトをVer.1.3.2以降に更新してください。" : "Please update the core script to version 1.3.2 or later.");
                throw ["ParameterError", log];
            }
        }
    };

    window.Nuun_PluginParams_BossHPGauge = Nuun_PluginParams_BossHPGauge;

    class Nuun_PluginParamData {
        constructor(text) {
            this._parameters = JSON.parse(JSON.stringify(text, this._convertParams)) || {};
        }

        _convertParams(key, code) {
            try {
                return JSON.parse(code);
            } catch (e) {
                if (isNaN(code)) {
                    if (!code) {
                        return null;
                    }
                    try {
                        if (code.indexOf("'") === 0 || code.indexOf('"' === 0)) {
                            return eval(code);//'または"を外す。
                        }
                        return !!code ? String(code) : null;
                    } catch (e) {
                        if (typeof {} === "object") {
                            return code;
                        }
                        return !!code ? String(code) : null;
                    }
                } else {
                    return String(code);
                }
            }
        }

        getParameters() {
            return this._parameters;
        }

        setPluginName(name) {
            this._parameters.pluginName = name;
        }


        getMetaTag(object, code) {
            const data = object.meta[code];
            let list = [];
            if (data !== undefined) {
                try {
                    list = data.split(',');
                } catch (error) {
                    return this.getTextCodeMeta(data);
                }
                list.forEach(a => {
                    a = this.getTextCodeMeta(a);
                });
                return list;
            } else {
                return undefined;
            }
        }

        getTextCodeMeta(text) {
            if (isNaN(text)) {
                return text;
            } else {
                return Number(text);
            }
        }
    };

    const params = Nuun_PluginParams_BossHPGauge.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;
    
    function NuunBossHpGaugeManager() {
        throw new Error("This is a static class");
    }

    NuunBossHpGaugeManager.LoadPictures = function(filename) {
        const bitmap = ImageManager.loadBitmap("img/", filename);
        return bitmap;
    };

    NuunBossHpGaugeManager.getColorCode = function(color) {
        if (typeof(color) === "string" && color.indexOf('#') === 0) {
            return color;
        }
        return ColorManager.textColor(color);
    };

    const _Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer;
    Scene_Base.prototype.createWindowLayer = function() {
        this.createBossHpGauge()
        _Scene_Base_createWindowLayer.apply(this, arguments);
    };

    Scene_Base.prototype.createBossHpGauge = function() {

    };


    Scene_Battle.prototype.createBossHpGauge = function() {
        this.createBossHpGauge();
    };

    Scene_Battle.prototype.createBossHpGauge = function() {
        this._bossGauge = [];
        const enemies = $gameTroop.members();
        enemies.forEach((enemy, index) => {
            if (this.isShowBossHpGauge(enemy)) {
                this.setupBossEnemyGauge(enemy);
            }
        })
    };

    Scene_Battle.prototype.isShowBossHpGauge = function(enemy) {
        return !!enemy.enemy().meta.BossEnemy || enemy.collapseType() === 1;
    };

    Scene_Battle.prototype.setupBossEnemyGauge = function(enemy) {
        const sprite1 = new Sprite_BossEnemyGauge();
        let sprite2 = null;
        this.addChild(sprite1);
        sprite1.setup(enemy, "hp");
        if (params.ShowEnemyImage) {
            sprite2 = new Sprite_BossEnemy();
            this.addChild(sprite2);
            sprite2.setup(enemy);
        }
        this._bossGauge.push([sprite1, sprite2]);
    };

    const _Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
    Scene_Battle.prototype.updateVisibility = function() {
        _Scene_Battle_updateVisibility.apply(this, arguments);
        this.updateBossHpGauge();
    };

    Scene_Battle.prototype.updateBossHpGauge = function() {
        const x = _getGaugePosition();
        let y = params.BossGaugeY + (Graphics.height - Graphics.boxHeight);
        const vMargin = Math.max(params.EnemyWidth, params.GaugeVerticalSpacing) * _gaugeVerticalDirection();
        let index = 0;
        for (const sprites of this._bossGauge) {
            sprites[0].x = x + (index % params.BossGaugeCols) * (params.GaugeWidth + _getGaugeMargin());
            sprites[0].y = y + (Math.floor(index / params.BossGaugeCols) * vMargin) + params.GaugeY;
            if (!!sprites[1]) {
                sprites[1].x = x + (index % params.BossGaugeCols) * (params.GaugeWidth + _getGaugeMargin()) - params.EnemyWidth;
                sprites[1].y = y + Math.floor(index / params.BossGaugeCols) * vMargin;
            }   
            if (sprites[0]._battler && sprites[0]._battler.isAppeared() && !sprites[0]._battler.isDead()) {
                index++;
            }
        }
    };


    function Sprite_BossEnemyGauge() {
        this.initialize(...arguments);
    }

    Sprite_BossEnemyGauge.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_BossEnemyGauge.prototype.constructor = Sprite_BossEnemyGauge;

    Sprite_BossEnemyGauge.prototype.initialize = function() {
        Sprite_Gauge.prototype.initialize.call(this);
        this.createGagueSprite();
        this.spriteEnemy()
    };

    Sprite_BossEnemyGauge.prototype.spriteEnemy = function() {
        const scene = SceneManager._scene;
        if (!scene) return;
    };

    Sprite_BossEnemyGauge.prototype.createGagueSprite = function(id, method) {
        this._gaugeImageBitmap = [];
        this.createGagueBitmap(0, "GaugeBackImage");
        this.createGagueBitmap(1, "GaugeImage");
        this.createGagueBitmap(2, "GaugeFrontImage");
        this.createEnemySprite();
    };

    Sprite_BossEnemyGauge.prototype.createGagueBitmap = function(id, method) {
        if (!params[method]) return;
        this._gaugeImageBitmap[id] = NuunBossHpGaugeManager.LoadPictures(params[method]);
    };

    Sprite_BossEnemyGauge.prototype.createEnemySprite = function(id, method) {
        const sprite = new Sprite();
        this.addChild(sprite);
        const width = 100;
        const height = 100;
        sprite.bitmap = new Bitmap(width, height);
        this._enemySprite = sprite;
    };

    Sprite_BossEnemyGauge.prototype.bitmapWidth = function() {
        return params.GaugeWidth;
    };

    Sprite_BossEnemyGauge.prototype.gaugeX = function() {
        return 0;
    };

    Sprite_BossEnemyGauge.prototype.labelY = function() {
        return 0;
    };

    Sprite_BossEnemyGauge.prototype.update = function() {
        Sprite_Gauge.prototype.update.apply(this, arguments);
        this.updateBossEnemyGauge();
    };

    Sprite_BossEnemyGauge.prototype.updateBossEnemyGauge = function() {
        if (this._battler && this._battler.isAppeared() && !this._battler.isDead()) {
            if (this.opacity < 255) this.opacity += 16;
        } else {
            if (this.opacity > 0) this.opacity -= 16;
        }
    };

    Sprite_BossEnemyGauge.prototype.drawGaugeRect = function(x, y, width, height) {
        switch (params.GaugeStyle) {
            case "image":
                this.drawImageGaugeRect(x, y, width, height);
                break;
            case "diagonal":
                this.drawDiagonalGaugeRect(x, y, width, height);
                break;
            default:
                Sprite_Gauge.prototype.drawGaugeRect.apply(this, arguments);
                break;
        }
    };

    Sprite_BossEnemyGauge.prototype.drawImageGaugeRect = function(x, y, width, height) {
        const w = this.bitmapWidth();
        const h = this.bitmapHeight();
        this.drawBackGaugeRect(params.GaugeBackImageX, params.GaugeBackImageY, w, h);
        this.drawStrokeGaugeRect(params.GaugeImageX, params.GaugeImageY, w, h);
        this.drawFrontGaugeRect(params.GaugeFrontImageX, params.GaugeFrontImageY, w, h);
    };

    //斜め
    Sprite_BossEnemyGauge.prototype.drawDiagonalGaugeRect = function(x, y, width, height) {
        const rate = this.gaugeRate();
        const diagonal = Math.floor(this.textHeight() / 2);
        const w = width - diagonal * (height / this.textHeight());
        const fillW = Math.floor((w - 2) * rate);
        const fillH = height - 2;
        const color0 = this.gaugeBackColor();
        const color1 = this.gaugeColor1();
        const color2 = this.gaugeColor2();
        const bitmap = this.bitmap;
        bitmap.context.setTransform(1, 0, -0.5, 1, 1, 0);
        bitmap.fillRect(x + diagonal - 1, y, w, height, color0);
        bitmap.gradientFillRect(x + diagonal, y + 1, fillW, fillH, color1, color2);
        bitmap.context.resetTransform();
    };

    Sprite_BossEnemyGauge.prototype.drawBackGaugeRect = function(x, y, width, height) {
        if (!!params.GaugeBackImage && !!this._gaugeImageBitmap[0]) {
            this.bitmap.blt(this._gaugeImageBitmap[0], 0, 0,this._gaugeImageBitmap[0].width, this._gaugeImageBitmap[0].height, x, y);
        }
    };

    Sprite_BossEnemyGauge.prototype.drawStrokeGaugeRect = function(x, y, width, height) {
        if (!this._gaugeImageBitmap[1]) return;
        const rate = this.gaugeRate();
        const w = Math.min(this._gaugeImageBitmap[1].width, width);
        const fillW = Math.floor((this._gaugeImageBitmap[1].width - 2) * rate);
        const fillH = this._gaugeImageBitmap[1].height - 2;
        if (!!params.GaugeImage) {
            this.bitmap.blt(this._gaugeImageBitmap[1], 0, 0, fillW, fillH, x, y);
        }
    };

    Sprite_BossEnemyGauge.prototype.drawFrontGaugeRect = function(x, y, width, height) {
        if (!!params.GaugeFrontImage && !!this._gaugeImageBitmap[2]) {
            this.bitmap.blt(this._gaugeImageBitmap[2], 0, 0, this._gaugeImageBitmap[2].width, this._gaugeImageBitmap[2].height, x, y);
        }
    };

    Sprite_BossEnemyGauge.prototype.drawValue = function() {
        if (!params.ShowValue) return;
        Sprite_Gauge.prototype.drawValue.apply(this, arguments);
    };

    Sprite_BossEnemyGauge.prototype.drawLabel = function() {
        if (params.NamePosition === "none") return;
        const name = this._battler.name();
        this.setupNameFont();
        const x = this.labelOutlineWidth() / 2;
        const y = this.labelY();
        const width = Math.min(params.NameWidth, this.bitmapWidth());
        const height = this.textHeight();
        this.bitmap.drawText(this._battler.name(), x, y, width, height, params.NamePosition);
    };

    Sprite_BossEnemyGauge.prototype.setupNameFont = function() {
        this.bitmap.fontFace = this.labelFontFace();
        this.bitmap.fontSize = this.labelFontSize();
        this.bitmap.textColor = this.valueColor();
        this.bitmap.outlineColor = this.labelOutlineColor();
        this.bitmap.outlineWidth = this.labelOutlineWidth();
    };


    function Sprite_BossEnemy() {
        this.initialize(...arguments);
    }

    Sprite_BossEnemy.prototype = Object.create(Sprite.prototype);
    Sprite_BossEnemy.prototype.constructor = Sprite_BossEnemy;

    Sprite_BossEnemy.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.createBitmap();
        this.createEnemySprite();
    };

    Sprite_BossEnemy.prototype.createEnemySprite = function() {
        const sprite = new Sprite();
        this.addChild(sprite);
        this._enemySprite = sprite;
        const width = this.bitmapWidth();
        const height = this.bitmapHeight();
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.x = Math.floor(width / 2);
        sprite.y = Math.floor(height / 2);
        sprite.bitmap = new Bitmap(width, height);
    };

    Sprite_BossEnemy.prototype.createBitmap = function() {
        const width = this.bitmapWidth();
        const height = this.bitmapHeight();
        this.bitmap = new Bitmap(width, height);
    };

    Sprite_BossEnemy.prototype.bitmapWidth = function() {
        return params.EnemyWidth;
    };

    Sprite_BossEnemy.prototype.bitmapHeight = function() {
        return params.EnemyWidth;
    };

    Sprite_BossEnemy.prototype.setup = function(battler) {
        this._enemy = battler;
    };

    Sprite_BossEnemy.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updateBitmap();
        this.updateBossEnemy();
    };

    Sprite_BossEnemy.prototype.updateBitmap = function() {
        const name = this._enemy.battlerName();
        const hue = this._enemy.battlerHue();
        if (this._battlerName !== name || this._battlerHue !== hue) {
            this.bitmap.clear();
            this._battlerName = name;
            this._battlerHue = hue;
            this.drawBackground();
            this.drawEnemy();
            this.drawFrame();
        }
    };

    Sprite_BossEnemy.prototype.updateBossEnemy = function() {
        if (this._enemy && this._enemy.isAppeared() && !this._enemy.isDead()) {
            if (this.opacity < 255) this.opacity += 16;
        } else {
            if (this.opacity > 0) this.opacity -= 16;
        }
    };

    Sprite_BossEnemy.prototype.drawEnemy = function() {
        const name = this._enemy.battlerName();
        const hue = this._enemy.battlerHue();
        const sprite = this._enemySprite;
        sprite.bitmap.clear();
        sprite.bitmap = this.loadBitmap(name);
        sprite.bitmap.addLoadListener(function() {
            const scale = Math.min((this.bitmapWidth() - 2) / sprite.bitmap.width, (this.bitmapHeight() - 2) / sprite.bitmap.height);
                sprite.scale.x = scale;
                sprite.scale.y = scale;
            }.bind(this)); 
        this.setHue(hue);
    };

    Sprite_BossEnemy.prototype.loadBitmap = function(name) {
        if ($gameSystem.isSideView()) {
            return ImageManager.loadSvEnemy(name);
        } else {
            return ImageManager.loadEnemy(name);
        }
    };

    Sprite_BossEnemy.prototype.setHue = function(hue) {
        Sprite_Enemy.prototype.setHue.apply(this._enemySprite, arguments);
    };

    Sprite_BossEnemy.prototype.drawBackground = function() {
        const w = params.EnemyWidth;
        this.bitmap.fillRect(0, 0, w, w, NuunBossHpGaugeManager.getColorCode(params.FrameColor));
    };

    Sprite_BossEnemy.prototype.drawFrame = function() {
        const w = params.EnemyWidth;
        this.bitmap.fillRect(1, 1, w - 2, w - 2, NuunBossHpGaugeManager.getColorCode(params.BackgroundColor));
    };


    function _getGaugePosition() {
        switch (params.GaugePosition) {
            case "left":
                return _getGaugeMargin();
            case "center":
                return Math.floor((Graphics.width - (params.GaugeWidth || 600) + _getGaugeMargin()) / 2);
            case "right":
                return (Graphics.width - (params.GaugeWidth || 600)) - 12;
            default :
                return Math.floor((Graphics.width - (params.GaugeWidth || 600)) / 2) + _getGaugeMargin();
        }
    };

    function _getGaugeMargin() {
        return Math.max(params.GaugeMargin, (params.ShowEnemyImage ? params.EnemyWidth : 0));
    };

    function _gaugeVerticalDirection() {
        switch (params.GaugeVerticalMode) {
            case "up":
                return -1;
            case "down":
                return 1;
        }
    };

    
})();