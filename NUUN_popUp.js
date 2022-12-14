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
 * @version 1.3.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 *            
 * @help
 * ステート、バフ付加解除時にステート、バフ名をポップアップさせます。
 * 
 * ステートのメモ欄
 * <PopUpStateName> ポップアップするステート名。無記入の場合はデータベースのステート名が表示されます。
 * <PositiveState> このステートは良いステートと判定します。
 * <BatState> このステートは悪いステートと判定します。
 * <NoPopUp> ポップアップを表示しません。
 * <AddNoPopUp> 付与時のポップアップを表示しません。
 * <RemoveNoPopUp> 解除時のポップアップを表示しません。
 * <PopUpColor:[colorIndex]> ポップアップ時の色を指定します。[colorIndex]:カラーインデックス番号またはカラーコード　例：<PopUpColor:17>
 * 
 * 盗み時のポップアップ設定
 * 別途「盗みスキル」(NUUN_StealableItems)が必要です。
 * ポップアップテキストフォーマット
 * %1:アイテム名、金額
 * 
 * プラグインパラメータのポップアップ色指定はテキストタブでカラーコードを記入できます。
 * 
 * 仕様
 * 戦闘行動結果ポップアッププラグインと併用時、このプラグインを戦闘行動結果ポップアッププラグインより下に設定した場合、ステート、バフのポップアップ
 * はこのプラグインでの表示になります。
 * 各ポップアップ毎にポップアップの種類を変えたい場合は、各ポップアッププラグインの適用クラスから'Sprite_PopUpEX'を外してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/12/15 Ver 1.3.2
 * 競合対策
 * 2022/12/5 Ver 1.3.1
 * 指定のポップアップで表示する機能を追加。
 * 座標、フォントサイズを設定できる機能を追加。
 * 2022/12/4 Ver 1.3.0
 * 撃破したときのポップアップを表示する機能を追加。
 * カラーコードを正常に取得できない問題を修正。
 * 2022/6/18 Ver 1.2.2
 * 横バウンドポップアップクラス毎適用機能実装のための定義変更。
 * 2022/6/18 Ver 1.2.1
 * 微修正。
 * 2022/6/14 Ver 1.2.0
 * 盗み時のポップアップに対応。(要NUUN_StealableItems)
 * 2022/5/2 Ver 1.1.3
 * バフ解除時の共通ポップアップのテキストが正常に適用されていなかった問題を修正。
 * バフ解除時のポップアップが正常に表示されていなかった問題を修正。
 * 横バウンドポップアップ適用による定義、プラグインパラメータの追加。
 * 2022/5/2 Ver 1.1.2
 * ポップアップ色が変わらない問題を修正。
 * ポップアップ色にカラーコードでも指定できるように修正。
 * 2022/5/1 Ver 1.1.1
 * ステート解除時にエラーが出る問題を修正。
 * ポップアップの表示方法を指定（デフォルト、固定）できる機能を追加。
 * 2022/4/30 Ver 1.1.0
 * 一部プラグインとの競合解消。
 * 処理の最適化。
 * ポップアップテキストの仕様変更。
 * 2021/7/17 Ver 1.0.1
 * バトルスタイル拡張プラグインの互換モード対応。
 * 2021/7/17 Ver 1.0.0
 * 初版
 * 
 * @param PopUpMode
 * @text ポップアップ表示モード
 * @desc ポップアップの表示モードを指定します。
 * @type select
 * @option デフォルト
 * @value 'default'
 * @option 同一位置
 * @value 'Same'
 * @default 'Same'
 * 
 * @param PopUpWidth
 * @desc ポップアップメッセージ幅を指定します。（デフォルト240）
 * @text メッセージ幅
 * @type number
 * @default 240
 * 
 * @param StateColor
 * @desc 有利なポップアップするときのステート、バフの色(システムカラーまたはカラーコード(テキストタブ))
 * @text 有利ステート、バフ文字色
 * @type number
 * @default 0
 * 
 * @param BatStateColor
 * @desc 不利なポップアップするときのステート、バフの色(システムカラーまたはカラーコード(テキストタブ))
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
 * @param StatePopUpSetting
 * @text ステートのポップアップ
 * @default ------------------------------
 * 
 * @param DeadNoPopup
 * @text 戦闘不能ポップアップ表示
 * @desc 戦闘不能のポップアップを表示します。
 * @type boolean
 * @default false
 * @parent StatePopUpSetting
 * 
 * @param AddStatePopUpText
 * @desc 有利なステート付加時の共通ポップアップテキスト。(%1:ステート名)
 * @text 有利ステート付加時ポップアップテキスト
 * @type string
 * @default %1
 * @parent StatePopUpSetting
 * 
 * @param AddBadStatePopUpText
 * @desc 不利なステート付加時の共通ポップアップテキスト。(%1:ステート名)
 * @text 不利ステート付加時ポップアップテキスト
 * @type string
 * @default %1
 * @parent StatePopUpSetting
 * 
 * @param RemovedStatePopUpText
 * @desc 有利なステート解除時の共通ポップアップテキスト。(%1:ステート名)
 * @text 有利ステート解除時ポップアップテキスト
 * @type string
 * @default %1
 * @parent StatePopUpSetting
 * 
 * @param RemovedBadStatePopUpText
 * @desc 不利なステート解除時の共通ポップアップテキスト。(%1:ステート名)
 * @text 不利ステート解除時ポップアップテキスト
 * @type string
 * @default %1
 * @parent StatePopUpSetting
 * 
 * @param StatePopupMode
 * @text 適用するポップアッププラグイン
 * @desc 適用させるポップアッププラグインを指定をします。
 * @default 
 * @type struct<PopupMode>
 * @parent StatePopUpSetting
 * 
 * @param StatePopupEnemyX
 * @desc 敵ポップアップX座標(相対)
 * @text 敵ポップアップX座標(相対)
 * @type number
 * @default 0
 * @min -9999
 * @parent StatePopUpSetting
 * 
 * @param StatePopupEnemyY
 * @desc 敵ポップアップY座標(相対)
 * @text 敵ポップアップY座標(相対)
 * @type number
 * @default 0
 * @min -9999
 * @parent StatePopUpSetting
 * 
 * @param StatePopupFontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default 4
 * @min -99
 * @parent StatePopUpSetting
 * 
 * @param BuffPopUpSetting
 * @text バフ、デバフのポップアップ
 * @default ------------------------------
 * 
 * @param PopUpBuff
 * @text ポップアップバフ設定
 * @desc ポップアップするバフの設定をします。
 * @default ["{\"StateType\":\"0\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"1\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"2\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"3\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"4\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"5\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"6\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"7\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"10\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"11\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"12\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"13\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"14\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"15\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"16\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"17\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}"]
 * @type struct<PopUpBuffList>[]
 * @parent BuffPopUpSetting
 * 
 * @param AddBuffPopUpText
 * @desc バフ付加時の共通ポップアップテキスト。(%1:能力値名)
 * @text バフ付加時ポップアップテキスト
 * @type string
 * @default %1上昇
 * @parent BuffPopUpSetting
 * 
 * @param AddDebuffPopUpText
 * @desc デバフ付加時の共通ポップアップテキスト。(%1:能力値名)
 * @text デバフ付加時ポップアップテキスト
 * @type string
 * @default %1低下
 * @parent BuffPopUpSetting
 * 
 * @param RemovedBuffPopUpText
 * @desc バフ解除時の共通ポップアップテキスト。(%1:能力値名)
 * @text バフ解除時ポップアップテキスト
 * @type string
 * @default %1上昇
 * @parent BuffPopUpSetting
 * 
 * @param RemovedDebuffPopUpText
 * @desc デバフ解除時の共通ポップアップテキスト。(%1:能力値名)
 * @text デバフ解除時ポップアップテキスト
 * @type string
 * @default %1低下
 * @parent BuffPopUpSetting
 * 
 * @param BuffDebuffPopupMode
 * @text 適用するポップアッププラグイン
 * @desc 適用させるポップアッププラグインを指定をします。
 * @default 
 * @type struct<PopupMode>
 * @parent BuffPopUpSetting
 * 
 * @param BuffDebuffPopupEnemyX
 * @desc 敵ポップアップX座標(相対)
 * @text 敵ポップアップX座標(相対)
 * @type number
 * @default 0
 * @min -9999
 * @parent BuffPopUpSetting
 * 
 * @param BuffDebuffPopupEnemyY
 * @desc 敵ポップアップY座標(相対)
 * @text 敵ポップアップY座標(相対)
 * @type number
 * @default 0
 * @min -9999
 * @parent BuffPopUpSetting
 * 
 * @param BuffDebuffPopupFontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default 4
 * @min -99
 * @parent BuffPopUpSetting
 * 
 * @param DefeatPopUpSetting
 * @text 撃破時のポップアップ
 * @default ------------------------------
 * 
 * @param DefeatShowPopup
 * @text 撃破時ポップアップ表示
 * @desc 撃破時のポップアップを表示します。
 * @type boolean
 * @default false
 * @parent DefeatPopUpSetting
 * 
 * @param DefeatPopUpText
 * @desc 撃破時のポップアップテキスト。
 * @text 撃破時ポップアップテキスト
 * @type string
 * @default 撃破！
 * @parent DefeatPopUpSetting
 * 
 * @param DefeatPopupColor
 * @desc 撃破時のポップアップカラー(システムカラーまたはカラーコード(テキストタブ))
 * @text 撃破時ポップアップ文字色
 * @type number
 * @default 0
 * @parent DefeatPopUpSetting
 * 
 * @param DefeatPopupIconIndex
 * @desc 撃破時ポップアップのアイコンID
 * @text 撃破時ポップアップアイコンID
 * @type number
 * @default 0
 * @parent DefeatPopUpSetting
 * 
 * @param DefeatPopupMode
 * @text 適用するポップアッププラグイン
 * @desc 適用させるポップアッププラグインを指定をします。
 * @default 
 * @type struct<PopupMode>
 * @parent DefeatPopUpSetting
 * 
 * @param DefeatPopupEnemyX
 * @desc 敵ポップアップX座標(相対)
 * @text 敵ポップアップX座標(相対)
 * @type number
 * @default 0
 * @min -9999
 * @parent DefeatPopUpSetting
 * 
 * @param DefeatPopupEnemyY
 * @desc 敵ポップアップY座標(相対)
 * @text 敵ポップアップY座標(相対)
 * @type number
 * @default 0
 * @min -9999
 * @parent DefeatPopUpSetting
 * 
 * @param DefeatPopupFontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default 4
 * @min -99
 * @parent DefeatPopUpSetting
 * 
 * @param StealPopupSetting
 * @text 盗み設定(要NUUN_StealableItems)
 * @default ------------------------------
 * 
 * @param StealPopUpValid
 * @type boolean
 * @default false
 * @text 盗みポップアップ適用
 * @desc 盗み時ポップアップを適用します。（要NUUN_StealableItems）
 * @parent StealPopupSetting
 * 
 * @param StealPopUpText
 * @desc アイテムを盗んだ時の共通ポップアップテキスト。(%1:アイテム名)
 * @text アイテム盗み時ポップアップテキスト
 * @type string
 * @default %1Get
 * @parent StealPopupSetting
 * 
 * @param StolenPopUpText
 * @desc アイテムを盗まれた時の共通ポップアップテキスト。(%1:アイテム名)
 * @text アイテム盗まれ時ポップアップテキスト
 * @type string
 * @default %1Lost
 * @parent StealPopupSetting
 * 
 * @param StealGoldPopUpText
 * @desc お金を盗んだ時の共通ポップアップテキスト。(%1:金額)
 * @text お金盗み時ポップアップテキスト
 * @type string
 * @default %1Get
 * @parent StealPopupSetting
 * 
 * @param StolenGoldPopUpText
 * @desc お金を盗まれた時の共通ポップアップテキスト。(%1:金額)
 * @text お金盗まれ時ポップアップテキスト
 * @type string
 * @default %1Lost
 * @parent StealPopupSetting
 * 
 * @param StealPopupMode
 * @text 適用するポップアッププラグイン
 * @desc 適用させるポップアッププラグインを指定をします。
 * @default 
 * @type struct<PopupMode>
 * @parent StealPopupSetting
 * 
 * @param StealPopupEnemyX
 * @desc 敵ポップアップX座標(相対)
 * @text 敵ポップアップX座標(相対)
 * @type number
 * @default 0
 * @min -9999
 * @parent StealPopupSetting
 * 
 * @param StealPopupEnemyY
 * @desc 敵ポップアップY座標(相対)
 * @text 敵ポップアップY座標(相対)
 * @type number
 * @default 0
 * @min -9999
 * @parent StealPopupSetting
 * 
 * @param StealPopupFontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default 4
 * @min -99
 * @parent StealPopupSetting
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
 * @param PopUpBadBuffText
 * @text 有利ポップアップテキスト
 * @desc 上昇系ポップアップするテキストを記入します。記入がない場合は共通のテキストが表示されます。(%1:ステート名)
 * @type string
 * @default
 * 
 * @param PopUpBadBuffText
 * @text 不利ポップアップテキスト
 * @desc 低下系ポップアップするテキストを記入します。記入がない場合は共通のテキストが表示されます。(%1:ステート名)
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
 * @desc ポップアップするときのステートの色(システムカラーまたはカラーコード(テキストタブ))
 * @text 文字色
 * @type number
 * @default 0
 * 
 */
/*~struct~PopupMode:
 * 
 * @param Mode
 * @text 適用ポップアップ設定
 * @desc 適用するポップアップスプラグインを指定します。
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_popUp = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_popUp');
  const PopUpMode = eval(parameters['PopUpMode']) || 'default';
  const PopUpBuff = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopUpBuff'])) : null) || [];
  const StateColor = (DataManager.nuun_structureData(parameters['StateColor'])) || 0;
  const BatStateColor = (DataManager.nuun_structureData(parameters['BatStateColor'])) || 0;
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
  const RemovedBuffPopUpText = String(parameters['RemovedBuffPopUpText'] || '%1上昇');
  const RemovedDebuffPopUpText = String(parameters['RemovedDebuffPopUpText'] || '%1低下');
  const DefeatShowPopup = eval(parameters['DefeatShowPopup'] || 'false');
  const DefeatPopUpText = String(parameters['DefeatPopUpText'] || '撃破!');
  const DefeatPopupColor = (DataManager.nuun_structureData(parameters['DefeatPopupColor'])) || 0;
  const DefeatPopupIconIndex = Number(parameters['DefeatPopupIconIndex'] || 0);
  const StealPopUpValid = eval(parameters['StealPopUpValid'] || 'false');
  const StealPopUpText = String(parameters['StealPopUpText'] || '%1Get');
  const StolenPopUpText = String(parameters['StolenPopUpText'] || '%1Lost');
  const StealGoldPopUpText = String(parameters['StealGoldPopUpText'] || '%1Get');
  const StolenGoldPopUpText = String(parameters['StolenGoldPopUpText'] || '%1Lost');
  const StatePopupEnemyX = Number(parameters['StatePopupEnemyX'] || 0);
  const StatePopupEnemyY = Number(parameters['StatePopupEnemyY'] || 0);
  const BuffDebuffPopupEnemyX = Number(parameters['BuffDebuffPopupEnemyX'] || 0);
  const BuffDebuffPopupEnemyY = Number(parameters['BuffDebuffPopupEnemyY'] || 0);
  const DefeatPopupEnemyX = Number(parameters['DefeatPopupEnemyX'] || 0);
  const DefeatPopupEnemyY = Number(parameters['DefeatPopupEnemyY'] || 0);
  const StealPopupEnemyX = Number(parameters['StealPopupEnemyX'] || 0);
  const StealPopupEnemyY = Number(parameters['StealPopupEnemyY'] || 0);
  const StatePopupFontSize = Number(parameters['StatePopupFontSize'] || 4);
  const BuffDebuffPopupFontSize = Number(parameters['BuffDebuffPopupFontSize'] || 4);
  const DefeatPopupFontSize = Number(parameters['DefeatPopupFontSize'] || 4);
  const StealPopupFontSize = Number(parameters['StealPopupFontSize'] || 4);
  const StatePopupMode = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['StatePopupMode'])) : null) || [];
  const BuffDebuffPopupMode = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['BuffDebuffPopupMode'])) : null) || [];
  const DefeatPopupMode = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefeatPopupMode'])) : null) || [];
  const StealPopupMode = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['StealPopupMode'])) : null) || [];
  let nuunPopup = false;

  function initPopUpData() {
    const popupData = {};
    popupData.name = null;
    popupData.color = 0;
    popupData.id = 0;
    popupData.iconIndex = 0;
    popupData.opacity = 255;
    popupData.mode = 'Default';
    popupData.x = 0;
    popupData.y = 0;
    popupData.fontsize = 0;
    return popupData;
  };

  const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function() {
    _Game_Battler_initMembers.call(this);
    this._nuunStatePopup = false;
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

  const _Game_Battler_removeBuff = Game_Battler.prototype.removeBuff;
  Game_Battler.prototype.removeBuff = function(paramId) {
    this.setBuffLevel(paramId);
    if (this.isAlive() && this.isBuffOrDebuffAffected(paramId)) {
      this._result.pushRemovedDebuff(paramId);
    }
    _Game_Battler_removeBuff.call(this, paramId);
  };

  Game_Battler.prototype.setBuffLevel = function(id) {
    this.result().buffsLevel[id] = this._buffs[id];
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
      return Game_BattlerBase.ICON_BUFF_START + (this.removePopupBuffLevel(id) * 8) + id;
    } else {
      return Game_BattlerBase.ICON_DEBUFF_START + (this.removePopupBuffLevel(id) * 8) + id - 10;
    }
  };

  Game_Battler.prototype.removePopupBuffLevel = function(id) {
    return id < 10 ? (this.result().buffsLevel[id] - 1) : Math.abs(this.result().buffsLevel[id - 10]) - 1;
  };

  const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
  Game_BattlerBase.prototype.die = function() {
    _Game_BattlerBase_die.call(this);
    this.result().defeatPopup = true;
  };

  Game_Battler.prototype.shouldPopupDefeat = function() {
    return !!this._result.defeatPopup;
  };

  const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
  Game_ActionResult.prototype.clear = function() {
    _Game_ActionResult_clear.call(this);
    this.popupData = null;
    this.removedPositiveBuffs = [];
    this.removedDebuffs = [];
    this.buffsLevel = [0, 0, 0, 0, 0, 0, 0, 0];
    this.defeatPopup = false;
  };

  const _Game_ActionResult_pushRemovedBuff = Game_ActionResult.prototype.pushRemovedBuff;
  Game_ActionResult.prototype.pushRemovedBuff = function(paramId) {
    _Game_ActionResult_pushRemovedBuff.call(this, paramId);
    if (this.buffsLevel[paramId] > 0) {
      this.removedPositiveBuffs.push(paramId);
    }
  };

  Game_ActionResult.prototype.pushRemovedDebuff = function(paramId) {
    if (this.buffsLevel[paramId] < 0) {
      this.removedDebuffs.push(paramId);
    }
  };

  Game_ActionResult.prototype.stealPopupText = function(type) {
    switch (type) {
      case 'getSteal':
        return StealPopUpText;
      case 'stolenName':
        return StolenPopUpText;
      case 'getGold':
        return StealGoldPopUpText;
      case 'stolenGold':
        return StolenGoldPopUpText;
    }
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
    if (DefeatShowPopup && target.shouldPopupDefeat()) {
      this.displayAffectedDefeat(target);
    }
    nuunPopup = true;
    _Window_BattleLog_displayAffectedStatus.call(this, target);
    nuunPopup = false;
  };

  Window_BattleLog.prototype.displayAffectedDefeat = function(target) {
    const popupData = initPopUpData();
    popupData.name = DefeatPopUpText;
    popupData.color = DefeatPopupColor;
    popupData.id = 0;
    popupData.iconIndex = DefeatPopupIconIndex;
    popupData.mode = DefeatPopupMode.Mode;
    popupData.x = DefeatPopupEnemyX;
    popupData.y = DefeatPopupEnemyY;
    popupData.fontsize = DefeatPopupFontSize;
    this.push('nuun_popupState', target, popupData);
  };
  
  Window_BattleLog.prototype.displayPopUpState = function(target) {
    const result = target.result();
      this.displayAddedPopUpState(target);
      this.displayRemovedPopUpState(target);
      this.displayPopUpBuffs(target, result.addedBuffs, false);
      this.displayPopUpBuffs(target, result.addedDebuffs, true);
      this.displayRemovedPopUpBuffs(target, result.removedPositiveBuffs, false);
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
        popupData.mode = StatePopupMode.Mode;
        popupData.x = StatePopupEnemyX;
        popupData.y = StatePopupEnemyY;
        popupData.fontsize = StatePopupFontSize;
        this.push('nuun_popupState', target, popupData);
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
        popupData.mode = StatePopupMode.Mode;
        popupData.x = StatePopupEnemyX;
        popupData.y = StatePopupEnemyY;
        popupData.fontsize = StatePopupFontSize;
        this.push('nuun_popupState', target, popupData);
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
            const text = find.PopUpBuffText ? find.PopUpBuffText : (id < 10 ? AddBuffPopUpText : AddDebuffPopUpText);
            const paramId = id < 10 ? id : id - 10;
            popupData.name = text.format(TextManager.param(paramId));
            popupData.color = this.setupBuffPopUpColor(id, find);
            popupData.id = id;
            popupData.iconIndex = target.popupBuffIconIndex(id);
            popupData.mode = BuffDebuffPopupMode.Mode;
            popupData.x = BuffDebuffPopupEnemyX;
            popupData.y = BuffDebuffPopupEnemyY;
            popupData.fontsize = BuffDebuffPopupFontSize;
            this.push('nuun_popupState', target, popupData);
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
          const text = find.PopUpBadBuffText ? find.PopUpBadBuffText : (id < 10 ? RemovedBuffPopUpText : RemovedDebuffPopUpText);
          const paramId = id < 10 ? id : id - 10;
          popupData.name = text.format(TextManager.param(paramId));
          popupData.color = this.setupBuffPopUpColor(id, find);
          popupData.id = id;
          popupData.iconIndex = target.removePopupBuffIconIndex(id);
          popupData.opacity = PopUpReleaseOpacity;
          popupData.mode = BuffDebuffPopupMode.Mode;
          popupData.x = BuffDebuffPopupEnemyX;
          popupData.y = BuffDebuffPopupEnemyY;
          popupData.fontsize = BuffDebuffPopupFontSize;
          this.push('nuun_popupState', target, popupData);
        }
      }
    }
  };

  Window_BattleLog.prototype.stealPopup = function(target, item) {
    if (StealPopUpValid) {
      const popupData = initPopUpData();
      popupData.name = item.popupText.format(item.name);
      popupData.color = 0;
      popupData.id = item.id;
      popupData.iconIndex = item.iconIndex;
      popupData.mode = StealPopupMode.Mode;
      popupData.x = StealPopupEnemyX;
      popupData.y = StealPopupEnemyY;
      popupData.fontsize = StealPopupFontSize;
      this.push('nuun_popupState', target, popupData);
    }
  };

  Window_BattleLog.prototype.setupStatePopUpColor = function(state) {
    if (state.meta.PopUpColor) {
      return (isNaN(Number(state.meta.PopUpColor)) ? state.meta.PopUpColor : Number(state.meta.PopUpColor));
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

  Window_BattleLog.prototype.nuun_popupState = function(target, popup) {
    target.startStatePopup();
    target.addSetPopUpData(popup);
  };
  
  function Sprite_PopUpEX() {
    this.initialize(...arguments);
  }
  
  Sprite_PopUpEX.prototype = Object.create(Sprite_Damage.prototype);
  Sprite_PopUpEX.prototype.constructor = Sprite_PopUpEX;
  
  Sprite_PopUpEX.prototype.initialize = function(mode) {
    this._popupMode = mode;
    this.popupData = null;
    Sprite_Damage.prototype.initialize.call(this);
    //this._popupBitmap = null;
  };

  Sprite_PopUpEX.prototype.setup = function(battler) {
    this.popupData = battler.getPopUpData();
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
    return NuunManager.getColorCode(this._colorType);
  };

  Sprite_PopUpEX.prototype.drawPopup = function(battler) {
    const popupData = this.popupData;
    if (popupData) {
      this.drawIcon(popupData);
      this.createPopUp(popupData);
    }
  };

  Sprite_PopUpEX.prototype.createPopUp = function(popupData) {
    const sprite = this.createChildSprite(PopUpWidth, this.fontSize());
    let textMargin = 0;
    if (popupData.iconIndex > 0) {
      textMargin = ImageManager.iconWidth + 4;
    }
    this.opacity = popupData.opacity;
    this.setDefaultOpacity();
    this._colorType = popupData.color;
    sprite.bitmap.textColor = this.damageColor();
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
      if (PopUpUpInterval > 0) {
        return;
      }
    }
    Sprite_Damage.prototype.update.call(this);
  };

  Sprite_PopUpEX.prototype.fontSize = function() {
    return $gameSystem.mainFontSize() + this.popupData.fontsize || 4;
  };

  const _Sprite_Damage_updateOpacity = Sprite_Damage.prototype.updateOpacity;
  Sprite_Damage.prototype.updateOpacity = function() {
    if (this._setOpacity !== undefined) {
      if (this._duration < 10) {
        this.opacity = (this.getOpacity() * this._duration) / 10;
      }
    } else {
      _Sprite_Damage_updateOpacity.call(this);
    }
  };

  Sprite_Damage.prototype.setDefaultOpacity = function() {
    this._setOpacity = this.opacity;
  };

  Sprite_Damage.prototype.getOpacity = function() {
    return this._setOpacity || 255;
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
    const popupData = this._battler.getPopUpData();
    const popupMode = popupData ? getPopupClass(popupData.mode) : 0;
    const sprite = new Sprite_PopUpEX(popupMode);
    if (last && PopUpMode === 'default') {
      sprite.x = last.x + 8;
      sprite.y = last.y - 16;
    } else {
      sprite.x = this.x + this.damageOffsetX() + this.damagePopupOffsetX(popupData);
      sprite.y = this.y + this.damageOffsetY() + this.damagePopupOffsetY(popupData);
    }
    if (last) {
      sprite.delay = this._damages.length * Math.max(PopUpUpInterval, 1);
      sprite.hide();
    } else {
      sprite.delay = 0;
    }
    sprite.setup(this._battler);
    this._damages.push(sprite);
    this.parent.addChild(sprite);
    this._popUpSprite = sprite;
  };

  Sprite_Battler.prototype.damagePopupOffsetX = function() {
    return 0;
  };

  Sprite_Battler.prototype.damagePopupOffsetY = function() {
    return 0;
  };

  Sprite_Enemy.prototype.damagePopupOffsetX = function(data) {
    return data.x || 0;
  };

  Sprite_Enemy.prototype.damagePopupOffsetY = function(data) {
    return data.y || 0;
  };

  function getPopupClass(mode) {
    switch (mode) {
      case 'LateralBoundPopUp':
        return 1;
      case 'SlideFadeoutPopup':
        return 2;
      case 'UpFadeoutPopup':
        return 3;
      case 'Default':
      default:
        return 0;
    }
  }

})();