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
 * @plugindesc アクターパラメータの最大値設定
 * @author NUUN
 * @version 1.0.0
 *            
 * @help 
 * アクターの能力値に上限を授けます。デフォルトでは能力値の上限はInfinity（無限）
 * となっています。このプラグインではあえて上限値を設定することが出来ます。
 * -1と設定することで無限（コアスクリプトの上限値）となります。
 * 
 * アクターごと、職業ごとに最大値を設定できます。
 * アクター又は職業のメモ欄（パラメータの高いほうが優先されます）
 * <MaxLimitHP:[param]>
 * <MaxLimitMP:[param]>
 * <MaxLimitTP:[param]>
 * <MaxLimitATK:[param]>
 * <MaxLimitDEF:[param]>
 * <MaxLimitMAG:[param]>
 * <MaxLimitMAT:[param]>
 * <MaxLimitAGI:[param]>
 * <MaxLimitLUK:[param]>
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
  const parameters = PluginManager.parameters('NUUN_StatusParamEX');
  let limitHP = Number(parameters['limitHP'] || -1);
  let limitMP = Number(parameters['limitMP'] || -1);
  let limitAtk = Number(parameters['limitAtk'] || -1);
  let limitDef = Number(parameters['limitDef'] || -1);
  let limitMat = Number(parameters['limitMat'] || -1);
  let limitMdf = Number(parameters['limitMdf'] || -1);
  let limitAgi = Number(parameters['limitAgi'] || -1);
  let limitLuk = Number(parameters['limitLuk'] || -1);

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

  Game_Actor.prototype.hpMaxParam = function() {
    return Math.max(this.classMaxData('HP'), this.actorMaxData('HP'), limitHP, 1)
  };

  Game_Actor.prototype.mpMaxParam = function() {
    return Math.max(this.classMaxData('MP'), this.actorMaxData('MP'), limitMP, 0)
  };

  Game_Actor.prototype.atkMaxParam = function() {
    return Math.max(this.classMaxData('ATK'), this.actorMaxData('ATK'), limitAtk, 0)
  };

  Game_Actor.prototype.defMaxParam = function() {
    return Math.max(this.classMaxData('DEF'), this.actorMaxData('DEF'), limitDef, 0)
  };

  Game_Actor.prototype.matMaxParam = function() {
    return Math.max(this.classMaxData('MAT'), this.actorMaxData('MAT'), limitMat, 0)
  };

  Game_Actor.prototype.mdfMaxParam = function() {
    return Math.max(this.classMaxData('MDF'), this.actorMaxData('MDF'), limitMdf, 0)
  };

  Game_Actor.prototype.agiMaxParam = function() {
    return Math.max(this.classMaxData('AGI'), this.actorMaxData('AGI'), limitAgi, 0)
  };

  Game_Actor.prototype.lukMaxParam = function() {
    return Math.max(this.classMaxData('LUK'), this.actorMaxData('LUK'), limitLuk, 0)
  };

  Game_Actor.prototype.classMaxData = function(type) {
    const tag = 'MaxLimit'
    return this.currentClass().meta[tag + type] || 0;
  };

  Game_Actor.prototype.actorMaxData = function(type) {
    const tag = 'MaxLimit'
    return this.actor().meta[tag + type] || 0;
  };

})();