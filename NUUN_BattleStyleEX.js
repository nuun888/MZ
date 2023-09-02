/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEX.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc バトルスタイル拡張
 * @author NUUN
 * @version 3.12.4
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_ActorPicture
 * 
 * @help
 * バトルスタイル拡張プラグインのベースプラグインです。単体では動作しません。
 * 
 * 更新履歴
 * 2023/9/2 Ver.3.12.4
 * メンバー入れ替え時のアクター画像を一旦消去するように修正。
 * 2023/8/8 Ver.3.12.3
 * メンバー入れ替え時にカーソルの位置がずれて表示される問題を修正。
 * 2023/7/30 Ver.3.12.2
 * 味方の画像切り替えでランダムに表示できる機能を追加。
 * 2023/7/21 Ver.3.12.1
 * 敵の攻撃時の画像切り替えが機能していなかった問題を修正。
 * 2023/7/17 Ver.3.12.0
 * 敵の画像切り替えに関する処理の変更。
 * 2023/7/8 Ver.3.11.3
 * アクターのアニメーション、ポップアップの位置を修正。
 * 2023/7/3 Ver.3.11.2
 * マンガ的表現のバトルビューとの競合対応。
 * 画像切り替え機能で反撃(反射)から元に戻らない問題を修正。
 * 2023/7/2 Ver.3.11.1
 * 天候を戦闘中でも切り替えられるように修正。
 * 戦闘中の天候をスイッチで切り替えられる機能を追加。
 * 戦闘開始時及び戦闘終了時に指定のコモンイベントを指定できる機能を追加。
 * 2023/7/2 Ver.3.11.0
 * 戦闘中に天候を適用できる機能を追加。
 * 2023/6/26 Ver.3.10.16
 * カウンターの画像切り替え処理を修正。
 * 2023/6/22 Ver.3.10.15
 * Dynamic Motionプラグインとの競合対策。
 * 2023/6/14 Ver.3.10.14
 * スキル発動待機時間ゲージ表示プラグインとの競合対応。
 * 2023/6/3 Ver.3.10.13
 * バトルウィンドウの表示形式をVer.3.10.6以前の方式とVer.3.10.7以降の方式を選択できる機能を追加。
 * 2023/5/27 Ver.3.10.12
 * ヘルプウィンドウスキンが非表示にならない問題を修正。
 * 2023/5/24 Ver.3.10.11
 * メッセージウィンドウのウィンドウスキン表示をOFFにすると、戦闘時以外で通常のウィンドウスキンが表示されなくなる問題を修正。
 * 2023/5/22 Ver.3.10.10
 * マップ中でメッセージウィンドウスキンが表示されなくなる問題を修正。
 * 条件付きアクター画像にクリティカルダメージ時を追加。
 * ステートアニメーションが行動エフェクト時にずれる問題を修正。
 * 2023/5/14 Ver.3.10.9
 * アクター画像がない場合にエラーが出る問題を修正。
 * 2023/5/7 Ver.3.10.8
 * 戦闘中のアクターへのアニメーション実行プラグイン対応による処理追加。
 * 2023/5/2 Ver.3.10.7
 * 一部のアニメーションで正常に表示されない問題を修正。
 * 2023/4/30 Ver.3.10.6
 * 画像の表示に条件を指定できる機能を追加。
 * 行動エフェクト時に顔グラが消える問題を修正
 * 2023/4/16 Ver.3.10.5
 * 行動エフェクトと攻撃時の画像切り替えで画像の座標がずれる問題を修正。
 * 2023/4/13 Ver.3.10.4
 * カウンター時のスキル発動時のアクター画像切り替えを行うように修正。
 * カウンター時は行動時エフェクトを行わないように修正。
 * 2023/4/11 Ver.3.10.3
 * CounterExtend(トリアコンタン氏)に対応。
 * 2023/3/27 Ver.3.10.2
 * 複数メッセージウィンドウと競合を起こす問題を修正。
 * 2023/3/12 Ver.3.10.1
 * 味方へのクリティカル時と通常ダメージ時の振動設定を別々に変更。
 * 2023/2/27 Ver.3.10.0
 * ゲームパッドを振動させる機能を正式に追加。(要NUUN_GamePadVibration)
 * 2023/2/26 Ver.3.9.1
 * 通常攻撃の画像が変化しなかった問題を修正。
 * 試験的に味方のダメージ時にゲームパッドを振動させる機能を追加。
 * 2023/2/24 Ver.3.9.0
 * アクターステータスの各アクター表示の位置、幅を指定できる機能を追加。
 * 戦闘アニメーションがないスキルを使用後、ステートを付加させると攻撃時の画像が瞬間表示される問題を修正。
 * 2023/2/23 Ver.3.8.11
 * 戦闘中セリフ表示プラグインとの競合対策。
 * 2023/2/11 Ver.3.8.10
 * アクターコンテンツを下側から表示する機能を追加。
 * 2023/1/23 Ver.3.8.9
 * 味方対象選択時キャンセルを押すと、スキル、アイテム画面とアクターコマンドが同時に表示される問題を修正。
 * 2023/1/22 Ver.3.8.8
 * アクターのフラッシュを他のアクターと同期するように修正。
 * 2023/1/21 Ver.3.8.7
 * MVアニメーションの時にフラッシュを行うと、アクターの色が戻らない問題を修正。
 * 2023/1/8 Ver.3.8.6
 * アクター名、オリジナルパラメータ、レベルの表示文字揃えを行う処理を追加。
 * 味方対象選択時キャンセルをすると、対象者の行動時背景が表示されない問題を修正。
 * 2022/12/24 Ver.3.8.5
 * アクター名に任意のフォントを指定できる機能を追加。
 * 2022/12/10 Ver.3.8.4
 * 敵のダメージポップアップの位置を指定できる機能を追加。
 * 2022/11/26 Ver.3.8.3
 * 行動時ズーム時にAPNGの画像の座標がずれてしまう問題を修正。
 * 2022/11/12 Ver.3.8.2
 * 立ち絵が切り替わると表示が消えてしまう問題を修正。
 * 2022/11/7 Ver.3.8.1
 * アクター画像をAPNGに対応。
 * 2022/10/18 Ver.3.8.0
 * スキル、アイテム選択画面の座標、横幅、行数、列数を設定できる機能を追加。
 * 2022/10/16 Ver.3.7.10
 * 微修正。
 * 2022/10/16 Ver.3.7.9
 * アクター別ウィンドウ表示時に矢印が表示されてしまう問題を修正。
 * 2022/10/15 Ver.3.7.8
 * ステート無付加時のステートアイコンが敵にも適用されてしまう問題を修正。
 * 2022/10/15 Ver.3.7.7
 * ステートが一つも付加されていないときに表示するアイコンを指定できる機能を追加。
 * 2022/10/9 Ver.3.7.6
 * 一部のウィンドウスキンが適用されない問題を修正。
 * 2022/10/9 Ver.3.7.5
 * タイプ4追加による処理追加。
 * 戦闘開始時にウィンドウが移動しないように修正。
 * 2022/9/17 Ver.3.7.4
 * 敵対象選択画面のモンスター名の表示をアクター名と同じ仕様にする機能を追加。
 * 2022/9/10 Ver.3.7.3
 * TPBバトルでサポートアクターが最初にコマンド選択するときにパーティコマンドが２回表示されてしまう問題を修正。
 * 2022/9/10 Ver.3.7.2
 * 画面サイズとUIサイズが異なるときにアクターコマンドの表示位置をactorに設定したときに、コマンドの表示がずれる問題を修正。
 * 2022/9/3 Ver.3.7.1
 * 外部プラグインでサイドビューアクターを表示すると正常に表示されない問題を修正。
 * 2022/8/25 Ver.3.7.0
 * アクター画像変化条件に防御時、反撃時、魔法反射時を追加。
 * アクターコマンド可変表示時にアクターコマンドの表示がおかしくなる問題を修正。
 * 2022/8/24 Ver.3.6.9
 * アクターウィンドウのX座標を変更したときに、アクターコマンドがアクターの上指定時にコマンドウィンドウがずれて表示されてしまう問題を修正。
 * アクターウィンドウの横幅指定時にアクターウィンドウが表示されない問題を修正。
 * サイドビューアクターが表示されない問題を修正。
 * 2022/8/7 Ver.3.6.8
 * ステート2の表示ステートアイコンが適用されなかった問題を修正。
 * 2022/8/7 Ver.3.6.7
 * アニメーションの座標が適用されない問題を修正。
 * 戦闘終了時にチラつく問題を修正。
 * 2022/8/6 Ver.3.6.6
 * 旧方式で戦闘を開始するとエラーが出る問題を修正。
 * サイドビューでアクターが表示されなくなる問題を修正。
 * 2022/8/6 Ver.3.6.5
 * 戦闘以外でステートアイコンを表示する処理を行うとエラーが出る問題を修正。
 * 可変表示をOFFにするとゲージの長さが適用されない問題を修正。
 * 2022/8/6 Ver.3.6.4
 * バフアイコン表示指定時のバフアイコンの２段階目のアイコンが表示されてしまう問題を修正。(現状２段階まで)
 * 旧モードで設定した状態で戦闘を行うとエラーが出る問題を修正。
 * 2022/8/6 Ver.3.6.3
 * 表示するステートアイコン指定時にアイコンが正常に表示されない問題を修正。
 * 2022/8/6 Ver.3.6.2
 * ステート2が正常に表示されない問題を修正。
 * スピードスターバトルと併用するとアニメーションの座標が正しく表示されない問題を修正。
 * 2022/7/31 Ver.3.6.1
 * アクター表示範囲可変表示の時にゲージ、名前が表示範囲内に収まるように修正。
 * 2022/7/30 Ver.3.6.0
 * ステータスが表示されるウィンドウに表示するステータスをウィンドウ外にも表示できるように変更。
 * 表示ステータスに画像を表示できる機能を追加。
 * 表示ステータスにメニューで表示されるタイプのステートを表示する機能を追加。
 * 敵選択ウィンドウの表示がずれる問題を修正。
 * バトルステータスウィンドウの表示がおかしくなる問題を修正。
 * 2022/7/23 Ver.3.5.4
 * キャンセルボタンのX座標を調整できる処理の追加。
 * 処理の修正。
 * 2022/7/18 Ver.3.5.3
 * キャンセルボタンの表示位置を左か右か指定できる機能を追加。
 * 2022/7/2 Ver.3.5.2
 * TPBバトルでパーティコマンドが表示されず進行不能になる問題を修正。
 * 顔グラの行動時エフェクト時に座標がずれる問題を修正。
 * メンバー交代時にステートエフェクトが残ってしまう問題を修正。
 * 2022/6/24 Ver.3.5.1
 * 立ち絵切り替えの画像設定でデフォルトの画像を設定しなかったときにリスト0番の画像が切り替わらない問題を修正。
 * アクターのアニメーションをOFFにして敵から攻撃を受けるとエラーが出る問題を修正。
 * スタンダードでアクターの画像位置がおかしくなる問題を修正。
 * 競合対策。
 * 2022/6/19 Ver.3.5.0
 * 画像切り替え時に座標がリセットされてしまう問題を修正。
 * 2022/6/18 Ver.3.4.1
 * アニメーションの表示をステータスの背後、ダメージポップアップをステータスの前面に表示するように変更。
 * 2022/6/15 Ver.3.4.0
 * パーティコマンド、アクターコマンド、アクターステータスウィンドウに任意のウィンドウスキンを設定できる機能を追加。
 * 2022/6/11 Ver.3.3.7
 * ステートエフェクトが画像の拡大率に依存してしまう問題を修正。
 * 2022/6/7 Ver.3.3.6
 * アクター画像の表示幅を指定すると行動時に画像が消える問題を修正。
 * アクター行動時にステートの表示がおかしくなる問題を修正。
 * アクター毎にステートエフェクトの座標を調整できる機能を追加。
 * 2022/6/5 Ver.3.3.5
 * アクター行動時のエフェクトがおかしくなる問題を修正。
 * 2022/6/4 Ver.3.3.4
 * アクター画像設定をなしに設定して戦闘を行うとアニメーション時にエラーが出る問題を修正。
 * 2022/6/2 Ver.3.3.3
 * 立ち絵の起点を下に設定したときに、画像の下部分がウィンドウの下側から表示されない問題を修正。
 * 2022/6/1 Ver.3.3.2
 * ２行目のアクターステータスの表示で表示揃えを適用できるように修正。
 * アクター画像（顔グラ）の設定方法に画像起点を追加。
 * 2022/5/31 Ver.3.3.1
 * 敵またはアクター対象選択をキャンセルしパーティコマンドまで戻った時に、操作を受け付けなくなる問題を修正。
 * 2022/5/26 Ver.3.3.0
 * アクターステータスの表示する方法に独自表示設定する機能を追加。
 * 上記の機能に独自パラメータ、独自ゲージを表示する機能を追加。
 * 2022/5/12 Ver.3.2.2
 * ステートアニメーションを表示させない機能を追加。
 * 2022/5/11 Ver.3.2.1
 * フロントビュー時のアクターのアニメーションをOFF、サイドビューバトル時でもステートアニメーションが適用してしまう問題を修正。
 * 2022/5/11 Ver.3.2.0
 * アクター画像にステート画像を表示する機能を追加。
 * パーティ、アクターコマンドの表示位置を指定できる機能を追加。
 * 2022/5/10 Ver.3.1.6
 * MVアニメーションを再生したときにエラーが起きる問題を修正。
 * 2022/5/10 Ver.3.1.5
 * アクター画像にエフェクト（アニメーション）を適用するように修正。
 * 2022/5/4 Ver.3.1.4
 * 攻撃時のスキルをなしに設定したときに画像が切り替わらない問題を修正。
 * 2022/5/3 Ver.3.1.3
 * 戦闘不能時の画像を設定しても戦闘不能時に画像が消えてしまう問題を修正。
 * 2022/5/2 Ver.3.1.2
 * エフェクトのプロパティを中間（アクター画像とステータスの間）か最前面に表示する機能を追加。
 * 2022/5/1 Ver.3.1.1
 * MP、TPゲージの座標変更許可時に座標が正常に適用されてなかった問題を修正。
 * 2022/4/10 Ver.3.1.0
 * アクター画像条件拡張による処理追加。
 * アクター画像設定のスキル、アイテム条件が適用されていなかった問題を修正。
 * 2022/4/4 Ver.3.0.7
 * アイコンステート枠内表示をOFFにした場合、ステートアイコンがアクター画像の背後に表示されてしまう問題を修正。
 * 2022/4/1 Ver.3.0.6
 * アクターコマンドの項目表示位置を中央にする機能の処理を追加。
 * 2022/3/29 Ver.3.0.5
 * アクターコマンドを各アクターの上指定時のサポートアクターのコマンド座標の処理を追加。
 * 2022/3/27 Ver.3.0.4
 * アニメーション、ダメージポップアップの表示がずれるため一時的にもとに戻す修正。
 * 2022/3/26 Ver.3.0.3
 * アクターウィンドウステータスのアクター配置を表示範囲可変表示にする機能を追加。
 * 2022/3/26 Ver.3.0.2
 * 敵選択ウィンドウのスキン非表示を設定する項目がなかった問題を修正。
 * 逃走失敗時にエラーが出る問題を修正。
 * 敵出現、勝利、敗北、逃走時に背景画像を指定したときに、背景のY座標が正常に適用していなかった問題を修正。
 * 2022/3/25 Ver.3.0.1
 * 立ち絵切り替え条件にスイッチ、武器、防具装備時、特定の職業を追加
 * プラグインコマンド「アクターステータスウィンドウ透明化表示」の表記が逆だった問題を修正。
 * 2022/3/24 Ver.3.0.0
 * リニューアル版初版
 * 
 * 
 * @command ActorStatusWindowOpacity
 * @desc アクターステータスウィンドウを透明化します。
 * @text アクターステータスウィンドウ透明化表示
 * 
 * @arg WindowOpacity
 * @type boolean
 * @default false
 * @text 不透明度表示
 * @desc ONの時、アクターステータスウィンドウが透明化します。(ONで透明化)
 * 
 * @arg WindowOpacityValue
 * @type number
 * @default 0
 * @text 不透明度
 * @desc 不透明度を指定します。0で非表示
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BattleStyleEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BattleStyleEX');
const params = NuunManager.getBattleStyleParams();
let statusData = null;
let bsRect = null

const pluginName = "NUUN_BattleStyleEX";

PluginManager.registerCommand(pluginName, 'ActorStatusWindowOpacity', args => {
  BattleManager.statusWindowOpacity(eval(args.WindowOpacity), Number(args.WindowOpacityValue));
});

function getActorData(actorId) {
  return params.ActorData.find(data => data.actorId === actorId);
};

function getActorPositionData(actorId) {
  const find = getActorData(actorId);
  if (find && !find.DefaultStatusPosition) {
      return find.StatusPositionData;
  } else {
      return params.DefaultStatusPositionData;
  }
};

function getActorImgData(actorId) {
  const find = getActorData(actorId);
  if (find && find.ActorImgSetting) {
      find.ActorImgSetting.ActorImgHPosition = getUndefinedHPosition(find.ActorImgSetting.ActorImgHPosition);
      find.ActorImgSetting.ActorImgVPosition = getUndefinedHPosition(find.ActorImgSetting.ActorImgVPosition);
      return find.ActorImgSetting;
  } else {
      params.DefaultActorImgData.ActorImgHPosition = getUndefinedHPosition(params.DefaultActorImgData.ActorImgHPosition);
      params.DefaultActorImgData.ActorImgVPosition = getUndefinedVPosition(params.DefaultActorImgData.ActorImgVPosition);
      return params.DefaultActorImgData;
  }
};

function getUndefinedHPosition(data) {
  if (data) {
    return data;
  } else if (params.bsMode = 'Default') {
    return 'left'
  } else if (params.bsMode = 'Standard') {
    return 'left'
  } else if (params.bsMode = 'XP') {
    return 'center'
  }
}

function getUndefinedVPosition(data) {
  if (data) {
    return data;
  } else if (params.bsMode = 'Default') {
    return 'top'
  } else if (params.bsMode = 'Standard') {
    return 'under'
  } else if (params.bsMode = 'XP') {
    return 'under'
  }
}

function getActorWindowCenter() {
  return (Graphics.width - getActorWindowOrgWidth()) / 2;
};

function getActorWindowOrgWidth() {
  return (params.ActorStatusWindow_Width > 0 ? params.ActorStatusWindow_Width : Graphics.boxWidth);
};

function loadBackground(img) {
  if (img) {
    ImageManager.nuun_LoadPictures(img);
  }
}

function getStateAnimationShow() {
  return !$gameSystem.isSideView() && params.ActorEffectShow && params.StateAnimationShow;
}


NuunManager.bsAnimationShouldMirror = function() {
    return params.ActorsMirror;
};


const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _BattleManager_initMembers.call(this);
    this.actorStatusWindowOpacity = false;
    this.actorStatusWindowOpacityValue = false;
    this.battlerSprite = [];
    this.visibleStateIcons = [];
    this.notIconList = this.getNotVisibleIcons();
    this.onBSStartBattle = !params.ActorStatusWindowLock;
    this._bsInterpreter = null;
    Array.prototype.push.apply(this.notIconList , this.getNotVisibleBuffIcons());
};

const _BattleManager_update = BattleManager.update;
BattleManager.update = function(timeActive) {
    _BattleManager_update.call(this, timeActive);
    this.updateBsEXCommon();
};

BattleManager.getNotVisibleIcons = function() {
  return params.NotVisibleStateIcons.filter(stateId => $dataStates[stateId]).map(stateId => $dataStates[stateId].iconIndex).filter(id => id > 0);
};

BattleManager.getNotVisibleBuffIcons = function() {
  return this.getVisibleBuffIcons(params.NotVisibleBuffIcons);
};

BattleManager.isOnActorPictureEX = function() {
    return Imported.NUUN_ActorPicture && params.OnActorPictureEX;
}

BattleManager.getVisibleBuffIcons = function(list) {
  const icons = [];
  for (const buff of list) {
    if (buff >= 0 && buff < 8) {
      for (const i = 0; i < 2; i++) {
        icons.push(Game_BattlerBase.ICON_BUFF_START + i * 8 + buff);
      }
    } else if (buff >= 10 && buff < 18) {
      icons.push(Game_BattlerBase.ICON_DEBUFF_START + -i * 8 + buff - 10);
    }
  }
  return icons;
};

BattleManager.statusWindowOpacity = function(flag, opacity) {
  this.actorStatusWindowOpacity = flag;
  this.actorStatusWindowOpacityValue = flag ? opacity : 255;
};

const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
BattleManager.displayStartMessages = function() {
  if (!params.AppearWindowVisible) {
    _BattleManager_displayStartMessages.call(this);
    this.setDisplayMessagePosition(params.AppearWindowAnchorMode);
    this.displayMessageType("Appear");
  }
};

const _BattleManager_displayVictoryMessage = BattleManager.displayVictoryMessage;
BattleManager.displayVictoryMessage = function() {
  _BattleManager_displayVictoryMessage.call(this);
  this.setDisplayMessagePosition(params.VictoryWindowAnchorMode);
  this.displayMessageType("Victory");
};

const _BattleManager_displayDefeatMessage = BattleManager.displayDefeatMessage;
BattleManager.displayDefeatMessage = function() {
  _BattleManager_displayDefeatMessage.call(this);
  this.setDisplayMessagePosition(params.LoseWindowAnchorMode);
  this.displayMessageType("Defeat");
};

const _BattleManager_displayEscapeSuccessMessage = BattleManager.displayEscapeSuccessMessage;
BattleManager.displayEscapeSuccessMessage = function() {
  _BattleManager_displayEscapeSuccessMessage.call(this);
  this.setDisplayMessagePosition(params.EscapeWindowAnchorMode);
  this.displayMessageType("Escape");
};

const _BattleManager_displayEscapeFailureMessage = BattleManager.displayEscapeFailureMessage;
BattleManager.displayEscapeFailureMessage = function() {
  _BattleManager_displayEscapeFailureMessage.call(this);
  this.setDisplayMessagePosition(params.EscapeWindowAnchorMode);
  this.displayMessageType("EscapeFailure");
};

BattleManager.setDisplayMessagePosition = function(type) {
  switch (type) {
    case 'top':
      $gameMessage.setPositionType(0);
      break;
    case 'center':
      $gameMessage.setPositionType(1);
      break;
    case 'under':
      $gameMessage.setPositionType(2);
      break;
  }
};

BattleManager.displayMessageType = function(type) {
  $gameMessage._messageType = type;
};

BattleManager.getDisplayMessageType = function() {
  return $gameMessage._messageType;
};

const _BattleManager_startActorInput = BattleManager.startActorInput;
BattleManager.startActorInput = function() {
  _BattleManager_startActorInput.call(this);
  if (this._currentActor && this._currentActor.isInputting()) {
      this._currentActor.battleStyleImgRefresh();
  }
};

const _BattleManager_invokeCounterAttack = BattleManager.invokeCounterAttack;
BattleManager.invokeCounterAttack = function(subject, target) {
    target.isCouterAction = true;
    if (target.isActor()) {
        target.result().counterEx = true;
    }
    _BattleManager_invokeCounterAttack.call(this, subject, target);
};

const _BattleManager_invokeMagicReflection = BattleManager.invokeMagicReflection;
BattleManager.invokeMagicReflection = function(subject, target) {
    target.isReflectionAction = true;
    if (target.isActor()) {
        target.result().reflectionEx = true;
        target.battleStyleImgRefresh();
    }
    _BattleManager_invokeMagicReflection.call(this, subject, target);
};

BattleManager.battleStartCommon = function() {
    if (params.BattleStartCommonEvent > 0) {
        this.setupBsEXCommon(params.BattleStartCommonEvent);
    }
};

BattleManager.battleEndCommon = function() {
    if (params.BattleEndCommonEvent > 0) {
        $gameTemp.reserveCommonEvent(params.BattleEndCommonEvent);
    }
};

BattleManager.setupBsEXCommon = function(id) {
    if (this._bsInterpreter && this._bsInterpreter.isRunning()) {
        return;
    }
    const commonEvent = $dataCommonEvents[id];
    if (commonEvent) {
        const eventId = 0;
        if (!this._bsInterpreter) {
            this._bsInterpreter = new Game_Interpreter();
        }
        this._bsInterpreter.setup(commonEvent.list, eventId);
        this._bsInterpreter.update();
        this.resetBsEXCommon();
    }
};

BattleManager.resetBsEXCommon = function() {
    if (this._bsInterpreter && !this._bsInterpreter.isRunning()) {
        this._bsInterpreter = null;
    }
};

BattleManager.updateBsEXCommon = function() {
    if (this._bsInterpreter && this._bsInterpreter.isRunning()) {
        this._bsInterpreter.update();
        this.resetBsEXCommon();
    }
};

const _BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
BattleManager.updateBattleEnd = function() {
    this.battleEndCommon();
    _BattleManager_updateBattleEnd.call(this);
};

//Game_Temp
const _Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
  _Game_Temp_initialize.call(this);
  this._battleStyleRefresh = false;
  this.onBSAction = false;
};

Game_Temp.prototype.setBattleStyleRefresh = function(flag) {
    this._battleStyleRefresh = flag;
};
  
Game_Temp.prototype.isBattleStyleRequested = function() {
    return this._battleStyleRefresh || false;
};


const _Game_BattlerBase_allIcons = Game_BattlerBase.prototype.allIcons;
Game_BattlerBase.prototype.allIcons = function() {
  let icons = _Game_BattlerBase_allIcons.call(this);
  if (BattleManager.visibleStateIcons && BattleManager.visibleStateIcons.length > 0) {
    icons = icons.filter(icon => BattleManager.visibleStateIcons.indexOf(icon) >= 0);
    BattleManager.visibleStateIcons = [];
  }
  if (BattleManager.notIconList && BattleManager.notIconList.length > 0) {
    icons = icons.filter(id => BattleManager.notIconList.indexOf(id) < 0);
  }
  return icons;
};

//test
const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    _Game_Action_applyItemUserEffect.call(this, target);
    //this.gamePadVibrationEffect(target);
};

Game_Action.prototype.gamePadVibrationEffect = function(target) {
    if (this.item().meta.VibrationEffect){
        const data = this.item().meta.VibrationEffect.split(',');
        const vibration = {};
        vibration.StartDelay = Number(data[0]);
        vibration.Duration = Number(data[1]);
        vibration.WeakMagnitude = Number(data[2]);
        vibration.StrongMagnitude = Number(data[3]);
        NuunManager.setupGamePadVibration(vibration);
    }
};

const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    _Game_ActionResult_clear.call(this);
    this.counterEx = false;
    this.reflectionEx = false;
    this.counterExtend = false;
};


const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    _Game_Battler_initMembers.call(this);
    this.nuun_bsUseItemId = -1;
    this._battleStyleGraphicIndex = -1;
    this._battleStyleGraphicOpacity = 255;
    this._battleStyleGraphicName = null;
    this._actionBattlerImg = null;
    this._isEffectAction = false;
    this._onDamageEffect = false;
    this._isDeadImg = false;
    this._imgScenes = 'default';
};

const _Game_Actor_performActionStart = Game_Actor.prototype.performActionStart;
Game_Actor.prototype.performActionStart = function(action) {
    _Game_Actor_performActionStart.call(this, action);
    if (params.OnActionZoom && !this.isCounterSkillAction()) {
        this._isEffectAction = true;
    }
    this.setBattleStyleAttackImgId(action);
};

const _Game_Enemy_performActionStart = Game_Enemy.prototype.performActionStart;
Game_Enemy.prototype.performActionStart = function(action) {
    _Game_Enemy_performActionStart.call(this, action);
    this.setBattleStyleAttackImgId(action);
};

Game_Battler.prototype.setBattleStyleAttackImgId = function(action) {
    if (action.item().animationId !== 0) {
        if (action.isRecover()) {
            this.setBattleImgId(11, action.item().id);
            this.setBSActionBattlerImg("recovery");
        } else if (action.isAttack() && action.isDamage()) {
            this.setBattleImgId(10, action.item().id);
            this.setBSActionBattlerImg("attack");
        } else if (action.isMagicSkill()) {
            this.setBattleImgId(10, action.item().id);
            this.setBSActionBattlerImg("attack");
        } else if (action.isSkill() && action.isDamage()) {
            this.setBattleImgId(10, action.item().id);
            this.setBSActionBattlerImg("attack");
        } else if (action.isItem()) {
            this.setBattleImgId(12, action.item().id);
            this.setBSActionBattlerImg("item");
        } else {
            this.setBattleImgId(0, -1);
            this.setBSActionBattlerImg(null);
        }
        this.battleStyleImgRefresh();
    }
};

Game_Actor.prototype.setBattleStyleAttackImgId = function(action) {
    if (Imported.NUUN_ActorPicture && params.OnActorPictureEX) {
        return;
    }
    Game_Battler.prototype.setBattleStyleAttackImgId.call(this, action);
};

const _Game_Battler_performDamage = Game_Battler.prototype.performDamage;
Game_Battler.prototype.performDamage = function() {
    _Game_Battler_performDamage.call(this);
    this.setDamageEffect();
    if (this.isGuard()) {
        this.setBattleImgId(15);
    }
    if (this._imgScenes !== 'guard') {
        this.battlerImgCritical ? this.setBattleImgId(3) : this.setBattleImgId(1);
        this.battlerImgCritical = false;
    }
    this.battleStyleImgRefresh();
};

Game_Actor.prototype.setDamageEffect = function() {
    if (params.OnActorShake) {
        this._onDamageEffect = true;
    }
};

Game_Enemy.prototype.setDamageEffect = function() {

};

const _Game_Actor_performRecovery = Game_Actor.prototype.performRecovery;
Game_Actor.prototype.performRecovery = function() {
  _Game_Actor_performRecovery.call(this);
  this.setBattleImgId(2);
  this.battleStyleImgRefresh();
};

const _Game_Actor_performVictory = Game_Actor.prototype.performVictory;
Game_Actor.prototype.performVictory = function() {
  _Game_Actor_performVictory.call(this);
  this.setBattleImgId(20);
  this.battleStyleImgRefresh();
};

const _Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
    _Game_Battler_refresh.call(this);
    this.battleStyleImgRefresh();
};

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    _Game_Actor_setup.call(this, actorId);
    this.battleStyleImgRefresh();
};

const _Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    _Game_Enemy_setup.call(this, enemyId, x, y);
    this.battleStyleImgRefresh();
};

Game_Actor.prototype.battleStyleImgRefresh = function() {
    let imgIndex = -1;
    let index = -1;
    this._isDeadImg = false;
    this._imgScenes = 'default';
    const actorId = this.actorId();
    const imgData = getActorImgData(actorId);
    const actorData = getActorData(actorId);
    this.bsImgMode = imgData ? imgData.ActorImgMode : 'face';
    this.faceMode = !(imgData && imgData.ActorImgMode !== 'face');
    if (Imported.NUUN_ActorPicture && params.OnActorPictureEX) {
        this.actorPictureActorGraphicData(imgData);
        return;
    } else if (imgData.ActorImgMode !== 'none' && actorData && actorData.ButlerActorImg) {
        index = actorData.ButlerActorImg.findIndex(data => {
            return this.battleStyleMatchConditions(data);
        });
        if (index >= 0) {
            this.setbattleStyleGraphicId();
            const data = actorData.ButlerActorImg[index];
            //this._battleStyleGraphicName = index !== this._battleStyleGraphicIndex ? this.getBattleStyleImg(data) : this._battleStyleGraphicName;
            this._battleStyleGraphicName = this.getBattleStyleImg(data);
            imgIndex = this.getBattleStyleImgIndex(data);
            this._isDeadImg = this.isBSActorGraphicDead(data);
            this._battleStyleGraphicOpacity = data.Opacity || 255;
        } else {
            this._battleStyleGraphicName = null;
        }
    } else {
        if (this.faceMode) {
            this._battleStyleGraphicName = this.faceName();
            imgIndex = this.faceIndex();
            index = 0;
        } else {
            this._battleStyleGraphicName = null;
        }
    }
    this._battleStyleGraphicIndex = index;
    this._battleStyleImgIndex = imgIndex;
};

Game_Enemy.prototype.battleStyleImgRefresh = function() {

};

Game_Actor.prototype.actorPictureActorGraphicData = function(imgData) {
    if (imgData.ActorImgMode === 'none') {
        this._battleStyleGraphicName = null;
        this._battleStyleGraphicIndex = -1;
        this._battleStyleImgIndex = -1;
    } else if (imgData.ActorImgMode === 'imges') {
        this._battleStyleGraphicName = this._actorGraphicIndex !== this._battleStyleGraphicIndex ? this.getActorGraphicImg(imgData) : this._battleStyleGraphicName;
        this._battleStyleGraphicIndex = this._actorGraphicIndex;
        this._battleStyleImgIndex = -1;
    } else {
        this._battleStyleGraphicName = this.getActorGraphicFace();
        this._battleStyleGraphicIndex = this._actorGraphicIndex >= 0 ? this._actorGraphicIndex : 9999;
        this._battleStyleImgIndex = this.getActorGraphicFaceIndex();
    }
    const data = this.getActorGraphicData();
    if (data) {
        this._isDeadImg = this.isBSActorGraphicDead(data);
        this._imgScenes = data.ChangeGraphicScenes;
    }
};

Game_Battler.prototype.setbattleStyleGraphicId = function() {
    switch (this._imgScenes) {
        case 'counter':
        case 'reflection':
        case 'counterEX':
            this.onImgId = 30;
            break;
    }
};

Game_Battler.prototype.battleStyleMatchConditions = function(data) {
    if (data.ImgHP && data.ImgHP.CondValid && !conditionsParam(data.ImgHP, this.hp, this.param(0))) {
        return false;
    }
    if (data.ImgSwitch && !this.isBattleStyleSwitchImg(data)) {
        return false;
    }
    if (data.ImgWeapon && !this.isBattleStyleWeaponImg(data)) {
        return false;
    }
    if (data.ImgArmor && !this.isBattleStyleArmorImg(data)) {
        return false;
    }
    if (data.ImgStateAll && !this.isBattleStyleStateImg(data, data.ImgStateAll)) {
        return false;
    }
    if (data.ImgClass > 0 && !this.isBattleStyleClassImg(data)) {
        return false;
    }
    if (!this.battleStyleMatchChangeGraphic(data)) {
        return false;
    }
    return true;
};
  
Game_Battler.prototype.battleStyleMatchChangeGraphic = function(data) {
    const changeData = data.ChangeGraphicScenes;
    this._imgScenes = changeData;
    switch (changeData) {
        case 'default' :
            return true;
        case 'death' :
            return this.isDeadImg();
        case 'b_appeared' :
            return !this.isAppeared();
        case 'command' :
            return this.isInputting();
        case 'dying' :
            return this.isDying();
        case 'damage' :
            return this.onImgId === 1 || this.onImgId === 3;
        case 'cridamage' :
            return this.onImgId === 3;
        case 'recovery' :
            return this.onImgId === 2;
        case 'attack' :
            return this.onImgId === 10 && this.isBattleStyleUseItemImg(data.Skill);
        case 'recoverySkill' :
            return this.onImgId === 11 && this.isBattleStyleUseItemImg(data.Skill);
        case 'item' :
            return this.onImgId === 12 && this.isBattleStyleUseItemImg(data.Item);
        case 'chant' :
            return this.isChanting();
        case 'victory' :
            return this.onImgId === 20;
        case 'state' :
            return this.isBattleStyleStateImg(data, data.stateId);
        case 'counter' :
            return this.result().counterEx;
        case 'reflection' :
            return this.result().reflectionEx;
        case 'counterEX' :
            return this.result().counterExtend && this.isBattleStyleUseItemImg(data.Id);
        case 'guard' :
            return this.onImgId === 15;
    }
};

Game_Actor.prototype.performVibration = function(critical) {
    if (critical && params.CriticalVibration) {
        if (params.CriticalVibrationSetting) {
            NuunManager.setupGamePadVibration(params.CriticalVibrationSetting);
        }
    } else {
        if (params.DamegeVibration && params.DamegeVibrationSetting) {
            NuunManager.setupGamePadVibration(params.DamegeVibrationSetting);
        }
    }
};

Game_Battler.prototype.isDeadImg = function() {
    return this.isDead();
};

Game_Battler.prototype.isCounterSkillAction = function() {
    return this._counterAction;
};

Game_Battler.prototype.setBattleImgId = function(id, itemId) {
    if (itemId !== undefined) {
        this.nuun_bsUseItemId = itemId;
    }
    this.onImgId = id;
};

Game_Battler.prototype.resetBattleStyleImgId = function() {

};

Game_Actor.prototype.resetBattleStyleImgId = function() {
    this.setBattleImgId(0, -1);
    this.battleStyleImgRefresh();
};

Game_Battler.prototype.isBSActorGraphicDead = function(data) {
    return data && (data.ChangeGraphicScenes === 'death' || data.ChangeGraphicScenes === 'state' && (data.stateId === this.deathStateId() || data.ImgStateAll === this.deathStateId()));
};
  
Game_Battler.prototype.getActorGraphicDead = function() {
    return this._isDeadImg;
};

Game_Battler.prototype.getBattleStyleOpacity = function() {
    return this._battleStyleGraphicOpacity;
};

Game_Actor.prototype.getBattleStyleOpacity = function() {
    return Imported.NUUN_ActorPicture && params.OnActorPictureEX ? this._actorGraphicOpacity : this._battleStyleGraphicOpacity;
};
  
Game_Actor.prototype.getBattleStyleImg = function(data) {
    return this.faceMode ? this.actorFaceName(data) : this.battleStyleGraphicName(data);
};

Game_Actor.prototype.battleStyleGraphicName = function(data) {
    const images = this.actorGraphicName(data);
    if (Array.isArray(images)) {
        if (images.length > 1) {
            return images[Math.randomInt(images.length)];
        } else {
            return images[0];
        }
    } else {
        return images;
    }
};
  
Game_Actor.prototype.getBattleStyleImgIndex = function(data) {
    return this.faceMode ? this.actorFaceIndex(data) : this.batterImgIndex(data);
};
  
Game_Actor.prototype.actorFaceName = function(data) {
    return data && data.FaceImg ? data.FaceImg : this.faceName();
};
  
Game_Actor.prototype.actorGraphicName = function(data) {
    return data.GraphicImg;
};
  
Game_Actor.prototype.actorFaceIndex = function(data) {
    return data && data.ImgIndex >= 0 ? data.ImgIndex : this.faceIndex();
};

Game_Battler.prototype.batterImgIndex = function(data) {
    return -1;
    //return data && data.ImgIndex >= 0 ? data.ImgIndex : -1;
};
  
Game_Battler.prototype.getBSImgName = function() {
    return this._battleStyleGraphicName;
};
  
Game_Battler.prototype.getBSImgIndex = function() {
    return this._battleStyleImgIndex;
};
  
Game_Battler.prototype.getBSGraphicIndex = function() {
    return this._battleStyleGraphicIndex;
};

Game_Battler.prototype.isBattleStyleSwitchImg = function(data) {
    return data.ImgSwitch.every(id => $gameSwitches.value(id));
};
  
Game_Battler.prototype.isBattleStyleWeaponImg = function(data) {
    return data.ImgWeapon.every(id => this.isEquipped($dataWeapons[id]));
};
  
Game_Battler.prototype.isBattleStyleArmorImg = function(data) {
    return data.ImgArmor.every(id => this.isEquipped($dataArmors[id]));
};
  
Game_Battler.prototype.isBattleStyleStateImg = function(data, states) {
    return states.every(id => this.isStateAffected(id));
};
  
Game_Battler.prototype.isBattleStyleClassImg = function(data) {
    return data.ImgClass ? this._classId === data.ImgClass : true;
};
  
Game_Battler.prototype.isBattleStyleUseItemImg = function(item) {
    return item && item[0] > 0 ? item.includes(this.nuun_bsUseItemId) : true;
};
  
const _Game_Actor_isSpriteVisible = Game_Actor.prototype.isSpriteVisible;
Game_Actor.prototype.isSpriteVisible = function() {
    return params.ActorEffectShow && !$gameSystem.isSideView() ? ($gameParty.inBattle() ? true : _Game_Actor_isSpriteVisible.call(this)) : _Game_Actor_isSpriteVisible.call(this);
};

Game_Battler.prototype.getLoadBattleStyleImg = function() {
    return this.loadBattleStyleActorGraphic();
};

Game_Actor.prototype.getLoadBattleStyleImg = function() {
    return this.faceMode ? this.loadBattleStyleActorFace() : this.loadBattleStyleActorGraphic();
};
  
Game_Battler.prototype.loadBattleStyleActorGraphic = function() {
    return ImageManager.nuun_LoadPictures(this._battleStyleGraphicName);
};
  
Game_Battler.prototype.loadBattleStyleActorFace = function() {
    return ImageManager.loadFace(this._battleStyleGraphicName);
};
  
Game_Battler.prototype.isBSEffectAction = function() {
    return this._isEffectAction;
};
  
Game_Battler.prototype.isBSDamageEffect = function() {
    return this._onDamageEffect;
};
  
Game_Battler.prototype.setBSActionBattlerImg = function(state) {
    this._actionBattlerImg = state;
};
  
Game_Battler.prototype.isBSActionBattlerImg = function() {
    return this._actionBattlerImg;
};

Game_Enemy.prototype.attackAnimation = function() {
    return this.bareHandsAnimationId();
};
  
Game_Enemy.prototype.bareHandsAnimationId = function() {
    return this.enemy().meta.AttackAnimation ? Number(this.enemy().meta.AttackAnimation) : params.EnemySkillAnimation;
};


const _Window_BattleLog_displayHpDamage = Window_BattleLog.prototype.displayHpDamage;
Window_BattleLog.prototype.displayHpDamage = function(target) {
    if (target.isActor() && target.result().hpAffected && target.result().hpDamage > 0 && !target.result().drain) {
        this.push("performVibration", target, target.result().critical);
    }
    _Window_BattleLog_displayHpDamage.call(this, target);
};

const _Window_BattleLog_displayCritical = Window_BattleLog.prototype.displayCritical;
Window_BattleLog.prototype.displayCritical = function(target) {
    _Window_BattleLog_displayCritical.call(this, target);
    if (target.result().critical) {
        this.push("battlerImgCritical", target);
    }
};

Window_BattleLog.prototype.battlerImgCritical = function(target) {
    target.battlerImgCritical = true;
};

Window_BattleLog.prototype.performVibration = function(target, mode) {
    target.performVibration(mode);
};

//Scene_Battle
const _Scene_Battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
    _Scene_Battle_initialize.call(this);
    this.loadBackgroundImg();
    this.loadBattleStatusImg();
};

Scene_Battle.prototype.loadBackgroundImg = function() {
  loadBackground(params.AppearBackgroundImg);
  loadBackground(params.VictoryBackgroundImg);
  loadBackground(params.LoseBackgroundImg);
  loadBackground(params.EscapeBackgroundImg);
  loadBackground(params.EscapeFailureBackgroundImg);
};

Scene_Battle.prototype.loadBattleStatusImg = function() {

  //$gameTemp.actorData = getActorPositionData(actor.actorId());
  //const statusData = $gameTemp.actorData.StatusListData;
};

const _Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function() {
    BattleManager.battleStartCommon();
    _Scene_Battle_start.call(this);
    this._actorImges.refresh();
    this._actorStatus.refresh();
};

const _Scene_Battle_stop = Scene_Battle.prototype.stop;
Scene_Battle.prototype.stop = function() {
    _Scene_Battle_stop.call(this);
    if (!params.BattleEndActorStatusClose) {
        this._statusWindow.open();
    }
};

const _Scene_Battle_updateStatusWindowVisibility = Scene_Battle.prototype.updateStatusWindowVisibility;
Scene_Battle.prototype.updateStatusWindowVisibility = function() {
  _Scene_Battle_updateStatusWindowVisibility.call(this);
  if (params.BattleEndActorStatusClose) {
    if (BattleManager.isBattleEnd()) {
      this._statusWindow.close();
    } else if (this.isActive()) {
      this._statusWindow.open();
    }
  } else {
    this._statusWindow.open();
  }
};

const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
  _Scene_Battle_createSpriteset.call(this);
  if (params.WindowDisplayMode === 'Scene_Battle') {
    this.addChild(this._spriteset._battleHudBase);
  }
};

const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    const spriteset = this._spriteset;
    this._battleHudBack = spriteset._battleHudBack;
    this._battleHudFront = spriteset._battleHudFront;
    if (spriteset._battleEffects) {
      this._battleEffects = spriteset._battleEffects;
    }
    this.createBackgroundWindow();
    this.createHud();
    this.createActorSelectWindow();
    _Scene_Battle_createAllWindows.call(this);
    if ($gameParty.inBattle()) {
        this._bsBackground = null;
        this.opacity = params.HelpWindowShow ? 255 : 0;
    }
};

Scene_Battle.prototype.createBackgroundWindow = function() {
  if (params.WindowBackground) {
    const bitmap = ImageManager.nuun_LoadPictures(params.WindowBackground);
    const sprite =  new Sprite(bitmap);
    this._battleHudBack.addChild(sprite);
    this._backgroundWindow = sprite;
  }
};

const _Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer;
Scene_Base.prototype.createWindowLayer = function() {
    const className = String(this.constructor.name);
    if (className === "Scene_Battle") {
        const sprite =  new Sprite();
        this.addChild(sprite);
        this._itemBSBackgorundWindow = sprite;
    }
  _Scene_Base_createWindowLayer.call(this);
};

if (params.CommandPosition !== 'default') {
  Scene_Battle.prototype.isRightInputMode = function() {
    return params.CommandPosition === 'right';
  };
}

Scene_Battle.prototype.createHud = function() {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_BattleStatus(rect);
    this._battleHudBack.addChild(this._statusWindow);
    this.setStatusWindow_Sprite();
    if (this._backgroundWindow) {
      this._backgroundWindow.x = this._statusWindow.x + params.WindowBackground_X;
      this._backgroundWindow.y = this._statusWindow.y + params.WindowBackground_Y;
    }
};

Scene_Battle.prototype.createActorSelectWindow = function() {
    const rect = this.actorWindowRect();
    this._actorWindow = new Window_BattleActor(rect);
    this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
    this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
    this._battleHudBack.addChild(this._actorWindow);
};

Scene_Battle.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    const rect2 = this.actorStatusWindowRect();//
    this._actorImges = new Window_BattleActorImges(rect);
    this._actorStatus = new Window_BattleActorStatus(rect);
    this._actorStatus.sx = rect.x - rect2.x;//
    this._actorStatus.sy = rect.y - rect2.y;//
    this._battleHudBack.addChild(this._actorImges);
    this._battleHudFront.addChild(this._actorStatus);
    this._statusWindow.setActorWindow(this._actorImges, this._actorStatus);
};

const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
  _Scene_Battle_createPartyCommandWindow.call(this);
    if (params.PartyCommandBackgroundImg) {
      const bitmap = ImageManager.nuun_LoadPictures(params.PartyCommandBackgroundImg);
      const sprite =  new Sprite(bitmap);
      this._battleHudFront.addChild(sprite);
      this._partyCommandBackgroundWindow = sprite;
      sprite.x = params.PartyBackground_X + this._partyCommandWindow.x + (Graphics.width - Graphics.boxWidth) / 2;
      sprite.y = params.PartyBackground_Y + this._partyCommandWindow.y + (Graphics.height - Graphics.boxHeight) / 2;
      sprite.hide();
    }
};

const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function() { 
    _Scene_Battle_createActorCommandWindow.call(this);
    this._actorCommandWindow.homeY = this.getActorCommandY();
    this._actorCommandWindow.SvActorData = (params.ActorCommandPosition === 'svtop' || params.ActorCommandPosition === 'svleft' || params.ActorCommandPosition === 'svright') ? this._spriteset._actorSprites : null;
    if (params.ActorCommandBackgroundImg) {
      const bitmap = ImageManager.nuun_LoadPictures(params.ActorCommandBackgroundImg);
      const sprite =  new Sprite(bitmap);
      this._battleHudFront.addChild(sprite);
      this._actorCommandBackgroundWindow = sprite;
      sprite.x = params.ActorBackground_X + this._actorCommandWindow.x + (Graphics.width - Graphics.boxWidth) / 2;
      sprite.y = params.ActorBackground_Y + this._actorCommandWindow.y + (Graphics.height - Graphics.boxHeight) / 2;
      sprite.hide();
    }
};

const _Scene_Battle_actorCommandWindowRect = Scene_Battle.prototype.actorCommandWindowRect;
Scene_Battle.prototype.actorCommandWindowRect = function() {
  const rect = _Scene_Battle_actorCommandWindowRect.call(this);
  rect.width = this.actorCommandWidth();
  rect.height = this.actorCommandHeight();
  rect.x = this.getActorCommandX();
  return rect;
};

Scene_Battle.prototype.actorCommandWidth = function() {
  return params.ActorCommand_Width > 0 ? Math.min(params.ActorCommand_Width, Graphics.width) : 192;
};

Scene_Battle.prototype.actorCommandHeight = function() {
  return this.calcWindowHeight(params.ActorCommandMaxRow, true);
};

Scene_Battle.prototype.getActorCommandX = function() {
  if (params.ActorCommandPosition === 'top' || params.ActorCommandPosition === 'middle' || params.ActorCommandPosition === 'under' || params.ActorCommandPosition === 'custom') {
    return params.ActorCommand_X + (params.ActorommandWindowCenter ? this.actorCommandCenter() : 0);
  } else if (params.ActorCommandPosition === 'default') {
    return this.isRightInputMode() ? Graphics.boxWidth - this.actorCommandWidth() : 0;
  } else {
    return params.ActorCommand_X;
  }
};

Scene_Battle.prototype.getActorCommandY = function() {
  switch (params.ActorCommandPosition) {
    case 'default':
      return this._statusWindow.y + this._statusWindow.height - 6 + (Graphics.boxHeight - Graphics.height) / 2 - (params.WindowFrameShow ? -6 : 0);
    case 'top':
    case 'svtop':
    case 'svleft':
    case 'svright':
    case 'custom':
      return params.ActorCommand_Y + (Graphics.boxHeight - Graphics.height) / 2 + 4;
    case 'middle':
      return this._statusWindow.y / 2 + (Graphics.boxHeight - Graphics.height) / 2 + params.ActorCommand_Y;
    case 'under':
    case 'actor':
      return this._statusWindow.y - 4 + (Graphics.boxHeight - Graphics.height) / 2 + params.ActorCommand_Y;
  }
};

Scene_Battle.prototype.actorCommandCenter = function() {
  return (Graphics.boxWidth - this.actorCommandWidth()) / 2;
};

Scene_Battle.prototype.actorWindowAreaHeight = function() {
  return this.calcWindowHeight(params.ActorCommandMaxRow, true);
};

const _Scene_Battle_createActorWindow = Scene_Battle.prototype.createActorWindow;
Scene_Battle.prototype.createActorWindow = function() {
    //独自に定義するので処理しない
    //_Scene_Battle_createActorWindow.call(this);
};

const _Scene_Battle_createItemWindow = Scene_Battle.prototype.createItemWindow;
Scene_Battle.prototype.createItemWindow = function() {
  _Scene_Battle_createItemWindow.call(this);
  if (params.ItemWindowBackgroundImg) {
    const x = params.ItemBackground_X + this._itemWindow.x + (Graphics.width - Graphics.boxWidth) / 2;
    const y = params.ItemBackground_Y + this._itemWindow.y + (Graphics.height - Graphics.boxHeight) / 2;
    const background = this.setBackgroundWindow(params.ItemWindowBackgroundImg, x, y);
    this._itemWindow.setBSBackground(background);
  }
};

const _Scene_Battle_createSkillWindow = Scene_Battle.prototype.createSkillWindow;
Scene_Battle.prototype.createSkillWindow = function() {
  _Scene_Battle_createSkillWindow.call(this);
  if (params.SkillWindowBackgroundImg) {
    const x = params.SkillBackground_X + this._skillWindow.x + (Graphics.width - Graphics.boxWidth) / 2;
    const y = params.SkillBackground_Y + this._skillWindow.y + (Graphics.height - Graphics.boxHeight) / 2;
    const background = this.setBackgroundWindow(params.SkillWindowBackgroundImg, x, y);
    this._skillWindow.setBSBackground(background);
  }
};

const _Scene_Battle_createEnemyWindow = Scene_Battle.prototype.createEnemyWindow;
Scene_Battle.prototype.createEnemyWindow = function() {
  _Scene_Battle_createEnemyWindow.call(this);
  if (params.EnemyWindowBackgroundImg) {
    const x = params.EnemyWindowBackground_X + this._enemyWindow.x + (Graphics.width - Graphics.boxWidth) / 2;
    const y = params.EnemyWindowBackground_Y + this._enemyWindow.y + (Graphics.height - Graphics.boxHeight) / 2;
    const background = this.setBackgroundWindow(params.EnemyWindowBackgroundImg, x, y);
    this._enemyWindow.setBSBackground(background);
  }
};

const _Scene_Battle_createHelpWindow = Scene_Battle.prototype.createHelpWindow;
Scene_Battle.prototype.createHelpWindow = function() {
  _Scene_Battle_createHelpWindow.call(this);
  this._helpWindow._bsBackground = null;
  this._helpWindow.opacity = params.HelpWindowShow ? 255 : 0;
  if (params.HelpWindowBackgroundImg) {
    const x = params.HelpBackground_X + this._helpWindow.x + (Graphics.width - Graphics.boxWidth) / 2;
    const y = params.HelpBackground_Y + this._helpWindow.y + (Graphics.height - Graphics.boxHeight) / 2;
    const background = this.setBackgroundWindow(params.HelpWindowBackgroundImg, x, y);
    this._helpWindow.setBSBackground(background);
  }
};

Scene_Battle.prototype.createMessageWindow = function() {
    Scene_Message.prototype.createMessageWindow.call(this);
    this.MessageWindowBackGround();
};

Scene_Battle.prototype.itemWindowRect = function() {
  const wx = params.ItemWindow_X + (params.ItemWindowMode ? 0 : (Graphics.boxWidth - Graphics.width) / 2);
  const ww = params.ItemWindow_Width > 0 ? Math.min(params.ItemWindow_Width, Graphics.width) : Graphics.boxWidth;
  const wh = this.calcWindowHeight(params.ItemMaxRow, true);
  const wy = params.ItemWindow_Y + (params.ItemWindowMode ? Graphics.boxHeight - wh : (Graphics.boxHeight - Graphics.height) / 2);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.skillWindowRect = function() {
  const wx = params.SkillWindow_X + (params.SkillWindowMode ? 0 : (Graphics.boxWidth - Graphics.width) / 2);
  const ww = params.SkillWindow_Width > 0 ? Math.min(params.SkillWindow_Width, Graphics.width) : Graphics.boxWidth;
  const wh = this.calcWindowHeight(params.SkillMaxRow, true);
  const wy = params.SkillWindow_Y + (params.SkillWindowMode ? Graphics.boxHeight - wh : (Graphics.boxHeight - Graphics.height) / 2);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyWindowRect = function() {//再定義
  const wx = params.EnemyWindow_X + (params.EnemyWindowMode ? 0 : (Graphics.boxWidth - Graphics.width) / 2);
  const ww = this.enemyWindowWidth();
  const wh = this.enemyWindowAreaHeight();
  const wy = params.EnemyWindow_Y + (params.EnemyWindowMode ? Graphics.boxHeight - wh : (Graphics.boxHeight - Graphics.height) / 2);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyWindowWidth = function() {
  return params.EnemyWindow_Width > 0 ? Math.min(params.EnemyWindow_Width, Graphics.width) : this._statusWindow.width;
};

Scene_Battle.prototype.enemyWindowAreaHeight = function() {
  return this.calcWindowHeight(params.EnemyMaxRow, true);
};

const _Scene_Battle_partyCommandWindowRect = Scene_Battle.prototype.partyCommandWindowRect;
Scene_Battle.prototype.partyCommandWindowRect = function() {
  const rect = _Scene_Battle_partyCommandWindowRect.call(this);
  if (params.PartyCommandPosition === 'default') {
    rect.width = this.partyCommandWidth(1);
    rect.x = this.isRightInputMode() ? Graphics.boxWidth - this.partyCommandWidth(1) : 0;
    rect.y = this.partyCommand_YPosition(0);
  } else if (params.PartyCommandPosition === 'custom') {
    rect.width = this.partyCommandWidth(1);
    rect.x = this.getPartyCommandX();
    rect.y = this.partyCommand_YPosition(10);
  } else if (params.PartyCommandPosition === 'top') {
    rect.width = this.partyCommandWidth(0);
    rect.x = this.getPartyCommandX();
    rect.y = this.partyCommand_YPosition(1);
  } else if (params.PartyCommandPosition === 'middle') {
    rect.width = this.partyCommandWidth(0);
    rect.x = this.getPartyCommandX();
    rect.y = this.partyCommand_YPosition(2);
  } else if (params.PartyCommandPosition === 'under') {
    rect.width = this.partyCommandWidth(0);
    rect.x = this.getPartyCommandX();
    rect.y = this.partyCommand_YPosition(3);
  }
  rect.height = this.partyWindowAreaHeight();
  return rect;
};

Scene_Battle.prototype.getDefaultPartyCommandPositionMode = function() {
  return params.PartyCommandPosition === 'default' || params.ActorCommandPosition === 'default';
};

Scene_Battle.prototype.statusWindowRect = function() {
    let ww = this.getActorWindowWidth();
    let wh = this.getActorWindowHeight();
    let wx = this.getActorWindowX() + (this.getDefaultPartyCommandPositionMode() ? (this.isRightInputMode() ? 0 : Graphics.boxWidth - ww) : 0);
    let wy = this.getActorWindowY();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.actorStatusWindowRect = function() {
    let ww = Graphics.width + 40;
    let wh = Graphics.height + 40;
    let wx = -20;
    let wy = -20;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.setBackgroundWindow = function(background, x, y) {
    if (!this._itemBSBackgorundWindow) {
        const sprite =  new Sprite();
        this.addChild(sprite);
        this._itemBSBackgorundWindow = sprite;
    }
    const bitmap = ImageManager.nuun_LoadPictures(background);
    const sprite =  new Sprite(bitmap);
    this._itemBSBackgorundWindow.addChild(sprite);
    sprite.x = x;
    sprite.y = y;
    return sprite;
};

const _Scene_Battle_updateStatusWindowPosition = Scene_Battle.prototype.updateStatusWindowPosition;
Scene_Battle.prototype.updateStatusWindowPosition = function() {
    if (!params.ActorStatusWindowLock) {
        const statusWindowX = this._statusWindow.x;
        const targetX = this.statusWindowX();
        const battleEffects = this._battleEffects;
        if (BattleManager.onBSStartBattle && statusWindowX === targetX) {
            BattleManager.onBSStartBattle = false;
        } else if (BattleManager.onBSStartBattle) {
            this._statusWindow.x = this._partyCommandWindow.width / 2 + (Graphics.width - Graphics.boxWidth) / 2;
            this._actorImges.x = this._statusWindow.x;
            this._actorStatus.x = this._statusWindow.x;
            if (!$gameSystem.isSideView() && battleEffects) {
                battleEffects.x = this._statusWindow.x;
            }  
            if (this._backgroundWindow) {
                this._backgroundWindow.x = this._statusWindow.x;
            }
            return;
        }
        _Scene_Battle_updateStatusWindowPosition.call(this);
        if (statusWindowX < targetX) {
            if (!$gameSystem.isSideView() && battleEffects) {
                battleEffects.x = Math.min(battleEffects.x + 16, targetX);
            }
            this._actorImges.x = Math.min(this._actorImges.x + 16, targetX);
            this._actorStatus.x = Math.min(this._actorStatus.x + 16, targetX);
            if (this._backgroundWindow) {
              this._backgroundWindow.x = this._statusWindow.x + params.WindowBackground_X;
            }
        }
        if (statusWindowX > targetX) {
            if (!$gameSystem.isSideView() && battleEffects) {
                battleEffects.x = Math.max(battleEffects.x - 16, targetX);
            }
            this._actorImges.x = Math.max(this._actorImges.x - 16, targetX);
            this._actorStatus.x = Math.max(this._actorStatus.x - 16, targetX);
            if (this._backgroundWindow) {
              this._backgroundWindow.x = this._statusWindow.x + params.WindowBackground_X;
            }
        }
    }
    this.torigoyaBalloonConflict();
};

const _Scene_Battle_update  = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _Scene_Battle_update.call(this);
    this.updateBSCommandRefresh();
    this.updateBSBuckground();
    this.actorStatusWindowOpacity();  
};

Scene_Battle.prototype.updateBSCommandRefresh = function() {
    const actor = this._actorCommandWindow.actor();//サポートアクターは暫定処置
    if (this._statusWindow.isCommandRefresh() && !$gameTemp.isBattleRefreshRequested() && actor) {
        this._statusWindow.commandRefresh(false);
        if (Imported.NUUN_SupportActor) {
        $gameParty.setWithSupportActorMember();
        }
        const index = $gameParty.battleMembers().indexOf(actor);
        if (index >= 0) {
            if (Imported.NUUN_SupportActor && !actor.getSupportActor()) {
                this._statusWindow.select(index);
            } else {
                this._statusWindow.select(index);
            }
        } else {
            this.commandCancel();
        }
        this._actorCommandWindow.refresh();
    }
};

Scene_Battle.prototype.updateBSBuckground = function() {
    if (params.ActorCommandBackgroundImg) {
        this._actorCommandBackgroundWindow.x = params.ActorBackground_X + this._actorCommandWindow.x + (Graphics.width - Graphics.boxWidth) / 2;
        this._actorCommandBackgroundWindow.y = params.ActorBackground_Y + this._actorCommandWindow.y + (Graphics.height - Graphics.boxHeight) / 2;
        this._actorCommandBackgroundWindow.visible = this._actorCommandWindow.visible && this._actorCommandWindow.active && this._actorCommandWindow.openness > 0;
    }
    if (this._partyCommandBackgroundWindow) {
        this._partyCommandBackgroundWindow.visible = this._partyCommandWindow.visible && this._partyCommandWindow.active;
    }
    this._enemyWindow.bsUpdateBackground();
    this._itemWindow.bsUpdateBackground();
    this._skillWindow.bsUpdateBackground();
    this._helpWindow.bsUpdateBackground();
    this.bsMessageBackground();
};

Scene_Battle.prototype.bsMessageBackground = function() {
    if (BattleManager.getDisplayMessageType() === "Appear" && params.AppearBackgroundImg) {
        this._messageBackground.bitmap = ImageManager.nuun_LoadPictures(params.AppearBackgroundImg);
        this._messageBackground.x = this._messageWindow.x + params.AppearBackground_X + (Graphics.width - Graphics.boxWidth) / 2;
        this._messageBackground.y = this._messageWindow.y + params.AppearBackground_Y + (Graphics.height - Graphics.boxHeight) / 2;
    } else if (BattleManager.getDisplayMessageType() === "Victory" && params.VictoryBackgroundImg) {
        this._messageBackground.bitmap = ImageManager.nuun_LoadPictures(params.VictoryBackgroundImg);
        this._messageBackground.x = this._messageWindow.x + params.VictoryBackground_X + (Graphics.width - Graphics.boxWidth) / 2;
        this._messageBackground.y = this._messageWindow.y + params.VictoryBackground_Y + (Graphics.height - Graphics.boxHeight) / 2;
    } else if (BattleManager.getDisplayMessageType() === "Defeat" && params.LoseBackgroundImg) {
        this._messageBackground.bitmap = ImageManager.nuun_LoadPictures(params.LoseBackgroundImg);
        this._messageBackground.x = this._messageWindow.x + params.LoseBackground_X + (Graphics.width - Graphics.boxWidth) / 2;
        this._messageBackground.y = this._messageWindow.y + params.LoseBackground_Y + (Graphics.height - Graphics.boxHeight) / 2;
    } else if (BattleManager.getDisplayMessageType() === "Escape" && params.EscapeBackgroundImg) {
        this._messageBackground.bitmap = ImageManager.nuun_LoadPictures(params.EscapeBackgroundImg);
        this._messageBackground.x = this._messageWindow.x + params.EscapeBackground_X + (Graphics.width - Graphics.boxWidth) / 2;
        this._messageBackground.y = this._messageWindow.y + params.EscapeBackground_Y + (Graphics.height - Graphics.boxHeight) / 2;
    } else if (BattleManager.getDisplayMessageType() === "EscapeFailure" && params.EscapeFailureBackgroundImg) {
        this._messageBackground.bitmap = ImageManager.nuun_LoadPictures(params.EscapeFailureBackgroundImg);
        this._messageBackground.x = this._messageWindow.x + params.EscapeFailureBackground_X + (Graphics.width - Graphics.boxWidth) / 2;
        this._messageBackground.y = this._messageWindow.y + params.EscapeFailureBackground_Y + (Graphics.height - Graphics.boxHeight) / 2;
    } else {
        this._messageBackground.bitmap = null;
        this._messageBackground.x = this._messageWindow.x;
        this._messageBackground.y = this._messageWindow.y;
    }
};

Scene_Battle.prototype.actorStatusWindowOpacity = function() {
    if (BattleManager.actorStatusWindowOpacity) {
        this.setActorStatusWindowOpacity(BattleManager.actorStatusWindowOpacityValue);
    } else if (this._skillWindow.active) {
        this.setActorStatusWindowOpacity(params.SkillWindowOpacity);
    } else if (this._itemWindow.active) {
        this.setActorStatusWindowOpacity(params.ItemWindowOpacity);
    } else if (this._enemyWindow.active) {
        this.setActorStatusWindowOpacity(params.EnemyWindowOpacity);
    } else if ($gameMessage.isBusy() && BattleManager.getDisplayMessageType() === "Appear" && $gameMessage.positionType() === 2) {
        this.setActorStatusWindowOpacity(params.AppearWindowOpacity);
    } else if ($gameMessage.isBusy() && BattleManager.getDisplayMessageType() === "Victory" && $gameMessage.positionType() === 2) {
        this.setActorStatusWindowOpacity(params.VictoryWindowOpacity);
    } else if ($gameMessage.isBusy() && BattleManager.getDisplayMessageType() === "Defeat" && $gameMessage.positionType() === 2) {
        this.setActorStatusWindowOpacity(params.LoseWindowOpacity);
    } else if ($gameMessage.isBusy() && BattleManager.getDisplayMessageType() === "Escape" && $gameMessage.positionType() === 2) {
        this.setActorStatusWindowOpacity(params.EscapeWindowOpacity);
    } else if ($gameMessage.isBusy() && BattleManager.getDisplayMessageType() === "EscapeFailure" && $gameMessage.positionType() === 2) {
        this.setActorStatusWindowOpacity(params.EscapeWindowOpacity);
    } else if ($gameMessage.isBusy() && $gameMessage.positionType() === 2) {
        this.setActorStatusWindowOpacity(params.MessageWindowOpacity);
    } else {
        this.setActorStatusWindowOpacity(255);
        if (!$gameMessage.isBusy()) {
        BattleManager.displayMessageType(null);
        }
    }
};

Scene_Battle.prototype.setActorStatusWindowOpacity = function(opacity) {
    this._battleHudBack.opacity = opacity;
    this._battleHudFront.opacity = opacity;
};

const _Scene_Battle_createCancelButton = Scene_Battle.prototype.createCancelButton;
Scene_Battle.prototype.createCancelButton = function() {
    _Scene_Battle_createCancelButton.call(this);
    if (params.ButtonMode === 'left') {
        this._cancelButton.x = 4 + params.CancelButtonX;
    } else {
        this._cancelButton.x += params.CancelButtonX;
    }
};

Scene_Battle.prototype.statusWindowX = function() {//再定義
    if (this.isAnyInputWindowActive()) {
        return this.statusWindowRect().x;
    } else {
        return this._partyCommandWindow.width / 2 + (Graphics.width - Graphics.boxWidth) / 2;
    }
};

Scene_Battle.prototype.getActorWindowX = function() {
    if (params.ActorStatusWindowCenter) {
        return getActorWindowCenter() + params.ActorStatusWindow_X;
    } else {
        return params.ActorStatusWindow_X;
    }
};

Scene_Battle.prototype.getActorWindowY = function() {
    if (params.ActorStatusWindowPosition === 'ui_under') {
        return Graphics.boxHeight - this.getActorWindowHeight() + 6 + params.ActorStatusWindow_Y + (Graphics.height - Graphics.boxHeight) / 2 + (params.WindowFrameShow ? -6 : 0);
    } else if (params.ActorStatusWindowPosition === 'under') {
        return Graphics.height - this.getActorWindowHeight() + params.ActorStatusWindow_Y + (params.WindowFrameShow ? -6 : 0);
    } else {
        return params.ActorStatusWindow_Y;
    }
};

Scene_Battle.prototype.setStatusWindow_Sprite = function() {
    statusData = this._statusWindow;
};

Scene_Battle.prototype.MessageWindowBackGround = function() {
    this._messageBackground = this.setBackgroundWindow(null, 0, 0);
};

Scene_Battle.prototype.getActorWindowWidth = function() {
    return (params.ActorStatusWindow_Width > 0 ? params.ActorStatusWindow_Width : Graphics.boxWidth) - (params.WidthWithCommand ? this.partyCommandWidth() : 0);
};

Scene_Battle.prototype.getActorWindowHeight = function() {
    return params.ActorStatusWindow_Height > 0 ? params.ActorStatusWindow_Height : this.windowAreaHeight() + (params.WindowFrameShow ? 0 : 10);
};

Scene_Battle.prototype.getPartyCommandX = function() {
    return params.PartyCommand_X + (params.PartyCommandWindowCenter ? this.partyCommandCenter() : 0);
};

Scene_Battle.prototype.partyCommandCenter = function() {
    return (Graphics.boxWidth - this.partyCommandWidth(0)) / 2;
};

Scene_Battle.prototype.partyCommand_YPosition = function(mode) {
    if (mode === 0) {//デフォルト
        return this._statusWindow.y + (Graphics.boxHeight - Graphics.height) / 2 + (params.WindowFrameShow ? 0 : 4);
    } else if (mode === 10) {//カスタム
        return params.PartyCommand_Y;
    } else if (mode === 1) {//上部
        return params.PartyCommand_Y + (Graphics.boxHeight - Graphics.height) / 2 + 4;
    } else if (mode === 2) {//中間
        return this._statusWindow.y / 2 - (this.partyWindowAreaHeight() / 2) + (Graphics.boxHeight - Graphics.height) / 2 + params.PartyCommand_Y;
    } else if (mode === 3) {//アクターステータス上
        return this._statusWindow.y - this.partyWindowAreaHeight() + (Graphics.boxHeight - Graphics.height) / 2 + params.PartyCommand_Y;
    }
};

Scene_Battle.prototype.partyCommandWidth = function(mode) {
    return params.PartyCommand_Width > 0 ? Math.min(params.PartyCommand_Width, Graphics.width) : (mode === 0 ? Graphics.boxWidth : 192);
};

Scene_Battle.prototype.partyWindowAreaHeight = function() {
    return this.calcWindowHeight(params.PartyCommandMaxRow, true);
};

const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
Scene_Battle.prototype.startActorSelection = function() {
    _Scene_Battle_startActorSelection.call(this);
    this._skillWindow.hide();
    this._itemWindow.hide();
    this._statusWindow.deselect();
};

const _Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
Scene_Battle.prototype.startEnemySelection = function() {
    _Scene_Battle_startEnemySelection.call(this);
    this._statusWindow.show();
    this._skillWindow.hide();
    this._itemWindow.hide();
    if (!this.commandDefaultMode()) {
        this._actorCommandWindow.hide();
    }
};

const _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    _Scene_Battle_onEnemyCancel.call(this);
    $gameTemp.onBSAction = false;
    switch (this._actorCommandWindow.currentSymbol()) {
        case "attack":
        case "special":
        this._actorCommandWindow.show();
        break;
    }
};

const _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    _Scene_Battle_onActorCancel.call(this);
    $gameTemp.onBSAction = false;
    this._statusWindow.selectActor(BattleManager.actor());
};

const _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
    _Scene_Battle_startPartyCommandSelection.call(this);
    $gameTemp.onBSAction = false;
};

const _Scene_Battle_selectPreviousCommand = Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand = function() {
    _Scene_Battle_selectPreviousCommand.call(this);
    $gameTemp.onBSAction = false;
    this._partyCommandWindow.show();
};

const _Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
    $gameTemp.onBSAction = BattleManager.isTpb() && !this.commandDefaultMode();
    _Scene_Battle_onSelectAction.call(this);
};

const _Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
Scene_Battle.prototype.endCommandSelection = function() {
    _Scene_Battle_endCommandSelection.call(this);
    $gameTemp.onBSAction = false;
};

const _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
Scene_Battle.prototype.commandSkill = function() {
    _Scene_Battle_commandSkill.call(this);
    this._statusWindow.show();
};

const _Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
Scene_Battle.prototype.commandItem = function() {
    _Scene_Battle_commandItem.call(this);
    this._statusWindow.show();
};

const _Scene_Battle_selectNextCommand = Scene_Battle.prototype.selectNextCommand;
Scene_Battle.prototype.selectNextCommand = function() {
    _Scene_Battle_selectNextCommand.call(this);
    $gameTemp.onBSAction = false;
};

Scene_Battle.prototype.commandDefaultMode = function() {
    return params.bsMode === 'Default' || params.bsMode === 'Standard';
};

Scene_Battle.prototype.torigoyaBalloonConflict = function() {
    if (this._torigoyaBalloonInBattle_actorBalloonLayer) {
        this._torigoyaBalloonInBattle_actorBalloonLayer.visible = !this.selectWindowBisy();
    }
};

Scene_Battle.prototype.selectWindowBisy = function() {
    const list = ["_skillWindow", "_itemWindow", "_actorWindow", "_enemyWindow"];
    return list.some(data => this[data] && this[data].visible);
};


//Window_Base
Window_Base.prototype.setBSBackground = function(background) {
  this._bsBackground = background;
};

Window_Base.prototype.bsUpdateBackground = function() {
  if (this._bsBackground) {
    this._bsBackground.visible = this.visible;
  }
};


const _Window_Selectable_paint = Window_Selectable.prototype.paint;
Window_Selectable.prototype.paint = function() {
  const className = String(this.constructor.name);
  if (className === 'Window_ActorCommand') {
    this.setCommandHeight();
  }
  _Window_Selectable_paint.call(this);
};

//Window_PartyCommand
const _Window_PartyCommand_initialize = Window_PartyCommand.prototype.initialize;
Window_PartyCommand.prototype.initialize = function(rect) {
  _Window_PartyCommand_initialize.call(this, rect);
  this.windowColor = null;
  this.opacity = params.PartyCommandWindowShow ? 255 : 0;
};

Window_PartyCommand.prototype.loadWindowskin = function() {
  if (params.PartyCommandWindowSkin) {
    this.windowskin = ImageManager.loadSystem(params.PartyCommandWindowSkin);
    this.windowColor = params.ActorStatusWindowColor;
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};

Window_PartyCommand.prototype.updateTone = function() {
  if (params.PartyCommandWindowColor) {
    const tone = params.PartyCommandWindowColor;
    this.setTone(tone.red, tone.green, tone.bule);
  } else {
    Window_Base.prototype.updateTone.call(this);
  }
};

Window_PartyCommand.prototype.maxCols = function() {;
  return params.PartyCommandMode ? params.PartyCommandMaxCol : Math.min((this._list ? this.maxItems() : params.PartyCommandMaxCol), params.PartyCommandMaxCol);
};

const _Window_PartyCommand_itemRect = Window_PartyCommand.prototype.itemRect;
Window_PartyCommand.prototype.itemRect = function(index) {
  const rect = _Window_PartyCommand_itemRect.call(this, index);
  if (params.PartyCommandMode) {
    rect.x += this.itemWidth() / 2 * (this.maxCols() - Math.min(this.maxItems(), this.maxCols()));
  }
  return rect;
};

const _Window_PartyCommand_setup = Window_PartyCommand.prototype.setup;
Window_PartyCommand.prototype.setup = function() {
  if (!$gameTemp.onBSAction) {
    _Window_PartyCommand_setup.call(this);
  } else {
    $gameTemp.onBSAction = false;
  } 
};


//Window_ActorCommand
const _Window_ActorCommand_initialize = Window_ActorCommand.prototype.initialize;
Window_ActorCommand.prototype.initialize = function(rect) {
  _Window_ActorCommand_initialize.call(this, rect);
  this.opacity = params.ActorCommandWindowShow ? 255 : 0;
};

Window_ActorCommand.prototype.loadWindowskin = function() {
  if (params.ActorCommandWindowSkin) {
    this.windowskin = ImageManager.loadSystem(params.ActorCommandWindowSkin);
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};

Window_ActorCommand.prototype.setWindowSkin = function(data) {
  if (data.WindowSkin) {
    this.windowskin = ImageManager.loadSystem(data.WindowSkin);
    this.windowColor = data.WindowColor;
  } else {
    this.loadWindowskin();
    this.windowColor = null;
  }
};

Window_ActorCommand.prototype.updateTone = function() {
  if (this.windowColor) {
    const tone = this.windowColor;
    this.setTone(tone.red, tone.green, tone.bule);
  } else {
    Window_Base.prototype.updateTone.call(this);
  }
};

Window_ActorCommand.prototype.maxCols = function() {
  return params.ActorCommandMode ? params.ActorCommandMaxCol : Math.min((this._list ? this.maxItems() : params.ActorCommandMaxCol), params.ActorCommandMaxCol);
  //return Math.min((this._list ? this.maxItems() : params.ActorCommandMaxCol), params.ActorCommandMaxCol);
};

Window_ActorCommand.prototype.setCommandHeight = function() {
  const maxCols = params.ActorCommandVariable ? Math.ceil(this.maxItems() / params.ActorCommandMaxCol) : params.ActorCommandMaxRow;
  const cols = params.ActorCommandVariable ? maxCols.clamp(params.ActorCommandMinRow, params.ActorCommandMaxRow) : maxCols;
  this.height = this.fittingHeight(cols);
};

Window_ActorCommand.prototype.selectActor = function(actor) {
  const members = $gameParty.battleMembers();
  return members.indexOf(actor);
};

const _Window_ActorCommand_itemRect = Window_ActorCommand.prototype.itemRect;
Window_ActorCommand.prototype.itemRect = function(index) {
  const rect = _Window_ActorCommand_itemRect.call(this, index);
  if (params.ActorCommandMode) {
    rect.x += this.itemWidth() / 2 * (this.maxCols() - Math.min(this.maxItems(), this.maxCols()));
  }
  return rect;
};


const _Window_ActorCommand_refresh = Window_ActorCommand.prototype.refresh;
Window_ActorCommand.prototype.refresh = function() {
    _Window_ActorCommand_refresh.call(this);
    const actorIndex = this.selectActor(this._actor);
    if (statusData && this._actor || actorIndex >= 0) {
      const data = getActorPositionData( this._actor.actorId());
      this.setWindowSkin(data);
      const rect = statusData.itemRect(actorIndex);
      //this.setCommandHeight();
      if (params.ActorCommandPosition === 'actor') {
        if (Imported.NUUN_SupportActor && this._actor.getSupportActor()) {
          this.x = params.SupportActorCommand_X;
          this.y = params.SupportActorCommand_Y;
        } else {
          this.x = rect.x + (statusData.x - ((Graphics.width - Graphics.boxWidth) / 2)) + statusData.itemPadding() + ((rect.width - this.width) / 2) + params.ActorCommand_X;
          this.y = this.homeY - this.height + rect.y;
        }
      } else if (params.ActorCommandPosition === 'svtop') {
        data = this.SvActorData[actorIndex];
        this.x = data.x - (this.width + data.width) / 2 + 32 + params.ActorCommand_X;
        this.y = data.y - (this.height + data.height + 48) + params.ActorCommand_Y;
      } else if (params.ActorCommandPosition === 'svleft') {
        data = this.SvActorData[actorIndex];
        this.x = data.x - this.width - 32 + params.ActorCommand_X;
        this.y = data.y - (this.height + data.height + 48) / 2 + params.ActorCommand_Y;
      } else if (params.ActorCommandPosition === 'svright') {
        data = this.SvActorData[actorIndex];
        this.x = data.x + 32 + params.ActorCommand_X;
        this.y = data.y - (this.height + data.height + 48) / 2 + params.ActorCommand_Y;
      } else if (params.ActorCommandPosition === 'top') {
        this.y = this.homeY;
      } else if (params.ActorCommandPosition === 'middle') {
        this.y = this.homeY - Math.floor(this.height / 2);
      } else {
        this.y = this.homeY - this.height;
      }
    }
};


//Window_BattleStatus
const _Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
Window_BattleStatus.prototype.initialize = function(rect) {
  _Window_BattleStatus_initialize.call(this, rect);
  this.frameVisible = params.WindowFrameShow;
  this.opacity = params.WindowShow ? 255 : 0;
  this._opening = true;
  this.visible = true;
  $gameTemp.actorData = null;
};

Window_BattleStatus.prototype.loadWindowskin = function() {
  if (params.ActorStatusWindowSkin) {
    this.windowskin = ImageManager.loadSystem(params.ActorStatusWindowSkin);
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};

Window_BattleStatus.prototype.updateTone = function() {
  if (params.ActorStatusWindowColor) {
    const tone = params.ActorStatusWindowColor;
    this.setTone(tone.red, tone.green, tone.bule);
  } else {
    Window_Base.prototype.updateTone.call(this);
  }
};

const _Window_BattleStatus_maxCols = Window_BattleStatus.prototype.maxCols;
Window_BattleStatus.prototype.maxCols = function() {
  return params.ActorStatusVariable ? Math.min($gameParty.battleMembers().length, _Window_BattleStatus_maxCols.call(this), params.ActorMaxCol) : params.ActorMaxCol;
};

const _Window_BattleStatus_itemHeight = Window_BattleStatus.prototype.itemHeight;
Window_BattleStatus.prototype.itemHeight = function() {
  const row = params.ActorMaxRow > 0 ? params.ActorMaxRow : Math.ceil($gameParty.battleMembers().length / this.maxCols());
  return Math.floor(_Window_BattleStatus_itemHeight.call(this) / row);
};

const _Window_BattleStatus_rowSpacing = Window_BattleStatus.prototype.rowSpacing;
Window_BattleStatus.prototype.rowSpacing = function() {
  return Math.ceil($gameParty.battleMembers().length / this.maxCols()) > 1 ? 4 : _Window_BattleStatus_rowSpacing.call(this);
};

Window_BattleStatus.prototype.itemRect = function(index) {
    let rect = params.ActorStatusMode === 'triangle' ? this.triangleRect(index) : Window_Selectable.prototype.itemRect.call(this, index);
    rect = this.statusPosition(index, rect);
    return rect;
};

Window_Selectable.prototype.triangleRect = function(index) {
  const maxCols = this.maxCols();
  const topCol = this.maxItems() % maxCols;
  const itemWidth = this.itemWidth();
  const itemHeight = this.itemHeight();
  const colSpacing = this.colSpacing();
  const rowSpacing = this.rowSpacing();
  const col = (index + (topCol > index ? 0 : maxCols - topCol)) % maxCols;
  const shiftIndex = (params.ActorMaxRow - Math.ceil(this.maxItems() / maxCols)) * (maxCols - col);
  const row = Math.floor(((topCol > index || topCol === 0 ? 0 : maxCols - topCol) + index + shiftIndex) / maxCols);
  const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
  const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
  const width = itemWidth - colSpacing;
  const height = itemHeight - rowSpacing;
  return new Rectangle(x, y, width, height);
};

Window_BattleStatus.prototype.faceRect = function(index) {//再定義
    const rect = this.itemRect(index);
    rect.pad(-1);
    let height;
    if (params.bsMode === "Standard") {
      height = params.FaceHeight > 0 ? Math.min(params.FaceHeight, ImageManager.faceHeight) : ImageManager.faceHeight;
      rect.height = params.FaceHeightOnWindow ? Math.min(rect.height, height) : height;
      //rect.x -= Math.floor((rect.width / 2) - (ImageManager.faceWidth / 2));
    } else if (params.bsMode === "Type4") {
      height = params.FaceHeight > 0 ? Math.min(params.FaceHeight, ImageManager.faceHeight) : ImageManager.faceHeight;
      rect.height = params.FaceHeightOnWindow ? Math.min(rect.height, height) : height;
    } else {
      height = params.FaceHeight > 0 ? Math.min(params.FaceHeight, ImageManager.faceHeight) : this.basicGaugesY(rect) - this.gaugeLineHeight() + this.gaugeLineHeight() / 2 - rect.y;
      rect.height = params.FaceHeightOnWindow ? Math.min(rect.height, height) : height;
    }
    rect.y += this.colSpacing();
    return rect;
};

Window_BattleStatus.prototype.preparePartyRefresh = function() {
    this.performPartyRefresh();
};

Window_BattleStatus.prototype.performPartyRefresh = function() {
    $gameTemp.setBattleStyleRefresh(true);
    this.refresh();
    this.commandRefresh(true);
};

Window_BattleStatus.prototype.commandRefresh = function(flag) {
    this._commandRefresh = flag;
};

Window_BattleStatus.prototype.isCommandRefresh = function() {
    return this._commandRefresh;
};

Window_BattleStatus.prototype.setActorWindow = function(battleActorImges, BattleActorStatus) {
    this._window_battleActorImges = battleActorImges;
    this._window_BattleActorStatus = BattleActorStatus;
};

const _Window_BattleStatus_refreshCursor = Window_BattleStatus.prototype.refreshCursor;
Window_BattleStatus.prototype.refreshCursor = function() {
  if (params.SelectBackShow) {
    _Window_BattleStatus_refreshCursor.call(this);
  } else {
    this.setCursorRect(0, 0, 0, 0);
  }
};

Window_BattleStatus.prototype.statusPosition = function(index, rect) {
    const itemWidth = this.itemWidth();
    const padding = this.itemPadding();
    let cols = this.maxCols();
    let maxCols = 0;
    const data = params.ActorContentsSetting ? params.ActorContentsSetting[index] : null;
    if (data && data.ActorContentsCoordinateMode) {
        rect.x = 0;
        rect.y = 0;
    } else {
        if (params.ActorStatusMode === 'triangle') {
            const topCol = this.maxItems() % this.maxCols();
            cols = (topCol > index ? topCol : this.maxCols());
            index += (topCol > index || topCol === 0 ? 0 : this.maxCols() - topCol);
            maxCols = Math.min(cols, this.maxItems());
        } else {
            maxCols = Math.min(this.maxItems() - (Math.floor(index / cols) * cols), cols, this.maxItems());
        }
        if (params.ActorStatusMode === 'center') {
            rect.x += Math.floor((this.width / 2) - (itemWidth * maxCols / 2)) - padding;
        } else if (params.ActorStatusMode === 'raigt') {
            rect.x += this.width - (maxCols * itemWidth) - padding * 2;
        } else if (params.ActorStatusMode === 'triangle') {
            rect.x += Math.floor((this.width / 2) - (itemWidth * maxCols / 2)) - padding;
        }
        if (params.ActorStatusRowsMode === 'under') {
            rect.y = this.height - (rect.height + rect.y + padding * 2);
        }
    }
    if (data) {
        rect.x += data.ActorContentsX || 0;
        rect.y += data.ActorContentsY || 0;
        rect.width = data.ActorContentsWidth > 0 ? data.ActorContentsWidth : rect.width;
        rect.height = data.ActorContentsHeight > 0 ? data.ActorContentsHeight : rect.height;
    }
    return rect;
};

Window_BattleStatus.prototype.drawItem = function(index) {
  if (params.ActorStatusActorWindowShow) {
    this.drawActorWindow(index);
  }
};

Window_BattleStatus.prototype.drawActorWindow = function(index) {
  if (params.ActorStatusActorWindowShow) {
    const actor = this.actor(index);
    const data = getActorPositionData(actor.actorId());
    const key = "actor%1-window".format(actor.actorId());
    const rect = this.itemRect(index);
    bsRect = rect;
    const window = this.createInnerSprite(key, Window_BSActor);
    window.setup(actor, data);
    window.show();
  }
};

Window_BattleStatus.prototype.drawItemBackground = function(index) {
  const actor = this.actor(index);
  const data = getActorPositionData(actor.actorId());
  if (data.ActorBackground) {
    const rect = this.itemRect(index);
    const bitmap = ImageManager.nuun_LoadPictures(data.ActorBackground);
    this.actorBackGround(actor, bitmap, rect.x, rect.y, rect.width, rect.height);
  } else if (params.CursorBackShow) {
    Window_Selectable.prototype.drawItemBackground.call(this, index);
  }
};

Window_BattleStatus.prototype.drawItemStatus = function(index) {//再定義
  const actor = this.actor(index);
  $gameTemp.actorData = getActorPositionData(actor.actorId());
  const statusData = $gameTemp.actorData.StatusListData;
    if (statusData && statusData.length > 0) {
      this.drawStatusListData(actor, statusData, index);
    } else { 
      const rect = this.itemRectWithPadding(index);
      this.getGaugeMaxWidth(rect.width, rect.width);
      const stateIconX = this.stateIconX(rect);
      const stateIconY = this.stateIconY(rect);
      if (params.StateVisible && !params.OutsideWindowVisible) {
        this.placeStateIcon(actor, stateIconX, stateIconY);
      }
      if (params.TPBShow) {
          const timeX = this.timeX(rect);
          const timeY = this.timeY(rect);
          this.placeTimeGauge(actor, timeX, timeY);
      }
      if (params.NameShow) {
          const nameX = this.nameX(rect);
          const nameY = this.nameY(rect);
          this.placeActorName(actor, nameX, nameY);
      }
      const basicGaugesX = this.basicGaugesX(rect);
      const basicGaugesY = this.basicGaugesY(rect);
      this.placeBasicGauges(actor, basicGaugesX, basicGaugesY, rect);
    }
    $gameTemp.actorData = null;
};

Window_BattleStatus.prototype.drawStatusListData = function(actor, list, index) {
  const rect = this.itemRectWithPadding(index);
  list.forEach(data => {
    this.getGaugeMaxWidth(rect.width, data.Width);
    $gameTemp.userStatusParam = data;
    switch (data.Status) {
      case 'hpgauge':
        this.placeGauge(actor, "hp", rect.x + data.PositionX, rect.y + data.PositionY);
        break;
      case 'mpgauge':
        this.placeGauge(actor, "mp", rect.x + data.PositionX, rect.y + data.PositionY);
        break;
      case 'tpgauge':
        this.placeGauge(actor, "tp", rect.x + data.PositionX, rect.y + data.PositionY);
        break;
      case 'tpb':
        this.placeTimeGauge(actor, rect.x + data.PositionX, rect.y + data.PositionY);
        break;
      case 'state':
        if (!params.OutsideWindowVisible) {
          this.placeStateIcon(actor, rect.x + data.PositionX, rect.y + data.PositionY, data);
        }
        break;
      case 'state2':
        this.drawActorIcons(actor, rect.x + data.PositionX, rect.y + data.PositionY, Math.min(rect.width, data.Width), data);
        break;
      case 'name':
        this.bs_PlaceActorName(actor, rect.x + data.PositionX, rect.y + data.PositionY);
        break;
      case 'lv':
        this.drawLevel(actor, data, rect.x + data.PositionX, rect.y + data.PositionY, Math.min(rect.width, data.Width));
        break;
      case 'param':
        this.drawUserParam(actor, data, rect.x + data.PositionX, rect.y + data.PositionY, Math.min(rect.width, data.Width));
        break;
      case 'usergauge':
        this.placeGauge(actor, data.UserParamID, rect.x + data.PositionX, rect.y + data.PositionY);
        break;
      case 'dparam':
        this.placeUserParam(actor, data.UserParamID, rect.x + data.PositionX, rect.y + data.PositionY, Math.min(rect.width, data.Width));
        break;
      case 'imges':
        this.drawActorImges(actor, data, rect.x + data.PositionX, rect.y + data.PositionY, Math.min(rect.width, data.Width));
        break;
      default:
        break;
    }
  });
  $gameTemp.userStatusParam = null;
};

Window_BattleStatus.prototype.drawLevel = function(actor, data, x, y, width) {
  this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
  this.changeTextColor(ColorManager.systemColor());
  this.nuun_setContentsFontFace(data);
  const nameText = data.ParamName ? data.ParamName : TextManager.levelA;
  const textWidth = this.textWidth(nameText);
  this.drawText(nameText, x, y, textWidth);
  this.resetTextColor();
  this.drawText(actor.level, x + textWidth + 8, y, width - (textWidth + 8), (data.NamePosition || 'right'));
  this.resetFontSettings();
};

Window_BattleStatus.prototype.drawUserParam = function(actor, data, x, y, width) {
  this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
  const a = actor;
  const d = actor.actor();
  const nameText = data.ParamName ? data.ParamName : '';
  const textWidth = Math.max(60 , this.textWidth(nameText));
  this.changeTextColor(ColorManager.systemColor());
  this.nuun_setContentsFontFace(data);
  if (nameText) {
    this.drawText(nameText, x + textWidth, y, width - textWidth);
  }
  this.resetTextColor();
  if (data.DetaEval) {
      this.drawText(eval(data.DetaEval), x + textWidth + 8, y, width - (textWidth + 8), (data.NamePosition || 'right'));
  }
  this.resetFontSettings();
};

Window_BattleStatus.prototype.drawActorIcons = function(actor, x, y, width, data) {
  const key = "actor%1-stateIcon%2".format(actor.actorId(), (data.UserParamID || '_bsStateIcon2'));
  const sprite = this.createInnerSprite(key, Sprite_BSActorStateIcon);
  sprite.setup(actor, data);
  sprite.move(x, y);
  sprite.setupVisibleIcons(this.getVisibleIcons(data.DetaEval1), this.getVisibleIcons(data.DetaEval2));
  sprite.show();
};

Window_BattleStatus.prototype.drawActorImges = function(actor, data, x, y, width) {
  if (data.ContentsImges) {
    const key = "actor%1-imges%2".format(actor.actorId(), data.UserParamID || '_img');
    const bitmap = ImageManager.nuun_LoadPictures(data.ContentsImges);
    const sprite = this.createInnerSprite(key, Sprite_BSSprite);
    sprite.setup(actor, data);
    sprite.bitmap = bitmap;
    sprite.x = x;
    sprite.y = y;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.show();
  }
};

Window_BattleStatus.prototype.placeUserParam = function(actor, data, x, y) {
  const key = "actor%1-userParam%2".format(actor.actorId(), data.UserParamID || 'dparam');
  const sprite = this.createInnerSprite(key, Sprite_NuunUserParam);
  sprite.setup(actor);
  sprite.move(x, y);
  sprite.show();
};

Window_BattleStatus.prototype.bs_PlaceActorName = function(actor, x, y) {
  const key = "actor%1-name".format(actor.actorId());
  const sprite = $gameTemp.userStatusParam ? this.createInnerSprite(key, Sprite_BSName) : this.createInnerSprite(key, Sprite_Name);
  sprite.setup(actor);
  sprite.move(x, y);
  sprite.show();
};

Window_BattleStatus.prototype.placeStateIcon = function(actor, x, y, data) {
  const key = "actor%1-stateIcon%2".format(actor.actorId(), (data && data.UserParamID ? data.UserParamID : '_bsStateIcon'));
  const sprite = this.createInnerSprite(key, Sprite_BSStateIcon);
  sprite.setup(actor);
  sprite.move(x, y);
  if (data) {
    sprite.setupVisibleIcons(this.getVisibleIcons(data.DetaEval1), this.getVisibleIcons(data.DetaEval2));
  }
  sprite.show();
};

Window_BattleStatus.prototype.placeBasicGauges = function(actor, x, y, rect) {
    let x2 = $gameTemp.actorData.HPChangePosition ? $gameTemp.actorData.ActorHP_X + rect.x : this.defaultGaugeX(x, 'hp');
    let y2 = $gameTemp.actorData.HPChangePosition ? $gameTemp.actorData.ActorHP_Y + rect.y : this.defaultGaugeY(y, 'hp');
    this.placeGauge(actor, "hp", x2, y2);
    x2 = $gameTemp.actorData.MPChangePosition ? $gameTemp.actorData.ActorMP_X + rect.x : this.defaultGaugeX(x, 'mp');
    y2 = $gameTemp.actorData.MPChangePosition ? $gameTemp.actorData.ActorMP_Y + rect.y : this.defaultGaugeY(y, 'mp');
    this.placeGauge(actor, "mp", x2, y2);
    if ($dataSystem.optDisplayTp) {
        x2 = $gameTemp.actorData.TPChangePosition ? $gameTemp.actorData.ActorTP_X + rect.x : this.defaultGaugeX(x, 'tp');
        y2 = $gameTemp.actorData.TPChangePosition ? $gameTemp.actorData.ActorTP_Y + rect.y : this.defaultGaugeY(y, 'tp');
        this.placeGauge(actor, "tp", x2, y2);
    }
};

Window_BattleStatus.prototype.getVisibleIcons = function(str) {
  let states = [];
  const dataEval = str;
  if (dataEval) {
    const stateList = dataEval.split(',');
     for (const id of stateList) {
        Array.prototype.push.apply(states, NuunManager.nuun_getListIdData(id));
    }
  }
  return states;
};

Window_BattleStatus.prototype.defaultGaugeX = function(x, type) {
  switch (type) {
    case 'hp':
      return params.bsMode === 'Standard' ? x : x;
    case 'mp':
      return params.bsMode === 'Standard' ? x + 134: x;
    case 'tp':
      return params.bsMode === 'Standard' ? x + 268: x;
    case 'time':
      return 
  }
};

Window_BattleStatus.prototype.defaultGaugeY = function(y, type) {
  switch (type) {
    case 'hp':
      return params.bsMode === 'Standard' ? y : y;
    case 'mp':
      return params.bsMode === 'Standard' ? y : y + this.gaugeLineHeight();
    case 'tp':
      return params.bsMode === 'Standard' ? y : y + this.gaugeLineHeight() * 2;
    case 'time':
      return params.bsMode === 'Standard' ? y : y;
  }
};

Window_BattleStatus.prototype.placeGauge = function(actor, type, x, y) {
  $gameTemp.bsGaugeType = type;
  if (Imported.NUUN_GaugeImage) {
    this.placeGaugeImg(actor, type, x, y);
  }
  const key = "actor%1-gauge-%2".format(actor.actorId(), type);
  const sprite = $gameTemp.userStatusParam || $gameTemp.actorData ? this.createInnerSprite(key, Sprite_BSGauge) : this.createInnerSprite(key, Sprite_Gauge);
  sprite.setup(actor, type);
  sprite.move(x, y);
  sprite.show();
};

const _Window_BattleStatus_nameX = Window_BattleStatus.prototype.nameX;
Window_BattleStatus.prototype.nameX = function(rect) {
  if (params.bsMode === 'Standard') {
    return $gameTemp.actorData.NameChangePosition ? $gameTemp.actorData.ActorName_X + rect.x : rect.x;
  } else {
    return $gameTemp.actorData.NameChangePosition ? $gameTemp.actorData.ActorName_X + rect.x : _Window_BattleStatus_nameX.call(this, rect);
  }
};

const _Window_BattleStatus_nameY = Window_BattleStatus.prototype.nameY;
Window_BattleStatus.prototype.nameY = function(rect) {
  if (params.bsMode === 'Standard') {
    return $gameTemp.actorData.NameChangePosition ? $gameTemp.actorData.ActorName_Y + rect.y : rect.y + 10;
  } else {
    return $gameTemp.actorData.NameChangePosition ? $gameTemp.actorData.ActorName_Y + rect.y : _Window_BattleStatus_nameY.call(this, rect);
  }
};

const _Window_BattleStatus_basicGaugesX = Window_BattleStatus.prototype.basicGaugesX;
Window_BattleStatus.prototype.basicGaugesX = function(rect) {
  if (params.bsMode === 'Standard') {
    return rect.x + 180;
  } else {
    return _Window_BattleStatus_basicGaugesX.call(this, rect);
  }
};

const _Window_BattleStatus_basicGaugesY = Window_BattleStatus.prototype.basicGaugesY;
Window_BattleStatus.prototype.basicGaugesY = function(rect) {
  if (params.bsMode === 'Standard') {
    return rect.y + 8;
  } else {
    return _Window_BattleStatus_basicGaugesY.call(this, rect);
  }
};

const _Window_BattleStatus_stateIconX = Window_BattleStatus.prototype.stateIconX;
Window_BattleStatus.prototype.stateIconX = function(rect) {
  if (params.bsMode === 'Standard') {
    return $gameTemp.actorData.StateChangePosition ? $gameTemp.actorData.ActorState_X + rect.x : rect.x + 156;
  } else {
    return $gameTemp.actorData.StateChangePosition ? $gameTemp.actorData.ActorState_X + rect.x : _Window_BattleStatus_stateIconX.call(this, rect);
  }
};

const _Window_BattleStatus_stateIconY = Window_BattleStatus.prototype.stateIconY;
Window_BattleStatus.prototype.stateIconY = function(rect) {
  if (params.bsMode === 'Standard') {
    return $gameTemp.actorData.StateChangePosition ? $gameTemp.actorData.ActorState_Y + rect.y : rect.y + 22;
  } else {
    return $gameTemp.actorData.StateChangePosition ? $gameTemp.actorData.ActorState_Y + rect.y : _Window_BattleStatus_stateIconY.call(this, rect);
  }
};

Window_BattleStatus.prototype.timeX = function(rect) {
  if (params.bsMode === 'Standard') {
    return $gameTemp.actorData.TPBChangePosition ? $gameTemp.actorData.ActorTPB_X + rect.x : rect.x;
  } else {
    return $gameTemp.actorData.TPBChangePosition ? $gameTemp.actorData.ActorTPB_X + rect.x : rect.x;
  }
};

Window_BattleStatus.prototype.timeY = function(rect) {
  if (params.bsMode === 'Standard') {
    return $gameTemp.actorData.TPBChangePosition ? $gameTemp.actorData.ActorTPB_Y + rect.y : rect.y + 12;
  } else {
    return $gameTemp.actorData.TPBChangePosition ? $gameTemp.actorData.ActorTPB_Y + rect.y : this.basicGaugesY(rect) - this.gaugeLineHeight();
  }
};

Window_BattleStatus.prototype.actorBackGround = function(actor, bitmap, x, y, width, height) {
  this.contentsBack.blt(bitmap, 0, 0, width, height, x, y);
};

Window_BattleStatus.prototype.open = function() {
    Window_Base.prototype.open.call(this);
    if (this._window_battleActorImges) {
        this._window_battleActorImges.open();
        this._window_BattleActorStatus.open();
    }
};
  
Window_BattleStatus.prototype.close = function() {
    Window_Base.prototype.close.call(this);
    if (this._window_battleActorImges) {
        this._window_battleActorImges.close();
        this._window_BattleActorStatus.close();
    }
};

const _Window_BattleStatus_show = Window_BattleStatus.prototype.show;
  Window_BattleStatus.prototype.show = function() {
    _Window_BattleStatus_show.call(this);
    if (this._window_battleActorImges) {
      this._window_battleActorImges.show();
      this._window_BattleActorStatus.show();
    }
};

const _Window_BattleStatus_hide = Window_BattleStatus.prototype.hide;
Window_BattleStatus.prototype.hide = function() {
    _Window_BattleStatus_hide.call(this);
    if (this._window_battleActorImges) {
      this._window_battleActorImges.hide();
      this._window_BattleActorStatus.hide();
    }
};

Window_BattleStatus.prototype.nuun_setContentsFontFace = function(data) {
    this.contents.fontFace = data.FontFace ? data.FontFace : $gameSystem.mainFontFace();
};

//Window_BattleActorImges
function Window_BattleActorImges() {
    this.initialize(...arguments);
}
  
Window_BattleActorImges.prototype = Object.create(Window_BattleStatus.prototype);
Window_BattleActorImges.prototype.constructor = Window_BattleActorImges;

Window_BattleActorImges.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.opacity = 0;
    this._opening = true;
    this.visible = true;
    this._bitmapsReady = 0;
    this.setActorBaseSprite();
    this.preparePartyRefresh();  
};

Window_BattleActorImges.prototype.setActorBaseSprite = function() {
  const sprite = new Sprite();
  this._actorImgBaseSprite = sprite;
  this.addChild(sprite);
  sprite.hide();
};

Window_BattleActorImges.prototype.drawItem = function(index) {
  this.drawItemImage(index);
  this.drawStatusBack(index);
};

Window_BattleActorImges.prototype.drawStatusListData = function(actor, list, index) {
  const rect = this.itemRectWithPadding(index);
  list.forEach(data => {
    switch (data.Status) {
      case 'imges':
        this.drawActorImges(actor, data, rect.x + data.PositionX, rect.y + data.PositionY, Math.min(rect.width, data.Width));
        break;
      default:
        break;
    }
  });
};

Window_BattleActorImges.prototype.drawItemStatus = function(index) {//再定義
  const actor = this.actor(index);
  const actorData = getActorPositionData(actor.actorId());
  const statusData = actorData.StatusListData;
    if (statusData && statusData.length > 0) {
      this.drawStatusListData(actor, statusData, index);
    }
};

Window_BattleActorImges.prototype.drawActorImges = function(actor, data, x, y, width) {
  if (data.ContentsImges) {
    const key = "actor%1-imges%2".format(actor.actorId(), data.UserParamID || '_img');
    const bitmap = ImageManager.nuun_LoadPictures(data.ContentsImges);
    const sprite = this.createActorImgSprite(key, Sprite);
    sprite.bitmap = bitmap;
    sprite.x = x;
    sprite.y = y;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.show();
  }
};

Window_BattleActorImges.prototype.removeActorSprite = function() {
    this._additionalSprites = Object.values(this._additionalSprites).filter(sprite => {
        this._actorImgBaseSprite.removeChild(sprite);
        return false;
    });
};

Window_BattleActorImges.prototype.drawStatusBack = function(index) {
  if (this._bitmapsReady >= $gameParty.members().length) {
    const actor = this.actor(index);
    const data = getActorPositionData(actor.actorId());
    if (data.ActorFrontBackground) {
      const rect = this.itemRect(index);
      const bitmap = ImageManager.nuun_LoadPictures(data.ActorFrontBackground);
      this.actorFrontBackGround(actor, bitmap, rect.x, rect.y, rect.width, rect.height);
    }
  }
};

Window_BattleActorImges.prototype.actorFrontBackGround = function(actor, bitmap, x, y, width, height) {
  const key = "actor%1-Frontback-%2".format(actor.actorId());
  const sprite = this.createActorImgSprite(key, Sprite);
  sprite.bitmap = bitmap;
  sprite.move(x + this.colSpacing(), y + 8);
  sprite.width = width;
  sprite.height = height;
  sprite.show();
};

Window_BattleActorImges.prototype.drawItemBackground = function(index) {

};

Window_BattleActorImges.prototype.preparePartyRefresh = function() {
    this.removeActorSprite();
    this._bitmapsReady = 0;
    this.actorMainSprite = [];
    let bitmap = null;
    for (const actor of $gameParty.members()) {
        actor.battleStyleImgRefresh();
        bitmap = actor.getLoadBattleStyleImg();
        this.actorMainSprite.push(bitmap);
        if(bitmap && !bitmap.isReady()){
        bitmap.addLoadListener(this.performPartyRefresh.bind(this, bitmap));
        } else {
        this.performPartyRefresh(bitmap);
        }
    }
};

Window_BattleActorImges.prototype.performPartyRefresh = function() {
  this._bitmapsReady++;
  if (this._bitmapsReady >= $gameParty.members().length) {
      this.refresh();
  }
};

Window_BattleActorImges.prototype.drawItemImage = function(index) {
  const actor = this.actor(index);
  if (actor.bsImgMode !== 'none' && actor.faceMode) {
    this.drawItemFace(index, actor);
  } else if (actor.bsImgMode !== 'none') {
    this.drawItemButler(index, actor);
  }
  if ($gameTemp.actorData && params.StateVisible && params.OutsideWindowVisible) {
    const rect = this.itemRectWithPadding(index);
    const statusData = $gameTemp.actorData.StatusListData;
    if (statusData) {
      const find = statusData.find(data => data.Status === 'state');
      if (find) {
        this.placeStateIcon(actor, rect.x + find.PositionX, rect.y + find.PositionY);
      }
    } else {
      const stateIconX = this.stateIconX(rect);
      const stateIconY = this.stateIconY(rect);
      this.placeStateIcon(actor, stateIconX, stateIconY);
    }
  }
};

Window_BattleActorImges.prototype.drawItemButler = function(index, actor) {
  const bitmap = this.actorMainSprite[index];
  const actorId = actor.actorId();
  const positionData = getActorPositionData(actorId);
  const actorImgData = getActorImgData(actorId);
  const rect = this.itemRect(index);
  let stateSprite = null;
  if (bitmap) {
    const key = "actor%1-BSImg".format(actor.actorId());
    const sprite = this.createActorImgSprite(key, Sprite_ActorImges);
    const imgIndex = actor.getBSImgIndex();
    if (!sprite._stateSprite && getStateAnimationShow()) {
      stateSprite = new Sprite_StateOverlay();
      this.addChild(stateSprite);
    }
    sprite._rectWidth = bitmap.width;
    sprite._rectHeight = bitmap.height;
    sprite.setup(actor, actorImgData, imgIndex, stateSprite);
    const x = rect.x + (actorImgData.ActorImgHPosition === 'center' ? Math.floor(this.itemWidth() / 2) + 4 : 8) + (positionData.ImgChangePosition ? positionData.ActorImg_X : 0) + (actorImgData ? actorImgData.Actor_X : 0);
    //const x = rect.x + (positionData.ImgChangePosition ? positionData.ActorImg_X : Math.floor(this.itemWidth() / 2) + 4) + (actorImgData ? actorImgData.Actor_X : 0);
    const y = rect.y + (actorImgData.ActorImgVPosition === 'under' ? this.height : 0) + (positionData.ImgChangePosition ? positionData.ActorImg_Y : 0) + this.itemPadding() + (actorImgData ? actorImgData.Actor_Y : 0);
    const scale = actorImgData.Actor_Scale / 100;
    sprite.scale.x = scale;
    sprite.scale.y = scale; 
    sprite.setHome(x, y);
    sprite.show();
    if (params.Img_SW > 0 || params.Img_SH > 0) {
      const oriScale = 1 / scale;
      const sw = (params.Img_SW || Infinity) * oriScale;
      const sh = (params.Img_SH || Infinity) * oriScale;
      const sx = (actorImgData.Img_SX || 0) * oriScale + (actorImgData.ActorImgHPosition === 'center' ? (bitmap.width - sw) / 2 : 0);
      const sy = (actorImgData.Img_SY || 0) * oriScale;
      sprite.setFrame(sx, sy, sw, sh);
    }
    BattleManager.battlerSprite[index] = sprite;
  }
};

Window_BattleActorImges.prototype.drawItemFace = function(index, actor) {
  const actorId = actor.actorId();
  const positionData = getActorPositionData(actorId);
  const actorImgData = getActorImgData(actorId);
  const rect = this.faceRect(index);
  let stateSprite = null;
  let width = rect.width || ImageManager.faceWidth;
  let height = rect.height || ImageManager.faceHeight;
  const key = "actor%1-BSImg".format(actor.actorId());
  const sprite = this.createActorImgSprite(key, Sprite_ActorImges);
  const imgIndex = actor.getBSImgIndex();
  if (!sprite._stateSprite && getStateAnimationShow()) {
    stateSprite = new Sprite_StateOverlay();
    this.addChild(stateSprite);
  }
  const scale = actorImgData.Actor_Scale / 100;
  sprite.scale.x = scale;
  sprite.scale.y = scale;
  const pw = ImageManager.faceWidth;
  const ph = ImageManager.faceHeight;
  const sw = Math.min(width, pw);
  const sh = Math.min(height, ph);
  sprite._rectWidth = Math.min(pw, rect.width);
  sprite._rectHeight = rect.height;
  sprite.setup(actor, actorImgData, imgIndex, stateSprite);
  const x = rect.x + (actorImgData.ActorImgHPosition === 'center' ? Math.floor(this.itemWidth() / 2) + 4 : 8) + (positionData.ImgChangePosition ? positionData.ActorImg_X : 0) + (actorImgData ? actorImgData.Actor_X : 0);
  //const x = rect.x + (positionData.ImgChangePosition ? positionData.ActorImg_X : Math.floor(this.itemWidth() / 2) + 4) + (actorImgData ? actorImgData.Actor_X : 0);
  const y = rect.y + (actorImgData.ActorImgVPosition === 'under' ? sh : 1) + (positionData.ImgChangePosition ? positionData.ActorImg_Y : 0) + (actorImgData ? actorImgData.Actor_Y : 0);
  sprite.setHome(x, y);
  const sx = Math.floor((imgIndex % 4) * pw + (pw - sw) / 2);
  const sy = Math.floor(Math.floor(imgIndex / 4) * ph + (ph - sh) / 2);
  sprite.setFrame(sx, sy, sw, sh);
  sprite.show();
  BattleManager.battlerSprite[index] = sprite;
};

Window_BattleActorImges.prototype.placeStateIcon = function(actor, x, y, data) {
  const key = "actor%1-stateIcon%2".format(actor.actorId(), data ? data.UserParamID || 'dparam' : 'dparam');
  const sprite = this.createActorImgSprite(key, Sprite_StateIcon);
  sprite.setup(actor);
  sprite.move(x, y);
  if (data) {
    sprite.setupVisibleIcons(this.getVisibleIcons(data.detaEval1), this.getVisibleIcons(data.detaEval2));
  }
  sprite.show();
};

Window_BattleActorImges.prototype.createActorImgSprite = function(key, spriteClass) {
  const dict = this._additionalSprites;
  if (dict[key]) {
      return dict[key];
  } else {
      const sprite = new spriteClass();
      dict[key] = sprite;
      this._actorImgBaseSprite.addChild(sprite);
      return sprite;
  }
};

Window_BattleActorImges.prototype.open = function() {
  Window_Base.prototype.open.call(this);
  this._actorImgBaseSprite.show();
};

Window_BattleActorImges.prototype.close = function() {
  Window_Base.prototype.close.call(this);
  this._actorImgBaseSprite.hide();
};


//Window_BattleActorStatus
function Window_BattleActorStatus() {
    this.initialize(...arguments);
}
  
Window_BattleActorStatus.prototype = Object.create(Window_BattleStatus.prototype);
Window_BattleActorStatus.prototype.constructor = Window_BattleActorStatus;

Window_BattleActorStatus.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    const filterArea = this._clientArea.filterArea;
    this.openness = 0;
    this.opacity = 0;
    this._opening = true;
    this.visible = true;
    BattleManager.gaugeMaxWidth = params.ActorStatusVariable ? this.width : this.itemRectWithPadding(0).width;
    BattleManager.rectMaxWidth = BattleManager.gaugeMaxWidth;
    this.preparePartyRefresh();
};

Window_BattleActorStatus.prototype.getGaugeMaxWidth = function(width, width2) {
  BattleManager.rectMaxWidth = Math.min(width, width2);
};

Window_BattleActorStatus.prototype._updateFilterArea = function() {
  const pos = this._clientArea.worldTransform.apply(new Point(0, 0));
  const filterArea = this._clientArea.filterArea;
  filterArea.x = 0;
  filterArea.y = 0;
  filterArea.width = Graphics.width;
  filterArea.height = Graphics.height;
};

Window_BattleActorStatus.prototype.preparePartyRefresh = function() {
    $gameTemp.clearBattleRefreshRequest();
    this.performPartyRefresh();
};

Window_BattleActorStatus.prototype.performPartyRefresh = function() {
    this.refresh();
};

Window_BattleActorStatus.prototype.drawItemBackground = function(index) {

};

Window_BattleActorStatus.prototype.drawItem = function(index) {
    this.drawItemStatus(index);
};

//Window_BattleActor
const _Window_BattleActor_initialize = Window_BattleActor.prototype.initialize;
Window_BattleActor.prototype.initialize = function(rect) {
  _Window_BattleActor_initialize.call(this, rect);
  this.opacity = 0;
};

Window_BattleActor.prototype.drawItemBackground = function(index) {

};

Window_BattleActor.prototype.preparePartyRefresh = function() {
  this.refresh();
};

Window_BattleActor.prototype.drawItem = function(index) {

};

const _Window_BattleActor_refreshCursor = Window_BattleActor.prototype.refreshCursor;
Window_BattleActor.prototype.refreshCursor = function() {
  if (params.ActorSelectBackShow) {
    _Window_BattleActor_refreshCursor.call(this);
  } else {
    this.setCursorRect(0, 0, 0, 0);
  }
};

//Window_BattleEnemy
const _Window_BattleEnemy_initialize = Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(rect) {
  _Window_BattleEnemy_initialize.call(this, rect);
  this._bsBackground = null;
  this.opacity = params.EnemyWindowShow ? 255 : 0;
};

Window_BattleEnemy.prototype.maxCols = function() {
  return params.EnemyMaxCol;
};

if (params.EnemyNameDyingColor) {
  Window_BattleEnemy.prototype.drawItem = function(index) {//再定義
    const enemy = this._enemies[index];
    this.changeTextColor(ColorManager.hpColor(enemy));
    const name = enemy.name();
    const rect = this.itemLineRect(index);
    this.drawText(name, rect.x, rect.y, rect.width);
  };
}

//Window_BattleSkill
const _Window_BattleSkill_initialize = Window_BattleSkill.prototype.initialize;
Window_BattleSkill.prototype.initialize = function(rect) {
  _Window_BattleSkill_initialize.call(this, rect);
  this._bsBackground = null;
  this.opacity = params.SkillWindowShow ? 255 : 0;
};

if (params.SkillMaxCol > 0) {
  Window_BattleSkill.prototype.maxCols = function() {
    return params.SkillMaxCol;
  };
}

//Window_BattleItem
const _Window_BattleItem_initialize =Window_BattleItem.prototype.initialize;
Window_BattleItem.prototype.initialize = function(rect) {
  _Window_BattleItem_initialize.call(this, rect);
  this._bsBackground = null;
  this.opacity = params.ItemWindowShow ? 255 : 0;
};

if (params.ItemMaxCol > 0) {
  Window_BattleItem.prototype.maxCols = function() {
    return params.ItemMaxCol;
  };
}

//Window_Help
const _Window_Help_initialize = Window_Help.prototype.initialize;
Window_Help.prototype.initialize = function(rect) {
  _Window_Help_initialize.call(this, rect);
};

//Window_BattleLog
const _Window_BattleLog_showEnemyAttackAnimation = Window_BattleLog.prototype.showEnemyAttackAnimation;
  Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
    const id = subject.attackAnimation();
    if (id > 0) {
      this.showNormalAnimation(targets, id, false);
    } else {
      _Window_BattleLog_showEnemyAttackAnimation.call(this);
    }
};

//Window_Message
const _Window_Message_updateBackground = Window_Message.prototype.updateBackground;
Window_Message.prototype.updateBackground = function() {
    _Window_Message_updateBackground.call(this);
    if ($gameParty.inBattle()) {
        if (BattleManager.getDisplayMessageType() === "Appear" && params.AppearBackgroundImg) {
            this.opacity = 0;
        } else if (BattleManager.getDisplayMessageType() === "Victory" && params.VictoryBackgroundImg) {
            this.opacity = 0;
        } else if (BattleManager.getDisplayMessageType() === "Defeat" && params.LoseBackgroundImg) {
            this.opacity = 0;
        } else if (BattleManager.getDisplayMessageType() === "Escape" && params.EscapeBackgroundImg) {
            this.opacity = 0;
        } else if (BattleManager.getDisplayMessageType() === "EscapeFailure" && params.EscapeFailureBackgroundImg) {
            this.opacity = 0;
        }
    }
};

function Window_BSActor() {
  this.initialize(...arguments);
}

Window_BSActor.prototype = Object.create(Window_Selectable.prototype);
Window_BSActor.prototype.constructor = Window_BSActor;

Window_BSActor.prototype.initialize = function() {
  this.windowSkin = ImageManager.loadSystem(params.ActorCommandWindowSkin);
  Window_Selectable.prototype.initialize.call(this, bsRect);
  this._actor = null;
  this._data = null;
};

Window_BSActor.prototype.setup = function(actor, data, rect) {
  this._actor = actor;
  this._data = data;
  this.move(rect);
  this.loadWindowskin();
  this.setWindowTone(data);
};

Window_BSActor.prototype.move = function() {
  const rect = bsRect;
  this.x = rect.x;
  this.y = rect.y;
  this.width = rect.width;
  this.height = rect.height;
};

Window_BSActor.prototype.loadWindowskin = function() {
  if (this._data && this._data.ActorWindowSkin) {
    this.windowskin = ImageManager.loadSystem(this._data.ActorWindowSkin);
  } else {
    Window_Selectable.prototype.loadWindowskin.call(this);
  }
};

Window_BSActor.prototype.setWindowTone = function(data) {
  if (data.ActorWindowSkin) {
    this.windowColor = data.ActorWindowColor;
  } else {
    this.windowColor = null;
  }
};

Window_BSActor.prototype.updateTone = function() {
  if (this.windowColor) {
    const tone = this.windowColor;
    this.setTone(tone.red, tone.green, tone.bule);
  } else {
    Window_Selectable.prototype.updateTone.call(this);
  }
};

Window_BSActor.prototype.updateArrows = function() {
  
};

//Sprite_Actor
function Sprite_BSFrontActor() {
  this.initialize(...arguments);
}

Sprite_BSFrontActor.prototype = Object.create(Sprite_Actor.prototype);
Sprite_BSFrontActor.prototype.constructor = Sprite_BSFrontActor;

Sprite_BSFrontActor.prototype.initialize = function(battler) {
  Sprite_Actor.prototype.initialize.call(this, battler);
};

Sprite_BSFrontActor.prototype.initMembers = function() {
    Sprite_Actor.prototype.initMembers.call(this);
    this.viewFrontActor = (!$gameSystem.isSideView() && params.ActorEffectShow);
    this.bsSprite = null;
    this._bsHomeX = 0;
    this._bsHomeY = 0;
};

Sprite_BSFrontActor.prototype.updateVisibility = function() {
  Sprite_Actor.prototype.updateVisibility .call(this);
    if (this.viewFrontActor) {
      //this.visible = true;
      this.visible = false;
    }
};

Sprite_BSFrontActor.prototype.setActorHome = function(index) {
  if (this.viewFrontActor) {
    this.actorHomeRefresh(index);
  }
};

Sprite_BSFrontActor.prototype.bsMainSprite = function() {
    return this.bsSprite;
};

Sprite_BSFrontActor.prototype.updateSelectionEffect = function() {
    const target = this.bsMainSprite();
    if (this._battler.isSelected()) {
        this._selectionEffectCount++;
        if (this._selectionEffectCount % 30 < 15) {
            target.setBlendColor([255, 255, 255, 64]);
        } else {
            target.setBlendColor([0, 0, 0, 0]);
        }
    } else if (this._selectionEffectCount > 0) {
        this._selectionEffectCount = 0;
        target.setBlendColor([0, 0, 0, 0]);
    }
};

Sprite_BSFrontActor.prototype.actorHomeRefresh = function(index) {
    const rect = statusData.itemRectWithPadding(index);
    let x = rect.x + Math.floor(rect.width / 2) + statusData.itemPadding();
    let y = rect.y + statusData.y + Math.floor(rect.height / 2);
    if (params.bsMode === "Standard") {
      x -= Math.floor(ImageManager.faceWidth / 2);
    }
    this.setHome(x + params.ActorEffect_X, y + params.ActorEffect_Y);
    this._bsHomeX = x + params.ActorEffect_X + (Graphics.boxWidth - Graphics.width) / 2;
    this._bsHomeY = y + params.ActorEffect_Y + rect.height / 2 + this.actorEffectCorrection();
};

Sprite_BSFrontActor.prototype.setBattler = function(battler) {
  Sprite_Actor.prototype.setBattler.call(this, battler);
  const index = battler ? battler.index() : -1;
  if (battler && battler === this._actor && this.viewFrontActor && $gameTemp.isBattleStyleRequested() && params.ActorEffectShow) {
    this.setActorHome(index);
  }
  if (battler) {
    this.bsSprite = BattleManager.battlerSprite[index];
  }
  $gameTemp.setBattleStyleRefresh(false);
};

Sprite_BSFrontActor.prototype.actorEffectCorrection = function() {
    switch (params.bsMode) {
        case "Standard":
            return 32
        case "Type4":
            return 0;
        default:
            return -48;
    }
};

Sprite_BSFrontActor.prototype.startMove = function(x, y, duration) {

};

Sprite_BSFrontActor.prototype.updateMotion = function() {

};

Sprite_BSFrontActor.prototype.update = function() {
  Sprite_Actor.prototype.update.call(this);
  if (this._actor) {
      this.updateFrontActor();
      this.updateBsPosition();
  }
};

Sprite_BSFrontActor.prototype.updateFrontActor = function() {
    if (this.viewFrontActor && $gameTemp.isBattleStyleRequested()) {
      this.setActorHome(this._actor.index());
    }
};

Sprite_BSFrontActor.prototype.updateBsPosition = function() {
    if (this.viewFrontActor) {
        this._homeX = this._bsHomeX + statusData.x;
        this._homeY = this._bsHomeY;
    }
};

Sprite_BSFrontActor.prototype.damageOffsetX = function() {
  return (this.viewFrontActor ? 0 : Sprite_Actor.prototype.damageOffsetX.call(this)) + params.ActorDamage_X;
};

Sprite_BSFrontActor.prototype.damageOffsetY = function() {
  return (this.viewFrontActor ? 0 : Sprite_Actor.prototype.damageOffsetY.call(this)) + params.ActorDamage_Y;
};

const _Sprite_Enemy_damageOffsetX = Sprite_Enemy.prototype.damageOffsetX;
Sprite_Enemy.prototype.damageOffsetX = function() {
  return _Sprite_Enemy_damageOffsetX.call(this) + params.EnemyDamage_X;
};

const _Sprite_Enemy_damageOffsetY = Sprite_Enemy.prototype.damageOffsetY;
Sprite_Enemy.prototype.damageOffsetY = function() {
  return _Sprite_Enemy_damageOffsetY.call(this) + params.EnemyDamage_Y;
};

const _Sprite_Enemy_startBossCollapse = Sprite_Enemy.prototype.startBossCollapse;
Sprite_Enemy.prototype.startBossCollapse = function() {
    _Sprite_Enemy_startBossCollapse.call(this);
    if (Imported.NUUN_GamePadVibration && params.BossCollapseVibration && params.BossCollapseVibrationSetting) {
        params.BossCollapseVibrationSetting.Duration = this.bitmap.height;
        NuunManager.setupGamePadVibration(params.BossCollapseVibrationSetting);
    }
};

const _Sprite_Animation_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(targets, animation, mirror, delay, previous) {
    this.setupFrontTargets(targets);
    _Sprite_Animation_setup.call(this, targets, animation, mirror, delay, previous);
};

Sprite_Animation.prototype.setupFrontTargets = function(targets) {
    if (!$gameSystem.isSideView() && params.ActorEffectShow) {
        this._frontTargets = targets.map(sprite => sprite._actor && sprite.bsSprite ? sprite.bsSprite : sprite);
    }
};

const _Sprite_Animation_updateFlash = Sprite_Animation.prototype.updateFlash;
Sprite_Animation.prototype.updateFlash = function() {
    if (!$gameSystem.isSideView() && params.ActorEffectShow) {
        const t = this._targets;
        this._targets =  this._frontTargets;
        _Sprite_Animation_updateFlash.call(this);
        this._targets = t;
        //target.hide();
    } else {
        _Sprite_Animation_updateFlash.call(this);
    }
};

const _Sprite_AnimationMV_setup = Sprite_AnimationMV.prototype.setup;
Sprite_AnimationMV.prototype.setup = function(targets, animation, mirror, delay) {
    this.setupFrontTargets(targets);
    _Sprite_AnimationMV_setup.call(this, targets, animation, mirror, delay);
};

Sprite_AnimationMV.prototype.setupFrontTargets = function(targets) {
    if (!$gameSystem.isSideView() && params.ActorEffectShow) {
        this._frontTargets = targets.map(sprite => sprite._actor && sprite.bsSprite ? sprite.bsSprite : sprite);
    }
};

const _Sprite_AnimationMV_updateFlash = Sprite_AnimationMV.prototype.updateFlash;
Sprite_AnimationMV.prototype.updateFlash = function() {
    if (!$gameSystem.isSideView() && params.ActorEffectShow ) {
        const t = this._targets;
        this._targets =  this._frontTargets;
        _Sprite_AnimationMV_updateFlash.call(this);
        this._targets = t;
    } else {
        _Sprite_AnimationMV_updateFlash.call(this);
    }
};

const _Sprite_AnimationMV_startHiding = Sprite_AnimationMV.prototype.startHiding;
Sprite_AnimationMV.prototype.startHiding = function(duration) {
    if (!$gameSystem.isSideView() && params.ActorEffectShow) {
        const t = this._targets;
        this._targets =  this._frontTargets;
        _Sprite_AnimationMV_startHiding.call(this, duration);
        this._targets = t;
    } else {
        _Sprite_AnimationMV_startHiding.call(this, duration);
    }
};

const _Sprite_AnimationMV_onEnd = Sprite_AnimationMV.prototype.onEnd;
Sprite_AnimationMV.prototype.onEnd = function() {
    if (!$gameSystem.isSideView() && params.ActorEffectShow) {
        const t = this._targets;
        this._targets =  this._frontTargets;
        _Sprite_AnimationMV_onEnd.call(this);
        this._targets = t;
    } else {
        _Sprite_AnimationMV_onEnd.call(this);
    }
};


//Sprite_ActorImges
function Sprite_ActorImges() {
  this.initialize(...arguments);
}

Sprite_ActorImges.prototype = Object.create(Sprite.prototype);
Sprite_ActorImges.prototype.constructor = Sprite_ActorImges;

Sprite_ActorImges.prototype.initialize = function() {
  Sprite.prototype.initialize.call(this);
  this.initMembers();
};

Sprite_ActorImges.prototype.initMembers = function() {
    this._battler = null;
    this._data = null;
    this._imgScenes = 'default';
    this._imgIndex = -1;
    this._selectionEffectCount = 0;
    this._shake = 0;
    this._shakePower = params.ActorShakePower;
    this._shakeSpeed = params.ActorShakeSpeed;
    this._shakeDuration = 0;
    this._shakeDirection = 1;
    this._zoomDuration = 0;
    this._zoomScale = 1;
    this._zoomScaleTarget = 1.2;
    this._updateCount = 0;
    this._imgListId = -1;
    this._durationOpacity = 0;
    this._bsBitmapWidth = 0;
    this._bsBitmapHeight = 0;
    this._startUpdate = true;
    this._zoomEffect = false;
    this._apngMode = false;
    this._loadedBitmap = null;
};

Sprite_ActorImges.prototype.setup = function(battler, data, index, stateSprite) {
    this._battler = battler;
    this._data = data;
    this.anchor.x = data.ActorImgHPosition === 'center' ? 0.5 : 0.0 ;
    this.anchor.y = data.ActorImgVPosition === 'top' ? 0.0 : 1.0;
    this._imgIndex = index;
    battler.resetBattleStyleImgId();
    this.updateActorGraphic();
    this._stateSprite = stateSprite || this._stateSprite;
    if (this._stateSprite && getStateAnimationShow()) {
        this._stateSprite.setup(battler);
        this._stateSprite.anchor.y = 0.5;
        this._stateSprite.x = this.x + this.getStateRectX() + this.getStatePositionX();
        this._stateSprite.y = this.y + this.getStateRectY() + this.getStatePositionY();
    }
    this.setBlendColor([0, 0, 0, 0]);
};

Sprite_ActorImges.prototype.setHome = function(x, y) {
    this._homeX = x;
    this._homeY = y;
    this._baseScale = this._data ? this._data.Actor_Scale / 100 : 1;
    this.move(x, y);
};

Sprite_ActorImges.prototype.resetBitmapData = function(width, height) {
    this._bsBitmapWidth = width;
    this._bsBitmapHeight = height;
    this.y = this._homeY;//画像更新時に一旦戻す。
};

Sprite_ActorImges.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._battler) {
        this.updateActorGraphic();
        this.updateMotion();
        //this.updateSelectionEffect();
    } else {
        this._stateSprite = null;
        this.bitmap = null;
    }
};

Sprite_ActorImges.prototype.refreshStateOverlay = function() {
    if (this._stateSprite && getStateAnimationShow()) {
        this._stateSprite.visible = this.visible;
        if (this._loadedBitmap && this._loadedBitmap.isReady()) {
            const scale = this._zoomScale * this._baseScale;
            this._stateSprite.x = this.x + this.getStateRectX() + this.getStatePositionX();
            const y = this.y + this.getStateRectY() + this.getStatePositionY();
            this._stateSprite.y = ((this.anchor.y === 0.5 ? (this._bsBitmapHeight / 2 * scale) : 0) + y) * scale;
        }
    }
};

Sprite_ActorImges.prototype.updateMotion = function() {
    this.refreshStateOverlay();
    this.setupEffect();
    this.updateDamage();
    this.updateZoom();
};

Sprite_ActorImges.prototype.setupEffect = function() {
    if (params.OnActorShake && this._battler.isBSDamageEffect()) {
        this._shakeDuration = params.ActorShakeFlame;
        this._battler._onDamageEffect = false;
    }
    if (params.OnActionZoom && this._battler.isBSEffectAction()) {
        this._zoomDuration = params.ActionZoomDuration;
        this._zoomEffect = true;
        this._battler._isEffectAction = false;
    }
};

Sprite_ActorImges.prototype.updateDamage = function() {
  if (this._shakeDuration > 0 || this._shake !== 0) {
    const delta = (this._shakePower * this._shakeSpeed * this._shakeDirection) / 10;
    if (this._shakeDirection <= 1 && this._shake * (this._shake + delta) < 0) {
      this._shake = 0;
    } else {
      this._shake += delta;
    }
    if (this._shake > this._shakePower * 2) {
      this._shakeDirection = -1;
    }
    if (this._shake < -this._shakePower * 2) {
      this._shakeDirection = 1;
    }
    this._shakeDuration--;
    this.x += Math.round(this._shake);
  } else if (this.x !== this._homeX) {
    this.resetDamage();
  }
};

Sprite_ActorImges.prototype.updateZoom = function() {
    if (this._loadedBitmap && this._loadedBitmap.isReady()) {
        if (this._zoomDuration > 0) {
            this.anchor.y = 0.5;
            this.anchor.x = 0.5;
            const d = this._zoomDuration;
            const t = this._zoomDuration <= params.ActionZoomDuration / 2 ? 1 : this._zoomScaleTarget;
            this._zoomScale = ((this._zoomScale * (d - 1) + t) / d);
            this._zoomDuration--;
            const scale = this._zoomScale * this._baseScale;
            this.scale.x = scale;
            this.scale.y = scale;
            if (this.x === this._homeX) {
                this.x = this._homeX + (this._data.ActorImgHPosition === 'left' ? this._bsBitmapWidth / 2 * scale : 0);
            }
            if (this.y === this._homeY) {
                this.y = this._homeY - (this._bsBitmapHeight / 2) * scale * (this._data.ActorImgVPosition === 'top' ? -1 : 1);
            }
        } else {
            if (this.scale.x !== this._baseScale) {
                this.resetZoom();
            }
            if (this._zoomEffect) {
                this._zoomEffect = false;
                this.x = this._homeX;
                this.y = this._homeY;
                this.anchor.x = this._data.ActorImgHPosition === 'left' ? 0.0 : 0.5;
                this.anchor.y = this._data.ActorImgVPosition === 'top' ? 0.0 : 1.0;
            }
        }
        if (this._apngMode) {
            const scale = this._zoomScale * this._baseScale;
            this._apngSprite.x = 0;
            this._apngSprite.y = ((this.anchor.y === 0.5 ? (this._bsBitmapHeight / 2) : 0));
        }
    }
};

Sprite_ActorImges.prototype.getStateRectX = function() {
  //const tag = 'BSStateA_X' + this._stateSprite._overlayIndex;
    return params.ActorState_X + this._data.ActorState_X;// + (Number(this._battler.actor().meta[tag]) || 0);
};

Sprite_ActorImges.prototype.getStateRectY = function() {
  //const tag = 'BSStateA_Y' + this._stateSprite._overlayIndex;console.log(tag)
    return params.ActorState_Y + this._data.ActorState_Y;// + (Number(this._battler.actor().meta[tag]) || 0);
};

Sprite_ActorImges.prototype.getStatePositionX = function() {
    return this._data.ActorImgHPosition === 'left' ? this.width / 2 : 0;
};

Sprite_ActorImges.prototype.getStatePositionY = function() {
    return this._data.ActorImgVPosition === 'under' ? this._bsBitmapHeight * -1 : 0;
};

Sprite_ActorImges.prototype.resetDamage = function() {
    this.x = this._homeX;
};

Sprite_ActorImges.prototype.resetZoom = function() {
    this.scale.x = this._baseScale;
    this.scale.y = this._baseScale;
};

Sprite_ActorImges.prototype.updateSelectionEffect = function() {
    if (!params.ActorFlash) {
        return;
    }
    const target = this;
    if (this._battler.isSelected()) {
        this._selectionEffectCount++;
        if (this._selectionEffectCount % 30 < 15) {
            target.setBlendColor([255, 255, 255, 64]);
        } else {
            target.setBlendColor([0, 0, 0, 0]);
        }
    } else if (this._selectionEffectCount > 0) {
        this._selectionEffectCount = 0;
        target.setBlendColor([0, 0, 0, 0]);
    }
};

Sprite_ActorImges.prototype.updateActorGraphic = function() {
    const actor = this._battler;
    if (actor) {
        if (actor.isDead() && !this.isDead()) {
            this.setDeadUpdateCount();
        } else if (actor.isAlive() && this.isDead()) {
            this.setReviveUpdateCount();
        } else if (actor.isAlive() && actor.getBSImgName() && this._imgListId !== actor.getBSGraphicIndex()) {
            if (actor.onImgId === 1 || actor.onImgId === 2 || actor.onImgId === 3 ||actor.onImgId === 15) {
                this._updateCount = this.setDamageDuration();
            } else if (actor.onImgId === 30) {
                this._updateCount = this.setCounterDuration();
            } else if (actor.onImgId === 20) {
                this._updateCount = Infinity;
            } else {
                this._updateCount = 1;
            }
        }
    }
    this.refreshActorGraphic(actor);
    if (this._startUpdate) {
        this._startUpdate = false;
    }
};

Sprite_ActorImges.prototype.refreshActorGraphic = function(actor) {
    if (actor && actor.getBSImgName()) {
        if (this._imgListId !== actor.getBSGraphicIndex() && this._updateCount > 0) {
            const bitmap = actor.getLoadBattleStyleImg();
            this._loadedBitmap = bitmap;
            if (bitmap && !bitmap.isReady()) {
                bitmap.addLoadListener(this.setActorGraphic.bind(this, actor, bitmap));
            } else if (bitmap) {
                this.setActorGraphic(actor, bitmap);
            }
            this._imgScenes = this.getImgScenes(actor);
            this._imgListId = actor.getBSGraphicIndex();
        }
    }
    this.updateAnimation();
    if (this._imgScenes === 'chant' && !actor.isChanting()) {
        this.resetBattleStyleImg(actor);
    } else if (actor.isBSActionBattlerImg()) {
        if (!actor.isActing() && !this.isCounterSkillAction(actor)) {
            actor.setBSActionBattlerImg(null);
            this.resetBattleStyleImg(actor);
        } else if (!this.isCounterSkillAction(actor) && this.isCounter()) {
            actor.setBSActionBattlerImg(null);
            this.resetBattleStyleImg(actor);
        }
    } else if (this._updateCount === 0) {
        this.resetBattleStyleImg(actor);
    }
};

Sprite_ActorImges.prototype.isCounter = function() {
    return this._imgScenes === 'counter' || this._imgScenes === 'reflection' || this._imgScenes === 'counterEX';
};

Sprite_ActorImges.prototype.isCounterSkillAction = function(actor) {
    return actor.isCounterSkillAction();
};

Sprite_ActorImges.prototype.resetBattleStyleImg = function(actor) {
    if (Imported.NUUN_ActorPicture && params.OnActorPictureEX) {
        actor.imgRefresh();
    }
    actor.resetBattleStyleImgId();
};

Sprite_ActorImges.prototype.setActorGraphic = function(actor, bitmap) {
    const pass = Imported.NUUN_ActorPicture && params.ActorPictureEXApp ? actor.getActorGraphicImg() : actor.getBSImgName();
    const name = pass ? pass.split('pictures/')[1] : null;
    if (name && this.addApngChild && this.loadApngSprite(name)) {
        this.addApngChild(name);
        this._apngMode = true;
        this.resetBitmapData(bitmap.width, bitmap.height);
    } else {
        this.resetApngActorImg();
        this.bitmap = bitmap;
        if (actor.faceMode) {
            this.faceRefresh(actor.getBSImgIndex());
            this.resetBitmapData(this._rectWidth, this._rectHeight);
        } else {
            this.imgFrameRefresh();
            this.resetBitmapData(bitmap.width, bitmap.height);
        }
        if (!this.isDead() && this._updateCount === 0) {
            this.opacity = actor.getBattleStyleOpacity() || 255;
            this._actorImgesOpacity = this.opacity;
        }
    }
};

Sprite_ActorImges.prototype.updateAnimation = function(){
    if (this._updateCount > 0) {
        this._updateCount--;
        if(this._durationOpacity > 0){
            this.opacity -= this.getFadeoutOpacity() / this.setDeadDuration();
            this.opacity = Math.max(this.opacity, 0);
            this._durationOpacity = this.opacity;
        } else if (this._durationOpacity < 0) {
            this.opacity += this.getFadeoutOpacity() / this.setDeadDuration();
            this.opacity = Math.min(this.opacity, this.getFadeoutOpacity());
            this._durationOpacity = this.opacity - this.getFadeoutOpacity();
        }
    }
};

Sprite_ActorImges.prototype.getFadeoutOpacity = function() {
    if (!this._actorImgesOpacity) {
        this._actorImgesOpacity = this.opacity;
    }
    return this._actorImgesOpacity;
};

Sprite_ActorImges.prototype.getImgScenes = function(actor) {
    return actor._imgScenes;
};

Sprite_ActorImges.prototype.faceRefresh = function(faceIndex) {
    const pw = ImageManager.faceWidth;
    const ph = ImageManager.faceHeight;
    const sw = Math.min(this._rectWidth, pw);
    const sh = Math.min(this._rectHeight, ph);
    const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
    const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
    this.setFrame(sx, sy, sw, sh);
    this._imgIndex = faceIndex;
};

Sprite_ActorImges.prototype.imgFrameRefresh = function() {//画像を切り替えるリセットされるため再設定
    const scale = this._data.Actor_Scale / 100;
    if (params.Img_SW > 0 || params.Img_SH > 0) {
        const oriScale = 1 / scale;
        const sw = (params.Img_SW || Infinity) * oriScale;
        const sh = (params.Img_SH || Infinity) * oriScale;
        const sx = (this._data.Img_SX || 0) * oriScale + (this._data.ActorImgHPosition === 'center' ? (this.bitmap.width - sw) / 2 : 0);
        const sy = (this._data.Img_SY || 0) * oriScale;
        this.setFrame(sx, sy, sw, sh);
    }
};

Sprite_ActorImges.prototype.setDeadUpdateCount = function() {
    if (!params.ImgDeathHide || this.isActorGraphicDead()) {
        this._updateCount = 1;
    } else {
        this._updateCount = this.setDeadDuration();
        this._durationOpacity = this.getFadeoutOpacity();
    }
    this.setActorDead(true);
};

Sprite_ActorImges.prototype.setReviveUpdateCount = function(){
    this._updateCount = this.setDeadDuration();
    this._durationOpacity = this.getFadeoutOpacity() * -1;
    this.setActorDead(false);
};

Sprite_ActorImges.prototype.isActorGraphicDead = function() {
    return this._battler.getActorGraphicDead();
};

Sprite_ActorImges.prototype.setDeadDuration = function(){
    return this._startUpdate ? 1 : 30;
};

Sprite_ActorImges.prototype.setDamageDuration = function(){
    return params.DamageImgFrame;
};

Sprite_ActorImges.prototype.setCounterDuration = function(){
    return params.CounterImgFrame;
};

Sprite_ActorImges.prototype.setActorDead = function(flag){
    this._isDead = flag;
};

Sprite_ActorImges.prototype.isDead = function(){
    return this._isDead;
};

Sprite_ActorImges.prototype.resetApngActorImg = function() {
    if (this._apngMode) {
        this.destroyApngIfNeed();
        this._apngMode = null;
    }
};

Sprite_ActorImges.prototype.destroy = function() {
    this.resetApngActorImg();
    Sprite.prototype.destroy.call(this);
};

Sprite_ActorImges.prototype.loadApngSprite = function(name) {
    return Sprite_Picture.prototype.loadApngSprite.call(this, name);
};


function Sprite_BSSprite() {
    this.initialize(...arguments);
}
  
Sprite_BSSprite.prototype = Object.create(Sprite.prototype);
Sprite_BSSprite.prototype.constructor = Sprite_BSSprite;
  
Sprite_BSSprite.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
};

Sprite_BSSprite.prototype.initMembers = function() {
    this._data = null;
    this._battler = null;
    this.hide();
};

Sprite_BSSprite.prototype.setup = function(battler, data) {
    this._data = data;
    this._battler = battler;
};

Sprite_BSSprite.prototype.update = function() {
    this.updateImg();
    Sprite.prototype.update.call(this);
};

Sprite_BSSprite.prototype.updateImg = function() {
    if (this._data && !!this._data.DetaEval1) {
        const actor = this._battler;
        if (eval(this._data.DetaEval1)) {
            if (this._hidden) {
                this.show();
            }
        } else {
            if (!this._hidden) {
                this.hide();
            }
        }
    }
};

//Sprite_BSGauge
function Sprite_BSGauge() {
  this.initialize(...arguments);
}

Sprite_BSGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_BSGauge.prototype.constructor = Sprite_BSGauge;

Sprite_BSGauge.prototype.initialize = function() {
  this._statusType = $gameTemp.bsGaugeType;
  this.userStatusParam = $gameTemp.userStatusParam;
  this._data = $gameTemp.actorData;
  this._gaugeHeight = this.getGBSGaugeHeight();
  if (!params.ActorStatusVariable) {
    this._gaugeWidth = Math.min(BattleManager.rectMaxWidth, this.getGBSGaugeWidth());
  }
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_BSGauge.prototype.setup = function(battler, statusType) {
  Sprite_Gauge.prototype.setup.call(this, battler, statusType);
  const width = BattleManager.rectMaxWidth;
  if (params.ActorStatusVariable && this.bitmapWidth() !== width) {
    this._gaugeWidth = Math.min(BattleManager.rectMaxWidth, this.getGBSGaugeWidth());
    this.redraw();
  }
};

Sprite_BSGauge.prototype.bitmapWidth = function() {
  return this._gaugeWidth ? this._gaugeWidth : this.bitmapBaseWidth();
};

Sprite_BSGauge.prototype.gaugeHeight = function() {
  return this._gaugeHeight;
};

Sprite_BSGauge.prototype.bitmapBaseWidth = function() {
  return params.ActorStatusVariable ? BattleManager.gaugeMaxWidth : Math.min(BattleManager.gaugeMaxWidth, BattleManager.rectMaxWidth);
};

Sprite_BSGauge.prototype.getGBSGaugeWidth = function() {
  switch (this._statusType) {
    case 'hp':
      return this.userStatusParam ? this.userStatusParam.Width : this._data.HPGaugeWidth;
    case 'mp':
      return this.userStatusParam ? this.userStatusParam.Width : this._data.MPGaugeWidth;
    case 'tp':
      return this.userStatusParam ? this.userStatusParam.Width : this._data.TPGaugeWidth;
    case 'time':
    case "cast":
      return this.userStatusParam ? this.userStatusParam.Width : this._data.TPBGaugeWidth;
    default:
      return this.userStatusParam ? this.userStatusParam.Width : 128;
  }
};

Sprite_BSGauge.prototype.getGBSGaugeHeight = function() {
  switch (this._statusType) {
    case 'hp':
      return this.userStatusParam ? this.userStatusParam.Height : this._data.HPGaugeHeight;
    case 'mp':
      return this.userStatusParam ? this.userStatusParam.Height : this._data.MPGaugeHeight;
    case 'tp':
      return this.userStatusParam ? this.userStatusParam.Height : this._data.TPGaugeHeight;
    case 'time':
    case "cast":
      return this.userStatusParam ? this.userStatusParam.Height : this._data.TPBGaugeHeight;
    default:
      return this.userStatusParam ? this.userStatusParam.Height : 12;
  }
};

Sprite_BSGauge.prototype.currentValue = function() {
    if (this._battler && this.userStatusParam) {
        switch (this._statusType) {
        case "hp":
        case "mp":
        case "tp":
        case "time":
        case "cast":
            return Sprite_Gauge.prototype.currentValue.call(this);
        default:
            return eval(this.userStatusParam.DetaEval1);
        }
    } else {
        return Sprite_Gauge.prototype.currentValue.call(this);
    }
};

Sprite_BSGauge.prototype.currentMaxValue = function() {
    if (this._battler && this.userStatusParam) {
        switch (this._statusType) {
        case "hp":
        case "mp":
        case "tp":
        case "time":
        case "cast":
            return Sprite_Gauge.prototype.currentMaxValue.call(this);
        default:
            return this.userStatusParam.DetaEval2 ? eval(this.userStatusParam.DetaEval2) : Sprite_Gauge.prototype.currentMaxValue.call(this);
        }
    } else {
        return Sprite_Gauge.prototype.currentMaxValue.call(this);
    }
};

Sprite_BSGauge.prototype.label = function() {
    if (this._battler && this.userStatusParam) {
        switch (this._statusType) {
        case "hp":
        case "mp":
        case "tp":
        case "time":
        case "cast":
            return Sprite_Gauge.prototype.label.call(this);
        default:
            return this.userStatusParam.ParamName;
    }
  } else {
    return Sprite_Gauge.prototype.label.call(this);
  }
};

Sprite_BSGauge.prototype.gaugeColor1 = function() {
    if (this._battler && this.userStatusParam) {
        switch (this._statusType) {
        case "hp":
        case "mp":
        case "tp":
        case "time":
        case "cast":
            return Sprite_Gauge.prototype.gaugeColor1.call(this);
        default:
            return NuunManager.getColorCode(this.userStatusParam.Color1);
        }
    } else {
        return Sprite_Gauge.prototype.gaugeColor1.call(this);
    }
};

Sprite_BSGauge.prototype.gaugeColor2 = function() {
    if (this._battler && this.userStatusParam) {
        switch (this._statusType) {
        case "hp":
        case "mp":
        case "tp":
        case "time":
        case "cast":
            return Sprite_Gauge.prototype.gaugeColor2.call(this);
        default:
            return NuunManager.getColorCode(this.userStatusParam.Color2);
        }
    } else {
        return Sprite_Gauge.prototype.gaugeColor2.call(this);
    }
};

//Sprite_NuunUserParam
function Sprite_NuunUserParam() {
  this.initialize(...arguments);
}

Sprite_NuunUserParam.prototype = Object.create(Sprite.prototype);
Sprite_NuunUserParam.prototype.constructor = Sprite_NuunUserParam;

Sprite_NuunUserParam.prototype.initialize = function() {
  Sprite.prototype.initialize.call(this);
  this.initMembers();
  this.createBitmap();
};

Sprite_NuunUserParam.prototype.initMembers = function() {
  this._battler = null;
  this._textColor = "";
  this.userStatusParam = $gameTemp.userStatusParam;
  this._gaugeWidth = this.userStatusParam.Width;
  this._gaugeHeight = this.userStatusParam.Height;
};

Sprite_NuunUserParam.prototype.setup = function(battler) {
  this._battler = battler;
  this._paramData = null;
  this.updateBitmap();
};

Sprite_NuunUserParam.prototype.destroy = function(options) {
  this.bitmap.destroy();
  Sprite.prototype.destroy.call(this, options);
};

Sprite_NuunUserParam.prototype.update = function() {
  Sprite.prototype.update.call(this);
  this.updateBitmap();
};


Sprite_NuunUserParam.prototype.createBitmap = function() {
  const width = this.bitmapWidth();
  const height = this.bitmapHeight();
  this.bitmap = new Bitmap(width, height);
};

Sprite_NuunUserParam.prototype.bitmapWidth = function() {
  return this._gaugeWidth;
};

Sprite_NuunUserParam.prototype.bitmapHeight = function() {
  return this._gaugeHeight;
};

Sprite_NuunUserParam.prototype.updateBitmap = function() {
  const _param = eval(this.userStatusParam.DetaEval1);
  if (this._paramData !== _param) {
    this._paramData = _param;
    this.redraw();
  }
};

Sprite_NuunUserParam.prototype.redraw = function() {
  const paramName = this.userStatusParam.ParamName ? this.userStatusParam.ParamName : '';
  const width = this.bitmapWidth();
  const height = this.bitmapHeight();
  this.setupFont();
  this.bitmap.clear();
  this.bitmap.textColor = ColorManager.systemColor();
  const textWidth = Math.max(60 , this.bitmap.measureTextWidth(paramName));
  this.bitmap.drawText(paramName, 0, 0, width - textWidth, height);
  this.bitmap.textColor = ColorManager.normalColor();
  this.bitmap.drawText(this._paramData, textWidth + 8, 0, width - (textWidth + 8), height, 'right');
};

Sprite_NuunUserParam.prototype.fontSize = function() {
  return $gameSystem.mainFontSize() +  (this.userStatusParam.FontSize || 0);
};

Sprite_NuunUserParam.prototype.setupFont = function() {
  this.bitmap.fontSize = this.fontSize();
};


function Sprite_BSName() {
  this.initialize(...arguments);
}

Sprite_BSName.prototype = Object.create(Sprite_Name.prototype);
Sprite_BSName.prototype.constructor = Sprite_BSName;

Sprite_BSName.prototype.initialize = function() {
  this.userStatusParam = $gameTemp.userStatusParam;
  this._nameHeight = this.userStatusParam.Height > 24 ? this.userStatusParam.Height : 24;
  if (!params.ActorStatusVariable) {
    this._nameWidth = Math.min(BattleManager.rectMaxWidth, this.getGBSNameWidth());
  }
  Sprite_Name.prototype.initialize.call(this);
};

Sprite_BSName.prototype.setup = function(battler) {
  Sprite_Name.prototype.setup.call(this, battler);
  const width = BattleManager.rectMaxWidth;
  if (params.ActorStatusVariable && this.bitmapWidth() !== width) {
    this._nameWidth = Math.min(BattleManager.rectMaxWidth, this.getGBSNameWidth());
    this.redraw();
  }
};

Sprite_BSName.prototype.bitmapWidth = function() {
  return this._nameWidth ? this._nameWidth : this.bitmapBaseWidth();
};

Sprite_BSName.prototype.bitmapHeight = function() {
  return this._nameHeight;
};

Sprite_BSName.prototype.bitmapBaseWidth = function() {
  return params.ActorStatusVariable ? BattleManager.gaugeMaxWidth : Math.min(BattleManager.gaugeMaxWidth, BattleManager.rectMaxWidth);
};

Sprite_BSName.prototype.getGBSNameWidth = function() {
  return this.userStatusParam ? this.userStatusParam.Width : 128;
};

Sprite_BSName.prototype.fontSize = function() {
  return $gameSystem.mainFontSize() +  (this.userStatusParam.FontSize || 0);
};

Sprite_BSName.prototype.fontFace = function() {
    if (this.userStatusParam && this.userStatusParam.FontFace) {
        return this.userStatusParam.FontFace;
    } else if (params.ActorNameFont) {
        return params.ActorNameFont;
    } else {
        return Sprite_Name.prototype.fontFace.call(this);
    }
};

Sprite_BSName.prototype.redraw = function() {
    const name = this.name();
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this.setupFont();
    this.bitmap.clear();
    this.bitmap.drawText(name, 0, 0, width, height, (this.userStatusParam.NamePosition || 'left'));
};


const _Sprite_StateIcon_initMembers = Sprite_StateIcon.prototype.initMembers;
Sprite_StateIcon.prototype.initMembers = function() {
  _Sprite_StateIcon_initMembers.call(this);
  this._visibleStateIcons = [];
};

Sprite_StateIcon.prototype.setupVisibleIcons = function(list1, list2) {
  this._visibleStateIcons = [];
  this._visibleStateIcons = list1.filter(stateId => stateId > 0 && $dataStates[stateId].iconIndex > 0).map(stateId => $dataStates[stateId].iconIndex);
  Array.prototype.push.apply(this._visibleStateIcons , BattleManager.getVisibleBuffIcons(list2));
};

const _Sprite_StateIcon_shouldDisplay = Sprite_StateIcon.prototype.shouldDisplay;
Sprite_StateIcon.prototype.shouldDisplay = function() {
  const result = _Sprite_StateIcon_shouldDisplay.call(this);
  if (result && this._battler && this._battler.isActor()) {
    BattleManager.visibleStateIcons = this._visibleStateIcons;
  }
  return result
};


function Sprite_BSStateIcon() {
  this.initialize(...arguments);
}

Sprite_BSStateIcon.prototype = Object.create(Sprite_StateIcon.prototype);
Sprite_BSStateIcon.prototype.constructor = Sprite_BSStateIcon;

Sprite_BSStateIcon.prototype.initialize = function() {
  Sprite_StateIcon.prototype.initialize.call(this);
};

Sprite_BSStateIcon.prototype.updateFrame = function() {
  this._index = this._battler && this._battler.isActor() && params.NoneStateIcon > 0 ? params.NoneStateIcon : this._index;
  Sprite_StateIcon.prototype.updateFrame.call(this);
};

Sprite_BSStateIcon.prototype.updateIcon = function() {
  Sprite_StateIcon.prototype.updateIcon.call(this);
  if (this._battler && this._battler.isActor() && params.NoStateIcon > 0 && this._iconIndex === 0) {
    this._iconIndex = params.NoStateIcon;
  }
};

Sprite_BSStateIcon.prototype.setFrameIcon = function(sprite) {
  sprite._iconIndex = this._battler && this._battler.isActor() && params.NoneStateIcon > 0 ? params.NoneStateIcon : sprite._iconIndex;
  Sprite_StateIcon.prototype.setFrameIcon.call(this, sprite);
};


function Sprite_BSActorStateIcon() {
  this.initialize(...arguments);
}

Sprite_BSActorStateIcon.prototype = Object.create(Sprite_StateIcon.prototype);
Sprite_BSActorStateIcon.prototype.constructor = Sprite_BSActorStateIcon;

Sprite_BSActorStateIcon.prototype.initialize = function() {
  Sprite.prototype.initialize.call(this);
  this.initMembers();
  this.createBitmap();
  this.loadBitmap();
};

Sprite_BSActorStateIcon.prototype.initMembers = function() {
  //this.userStatusParam = $gameTemp.userStatusParam;
  this._battler = null;
  this._animationCount = 0;
  this.anchor.x = 0;
  this.anchor.y = 0;
  this._visibleIcons = [];
};

Sprite_BSActorStateIcon.prototype.bitmapWidth = function() {
  return this._iconWidth ? this._iconWidth : BattleManager.gaugeMaxWidth;
};

Sprite_BSActorStateIcon.prototype.bitmapHeight = function() {
  return 36;
};

Sprite_BSActorStateIcon.prototype.createBitmap = function() {
  const width = this.bitmapWidth();
  const height = this.bitmapHeight();
  this.bitmap = new Bitmap(width, height);
};

Sprite_BSActorStateIcon.prototype.loadBitmap = function() {
  this.iconBitmap = ImageManager.loadSystem("IconSet");
};

Sprite_BSActorStateIcon.prototype.setupVisibleIcons = function(list1, list2) {
  this._visibleIcons = [];
  this._visibleIcons = list1.filter(stateId => stateId > 0 && $dataStates[stateId].iconIndex > 0).map(stateId => $dataStates[stateId].iconIndex);
  Array.prototype.push.apply(this._visibleIcons , BattleManager.getVisibleBuffIcons(list2));
};

Sprite_BSActorStateIcon.prototype.setup = function(battler, data) {
  if (this._battler !== battler) {
      this._battler = battler;
      this._animationCount = this.updateWait();
  }
  const width = BattleManager.rectMaxWidth;
  if (this._iconWidth !== width) {
    this._iconWidth = width;
    this.updateIcon();
  }
};

Sprite_BSActorStateIcon.prototype.update = function() {
  Sprite.prototype.update.call(this);
  this._animationCount++;
  if (this._animationCount >= this.updateWait()) {
      this.updateIcon();
      this._animationCount = 0;
  }
};

Sprite_BSActorStateIcon.prototype.updateWait = function() {
  return 1;
};

Sprite_BSActorStateIcon.prototype.updateIcon = function() {
  this.bitmap.clear();
  let icons = [];
  const iconWidth = ImageManager.iconWidth;
  const actor = this._battler;
  if (this.shouldDisplay()) {
      if (this._visibleIcons.length > 0) {
        icons = actor.stateIcons().filter(icon => this._visibleIcons.some(i => i === icon)).slice(0, Math.floor(this.bitmapWidth() / iconWidth));
      } else {
        icons = actor.stateIcons().slice(0, Math.floor(this.bitmapWidth() / iconWidth));
      }
  }
  if (icons.length > 0) {
    let iconX = 0;
    const y = 0;
    for (const icon of icons) {
        this.drawIcon(icon, iconX, y);
        iconX += iconWidth;
    }
  }
};

Sprite_BSActorStateIcon.prototype.drawIcon = function(iconIndex, x, y) {
  const bitmap = ImageManager.loadSystem("IconSet");
  const pw = ImageManager.iconWidth;
  const ph = ImageManager.iconHeight;
  const sx = (iconIndex % 16) * pw;
  const sy = Math.floor(iconIndex / 16) * ph;
  this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
};


//Spriteset_Base 
const _Spriteset_Base_animationShouldMirror = Spriteset_Base.prototype.animationShouldMirror;
Spriteset_Base.prototype.animationShouldMirror = function(target) {
    return params.ActorsMirror ? _Spriteset_Base_animationShouldMirror.call(this, target) : false;
};


//Spriteset_Battle
const _Spriteset_Battle_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
    _Spriteset_Battle_initialize.call(this);
    this.createStatusLayer();
};

const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _Spriteset_Battle_createLowerLayer.call(this);
    if (params.BattleShowWeather === "Show") {
        this.createWeather(this);//天候
    }
};

const _Spriteset_Battle_findTargetSprite = Spriteset_Battle.prototype.findTargetSprite;
Spriteset_Battle.prototype.findTargetSprite = function(target) {
  const targetSprite = _Spriteset_Battle_findTargetSprite.call(this, target);
  this._effectsContainer = this.animationTarget(targetSprite) ? this._effectsFrontContainer : this._effectsBackContainer;
  return targetSprite;
};

Spriteset_Battle.prototype.animationTarget = function(targetSprites){
  if(!$gameSystem.isSideView() && params.ActorEffectShow && targetSprites && targetSprites.viewFrontActor) {
    return !!targetSprites._battler.isActor();
  }
  return false;
};

Spriteset_Battle.prototype.createStatusLayer = function() {
    this.createBattleHud();//ベーススプライト
    this.createHudBack();//ウィンドウ、アクターグラフィック
    this.createEffects();//アニメーション
    if (params.BattleShowWeather === "ShowFront") {
        this.createWeather(this._battleHudBase);//天候
    }
    this.createHudStatus();//ステータス
    this.createFrontActors();
};

Spriteset_Battle.prototype.createBattleHud = function() {
    const sprite = new Sprite();
    this.addChild(sprite);
    this._battleHudBase = sprite;
};

const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
  _Spriteset_Battle_update.call(this);
  this.updateEffects();
  if (params.BattleShowWeather !== "None" && isBattleWeather()) {
    this.updateWeather();
  }
};

Spriteset_Battle.prototype.createHudBack = function() {
    const sprite = new Sprite();
    this._battleHudBase.addChild(sprite);
    this._battleHudBack = sprite;
};

Spriteset_Battle.prototype.createHudStatus = function() {
    const sprite = new Sprite();
    this._battleHudBase.addChild(sprite);
    this._battleHudFront = sprite;
};

Spriteset_Battle.prototype.createEffects = function() {
    const sprite = this.setBattleBase();
    this._battleHudBase.addChild(sprite);
    this._battleEffects = sprite;
    this._effectsFrontContainer = sprite;
};

Spriteset_Battle.prototype.createDamege = function() {
  const sprite = this.setBattleBase();
  this._battleHudBase.addChild(sprite);
  this._battleDamege = sprite;
};

Spriteset_Battle.prototype.updateEffects = function() {   
  //this._battleDamege.x = this._battleEffects.x;
  //this._battleDamege.y = this._battleEffects.y;
};

Spriteset_Battle.prototype.setBattleBase = function() {
    const width = (params.ActorStatusWindow_Width > 0 ? params.ActorStatusWindow_Width : Graphics.boxWidth);
    const height = Graphics.boxHeight;
    const x = (params.ActorStatusWindowCenter ? getActorWindowCenter() : 0) + params.ActorStatusWindow_X;
    const y = 0;
    const sprite = new Sprite();
    sprite.setFrame(0, 0, width, height);
    sprite.x = x;
    sprite.y = y - this.battleFieldOffsetY();
    sprite.home_x = x;
    return sprite;
};

Spriteset_Battle.prototype.createFrontActors = function() {
  this.createDamege();
    if (!$gameSystem.isSideView() && params.ActorEffectShow) {
      this._actorSprites = [];
      for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
        const sprite = new Sprite_BSFrontActor();
        this._actorSprites.push(sprite);
        this._battleDamege.addChild(sprite);
      }
    }
};

const _Spriteset_Battle_createBattleField = Spriteset_Battle.prototype.createBattleField;
Spriteset_Battle.prototype.createBattleField = function() {
  _Spriteset_Battle_createBattleField.call(this);
  this._effectsBackContainer = this._battleField;
};

if (params.BattleShowWeather !== "None") {
    Spriteset_Battle.prototype.createWeather = function(sprite) {
        this._weather = new Weather();
        sprite.addChild(this._weather);
    };
    
    Spriteset_Battle.prototype.updateWeather = function() {    
        this._weather.type = $gameScreen.weatherType();
        this._weather.power = $gameScreen.weatherPower();
    };
}

const _Game_Interpreter_command236 = Game_Interpreter.prototype.command236;
Game_Interpreter.prototype.command236 = function(c_params) {
    if ($gameParty.inBattle() && params.BattleShowWeather !== "None" && isBattleWeather()) {
        $gameScreen.changeWeather(c_params[0], c_params[1], c_params[2]);
        if (c_params[3]) {
            this.wait(c_params[2]);
        }
    }
    return _Game_Interpreter_command236.call(this, c_params);
};

function conditionsParam(data, param, maxParam) {
  return (param >= maxParam * data.DwLimit / 100 && (data.UpLimit > 0 ? (param <= maxParam * data.UpLimit / 100) : true));
};

function isBattleWeather() {
    return params.BattleWeatherSwitch > 0 ? $gameSwitches.value(params.BattleWeatherSwitch) : true;
};

})();