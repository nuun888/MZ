/*:-----------------------------------------------------------------------------------
 * NUUN_StatusParamEX.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc アクターステータスの最大値設定
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.3
 *            
 * @help 
 * アクターの能力値に上限を授けます。デフォルトでは能力値の上限はInfinity（無限）
 * となっています。このプラグインではあえて上限値を設定することが出来ます。
 * -1と設定することで無限（コアスクリプトの上限値）となります。
 * 
 * アクターごと、職業ごとに最大値を設定できます。
 * アクター又は職業のメモ欄
 * <MaxLimitHP:[param]> 最大HP
 * <MaxLimitMP:[param]> 最大MP
 * <MaxLimitTP:[param]> 最大TP
 * <MaxLimitATK:[param]> 最大攻撃力
 * <MaxLimitDEF:[param]> 最大防御力
 * <MaxLimitMAT:[param]> 最大魔法力
 * <MaxLimitMDF:[param]> 最大魔法防御
 * <MaxLimitAGI:[param]> 最大敏捷性
 * <MaxLimitLUK:[param]> 最大運
 * ※[param]に記入する数値は、[]は外して数値のみ記入して下さい。
 * 
 * 複数設定されている場合は、一番最大値が高い値が適用されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/10/28 Ver.1.0.3
 * 最大魔法力、最大魔法防御の設定方法の誤字を修正。
 * 2022/1/22 Ver.1.0.2
 * 戦闘中にエラーが出る問題を修正。
 * 2022/1/22 Ver.1.0.1
 * デフォルト値が正しく取得できない問題を修正。
 * ゲーム開始時にエラーが出る問題を修正。
 * 2022/1/22 Ver.1.0.0
 * 初版
 * 
 * @param limitHP
 * @desc アクターの上限最大HP。(-1で無制限)
 * @text 上限最大HP
 * @type number
 * @default -1
 * @min -1
 * 
 * @param limitMP
 * @desc アクターの上限最大MP。(-1で無制限)
 * @text 上限最大MP
 * @type number
 * @default -1
 * @min -1
 * 
 * @param limitTP
 * @desc アクターの上限最大TP。(-1でデフォルト値)
 * @text 上限最大TP
 * @type number
 * @default -1
 * @min -1
 * 
 * @param limitAtk
 * @desc アクターの上限最大攻撃力。(-1で無制限)
 * @text 上限最大攻撃力
 * @type number
 * @default -1
 * @min -1
 * 
 * @param limitDef
 * @desc アクターの上限最大防御力。(-1で無制限)
 * @text 上限最大防御力
 * @type number
 * @default -1
 * @min -1
 * 
 * @param limitMat
 * @desc アクターの上限最大魔法力。(-1で無制限)
 * @text 上限最大魔法力
 * @type number
 * @default -1
 * @min -1
 * 
 * @param limitMdf
 * @desc アクターの上限最大魔法防御。(-1で無制限)
 * @text 上限最大魔法防御
 * @type number
 * @default -1
 * @min -1
 * 
 * @param limitAgi
 * @desc アクターの上限最大敏捷性。(-1で無制限)
 * @text 上限最大敏捷性
 * @type number
 * @default -1
 * @min -1
 * 
 * @param limitLuk
 * @desc アクターの上限最大運。(-1で無制限)
 * @text 上限最大運
 * @type number
 * @default -1
 * @min -1
 * 
 */
var Imported = Imported || {};
Imported.NUUN_StatusParamEX = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const _Game_Actor_paramMax = Game_Actor.prototype.paramMax;
    Game_Actor.prototype.paramMax = function(paramId) {
        let param = 0;
        if(paramId === 0){
            param = this.hpMaxParam();
        } else if (paramId === 1) {
            param = this.mpMaxParam();
        } else if (paramId === 2) {
            param = this.atkMaxParam();
        } else if (paramId === 3) {
            param = this.defMaxParam();
        } else if (paramId === 4) {
            param = this.matMaxParam();
        } else if (paramId === 5) {
            param = this.mdfMaxParam();
        } else if (paramId === 6) {
            param = this.agiMaxParam();
        } else if (paramId === 7) {
            param = this.lukMaxParam();
        }
        return param >= 0 ? param : _Game_Actor_paramMax.call(this, paramId);
    };

    const _Game_BattlerBase_maxTp = Game_BattlerBase.prototype.maxTp;
    Game_BattlerBase.prototype.maxTp = function() {
        if (this.isActor()) {
            const param = this.tpMaxParam();
            return param >= 0 ? param : _Game_BattlerBase_maxTp.call(this);
        }
        return _Game_BattlerBase_maxTp.call(this);
    };
  
    Game_Actor.prototype.tpMaxParam = function() {
      return Math.max(this.classMaxData('TP'), this.actorMaxData('TP'), params.limitTP);
    };
  
    Game_Actor.prototype.hpMaxParam = function() {
      return Math.max(this.classMaxData('HP'), this.actorMaxData('HP'), params.limitHP);
    };
  
    Game_Actor.prototype.mpMaxParam = function() {
      return Math.max(this.classMaxData('MP'), this.actorMaxData('MP'), params.limitMP);
    };
  
    Game_Actor.prototype.atkMaxParam = function() {
      return Math.max(this.classMaxData('ATK'), this.actorMaxData('ATK'), params.limitAtk);
    };
  
    Game_Actor.prototype.defMaxParam = function() {
      return Math.max(this.classMaxData('DEF'), this.actorMaxData('DEF'), params.limitDef);
    };
  
    Game_Actor.prototype.matMaxParam = function() {
      return Math.max(this.classMaxData('MAT'), this.actorMaxData('MAT'), params.limitMat);
    };
  
    Game_Actor.prototype.mdfMaxParam = function() {
      return Math.max(this.classMaxData('MDF'), this.actorMaxData('MDF'), params.limitMdf);
    };
  
    Game_Actor.prototype.agiMaxParam = function() {
      return Math.max(this.classMaxData('AGI'), this.actorMaxData('AGI'), params.limitAgi);
    };
  
    Game_Actor.prototype.lukMaxParam = function() {
      return Math.max(this.classMaxData('LUK'), this.actorMaxData('LUK'), params.limitLuk);
    };
  
    Game_Actor.prototype.classMaxData = function(type) {
      const tag = 'MaxLimit' + type;
      return this.currentClass().meta[tag] || -1;
      //return NuunManager.stringCodeSplit(this.currentClass().meta[tag], true) || -1;
      
    };
  
    Game_Actor.prototype.actorMaxData = function(type) {
      const tag = 'MaxLimit' + type;
      return this.actor().meta[tag] || -1;
      //return NuunManager.stringCodeSplit(this.actor().meta[tag], true) || -1;
      
    };

})();