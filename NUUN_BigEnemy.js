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
 * @version 1.0.3
 *            
 * @help 画面いっぱいにエネミー画像を表示します。
 * エネミーのメモ欄に以下のどちらかを記入してください。
 * <BigEnemy> 画像を画面サイズに合わせます。
 * <BigEnemy:OriginalRatio> 比率を変更せず横幅の倍率基準で拡大します。
 * <BigEnemyY:50> Y座標を調整します。
 * 
 * このプラグインはフロントビューで使用することを前提しています。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
    return this.enemy().meta.BigEnemy ? 0 : _Game_Enemy_screenY.call(this);
  };

  const _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
  Sprite_Battler.prototype.initMembers = function() {
    _Sprite_Battler_initMembers.call(this);
    this._bigEnemy = false;
  };

  const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function(battler) {
    _Sprite_Enemy_setBattler.call(this, battler);
    if($dataEnemies[battler._enemyId].meta.BigEnemy){
      const name = this._enemy.battlerName();
      this._bigEnemy = battler.enemy().meta.BigEnemy;
      if ($gameSystem.isSideView()) {
        bitmap = ImageManager.loadSvEnemy(name);
      } else {
        bitmap = ImageManager.loadEnemy(name);
      }
      if (this._bigEnemy) {
        if (bitmap && !bitmap.isReady()) {
          bitmap.addLoadListener(this.setBigEnemy.bind(this, bitmap, battler));
        } else {
          this.setBigEnemy(bitmap, battler);
        }
      }
    }
  };

  Sprite_Enemy.prototype.setBigEnemy = function(bitmap, battler) {
    this.scale.x = Graphics.width / bitmap.width;
    this._homeX = Graphics.boxWidth / 2;
    let height = 0;
    if(this._bigEnemy === 'OriginalRatio') {
      this.scale.y = this.scale.x;
      height = Math.floor((Graphics.height - bitmap.height * this.scale.y) / 2);
    } else {
      this.scale.y = Graphics.height / bitmap.height;
    }
    this._homeY = Math.floor((Graphics.height - Graphics.boxHeight) / 2 + Graphics.boxHeight) + 24 - height;
    this._homeY += battler.enemy().meta.BigEnemyY ? Number(battler.enemy().meta.BigEnemyY) : 0;
    this.updatePosition();
  };

  const _Sprite_Enemy_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
  Sprite_Enemy.prototype.updateStateSprite = function() {
    _Sprite_Enemy_updateStateSprite.call(this);
    if(this._bigEnemy){
      this._stateIconSprite.y = (40 - this.y) / this.scale.y;
      this._stateIconSprite.scale.x = 1 / this.scale.x;
      this._stateIconSprite.scale.y = 1 / this.scale.y;
    }
  };

  const _Sprite_Enemy_damageOffsetY = Sprite_Enemy.prototype.damageOffsetY;
  Sprite_Enemy.prototype.damageOffsetY = function() {
    let y = _Sprite_Enemy_damageOffsetY.call(this);
    if(this._bigEnemy){
      y -= Math.floor(this._bigEnemy === 'OriginalRatio' ? this.bitmap.height * this.scale.y / 2 : Graphics.boxHeight / 2);
    }
    return y;
  };

})();
