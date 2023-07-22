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
 * @plugindesc Enemy coordinate adjustment
 * @author NUUN
 * @version 1.1.1
 *            
 * @help 
 * Monster coordinates and damage effects can be set for each monster. It is also possible to place it outside the range that can be set.
 * 
 * The coordinates are based on the upper left corner of the screen (0, 0).
 * <EnemyPosition_X:[Position]> Specifies the X coordinate (absolute coordinate) of the monster.
 * <EnemyPosition_Y:[Position]> Specifies the Y coordinate (absolute coordinate) of the monster.
 * <EnemyPositionShift_X:[Shift]> Shift the monster's X coordinate (relative coordinate).
 * <EnemyPositionShift_Y:[Shift]> Shift the monster's Y coordinate (relative coordinate).
 * 
 * Specifies the coordinates of the monster damage effect. Coordinates are from the position displayed by default.
 * <EnemyDamage_X:[Position]> Specifies the monster's damage effect X coordinate (relative coordinate).
 * <EnemyDamage_Y:[Position]> Specifies the monster's damage effect Y coordinate (relative coordinate).
 * 
 * [Position]:Coordinates 
 * Example: <EnemyPosition_X:100>
 * 
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/22/2023 Ver.1.1.1
 * Added ability to shift enemy common coordinates.
 * 3/27/2021 Ver.1.1.0
 * Added ability to shift enemy coordinates.
 * 1/17/2021 Ver.1.0.0
 * First edition.
 * 
 * @param DefaultCommonX
 * @desc Sets the X coordinate shift value for common monsters.
 * @text Common X coordinate
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param DefaultCommonY
 * @desc Sets the Y coordinate shift value for common monsters.
 * @text Common Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc モンスター座標調整
 * @author NUUN
 * @version 1.1.1
 *            
 * @help 
 * モンスターの座標、ダメージエフェクトをモンスター毎に設定できます。設定できる範囲外でも配置可能です。
 * 
 * 座標は画面の左上が基準（0, 0)となります。
 * <EnemyPosition_X:[Position]> モンスターのX座標（絶対座標）を指定します。
 * <EnemyPosition_Y:[Position]> モンスターのY座標（絶対座標）を指定します。
 * <EnemyPositionShift_X:[Shift]> モンスターのX座標（相対座標）をずらします。
 * <EnemyPositionShift_Y:[Shift]> モンスターのY座標（相対座標）をずらします。
 * 
 * モンスターのダメージエフェクトの座標を指定します。座標はデフォルトで表示される位置からの座標となります。
 * <EnemyDamage_X:[Position]> モンスターのダメージエフェクトX座標（相対座標）を指定します。
 * <EnemyDamage_Y:[Position]> モンスターのダメージエフェクトY座標（相対座標）を指定します。
 * 
 * [Position]:座標　例:<EnemyPosition_X:100>
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/7/22 Ver.1.1.1
 * 敵の共通の座標をシフトさせる機能を追加。
 * 2021/3/27 Ver.1.1.0
 * 敵の座標をシフトさせる機能を追加。
 * 2021/1/17 Ver.1.0.0
 * 初版
 * 
 * @param DefaultCommonX
 * @desc 共通のモンスターのX座標のシフト値を設定します。
 * @text 共通X座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param DefaultCommonY
 * @desc 共通のモンスターのY座標のシフト値を設定します。
 * @text 共通Y座標
 * @type number
 * @default 0
 * @min -9999
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyPosition = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_EnemyPosition');
  const DefaultCommonX = Number(parameters['DefaultCommonX'] || 0);
  const DefaultCommonY = Number(parameters['DefaultCommonY'] || 0);

  const _Game_Enemy_screenX = Game_Enemy.prototype.screenX;
  Game_Enemy.prototype.screenX = function() {
    const Position = (this.enemy().meta.EnemyPosition_X ? Number(this.enemy().meta.EnemyPosition_X) : _Game_Enemy_screenX.call(this)) + DefaultCommonX;
    return this.enemy().meta.EnemyPositionShift_X ? Position + Number(this.enemy().meta.EnemyPositionShift_X) : Position;
  };

  const _Game_Enemy_screenY = Game_Enemy.prototype.screenY;
  Game_Enemy.prototype.screenY = function() {
    const Position = (this.enemy().meta.EnemyPosition_Y ? Number(this.enemy().meta.EnemyPosition_Y) : _Game_Enemy_screenY.call(this)) + DefaultCommonY;
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