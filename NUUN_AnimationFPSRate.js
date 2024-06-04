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
 * @plugindesc Frame rate change when playing MV compatible animation
 * @author NUUN
 * @version 1.2.0
 * 
 * @help
 * Set the frame rate for each animation when playing MV animation.
 * 
 * FPS Mode: 4 frames at 15FPS, 2 frames at 30FPS, 1 frame at 60FPS
 * Frame mode: 15FPS for 4frame, 30FPS for 2 frames, 60FPS for 1 frame
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * This plugin can be used for free or for a fee.
 * 
 * Log
 * 6/4/2024 Ver.1.1.4
 * Added the ability to specify the magnification ratio.
 * 6/3/2024 Ver.1.1.3
 * Fixed an issue where the frame rate would be set to 60 FPS in FPS mode.
 * 12/6/2022 Ver.1.1.2
 * Fixed some text.
 * 11/9/2022 Ver.1.1.1
 * Changed the display in languages other than Japanese to English.
 * 11/5/2022 Ver.1.1.0
 * Change the frame value to FPS designation.
 * 12/9/2021 Ver.1.0.2
 * Changed to work without introducing 'NUUN_Base'.
 * 11/28/2021 Ver.1.0.1
 * Added the ability to set the default playback speed.
 * 11/28/2021 Ver.1.0.0
 * first edition.
 * 
 * @param DefaultAnimationRate
 * @text Standard animation playback FPS
 * @desc Specifies the number of playback FPS for one standard animation. (15 default)
 * @type combo
 * @option 15
 * @option 30
 * @option 60
 * @default 15
 * 
 * @param DefaultAnimationScaleX
 * @desc The horizontal scale of the animation.
 * @text Animation horizontal magnification
 * @type number
 * @default 100
 * @min 0
 * 
 * @param DefaultAnimationScaleY
 * @desc The vertical scale of the animation.
 * @text Animation vertical magnification
 * @type number
 * @default 100
 * @min 0
 * 
 * @param AnimationSetting
 * @text Animation FPS setting
 * @desc Set animation FPS.
 * @default []
 * @type struct<FPSSettingList>[]
 * 
 * @param AnimationRateMode
 * @text Frame setting mode
 * @desc Animation FPS specification. (Frame is specified with OFF) OFF when updating from Ver.1.0.2 or earlier.
 * @type boolean
 * @default true
 * 
 */
/*~struct~FPSSettingList:
 * 
 * @param AnimationID
 * @text Animation ID
 * @desc Specifies the ID of the animation.
 * @type animation
 * @default 0
 * 
 * @param AnimationRate
 * @text Animation playback frame count
 * @desc Specifies the number of playback frames for one animation. (15 default)
 * @type number
 * @type combo
 * @option 15
 * @option 30
 * @option 60
 * @default 15
 * 
 * @param AnimationScaleX
 * @desc The horizontal scale of the animation.
 * @text Animation horizontal magnification
 * @type number
 * @default 100
 * @min 0
 * 
 * @param AnimationScaleY
 * @desc The vertical scale of the animation.
 * @text Animation vertical magnification
 * @type number
 * @default 100
 * @min 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc MV互換アニメーション再生時のフレームレート変更
 * @author NUUN
 * @version 1.2.0
 * 
 * @help
 * MVのアニメーションを再生するときのフレームレートをアニメーションごとに設定します。
 * 
 * FPSモード：15FPSで4フレーム、30FPSで2フレーム、60FPSで1フレーム
 * フレームモード：4フレームで15FPS、2フレームで30FPS、1フレームで60FPS
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/6/4 Ver.1.2.0
 * 拡大率を指定できる機能を追加。
 * 2024/6/3 Ver.1.1.3
 * FPSモードでフレームレートの設定を行っても60FPSで再生されてしまう問題を修正。
 * 2022/12/6 Ver.1.1.2
 * 一部テキストを修正。
 * 2022/11/9 Ver.1.1.1
 * 日本語以外での表示を英語表示に変更。
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
 * @desc 標準の1アニメーションの再生FPS数を指定します。(15標準)
 * @type combo
 * @option 15
 * @option 30
 * @option 60
 * @default 15
 * 
 * @param DefaultAnimationScaleX
 * @desc アニメーションの横拡大率。
 * @text アニメーション横拡大率
 * @type number
 * @default 100
 * @min 0
 * 
 * @param DefaultAnimationScaleY
 * @desc アニメーションの縦拡大率。
 * @text アニメーション縦拡大率
 * @type number
 * @default 100
 * @min 0
 * 
 * @param AnimationSetting
 * @text アニメーションFPS設定
 * @desc アニメーションのFPSの設定を行います。
 * @default []
 * @type struct<FPSSettingList>[]
 * 
 * @param AnimationRateMode
 * @text フレーム設定モード
 * @desc アニメーションの指定方法をFPS指定にします。(OFFでフレーム指定) Ver.1.0.2以前からアップデートした場合はOFFにしてください。
 * @type boolean
 * @default true
 * 
 */
/*~struct~FPSSettingList:ja
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
 * @param AnimationScaleX
 * @desc アニメーションの横拡大率。
 * @text アニメーション横拡大率
 * @type number
 * @default 100
 * @min 0
 * 
 * @param AnimationScaleY
 * @desc アニメーションの縦拡大率。
 * @text アニメーション縦拡大率
 * @type number
 * @default 100
 * @min 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_AnimationFPSRate = true;

(() => {
const parameters = PluginManager.parameters('NUUN_AnimationFPSRate');
const params = Nuun_PluginParams.getPluginParams(document.currentScript);


const _Sprite_AnimationMV_setup = Sprite_AnimationMV.prototype.setup;
Sprite_AnimationMV.prototype.setup = function(targets, animation, mirror, delay) {
    _Sprite_AnimationMV_setup.apply(this, arguments);
    if (this._animation) {
        this.setupScale();
    }
};

Sprite_AnimationMV.prototype.setupScale = function() {
    const id = this._animation.id;
    const find = params.AnimationSetting.find(data => data.AnimationID === id);
    this.scale.x = (find ? Number(find.AnimationScaleX) : Number(params.DefaultAnimationScaleX)) / 100;
    this.scale.y = (find ? Number(find.AnimationScaleY) : Number(params.DefaultAnimationScaleY)) / 100;
};

Sprite_AnimationMV.prototype.setupRate = function() {
    this._rate = this.getAnimationRate();
};

Sprite_AnimationMV.prototype.getAnimationRate = function() {
    const id = this._animation.id;
    const find = params.AnimationSetting.find(data => data.AnimationID === id);
    if (params.AnimationRateMode) {
        return Math.max(60 / (find ? Number(find.AnimationRate) : Number(params.DefaultAnimationRate)), 1);
    } else {
        return find ? Number(find.AnimationRate) : Number(params.DefaultAnimationRate);
    }
};



})();