/*:-----------------------------------------------------------------------------------
 * NUUN_BigEnemy.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11/22 Ver 1.0.0
 */ 
/*:
 * @target MZ
 * @plugindesc 巨大エネミー
 * @author NUUN
 *            
 * @help 画面いっぱいにエネミー画像を表示します。
 * エネミーのメモ欄に以下のどちらかを記入してください。
 * <BigEnemy> 画像を画面サイズに合わせます。
 * <BigEnemy:OriginalRatio> 比率を変更せず横幅の倍率基準で拡大します。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BigEnemy = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_BigEnemy');

  const _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
  Sprite_Battler.prototype.initMembers = function() {
    _Sprite_Battler_initMembers.call(this);
    this._bigEnemy = false;
  };

  const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function(battler) {
    _Sprite_Enemy_setBattler.call(this, battler);
    if($dataEnemies[battler._enemyId].meta.BigEnemy){
      this._bigEnemy = $dataEnemies[battler._enemyId].meta.BigEnemy;
    }
  };

  const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
  Sprite_Enemy.prototype.updateBitmap = function() {
    _Sprite_Enemy_updateBitmap.call(this);
    if(this._bigEnemy){
      this.scale.x = Graphics.width / this.width;
      this._homeX = Graphics.boxWidth / 2;
      let height = 0;
      if(this._bigEnemy === 'OriginalRatio') {
        this.scale.y = this.scale.x;
        height = (Graphics.height - this.height * this.scale.y) / 2;
      } else {
        this.scale.y = Graphics.height / this.height;
      }
      this._homeY = (Graphics.height - Graphics.boxHeight) / 2 + Graphics.boxHeight + 24 - height;
    }
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
      y -= Graphics.boxHeight / 2;
    }
    return y;
  };

})();
