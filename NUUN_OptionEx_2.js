/*:-----------------------------------------------------------------------------------
 * NUUN_OptionEx_2.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Optional extended volume gauge display
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_OptionEx
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_OptionEx
 * @version 1.0.2
 * 
 * @help
 * Displays a gauge on the volume of the sound settings in the options screen.
 * This plugin is an extension plugin for "NUUN_OptionEx".
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 9/1/2024 Ver.1.0.2
 * Implemented volume knob functionality.
 * Added functionality to set the volume to the location where you click on the volume gauge.
 * 8/31/2024 Ver.1.0.1
 * Fixed an issue where the gauge height was not being applied.
 * Fixed so that the gauge settings are not applied to anything other than the volume settings.
 * 8/25/2024 Ver.1.0.0
 * First edition.
 * 
 * @param SceneContinuationCommonEvent
 * @desc Specifies the ID of the common event that does not close the screen.
 * @text Screen continuation common event
 * @type common_event[]
 * @default 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc オプション拡張音量ゲージ表示
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_OptionEx
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_OptionEx
 * @version 1.0.2
 * 
 * @help
 * オプション画面のサウンド設定の音量にゲージを表示させます。
 * このプラグインはNUUN_OptionExの拡張プラグインです。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/9/1 Ver.1.0.2
 * 音量のつまみ機能を実装。
 * ボリュームゲージのクリックした場所により、クリック場所の音量に設定する機能を追加。
 * 2024/8/31 Ver.1.0.1
 * ゲージ高さが適用されていなかった問題を修正。
 * 音量設定以外にゲージ設定を適用させないように修正。
 * 2024/8/25 Ver.1.0.0
 * 初版
 * 
 */

var Imported = Imported || {};
Imported.NUUN_OptionEx_2 = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const parameters = PluginManager.parameters('NUUN_OptionEx_2');
    const _tempParams = new Nuun_TempParam();
    let _data = null;

    const _Window_Options_initialize = Window_Options.prototype.initialize;
    Window_Options.prototype.initialize = function(rect) {
        this._optionGauge = {};
        this._volumeFraction = 0;
        _Window_Options_initialize.call(this, rect);
    };

    const _Window_Options_refresh = Window_Options.prototype.refresh;
    Window_Options.prototype.refresh = function() {
        this.hideOptionGaugeSprites();
        _Window_Options_refresh.apply(this, arguments);
    };
    
    Window_Options.prototype.hideOptionGaugeSprites = function() {
        for (const sprite of Object.values(this._optionGauge)) {
            sprite.hide();
        }
    };

    const _Window_Options_drawItem = Window_Options.prototype.drawItem;
    Window_Options.prototype.drawItem = function(index) {
        const symbol = this.commandSymbol(index);
        _data = this.getExtData(symbol);
        _Window_Options_drawItem.apply(this, arguments);
        if (this.isVolumeSymbol(symbol)) {
            this.volumeGauge(index, symbol);
        }
    };

    const _Window_Options_volumeStatusText = Window_Options.prototype.volumeStatusText;
    Window_Options.prototype.volumeStatusText = function(value) {
        if (!_data) return _Window_Options_volumeStatusText.apply(this, arguments);
        return _data.VolumeGauge ? '' : _Window_Options_volumeStatusText.apply(this, arguments);
    };

    const _Window_Options_statusWidth = Window_Options.prototype.statusWidth;
    Window_Options.prototype.statusWidth = function() {
        if (!_data) return _Window_Options_statusWidth.apply(this, arguments);
        const symbol = this.commandSymbol(this.findSymbol(_data.OptionSymbol));
        return symbol && this.isVolumeSymbol(symbol) && _data.VolumeGauge ? this.gaugeWidth() : _Window_Options_statusWidth.apply(this, arguments);
    };
    
    Window_Options.prototype.gaugeWidth = function() {
        return Math.min(this.itemWidth(), _data.GaugeWidth);
    };

    Window_Options.prototype.volumeGauge = function(index, symbol) {
        if (_data && _data.VolumeGauge) {
            const rect = this.itemLineRect(index);
            const statusWidth = this.statusWidth();
            const titleWidth = rect.width - statusWidth - this.itemPadding() / 2;
            _data._width = Math.min(statusWidth, rect.width - rect.x);
            this.placeOptionGauge(_data, symbol, rect.x + titleWidth, rect.y + 4);
        }
    };

    Window_Options.prototype.placeOptionGauge = function(data, type, x, y) {
        _tempParams.setGaugeData(data, type);
        const sprite = this._optionGauge[type] ? this._optionGauge[type] : new Sprite_OptionGauge();
        this.addInnerChild(sprite);
        sprite.setup(this, type);
        sprite.move(x, y);
        sprite.show();
        this._optionGauge[type] = sprite;
    };
    
    Window_Options.prototype.getConfigMaxValue = function() {
        return 100;
    };


    Window_Options.prototype.processTouch = function() {
        Window_Selectable.prototype.processTouch.apply(this, arguments);
        this.longPressedVolumeSliderTouch();
    };

    Window_Options.prototype.longPressedVolumeSliderTouch = function() {
        if (this.isOpenAndActive()) {
            if (TouchInput.isLongPressed()) {
                this.volumeSliderTouch();
            }
        }
    };

    Window_Options.prototype.onTouchOk = function() {
        if (this.volumeSliderTouch()) return;
        Window_Selectable.prototype.onTouchOk.apply(this, arguments);
        return;
    };

    Window_Options.prototype.volumeSliderTouch = function() {
        const symbol = this.commandSymbol(this.index());
        if (!this.isVolumeSymbol(symbol)) return;
        const data = this.getExtData(symbol);
        if (!data && !data.VolumeGauge) return false;
        if (this.isTouchOkEnabled()) {
            const hitIndex = this.hitIndex();
            if (this._cursorFixed) {
                if (hitIndex === this.index()) {
                    return this.volumeSlider(symbol);
                }
            } else if (hitIndex >= 0) {
                return this.volumeSlider(symbol);
            }
        }
        return false;
    };

    Window_Options.prototype.volumeSlider = function(symbol) {
        return this.isVolumeTouchZone(symbol);
    };

    Window_Options.prototype.isVolumeTouchZone = function(symbol) {
        const rect = this.itemLineRect(this.index());
        const gauge = this._optionGauge[symbol];
        const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = this.worldTransform.applyInverse(touchPos);
        const gaugeX = gauge.x + gauge.gaugeX() + rect.x;
        const gaugeY = gauge.y + (gauge.textHeight() - gauge.gaugeHeight()) + this._padding;
        if (localPos.x >= gaugeX && localPos.x <= gaugeX + gauge.bitmapWidth() - gauge.gaugeX()  && localPos.y >= gaugeY && localPos.y <= gaugeY + gauge.gaugeHeight()) {
            const pointX = localPos.x - gaugeX;
            const maxPoint = gauge.bitmapWidth() - gauge.gaugeX();
            const volume = Math.floor(pointX / maxPoint * this.getConfigMaxValue());
            this.changeVolumeSlider(symbol, volume);
            return true;
        }
        return false;
    };

    Window_Options.prototype.setVolumeSlider = function(symbol, volume) {
        this.changeVolumeSlider(symbol, volume);
    };

    Window_Options.prototype.changeVolumeSlider = function(symbol, volume) {
        const value = volume;
        this.changeValue(symbol, value.clamp(0, 100));
    };

    const _Window_Options_changeVolume = Window_Options.prototype.changeVolume;
    Window_Options.prototype.changeVolume = function(symbol, forward, wrap) {
        const lastValue = this.getConfigValue(symbol);
        const offset = this.volumeOffset();
        this._volumeFraction = forward ? (offset - (lastValue % offset > 0 ? lastValue % offset : 0)) : (lastValue % offset > 0 ? lastValue % offset : 0);
        _Window_Options_changeVolume.apply(this, arguments);
        this._volumeFraction = 0;
    };

    const _Window_Options_volumeOffset = Window_Options.prototype.volumeOffset;
    Window_Options.prototype.volumeOffset = function() {
        return this._volumeFraction > 0 ? this._volumeFraction : _Window_Options_volumeOffset.apply(this, arguments);
    };

    function Sprite_OptionGauge() {
        this.initialize(...arguments);
    }

    Sprite_OptionGauge.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_OptionGauge.prototype.constructor = Sprite_OptionGauge;
    
    Sprite_OptionGauge.prototype.initialize = function() {
        this._statusType = _tempParams.getType();
        this._paramData = _tempParams.getData();
        this._drawCurrentValue = false;
        Sprite_Gauge.prototype.initialize.call(this);
    };

    Sprite_OptionGauge.prototype.bitmapWidth = function() {
        return this._paramData._width || 128;
    };

    Sprite_OptionGauge.prototype.gaugeHeight = function() {
        return this._paramData.GaugeHeight > 0 ? this._paramData.GaugeHeight : Sprite_Gauge.prototype.gaugeHeight.apply(this, arguments);
    };

    Sprite_OptionGauge.prototype.gaugeColor1 = function() {
        return NuunManager.getColorCode(this._paramData.Color1);
    };
      
    Sprite_OptionGauge.prototype.gaugeColor2 = function() {
        return NuunManager.getColorCode(this._paramData.Color2);
    };

    Sprite_OptionGauge.prototype.currentValue = function() {
        if (this._battler) {
            const value = this._battler.getConfigValue(this._statusType);
            return this._drawCurrentValue ? value + "%" : value;
        }
    };
      
    Sprite_OptionGauge.prototype.currentMaxValue = function() {
        if (this._battler) {
            return this._battler.getConfigMaxValue(this._statusType);
        }
    };

    Sprite_OptionGauge.prototype.drawValue = function() {
        this._drawCurrentValue = true;
        Sprite_Gauge.prototype.drawValue.apply(this, arguments);
        this._drawCurrentValue = false;
    };

})();