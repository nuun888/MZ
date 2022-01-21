/*:-----------------------------------------------------------------------------------
 * NUUN_StateTurn.js
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
 * @version 1.1.0
 * 
 * @help
 * ステートアイコンに残りターンを表示します。
 * 
 * 表示ターンモード
 * 'remaining'指定時のデフォルトの補正値は1です。
 * 'elapsed'指定時はターン数補正を-1に設定してください。
 * 経過ターンを表示させるにはステート経過ターンカウントプラグインが必要です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/1/21 Ver.1.1.0
 * ステートのターンの表示方法に経過ターンを追加。（要ステート経過ターンカウント）
 * 2021/9/16 Ver.1.0.2
 * 競合が起きにくいよう一部の関数名を変更。
 * 不要な処理を削除。
 * 2021/9/15 Ver.1.0.1
 * ターン表示が正常に取得できていなかった問題を修正。
 * 自動解除のないステートのターンが表示されていた問題を修正。
 * 2021/9/9 Ver.1.0.0
 * 初版
 * 
 * @param TurnMode
 * @desc 表示するターンモードを指定します。
 * @text 表示ターンモード
 * @type select
 * @option 残りターン
 * @value 'remaining'
 * @option 経過ターン（要ステート経過ターンカウント）
 * @value 'elapsed'
 * @default 'remaining'
 * 
 * @param ActorStateIconVisible
 * @desc 味方のステートに残りターンの表示。
 * @text 味方ステート残りターン表示
 * @type boolean
 * @default true
 * 
 * @param EnemyStateIconVisible
 * @desc 敵のステートに残りターンの表示。
 * @text 敵ステート残りターン表示
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
 * @default 1
 * @type number
 * @min -9999
 * @max 9999
 * 
 */

var Imported = Imported || {};
Imported.NUUN_StateTurn = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_StateTurn');
  const ActorStateIconVisible = eval(parameters['ActorStateIconVisible'] || 'true');
  const EnemyStateIconVisible = eval(parameters['EnemyStateIconVisible'] || 'true');
  const TurnFontSize = Number(parameters['TurnFontSize'] || -4);
  const TurnX = Number(parameters['TurnX'] || 0);
  const TurnY = Number(parameters['TurnY'] || -4);
  const TurnCorrection = Number(parameters['TurnCorrection'] || 1);
  const TurnMode = eval(parameters['TurnMode'] || 'remaining');

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
    const icons = [];
    if (this.shouldDisplay()) {
      icons.push(...this._battler.allIcons());
      if (this._battler.isActor() && ActorStateIconVisible) {
        turns = this._battler.allStateTurns();
      } else if (this._battler.isEnemy() && EnemyStateIconVisible) {
        turns = this._battler.allStateTurns();
      }
    }
    this.createStateIcons(icons, turns);
  };

  Sprite_StateIcon.prototype.createStateIcons = function(icons, turns) {
    this._stateBuffTurns = turns[this._animationIndex] || 0;
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
  
  Game_BattlerBase.prototype.allStateTurns = function() {
    return this.nuun_stateTurns().concat(this.allBuffTurns());
  };
  
  Game_BattlerBase.prototype.allBuffTurns = function() {
    return this.nuun_buffTurns();
  };

  Game_BattlerBase.prototype.nuun_stateTurns = function() {
    return this.states().reduce((r, state) => {
      if (state.iconIndex > 0) {
        return r.concat([this.nuun_isNonRemoval(state) ? 0 : this.nuun_getStateTurn(state.id)]);
      } 
      return r;
    }, []);
  };
  
  Game_BattlerBase.prototype.nuun_buffTurns = function() {
    return this._buffs.reduce((r, buff, i) => {
      if (buff !== 0) {
        return r.concat([this.nuun_getBuffTurn(i)]);
      } else {
        return r;
      }
    }, []);
  };

  Game_BattlerBase.prototype.nuun_isNonRemoval = function(state) {
    return state.autoRemovalTiming === 0;
  };
  
  Game_BattlerBase.prototype.nuun_getStateTurn = function(id) {
    return (Imported.NUUN_StateTurnCount && TurnMode === 'elapsed' ? this.isStateNowTurn(id) : this._stateTurns[id]) + TurnCorrection;
  };
  
  Game_BattlerBase.prototype.nuun_getBuffTurn = function(id) {
    return (Imported.NUUN_StateTurnCount && TurnMode === 'elapsed' ? this.getBuffNowTurn(id) : this._buffTurns[id]) + TurnCorrection;
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

})();