/*:-----------------------------------------------------------------------------------
 * NUUN_ElementAbsorb.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc 属性吸収特徴
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * 属性を吸収する特徴を設定できます。
 * 対象の吸収属性有効度が200%ならダメージの200%吸収します。
 * 
 * 加算モード：通常の属性有効度から吸収属性有効度が引かれた割合になります。
 * 属性有効度150% 吸収属性有効度100%の場合最終的な有効度は-50％になります。
 * 
 * 吸収優先モード：吸収属性有効度が0以上なら通常の属性有効度は無視されます。
 * いずれも吸収属性の効果が一番高い属性が反映されます。
 * 
 * 特徴を有するメモ欄
 * <absorbElement:[id],[id],....> 吸収する属性を設定します。
 * [id]:プラグインパラメータの吸収属性有効度リストID
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/8/9 Ver.1.0.1
 * 吸収する属性にリスト設定していないIDを指定した場合エラーが出る問題を修正。
 * 2021/8/9 Ver.1.0.0
 * 初版
 * 
 * @param AbsorbElement
 * @text 吸収属性有効度リスト
 * @desc 吸収属性有効度リスト。
 * @default []
 * @type struct<AbsorbElementList>[]
 * 
 * @param AbsorbSetting
 * @text 属性有効度処理設定
 * @desc 属性有効度と吸収属性度との処理方法
 * @type select
 * @option 吸収優先
 * @value 'Absorb'
 * @option 加算
 * @value 'Sum'
 * @default 'Sum'
 * 
 */
/*~struct~AbsorbElementList:
 * 
 * @param Identification
 * @text 識別名
 * @desc どの属性吸収かを識別するための名称です。設定しなくても問題ありません。
 * @type String
 * @default 
 * 
 * @param ElementId
 * @text 属性ID
 * @desc 属性ID。
 * @type Number
 * @default 1
 * 
 * @param AbsorbValidity
 * @text 吸収有効度
 * @desc 吸収有効度
 * @type Number
 * @default 100 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ElementAbsorb = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ElementAbsorb');
const AbsorbElement = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['AbsorbElement'])) : null) || [];
const AbsorbSetting = eval(parameters['AbsorbSetting'] || 'Sum');

const _Game_Action_elementsMaxRate = Game_Action.prototype.elementsMaxRate;
Game_Action.prototype.elementsMaxRate = function(target, elements) {
  target._absorbRate = [];
  let rate = _Game_Action_elementsMaxRate.call(this, target, elements);
  if (target._absorbRate.length > 0) {
    rate = Math.min(...target._absorbRate);
    target._absorbRate = null;
  }
  return rate;
};


const _Game_BattlerBase_elementRate = Game_BattlerBase.prototype.elementRate;
Game_BattlerBase.prototype.elementRate = function(elementId) {
  let absorbRate = this.absorbElementRate(elementId) * -1;
  let rate = _Game_BattlerBase_elementRate.call(this, elementId);
  if (AbsorbSetting === 'Sum') {
    rate += absorbRate;
  } else if (absorbRate < 0) {
    rate = absorbRate;
  }
  if (this._absorbRate && rate < 0) {
    this._absorbRate.push(rate);
  }
  return rate;
};

Game_BattlerBase.prototype.absorbElementRate = function(elementId) {
  let absorb = false;
  const rate = (this.absorbElementsList().reduce((r, listId) => {
    const data = AbsorbElement[listId - 1];
    if (data && data.ElementId === elementId) {
      absorb = true;
      return r * data.AbsorbValidity / 100
    } else {
      return r;
    }
  }, 1) + (AbsorbSetting === 'Sum' ? 1.0 : 0));
  return absorb ? rate : 0;
};

Game_BattlerBase.prototype.absorbElementsList = function() {
  return this.traitObjects().reduce((r, trait) => {
    const list = this.getMultiElement(trait.meta);
    if (list) {
      return r.concat(list);
    } else {
      return r;
    }
  }, []);
};

Game_BattlerBase.prototype.getMultiElement = function(obj) {
  return obj.absorbElement ? obj.absorbElement.split(',').map(Number) : null;
};

})();