/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEXInMPP_Pseudo3DBattle.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc バトルスタイル拡張疑似3Dバトル併用対応
 * @author NUUN
 * 
 * @help
 * バトルスタイル拡張と疑似3Dバトルを併用する際の競合対策プラグインです。
 * このプラグインを疑似3Dバトルより下に配置してください。
 * 
 * 既知の競合
 * フロントビューでアクター側にもエフェクトを表示をONに設定している場合、アクターがコマンド選択時に画面がズームしてしまう。
 * ポップアップが正常に表示されない。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/6/13 Ver.1.0.0
 * ポップアップ時にエラーが出る問題を修正。
 * アクターのダメージエフェクト、敵の画像が正常に動作しない問題を修正。
 * 
 */ 
var Imported = Imported || {};
Imported.NUUN_BattleStyleEXInMPP_Pseudo3DBattle = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_BattleStyleEXInMPP_Pseudo3DBattle');

  const _Sprite_Battler_createStatePopupSprite = Sprite_Battler.prototype.createStatePopupSprite;
  Sprite_Battler.prototype.createStatePopupSprite = function() {
    _Sprite_Battler_createStatePopupSprite.call(this);
    this._popUpSprite.setupPseudo3dPosition(this, this._popUpSprite.x, this._popUpSprite.y);
  };
  
  Spriteset_Battle.prototype.convertPseudo3dPosition = function() {
    this._back1Sprite.convertPseudo3dPosition();
    this._back2Sprite.convertPseudo3dPosition();
    if (this._back1FixSprite) {
        this._back1FixSprite.convertPseudo3dPosition();
    }
    for (const sprite of this._effectsBackContainer.children) {
        if (sprite.convertPseudo3dPosition) {
            sprite.convertPseudo3dPosition();
        }
    } 
  };
})();