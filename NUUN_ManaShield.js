/*:-----------------------------------------------------------------------------------
 * NUUN_ManaShield.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc マナシールド
 * @author NUUN
 * @version 1.1.1
 * @orderAfter NUUN_StoppingFeature
 * 
 * @help
 * HPダメージの代わりにMPにダメージを受けさせます。
 * 最大HPが1000 最大MPが600の場合
 * 【HPダメージ量】
 * 受けたダメージの肩代わりしたダメージ分、MPにダメージを受けます。
 * 500のHPダメージを受けた時に５０％の場合はMPが250減りHPは250だけダメージを受けます。
 * MPの変換後負担率が６０％の場合はMPが150減りHPは250のダメージを受けます。
 * 【最大HP割合比例】
 * 受けたダメージの肩代わりしたダメージ分が最大HPからの割合と最大MPに比例してMPにダメージを受けます。
 * 500のHPダメージを受けた時に５０％の場合はMPが150減りHPは250だけダメージを受けます。
 * MPの変換後負担率が６０％の場合はMPが90減りHPは250のダメージを受けます。
 * 
 * 特徴を有するメモ欄（アクター、職業、武器、防具、敵キャラ、ステート）
 * <ManaShield:[rate]>　
 * [rate]:肩代わりするダメージの割合
 * <ManaShield:25> HPダメージの25％がMPダメージに変換されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/1/29  Ver.1.1.1
 * 元の機能と選択できるように変更。
 * 2022/1/29  Ver.1.1.0
 * MPダメージの計算方法を最大HPからの割合で算出するように変更。
 * 2021/8/1 Ver.1.0.1
 * MPダメージを受けてないのにSEgaなる問題を修正。
 * MP不足だった時のHPダメージが正常に計算されていなかった問題を修正。
 * 回復時にも影響していた問題を修正。
 * 2021/8/1 Ver.1.0.0
 * 初版
 * 
 * @param MPShieldMode
 * @desc 肩代わりするMPダメージのモード。
 * @text MPダメージモード
 * @type select
 * @option HPダメージ量
 * @value 'HpDamage'
 * @option 最大HP割合比例
 * @value 'MaxHpRate'
 * @default 'MaxHpRate'
 * 
 * @param MPBurdenRate
 * @text MPの変換後負担率
 * @desc MPのダメージ変換後の負担率を設定します。(百分率)
 * @type number
 * @default 100
 * @min 1
 * 
 * @param SE
 * @text SE設定
 * @default ---------------------------------------------------------
 * 
 * @param ManaShieldSE
 * @text 発動時SE
 * @desc マナシールド発動時のSE
 * @type file
 * @dir audio/se/
 * 
 * @param volume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * 
 * @param pitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * 
 * @param pan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 50
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ManaShield = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_ManaShield');
  const MPShieldMode = eval(parameters['MPShieldMode'] || 'HpDamage');
  const MPBurdenRate = Number(parameters['MPBurdenRate'] || 100);
  const ManaShieldSE = String(parameters['ManaShieldSE']);
  const volume = Number(parameters['volume'] || 90);
  const pitch = Number(parameters['pitch'] || 100);
  const pan = Number(parameters['pan'] || 50);

  const _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
  Game_Action.prototype.executeHpDamage = function(target, value) {
    value = this.manaShield(target, value);
    _Game_Action_executeHpDamage.call(this, target, value);
  };

  Game_Action.prototype.manaShield = function(target, value) {
    if (value > 0) {
      const rate = target.traitsManaShieldPi();
      let newValue = Math.floor(value * rate);
      if (newValue > 0) {
        const mpValue = this.getManaShieldDamage(target, newValue);
        newValue = Math.min(newValue, target.mp);
        this.executeMpDamage(target, mpValue);
        if(mpValue > 0 && ManaShieldSE) {
          AudioManager.playSe({"name":ManaShieldSE,"volume":volume,"pitch":pitch,"pan":pan});
        }
      }
      return value - newValue;
    }
    return value;
  };

  Game_Action.prototype.getManaShieldDamage = function(target, value) {
    if (MPShieldMode === 'HpDamage') {
      return Math.floor(Math.min(value * (MPBurdenRate / 100), target.mp))
    } else if (MPShieldMode === 'MaxHpRate') {
      return Math.floor((target.mmp * (value / target.mhp)) * (MPBurdenRate / 100));
    }
  };

  Game_BattlerBase.prototype.traitsManaShieldPi = function() {
    const traits = this.traitsManaShield();
    if (traits.length > 0) {
      return traits.reduce((r, obj) => r * (Number(obj.meta.ManaShield) / 100), 1);
    }
    return 0;
  };

  Game_BattlerBase.prototype.traitsManaShield = function() {
    return this.traitObjects().filter(trait => trait.meta.ManaShield && Number(trait.meta.ManaShield) > 0);
  };
  
})();
