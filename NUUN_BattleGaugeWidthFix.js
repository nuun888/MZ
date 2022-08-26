/*:-----------------------------------------------------------------------------------
 * NUUN_BattleGaugeWidthFix.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc バトルステータスゲージ幅修正
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * コアスクリプトではゲージ幅は128で固定されている関係で、画面サイズや戦闘メンバー数によっては
 * ゲージやアクター名がはみ出て表示されてしまいます。
 * このプラグインでは表示範囲内に収まるようにゲージ幅を修正します。
 * 
 * バトルスタイル拡張導入の場合は、ゲージ幅補正機能が備わっておりますのでこのプラグインは必要ございません。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/8/27 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BattleGaugeWidthFix = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_BattleGaugeWidthFix');
    let maxGaugeWidth = NaN;

    const _Window_BattleStatus_drawItemStatus = Window_BattleStatus.prototype.drawItemStatus;
    Window_BattleStatus.prototype.drawItemStatus = function(index) {
        maxGaugeWidth = this.itemRectWithPadding(0).width;
        _Window_BattleStatus_drawItemStatus.call(this, index);
        maxGaugeWidth = NaN;
    };

    Sprite.prototype.gaugeFixWidthClass = function() {
        switch (this.className) {
          case 'Window_BattleStatus':
          case 'Window_BattleActor':
            return !isNaN(maxGaugeWidth);
        }
        return false;
    };

    const _Sprite_Gauge_initMembers = Sprite_Gauge.prototype.initMembers;
    Sprite_Gauge.prototype.initMembers = function() {
        this._nuunGaugeWidth = null;
        _Sprite_Gauge_initMembers.call(this);
    };

    const _Sprite_Gauge_setup = Sprite_Gauge.prototype.setup;
    Sprite_Gauge.prototype.setup = function(battler, statusType) {
        _Sprite_Gauge_setup.call(this, battler, statusType);
        if (this.gaugeFixWidthClass()) {
            const width = Math.min(maxGaugeWidth, this.bitmapWidth());
            if (this.bitmapWidth() !== width) {
                this._nuunGaugeWidth = width;
                this.redraw();
            }
        }
    };

    const _Sprite_Gauge_bitmapWidth = Sprite_Gauge.prototype.bitmapWidth
    Sprite_Gauge.prototype.bitmapWidth = function() {
        return this._nuunGaugeWidth ? this._nuunGaugeWidth : _Sprite_Gauge_bitmapWidth.call(this);
    };

    const _Sprite_Name_initMembers = Sprite_Name.prototype.initMembers;
    Sprite_Name.prototype.initMembers = function() {
        this._nuunNameWidth = null;
        _Sprite_Name_initMembers.call(this);
    };

    const _Sprite_Name_setup = Sprite_Name.prototype.setup;
    Sprite_Name.prototype.setup = function(battler) {
        _Sprite_Name_setup.call(this, battler);
        if (this.gaugeFixWidthClass()) {
            const width = Math.min(maxGaugeWidth, this.bitmapWidth());
            if (this.bitmapWidth() !== width) {
                this._nuunNameWidth = width;
                this.redraw();
            }
        }
    };

    const _Sprite_NamebitmapWidth = Sprite_Name.prototype.bitmapWidth;
    Sprite_Name.prototype.bitmapWidth = function() {
        return this._nuunNameWidth ? this._nuunNameWidth : _Sprite_NamebitmapWidth.call(this);
    };

})();