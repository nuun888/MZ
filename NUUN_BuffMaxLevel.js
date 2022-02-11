/*:-----------------------------------------------------------------------------------
 * NUUN_BuffMaxLevel.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc バフ、デバフ重ね掛け上限変更
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * バフ、デバフの重ね掛けの上限値を変更します。
 * また表示するアイコンの開始インデックス番号も変更できます。
 * 
 * アイコンの設定
 * バフ、デバフのアイコンインデックスは１段階につき指定した開始インデックス + バフ（デバフ）レベル * 8になっています。
 * デフォルトだとバフの開始インデックスが32、強化バフが40、デバフの開始インデックスが48、強化デバフが56になっています。
 * ３段階以上のアイコンを設定するには、強化デバフから連番でHP、MP、攻撃力、防御力、魔法力、魔法防御、敏捷性、運の順で設定します。
 * 
 * 更新履歴
 * 2022/2/11 Ver.1.0.0
 * 初版
 * 
 * @param BuffIconIndex
 * @text バフ開始インデックス
 * @desc バフ開始アイコンインデックスID
 * @type number
 * @default 32
 * 
 * @param DebuffIconIndex
 * @text デバフ開始インデックス
 * @desc デバフ開始アイコンインデックスID
 * @type number
 * @default 48
 * 
 * @param HPBuffMaxLevel
 * @text HPバフ最大レベル
 * @desc HPバフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param HPDebuffMaxLevel
 * @text HPデバフ最大レベル
 * @desc HPデバフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param MPBuffMaxLevel
 * @text MPバフ最大レベル
 * @desc MPバフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param MPDebuffMaxLevel
 * @text MPデバフ最大レベル
 * @desc MPデバフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param AtkBuffMaxLevel
 * @text 攻撃力バフ最大レベル
 * @desc 攻撃力バフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param AtkDebuffMaxLevel
 * @text 攻撃力デバフ最大レベル
 * @desc 攻撃力デバフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param DefBuffMaxLevel
 * @text 防御力バフ最大レベル
 * @desc 防御力バフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param DefDebuffMaxLevel
 * @text 防御力デバフ最大レベル
 * @desc 防御力デバフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param MatBuffMaxLevel
 * @text 魔法力バフ最大レベル
 * @desc 魔法撃力バフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param MatkDebuffMaxLevel
 * @text 魔法力デバフ最大レベル
 * @desc 魔法力デバフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param MdffBuffMaxLevel
 * @text 魔法防御バフ最大レベル
 * @desc 魔法防御バフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param MdfDebuffMaxLevel
 * @text 魔法防御デバフ最大レベル
 * @desc 魔法防御デバフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param AgiBuffMaxLevel
 * @text 敏捷性バフ最大レベル
 * @desc 敏捷性バフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param AgikDebuffMaxLevel
 * @text 敏捷性デバフ最大レベル
 * @desc 敏捷性デバフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param LukfBuffMaxLevel
 * @text 運バフ最大レベル
 * @desc 運バフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 * @param LukDebuffMaxLevel
 * @text 運デバフ最大レベル
 * @desc 運デバフ時の重ね掛けの最大レベル
 * @type number
 * @default 2
 * @min 1
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BuffMaxLevel = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BuffMaxLevel');
const buffParams = [];
const debuffParams = [];
const BuffIconIndex = Number(parameters['BuffIconIndex'] || 32);
const DebuffIconIndex = Number(parameters['DebuffIconIndex'] || 48);
buffParams[0] = Number(parameters['HPBuffMaxLevel'] || 2);
debuffParams[0] = Number(parameters['HPDebuffMaxLevel'] || 2);
buffParams[1] = Number(parameters['MPBuffMaxLevel'] || 2);
debuffParams[1] = Number(parameters['MPDebuffMaxLevel'] || 2);
buffParams[2] = Number(parameters['AtkBuffMaxLevel'] || 2);
debuffParams[2] = Number(parameters['AtkDebuffMaxLevel'] || 2);
buffParams[3] = Number(parameters['DefBuffMaxLevel'] || 2);
debuffParams[3] = Number(parameters['DefDebuffMaxLevel'] || 2);
buffParams[4] = Number(parameters['MatBuffMaxLevel'] || 2);
debuffParams[4] = Number(parameters['MatDebuffMaxLevel'] || 2);
buffParams[5] = Number(parameters['MatBuffMaxLevel'] || 2);
debuffParams[5] = Number(parameters['MatDebuffMaxLevel'] || 2);
buffParams[6] = Number(parameters['AgiBuffMaxLevel'] || 2);
debuffParams[6] = Number(parameters['AgiDebuffMaxLevel'] || 2);
buffParams[7] = Number(parameters['LukBuffMaxLevel'] || 2);
debuffParams[7] = Number(parameters['LukDebuffMaxLevel'] || 2);

Game_BattlerBase.ICON_BUFF_START = BuffIconIndex;
Game_BattlerBase.ICON_DEBUFF_START = DebuffIconIndex;


Game_BattlerBase.prototype.isMaxBuffAffected = function(paramId) {//再定義
    return this._buffs[paramId] === buffParams[paramId];
};

Game_BattlerBase.prototype.isMaxDebuffAffected = function(paramId) {//再定義
    return this._buffs[paramId] === debuffParams[paramId] * -1;
};

})();