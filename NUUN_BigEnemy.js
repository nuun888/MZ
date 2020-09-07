/*:-----------------------------------------------------------------------------------
 * NUUN_BigEnemy.js
 * -------------------------------------------------------------------------------------
 */
/*:ja
 * @target MZ
 * @plugindesc 巨大エネミー
 * @author ヽ(´ω`)ノ
 *            
 * @help 画面いっぱいにエネミー画像を表示します。
 * エネミーのメモ欄に以下のどちらかを記入してください。
 * <BigEnemy> 画像を画面サイズに合わせます。
 * <BigEnemy:OriginalRatio> 比率を変更せず横幅の倍率基準で拡大します。
 * なおこのプラグインはフロントビュー専用です。
 * 
 * 
 * 利用規約
 * このプラグインの使用に制限はありません。
 * 商用、アダルト等のゲームでも使用可能です。
 * クレジット表記は任意です。
 * 
 * 更新履歴
 * ver 1.0.0（初版）
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

  const _Sprite_Battler_updateBitmap = Sprite_Battler.prototype.updateBitmap;
  Sprite_Battler.prototype.updateBitmap = function() {
    _Sprite_Battler_updateBitmap.call(this);
    if(this._bigEnemy && !$gameSystem.isSideView()){
      this.scale.x = Graphics.width / this.width;
      this.scale.y = (this._bigEnemy === 'OriginalRatio' ? this.scale.x : Graphics.height / this.height);
      this._homeX = Graphics.boxWidth / 2;
      let height = 0;
      if(this._bigEnemy === 'OriginalRatio'){
        height = (Graphics.height - this.height * this.scale.y) / 2;
      }
      this._homeY = (Graphics.height - Graphics.boxHeight) / 2 + Graphics.boxHeight + 24 - height;
    }
  };

  Sprite_Enemy.prototype.setHome = function(x, y) {
    Sprite_Battler.prototype.setHome.call(this, x, y);
    if($dataEnemies[this._enemy._enemyId].meta.BigEnemy){
      this._bigEnemy = $dataEnemies[this._enemy._enemyId].meta.BigEnemy;
    }
  };
})();
