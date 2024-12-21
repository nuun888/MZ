/*:-----------------------------------------------------------------------------------
 * NUUN_BS_BattleFieldActors.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Butler's Battlefield Display
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_BattleStyleEX
 * @version 1.0.0
 * 
 * @help
 * Display the front-view actor on the battlefield.
 * 
 * Specifications
 * Effects will be disabled when the actor is acting.
 * The image display start coordinates and image display width of the actor image will be disabled.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/21/2024 Ver.1.0.0
 * First edition.
 * 
 * 
 * @param BattlerOriginX
 * @desc Butler's origin X.
 * @text Origin X
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param BattlerOriginY
 * @desc Butler's origin Y.
 * @text Origin Y
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param BattlerIntervalWidth
 * @desc Butler width interval. Automatic calculation with 0
 * @text Width spacing
 * @type number
 * @default 0
 * @min 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc バトラーのバトルフィールド表示
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_BattleStyleEX
 * @version 1.0.0
 * 
 * @help
 * フロントビューのアクターをバトルフィールド上に表示させます。
 * 
 * 仕様
 * アクター行動時のエフェクトは無効になります。
 * アクター画像の画像表示開始座標、画像表示幅は無効になります。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/12/21 Ver.1.0.0
 * 初版
 * 
 * 
 * @param BattlerOriginX
 * @desc バトラーの原点X。
 * @text 原点X
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param BattlerOriginY
 * @desc バトラーの原点Y。
 * @text 原点Y
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param BattlerIntervalWidth
 * @desc バトラーの横幅間隔。0で自動算出
 * @text 横幅間隔
 * @type number
 * @default 0
 * @min 0
 * 
 */


var Imported = Imported || {};
Imported.NUUN_BS_BattleFieldActors = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function getIntervalWidth() {
        return params.BattlerIntervalWidth > 0 ? params.BattlerIntervalWidth : Math.floor(Graphics.width / $gameParty.maxBattleMembers());
    };

    Scene_Battle.prototype.createActorImges = function(rect) {

    };

    Spriteset_Battle.prototype.createActorImgBaseSprite = function() {
        
    };

    const _Spriteset_Battle_createActors = Spriteset_Battle.prototype.createActors;
    Spriteset_Battle.prototype.createActors = function() {
        _Spriteset_Battle_createActors.apply(this, arguments);
        if (!$gameSystem.isSideView()) {
            for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
                const sprite = new Sprite_BSFrontActorImg();
                this._actorSprites.push(sprite);
                this._battleField.addChild(sprite);
            }
        }
    };

    Spriteset_Battle.prototype.createFrontActors = function() {

    };

    Spriteset_Battle.prototype.addBsCreateActors = function() {
        if (!$gameSystem.isSideView() && this._actorSprites && $gameParty.maxBattleMembers() > this._actorSprites.length) {
            const count = $gameParty.maxBattleMembers() - this._actorSprites.length;
            for (let i = 0; i < count; i++) {
                const sprite = new Sprite_BSFrontActorImg();
                this._actorSprites.push(sprite);
                this._battleField.addChild(sprite);
            }
        }  
    };

    function Sprite_BSFrontActorImg() {
        this.initialize(...arguments);
    }
    
    Sprite_BSFrontActorImg.prototype = Object.create(Sprite_Battler.prototype);
    Sprite_BSFrontActorImg.prototype.constructor =Sprite_BSFrontActorImg;
    
    Sprite_BSFrontActorImg.prototype.initialize = function(battler) {
        this._contentsData = new Nuun_BattleStyleActorAnimation();
        Sprite_Battler.prototype.initialize.call(this, battler);
        this.createMainSprite();
    };

    Sprite_BSFrontActorImg.prototype.createMainSprite = function() {
        const sprite = new Sprite_ActorImges();
        this.addChild(sprite);
        this._mainSprite = sprite;
        sprite.setHome(0, 0);
        sprite.setRect(Infinity, Infinity);
    };

    Sprite_BSFrontActorImg.prototype.setActorHome = function(index) {
        const x = params.BattlerOriginX + index * getIntervalWidth() + NuunManager.styleData.getActorEffect_X();
        const y = Graphics.height + params.BattlerOriginY + NuunManager.styleData.getActorEffect_Y();
        this.setHome(x, y);
    };

    Sprite_BSFrontActorImg.prototype.isSpriteVisible = function() {
        return true;
    };

    Sprite_BSFrontActorImg.prototype.updateVisibility = function() {
        Sprite_Clickable.prototype.updateVisibility.call(this);
        if (!this._battler || !this.isSpriteVisible()) {
            this.visible = false;
        }
    };

    Sprite_BSFrontActorImg.prototype.setBattler = function(battler) {
        Sprite_Battler.prototype.setBattler.call(this, battler);
        if (this._actor !== battler) {
            this._actor = battler;
            if (battler) {
                this.setActorHome(battler.index())
            }
            this._contentsData.setup(battler);
            this.setBattlerImg();
        }
    };

    Sprite_BSFrontActorImg.prototype.setBattlerImg = function() {
        this._mainSprite.setup(this._contentsData, this._contentsData.getImgIndex());
        this._mainSprite.setHome(this._contentsData.getActorImg_X(), this._contentsData.getActorImg_Y());
        this._mainSprite.setRect(Infinity, Infinity);
        this._mainSprite.show();
    };


    const _Sprite_ActorImges_setup = Sprite_ActorImges.prototype.setup;
    Sprite_ActorImges.prototype.setup = function(data, index) {
        _Sprite_ActorImges_setup.apply(this, arguments);
        this.anchor.x = 0.5;
        this.anchor.y = 1.0;
    };

    const _Sprite_ActorImges_setupEffect = Sprite_ActorImges.prototype.setupEffect;
    Sprite_ActorImges.prototype.setupEffect = function() {
        _Sprite_ActorImges_setupEffect.apply(this, arguments);
        if (this._zoomEffect) {
            this._zoomDuration = 0;
            this._zoomEffect = false;
        }
    };
    
   
})();