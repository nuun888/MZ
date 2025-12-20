/*:-----------------------------------------------------------------------------------
 * NUUN_CacheFeature.js
 * 
 * Copyright (C) 2025 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Equipment screen feature cache
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Cache the trait references during updates on the equipment screen and status screen.
 * This can be expected to lighten the load, especially when a large number of traits are applied.
 * 
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Adult content: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 装備画面特徴キャッシュ化
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * 装備画面、ステータス画面での更新時の特徴参照をキャッシュ化します。
 * 特に大量に特徴を持たせている場合に軽量化が見込まれます。
 * 
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 成人向け：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 */


var Imported = Imported || {};
Imported.NUUN_CacheFeature = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    let _cacheAFeatures = [];
    let _cacheEFeatures = [];

    const _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
    Game_Actor.prototype.traitObjects = function() {
        return !!_cacheAFeatures[this.actorId()] ? _cacheAFeatures[this.actorId()] : _Game_Actor_traitObjects.apply(this, arguments);
    };

    const _Game_Enemy_traitObjects = Game_Enemy.prototype.traitObjects;
    Game_Enemy.prototype.traitObjects = function() {
        return !!_cacheEFeatures[this.enemyId()] ? _cacheEFeatures[this.enemyId()] : _Game_Enemy_traitObjects.apply(this, arguments);
    };

    Game_Actor.prototype.setCacheTraitObject = function() {
        _cacheAFeatures[this.actorId()] = this.traitObjects();
    };

    Game_Enemy.prototype.setCacheTraitObject = function() {
        _cacheEFeatures[this.enemyId()] = this.traitObjects();
    };

    Game_Actor.prototype.clearCacheTraitObject = function() {
        _cacheAFeatures[this.actorId()] = null;
    };

    Game_Enemy.prototype.clearCacheTraitObject = function() {
        _cacheEFeatures[this.enemyId()] = null;
    };


    if (Window_StatusEquip.prototype.refresh == Window_StatusBase.prototype.refresh) {
        Window_StatusEquip.prototype.refresh = function() {
            Window_StatusBase.prototype.refresh.apply(this, arguments);
        };
    }

    const _Window_StatusEquip_refresh = Window_StatusEquip.prototype.refresh;
    Window_StatusEquip.prototype.refresh = function() {
        this.cacheFeatures();
        _Window_StatusEquip_refresh.apply(this, arguments);
        this.clearCacheFeatures();
    };

    if (Window_EquipSlot.prototype.refresh == Window_StatusBase.prototype.refresh) {
        Window_EquipSlot.prototype.refresh = function() {
            Window_StatusBase.prototype.refresh.apply(this, arguments);
        };
    }

    const _Window_EquipSlot_refresh = Window_EquipSlot.prototype.refresh;
    Window_EquipSlot.prototype.refresh = function() {
        this.cacheFeatures();
        _Window_EquipSlot_refresh.apply(this, arguments);
        this.clearCacheFeatures();
    };

    if (Window_EquipItem.prototype.refresh == Window_ItemList.prototype.refresh) {
        Window_EquipItem.prototype.refresh = function() {
            Window_ItemList.prototype.refresh.apply(this, arguments);
        };
    }

    const _Window_EquipItem_refresh = Window_EquipItem.prototype.refresh;
    Window_EquipItem.prototype.refresh = function() {
        this.cacheFeatures();
        _Window_EquipItem_refresh.apply(this, arguments);
        this.clearCacheFeatures();
    };

    const _Window_StatusEquip_maxItems = Window_StatusEquip.prototype.maxItems;
    Window_StatusEquip.prototype.maxItems = function() {
        return !!this._cacheEquipSlots ? this._cacheEquipSlots.length : _Window_StatusEquip_maxItems.apply(this, arguments);
    };

    const _Window_EquipSlot_maxItems = Window_EquipSlot.prototype.maxItems;
    Window_EquipSlot.prototype.maxItems = function() {
        return !!this._cacheEquipSlots ? this._cacheEquipSlots.length : _Window_EquipSlot_maxItems.apply(this, arguments);
    };

    Window_Selectable.prototype.cacheFeatures = function() {
        this._cacheEquipSlots = null;
        if (!!this._actor) {
            this._actor.clearCacheTraitObject();
            this._actor.setCacheTraitObject();
            this._cacheEquipSlots = this._actor.equipSlots();
        }
    };

    Window_EquipItem.prototype.cacheFeatures = function() {
        if (!!this._actor) {
            this._actor.clearCacheTraitObject();
            this._actor.setCacheTraitObject();
        }
    };

    Window_Selectable.prototype.clearCacheFeatures = function() {
        if (!!this._actor) {
            _cacheAFeatures = [];
            _cacheEFeatures = [];
        }
    };

    
})();