/*:-----------------------------------------------------------------------------------
 * NUUN_GaugeImage.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc ゲージ画像化
 * @author NUUN
 * @version 1.5.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * ゲージを画像化します。
 * 
 * 特定条件
 * HPゲージ
 * HPが瀕死の時に設定した画像に切り替わります。
 * TPBゲージ
 * TPBがキャストタイム中なら設定した画像に切り替わります。(別途キャストタイムを可視化できるプラグインが必要です)
 * 
 * ダメージ時の画像適用は別途ゲージ表示拡張プラグインが必要になります。
 * 
 * 'result_exp'　リザルト獲得経験値ゲージ
 * 'exp' ステータス画面経験値ゲージ
 * 'limit' パーティリミットゲージ画像
 * 
 * 背後画像：一番後ろに表示される画像です。
 * 前面画像：一番手前に表示される装飾用の画像です。
 * メイン画像：ゲージの画像です。
 * 
 * ゲージの画像化を戦闘中のみ反映させる場合はフィルタリングクラス設定で'Window_BattleStatus'、'Window_BattleActor'を設定してください。
 * 
 * 仕様
 * コアスクリプトの仕様でゲージを回転する場合は、座標の調整を行う必要があります。
 * このプラグインは共通処理プラグインVer.1.4.4以降が必要になります。
 *  
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/5/24 Ver.1.5.1
 * ラベルの座標が適用されない問題を修正。
 * 2022/5/24 Ver.1.5.0
 * 処理内容、プラグインパラメータの大幅な見直し。
 * ゲージの角度を指定できる機能を追加。
 * 2022/1/3 Ver.1.4.3
 * ゲージ表示拡張プラグインのダメージ量可視化に対応。
 * 前面ゲージの表示がずれる問題を修正。
 * 2021/12/20 Ver.1.4.2
 * パーティゲージの画像化に対応。
 * 前面ゲージ画像を可変表示させない範囲を設定できる機能を追加。
 * 2021/12/19 Ver.1.4.1
 * フィルタリングクラスが正常に適用されていなかった問題を修正。
 * 2021/12/19 Ver.1.4.0
 * ゲージプラグイン対応による処理追加。
 * ゲージの画像設定を変更。
 * 2021/10/4 Ver.1.3.0
 * 最大時の画像を設定できる機能を追加。
 * 溺死、キャストタイム中のゲージの画像が、特定条件の画像設定をしていなかった場合反映しなかった問題を修正。
 * 2021/9/24 Ver.1.2.0
 * ラベルを画像化する機能を追加。
 * 画像を１枚にまとめなくとも表示できるように修正。
 * 画像が重複して表示されてしまう問題を修正。
 * 2021/9/22 Ver.1.1.1
 * メインゲージが正常に表示されない問題を修正。
 * 2021/9/20 Ver.1.1.0
 * フィルタリング機能を追加。
 * ゲージの前面に画像を表示出来る機能を追加。
 * 2021/9/20 Ver.1.0.1
 * 当プラグインに対応していないゲージで、ゲージが表示されない問題を修正。
 * 2021/9/20 Ver.1.0.0
 * 初版
 * 
 * @param GaugeImgList
 * @text ゲージ画像設定
 * @desc ゲージ画像設定
 * @type struct<GaugeImg>[]
 * @default []
 * 
 * 
 */
/*~struct~GaugeImg:
 * 
 * @param Type
 * @text 表示対象
 * @desc 表示対象
 * @type combo
 * @option 'hp'
 * @option 'mp'
 * @option 'tp'
 * @option 'time'
 * @option 'result_exp'
 * @option 'exp'
 * @option 'limit'
 * @default 
 * 
 * @param GaugeImgX
 * @text 画像座標X
 * @desc 画像のX座標を一括で移動します。
 * @type number
 * @default 0
 * 
 * @param GaugeImgY
 * @text 画像座標Y
 * @desc 画像のY座標を一括で移動します。
 * @type number
 * @default 0
 * 
 * @param GaugeImgWidth
 * @text ベース横幅
 * @desc 表示範囲の横幅を指定します。
 * @type number
 * @default 160
 * 
 * @param GaugeImgHeight
 * @text ベース高さ
 * @desc 高さ範囲の高さを指定します。
 * @type number
 * @default 160
 * 
 * @param GaugeImgScale
 * @text 画像拡大率
 * @desc 画像を拡大率を指定。(百分率)
 * @type number
 * @default 100
 * 
 * @param GaugeImgAngle
 * @text 画像回転角度
 * @desc 画像を回転角度を指定。正の数で時計回りに回転します。
 * @type number
 * @min -999
 * @default 0
 * 
 * @param GaugeInclined
 * @desc 画像を傾斜率を指定。正の数で左に傾きます。
 * @text 傾斜率
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeImgVariable
 * @text ゲージ幅引き伸ばし
 * @desc ゲージを横幅に合わせ拡大縮小します。
 * @type boolean
 * @default false
 * 
 * @param BackGauge
 * @text 背面ゲージ画像設定
 * @default ------------------------------
 * 
 * @param GaugeBaukImg
 * @text 背面ゲージ画像設定
 * @desc 背面ゲージ画像設定
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent BackGauge
 * 
 * @param MainGauge
 * @text ゲージ画像設定
 * @default ------------------------------
 * 
 * @param Default
 * @text デフォルト設定
 * @default ------------------------------
 * @parent MainGauge
 * 
 * @param MainGaugeImg
 * @text ゲージ画像設定
 * @desc ゲージ画像設定
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent Default
 * 
 * @param Max
 * @text ゲージMAX時画像設定
 * @default ------------------------------
 * @parent MainGauge
 * 
 * @param GaugeMaxImg
 * @text ゲージMAX画像設定
 * @desc ゲージMAX画像設定
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent Max
 * 
 * @param Cond
 * @text 特定条件下時画像設定
 * @default ------------------------------
 * @parent MainGauge
 * 
 * @param GaugeCondImg
 * @text 特定条件下画像設定
 * @desc 特定条件下画像設定。
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent Cond
 * 
 * @param FrontGauge
 * @text 前面ゲージ画像設定
 * @default ------------------------------
 * 
 * @param GaugeFrontImg
 * @text 前面ゲージ画像設定
 * @desc 前面ゲージ画像設定
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent FrontGauge
 * 
 * @param Damage
 * @text ダメージ量可視化画像設定
 * @default ------------------------------
 * 
 * @param GaugeDamageImg
 * @text ダメージ時画像設定
 * @desc ダメージ時画像設定。(要ゲージ表示拡張プラグイン)
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent Damage
 * 
 * @param VariableSetting
 * @text 可変表示適用時設定
 * @default ------------------------------
 * 
 * @param GaugeLeftWidth
 * @desc 前面ゲージ画像の左側の可変させない横幅。（可変モードのみ）
 * @text 前面ゲージ画像左側非可変横幅
 * @type number
 * @default 0
 * 
 * @param GaugeRightWidth
 * @desc 前面ゲージ画像の右側の可変させない横幅。（可変モードのみ）
 * @text 前面ゲージ画像右側非可変横幅
 * @type number
 * @default 0
 * 
 * @param GaugeBackCorrectionWidth
 * @desc 背面画像の補正幅（表示幅からの差）
 * @text 背面画像補正幅
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeCorrectionWidth
 * @desc ゲージ画像の補正幅（表示幅からの差）
 * @text ゲージ背後画像補正幅
 * @type number
 * @default 0
 * @min -999
 * 
 * @param LabelImg
 * @text ラベル画像設定
 * @default ------------------------------
 * 
 * @param LabelGaugeImg
 * @desc ラベル画像ファイル名を指定します。
 * @text ラベル画像
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent LabelImg
 * 
 * @param GaugeLabelAngle
 * @text ラベル回転角度
 * @desc ラベルの回転角度を指定。正の数で時計回りに回転します。
 * @type number
 * @min -999
 * @default 0
 * @parent LabelImg
 * 
 * @param ValueSetting
 * @text 数値画像設定
 * @default ------------------------------
 * 
 * @param GaugeValueAngle
 * @text 数値回転角度
 * @desc 数値の回転角度を指定。正の数で時計回りに回転します。
 * @type number
 * @min -999
 * @default 0
 * @parent ValueSetting
 * 
 * @param FilteringSetting
 * @text 適用ウィンドウ設定
 * @default ------------------------------
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
 * @option 'Sprite_EnemyTPGauge'
 * @option 'Sprite_EnemyHPGauge'
 * @option 'Sprite_EnemyMPGauge'
 * @option 'Sprite_EnemyTPBGauge'
 * @option 'Window_EnemyBook'
 * @option 'Sprite_ExtraGauge'
 * @default
 * 
 */
/*~struct~GaugeSetting:
 * 
 * @param Gaugeimage
 * @desc 画像を指定します。
 * @text 画像指定
 * @type file
 * @dir img/
 * @default 
 * 
 * @param GaugeX
 * @desc ゲージのX座標を指定します。
 * @text ゲージ表示オフセット位置X
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeY
 * @desc ゲージのY座標を指定します。
 * @text ゲージ表示オフセット位置Y
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeSX
 * @desc ゲージ画像の描画するX起点座標を指定します。
 * @text ゲージ画像起点位置X
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeSY
 * @desc ゲージ画像の描画するY起点座標を指定します。
 * @text ゲージ画像起点位置Y
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeSW
 * @desc ゲージ画像の描画する横幅を指定します。
 * @text ゲージ画像横幅
 * @type number
 * @default 0
 * @min 0
 * 
 * @param GaugeSH
 * @desc ゲージ画像の描画する高さを指定します。
 * @text ゲージ画像高さ
 * @type number
 * @default 0
 * @min 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_GaugeImage = true;

(() => {
const parameters = PluginManager.parameters('NUUN_GaugeImage');
const GaugeImgList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['GaugeImgList'])) : null) || [];


//旧バージョン用
Window_StatusBase.prototype.placeGaugeImg = function(battler, type, x, y) {

};


const _Sprite_Gauge_initMembers = Sprite_Gauge.prototype.initMembers;
Sprite_Gauge.prototype.initMembers = function() {
    _Sprite_Gauge_initMembers.call(this);
    this._gaugeImgData = null;
    this.setDefaultGaugeImg();
};

const _Sprite_Gauge_setup = Sprite_Gauge.prototype.setup;
Sprite_Gauge.prototype.setup = function(battler, statusType) {
    _Sprite_Gauge_setup.call(this, battler, statusType);
    this._gaugeImgData = this.getFindGauge();
    if (!this._gaugeImgSprite && this._gaugeImgData) {
        this.createGaugeImg();
        this.createTextBitmap();
    }
};

Sprite_Gauge.prototype.filteringGaugeImgClass = function(data) {
    const className = this.className ? this.className : String(this.constructor.name);
    if (data.FilteringClass && data.FilteringClass.length > 0) {
        return data.FilteringClass.some(filterClass => filterClass === className);
    } else {
        return true;
    }
};

Sprite_Gauge.prototype.getFindGauge = function() {
    return GaugeImgList.find(data => data.Type === this._statusType && this.filteringGaugeImgClass(data));
};

const _Sprite_Gauge_bitmapWidth = Sprite_Gauge.prototype.bitmapWidth;
Sprite_Gauge.prototype.bitmapWidth = function() {
    if (this._gaugeImgData) {
        return this._gaugeImgData.GaugeImgWidth;
    } else {
        return _Sprite_Gauge_bitmapWidth.call(this);
    }
};

const _Sprite_Gauge_bitmapHeight = Sprite_Gauge.prototype.bitmapHeight;
Sprite_Gauge.prototype.bitmapHeight = function() {
    if (this._gaugeImgData) {
        return this._gaugeImgData.GaugeImgHeight;
    } else {
        return _Sprite_Gauge_bitmapHeight.call(this);
    }
};

Sprite_Gauge.prototype.createGaugeSpriteBitmap = function() {
    const inclined = this._gaugeImgData.GaugeInclined !== 0 ? Math.abs((this.bitmapHeight() * this.gaugeInclinedRate()) * 2) : 0;
    this._gaugeImgSprite.bitmap = new Bitmap(this.bitmapWidth() + inclined, this.bitmapHeight());
};

Sprite_Gauge.prototype.gaugeInclinedRate  = function() {
    return this._gaugeImgData.GaugeInclined / 100;
};

Sprite_Gauge.prototype.gaugeScaleRate  = function() {
    return this._gaugeImgData.GaugeImgScale / 100;
};

Sprite_Gauge.prototype.loadMainBitmap  = function(data) {
    const bitmapImg = data ? data.Gaugeimage : null;
    if (bitmapImg) {
        return ImageManager.nuun_LoadPictures(bitmapImg);
    }
    return null;
};

Sprite_Gauge.prototype.createTextBitmap = function() {
    const sprite = new Sprite();
    this.addChild(sprite);
    this.textSprite = sprite;
    sprite.anchor.x = this.anchor.x;
    sprite.anchor.y = this.anchor.y;
    const width = this.bitmapWidth();
    const height = this.bitmapHeight(); 
    this.textSprite.bitmap = new Bitmap(width, height);
};

const _Sprite_Gauge_updateBitmap = Sprite_Gauge.prototype.updateBitmap;
Sprite_Gauge.prototype.updateBitmap = function() {
    _Sprite_Gauge_updateBitmap.call(this);
    if (this._gaugeImgData) {
        this.updateGaugeImg();
    }
};

Sprite_Gauge.prototype.createGaugeImg = function() {
    this.createGaugeBaukImg();
    this.createGaugeMainImg();
    this.createGaugeFrontImg();
};

Sprite_Gauge.prototype.createGaugeBaukImg = function() {
    const bitmapImg = this._gaugeImgData.GaugeBaukImg ? this._gaugeImgData.GaugeBaukImg.Gaugeimage : null;
    const bitmap = ImageManager.nuun_LoadPictures(bitmapImg);
    const sprite = new Sprite();
    sprite.anchor.x = this.anchor.x;
    sprite.anchor.y = this.anchor.y;
    this.addChild(sprite);
    if (bitmapImg && !bitmap.isReady()) {
        bitmap.addLoadListener(this.setupBackBitmap.bind(this, sprite, bitmap));
    } else if (bitmapImg) {
        this.setupBackBitmap(sprite, bitmap);
    }
};

Sprite_Gauge.prototype.setupBackBitmap = function(sprite, bitmap) {
    const width = this._gaugeImgData.GaugeBaukImg.GaugeSW || bitmap.width;
    const height = this._gaugeImgData.GaugeBaukImg.GaugeSH || bitmap.height;
    const inclined = this._gaugeImgData.GaugeInclined !== 0 ? Math.abs((this.bitmapHeight() * this.gaugeInclinedRate()) * 2) : 0;
    sprite.bitmap = new Bitmap(this.bitmapWidth() + inclined, this.bitmapHeight());
    const context = sprite.bitmap.context;
    const dx = this._gaugeImgData.GaugeBaukImg.GaugeX + this._gaugeImgData.GaugeImgX;
    const dy = this._gaugeImgData.GaugeBaukImg.GaugeY + this._gaugeImgData.GaugeImgY;
    const sx = this._gaugeImgData.GaugeBaukImg.GaugeSX;
    const sy = this._gaugeImgData.GaugeBaukImg.GaugeSY;
    const scale = this.gaugeScaleRate();
    context.setTransform(scale, 0, this.gaugeInclinedRate(), scale, 0, 0);
    context.rotate(this._gaugeImgData.GaugeImgAngle * Math.PI / 180);
    const correctionWidth = this._gaugeImgData.GaugeImgVariable ? this._gaugeImgData.GaugeBackCorrectionWidth : 0;
    const inclinedX = this._gaugeImgData.GaugeInclined < 0 ? Math.abs((height * this.gaugeInclinedRate()) * (this.anchor.x > 0 ? 4 : 2)) : 0;
    sprite.bitmap.blt(bitmap, sx, sy, width, height, dx + inclinedX, dy, width * this.getVariableScale(width) + correctionWidth);
};

Sprite_Gauge.prototype.getVariableScale = function(width) {
    return this._gaugeImgData.GaugeImgVariable ? this.bitmapWidth() / (width * this.gaugeScaleRate()): 1.0;
};

Sprite_Gauge.prototype.createGaugeFrontImg = function() {
    const bitmapImg = this._gaugeImgData.GaugeFrontImg ? this._gaugeImgData.GaugeFrontImg.Gaugeimage : null;
    const bitmap = ImageManager.nuun_LoadPictures(bitmapImg);
    const sprite = new Sprite();
    sprite.anchor.x = this.anchor.x;
    sprite.anchor.y = this.anchor.y;
    this.addChild(sprite);
    if (bitmapImg && !bitmap.isReady()) {
        bitmap.addLoadListener(this.setupFrontBitmap.bind(this, sprite, bitmap));
    } else if (bitmapImg) {
        this.setupFrontBitmap(sprite, bitmap);
    }
};

Sprite_Gauge.prototype.setupFrontBitmap = function(sprite, bitmap) {
    const width = this._gaugeImgData.GaugeFrontImg.GaugeSW || bitmap.width;
    const height = this._gaugeImgData.GaugeFrontImg.GaugeSH || bitmap.height;
    const inclined = this._gaugeImgData.GaugeInclined !== 0 ? Math.abs((this.bitmapHeight() * this.gaugeInclinedRate()) * 2) : 0;
    sprite.bitmap = new Bitmap(this.bitmapWidth() + inclined, this.bitmapHeight());
    const context = sprite.bitmap.context;
    const inclinedX = this._gaugeImgData.GaugeInclined < 0 ? Math.abs((height * this.gaugeInclinedRate()) * (this.anchor.x > 0 ? 4 : 2)) : 0;
    const dx = this._gaugeImgData.GaugeFrontImg.GaugeX + this._gaugeImgData.GaugeImgX + inclinedX;
    const dy = this._gaugeImgData.GaugeFrontImg.GaugeY + this._gaugeImgData.GaugeImgY;
    const sx = this._gaugeImgData.GaugeFrontImg.GaugeSX;
    const sy = this._gaugeImgData.GaugeFrontImg.GaugeSY;
    const scale = this.gaugeScaleRate();
    context.setTransform(scale, 0, this.gaugeInclinedRate(), scale, 0, 0);
    context.rotate(this._gaugeImgData.GaugeImgAngle * Math.PI / 180);
    if (this._gaugeImgData.GaugeImgVariable) {
        const leftWidth = this._gaugeImgData.GaugeLeftWidth;
        const rightWidth = this._gaugeImgData.GaugeLeftWidth;
        const variableWidth = width * this.getVariableScale(width);
        const width2 = width - (leftWidth + rightWidth);
        sprite.bitmap.blt(bitmap, sx, sy, leftWidth, height, dx, dy, leftWidth);
        sprite.bitmap.blt(bitmap, width - rightWidth, sy, this._gaugeImgData.GaugeLeftWidth, height, dx + variableWidth - rightWidth, dy, rightWidth);
        sprite.bitmap.blt(bitmap, sx + leftWidth, sy, width2, height, dx + leftWidth, dy, variableWidth - (leftWidth + rightWidth));
    } else {
        sprite.bitmap.blt(bitmap, sx, sy, width, height, dx, dy, width * this.getVariableScale(width));
    }
};

Sprite_Gauge.prototype.createGaugeMainImg = function() {
    this._GaugeImgBitmap = this.loadMainBitmap(this._gaugeImgData.MainGaugeImg);
    this._GaugeImgCondBitmap = this.loadMainBitmap(this._gaugeImgData.GaugeCondImg);
    this._GaugeImgMaxBitmap = this.loadMainBitmap(this._gaugeImgData.GaugeMaxImg);
    this._GaugeImgDamageBitmap = this.loadMainBitmap(this._gaugeImgData.GaugeDamageImg);
    if (!this._GaugeImgBitmap) {
        this._GaugeImgBitmap = ImageManager.nuun_LoadPictures(null);
    }
    this.updateGaugeImg();
    const sprite = new Sprite();
    this.addChild(sprite);
    sprite.anchor.x = this.anchor.x;
    sprite.anchor.y = this.anchor.y;
    this._gaugeImgSprite = sprite;
    this.createGaugeSpriteBitmap();
    const scale = this.gaugeScaleRate();
    const context = this._gaugeImgSprite.bitmap.context;
    context.setTransform(scale, 0, this.gaugeInclinedRate(), scale, 0, 0);
    context.rotate(this._gaugeImgData.GaugeImgAngle * Math.PI / 180);
};

const _Sprite_Gauge_drawGauge = Sprite_Gauge.prototype.drawGauge;
Sprite_Gauge.prototype.drawGauge = function() {
    if (this._gaugeImgData) {
        this.drawGaugeImgRect();
    } else {
        _Sprite_Gauge_drawGauge.call(this);
    }
};

Sprite_Gauge.prototype.drawGaugeImgRect = function() {
    const bitmap = this._gaugeImgSprite.bitmap;
    const context = bitmap.context;
    const inclined = this._gaugeImgData.GaugeInclined !== 0 ? Math.abs((bitmap.height * this.gaugeInclinedRate()) * 2) : 0;
    context.clearRect(-inclined, 0, bitmap.width + inclined * 2, bitmap.height);
    if (Imported.NUUN_GaugeValueEX && this.gaugeDamageVisualization() && this._gaugeImgData.GaugeDamageImg.Gaugeimage) {
        this.drawGaugeDamageImgRect(bitmap);
    }
    const correctionWidth = this._gaugeImgData.GaugeImgVariable ? this._gaugeImgData.GaugeCorrectionWidth : 0;
    const rate = this.gaugeRate();
    const data = this.getMainGaugeImg();
    const width = data.GaugeSW || bitmap.width;
    const height = data.GaugeSH || bitmap.height;
    const dx = data.GaugeX + this._gaugeImgData.GaugeImgX;
    const dy = data.GaugeY + this._gaugeImgData.GaugeImgY;
    const sx = data.GaugeSX;
    const sy = data.GaugeSY;
    const inclinedX = this._gaugeImgData.GaugeInclined < 0 ? Math.abs((height * this.gaugeInclinedRate()) * (this.anchor.x > 0 ? 4 : 2)) : 0;
    bitmap.blt(this.setImgBitmap, sx, sy, width * rate, height, dx + inclinedX, dy, Math.floor((width * this.getVariableScale(width) + correctionWidth) * rate));  
};

Sprite_Gauge.prototype.drawGaugeDamageImgRect = function(bitmap) {
    const correctionWidth = this._gaugeImgData.GaugeImgVariable ? this._gaugeImgData.GaugeCorrectionWidth : 0;
    this._drawGaugeMode = 1;//
    const drate = this.gaugeRate();
    const width = this._gaugeImgData.GaugeDamageImg.GaugeSW || bitmap.width;
    const height = this._gaugeImgData.GaugeDamageImg.GaugeSH || bitmap.height;
    const dx = this._gaugeImgData.GaugeDamageImg.GaugeX + this._gaugeImgData.GaugeImgX;
    const dy = this._gaugeImgData.GaugeDamageImg.GaugeY + this._gaugeImgData.GaugeImgY;
    const sx = this._gaugeImgData.GaugeDamageImg.GaugeSX;
    const sy = this._gaugeImgData.GaugeDamageImg.GaugeSY;
    const inclinedX = this._gaugeImgData.GaugeInclined < 0 ? Math.abs((height * this.gaugeInclinedRate()) * (this.anchor.x > 0 ? 4 : 2)) : 0;
    bitmap.blt(this._GaugeImgDamageBitmap, sx, sy, width * drate, height, dx + inclinedX, dy, Math.floor((width * this.getVariableScale(width) + correctionWidth) * drate));
    this._drawGaugeMode = 0;//
};

const _Sprite_Gauge_drawLabel = Sprite_Gauge.prototype.drawLabel;
Sprite_Gauge.prototype.drawLabel = function() {
    const oldBitmap = this.bitmap;
    this.bitmap = this.textSprite ? this.textSprite.bitmap : this.bitmap;
    const context = this.bitmap.context;
    if (this._gaugeImgData) {
        context.beginPath();
        context.save();
        context.rotate(this._gaugeImgData.GaugeLabelAngle * Math.PI / 180);
    }
    if (this._gaugeImgData && this._gaugeImgData.LabelGaugeImg && this._gaugeImgData.LabelGaugeImg.Gaugeimage) {
        const bitmapImg = this._gaugeImgData.LabelGaugeImg.Gaugeimage;
        const bitmap = ImageManager.nuun_LoadPictures(bitmapImg);
        if (bitmapImg && !bitmap.isReady()) {
            bitmap.addLoadListener(this.setupDrawLabel.bind(this, bitmap));
        } else if (bitmapImg) {
            this.setupDrawLabel(bitmap);
        }
    } else {
        if (this._gaugeImgData) {
            context.translate(this._gaugeImgData.LabelGaugeImg.GaugeX + this._gaugeImgData.GaugeImgX, this._gaugeImgData.LabelGaugeImg.GaugeY + this._gaugeImgData.GaugeImgY);
        }
        _Sprite_Gauge_drawLabel.call(this);
    }
    if (this._gaugeImgData) {
        context.restore();
        this.bitmap = oldBitmap;
    }
};

Sprite_Gauge.prototype.setupDrawLabel = function(bitmap) {
    const width = this._gaugeImgData.LabelGaugeImg.GaugeSW || bitmap.width;
    const height = this._gaugeImgData.LabelGaugeImg.GaugeSH || bitmap.height;
    const dx = this._gaugeImgData.LabelGaugeImg.GaugeX + this._gaugeImgData.GaugeImgX;
    const dy = this._gaugeImgData.LabelGaugeImg.GaugeY + this._gaugeImgData.GaugeImgY;
    const sx = this._gaugeImgData.LabelGaugeImg.GaugeSX;
    const sy = this._gaugeImgData.LabelGaugeImg.GaugeSY;
    this.bitmap.paintOpacity = this.labelOpacity();
    this.bitmap.blt(bitmap, sx, sy, width, height, dx, dy);
    this.bitmap.paintOpacity = 255;
};

const _Sprite_Gauge_drawValue = Sprite_Gauge.prototype.drawValue;
Sprite_Gauge.prototype.drawValue = function() {
    const oldBitmap = this.bitmap;
    this.bitmap = this.textSprite ? this.textSprite.bitmap : this.bitmap;
    const context = this.bitmap.context;
    if (this._gaugeImgData) {
        context.beginPath();
        context.save();
        context.rotate(this._gaugeImgData.GaugeValueAngle * Math.PI / 180);
    }
    _Sprite_Gauge_drawValue.call(this);
    if (this._gaugeImgData) {
        context.restore();
        this.bitmap = oldBitmap;
    }
};

const _Sprite_Gauge_redraw = Sprite_Gauge.prototype.redraw;
Sprite_Gauge.prototype.redraw = function() {
    if (this.textSprite) {
        this.textSprite.bitmap.clear();
    }
    _Sprite_Gauge_redraw.call(this);
};

Sprite_Gauge.prototype.updateGaugeImg = function() {
    if (this._statusType == 'hp' && this._battler.isDying()) {
        this._gaugeImgData.GaugeCondImg && this._gaugeImgData.GaugeCondImg.Gaugeimage ? this.setCondGaugeImg() : this.setDefaultGaugeImg();
    } else if ((this._statusType == 'time'  || this._statusType == 'cast') && this._battler.isTpbCast()) {
        this._gaugeImgData.GaugeCondImg && this._gaugeImgData.GaugeCondImg.Gaugeimage ? this.setCondGaugeImg() : this.setDefaultGaugeImg();
    } else if (this.isMaxValue()) {
        this._gaugeImgData.GaugeMaxImg && this._gaugeImgData.GaugeMaxImg.Gaugeimage ? this.setMaxGaugeImg() : this.setDefaultGaugeImg();
    } else {
        this.setDefaultGaugeImg();
    }
};

Sprite_Gauge.prototype.setDefaultGaugeImg  = function() {
    this._gaugeImgMode = 'default';
    this.setImgBitmap = this._GaugeImgBitmap;
};

Sprite_Gauge.prototype.setCondGaugeImg  = function() {
    this._gaugeImgMode = 'cond';
    this.setImgBitmap = this._GaugeImgCondBitmap;
};

Sprite_Gauge.prototype.setMaxGaugeImg  = function() {
    this._gaugeImgMode = 'max';
    this.setImgBitmap = this._GaugeImgMaxBitmap;
};

Sprite_Gauge.prototype.isMaxValue = function() {
    return this.currentValue() >= this.currentMaxValue();
};

Sprite_Gauge.prototype.getMainGaugeImg  = function() {
    if (this._gaugeImgMode === 'cond') {
        return this._gaugeImgData.GaugeCondImg;
    } else if (this._gaugeImgMode === 'max') {
        return this._gaugeImgData.GaugeMaxImg;
    } else {
        return this._gaugeImgData.MainGaugeImg;
    }
};


Game_Battler.prototype.isTpbCast = function() {
    return this._tpbState === "casting" && this.tpbRequiredCastTime() > 0 || this.isActing() || this._tpbState === "ready";
};

})();