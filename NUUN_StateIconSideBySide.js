/*:-----------------------------------------------------------------------------------
 * NUUN_StateIconSideBySide.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc  State side-by-side display
 * @author NUUN
 * @version 2.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_StateTurn
 * 
 * @help
 * Displays the states displayed during battle side by side.
 * "NUUN_StateTurn" is now required to display turns.
 * 
 * When using a plug-in that enlarges the image of an enemy character, the image may be distorted.
 * If you are interested, please use it together with the enemy state display expansion.
 * 
 * If you are using a plug-in that changes the state icon coordinates, please set the ally icon display position coordinates to default.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 1/29/2025 Ver.2.0.0
 * Re-corrected.
 * 1/2/2021 Ver.1.0.0
 * First edition.
 * 
 * @param Setting
 * @text Common setting
 * @default ------------------------------
 * 
 * @param StateIconWidth
 * @desc Specify the width to display the state icon. 0 will be the width of the number of icon columns.
 * @text Width
 * @type number
 * @default 0
 * @min 0
 * @parent Setting
 * 
 * @param StateHeightInterval
 * @desc The vertical spacing between state icons (relative).
 * @text Icon Vertical Spacing
 * @type number
 * @default 0
 * @min 0
 * @parent Setting
 * 
 * @param ActorStateIcon
 * @text Ally state icon
 * @default ------------------------------
 * 
 * @param ActorStateIconShowVal
 * @desc The number of allies' state cols.
 * @text Number of allied state cols
 * @type number
 * @default 4
 * @min 1
 * @parent ActorStateIcon
 * 
 * @param ActorStateIconRows
 * @desc The number of allied state rows.
 * @text Number of allied state rows
 * @type number
 * @default 1
 * @min 1
 * @parent ActorStateIcon
 * 
 * @param NoStateIcon
 * @desc Icon index when no state is attached.
 * @text No state icon
 * @type icon
 * @default 0
 * @min 0
 * @parent ActorStateIcon
 * 
 * @param ActorStateIconAlign
 * @desc Ally icon display align.
 * @text Ally icon display align
 * @type select
 * @option Left
 * @value 'left'
 * @option Center
 * @value 'center'
 * @option Right
 * @value 'right'
 * @default 'right'
 * @parent ActorStateIcon
 * 
 * @param ActorStateIconPosition
 * @desc Display position coordinates of friendly icon.
 * @text Ally icon display position coordinates
 * @type select
 * @option Ally icon display align criteria
 * @value 'auto'
 * @option Left
 * @value 'left'
 * @option Center
 * @value 'center'
 * @option Right
 * @value 'right'
 * @option Default (traditional processing)
 * @value 'default'
 * @default 'auto'
 * @parent ActorStateIcon
 * 
 * 
 * @param EnemyStateIcon
 * @text Enemy state icon
 * @default ------------------------------
 * 
 * @param EnemyStateIconShowVal
 * @desc The number of enemy state cols.
 * @text Number of enemy state cols
 * @type number
 * @default 5
 * @min 1
 * @parent EnemyStateIcon
 * 
 * @param EnemyStateIconRows
 * @desc The number of enemy state rows.
 * @text Number of enemy state rows
 * @type number
 * @default 1
 * @min 1
 * @parent EnemyStateIcon
 * 
 * @param EnemyStateIconAlign
 * @desc Enemy icon display align.
 * @text Enemy icon display align
 * @type select
 * @option Left
 * @value 'left'
 * @option Center
 * @value 'center'
 * @option Right
 * @value 'right'
 * @default 'center'
 * @parent EnemyStateIcon
 * 
 * @param OtherSetting
 * @text Other setting
 * @default ------------------------------
 * 
 * @param SmoothMode
 * @desc Set smooth mode.
 * @text Smooth mode enabled
 * @type boolean
 * @default true
 * @parent OtherSetting
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc  ステート横並び表示
 * @author NUUN
 * @version 2.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_StateTurn
 * 
 * @help
 * 戦闘中に表示するステートを横並び表示にします。
 * ターンの表示はNUUN_StateTurnが必要になりました。
 * 
 * 敵キャラの画像を拡大等をするプラグインと併用する場合、画像に乱れが生じる場合があります。
 * 気になるようでしたら敵ステート表示拡張と併用してください。
 * 
 * ステートアイコンの座標を変更するプラグインを使用している場合は、味方アイコン表示位置座標の設定をデフォルトにしてください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/1/29 Ver.2.0.0
 * システムのリファクタリング
 * 2021/1/2 Ver.1.0.0
 * 初版
 * 
 * @param Setting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param StateIconWidth
 * @desc ステートアイコンの表示する横幅を指定します。0でアイコン列数の幅になります。
 * @text 横幅
 * @type number
 * @default 0
 * @min 0
 * @parent Setting
 * 
 * @param StateHeightInterval
 * @desc ステートアイコンの表示する縦の間隔。(相対)
 * @text アイコン縦間隔
 * @type number
 * @default 0
 * @min 0
 * @parent Setting
 * 
 * @param ActorStateIcon
 * @text 味方ステートアイコン
 * @default ------------------------------
 * 
 * @param ActorStateIconShowVal
 * @desc 味方のステート列数。
 * @text 味方ステート列数
 * @type number
 * @default 4
 * @min 1
 * @parent ActorStateIcon
 * 
 * @param ActorStateIconRows
 * @desc 味方のステート行数。
 * @text 味方ステート行数
 * @type number
 * @default 1
 * @min 1
 * @parent ActorStateIcon
 * 
 * @param NoStateIcon
 * @desc ステートがひとつも付与されていない時のアイコンインデックス。
 * @text ステートなし時アイコン
 * @type icon
 * @default 0
 * @min 0
 * @parent ActorStateIcon
 * 
 * @param ActorStateIconAlign
 * @desc 味方のアイコンの表示揃え
 * @text 味方アイコン表示揃え
 * @type select
 * @option 左揃え
 * @value 'left'
 * @option 中央揃え
 * @value 'center'
 * @option 右揃え
 * @value 'right'
 * @default 'right'
 * @parent ActorStateIcon
 * 
 * @param ActorStateIconPosition
 * @desc 味方のアイコンの表示位置座標
 * @text 味方アイコン表示位置座標
 * @type select
 * @option 味方アイコン表示揃え基準
 * @value 'auto'
 * @option 左
 * @value 'left'
 * @option 中央
 * @value 'center'
 * @option 右
 * @value 'right'
 * @option デフォルト(従来の処理)
 * @value 'default'
 * @default 'auto'
 * @parent ActorStateIcon
 * 
 * 
 * @param EnemyStateIcon
 * @text 敵ステートアイコン
 * @default ------------------------------
 * 
 * @param EnemyStateIconShowVal
 * @desc 敵のステート列数。
 * @text 敵ステート列数
 * @type number
 * @default 5
 * @min 1
 * @parent EnemyStateIcon
 * 
 * @param EnemyStateIconRows
 * @desc 敵のステート行数。
 * @text 敵ステート行数
 * @type number
 * @default 1
 * @min 1
 * @parent EnemyStateIcon
 * 
 * @param EnemyStateIconAlign
 * @desc 敵のアイコンの表示揃え
 * @text 敵アイコン表示揃え
 * @type select
 * @option 左揃え
 * @value 'left'
 * @option 中央揃え
 * @value 'center'
 * @option 右揃え
 * @value 'right'
 * @default 'center'
 * @parent EnemyStateIcon
 * 
 * @param OtherSetting
 * @text その他設定
 * @default ------------------------------
 * 
 * @param SmoothMode
 * @desc スムースモードの設定。
 * @text スムースモード有効
 * @type boolean
 * @default true
 * @parent OtherSetting
 * 
 */

var Imported = Imported || {};
Imported.NUUN_StateIconSideBySide = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
    Sprite_Enemy.prototype.initMembers = function() {
        NuunManager.isEnemyStateIconMode = true;
        _Sprite_Enemy_initMembers.call(this);
    };

    const _Sprite_StateIcon_initMembers = Sprite_StateIcon.prototype.initMembers;
    Sprite_StateIcon.prototype.initMembers = function() {
        this._battler = null;
        this._iconSprite = [];
        this._icons = [];
        this._isEnemyMode = NuunManager.isEnemyStateIconMode;
        this._iconIndex = 0;
        this.createSideBySideStateIcon();
    };

    const _Sprite_StateIcon_loadBitmap = Sprite_StateIcon.prototype.loadBitmap;
    Sprite_StateIcon.prototype.loadBitmap = function() {
        _Sprite_StateIcon_loadBitmap.apply(this, arguments);
    };

    Sprite_StateIcon.prototype.createSideBySideStateIcon = function() {
        for (let i = 0; i < this.maxIconSprite(); i++) {
            const sprite = new Sprite_SideBySideStateIcon();
            this.addChild(sprite);
            this._iconSprite.push(sprite);
            sprite.setSpriteIndex(i);
        }
        NuunManager.isEnemyStateIconMode = false;
    };

    const _Sprite_StateIcon_setup = Sprite_StateIcon.prototype.setup;
    Sprite_StateIcon.prototype.setup = function(battler) {
        if (this._battler !== battler) {
            this._battler = battler;
            for (const sprite of this._iconSprite) {
                sprite.setup(this, battler);
            }
        }
    };

    const _Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
    Sprite_StateIcon.prototype.update = function() {
        this._icons = [];
        if (this.shouldDisplay()) {
            this._icons.push(...this._battler.allIcons());
        }
        for (const sprite of this._iconSprite) {
            sprite.update();
        }
    };

    Sprite_StateIcon.prototype.getIcons = function() {
        return this._icons;
    };

    Sprite_StateIcon.prototype.getTurns = function() {
        return this._turns;
    };

    Sprite_StateIcon.prototype.maxIconSprite = function() {
        return this.getMaxStateIconShowVal() * this.getMaxStateIconRows();
    };
 
    Sprite_StateIcon.prototype.getMaxStateIconShowVal = function() {
        if (this._battler) {
            return this.getStateIconShowVal();
        } else {
            return this._isEnemyMode ? params.EnemyStateIconShowVal : params.ActorStateIconShowVal;
        }
    };

    Sprite_StateIcon.prototype.getMaxStateIconRows = function() {
        if (this._battler) {
          return this.getStateIconRows();
        } else {
          return this._isEnemyMode ? params.EnemyStateIconRows : params.ActorStateIconRows;
        }
    };

    Sprite_StateIcon.prototype.getStateIconShowVal = function() {
        return this._battler && this._battler.isActor() ? params.ActorStateIconShowVal : params.EnemyStateIconShowVal;
    };
      
    Sprite_StateIcon.prototype.getStateIconRows = function() {
        return this._battler && !this._isEnemyMode ? params.ActorStateIconRows : params.EnemyStateIconRows;
    };

    Sprite_StateIcon.prototype.isNoStateIcon = function() {
        return !this._isEnemyMode ? params.NoStateIcon : 0;
    };

    if (Sprite_StateIcon.prototype.updateVisibility == Sprite.prototype.updateVisibility) {
        Sprite_StateIcon.prototype.updateVisibility = function() {
            Sprite.prototype.updateVisibility.apply(this, arguments);
        };
    }

    const _Sprite_StateIcon_updateVisibility = Sprite_StateIcon.prototype.updateVisibility;
    Sprite_StateIcon.prototype.updateVisibility = function() {
        _Sprite_StateIcon_updateVisibility.apply(this, arguments);
        this.visible = true;
    };
    

    function Sprite_SideBySideStateIcon() {
        this.initialize(...arguments);
    }
    
    Sprite_SideBySideStateIcon.prototype = Object.create(Sprite_StateIcon.prototype);
    Sprite_SideBySideStateIcon.prototype.constructor = Sprite_SideBySideStateIcon;
    
    Sprite_SideBySideStateIcon.prototype.initialize = function() {
        Sprite_StateIcon.prototype.initialize.call(this);
    };

    Sprite_SideBySideStateIcon.prototype.initMembers = function() {
        _Sprite_StateIcon_initMembers.apply(this, arguments);
        this._isEnemyMode = NuunManager.isEnemyStateIconMode;
        this._spriteIndex = 0;
    };

    Sprite_SideBySideStateIcon.prototype.setSpriteIndex = function(index) {
        this._spriteIndex = index;
    };

    Sprite_SideBySideStateIcon.prototype.loadBitmap = function() {
        _Sprite_StateIcon_loadBitmap.apply(this, arguments);
        if (!params.SmoothMode) {
            this.bitmap.smooth = false;
        }
    };

    Sprite_SideBySideStateIcon.prototype.bitmapWidth = function() {
        return ImageManager.iconWidth;
    };
    
    Sprite_SideBySideStateIcon.prototype.bitmapHeight = function() {
        return ImageManager.iconHeight;
    };

    Sprite_SideBySideStateIcon.prototype.setup = function(sprite, battler) {
        if (this._battler !== battler) {
            this._baseIconSprite = sprite;
        }
        _Sprite_StateIcon_setup.call(this, battler);
    };

    Sprite_SideBySideStateIcon.prototype.update = function() {
        _Sprite_StateIcon_update.apply(this, arguments);
    };

    Sprite_SideBySideStateIcon.prototype.updateIcon = function() {//再定義
        let icons = [];
        if (this.shouldDisplay()) {
            icons = this._baseIconSprite.getIcons();
        }
        let index = 0;
        if (icons.length > 0) {
            const iconPage = Math.ceil(icons.length / this.maxIconSprite());
            if (this._animationIndex >= iconPage) {
                this._animationIndex = 0;
                index = this._spriteIndex;
            } else {
                index = this._spriteIndex + this.maxIconSprite() * (this._animationIndex);
            }
            this._iconIndex = icons[index] || this.isNoStateIcon();
            this._animationIndex++;
        } else {
            this._animationIndex = 0;
            const noStateIcon = this.isNoStateIcon();
            this._iconIndex = noStateIcon;
            if (noStateIcon > 0) {
                this.visible = this._iconIndex > 0;//疑似3Dバトル競合対策
            }
        }
        this.updateIconPosition(icons);
        this.updateTurn(index);
        this.updateLevelIcon(index)
    };

    Sprite_SideBySideStateIcon.prototype.updateTurn = function(index) {
        if (!Imported.NUUN_StateTurn) return;
        Sprite_StateIcon.prototype.updateTurn.apply(this, arguments);
    };

    Sprite_SideBySideStateIcon.prototype.updateLevelIcon = function(index) {//MPP_StateLevel
        if (!this._turnSprite) return;
        const levels = this.shouldDisplay() ? this._battler.allLevels() : [];
        const state = this._battler.displayedStates()[index];
        this._level = levels.length ? levels[index] || 0 : 0;
        this._turnSprite.setState(state ? state.id : 0);
    };

    Sprite_SideBySideStateIcon.prototype.updateIconPosition = function(icons) {
        const cols = this.getMaxStateIconShowVal();
        const rows = this.getMaxStateIconRows();
        let iconWidth = 0;
        let iconIndex = (this._spriteIndex % cols);
        const lineRow = (this._animationIndex - 1) * rows + Math.floor(this._spriteIndex / cols);
        const num = icons.length - (lineRow * cols);
        const iconNum = num < 0 ? cols : num;
        if (this.isNoStateIcon() === 0) {
            if (params.StateIconWidth && ImageManager.iconWidth * iconNum > params.StateIconWidth) {
                iconWidth = Math.floor(params.StateIconWidth / cols);
            } else {
                iconWidth = ImageManager.iconWidth;
            }
        } else {
            if (params.StateIconWidth > 0 && ImageManager.iconWidth * cols > params.StateIconWidth) {
                iconWidth = Math.floor(params.StateIconWidth / cols);
            } else {
                iconWidth = ImageManager.iconWidth;
            }
        }
        this.x = this.stateIconDisplay(iconWidth, iconNum.clamp(0, cols), iconIndex, cols);
        this.y = (ImageManager.iconHeight + (params.StateHeightInterval || 0)) * Math.floor(this._spriteIndex / cols);
    };
    
    Sprite_SideBySideStateIcon.prototype.stateIconDisplay = function(width, iconlength, index, cols) {
        if (this._battler && this._isEnemyMode) {
            return this.stateIconDisplayAlign(width, iconlength, index, cols, params.EnemyStateIconAlign);
        } else {
            return this.stateIconDisplayAlign(width, iconlength, index, cols, params.ActorStateIconAlign);
        }
    };
    
    Sprite_SideBySideStateIcon.prototype.stateIconDisplayAlign = function(width, iconlength, index, cols, align) {
        if (align === 'center') {
            if (this.isNoStateIcon() === 0) {
                return (width * index) - Math.floor((width * (iconlength - 1)) / 2);
            } else {
                return (width * index) - Math.floor((width * cols) / 2);
            }
        } else if (align === 'right') {
            if (this.isNoStateIcon() === 0 || this._iconIndex !== this.isNoStateIcon()) {
                return (width * index) - (width * (iconlength - 1));
            } else {
                return (width * index) - (width * (cols - 1 + (cols > iconlength ? iconlength : 0)));
            }
        }
        return width * index;
    };

    Sprite_SideBySideStateIcon.prototype.updateVisibility = function() {
        _Sprite_StateIcon_updateVisibility.apply(this, arguments);
    };

      
    Game_BattlerBase.prototype.nuun_stateTurnFilter = function() {
        if (this.statesFilter && BattleManager.bsVisibleStates && BattleManager.bsVisibleStates.length > 0) {
            return this.statesFilter();
        } else {
            return this.states();
        }
    };
      
    Game_BattlerBase.prototype.nuun_buffTurnsFilter = function(id) {
        return this.buffsFilter ? this.buffsFilter(id) : true;
    };
      
    Game_BattlerBase.prototype.nuun_isNonRemoval = function(state) {
        return state.autoRemovalTiming === 0;
    };


    const _Window_BattleStatus_stateIconX = Window_BattleStatus.prototype.stateIconX;
    Window_BattleStatus.prototype.stateIconX = function(rect) {
        let mode = params.ActorStateIconPosition;
        if (ActorStateIconPosition === 'auto') {
            mode = params.ActorStateIconAlign;
        }
        if (mode=== 'center') {
            return rect.x + rect.width / 2;
        } else if (mode === 'left') {
            return rect.x + ImageManager.iconWidth / 2 - 4;
        } else if (mode === 'right' || mode === 'default') {
            return _Window_BattleStatus_stateIconX.call(this, rect);
        }
    };

})();