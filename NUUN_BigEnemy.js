/*:-----------------------------------------------------------------------------------
 * NUUN_BigEnemy.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc 巨大エネミー
 * @author NUUN
 * @version 1.1.0
 *            
 * @help 画面いっぱいにエネミー画像を表示します。
 * エネミーのメモ欄に以下のどちらかを記入してください。
 * <BigEnemy> 画像を画面サイズに合わせます。
 * <BigEnemy:OriginalRatio> 比率を変更せず横幅の倍率基準で拡大します。
 * <BigEnemy:UnderPosition> 画像を原寸倍率で画面下に合わせ表示させます。画像のサイズ調整はいたしません。
 * 
 * オプションタグ　エネミーのメモ欄
 * <BigEnemyFront> 画像を一番手前側に表示させます。
 * <BigEnemyY:50> Y座標を50下にシフトして表示します。
 * 
 * このプラグインはフロントビューで使用することを前提しています。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/3/18 Ver.1.1.0
 * モンスター画像の下に合わせて表示する機能を追加。
 * ２回目の戦闘以降にモンスターが手前に表示される問題を修正。
 * 2021/3/17 Ver.1.0.3
 * Y座標を調整できる機能を追加。
 * 2021/1/17 Ver.1.0.2
 * 常に後ろに表示されるように変更。
 * 2020/12/15 Ver.1.0.1
 * OriginalRatioモードの時にポップアップの位置がずれるのを修正。
 * 2020/11/22 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BigEnemy = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_BigEnemy');

  const _Game_Enemy_screenY = Game_Enemy.prototype.screenY;
  Game_Enemy.prototype.screenY = function() {
    if (this.enemy().meta.BigEnemy) {
      return this.enemy().meta.BigEnemyFront ? Graphics.height : 0;
    } else {
      return _Game_Enemy_screenY.call(this);
    }
  };

  const _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
  Sprite_Battler.prototype.initMembers = function() {
    _Sprite_Battler_initMembers.call(this);
    this._bigEnemy = false;
  };

  const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function(battler) {
    _Sprite_Enemy_setBattler.call(this, battler);
    if (battler.enemy().meta.BigEnemy) {
      this._bigEnemy = battler.enemy().meta.BigEnemy;
      if (this._bigEnemy) {
        const name = this._enemy.battlerName();
        if ($gameSystem.isSideView()) {
          ImageManager.loadSvEnemy(name);
        } else {
          ImageManager.loadEnemy(name);
        }
        if (this.bitmap && !this.bitmap.isReady()) {
          this.bitmap.addLoadListener(this.setBigEnemy.bind(this));
        }
      }
    }
  };

  Sprite_Enemy.prototype.setBigEnemy = function() {
    const bitmap = this.bitmap;
    if (this._bigEnemy === "UnderPosition") {
      this._homeY = Graphics.height + 20;
    } else {
      this.scale.x = Graphics.width / bitmap.width;
      this._homeX = Graphics.boxWidth / 2;
      let height = 0;
      if (this._bigEnemy === 'OriginalRatio') {
        this.scale.y = this.scale.x;
        height = Math.floor((Graphics.height - bitmap.height * this.scale.y) / 2);
      } else {
        this.scale.y = Graphics.height / bitmap.height;
      }
      this._homeY = Math.floor((Graphics.height - Graphics.boxHeight) / 2 + Graphics.boxHeight) + 24 - height;
    }
    this._homeY += this._enemy.enemy().meta.BigEnemyY ? Number(this._enemy.enemy().meta.BigEnemyY) : 0;
    this.updatePosition();
  };

  const _Sprite_Enemy_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
  Sprite_Enemy.prototype.updateStateSprite = function() {
    _Sprite_Enemy_updateStateSprite.call(this);
    if(this._bigEnemy && this._bigEnemy !== "UnderPosition"){
      this._stateIconSprite.y = (40 - this.y) / this.scale.y;
      this._stateIconSprite.scale.x = 1 / this.scale.x;
      this._stateIconSprite.scale.y = 1 / this.scale.y;
    }
  };

  const _Sprite_Enemy_damageOffsetY = Sprite_Enemy.prototype.damageOffsetY;
  Sprite_Enemy.prototype.damageOffsetY = function() {
    let y = _Sprite_Enemy_damageOffsetY.call(this);
    if(this._bigEnemy){
      if (this._bigEnemy === "OriginalRatio") {
        y -= this.bitmap.height * this.scale.y / 2
      } else if (this._bigEnemy === "UnderPosition") {
        y -= this.bitmap.height / 2;
      } else {
        y -= Graphics.boxHeight / 2
      }
    }
    return y;
  };

  const _Sprite_Enemy_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
  Sprite_Enemy.prototype.loadBitmap = function(name) {
    _Sprite_Enemy_loadBitmap.call(this, name);
    if (this._bigEnemy) {
      if (this.bitmap && !this.bitmap.isReady()) {
        this.bitmap.addLoadListener(this.setBigEnemy.bind(this));
      } else {
        this.setBigEnemy();
      }
    }
  };

})();
