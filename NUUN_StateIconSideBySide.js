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
 * @plugindesc  ステート横並び表示
 * @author NUUN
 * @version 1.3.0
 * 
 * @help
 * 戦闘中に表示するステートを横並び表示にします。
 * このプラグインには残りターンを表示する機能が備わっているため、ステート、バフ残りターン表示プラグインとの
 * 併用はできません。
 * Ver.1.0.3以前とプラグイン名及びプラグインパラメータが変更になっていますので再度設定してください。
 * 
 * 表示ターンモード
 * 'remaining'指定時のデフォルトの補正値は1です。
 * 'elapsed'指定時はターン数補正を-1に設定してください。
 * 経過ターンを表示させるにはステート経過ターンカウントプラグインが必要です。
 * 
 * 敵キャラの画像を拡大等をするプラグインと併用する場合、画像に乱れが生じる場合があります。
 * 気になるようでしたら敵ステート表示拡張と併用してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/4/9 Ver.1.3.0
 * 表示アイコンの行を指定できる機能を追加。
 * 処理の軽量化。
 * 2022/3/31 Ver.1.2.3
 * 疑似3Dバトルとの併用時にアクターのステートが表示されない問題を修正。
 * 2022/3/30 Ver.1.2.2
 * ステートが表示できる個数を超えて付加されている時に画像が乱れる問題を修正。
 * 2022/3/28 Ver.1.2.1
 * 特定のプラグインにてアイコン表示部分に線のような画像が表示されてしまう問題を修正。
 * 2022/1/21 Ver.1.2.0
 * ステートのターンの表示方法に経過ターンを追加。（要ステート経過ターンカウント）
 * 2021/9/23 Ver.1.1.0
 * ステートの表示切り替え反映による処理の大幅変更。
 * 敵にも横並び表示に出来る機能を追加。
 * 2021/1/24 Ver.1.0.3
 * バトルスタイル拡張併用時の処理を再度修正。
 * 2021/1/17 Ver.1.0.2
 * バトルスタイル拡張プラグイン導入時、ステートの座標許可をtureにすると座標が反映されない問題を修正。
 * バトルスタイル拡張プラグイン2.0.0以降対応。
 * 2021/1/3 Ver.1.0.1
 * 表示する横幅を指定できるように変更。
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
 * @param ActorStateIcon
 * @text 味方ステートアイコン
 * @default ------------------------------
 * 
 * @param ActorStateIconShowVal
 * @desc 味方のステート列数。
 * @text 味方ステート列数
 * @type number
 * @default 5
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
 * @param StateTurn
 * @text ターン表示設定
 * @default ------------------------------
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
 * @parent StateTurn
 * 
 * @param ActorStateIconVisible
 * @desc 味方のステートに残りターンの表示。
 * @text 味方ステート残りターン表示
 * @type boolean
 * @default false
 * @parent StateTurn
 * 
 * @param EnemyStateIconVisible
 * @desc 敵のステートに残りターンの表示。
 * @text 敵ステート残りターン表示
 * @type boolean
 * @default false
 * @parent StateTurn
 * 
 * @param TurnX
 * @desc ターン座標X（相対）
 * @text ターン座標X（相対）
 * @type number
 * @default 0
 * @min -9999
 * @parent StateTurn
 * 
 * @param TurnY
 * @desc ターン座標Y（相対）
 * @text ターン座標Y（相対）
 * @type number
 * @default -4
 * @min -9999
 * @parent StateTurn
 * 
 * @param TurnFontSize
 * @desc ターンのフォントサイズ。（メインフォントから）
 * @text ターンフォントサイズ
 * @type number
 * @default -4
 * @min -9999
 * @parent StateTurn
 * 
 * @param TurnCorrection
 * @text ターン数補正
 * @desc ターン数の表示を補正します。
 * @default 1
 * @type number
 * @min -9999
 * @max 9999
 * @parent StateTurn
 * 
 */

var Imported = Imported || {};
Imported.NUUN_StateIconSideBySide = true;

(() => {
const parameters = PluginManager.parameters('NUUN_StateIconSideBySide');
let StateIconWidth = Number(parameters['StateIconWidth'] || 0);
const ActorStateIconShowVal = Number(parameters['ActorStateIconShowVal'] || 5);
const ActorStateIconRows = Number(parameters['ActorStateIconRows'] || 1);
const EnemyStateIconShowVal = Number(parameters['EnemyStateIconShowVal'] || 1);
const EnemyStateIconRows = Number(parameters['EnemyStateIconRows'] || 1);
const ActorStateIconAlign = eval(parameters['ActorStateIconAlign'] || 'right');
const EnemyStateIconAlign = eval(parameters['EnemyStateIconAlign'] || 'center');
const ActorStateIconVisible = eval(parameters['ActorStateIconVisible'] || 'true');
const EnemyStateIconVisible = eval(parameters['EnemyStateIconVisible'] || 'true');
const TurnMode = eval(parameters['TurnMode'] || 'remaining');
const TurnFontSize = Number(parameters['TurnFontSize'] || -4);
const TurnX = Number(parameters['TurnX'] || 0);
const TurnY = Number(parameters['TurnY'] || -4);
const TurnCorrection = Number(parameters['TurnCorrection'] || 1);
let isEnemyMode = false;

const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
  isEnemyMode = true;
  _Sprite_Enemy_initMembers.call(this);
};


const _Sprite_StateIcon_initialize = Sprite_StateIcon.prototype.initialize;
Sprite_StateIcon.prototype.initialize = function() {
  _Sprite_StateIcon_initialize.call(this);
};

const _Sprite_StateIcon_initMembers = Sprite_StateIcon.prototype.initMembers;
Sprite_StateIcon.prototype.initMembers = function() {
  _Sprite_StateIcon_initMembers.call(this);
};

Sprite_StateIcon.prototype.bitmapWidth = function() {
  return Math.min(ImageManager.iconWidth * this.getStateIconShowVal(), StateIconWidth);
};

Sprite_StateIcon.prototype.bitmapHeight = function() {
  return ImageManager.iconHeight * this.getMaxStateIconRows();
};

Sprite_StateIcon.prototype.loadBitmap = function() {//再定義
  this._iconSprite = [];
  this.createSprite();
};

Sprite_StateIcon.prototype.createSprite = function() {
  for (let i = 0; i < this.getMaxStateIconShowVal() * this.getMaxStateIconRows(); i++) {
    const sprite = new Sprite();
    this.addChild(sprite);
    this._iconSprite.push(sprite);
    this.setInitIcon(sprite, i);
    this.textTurn(sprite);
  }
  isEnemyMode = false;
};

Sprite_StateIcon.prototype.textTurn = function(sprite) {
  const textSprite = new Sprite();
  sprite.addChild(textSprite);
  sprite.turnSprite = textSprite;
  textSprite.x = TurnX;
  textSprite.y = TurnY;
  textSprite.bitmap = new Bitmap(ImageManager.iconWidth, ImageManager.iconHeight);
};

Sprite_StateIcon.prototype.setInitIcon = function(sprite, i) {
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  this._animationCount = 0;
  this._animationIndex = 0;
  sprite.bitmap = ImageManager.loadSystem("IconSet");
  sprite.setFrame(0, 0, 0, 0);
};

Sprite_StateIcon.prototype.stateIconWidth = function(iconlength) {
  return ImageManager.iconWidth * (iconlength- 1);
};

Sprite_StateIcon.prototype.stateIconDisplay = function(iconlength) {
  if (this._battler && this._battler.isActor()) {
    return this.stateIconDisplayAlign(iconlength, ActorStateIconAlign);
  } else {
    return this.stateIconDisplayAlign(iconlength, EnemyStateIconAlign);
  }
};

Sprite_StateIcon.prototype.stateIconDisplayAlign = function(iconlength, align) {
  if (align === 'center') {
    return Math.floor(this.stateIconWidth(iconlength) / 2) * -1;
  } else if (align === 'right') {
    return this.stateIconWidth(iconlength) * -1;
  }
  return 0;
};

Sprite_StateIcon.prototype.createStateIcons = function(icons, turns) {
  let displayIcons = [];
  let displayTurn = [];
  displayIcons = icons.slice(this._animationIndex, this._animationIndex + this.getStateIconShowVal() * this.getStateIconRows());
  displayTurn = turns.slice(this._animationIndex, this._animationIndex + this.getStateIconShowVal() * this.getStateIconRows());
    this._iconSprite.forEach((sprite, r) => {
    if (displayIcons[r]) {
      sprite._iconIndex = displayIcons[r];
      sprite._stateTurn = displayTurn[r];
      sprite.visible = true;
    } else {
      sprite._iconIndex = 0;
      sprite._stateTurn = 0;
      sprite.visible = false;
    }
  });
  this.displayIconsLength = displayIcons.length;
};

Sprite_StateIcon.prototype.updateIcon = function() {//再定義
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
  if (icons.length > 0) {
      this._animationIndex += this.getStateIconShowVal() * this.getStateIconRows();
      if (this._animationIndex >= icons.length) {
          this._animationIndex = 0;
      }
      this._iconIndex = icons.length;
      this.visible = true;
  } else {
      this._animationIndex = 0;
      this._iconIndex = 0;
      this.visible = false;
  }
};

Sprite_StateIcon.prototype.updateFrame = function() {//再定義
  const iconsLength = this.displayIconsLength;
  const showLength = Math.min(iconsLength, this.getStateIconShowVal());
  this._iconSprite.forEach((sprite, r) => {
    sprite.x = Math.floor(r % this.getStateIconShowVal()) * this.iconX(showLength) + this.stateIconDisplay(showLength);
    sprite.y = Math.floor(r / this.getStateIconShowVal()) * ImageManager.iconHeight;
    if (sprite.visible) {
      this.setFrameIcon(sprite);
      this.setTurn(sprite);
    }
  });
};

Sprite_StateIcon.prototype.setFrameIcon = function(sprite) {
  const pw = ImageManager.iconWidth;
  const ph = ImageManager.iconHeight;
  const sx = (sprite._iconIndex % 16) * pw;
  const sy = Math.floor(sprite._iconIndex / 16) * ph;
  sprite.setFrame(sx, sy, pw, ph);
};

Sprite_StateIcon.prototype.setTurn = function(sprite) {
  sprite.turnSprite.bitmap.clear();
  if (sprite._stateTurn > 0) {
    const textSprite = sprite.turnSprite;
    this.setupFont(textSprite);
    textSprite.bitmap.drawText(sprite._stateTurn, 0, 0, ImageManager.iconWidth, ImageManager.iconHeight);
  }
};

Sprite_StateIcon.prototype.iconX = function(iconsLength) {
	if (StateIconWidth > 0 && ImageManager.iconWidth * iconsLength > StateIconWidth) {
		return Math.floor(StateIconWidth / iconsLength);
	}
	return ImageManager.iconWidth;
};

Sprite_StateIcon.prototype.getStateIconShowVal = function() {
  return this._battler && this._battler.isActor() ? ActorStateIconShowVal : EnemyStateIconShowVal;
};

Sprite_StateIcon.prototype.getMaxStateIconShowVal = function() {
  if (this._battler) {
    return this.getStateIconShowVal();
  } else {
    return isEnemyMode ? EnemyStateIconShowVal : ActorStateIconShowVal;
  }
};

Sprite_StateIcon.prototype.getStateIconRows = function() {
  return this._battler && this._battler.isActor() ? ActorStateIconRows : EnemyStateIconRows;
};

Sprite_StateIcon.prototype.getMaxStateIconRows = function() {
  if (this._battler) {
    return this.getStateIconRows();
  } else {
    return isEnemyMode ? EnemyStateIconRows : ActorStateIconRows;
  }
};

Sprite_StateIcon.prototype.setupFont = function(sprite) {
  sprite.bitmap.fontSize = this.nuun_fontSize() + TurnFontSize;
  sprite.bitmap.textColor = this.nuun_textColor();
  sprite.bitmap.outlineColor = this.nuun_outlineColor();
  sprite.bitmap.outlineWidth = this.nuun_outlineWidth();
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


const _Window_BattleStatus_stateIconX = Window_BattleStatus.prototype.stateIconX;
Window_BattleStatus.prototype.stateIconX = function(rect) {
  if (ActorStateIconAlign === 'center') {
    return rect.x + rect.width / 2;
  } else if (ActorStateIconAlign === 'left') {
    return rect.x + ImageManager.iconWidth / 2 - 4;
  } else {
    return _Window_BattleStatus_stateIconX.call(this, rect);
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
  return this.states().reduce((r, state) => {
    if (state.iconIndex > 0) {
      const turn = [this.nuun_isNonRemoval(state) ? 0 : this.nuun_getStateTurn(state.id)];
      Array.prototype.push.apply(r, turn);
    } 
    return r;
  }, []);
};

Game_BattlerBase.prototype.nuun_buffTurns = function() {
  return this._buffs.reduce((r, buff, i) => {
    if (buff !== 0) {
      const turn = [this.nuun_getBuffTurn(i)];
      Array.prototype.push.apply(r, turn);
    }
      return r;
  }, []);
};

Game_BattlerBase.prototype.nuun_isNonRemoval = function(state) {
  return state.autoRemovalTiming === 0;
};

Game_BattlerBase.prototype.nuun_getStateTurn = function(id) {
  return (Imported.NUUN_StateTurnCount && TurnMode === 'elapsed' ? this.getStateNowTurn(id) : this._stateTurns[id]) + TurnCorrection;
};

Game_BattlerBase.prototype.nuun_getBuffTurn = function(id) {
  return (Imported.NUUN_StateTurnCount && TurnMode === 'elapsed' ? this.getBuffNowTurn(id) : this._buffTurns[id]) + TurnCorrection;
};

})();