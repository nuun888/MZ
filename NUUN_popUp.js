/*:-----------------------------------------------------------------------------------
 * NUUN_popUp.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc ポップアップ
 * @author NUUN
 * @version 1.0.0
 *            
 * @help
 * ステート、バフ付加解除時にステート、バフ名をポップアップさせます。
 * 
 * <PopUpStateName> ポップアップするステート名。無記入の場合はデータベースのステート名が表示されます。
 * <PositiveState> このステートは良いステートと判定します。
 * <BatState> このステートは悪いステートと判定します。
 * <NoPopUp> ポップアップを表示しません。
 * <AddNoPopUp> 付与時のポップアップを表示しません。
 * <RemoveNoPopUp> 解除時のポップアップを表示しません。
 * <PopUpColor:[colorIndex]> ポップアップ時の色を指定します。[colorIndex]:カラーインデックス番号　例：<PopUpColor:17>
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/7/17 Ver 1.0.0
 * 初版
 * 
 * @param PopUpBuff
 * @text ポップアップバフ設定
 * @desc ポップアップするバフの設定をします。
 * @default ["{\"StateType\":\"0\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"1\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"2\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"3\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"4\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"5\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"6\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"7\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"10\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"11\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"12\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"13\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"14\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"15\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"16\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"17\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}"]
 * @type struct<PopUpBuffList>[]
 * @parent PopUpSettings
 * 
 * @param StateColor
 * @desc 有利なポップアップするときのステート、バフの色
 * @text 有利ステート、バフ文字色
 * @type number
 * @default 0
 * @parent PopUpSettings
 * 
 * @param BatStateColor
 * @desc 不利なポップアップするときのステート、バフの色
 * @text 不利ステート、バフ文字色
 * @type number
 * @default 0
 * @parent PopUpSettings
 * 
 * @param PopUpReleaseOpacity
 * @desc 解除時の不透明度
 * @text 解除時不透明度
 * @type number
 * @default 128
 * @parent PopUpSettings
 * 
 * @param PopUpUpdate
 * @desc ポップアップを連続で表示するときの間隔
 * @text ポップアップ間隔
 * @type number
 * @default 30
 * @parent PopUpSettings
 * 
 * @param DeadNoPopup
 * @text 戦闘不能ポップアップ表示
 * @desc 戦闘不能のポップアップを表示します。
 * @type boolean
 * @default false
 * 
 */
/*~struct~PopUpBuffList:
 * 
 * @param StateType
 * @text アクターステータス表示方法
 * @desc アクターステータスの表示方法を選択します。
 * @type select
 * @option HP上昇
 * @value 0
 * @option MP上昇
 * @value 1
 * @option 攻撃力上昇
 * @value 2
 * @option 防御力上昇
 * @value 3
 * @option 魔法力上昇
 * @value 4
 * @option 魔法防御上昇
 * @value 5
 * @option 敏捷性上昇
 * @value 6
 * @option 運上昇
 * @value 7
 * @option HP低下
 * @value 10
 * @option MP低下
 * @value 11
 * @option 攻撃力低下
 * @value 12
 * @option 防御力低下
 * @value 13
 * @option 魔法力低下
 * @value 14
 * @option 魔法防御低下
 * @value 15
 * @option 敏捷性低下
 * @value 16
 * @option 運低下
 * @value 17
 * @default 0
 * 
 * @param PopUpStateName
 * @text ポップアップステート名
 * @desc ポップアップするステート名です。記入がない場合はデフォルトのステート名が表示されます。
 * @type string
 * 
 * @param StatePopUpMode
 * @text ポップアップの表示
 * @desc ポップアップの表示を選択します。
 * @type select
 * @option ポップアップする
 * @value 0
 * @option ポップアップしない
 * @value 1
 * @option 付与時のみポップアップしない
 * @value 2
 * @option 解除時のみポップアップしない
 * @value 3
 * @default 0
 * 
 * @param PopUpStateColor
 * @desc ポップアップするときのステートの色
 * @text 文字色
 * @type number
 * @default 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_popUp = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_popUp');
  const PopUpBuff = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopUpBuff'])) : null) || [];
  const StateColor = Number(parameters['StateColor'] || 0);
  const BatStateColor = Number(parameters['BatStateColor'] || 0);
  const PopUpReleaseOpacity = Number(parameters['PopUpReleaseOpacity'] || 128);
  const PopUpUpdate = Number(parameters['PopUpUpdate'] || 0);
  const DeadNoPopup = eval(parameters['DeadNoPopup'] || 'false');

  const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function() {
    _Game_Battler_initMembers.call(this);
    this._statePopup = false;
    this.buffsLavel = [0, 0, 0, 0, 0, 0, 0, 0];
  };

  Game_Battler.prototype.isStatePopupRequested = function() {
    return this._statePopup;
  };
  
  Game_Battler.prototype.clearStatePopup = function() {
    this._statePopup = false;
  };
  
  Game_Battler.prototype.startStatePopup = function() {
    this._statePopup = true;
  };
  
  Game_Battler.prototype.addSetState = function(id) {
    this.result().addState = id;
  };
  
  Game_Battler.prototype.removeSetState = function(id) {
    this.result().removeState = id;
  };
  
  Game_Battler.prototype.addSetBuff = function(id) {
    this.result().addBuff = id;
  };
  
  Game_Battler.prototype.removeSetBuff = function(id) {
    this.result().removeBuff = id;
  };

  Game_Battler.prototype.removeDebuff = function(paramId) {
    if (this.isAlive() && this.isBuffOrDebuffAffected(paramId)) {
      this.setBuffLavel(paramId);
      this.eraseBuff(paramId);
      this._result.pushRemovedDebuff(paramId);
      this.refresh();
    }
  };

  const _Game_Battler_removeBuff = Game_Battler.prototype.removeBuff;
  Game_Battler.prototype.removeBuff = function(paramId) {
    const buff = this._buffs[paramId];
    if (buff < 0) {
      this.removeDebuff(paramId);
    } else {
      this.setBuffLavel(paramId);
      _Game_Battler_removeBuff.call(this, paramId);
    }
  };

  Game_Battler.prototype.setBuffLavel = function(id) {
    this.buffsLavel[id] = this._buffs[id];
  };

  const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
  Game_ActionResult.prototype.clear = function() {
    _Game_ActionResult_clear.call(this)
    this.addState = 0;
    this.addBuff = -1;
    this.removeState = 0;
    this.removeBuff = -1;
    this.removedDebuffs = [];
  };

  Game_ActionResult.prototype.pushRemovedDebuff = function(paramId) {
    if (!this.isDebuffRemoved(paramId)) {
        this.removedDebuffs.push(paramId);
    }
  };

  Game_ActionResult.prototype.isDebuffRemoved = function(paramId) {
    return this.removedDebuffs.includes(paramId);
  };

  const _Game_ActionResult_isStatusAffected = Game_ActionResult.prototype.isStatusAffected;
  Game_ActionResult.prototype.isStatusAffected = function() {
    return this.removedDebuffs.length > 0 || _Game_ActionResult_isStatusAffected.call(this);
  };

  Window_BattleLog.prototype.popupState = function(target, id) {
    target.startStatePopup();
    target.addSetState(id);
  };
  
  Window_BattleLog.prototype.removeState = function(target, id) {
    target.startStatePopup();
    target.removeSetState(id);
  };
  
  Window_BattleLog.prototype.popupBuff = function(target, id) {
    target.startStatePopup();
    target.addSetBuff(id);
  };
  
  Window_BattleLog.prototype.removeBuff = function(target, id) {
    target.startStatePopup();
    target.removeSetBuff(id);
  };

  const _Window_BattleLog_displayAddedStates = Window_BattleLog.prototype.displayAddedStates;
  Window_BattleLog.prototype.displayAddedStates = function(target) {
    _Window_BattleLog_displayAddedStates.call(this, target);
    for (const state of target.result().addedStateObjects()) {
      if (this.displayDeadPopup(state) && !state.meta.NoPopUp && !state.meta.AddNoPopUp) {
        this.push('popupState', target, state.id);
      }
    }
  };

  const _Window_BattleLog_displayRemovedStates = Window_BattleLog.prototype.displayRemovedStates;
  Window_BattleLog.prototype.displayRemovedStates = function(target) {
    _Window_BattleLog_displayRemovedStates.call(this, target);
    for (const state of target.result().removedStateObjects()) {
      if (this.displayDeadPopup(state) && !state.meta.NoPopUp && !state.meta.RemoveNoPopUp) {
        this.push('removeState', target, state.id);
      }
    }
  };

  Window_BattleLog.prototype.displayDeadPopup = function(state) {
    return !DeadNoPopup ? state.id !== 1 : true;
  };

  const _Window_BattleLog_displayBuffs = Window_BattleLog.prototype.displayBuffs;
  Window_BattleLog.prototype.displayBuffs = function(target, buffs, fmt) {
    _Window_BattleLog_displayBuffs.call(this, target, buffs, fmt);
    const result = target.result();
    if (result.addedBuffs.length > 0 || result.addedDebuffs.length > 0) {
      for (const paramId of buffs) {
        const id = this._buffMode === 'debuff' ? paramId + 10 : paramId;
        const find = PopUpBuff.find(buff => buff.StateType === id);
        if (find) {
          if (find.StatePopUpMode === 0 || find.StatePopUpMode === 3) {
            this.push('popupBuff', target, id);
          }
        } else {
          this.push('popupBuff', target, id);
        }
      }
    }
  };

  Window_BattleLog.prototype.displayRemovedBuffs = function(target, buffs) {
    for (const paramId of buffs) {
      const id = this._buffMode === 'debuff' ? paramId + 10 : paramId;
      const find = PopUpBuff.find(buff => buff.StateType === id);
      if (find) {
        if (find.StatePopUpMode === 0 || find.StatePopUpMode === 2) {
          this.push('removeBuff', target, id);
        }
      } else {
        this.push('removeBuff', target, id);
      }
    }
  };

  Window_BattleLog.prototype.displayChangedBuffs = function(target) {//再定義
    const result = target.result();
    this._buffMode = 'buff';
    this.displayBuffs(target, result.addedBuffs, TextManager.buffAdd);
    this._buffMode = 'debuff';
    this.displayBuffs(target, result.addedDebuffs, TextManager.debuffAdd);
    this.displayBuffs(target, result.removedBuffs, TextManager.buffRemove);
    this._buffMode = 'buff';
    this.displayRemovedBuffs(target, result.removedBuffs);
    this._buffMode = 'debuff';
    this.displayRemovedBuffs(target, result.removedDebuffs);
  };

  const _Sprite_Battler_updateDamagePopup = Sprite_Battler.prototype.updateDamagePopup;
  Sprite_Battler.prototype.updateDamagePopup = function() {
    this.setupStatePopup();
    _Sprite_Battler_updateDamagePopup.call(this);
  };
  
  Sprite_Battler.prototype.setupStatePopup = function() {
    if (this._battler.isStatePopupRequested()) {
      if (this._battler.isSpriteVisible()) {
        this.createStatePopupSprite();
      }
      this._battler.clearStatePopup();
      this._battler.clearResult();
    }
  };
  
  Sprite_Battler.prototype.createStatePopupSprite = function() {
    const last = this._damages[this._damages.length - 1];
    const sprite = new Sprite_BattleStylePopUp();
    sprite.x = this.x + this.damageOffsetX();
    sprite.y = this.y + this.damageOffsetY();
    if (last) {
      sprite.delay = this._damages.length * PopUpUpdate;
      sprite.hide();
    } else {
      sprite.delay = 0;
    }
    sprite.setup(this._battler);
    this._damages.push(sprite);
    this.parent.addChild(sprite);
    this._popUpSprite = sprite;
  };


  function Sprite_BattleStylePopUp() {
    this.initialize(...arguments);
  }
  
  Sprite_BattleStylePopUp.prototype = Object.create(Sprite_Damage.prototype);
  Sprite_BattleStylePopUp.prototype.constructor = Sprite_BattleStylePopUp;
  
  Sprite_BattleStylePopUp.prototype.initialize = function() {
    Sprite_Damage.prototype.initialize.call(this);
    this._buffs = [];
  };

  Sprite_BattleStylePopUp.prototype.destroy = function(options) {
    for (const child of this.children) {
        if (child.bitmap && !child.bitmap.iconImg) {
            child.bitmap.destroy();
        }
    }
    Sprite.prototype.destroy.call(this, options);
};
  
  Sprite_BattleStylePopUp.prototype.setup = function(battler) {
    const result = battler.result();
    this._buffs = battler._buffs;
    this._buffLavel = battler.buffsLavel;
    if (result.addState > 0) {
      this.popUpState(result.addState, "add");
    } else if (result.addBuff >= 0) {
      this.popUpBuff(result.addBuff, "add");
    } else if (result.removeState > 0) {
      this.popUpState(result.removeState, "remove");
    } else if (result.removeBuff >= 0) {
      this.popUpBuff(result.removeBuff, "remove");
    }
  };
  
  Sprite_BattleStylePopUp.prototype.popUpState = function(id, mode) {
    const state = $dataStates[id];
    const popUpName = state.meta.PopUpStateName ? state.meta.PopUpStateName : $dataStates[id].name;
    if (state.meta.PopUpColor) {
      this._colorType = state.meta.PopUpColor;
    } else if (state.meta.PositiveState) {
      this._colorType = StateColor;
    } else if (state.meta.BatState) {
      this._colorType = BatStateColor;
    } else {
      this._colorType = 0;
    }
    if (mode === "remove") {
      this.opacity = PopUpReleaseOpacity;
    }
    const iconIndex = state.iconIndex;
    this.drawIcon(popUpName, iconIndex);
    this.createPopUp(popUpName, iconIndex);
    this._popName = popUpName;
  };
  
  Sprite_BattleStylePopUp.prototype.popUpBuff = function(id, mode) {
    const find = PopUpBuff.find(buff => buff.StateType === id);
    const popUpName = find.PopUpStateName ? find.PopUpStateName : (id < 10 ? TextManager.param(id) +"上昇" : TextManager.param(id - 10) +"低下");
    if (find && find.PopUpStateColor) {
      this._colorType = find.PopUpStateColor;
    } else if (id < 10) {
      this._colorType = StateColor;
    } else if (id >= 10) {
      this._colorType = BatStateColor;
    } else {
      this._colorType = 0;
    }
    if (mode === "remove") {
      this.opacity = PopUpReleaseOpacity;
    }
    const iconIndex = this.buffIconIndex(id, mode);
    this.drawIcon(popUpName, iconIndex);
    this.createPopUp(popUpName, iconIndex);
    this._popName = popUpName;
  };

  Sprite_BattleStylePopUp.prototype.buffIconIndex = function(id, mode) {
    const direction = mode === "remove" ? this.removeBuffLavle(id) : -1;
    if (id < 10) {
      return Game_BattlerBase.ICON_BUFF_START + (this._buffs[id] + direction) * 8 + id;
    } else {
      return Game_BattlerBase.ICON_DEBUFF_START + (-this._buffs[id - 10] + direction) * 8 + id - 10;
    }
  };

  Sprite_BattleStylePopUp.prototype.removeBuffLavle = function(id) {
    return id < 10 ? (this._buffLavel[id] - 1) : Math.abs(this._buffLavel[id - 10] + 1);
  };
  
  Sprite_BattleStylePopUp.prototype.damageColor = function() {
    return ColorManager.textColor(this._colorType);
  };
  
  Sprite_BattleStylePopUp.prototype.createPopUp = function(popUpName, iconIndex) {
    const sprite = this.createChildSprite(240, this.fontSize());
    let textMargin = 0;
    let x = 0;
    if (iconIndex > 0) {
      textMargin = ImageManager.iconWidth + 4;
    }
    sprite.bitmap.drawText(popUpName, textMargin, 0, 240 - textMargin, this.fontSize(), "center");
    sprite.dy = 0;
  };

  Sprite_BattleStylePopUp.prototype.drawIcon = function(popUpName, iconIndex) {
    if (iconIndex > 0) {
      const sprite = this.createChildSprite(ImageManager.iconWidth, this.fontSize());
      sprite.bitmap = ImageManager.loadSystem("IconSet");
      sprite.bitmap.fontSize = this.fontSize();
      const textMargin = Math.min(Math.floor((sprite.bitmap.measureTextWidth(popUpName) / 2)), 120 - Math.floor(ImageManager.iconWidth / 2) - 2);
      sprite.bitmap.iconImg = true;
      sprite.dy = 0;
      const pw = ImageManager.iconWidth;
      const ph = ImageManager.iconHeight;
      const sx = (iconIndex % 16) * pw;
      const sy = Math.floor(iconIndex / 16) * ph;
      sprite.setFrame(sx, sy, pw, ph);
      sprite.x -= textMargin;
      sprite.bitmap.y = 2;
    }
  };
  
  Sprite_BattleStylePopUp.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this.delay > 0) {
      this.delay--;
      if (this.delay <= 0) {
        this.show();
      }
      return;
    }
    if (this._duration > 0) {
        this._duration--;
        for (const child of this.children) {
            this.updateChild(child);
        }
    }
    this.updateFlash();
    this.updateOpacity();
  };

})();