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
 * @plugindesc MV互換アニメーション再生時のフレームレート個別設定
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * MVのアニメーションを再生するときのフレームレートをアニメーションごとに設定します。
 * 
 * FPSモード：15FPSで4フレーム、30FPSで2フレーム、60FPSで1フレーム
 * フレームモード：フレームで15FPS、2フレームで30FPS、1フレームで60FPS
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/11/5 Ver.1.1.0
 * フレーム値をFPS指定に変更。
 * 2021/12/9 Ver.1.0.2
 * NUUN_Baseを導入しなくても動作するように変更。
 * 2021/11/28 Ver.1.0.1
 * デフォルトの再生速度を設定できる機能を追加。
 * 2021/11/28 Ver.1.0.0
 * 初版
 * 
 * @param DefaultAnimationRate
 * @text 標準アニメーション再生FPS数
 * @desc 標準の１アニメーションの再生FPS数を指定します。(15標準)
 * @type combo
 * @option 15
 * @option 30
 * @option 60
 * @default 15
 * 
 * @param AnimationSetting
 * @text アニメーションFPS設定
 * @desc アニメーションのFPSの設定を行います。
 * @default []
 * @type struct<FPSSettingList>[]
 * 
 * @param AnimationRateMode
 * @text フレーム設定モード
 * @desc アニメーションの指定方法をFPS指定にします。OFFでフレーム指定 Ver.1.0.2以前からアップデートした場合はOFFにしてください。
 * @type boolean
 * @default true
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
 * @desc １アニメーションの再生フレーム数を指定します。(15標準)
 * @type number
 * @type combo
 * @option 15
 * @option 30
 * @option 60
 * @default 15
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

Sprite_AnimationMV.prototype.setupRate = function() {
    this._rate = this.getAnimationRate();
};

Sprite_AnimationMV.prototype.getAnimationRate = function() {
    const id = this._animation.id;
    const find = param.AnimationSetting.find(data => data.AnimationID === id);
    if (param.AnimationRateMode) {
        return Math.min(60 / (find ? Number(find.AnimationRate) : Number(param.DefaultAnimationRate)), 1);
    } else {
        return find ? Number(find.AnimationRate) : Number(param.DefaultAnimationRate);
    }
};

})();