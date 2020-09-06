/*:-----------------------------------------------------------------------------------
 * NUUN_BattlePosition.js
 * -------------------------------------------------------------------------------------
 */
/*:ja
 * @target MZ
 * @plugindesc 解像度変更時のバトルエネミー及びバトル背景の位置調整
 * @author ヽ(´ω`)ノ
 *            
 * @help 解像度を変更し、UIエリアの横幅を変更した際エネミー画像の表示位置が左寄り
 * のままなのを変更。またエネミーの基本Y座標を調整できます。
 * 
 * 解像度を変更した際、サイドビュー時のアクターの表示位置を右寄りに変更。
 * また、サイドビューアクターの基本XY座標を調整できます。
 * 
 * フロントビューではバトル背景画像が上部起点で表示されてしまうため、
 * 解像度を横に広げた際にエネミーが宙に浮いたように表示されてしまいます。
 * このプラグインではバトル背景のY座標を変更することが出来ます。
 * 数値は解像度によって違うのでその都度、座標を調整してください。
 * デフォルトでは0です。
 * また調整が面倒という方は、画面サイズ調整をtrueにするとバトル背景が画面解像度
 * に合わせて表示されるようになります。
 * なおサイドビューバトルには対応しておりませんのでBackgroundPosition
 * で調整してください。
 * 
 * 利用規約
 * このプラグインの使用に制限はありません。
 * 商用、アダルト等のゲームでも使用可能です。
 * クレジット表記は任意です。
 * 
 * 更新履歴
 * ver 1.0.0（初版）
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
 * @param EnemyPosition
 * @desc エネミーの基本Y座標を移動させます。
 * @text エネミーYポジション
 * @type number
 * @default 0
 * 
 * @param BackgroundFit
 * @desc バトル背景を画面サイズに合わせる。
 * @text 画面サイズ調整
 * @type boolean
 * @default false
 * 
 * @param BackgroundPosition
 * @desc バトル背景のY座標を移動させます。
 * @text バトル背景Yポジション
 * @type number
 * @default 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BattlePosition = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_BattlePosition');
  const actorXPosition = Number(parameters['ActorSideViewXPosition'] || 0);
  const actorYPosition = Number(parameters['ActorSideViewYPosition'] || 0);
  const enemyPosition = Number(parameters['EnemyPosition'] || 0);
  const backgroundFit = eval(parameters['BackgroundFit'] || false);
  const backgroundPosition = Number(parameters['BackgroundPosition'] || 0);
  
  Sprite_Actor.prototype.setActorHome = function(index) {
    let x = (Graphics.boxWidth - 808) / 2 + actorXPosition + 600;
    let y = (Graphics.boxHeight - 616) / 2 + actorYPosition + 280;
    this.setHome(x + index * 32, y + index * 48);
  };
  
  Sprite_Enemy.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    this._enemy = battler;
    let x = (Graphics.boxWidth - 808) / 2 - 4;
    let y = (Graphics.boxHeight - 616) / 2 + enemyPosition;
    if ($gameSystem.isSideView()) {
      this.setHome(battler.screenX(), battler.screenY() + y);
    } else {
      this.setHome(battler.screenX() + x, battler.screenY() + y);
    }
    this._stateIconSprite.setup(battler);
  };

  const _Sprite_Battleback_adjustPosition = Sprite_Battleback.prototype.adjustPosition;
  Sprite_Battleback.prototype.adjustPosition = function() {
    _Sprite_Battleback_adjustPosition.call(this);
    if (backgroundFit && !$gameSystem.isSideView()){
      this.width = this.bitmap.width;
      this.height = this.bitmap.height;
      this.x = 0;
      this.scale.x = Graphics.width / this.bitmap.width;
      this.scale.y = Graphics.height / this.bitmap.height;
    }
    this.y += backgroundPosition;
  };
})();
