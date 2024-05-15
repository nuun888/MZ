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
 * @plugindesc State, buff remaining turn display
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.6
 * 
 * @help
 * Show remaining turns on the state icon.
 * 
 * Display turn mode
 * 'remaining':The default correction value when specified is 1.。
 * 'elapsed':When specifying, set the number of turns correction to -1.
 * "NUUN_StateTurnCount" is required to display elapsed turns.
 * 
 * Turn text color
 * state notes
 * <BatState> A state with this tag is a disadvantageous state. Therefore, the color of the disadvantageous state and debuff turn is applied.
 * For states without the above tags, advantageous states and buff turn colors are applied.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 5/15/2024 Ver.1.1.6
 * Fixed an issue where state turns were not displayed.
 * 3/2/2024 Ver.1.1.5
 * Fixed an issue where the turn display would be misaligned when the state display was specified with "NUUN_BattleStyleEX".
 * 8/23/2023 Ver.1.1.4
 * Fixed an issue where an error would occur when fighting an enemy group with monsters appearing in the middle.
 * 3/30/2022 Ver.1.1.3
 * Fixed an issue where the number of turns was not displayed correctly when the auto release timing was at the end of the turn.
 * 1/3/2023 Ver.1.1.2
 * Changed the Type of color specification plug-in parameter to color. (Ver.1.6.0 or later)
 * Changed the display in languages other than Japanese to English.
 * 10/29/2022 Ver.1.1.1
 * Added a function that allows you to change the character color of disadvantage, state, and buff turn numbers.
 * 1/21/2022 Ver.1.1.0
 * Added Elapsed Turns to how state turns are displayed. (Requires "NUUN_StateTurnCount")
 * 9/16/2021 Ver.1.0.2
 * Changed some function names to avoid conflicts.
 * Removed unnecessary processing.
 * 9/15/2021 Ver.1.0.1
 * Fixed an issue where the turn display could not be acquired properly.
 * Fixed an issue where turns in states without auto-release were displayed.
 * 9/9/2021 Ver.1.0.0
 * First edition.
 * 
 * @param TurnMode
 * @desc Specifies the turn mode to display.
 * @text Display turn mode
 * @type select
 * @option Remaining turn
 * @value 'remaining'
 * @option Elapsed turns (requires ``NUUN_StateTurnCount'')
 * @value 'elapsed'
 * @default 'remaining'
 * 
 * @param ActorStateIconVisible
 * @desc Remaining turn indication on allied state icons.
 * @text Allied state remaining turn display
 * @type boolean
 * @default true
 * 
 * @param EnemyStateIconVisible
 * @desc Remaining turn display on enemy state icon.
 * @text Enemy state remaining turn display
 * @type boolean
 * @default true
 * 
 * @param TurnX
 * @desc Turn coordinate X. (relative)
 * @text Turn coordinate X (relative)
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param TurnY
 * @desc Turn coordinate Y. (relative)
 * @text Turn coordinate Y (relative)
 * @type number
 * @default -4
 * @min -9999
 * 
 * @param TurnFontSize
 * @desc Font size for turns. (from main font)
 * @text Turn font size
 * @type number
 * @default -4
 * @min -9999
 * 
 * @param TurnCorrection
 * @text Correction of the number of turns
 * @desc Correct the display of the number of turns.
 * @default 1
 * @type number
 * @min -9999
 * @max 9999
 * 
 * @param TurnColor
 * @text Advantageous state, color of buff turn
 * @desc Advantageous state, system color number for debuff turns. (Color code can be entered from the text tab)
 * @type color
 * @default 0
 * 
 * @param BadTurnColor
 * @text Unfavorable state, debuff turn color
 * @desc System color number for unfavorable states and debuff turns. (Color code can be entered from the text tab)
 * @type color
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ステート、バフ残りターン表示
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.6
 * 
 * @help
 * ステートアイコンに残りターンを表示します。
 * 
 * 表示ターンモード
 * 'remaining'指定時のデフォルトの補正値は1です。
 * 'elapsed'指定時はターン数補正を-1に設定してください。
 * 経過ターンを表示させるにはステート経過ターンカウントプラグインが必要です。
 * 
 * ターンの文字色
 * ステートのメモ欄  
 * <BatState> このタグがあるステートは不利なステートになります。よって不利ステート、デバフターンの色が適用されます。  
 * 上記タグがないステートは有利ステート、バフターンの色が適用されます。  
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/5/15 Ver.1.1.6
 * ステートターンが表示されない問題を修正。
 * 2024/3/2 Ver.1.1.5
 * バトルスタイル拡張プラグインでステートの表示を指定している場合に、ターンの表示がずれて表示されてしまう問題を修正。
 * 2023/8/23 Ver.1.1.4
 * 途中から出現するモンスターがいる敵グループと戦闘を行うとエラーが出る問題を修正。
 * 2022/3/30 Ver.1.1.3
 * 自動解除のタイミングがターン終了時の時にターン数が正常に表示されていなかった問題を修正。
 * 2023/1/3 Ver.1.1.2
 * カラー指定のプラグインパラメータのTypeをcolorに変更。(Ver.1.6.0以降)
 * 日本語以外での表示を英語表示に変更。
 * 2022/10/29 Ver.1.1.1
 * 不利、ステート、バフのターン数の文字色を変更できる機能を追加。
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
 * @param TurnColor
 * @text 有利ステート、バフターンの色
 * @desc 有利なステート、デバフのターンのシステムカラー番号。(テキストタブからカラーコード入力可能)
 * @type color
 * @default 0
 * 
 * @param BadTurnColor
 * @text 不利ステート、デバフターンの色
 * @desc 不利なステート、デバフのターンのシステムカラー番号。(テキストタブからカラーコード入力可能)
 * @type color
 * @default 0
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
  const TurnColor = (DataManager.nuun_structureData(parameters['TurnColor'])) || 0;
  const BadTurnColor = (DataManager.nuun_structureData(parameters['BadTurnColor'])) || 0;

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
    let turns = [];
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
    const state = turns[this._animationIndex];
    this._stateBuffTurns = state && state.turn > 0 ? turns[this._animationIndex].turn : 0;
    this._trunTextColor = state && state.bad ? BadTurnColor : TurnColor;
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
    const turns = this.nuun_stateTurns();
    Array.prototype.push.apply(turns, this.allBuffTurns());
    return turns;
  };
  
  Game_BattlerBase.prototype.allBuffTurns = function() {
    return this.nuun_buffTurns();
  };

  Game_BattlerBase.prototype.nuun_stateTurns = function() {
    return this.nuun_stateTurnFilter().reduce((r, state) => {
        if (state.iconIndex > 0) {
            const turn = [{turn: (this.nuun_isNonRemoval(state) ? 0 : this.nuun_getStateTurn(state.id) + (state.autoRemovalTiming === 2 ? -1 : 0)), bad: !!state.meta.BatState}];
            Array.prototype.push.apply(r, turn);
        }
        return r;
    }, []);
  };

    Game_BattlerBase.prototype.nuun_stateTurnFilter = function() {
        if (this.statesFilter && BattleManager.bsVisibleStates && BattleManager.bsVisibleStates.length > 0) {
            return this.statesFilter();
        } else {
            return this.states();
        }
    };
  
  Game_BattlerBase.prototype.nuun_buffTurns = function() {
    return this._buffs.reduce((r, buff, i) => {
        if (buff !== 0 && this.nuun_buffTurnsFilter(i)) {
            const turn = [{turn: this.nuun_getBuffTurn(i), bad: buff < 0}];
            Array.prototype.push.apply(r, turn);
        }
        return r;
    }, []);
  };

  Game_BattlerBase.prototype.nuun_buffTurnsFilter = function(id) {
    return this.buffsFilter ? this.buffsFilter(id) : true;
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
    return NuunManager.getColorCode(this._trunTextColor);
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