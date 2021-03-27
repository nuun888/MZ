/*:-----------------------------------------------------------------------------------
 * NUUN_BattlePosition.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc エネミー座標調整
 * @author NUUN
 * @version 1.1.0
 *            
 * @help 
 * エネミーの座標、ダメージエフェクトをエネミー毎に設定できます。設定できる範囲外でも配置可能です。
 * 
 * 座標は画面の左上が基準（0, 0)となります。
 * 敵キャラのメモ欄
 * <EnemyPosition_X:[Position]> エネミーのX座標（絶対座標）を指定します。
 * <EnemyPosition_Y:[Position]> エネミーのY座標（絶対座標）を指定します。
 * <EnemyPositionShift_X:[Shift]> エネミーのX座標（相対座標）をずらします。
 * <EnemyPositionShift_Y:[Shift]> エネミーのY座標（相対座標）をずらします。
 * 
 * エネミーのダメージエフェクトの座標を指定します。座標はデフォルトで表示される位置からの座標となります。
 * 敵キャラのメモ欄
 * <EnemyDamage_X:[Position]> エネミーのダメージエフェクトX座標（相対座標）を指定します。
 * <EnemyDamage_Y:[Position]> エネミーのダメージエフェクトY座標（相対座標）を指定します。
 * 
 * [Position]:座標　例:<EnemyPosition_X:100>
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/3/27 Ver.1.1.0
 * 敵の座標をシフトさせる機能を追加。
 * 2021/1/17 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyPosition = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_EnemyPosition');

  const _Game_Enemy_screenX = Game_Enemy.prototype.screenX;
  Game_Enemy.prototype.screenX = function() {
    const Position = this.enemy().meta.EnemyPosition_X ? Number(this.enemy().meta.EnemyPosition_X) : _Game_Enemy_screenX.call(this);
    return this.enemy().meta.EnemyPositionShift_X ? Position + Number(this.enemy().meta.EnemyPositionShift_X) : Position;
  };

  const _Game_Enemy_screenY = Game_Enemy.prototype.screenY;
  Game_Enemy.prototype.screenY = function() {
    const Position = this.enemy().meta.EnemyPosition_Y ? Number(this.enemy().meta.EnemyPosition_Y) : _Game_Enemy_screenY.call(this);
    return this.enemy().meta.EnemyPositionShift_Y ? Position + Number(this.enemy().meta.EnemyPositionShift_Y) : Position;
  };

  const _Sprite_Enemy_damageOffsetX  = Sprite_Enemy.prototype.damageOffsetX;
  Sprite_Enemy.prototype.damageOffsetX = function() {
    return (this._enemy.enemy().meta.EnemyDamage_X ? Number(this._enemy.enemy().meta.EnemyDamage_X) : 0) + _Sprite_Enemy_damageOffsetX.call(this);
  };

  const _Sprite_Enemy_damageOffsetY = Sprite_Enemy.prototype.damageOffsetY;
  Sprite_Enemy.prototype.damageOffsetY = function() {
    return (this._enemy.enemy().meta.EnemyDamage_Y ? Number(this._enemy.enemy().meta.EnemyDamage_Y) : 0) + _Sprite_Enemy_damageOffsetY.call(this);
  };

})();
