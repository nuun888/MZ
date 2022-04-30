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
 * @version 1.1.0
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
 * 仕様
 * 戦闘行動結果ポップアッププラグインと併用時、このプラグインを戦闘行動結果ポップアッププラグインより下に設定した場合、ステート、バフのポップアップ
 * はこのプラグインでの表示になります。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/4/30 Ver 1.1.0
 * 一部プラグインとの競合解消。
 * 処理の最適化。
 * ポップアップテキストの仕様変更。
 * 2021/7/17 Ver 1.0.1
 * バトルスタイル拡張プラグインの互換モード対応。
 * 2021/7/17 Ver 1.0.0
 * 初版
 * 
 * @param PopUpWidth
 * @desc ポップアップメッセージ幅を指定します。（デフォルト240）
 * @text メッセージ幅
 * @type number
 * @default 240
 * 
 * @param PopUpBuff
 * @text ポップアップバフ設定
 * @desc ポップアップするバフの設定をします。
 * @default ["{\"StateType\":\"0\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"1\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"2\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"3\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"4\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"5\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"6\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"7\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"10\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"11\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"12\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"13\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"14\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"15\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"16\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"17\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}"]
 * @type struct<PopUpBuffList>[]
 * 
 * @param StateColor
 * @desc 有利なポップアップするときのステート、バフの色
 * @text 有利ステート、バフ文字色
 * @type number
 * @default 0
 * 
 * @param BatStateColor
 * @desc 不利なポップアップするときのステート、バフの色
 * @text 不利ステート、バフ文字色
 * @type number
 * @default 0
 * 
 * @param PopUpReleaseOpacity
 * @desc 解除時の不透明度
 * @text 解除時不透明度
 * @type number
 * @default 128
 * 
 * @param PopUpUpInterval
 * @desc ポップアップを連続で表示するときの間隔
 * @text ポップアップ間隔
 * @type number
 * @default 30
 * 
 * @param DeadNoPopup
 * @text 戦闘不能ポップアップ表示
 * @desc 戦闘不能のポップアップを表示します。
 * @type boolean
 * @default false
 * 
 * @param AddStatePopUpText
 * @desc 有利なステート付加時の共通ポップアップテキスト。(%1:ステート名)
 * @text 有利ステート付加時ポップアップテキスト
 * @type string
 * @default %1
 * 
 * @param AddBadStatePopUpText
 * @desc 不利なステート付加時の共通ポップアップテキスト。(%1:ステート名)
 * @text 不利ステート付加時ポップアップテキスト
 * @type string
 * @default %1
 * 
 * @param RemovedStatePopUpText
 * @desc 有利なステート解除時の共通ポップアップテキスト。(%1:ステート名)
 * @text 有利ステート解除時ポップアップテキスト
 * @type string
 * @default %1
 * 
 * @param RemovedBadStatePopUpText
 * @desc 不利なステート解除時の共通ポップアップテキスト。(%1:ステート名)
 * @text 不利ステート解除時ポップアップテキスト
 * @type string
 * @default %1
 * 
 * @param AddBuffPopUpText
 * @desc 有利なステート付加時の共通ポップアップテキスト。(%1:能力値名)
 * @text 有利ステート付加時ポップアップテキスト
 * @type string
 * @default %1上昇
 * 
 * @param AddDebuffPopUpText
 * @desc 不利なステート付加時の共通ポップアップテキスト。(%1:能力値名)
 * @text 不利ステート付加時ポップアップテキスト
 * @type string
 * @default %1低下
 * 
 * @param RemovedBuffPopUpText
 * @desc 有利なステート解除時の共通ポップアップテキスト。(%1:能力値名)
 * @text 有利ステート解除時ポップアップテキスト
 * @type string
 * @default %1上昇
 * 
 * @param RemovedDebuffPopUpText
 * @desc 不利なステート解除時の共通ポップアップテキスト。(%1:能力値名)
 * @text 不利ステート解除時ポップアップテキスト
 * @type string
 * @default %1低下
 * 
 * @param BattleEffectPopupSetting
 * @text 盗み設定(要盗みスキル)
 * @default ------------------------------
 * 
 */
/*~struct~PopUpBuffList:
 * 
 * @param StateType
 * @text バフポップアップ
 * @desc ポップアップさせるバフを指定します。
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
 * @text ポップアップテキスト
 * @desc ポップアップするテキストを記入します。記入がない場合は共通のテキストが表示されます。(%1:ステート名)
 * @type string
 * @default
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
  const PopUpUpInterval = Number(parameters['PopUpUpInterval'] || 30);
  const DeadNoPopup = eval(parameters['DeadNoPopup'] || 'false');
  const PopUpWidth = Number(parameters['PopUpWidth'] || 240);
  const AddStatePopUpText = String(parameters['AddStatePopUpText'] || '%1');
  const AddBadStatePopUpText = String(parameters['AddBadStatePopUpText'] || '%1');
  const RemovedStatePopUpText = String(parameters['RemovedStatePopUpText'] || '%1');
  const RemovedBadStatePopUpText = String(parameters['RemovedBadStatePopUpText'] || '%1');
  const AddBuffPopUpText = String(parameters['AddBuffPopUpText'] || '%1上昇');
  const AddDebuffPopUpText = String(parameters['AddDebuffPopUpText'] || '%1低下');
  const RemovedBuffPopUpText = String(parameters['AddBuffPopUpText'] || '%1上昇');
  const RemovedDebuffPopUpText = String(parameters['AddBuffPopUpText'] || '%1低下');
  let nuunPopup = false;

  function initPopUpData() {
    const popupData = {};
    popupData.name = null;
    popupData.color = 0;
    popupData.id = 0;
    popupData.iconIndex = 0;
    popupData.opacity = 255;
    return popupData;
  };

  const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function() {
    _Game_Battler_initMembers.call(this);
    this._statePopup = false;
    this.buffsLavel = [0, 0, 0, 0, 0, 0, 0, 0];
  };

  Game_Battler.prototype.isStatePopupRequested = function() {
    return this._nuunStatePopup;
  };
  
  Game_Battler.prototype.clearStatePopup = function() {
    this._nuunStatePopup = false;
  };

  Game_Battler.prototype.startStatePopup = function() {
    this._nuunStatePopup = true;
  };

  Game_Battler.prototype.addSetPopUpData = function(popup) {
    this.result().popupData = popup;
  };
  
  Game_Battler.prototype.getPopUpData = function() {
    return this.result().popupData;
  };

  Game_Battler.prototype.removeDebuff = function(paramId) {
    if (this.isAlive() && this.isBuffOrDebuffAffected(paramId)) {
      this.setBuffLavel(paramId);
      this.eraseBuff(paramId);
      this.result().pushRemovedDebuff(paramId);
      this.refresh();
    }
  };

  Game_Battler.prototype.removeBuff = function(paramId) {
    if (this.isAlive() && this.isBuffOrDebuffAffected(paramId)) {
        this.eraseBuff(paramId);
        this._result.pushRemovedBuff(paramId);
        this.refresh();
    }
  };

  const _Game_Battler_removeBuff = Game_Battler.prototype.removeBuff;
  Game_Battler.prototype.removeBuff = function(paramId) {
    _Game_Battler_removeBuff.call(this, paramId);
    const buff = this._buffs[paramId];
    if (buff < 0) {
      this.result().removedBuffs = [];
      this.removeDebuff(paramId);
    }
    this.setBuffLavel(paramId);
  };

  Game_Battler.prototype.setBuffLavel = function(id) {
    this.buffsLavel[id] = this._buffs[id];
  };

  Game_Battler.prototype.popupBuffIconIndex = function(id) {
    if (id < 10) {
      return Game_BattlerBase.ICON_BUFF_START + (this._buffs[id] - 1) * 8 + id;
    } else {
      return Game_BattlerBase.ICON_DEBUFF_START + (-this._buffs[id - 10] - 1) * 8 + id - 10;
    }
  };

  Game_Battler.prototype.removePopupBuffIconIndex = function(id) {
    if (id < 10) {
      return Game_BattlerBase.ICON_BUFF_START + (this._buffs[id] + this.removeBuffLavle(id)) * 8 + id;
    } else {
      return Game_BattlerBase.ICON_DEBUFF_START + (-this._buffs[id - 10] + this.removeBuffLavle(id)) * 8 + id - 10;
    }
  };

  Game_Battler.prototype.removePopupBuffLavle = function(id) {
    return id < 10 ? (this.buffLavel[id] - 1) : Math.abs(this.buffLavel[id - 10] + 1);
  };

  const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
  Game_ActionResult.prototype.clear = function() {
    _Game_ActionResult_clear.call(this);
    this.popupData = null;
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


  const _Window_BattleLog_pushPopupMessage = Window_BattleLog.prototype.pushPopupMessage;
  Window_BattleLog.prototype.pushPopupMessage = function(target, popUp) {
    if (!nuunPopup) {
      _Window_BattleLog_pushPopupMessage.call(this, target, popUp);
    }
  };

  const _Window_BattleLog_displayAffectedStatus = Window_BattleLog.prototype.displayAffectedStatus;
  Window_BattleLog.prototype.displayAffectedStatus = function(target) {
    if (target.result().isStatusAffected()) {
      this.displayPopUpState(target);
    }
    nuunPopup = true;
    _Window_BattleLog_displayAffectedStatus.call(this, target);
    nuunPopup = false;
  };
  
  Window_BattleLog.prototype.displayPopUpState = function(target) {
    const result = target.result();
      this.displayAddedPopUpState(target);
      this.displayRemovedPopUpState(target);
      this.displayPopUpBuffs(target, result.addedBuffs, false);
      this.displayPopUpBuffs(target, result.addedDebuffs, true);
      this.displayRemovedPopUpBuffs(target, result.removedBuffs, false);
      this.displayRemovedPopUpBuffs(target, result.removedDebuffs, true);
  };

  Window_BattleLog.prototype.displayAddedPopUpState = function(target) {
    const states = target.result().addedStateObjects();
    for (const state of states) {
      if (this.displayDeadPopup(target, state) && !state.meta.NoPopUp && !state.meta.AddNoPopUp) {
        const popupData = initPopUpData();
        const text = state.meta.PopUpStateName ? state.meta.PopUpStateName : (state.meta.PositiveState ? AddStatePopUpText : AddBadStatePopUpText);
        popupData.name = text.format(state.name);
        popupData.color = this.setupStatePopUpColor(state);
        popupData.id = state.id;
        popupData.iconIndex = state.iconIndex;
        this.push('popupState', target, popupData);
      }
    }
  };

  Window_BattleLog.prototype.displayRemovedPopUpState = function(target) {
    const states = target.result().removedStateObjects();
    for (const state of states) {
      if (this.displayDeadPopup(target, state) && !state.meta.NoPopUp && !state.meta.RemoveNoPopUp) {
        const popupData = initPopUpData();
        const text = state.meta.PopUpStateName ? state.meta.PopUpStateName : (state.meta.PositiveState ? RemovedStatePopUpText : RemovedBadStatePopUpText);
        popupData.name = text.format(state.name);
        popupData.color = this.setupStatePopUpColor(state);
        popupData.id = state.id;
        popupData.iconIndex = state.iconIndex;
        popupData.opacity = PopUpReleaseOpacity;
        this.push('popupState', target, state.id);
      }
    }
  };

  Window_BattleLog.prototype.displayPopUpBuffs = function(target, buffs, mode) {
    if (buffs.length > 0) {
      for (const paramId of buffs) {
        const id = mode ? paramId + 10 : paramId;
        const find = PopUpBuff.find(buff => buff.StateType === id);
        if (find) {
          const popupData = initPopUpData();
          if (find.StatePopUpMode === 0 || find.StatePopUpMode === 3) {
            const text = find.PopUpStateName ? find.PopUpStateName : (id < 10 ? AddBuffPopUpText : AddDebuffPopUpText);
            const paramId = id < 10 ? id : id - 10;
            popupData.name = text.format(TextManager.param(paramId));
            popupData.color = this.setupBuffPopUpColor(id, find);
            popupData.id = id;
            popupData.iconIndex = target.popupBuffIconIndex(id);
            this.push('popupState', target, popupData);
          }
        }
      }
    }
  };

  Window_BattleLog.prototype.displayRemovedPopUpBuffs = function(target, buffs, mode) {
    for (const paramId of buffs) {
      const id = mode ? paramId + 10 : paramId;
      const find = PopUpBuff.find(buff => buff.StateType === id);
      if (find) {
        const popupData = initPopUpData();
        if (find.StatePopUpMode === 0 || find.StatePopUpMode === 2) {
          const text = find.PopUpStateName ? find.PopUpStateName : (id < 10 ? RemovedBuffPopUpText : RemovedDebuffPopUpText);
          const paramId = id < 10 ? id : id - 10;
          popupData.name = text.format(TextManager.param(paramId));
          popupData.color = this.setupBuffPopUpColor(id, find);
          popupData.id = id;
          popupData.iconIndex = target.popupBuffIconIndex(id);
          popupData.opacity = PopUpReleaseOpacity;
          this.push('popupState', target, popupData);
        }
      }
    }
  };

  Window_BattleLog.prototype.setupStatePopUpColor = function(state) {
    if (state.meta.PopUpColor) {
      return state.meta.PopUpColor;
    } else if (state.meta.PositiveState) {
      return StateColor;
    } else if (state.meta.BatState) {
      return BatStateColor;
    } else {
      return 0;
    }
  };

  Window_BattleLog.prototype.setupBuffPopUpColor = function(id, find) {
    if (find && find.PopUpStateColor) {
      return find.PopUpStateColor;
    } else if (id < 10) {
      return StateColor;
    } else if (id >= 10) {
      return BatStateColor;
    } else {
      return 0;
    }
  };

  Window_BattleLog.prototype.displayDeadPopup = function(target, state) {
    return !DeadNoPopup ? state.id !== target.deathStateId() : true;
  };

  Window_BattleLog.prototype.popupState = function(target, popup) {
    target.startStatePopup();
    target.addSetPopUpData(popup);
  };
  
  function Sprite_PopUpEX() {
    this.initialize(...arguments);
  }
  
  Sprite_PopUpEX.prototype = Object.create(Sprite_Damage.prototype);
  Sprite_PopUpEX.prototype.constructor = Sprite_PopUpEX;
  
  Sprite_PopUpEX.prototype.initialize = function() {
    Sprite_Damage.prototype.initialize.call(this);
    //this._popupBitmap = null;
  };

  Sprite_PopUpEX.prototype.setup = function(battler) {
    this.drawPopup(battler);
  };

  Sprite_PopUpEX.prototype.destroy = function(options) {
    for (const child of this.children) {
        if (child.bitmap && !child.bitmap.iconImg) {
          child.bitmap.destroy();
        } else {
          child.bitmap = null;
        }
    }
    Sprite.prototype.destroy.call(this, options);
  };

  Sprite_PopUpEX.prototype.damageColor = function() {
    return ColorManager.textColor(this._colorType);
  };

  Sprite_PopUpEX.prototype.drawPopup = function(battler) {
    const popupData = battler.getPopUpData();
    this.drawIcon(popupData);
    this.createPopUp(popupData);
  };

  Sprite_PopUpEX.prototype.createPopUp = function(popupData) {
    const sprite = this.createChildSprite(PopUpWidth, this.fontSize());
    let textMargin = 0;
    if (popupData.iconIndex > 0) {
      textMargin = ImageManager.iconWidth + 4;
    }
    this.opacity = popupData.opacity;
    this._colorType = popupData.color;
    this.damageColor();
    sprite.bitmap.drawText(popupData.name, textMargin, 0, PopUpWidth - textMargin, this.fontSize(), "center");
    sprite.dy = 0;
  };

  Sprite_PopUpEX.prototype.drawIcon = function(popupData) {
    const iconIndex = popupData.iconIndex;
    if (iconIndex > 0) {
      const sprite = this.createChildSprite(ImageManager.iconWidth, this.fontSize());
      sprite.bitmap = ImageManager.loadSystem("IconSet");
      sprite.bitmap.fontSize = this.fontSize();
      const textMargin = Math.min(Math.floor((sprite.bitmap.measureTextWidth(popupData.name) / 2)), Math.floor(PopUpWidth / 2) - Math.floor(ImageManager.iconWidth / 2) - 2);
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

  Sprite_PopUpEX.prototype.update = function() {
    if (this.delay > 0) {
      this.delay--;
      if (this.delay <= 0) {
        this.show();
      }
      return;
    }
    Sprite_Damage.prototype.update.call(this);
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
    }
  };

  Sprite_Battler.prototype.createStatePopupSprite = function() {
    const last = this._damages[this._damages.length - 1];
    const sprite = new Sprite_PopUpEX();
    sprite.x = this.x + this.damageOffsetX();
    sprite.y = this.y + this.damageOffsetY();
    if (last) {
      sprite.delay = this._damages.length * PopUpUpInterval;
      sprite.hide();
    } else {
      sprite.delay = 0;
    }
    sprite.setup(this._battler);
    this._damages.push(sprite);
    this.parent.addChild(sprite);
    this._popUpSprite = sprite;
  };

})();