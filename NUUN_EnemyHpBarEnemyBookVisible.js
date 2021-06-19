/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyHpBarEnemyBookVisible.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  敵にHPバーを表示プラグイン図鑑登録表示対応
 * @author NUUN
 * @version 1.0.0
 * @orderAfter TorigoyaMZ_EnemyHpBar
 * 
 * @help
 * TorigoyaMZ_EnemyHpBar（敵にHPバーを表示プラグイン）/ Ruたん様　でのHPの表示条件に
 * NUUN_EnemyBookで図鑑登録及び図鑑情報登録したときに表示を追加します。
 * 
 * なおこのプラグインはTorigoyaMZ_EnemyHpBar併用時専用です。
 * NUUN_ButlerHPGaugeでは動作しません。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/6/19 Ver.1.0.0
 * 初版
 * 
 * @param HPEXVisible
 * @desc HPゲージの表示オプション
 * @text HPゲージ表示オプション
 * @type select
 * @option 指定なし
 * @value 0
 * @option 図鑑登録後
 * @value 1
 * @option 図鑑情報登録後
 * @value 2
 * @default 0

 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyHpBarEnemyBookVisible = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EnemyHpBarEnemyBookVisible');
const HPEXVisible = Number(parameters['HPEXVisible'] || 0);

Sprite_Enemy.prototype.torigoyaEnemyHpBar_updateGaugeSprite = function () {
  this._torigoyaEnemyHpBar_gaugeSprite.x = this.torigoyaEnemyHpBar_posX();
  this._torigoyaEnemyHpBar_gaugeSprite.y = this.torigoyaEnemyHpBar_posY();
  this._torigoyaEnemyHpBar_gaugeSprite.opacity += gaugeEnemyBookVisible(this._enemy) && this._torigoyaEnemyHpBar_gaugeSprite.shouldShow() ? 48 : -48;
};

function gaugeEnemyBookVisible(battler) {
  if (Imported.NUUN_EnemyBook) {
    if (HPEXVisible === 1) {
      return $gameSystem.isInEnemyBook(battler.enemy());
    } else if (HPEXVisible === 2) {
      return $gameSystem.isInEnemyBookStatus(battler.enemy());
    }
  }
  return true;
}

})();