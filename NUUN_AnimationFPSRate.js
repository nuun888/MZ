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
 * @plugindesc MVアニメーション再生時のフレームレート個別設定
 * @author NUUN
 * @version 1.0.2
 * 
 * @help
 * MVのアニメーションを再生するときのフレームレートをアニメーションごとに設定します。
 * ※4フレームで15FPS、2フレームで30FPS、1フレームで60FPS
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/12/9 Ver.1.0.2
 * NUUN_Baseを導入しなくても動作するように変更。
 * 2021/11/28 Ver.1.0.1
 * デフォルトの再生速度を設定できる機能を追加。
 * 2021/11/28 Ver.1.0.0
 * 初版
 * 
 * @param DefaultAnimationRate
 * @text 標準アニメーション再生フレーム数
 * @desc 標準の１アニメーションの再生フレーム数を指定します。(4標準)
 * @type number
 * @default 4
 * @min 1
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
 * @text アニメーション再生フレーム数
 * @desc １アニメーションの再生フレーム数を指定します。(4標準)
 * @type number
 * @default 4
 * @min 1
 * 
 */
var Imported = Imported || {};
Imported.NUUN_AnimationFPSRate = true;

(() => {
const parameters = PluginManager.parameters('NUUN_AnimationFPSRate');
const param = JSON.parse(JSON.stringify(parameters, function(key, value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        try {
            return eval(value);
        } catch (e) {
            return value;
        }
    }
}));
//const DefaultAnimationRate = Number(parameters['DefaultAnimationRate'] || 4);
//const AnimationSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['AnimationSetting'])) : null) || [];

Sprite_AnimationMV.prototype.setupRate = function() {
    this._rate = this.getAnimationRate();
};

Sprite_AnimationMV.prototype.getAnimationRate = function() {
    const id = this._animation.id;
    const find = param.AnimationSetting.find(data => data.AnimationID === id);
    return find ? find.AnimationRate : param.DefaultAnimationRate;
};
})();