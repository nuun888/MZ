/*:-----------------------------------------------------------------------------------
 * NUUN_AnimationFPSRate.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc アニメーションフレームレート個別設定
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * MVのアニメーションを再生するときのフレームレートをアニメーションごとに設定します。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/11/28 Ver.1.0.0
 * 初版
 * 
 * @param AnimationSetting
 * @text アニメーションFPS設定
 * @desc アニメーションのFPSの設定を行います。
 * @default []
 * @type struct<FPSSettingList>[]
 * 
 */
/*~struct~FPSSettingList:
 * 
 * @param AnimationID
 * @text アニメーションID
 * @desc アニメーションのIDを指定します。
 * @type animation
 * @default 0
 * 
 * @param AnimationRate
 * @text アニメーション再生速度変更
 * @desc アニメーションの再生速度を変更します。(4標準)
 * @type number
 * @default 4
 * @min 1
 * 
 */
var Imported = Imported || {};
Imported.NUUN_AnimationFPSRate = true;

(() => {
const parameters = PluginManager.parameters('NUUN_AnimationFPSRate');
const AnimationSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['AnimationSetting'])) : null) || [];

Sprite_AnimationMV.prototype.setupRate = function() {
    this._rate = this.getAnimationRate();
};

Sprite_AnimationMV.prototype.getAnimationRate = function() {
    const id = this._animation.id;
    const find = AnimationSetting.find(data => data.AnimationID === id);
    return find ? find.AnimationRate : 4;
};
})();