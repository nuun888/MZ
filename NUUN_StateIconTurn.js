/*:-----------------------------------------------------------------------------------
 * NUUN_StateIconTurn.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc ステート、バフ残りターン表示
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * ステートアイコンに残りターンを表示します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/9/9 Ver.1.0.0
 * 初版
 * 
 * 
 * @param ActorStateIconVisible
 * @desc 味方のステートアイコンにターンの表示。
 * @text 味方ステートアイコン表示
 * @type boolean
 * @default true
 * 
 * @param EnemyStateIconVisible
 * @desc 敵のステートアイコンにターンの表示。
 * @text 敵ステートアイコン表示
 * @type boolean
 * @default true
 * 
 * @param TurnX
 * @desc ターン座標X（相対）
 * @text ターン座標X（相対）
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param TurnY
 * @desc ターン座標Y（相対）
 * @text ターン座標Y（相対）
 * @type number
 * @default -4
 * @min -9999
 * 
 * @param TurnFontSize
 * @desc ターンのフォントサイズ。（メインフォントから）
 * @text ターンフォントサイズ
 * @type number
 * @default -4
 * @min -9999
 * 
 * @param TurnCorrection
 * @text ターン数補正
 * @desc ターン数の表示を補正します。
 * @default 0
 * @type number
 * @min -9999
 * @max 9999
 * 
 */

var Imported = Imported || {};
Imported.NUUN_StateIconTurn = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_StateIconTurn');
  const ActorStateIconVisible = eval(parameters['ActorStateIconVisible'] || 'true');
  const EnemyStateIconVisible = eval(parameters['EnemyStateIconVisible'] || 'true');
  const TurnFontSize = Number(parameters['TurnFontSize'] || -4);
  const TurnX = Number(parameters['TurnX'] || 0);
  const TurnY = Number(parameters['TurnY'] || 0);
  const TurnCorrection = Number(parameters['TurnCorrection'] || 0);

  const _Sprite_StateIcon_initialize = Sprite_StateIcon.prototype.initialize;
  Sprite_StateIcon.prototype.initialize = function() {
    _Sprite_StateIcon_initialize.call(this);
    this.textTurn();
  };

  Sprite_StateIcon.prototype.textTurn = function() {
    const sprite = new Sprite();
    this.addChild(sprite);
    this.textSprite = sprite;
    this.textSprite.x = this.x + TurnX;
    this.textSprite.y = this.y + TurnY;
    this.textSprite.bitmap = new Bitmap(this.bitmap.width, this.bitmap.height);
  };

  const _Sprite_StateIcon_updateIcon = Sprite_StateIcon.prototype.updateIcon;
  Sprite_StateIcon.prototype.updateIcon = function() {
    _Sprite_StateIcon_updateIcon.call(this);
    const turns = [];
    let stateTurns = [];
    if (this.shouldDisplay()) {
      if (this._battler.isActor() && ActorStateIconVisible) {
        stateTurns = this._battler.allStateTurns()
        turns.push(...stateTurns);
        turns.push(...this._battler.allBuffTurns());
      } else if (this._battler.isEnemy() && EnemyStateIconVisible) {
        stateTurns = this._battler.allStateTurns()
        turns.push(...stateTurns);
        turns.push(...this._battler.allBuffTurns());
      }
    }
    if (turns.length > 0) {
      if (stateTurns.length <= this._animationIndex) {
        this._stateBuffTurns = this.nuun_getBuffTurns(turns);
      } else {
        this._stateBuffTurns = this.nuun_getStateTurns(turns);
      }
    } else {
      this._stateBuffTurns = 0;
    }
  };

  Sprite_StateIcon.prototype.nuun_getStateTurns = function(turns) {
    return this._battler._stateTurns[turns[this._animationIndex].id] + TurnCorrection;
  };

  Sprite_StateIcon.prototype.nuun_getBuffTurns = function(turns) {
    return this._battler._buffTurns[turns[this._animationIndex]] + TurnCorrection;
  };

  const _Sprite_StateIcon_updateFrame = Sprite_StateIcon.prototype.updateFrame;
  Sprite_StateIcon.prototype.updateFrame = function() {
    _Sprite_StateIcon_updateFrame.call(this);
    this.textSprite.bitmap.clear();
    if (this._stateBuffTurns > 0) {
      this.setupFont();
      this.textSprite.bitmap.drawText(this._stateBuffTurns, 0, 0, ImageManager.iconWidth, ImageManager.iconHeight);
    }
  };

  Sprite_StateIcon.prototype.setupFont = function() {
    this.textSprite.bitmap.fontSize = this.nuun_fontSize() + TurnFontSize;
    this.textSprite.bitmap.textColor = this.nuun_textColor();
    this.textSprite.bitmap.outlineColor = this.nuun_outlineColor();
    this.textSprite.bitmap.outlineWidth = this.nuun_outlineWidth();
  };

  Sprite_StateIcon.prototype.nuun_textColor = function() {
    return ColorManager.normalColor();
  };

  Sprite_StateIcon.prototype.nuun_outlineColor = function() {
    return ColorManager.outlineColor();
  };

  Sprite_StateIcon.prototype.nuun_outlineWidth = function() {
    return 3;
  };

  Sprite_StateIcon.prototype.nuun_fontSize = function() {
    return $gameSystem.mainFontSize();
  };


  Game_BattlerBase.prototype.allStateTurns = function() {
    return this.stateTurns();
  };

  Game_BattlerBase.prototype.allBuffTurns = function() {
    return this.buffTurns();
  };

  Game_BattlerBase.prototype.stateTurns = function() {
    return this.states().filter(state => state.iconIndex > 0);
  };

  Game_BattlerBase.prototype.buffTurns = function() {
    const buffs = [];
    for (let i = 0; i < this._buffs.length; i++) {
      if (this._buffs[i] !== 0) {
          buffs.push(i);
      }
    }
    return buffs;
  };

  Game_BattlerBase.prototype.buffIcons = function() {
    const icons = [];
    for (let i = 0; i < this._buffs.length; i++) {
        if (this._buffs[i] !== 0) {
            icons.push(this.buffIconIndex(this._buffs[i], i));
        }
    }
    return icons;
  };
})();