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
 * エネミーのメモ欄に<BigEnemy>を記入してください。
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

  const Padding = Window_Base.prototype.itemPadding.call(Window_Base);

  const _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
  Sprite_Battler.prototype.initMembers = function() {
    _Sprite_Battler_initMembers.call(this);
    this._bigEnemy = false;
  };

  const _Sprite_Battler_updateBitmap = Sprite_Battler.prototype.updateBitmap;
  Sprite_Battler.prototype.updateBitmap = function() {
    _Sprite_Battler_updateBitmap.call(this);
    if(this._bigEnemy){
      this.scale.x = Graphics.width / this.width;
      this.scale.y = Graphics.height / this.height;
      this._homeX = Graphics.boxWidth / 2 + (Imported.NUUN_BattlePosition ? 0 : -4);
      this._homeY = Graphics.height + 20;
    }
  };

  Sprite_Enemy.prototype.setHome = function(x, y) {
    Sprite_Battler.prototype.setHome.call(this, x, y);
    if($dataEnemies[this._enemy._enemyId].meta.BigEnemy){
      this._bigEnemy = true;
    }
  };
})();
