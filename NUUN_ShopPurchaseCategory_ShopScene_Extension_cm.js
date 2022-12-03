/*:-----------------------------------------------------------------------------------
 * NUUN_ShopPurchaseCategory_ShopScene_Extension_cm.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc ショップ購入カテゴリー表示ショップ購入カテゴリー表示競合対応
 * @author NUUN
 * @orderAfter NUUN_PurchaseCategory
 * @orderAfter ShopScene_Extension
 * @version 1.0.0
 * 
 * @help
 * ショップ購入カテゴリー表示プラグインとうなぎおおとろ様のショップ購入カテゴリー表示プラグインを併用するときの
 * 競合対策プラグインです。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/12/3 Ver.1.0.0
 * 初版
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ShopPurchaseCategory_ShopScene_Extension_cm = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_ShopPurchaseCategory_ShopScene_Extension_cm');

    const _Window_ShopStatus_refresh = Window_ShopStatus.prototype.refresh;
    Window_ShopStatus.prototype.refresh = function() {
        if (this._actorSprites) {
            this.hideActorCharacters();
        }
        if (this._leftActorArrowSprite && this._rightActorArrowSprite) {
            this.hideActorCursors();
        }
        _Window_ShopStatus_refresh.call(this);
    };

    const _Window_ShopStatus_createActorArrowSprites = Window_ShopStatus.prototype.createActorArrowSprites;
    Window_ShopStatus.prototype.createActorArrowSprites = function() {
        _Window_ShopStatus_createActorArrowSprites.call(this);
        this.hideActorCursors();
    };

    
})();