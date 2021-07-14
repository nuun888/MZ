/*:-----------------------------------------------------------------------------------
 * NUUN_BattlePosition.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc 解像度変更時のアクター座標修正＆調整
 * @author NUUN
 * @version 2.0.0
 *            
 * @help 解像度を変更した際、アクターの表示座標を解像度に応じて座標修正します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/7/14 Ver.2.0.0
 * Ver.1.3以降の仕様変更により正式に対応されたためエネミーの座標修正を行わないように変更。
 * 背景画像の調整を戦闘背景変更プラグインに移行。
 * 2021/1/17 Ver.1.0.3
 * NUUN_BattlePositionの処理に影響があるため一部の処理を変更。
 * 2021/1/13 Ver.1.0.2
 * 競合対策のためエネミー、アクターの位置修正の処理方法を変更。
 * 2020/12/16 Ver.1.0.1.1
 * サイドビューバトルでエネミーの座標が左端に表示されてしまう問題を修正。
 * 2020/12/16 Ver.1.0.1
 * UIサイズ変更時のエネミーの座標シフト方法にUIサイズに比例してシフトする機能を追加。
 * 2020/12/15 Ver.1.0.0
 * 初版
 * 
 * @param ActorSideViewXPosition
 * @desc アクターの基本X座標を移動させます。
 * @text アクターXポジション
 * @type number
 * @default 0
 * 
 * @param ActorSideViewYPosition
 * @desc アクターの基本Y座標を移動させます。
 * @text アクターYポジション
 * @type number
 * @default 0
 * @min -999
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BattlePosition = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_BattlePosition');
  const actorXPosition = Number(parameters['ActorSideViewXPosition'] || 0);
  const actorYPosition = Number(parameters['ActorSideViewYPosition'] || 0);

  const _Sprite_Actor_setHome = Sprite_Actor.prototype.setHome;//再定義
  Sprite_Actor.prototype.setHome = function(x, y) {
    if ($gameSystem.isSideView()) {
      x += (Graphics.boxWidth - 808) / 2 + actorXPosition;
      y += (Graphics.boxHeight - 616) / 2 + actorYPosition;
    }
    _Sprite_Actor_setHome.call(this, x, y);
  };
})();
