/*:-----------------------------------------------------------------------------------
 * NUUN_CircularGauge.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc Circular gauge
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.3
 * 
 * @help
 * Make the target gauge into a circle shape.
 * 
 * Log
 * 9/29/2024 Ver.1.0.3
 * Processing fixes.
 * 9/28/2024 Ver.1.0.2
 * Fixed an issue where images were not displayed.
 * 9/17/2024 Ver.1.0.1
 * Applying NUUN_DamageGauge.
 * 5/26/2024 Ver.1.0.0
 * first edition
 * 
 * @param CircularGaugeSetting
 * @text Circler gauge settings
 * @desc Configure the circle gauge.
 * @type struct<GaugeGauge>[]
 * @default ["{\"Type\":\"'tp'\",\"FilteringClass\":\"[\\\"'Window_BattleStatus'\\\",\\\"'Window_BattleActor'\\\",\\\"'Window_BattleActorStatus'\\\"]\",\"ShowLabel\":\"true\",\"FontSize\":\"-6\",\"ValueFontSize\":\"-6\",\"GaugeX\":\"60\",\"GaugeY\":\"-150\",\"GaugeRadius\":\"25\",\"GaugeHeight\":\"10\",\"StartAngle\":\"-90\",\"EndAngle\":\"270\",\"ImgSetting\":\"------------------------------\",\"GaugeBackImg\":\"\",\"GaugeImg\":\"\",\"LabelImg\":\"\"}"]
 * 
 * @param GaugeUnder
 * @desc Lowers the position of HP and MP gauges in battle status.
 * @text HP, MP gauge lower movement
 * @type boolean
 * @default true
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc サークルゲージ
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.3
 * 
 * @help
 * 対象のゲージをサークル型にします。
 * 
 * 更新履歴
 * 2024/9/29 Ver.1.0.3
 * 処理の修正。
 * 2024/9/28 Ver.1.0.2
 * 画像が表示されない問題を修正。
 * 2024/9/17 Ver.1.0.1
 * NUUN_DamageGaugeの適用。
 * 2024/5/26 Ver.1.0.0
 * 初版
 * 
 * @param CircularGaugeSetting
 * @text サークルゲージ設定
 * @desc サークルゲージの設定を行います。
 * @type struct<GaugeGauge>[]
 * @default ["{\"Type\":\"'tp'\",\"FilteringClass\":\"[\\\"'Window_BattleStatus'\\\",\\\"'Window_BattleActor'\\\",\\\"'Window_BattleActorStatus'\\\"]\",\"ShowLabel\":\"true\",\"FontSize\":\"-6\",\"ValueFontSize\":\"-6\",\"GaugeX\":\"60\",\"GaugeY\":\"-150\",\"GaugeRadius\":\"25\",\"GaugeHeight\":\"10\",\"StartAngle\":\"-90\",\"EndAngle\":\"270\",\"ImgSetting\":\"------------------------------\",\"GaugeBackImg\":\"\",\"GaugeImg\":\"\",\"LabelImg\":\"\"}"]
 * 
 * @param GaugeUnder
 * @desc バトルステータスのHP、MPゲージの位置を下に下げます。
 * @text HP、MPゲージ下部移動
 * @type boolean
 * @default true
 * 
 */
/*~struct~GaugeGauge:ja
 * 
 * @param Type
 * @text 対象
 * @desc 表示ステータスタイプ対象
 * @type combo
 * @option 'hp'
 * @option 'mp'
 * @option 'tp'
 * @option 'time'
 * @option 'menuexp'
 * @option 'result_exp'
 * @default 
 * 
 * @param FilteringClass
 * @text フィルタリングクラス設定
 * @desc 適用するウィンドウクラスを指定します。無指定の場合は全てのウィンドウで反映されます。(複数指定可)
 * @type combo[]
 * @option 'Window_MenuStatus'
 * @option 'Window_MenuActor'
 * @option 'Window_Status'
 * @option 'Window_BattleStatus'
 * @option 'Window_BattleActor'
 * @option 'Window_BattleActorStatus'
 * @option 'Window_Result'
 * @option 'Window_FormationStatus'
 * @option 'Sprite_Enemy'
 * @option 'Window_CustomMenuDataList'
 * @default
 * 
 * @param ShowLabel
 * @desc ラベルを表示する。
 * @text ラベル表示
 * @type boolean
 * @default true
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントサイズからの差）
 * @text フォントサイズ
 * @type number
 * @default -6
 * @min -99
 * 
 * @param ValueFontSize
 * @desc 値のフォントサイズ（メインフォントサイズからの差）
 * @text 値フォントサイズ
 * @type number
 * @default -6
 * @min -99
 * 
 * @param GaugeX
 * @desc ゲージのX座標を指定します。
 * @text ゲージX座標
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeY
 * @desc ゲージのY座標を指定します。
 * @text ゲージY座標
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeRadius
 * @desc ゲージの半径を指定します。
 * @text ゲージ半径(画像未指定時)
 * @type number
 * @default 25
 * @min 0
 * 
 * @param GaugeHeight
 * @desc ゲージの縦幅を指定します。
 * @text ゲージ縦幅(画像未指定時)
 * @type number
 * @default 10
 * @min 0
 * 
 * @param StartAngle
 * @desc ゲージの開始角度を指定します。（１２時の位置が-90で３時の位置が0です）
 * @text ゲージ開始角度
 * @type number
 * @default -90
 * @max 360
 * @min -360
 * 
 * @param EndAngle
 * @desc ゲージの終了角度を指定します。
 * @text ゲージ終了角度
 * @type number
 * @default 270
 * @max 360
 * @min -360
 *
 * @param ImgSetting
 * @text 画像設定
 * @default ------------------------------
 * 
 * @param GaugeBackImg
 * @desc ゲージの背景画像ファイル名を指定します。
 * @text ゲージ背景画像
 * @type file
 * @dir img/
 * @default 
 * 
 * @param GaugeImg
 * @desc ゲージの画像ファイル名を指定します。
 * @text ゲージ画像
 * @type file
 * @dir img/
 * @default 
 * 
 * @param LabelImg
 * @desc ラベルの画像ファイル名を指定します。
 * @text ラベル画像
 * @type file
 * @dir img/
 * @default 
 */
/*~struct~GaugeGauge:
 * 
 * @param Type
 * @text Display target
 * @desc Display target.
 * @type combo
 * @option 'hp'
 * @option 'mp'
 * @option 'tp'
 * @option 'time'
 * @option 'menuexp'
 * @option 'result_exp'
 * @default 
 * 
 * @param FilteringClass
 * @text Filtering class setting
 * @desc Specifies the window class to apply. If not specified, it will be reflected in all windows. (multiple selection)
 * @type combo[]
 * @option 'Window_MenuStatus'
 * @option 'Window_MenuActor'
 * @option 'Window_Status'
 * @option 'Window_BattleStatus'
 * @option 'Window_BattleActor'
 * @option 'Window_BattleActorStatus'
 * @option 'Window_Result'
 * @option 'Window_FormationStatus'
 * @option 'Sprite_Enemy'
 * @option 'Window_CustomMenuDataList'
 * @default
 * 
 * @param ShowLabel
 * @desc Show label.
 * @text Labeling
 * @type boolean
 * @default true
 * 
 * @param FontSize
 * @desc Font size. (difference from main font size)
 * @text font size
 * @type number
 * @default -6
 * @min -99
 * 
 * @param ValueFontSize
 * @desc The current numeric font size. (difference from main font size)
 * @text Current numeric font size
 * @type number
 * @default -6
 * @min -9999
 * 
 * @param GaugeX
 * @desc Specify the x-coordinate of the gauge.
 * @text gauge x coordinate
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeY
 * @desc Specify the Y coordinate of the gauge.
 * @text Gauge Y coordinate
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeRadius
 * @desc Specify the radius of the gauge.
 * @text Gauge radius (when no image is specified)
 * @type number
 * @default 25
 * @min 0
 * 
 * @param GaugeHeight
 * @desc Specify the vertical width of the gauge.
 * @text Gauge vertical width (when no image is specified)
 * @type number
 * @default 10
 * @min 0
 * 
 * @param StartAngle
 * @desc Specifies the starting angle of the gauge. (12 o'clock position is -90 and 3 o'clock position is 0)
 * @text Gauge starting angle
 * @type number
 * @default -90
 * @max 360
 * @min -360
 * 
 * @param EndAngle
 * @desc Specifies the ending angle of the gauge.
 * @text Gauge end angle
 * @type number
 * @default 270
 * @max 360
 * @min -360
 *
 * @param ImgSetting
 * @text Image settings
 * @default ------------------------------
 * 
 * @param GaugeBackImg
 * @desc Specify the background image file name of the gauge.
 * @text gauge background image
 * @type file
 * @dir img/
 * @default 
 * 
 * @param GaugeImg
 * @desc Specify the gauge image file name.
 * @text Gauge image
 * @type file
 * @dir img/
 * @default 
 * 
 * @param LabelImg
 * @desc Specify the label image file name.
 * @text Label image.
 * @type file
 * @dir img/
 * @default 
 */

var Imported = Imported || {};
Imported.NUUN_CircularGauge = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const parameters = PluginManager.parameters('NUUN_CircularGauge');

    const LL_parameters = PluginManager.parameters('LL_ExGaugeDrawing');
    const _circularParams = new Nuun_TempParam();
    const _circularBitmap = [];

    const _Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        _Scene_Boot_onDatabaseLoaded.apply(this, arguments);
        _preloadGaugeImg();
    };

    const _Sprite_Gauge_initialize = Sprite_Gauge.prototype.initialize;
    Sprite_Gauge.prototype.initialize = function() {
        if (this._circularData) {
            this.circularInitMembers();
        }
        _Sprite_Gauge_initialize.apply(this, arguments);
    };

    Sprite_Gauge.prototype.getFindCircularGaugeData = function(type) {
        return params.CircularGaugeSetting.find(data => {
            return data.Type === type && this.filteringCircularGaugeDataClass(data); 
        });
    };

    Sprite_Gauge.prototype.filteringCircularGaugeDataClass = function(data) {
        const className = this.className ? this.className : NuunManager.isFilterClass(this);
        if (data.FilteringClass && data.FilteringClass.length > 0) {
            return data.FilteringClass.some(filterClass => filterClass === className);
        } else {
            return true;
        }
    };

    Sprite_Gauge.prototype.circularInitMembers = function() {
        this._startAngle = this.startAngle();
        this._sweepAngle = this.sweepAngle();
        this._startTPAngle = this.startTPAngle();
        this._sweepTPAngle = this.sweepTPAngle();
        this._pattern = [];
        this.circularSprite = [];
        _preloadGaugeImg();
    };

    Sprite_Gauge.prototype.createCircularGaugeBackImg = function() {
        if (this._circularData.GaugeBackImg && this._circularData.GaugeImg) {
            const bitmap = ImageManager.nuun_LoadPictures(this._circularData.GaugeBackImg);
            const sprite = new Sprite(bitmap);
            this.addChild(sprite);
            this.circularSprite[0] = sprite;
        }
    };

    Sprite_Gauge.prototype.createCircularGaugeImg = function() {
        if (this._circularData.GaugeBackImg && this._circularData.GaugeImg) {
            this._circularBitmap = ImageManager.nuun_LoadPictures(this._circularData.GaugeImg);
            if (Imported.NUUN_DamageGauge && this.isDamageCircularGaugeImg()) {
                this.createCircularDamageGaugeImg();
            }
            const sprite = new Sprite();
            this.circularSprite[1] = sprite;
            this.addChild(sprite);
            this.createCircularSpriteBitmap(1, this.circularSprite[0].bitmap);
            this.setCreatePattern(1, 1, this._circularBitmap);
        }
    };

    Sprite_Gauge.prototype.createCircularDamageGaugeImg = function() {
        const imgName = this._circularData.GaugeImg;
        const dagameGauge = imgName +"_damage";
        const recoveryGauge = imgName +"_recovery";
        this._circularDagameBitmap = ImageManager.nuun_LoadPictures(dagameGauge);
        this._circularRecoveryBitmap = ImageManager.nuun_LoadPictures(recoveryGauge);
        this.circularSprite[5] = new Sprite();
        this.addChild(this.circularSprite[5]);
        this.createCircularSpriteBitmap(5, this.circularSprite[0].bitmap);
        this.setCreatePattern(5, 4, this._circularRecoveryBitmap);
        this.setCreatePattern(5, 5, this._circularDagameBitmap);
    };

    Sprite_Gauge.prototype.isDamageCircularGaugeImg = function() {
        return !!this.getFindGaugeDamageData(this._circularData.Type);
    };

    Sprite_Gauge.prototype.createCircularLabelImg = function() {
        if (this._circularData.LabelImg) {
            const sprite = new Sprite(ImageManager.nuun_LoadPictures(this._circularData.LabelImg));
            this.circularSprite[2] = sprite;
            this.circularSprite[2].anchor.x = 0.5;
            this.addChild(sprite);
        }
    };

    const _Sprite_Gauge_createBitmap = Sprite_Gauge.prototype.createBitmap;
    Sprite_Gauge.prototype.createBitmap = function() {
        if (this._circularData) {
            this.createCircularBaseSprite();
            this.createCircularBitmap();
        } else {
            _Sprite_Gauge_createBitmap.apply(this, arguments);
        }
    };

    Sprite_Gauge.prototype.createCircularBaseSprite = function() {
        if (!this.circularSprite[0]) {
            this.createCircularGaugeBackImg();
        }
        if (!this.circularSprite[1]) {
            this.createCircularGaugeImg();
        }
        if (!this.circularSprite[2]) {
            this.createCircularLabelImg();
        }
    };

    Sprite_Gauge.prototype.createCircularBitmap = function() {
        const sprite = new Sprite();
        this.addChild(sprite);
        this.textSprite = sprite;
        const width = this.circularBitmapWidth();
        const height = this.circularBitmapHeight();
        this.textSprite.bitmap = new Bitmap(width, height);
        this.bitmap = this.textSprite.bitmap;
    };

    Sprite_Gauge.prototype.setCreatePattern = function(id, patternId, bitmap) {
        const context = this.circularSprite[id].bitmap.context;
        this._pattern[patternId] = context.createPattern(bitmap._image, "no-repeat");
    };
      
    Sprite_Gauge.prototype.createCircularSpriteBitmap = function(id, bitmap) {
        const width = bitmap.width;
        const height = bitmap.height;
        this.circularSprite[id].bitmap = new Bitmap(width, height);
    };

    Sprite_Gauge.prototype.circularBitmapWidth = function() {
        return this.radius() * 2 + this.circularGaugeHeight() * 2;
    };
      
    Sprite_Gauge.prototype.circularBitmapHeight = function() {
        return this.radius() * 2 + this.circularGaugeHeight() * 2;
    };

    Sprite_Gauge.prototype.circularGaugeHeight = function() {
        return this._circularData.GaugeHeight;
    };
      
    Sprite_Gauge.prototype.radius = function() {
        return this._circularData.GaugeRadius;
    };
      
    Sprite_Gauge.prototype.startAngle = function() {
        return this._circularData.StartAngle * Math.PI / 180;
    };
      
    Sprite_Gauge.prototype.sweepAngle = function() {
        return this._circularData.EndAngle * Math.PI / 180;
    };
      
    Sprite_Gauge.prototype.startTPAngle = function() {
        return (this._circularData.StartAngle + (this.circumference() < 360 ? 2 : 0)) * Math.PI / 180;
    };
      
    Sprite_Gauge.prototype.sweepTPAngle = function() {
        return (this._circularData.EndAngle - (this.circumference() < 360 ? 2 : 0)) * Math.PI / 180;
    };

    Sprite_Gauge.prototype.circumference = function() {
        return this._circularData.EndAngle - this._circularData.StartAngle;
    };
    
    const _Sprite_Gauge_labelFontSize = Sprite_Gauge.prototype.labelFontSize;
    Sprite_Gauge.prototype.labelFontSize = function() {
        return this._circularData ? $gameSystem.mainFontSize() + this._circularData.FontSize : _Sprite_Gauge_labelFontSize.apply(this, arguments);
    };
    
    const _Sprite_Gauge_valueFontSize = Sprite_Gauge.prototype.valueFontSize;
    Sprite_Gauge.prototype.valueFontSize = function() {
        return this._circularData ? $gameSystem.mainFontSize() + this._circularData.ValueFontSize : _Sprite_Gauge_valueFontSize.apply(this, arguments);
    };

    const _Sprite_Gauge_drawLabel = Sprite_Gauge.prototype.drawLabel;
    Sprite_Gauge.prototype.drawLabel = function() {
        if (this._circularData) {
            this.drawCircularLabel();
        } else {
            _Sprite_Gauge_drawLabel.apply(this, arguments);
        }
    };

    Sprite_Gauge.prototype.drawCircularLabel = function() {
        if (this._circularData.ShowLabel) {
            if (this._battler && this._battler.isActor()) {
                const label = this.label();
                const x = this.labelOutlineWidth() / 2;
                const y = this.labelY() - 15;
                const width = this.circularSprite[1] ? this._circularBitmap.width : this.circularBitmapWidth();
                const height = this.circularSprite[1] ? this._circularBitmap.height : this.circularBitmapHeight();
                this.bitmap.paintOpacity = this.labelOpacity();
                if (this.circularSprite[2]) {
                    this.circularSprite[2].x = Math.floor(width / 2);
                    this.circularSprite[2].y = Math.floor(height / 2) - this.textHeight();
                } else {
                    this.setupLabelFont();
                    this.bitmap.drawText(label, x, y, width, height, "center");
                }
                this.bitmap.paintOpacity = 255;
            }   
        }
    };

    const _Sprite_Gauge_drawValue = Sprite_Gauge.prototype.drawValue;
    Sprite_Gauge.prototype.drawValue = function() {
        if (this._circularData) {
            this.drawCircularValue();
        } else {
            _Sprite_Gauge_drawValue.apply(this, arguments);
        }
    };

    Sprite_Gauge.prototype.drawCircularValue = function() {
        if (this.setMoveMode) {
            this.setMoveMode();
        }
        const currentValue = this.currentValue();
        const width = this.circularSprite[1] ? this._circularBitmap.width : this.circularBitmapWidth();
        const height = this.circularSprite[1] ? this._circularBitmap.height : this.circularBitmapHeight();
        this.setupValueFont();
        const y = this._circularData.ShowLabel ? 6 : 0;
        this.bitmap.drawText(currentValue, 0, y, width, height, "center");
    };
    
    const _Sprite_Gauge_drawGauge = Sprite_Gauge.prototype.drawGauge;
    Sprite_Gauge.prototype.drawGauge = function() {
        if (this._circularData) {
            this.drawCircularGauge();
        } else {
            _Sprite_Gauge_drawGauge.apply(this, arguments);
        }
    };

    Sprite_Gauge.prototype.drawCircularGauge = function() {
        if (this.circularSprite[1]) {
            this.arcGaugeImgRect(false);
        } else {
            const gaugeX = this.radius() + this.gaugeHeight();
            const gaugeY = this.radius() + this.gaugeHeight();
            const gaugeHeight = this.gaugeHeight() - 2;
            this.drawCircularGaugeBackEx(gaugeX, gaugeY, gaugeHeight);
            if (Imported.NUUN_DamageGauge && this.gaugeDamageVisualization()) {
                this.drawCircularGaugeDamageEx(gaugeX, gaugeY, gaugeHeight);
            }
            this.drawCircularGaugeMainEx(gaugeX, gaugeY, gaugeHeight);
        }
    };

    Sprite_Gauge.prototype.drawCircularGaugeBackEx = function(x, y, height) {
        const color0 = this._gaugeData && this._gaugeData.isData() ? this._gaugeData.gaugeBackColor() : (LL_parameters.gaugeOutlineColor ? this.gaugeOutlineColor() : this.gaugeBackColor());
        const color3 = this._gaugeData && this._gaugeData.isData() ? this._gaugeData.gaugeStrokeColor() : null;
        if (!!color3) {
            this.arcGaugeBackRect(x, y, this.gaugeHeight(), color3);
            this.arcGaugeBackRect(x, y, height, color0);
        } else {
            this.arcGaugeBackRect(x, y, this.gaugeHeight(), color0);
        }
    };

    Sprite_Gauge.prototype.drawCircularGaugeDamageEx = function(x, y, height) {
        dcolor1 = this.gaugeDamageColor1();
        this._drawGaugeMode = 1;
        this.arcGaugeRect(x, y, height, dcolor1, false);
        this._drawGaugeMode = 0;
    };

    Sprite_Gauge.prototype.drawCircularGaugeMainEx = function(x, y, height) {
        const color1 = this._gaugeData && this._gaugeData.isData() ? this._gaugeData.gaugeColor1() : this.gaugeColor1();
        this.arcGaugeRect(x, y, height, color1, false);
    };

    Sprite_Gauge.prototype.arcGaugeRect = function(x, y, width, color, option) {
        const context = this.bitmap.context;
        context.save();
        context.beginPath();
        context.lineWidth = width;
        context.strokeStyle = color;
        const rate = (this._sweepTPAngle - this._startTPAngle) * this.gaugeRate() + this._startTPAngle;
        context.arc(x, y, this.radius(), this._startTPAngle, rate, option);
        context.stroke();
        this.bitmap._baseTexture.update();
    };
      
    Sprite_Gauge.prototype.arcGaugeBackRect = function(x, y, width, color) {
        const context = this.bitmap.context;
        context.save();
        context.beginPath();
        context.lineWidth = width;
        context.strokeStyle = color;
        context.arc(x, y, this.radius(), this._startAngle, this._sweepAngle, false);
        context.stroke();
        this.bitmap._baseTexture.update();
    };

    Sprite_Gauge.prototype.arcGaugeImgRect = function(option) {
        if (this._drawGaugeMode === 0 && Imported.NUUN_DamageGauge && this.gaugeDamageVisualization()) {
            this.arcDamageGaugeImgRect(option);
        }
        const bitmap = this.getCircularGaugeBitmap();
        const bitmap2 = this.getCircularGaugeImg();
        bitmap.clear();
        const x = bitmap2.width / 2;
        const y = bitmap2.height / 2;
        const context = bitmap.context;
        context.save();
        context.beginPath();
        context.lineWidth = bitmap2.width / 2;
        context.strokeStyle = this.getCircularGaugeImgPattern();
        const rate = (this._sweepTPAngle - this._startTPAngle) * this.gaugeRate() + this._startTPAngle;
        context.arc(x, y, this.radius(), this._startTPAngle, rate, option);
        context.stroke();
        bitmap._baseTexture.update();
    };

    Sprite_Gauge.prototype.arcDamageGaugeImgRect = function(option) {
        this._drawGaugeMode = 1;
        this.arcGaugeImgRect(option);
        this._drawGaugeMode = 0;
    };

    Sprite_Gauge.prototype.getCircularGaugeBitmap = function() {
        if (this._drawGaugeMode === 0) {
            return this.circularSprite[1].bitmap;
        } else if (this._drawGaugeMode === 1 && this.circularSprite[5]) {
            return this.circularSprite[5].bitmap;
        }
        return this.circularSprite[1].bitmap;
    };

    Sprite_Gauge.prototype.getCircularGaugeImgPattern = function() {
        if (this._drawGaugeMode === 0) {
            return this._pattern[1];
        } else if (this._omDamage === "damage") {
            return this._pattern[5];
        } else if (this._omDamage === "recovery") {
            return this._pattern[4];
        }
        return this._pattern[1];
    };

    Sprite_Gauge.prototype.getCircularGaugeImg = function() {
        if (this._drawGaugeMode === 0) {
            return this._circularBitmap;
        } else if (this._circularDagameBitmap && this._omDamage === "damage") {
            return this._circularDagameBitmap;
        } else if (this._circularRecoveryBitmap && this._omDamage === "recovery") {
            return this._circularRecoveryBitmap;
        }
        return this._circularBitmap;
    };

    Sprite_Gauge.prototype.setCircularData = function() {
        this.className = _circularParams.getData();//外部プラグインのフィルタリングが行えないのでここで追加。
        this._statusType = _circularParams.getType();
        this._circularData = _circularParams.getExParams();
        _circularParams.clear();
    };

    function Sprite_CircularGauge() {
        this.initialize(...arguments);
    }
      
    Sprite_CircularGauge.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_CircularGauge.prototype.constructor = Sprite_CircularGauge;
      
    Sprite_CircularGauge.prototype.initialize = function() {
        this.setCircularData();
        Sprite_Gauge.prototype.initialize.call(this);
    };

    Sprite_CircularGauge.prototype.initMembers = function() {
        Sprite_Gauge.prototype.initMembers.call(this);
    };

    Sprite_CircularGauge.prototype.createBitmap = function() {
        this.createCircularBaseSprite();
        const sprite = new Sprite();
        this.addChild(sprite);
        this.textSprite = sprite;
        const width = this.circularBitmapWidth();
        const height = this.circularBitmapHeight();
        this.textSprite.bitmap = new Bitmap(width, height);
        this.bitmap = this.textSprite.bitmap;
    };

    Sprite_CircularGauge.prototype.drawLabel = function() {
        if (this._circularData.ShowLabel) {
            this.drawCircularLabel();
        }
    };

    Sprite_CircularGauge.prototype.drawValue = function() {
        if (Imported.NUUN_GaugeValueAnimation) {
            this._moveMode = true;
        }
        const currentValue = this.currentValue();
        const width = this.circularSprite[1] ? this._circularBitmap.width : this.circularBitmapWidth();
        const height = this.circularSprite[1] ? this._circularBitmap.height : this.circularBitmapHeight();
        this.setupValueFont();
        const y = this._circularData.ShowLabel ? 6 : 0;
        this.bitmap.drawText(currentValue, 0, y, width, height, "center");
    };
      
    Sprite_CircularGauge.prototype.drawGauge = function() {
        if (this.circularSprite[1]) {
            this.arcGaugeImgRect(false);
        } else {
            const gaugeX = this.radius() + this.gaugeHeight();
            const gaugeY = this.radius() + this.gaugeHeight();
            const gaugeHeight = this.gaugeHeight() - 2;
            this.drawCircularGaugeBackEx(gaugeX, gaugeY, gaugeHeight);
            if (Imported.NUUN_DamageGauge && this.gaugeDamageVisualization()) {
                this.drawCircularGaugeDamageEx(gaugeX, gaugeY, gaugeHeight);
            }
            this.drawCircularGaugeMainEx(gaugeX, gaugeY, gaugeHeight);
        }
    };

    window.Sprite_CircularGauge = Sprite_CircularGauge;

    const _Window_StatusBase_placeGauge = Window_StatusBase.prototype.placeGauge;
    Window_StatusBase.prototype.placeGauge = function(actor, type, x, y) {
        if (this.nuun_drawCircularGauge(actor, type, x, y)) {
            return;
        }
        _Window_StatusBase_placeGauge.apply(this, arguments);
    };

    if (Imported.NUUN_BattleStyleEX) {
        const _Window_BattleStatus_placeGauge = Window_BattleStatus.prototype.placeGauge;
        Window_BattleStatus.prototype.placeGauge = function(actor, type, x, y) {
            if (this.nuun_drawCircularGauge(actor, type, x, y)) {
                return;
            }
            _Window_BattleStatus_placeGauge.apply(this, arguments);
        };
    };

    Window_StatusBase.prototype.nuun_drawCircularGauge = function(actor, type, x, y, fmt) {
        const find = this.getCircularGaugeData(type);
        if (!!find) {
            this.placeCircularGauge(find, actor, type, find.GaugeX + x, find.GaugeY + y, fmt);
            return true;
        }
        return false;
    };

    Window_StatusBase.prototype.placeCircularGauge = function(data, actor, type, x, y, fmt) {
        setTempType(NuunManager.isFilterClass(this), type, data);
        const key = fmt ? fmt.format(actor.actorId(), type) : "actor%1-gauge-%2".format(actor.actorId(), type);
        const sprite = this.createInnerSprite(key, Sprite_CircularGauge);
        sprite.setup(actor, type);
        sprite.move(x, y);
        sprite.show();
        _circularParams.clear();
    };

    Window_StatusBase.prototype.setCircularTempData = function(type, data) {
        _circularParams.setGaugeData(NuunManager.isFilterClass(this), type, data);
    };

    Window_StatusBase.prototype.clearCircularTempData = function() {
        _circularParams.clear();
    };

    Window_StatusBase.prototype.getCircularGaugeData = function(type) {
        return params.CircularGaugeSetting.find(data => {
            return data.Type === type && filteringDataClass(data, NuunManager.isFilterClass(this)); 
        });
    };

    if (params.GaugeUnder) {
        Window_BattleStatus.prototype.basicGaugesY = function(rect) {
            const bottom = rect.y + rect.height - this.extraHeight();
            const numGauges = 2;
            return bottom - this.gaugeLineHeight() * numGauges;
        };
    }

    function setTempType(_class, type, data) {
        _circularParams.setGaugeData(_class, type, data);
    };

    function filteringDataClass(data, className) {
        if (data.FilteringClass && data.FilteringClass.length > 0) {
            return data.FilteringClass.some(filterClass => filterClass === className);
        } else {
            return true;
        }
    };

    function _preloadGaugeImg() {
        params.CircularGaugeSetting.forEach(data => {
            _circularBitmap[0] = ImageManager.nuun_LoadPictures(data.GaugeBackImg);
            _circularBitmap[1] = ImageManager.nuun_LoadPictures(data.GaugeImg);
            _circularBitmap[2] = ImageManager.nuun_LoadPictures(data.LabelImg);
            if (Imported.NUUN_DamageGauge && data.GaugeImg) {
                const dagameGauge = data.GaugeImg +"_damage";
                const recoveryGauge = data.GaugeImg +"_recovery";
                _circularBitmap[3] = ImageManager.nuun_LoadPictures(dagameGauge);
                _circularBitmap[4] = ImageManager.nuun_LoadPictures(recoveryGauge);
            }
        });
    };

})();
