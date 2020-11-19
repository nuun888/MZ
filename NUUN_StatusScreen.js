/*:-----------------------------------------------------------------------------------
 * NUUN_StatusScreen.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11/16 Ver 1.0.0
 * 2020/11/17 Ver 1.0.1 
 *  追加能力値、特殊能力値、属性有効度、ステート有効度の表示できる小数点の桁数を指定できる機能を追加。
 *  ページの切り替えをタッチ操作でも行えるように対応。
 * 2020/11/18 Ver 1.0.2
 *  表示外の少数点を四捨五入か切り捨てで丸める機能を追加。
 * 2020/11/18 Ver 1.0.3
 *  ステータス詳細項目が画面からはみ出た際、項目名が正常に表示されない問題を修正。
 *  一部処理を変更。
 * 2020/11/19 Ver 1.0.4
 *  解像度とUIのサイズが違う場合に、ステータス詳細項目がウィンドウ外にずれる問題や、他のステータス項目と
 *  表示が被る問題を修正。
 */ 
/*:ja
 * @target MZ
 * @plugindesc ステータス画面詳細表示
 * @author NUUN
 * 
 * @help
 * ステータス画面のレイアウトを変更します。
 * キーボード操作
 * QWキー　キャラ切り替え
 * ←→キー　ページ切り替え
 * 
 * タッチ操作
 * <>ボタン　キャラ切り替え
 * ΛVボタン　ページ切り替え
 * 
 * １ページ目　基本能力値　装備
 * ２ページ目　追加能力値　特殊能力値、追加能力値、特殊能力値の表示がない場合）属性有効度　ステート有効度
 * ３ページ目　属性有効度　ステート有効度
 * 
 * 追加能力値、特殊能力値、属性有効度、ステート有効度のいずれかの表示をしない場合は、
 * プラグインパラメータの表示しない項目のリストを空白にしてください。（[]ではなく空白）
 * 追加能力値、特殊能力値または属性有効度、ステート有効度のリストを同時に空白にした場合は、
 * そのページが表示されなくなります。
 * 追加能力値、特殊能力値、属性有効度、ステート有効度をすべてリストを空白にした場合は、
 * 最初のページのみの表示となります。
 * いずれもパラメータに[]が記入されていてもその項目が表示されてしまいます。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * @param ContentWidth
 * @text 項目の表示横幅
 * @desc ページ内の項目の表示横幅。(0で自動調整)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param Decimal
 * @text 小数点桁数
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 2
 * @min 0
 * 
 * @param DecimalMode
 * @text 端数処理
 * @desc 表示外小数点を四捨五入で丸める。（falseで切り捨て）
 * @type boolean
 * @default true
 * 
 * @param ParamName
 * @text 能力値の名称
 * @desc 能力値の名称を設定します。
 * @type string
 * @default 能力値
 * 
 * @param EquipsName
 * @text 装備の名称
 * @desc 装備の名称を設定します。
 * @type string
 * @default 装備
 * 
 * @param XParamName
 * @text 追加能力値の名称
 * @desc 追加能力値の名称を設定します。
 * @type string
 * @default 追加能力値
 * 
 * @param SParamName
 * @text 特殊能力値の名称
 * @desc 特殊能力値の名称を設定します。
 * @type string
 * @default 特殊能力値
 * 
 * @param ElementName
 * @text 属性有効度の名称
 * @desc 属性有効度の名称を設定します。
 * @type string
 * @default 属性有効度
 * 
 * @param StateName
 * @text ステート有効度の名称
 * @desc ステート有効度の名称を設定します。
 * @type string
 * @default ステート有効度
 * 
 * @param GaugeWidth
 * @text ゲージ横幅
 * @desc HP,MP,TPゲージの横幅を指定します。
 * @type number
 * @default 200
 * @min 0
 * 
 * @param ActorsImgList
 * @text 画像設定
 * @desc アクターの画像設定
 * @default []
 * @type struct<actorImgList>[]
 * 
 * @param Xparam
 * @type struct<XparamData>[]
 * @text 追加能力値
 * @default ["{\"XparamName\":\"\",\"XparamId\":\"0\"}","{\"XparamName\":\"\",\"XparamId\":\"1\"}","{\"XparamName\":\"\",\"XparamId\":\"2\"}","{\"XparamName\":\"\",\"XparamId\":\"3\"}","{\"XparamName\":\"\",\"XparamId\":\"4\"}","{\"XparamName\":\"\",\"XparamId\":\"5\"}","{\"XparamName\":\"\",\"XparamId\":\"6\"}","{\"XparamName\":\"\",\"XparamId\":\"7\"}","{\"XparamName\":\"\",\"XparamId\":\"8\"}","{\"XparamName\":\"\",\"XparamId\":\"9\"}"]
 * 
 * @param Sparam
 * @type struct<SparamData>[]
 * @text 特殊能力値
 * @default ["{\"SparamName\":\"\",\"SparamId\":\"0\"}","{\"SparamName\":\"\",\"SparamId\":\"1\"}","{\"SparamName\":\"\",\"SparamId\":\"2\"}","{\"SparamName\":\"\",\"SparamId\":\"3\"}","{\"SparamName\":\"\",\"SparamId\":\"4\"}","{\"SparamName\":\"\",\"SparamId\":\"5\"}","{\"SparamName\":\"\",\"SparamId\":\"6\"}","{\"SparamName\":\"\",\"SparamId\":\"7\"}","{\"SparamName\":\"\",\"SparamId\":\"8\"}","{\"SparamName\":\"\",\"SparamId\":\"9\"}"]
 * 
 * @param ElementResist
 * @type struct<ElementData>[]
 * @text 属性耐性
 * @default ["{\"ElementNo\":\"1\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"2\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"3\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"4\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"5\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"6\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"7\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"8\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"9\",\"ElementIconId\":\"\"}"]
 * 
 * @param StateResist
 * @type struct<StateData>[]
 * @text 状態耐性
 * @default ["{\"StateNo\":\"4\"}","{\"StateNo\":\"5\"}","{\"StateNo\":\"6\"}","{\"StateNo\":\"7\"}","{\"StateNo\":\"8\"}","{\"StateNo\":\"9\"}","{\"StateNo\":\"10\"}","{\"StateNo\":\"12\"}","{\"StateNo\":\"13\"}"]
 * 
 */
/*~struct~actorImgList:
 * 
 * @param actorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * 
 * @param ActorImg
 * @text アクター画像
 * @desc アクターの画像を表示します。
 * @type file
 * @dir img/pictures
 * 
 * @param Actor_X
 * @desc 画像の表示位置X座標。
 * @text 画像表示位置X座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param Actor_Y
 * @desc 画像の表示位置Y座標。
 * @text 画像表示位置Y座標
 * @type number
 * @default 0
 * @min -9999
 * 
 *  
 */
/*~struct~XparamData:
 *
 * @param XparamName
 * @desc 追加能力値の用語です。
 * @type string
 *
 * @param XparamId
 * @desc 0:命中 1:回避 2:会心 3:会心回避 4:魔法回避 5:魔法反射 6:反撃 7:HP再生 8:MP再生 9:TP再生
 * @type number
 */
/*~struct~SparamData:
 *
 * @param SparamName
 * @desc 追加能力値の用語です。
 * @type string
 *
 * @param SparamId
 * @desc 0:狙われ 1:防御効果 2:回復効果 3:薬知識 4:MP消費 5:TPチャージ 6:物理ダメージ 7:魔法ダメージ 8:床ダメージ 9:経験獲得
 * @type number
 */
/*~struct~ElementData:
 *
 * @param ElementNo
 * @desc 表示する属性番号です。
 * @type number
 *
 * @param ElementIconId
 * @desc アイコンのIDを指定します。
 * @type number
 */
/*~struct~StateData:
 *
 * @param StateNo
 * @desc 表示するステートです。
 * @type state
 *
 */

var Imported = Imported || {};
Imported.NUUN_StatusScreen = true;

(() => {
const parameters = PluginManager.parameters('NUUN_StatusScreen');
const param = JSON.parse(JSON.stringify(parameters, function(key, value) {
  try {
      return JSON.parse(value);
  } catch (e) {
      try {
          return eval(value);
      } catch (e) {
          return value;
      }
  }
}));
const XparamData = param.Xparam ? true : false;
const SparamData = param.Sparam ? true : false;
const ElementResistData = param.ElementResist ? true : false;
const StateResistData = param.StateResist ? true : false;
const pages = 1 + (XparamData || SparamData ? 1 : 0) + (ElementResistData || StateResistData ? 1 : 0);

const _Scene_Status_initialize = Scene_Status.prototype.initialize;
Scene_Status.prototype.initialize = function() {
  _Scene_Status_initialize.call(this);
  this._pageMode = 0;
};

const _Scene_Status_create = Scene_Status.prototype.create;
Scene_Status.prototype.create = function() {
  _Scene_Status_create.call(this)
  this.createStatusXParamsWindow();
  this.createStatusSParamsWindow();
  this.createStatusElementWindow();
  this.createStatusStateWindow();
  this.createStatusButton();
};

const _Scene_Status_createStatusWindow = Scene_Status.prototype.createStatusWindow;
Scene_Status.prototype.createStatusWindow = function() {
  _Scene_Status_createStatusWindow.call(this);
  this._statusWindow.setContentY = this.statusHeight();
  this._statusWindow.setContentEquipWidth = this.statusParamsWidth();
  this._statusWindow.setSParamsWidth = this.statusXParamsWidth();
  this._statusWindow.setStateWidthWidth = this.statusElementWidth();
};

Scene_Status.prototype.createProfileWindow = function() {
  const rect = this.profileWindowRect();
  this._profileWindow = new Window_Help(rect);
  this.addChild(this._profileWindow);
  this._profileWindow.opacity = 0;
  this._profileWindow.frameVisible = false;
};

Scene_Status.prototype.createStatusParamsWindow = function() {
  const rect = this.statusParamsWindowRect();
  this._statusParamsWindow = new Window_StatusParams(rect);
  this.addChild(this._statusParamsWindow);
};

Scene_Status.prototype.createStatusEquipWindow = function() {
  const rect = this.statusEquipWindowRect();
  this._statusEquipWindow = new Window_StatusEquip(rect);
  this.addChild(this._statusEquipWindow);
};

Scene_Status.prototype.createStatusXParamsWindow = function() {
  const rect = this.statusXParamsWindowRect();
  this._statusXParamsWindow = new Window_StatusXParams(rect);
  this.addChild(this._statusXParamsWindow);
};

Scene_Status.prototype.createStatusSParamsWindow = function() {
  const rect = this.statusSParamsWindowRect();
  this._statusSParamsWindow = new Window_StatusSParams(rect);
  this.addChild(this._statusSParamsWindow);
};

Scene_Status.prototype.createStatusElementWindow = function() {
  const rect = this.statusElementWindowRect();
  this._statusElementWindow = new Window_StatusElement(rect);
  this.addChild(this._statusElementWindow);
};

Scene_Status.prototype.createStatusStateWindow = function() {
  const rect = this.statusStateWindowRect();
  this._statusStateWindow = new Window_StatusState(rect);
  this.addChild(this._statusStateWindow);
};

Scene_Status.prototype.profileWindowRect = function() {
  const ww = Graphics.boxWidth;
  const wh = this.profileHeight();
  const wx = (Graphics.width - Graphics.boxWidth) / 2;
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + this.mainAreaBottom() - wh + 4;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.statusWindowRect = function() {
  const wx = 0;
  const wy = this.mainAreaTop();
  const ww = Graphics.boxWidth;
  const wh = Graphics.boxHeight - wy;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.statusParamsWindowRect = function() {
  const ww = this.statusParamsWidth();
  const wh = this.statusParamsHeight();
  const wx = (Graphics.width - Graphics.boxWidth) / 2;
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + this.mainAreaTop() + this.statusHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.statusXParamsWindowRect = function() {
  const ww = this.statusXParamsWidth();
  const wh = this.statusXParamsHeight();
  const wx = (Graphics.width - Graphics.boxWidth) / 2;
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + this.mainAreaTop() + this.statusHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.statusSParamsWindowRect = function() {
  const ww = this.statusSParamsWidth();
  const wh = this.statusSParamsHeight();
  const wx = (Graphics.width - Graphics.boxWidth) / 2 + this.statusXParamsWidth();
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + this.mainAreaTop() + this.statusHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.statusEquipWindowRect = function() {
  const ww = this.statusContenWidth() - this.statusParamsWidth();
  const wh = this.statusParamsHeight();
  const wx = (Graphics.width - Graphics.boxWidth) / 2 + this.statusParamsWidth();
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + this.mainAreaTop() + this.statusHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.statusElementWindowRect = function() {
  const ww = this.statusElementWidth();
  const wh = this.statusElementHeight();
  const wx = (Graphics.width - Graphics.boxWidth) / 2;
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + this.mainAreaTop() + this.statusHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.statusStateWindowRect = function() {
  const ww = this.statusStateWidth();
  const wh = this.statusStateHeight();
  const wx = (Graphics.width - Graphics.boxWidth) / 2 + this.statusElementWidth();
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + this.mainAreaTop() + this.statusHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.statusContenWidth = function() {
  return param.ContentWidth === 0 ? Graphics.boxWidth : param.ContentWidth;
};

Scene_Status.prototype.statusParamsWidth = function() {
  return Math.max(this.statusContenWidth() / 3, 300);
};

Scene_Status.prototype.statusXParamsWidth = function() {
  return XparamData ? this.statusContenWidth() / 2 : 0;
};

Scene_Status.prototype.statusSParamsWidth = function() {
  return SparamData ? this.statusContenWidth() / 2 : 0;
};

Scene_Status.prototype.statusElementWidth = function() {
  return ElementResistData ? this.statusContenWidth() / 2 : 0;
};

Scene_Status.prototype.statusStateWidth = function() {
  return StateResistData ? this.statusContenWidth() / 2 : 0;
};

Scene_Status.prototype.statusXParamsHeight = function() {
  return XparamData ? this.statusParamsHeight() : 0;
};

Scene_Status.prototype.statusSParamsHeight = function() {
  return SparamData ? this.statusParamsHeight() : 0;
};

Scene_Status.prototype.statusElementHeight = function() {
  return ElementResistData ?  this.statusParamsHeight() : 0;
};

Scene_Status.prototype.statusStateHeight = function() {
  return StateResistData ? this.statusParamsHeight() : 0;
};

Scene_Status.prototype.statusParamsHeight = function() {
  const height = Graphics.boxHeight - (this.mainAreaTop() + this.statusHeight() + this.profileHeight());
  const row = Math.floor(height / 36);
  return this.calcWindowHeight(row, false);
};

Scene_Status.prototype.statusHeight = function() {
  const row = Math.floor((Graphics.boxHeight - this.mainAreaTop() - 564) / 60);
  return this.calcWindowHeight(6 + row, false) + 4;
};

Scene_Status.prototype.createStatusButton = function() {
  if(pages > 1 && ConfigManager.touchUI) {
    this._modeupButton = new Sprite_Button("up");
    this._modeupButton.x = 24 + this._pageupButton.width + this._pagedownButton.width;
    this._modeupButton.y = this.buttonY();
    const modeupRight = this._modeupButton.x + this._modeupButton.width;
    this._modedownButton = new Sprite_Button("down");
    this._modedownButton.x = modeupRight + 4;
    this._modedownButton.y = this.buttonY();
    this.addWindow(this._modeupButton);
    this.addWindow(this._modedownButton);
    this._modeupButton.setClickHandler(this.updateContentsPageup.bind(this));
    this._modedownButton.setClickHandler(this.updateContentsPagedown.bind(this));
  }
};

const _Scene_Status_refreshActor = Scene_Status.prototype.refreshActor;
Scene_Status.prototype.refreshActor = function() {
  _Scene_Status_refreshActor.call(this);
  const actor = this.actor();
  this._statusXParamsWindow.setActor(actor);
  this._statusSParamsWindow.setActor(actor);
  this._statusElementWindow.setActor(actor);
  this._statusStateWindow.setActor(actor);
  this.updatepage();
};

const _Scene_Status_update = Scene_Status.prototype.update;
Scene_Status.prototype.update = function() {
	_Scene_Status_update.call(this);
	if (Input.isTriggered('left') && this.maxPage() > 1) {
		this.updateContentsPageup();
	} else if (Input.isTriggered('right') && this.maxPage() > 1){
		this.updateContentsPagedown();
  }
};

Scene_Status.prototype.maxPage = function() {
  return pages;
};

Scene_Status.prototype.updateContentsPagedown = function() {
	const maxPage = this.maxPage();
  this._pageMode = (this._pageMode + 1) % maxPage;
  SoundManager.playCursor();
  this.updatepage();
};

Scene_Status.prototype.updateContentsPageup = function() {
	const maxPage = this.maxPage();
  this._pageMode = (this._pageMode + (maxPage - 1)) % maxPage;
  SoundManager.playCursor();
  this.updatepage();
};

Scene_Status.prototype.updatepage = function() {
  if(this._pageMode === 0) {
    this.openFirstPage();
  } else if (this._pageMode === 1) {
    if (XparamData || SparamData) {
      this.openAbilityScorePage();
    } else {
      this.openValidityPage();
    }
  } else if (this._pageMode === 2) {
    this.openValidityPage();
  }
  this._statusWindow.contents.clear();
  this._statusWindow.refresh();
  this.drawContentNameBlock();
};

Scene_Status.prototype.openFirstPage = function() {
  this._statusParamsWindow.show();
  this._statusEquipWindow.show();
  this._statusXParamsWindow.hide();
  this._statusSParamsWindow.hide();
  this._statusElementWindow.hide();
  this._statusStateWindow.hide();
};

Scene_Status.prototype.openAbilityScorePage = function() {
  this._statusParamsWindow.hide();
  this._statusEquipWindow.hide();
  XparamData ? this._statusXParamsWindow.show() : this.noShow();
  SparamData ? this._statusSParamsWindow.show() : this.noShow();
  this._statusElementWindow.hide();
  this._statusStateWindow.hide();
  this._ParamsWindowShow = true;
};

Scene_Status.prototype.openValidityPage = function() {
  this._statusParamsWindow.hide();
  this._statusEquipWindow.hide();
  this._statusXParamsWindow.hide();
  this._statusSParamsWindow.hide();
  ElementResistData ? this._statusElementWindow.show() : this.noShow();
  StateResistData ? this._statusStateWindow.show() : this.noShow();
};

Scene_Status.prototype.drawContentNameBlock = function() {
  if (this._statusParamsWindow.visible) {
    this._statusWindow.paramName();
  }
  if (this._statusEquipWindow.visible) {
    this._statusWindow.EquipsName();
  }
  if (this._statusXParamsWindow.visible) {
    this._statusWindow.XparamName();
  }
  if (this._statusSParamsWindow.visible) {
    this._statusWindow.SparamName();
  }
  if (this._statusElementWindow.visible) {
    this._statusWindow.ElementName();
  }
  if (this._statusStateWindow.visible) {
    this._statusWindow.StateName();
  }
};

Scene_Status.prototype.noShow = function() {
  
};


Window_Base.prototype.statusParamDecimal = function(val) {
  if (param.DecimalMode) {
    return Math.round(val * (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1)) / (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1);
  } else {
    return Math.floor(val * (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1)) / (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1);
  }
};

Window_Status.prototype.refresh = function() {
  Window_StatusBase.prototype.refresh.call(this);
  if (this._actor) {
    const deta = this.battlreActorImgDeta(this._actor.actorId());
    const bitmapDeta = deta.ActorImg;
    this.bitmap = bitmapDeta ? ImageManager.loadPicture(bitmapDeta) : null;
    if (this.bitmap && !this.bitmap.isReady()) {
			this.bitmap.addLoadListener(this.drawBlocks.bind(this));
		} else {
			this.drawBlocks();
    }
  }
};

Window_Status.prototype.drawBlocks = function() {
  this.actorImg();
  this.drawBlock1();
  this.drawBlock2();
};

Window_Status.prototype.actorImg = function() {
  if(this.bitmap) {
    const deta = this.battlreActorImgDeta(this._actor.actorId())
    this.contents.blt(this.bitmap, 0, 0, Graphics.boxWidth, Graphics.boxHeight, deta.Actor_X, deta.Actor_Y);
  }
};

Window_Status.prototype.blocksY = function() {
  return Math.floor((Graphics.boxHeight - 616) / 60) * 36;
};

Window_Status.prototype.drawBlock2 = function() {
  const y = this.block2Y() + this.blocksY();
  this.drawActorFace(this._actor, 12, y);
  this.drawBasicInfo(204, y);
  this.drawExpInfo(456, y);
};

Window_Status.prototype.drawExpInfo = function(x, y) {
  const lineHeight = this.lineHeight();
  const expTotal = TextManager.expTotal.format(TextManager.exp);
  const expNext = TextManager.expNext.format(TextManager.level);
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(expTotal, x, y + lineHeight * 0, 270);
  this.drawText(expNext, x, y + lineHeight * 2, 270);
  this.resetTextColor();
  this.drawText(this.expTotalValue(), x, y + lineHeight * 1, 270, "right");
  this.placeExpGauge(this._actor, x - 30, y + lineHeight * 3.32);
};

Window_Status.prototype.placeExpGauge = function(actor, x, y) {
  const type = 'exp'
  const key = "actor%1-gauge-%2".format(actor.actorId(), type);
  const sprite = this.createInnerSprite(key, Sprite_StatusExpGauge);
  sprite.setup(actor, type);
  sprite.move(x, y);
  sprite.show();
};

Window_Status.prototype.placeGauge = function(actor, type, x, y) {
  const key = "actor%1-gauge-%2".format(actor.actorId(), type);
  const sprite = this.createInnerSprite(key, Sprite_StatusGauge);
  sprite.setup(actor, type);
  sprite.move(x, y);
  sprite.show();
};

Window_Status.prototype.battlreActorImgDeta = function(id) {
  const actors = param.ActorsImgList;
  let deta = {actorId: id};
  if(actors) {
    actors.forEach(actor => {
      if(actor.actorId === id){
        deta = actor;
      }
    });
  }
  return deta;
};

Window_Status.prototype.paramName = function(id) {
  const rect = this.itemLineRect(0);
  const y = this.setContentY - 42;
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.ParamName, rect.x, y, rect.width);
  this.resetTextColor();
};

Window_Status.prototype.XparamName = function(id) {
  const rect = this.itemLineRect(0);
  const y = this.setContentY - 42;
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.XParamName, rect.x, y, rect.width);
  this.resetTextColor();
};

Window_Status.prototype.SparamName = function() {
  const rect = this.itemLineRect(0);
  const y = this.setContentY - 42;
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.SParamName, rect.x + this.setSParamsWidth, y, rect.width);
  this.resetTextColor();
};

Window_Status.prototype.EquipsName = function() {
  const rect = this.itemLineRect(0);
  const y = this.setContentY - 42;
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.EquipsName, rect.x + this.setContentEquipWidth, y, rect.width);
  this.resetTextColor();
};

Window_Status.prototype.ElementName = function() {
  const rect = this.itemLineRect(0);
  const y = this.setContentY - 42;
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.ElementName, rect.x, y, rect.width);
  this.resetTextColor();
};

Window_Status.prototype.StateName = function() {
  const rect = this.itemLineRect(0);
  const y = this.setContentY - 42;
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.StateName, rect.x + this.setStateWidthWidth - 4, y, rect.width);
  this.resetTextColor();
};


const _Window_StatusParams_initialize = Window_StatusParams.prototype.initialize;
Window_StatusParams.prototype.initialize = function(rect) {
  _Window_StatusParams_initialize.call(this, rect);
  this.opacity = 0;
  this.frameVisible =  false;
};

Window_StatusParams.prototype.drawItem = function(index) {
  const rect = this.itemLineRect(index);
  const paramId = index + 2;
  const name = TextManager.param(paramId);
  const value = this._actor.param(paramId);
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(name, rect.x, rect.y, 92);
  this.resetTextColor();
  this.drawText(value, rect.x + 100, rect.y, rect.width - 100, "right");
};

Window_StatusParams.prototype.drawItemBackground = function(index) {
  Window_Selectable.prototype.drawItemBackground.call(this, index);
};

const _Window_StatusEquip_initialize = Window_StatusEquip.prototype.initialize;
Window_StatusEquip.prototype.initialize = function(rect) {
  _Window_StatusEquip_initialize.call(this, rect);
  this.opacity = 0;
  this.frameVisible =  false;
};

Window_StatusEquip.prototype.drawItem = function(index) {
  const rect = this.itemLineRect(index);
  const equips = this._actor.equips();
  const item = equips[index];
  const slotName = this.actorSlotName(this._actor, index);
  const sw = 138;
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(slotName, rect.x, rect.y, sw, rect.height);
  this.drawItemName(item, rect.x + sw, rect.y, rect.width - sw);
};

Window_StatusEquip.prototype.drawItemBackground = function(index) {
  Window_Selectable.prototype.drawItemBackground.call(this, index);
};


function Window_StatusXParams() {
  this.initialize(...arguments);
}

Window_StatusXParams.prototype = Object.create(Window_StatusBase.prototype);
Window_StatusXParams.prototype.constructor = Window_StatusXParams;

Window_StatusXParams.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._actor = null;
  this.opacity = 0;
  this.frameVisible = false;
};

Window_StatusXParams.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
      this._actor = actor;
      this.refresh();
  }
};

Window_StatusXParams.prototype.maxItems = function() {
  return XparamData ? param.Xparam.length : 0;
};

Window_StatusXParams.prototype.maxCols = function() {
  return 2;
};

Window_StatusXParams.prototype.itemHeight = function() {
  return this.lineHeight();
};

Window_StatusXParams.prototype.drawItem = function(index) {
  const rect = this.itemLineRect(index);
  const paramId = param.Xparam[index].XparamId;
  const name = this.XparamName(index);
  let value = this._actor.xparam(paramId) * 100;
  value = this.statusParamDecimal(value);
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(name, rect.x, rect.y, 92);
  this.resetTextColor();
  this.drawText(value +" %", rect.x + 100, rect.y, rect.width - 100, "right");
};


Window_StatusXParams.prototype.XparamName = function(index) {
  switch (param.Xparam[index].XparamId) {
    case 0:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : TextManager.param(8);
    case 1:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : TextManager.param(9);
    case 2:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "会心率";
    case 3:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "会心回避率";
    case 4:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "魔法回避率";
    case 5:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "魔法反射率";
    case 6:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "反撃率";
    case 7:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "ＨＰ再生率";
    case 8:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "ＭＰ再生率";
    case 9:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "ＴＰ再生率";
  }
  return null;
};


function Window_StatusSParams() {
  this.initialize(...arguments);
}

Window_StatusSParams.prototype = Object.create(Window_StatusBase.prototype);
Window_StatusSParams.prototype.constructor = Window_StatusSParams;

Window_StatusSParams.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._actor = null;
  this.opacity = 0;
  this.frameVisible = false;
};

Window_StatusSParams.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
      this._actor = actor;
      this.refresh();
  }
};

Window_StatusSParams.prototype.maxItems = function() {
  return SparamData ? param.Sparam.length : 0;
};

Window_StatusSParams.prototype.maxCols = function() {
  return 2;
};

Window_StatusSParams.prototype.itemHeight = function() {
  return this.lineHeight();
};

Window_StatusSParams.prototype.drawItem = function(index) {
  const rect = this.itemLineRect(index);
  const paramId = param.Sparam[index].SparamId;
  const name = this.SparamName(index);
  let value = this._actor.sparam(paramId) * 100;
  value = this.statusParamDecimal(value);
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(name, rect.x, rect.y, 92);
  this.resetTextColor();
  this.drawText(value +" %", rect.x + 100, rect.y, rect.width - 100, "right");
};

Window_StatusSParams.prototype.SparamName = function(index) {
  switch (param.Sparam[index].SparamId) {
    case 0:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "狙われ率";
    case 1:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "防御効果率";
    case 2:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "回復効果率";
    case 3:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "回復効果率";
    case 4:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "ＭＰ消費率";
    case 5:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "ＴＰチャージ率";
    case 6:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "物理ダメージ率";
    case 7:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "魔法ダメージ率";
    case 8:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "床ダメージ率";
    case 9:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "経験獲得率";
  }
  return null;
};


function Window_StatusElement() {
  this.initialize(...arguments);
}

Window_StatusElement.prototype = Object.create(Window_StatusBase.prototype);
Window_StatusElement.prototype.constructor = Window_StatusElement;

Window_StatusElement.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._actor = null;
  this.opacity = 0;
  this.frameVisible = false;
};

Window_StatusElement.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
      this._actor = actor;
      this.refresh();
  }
};

Window_StatusElement.prototype.maxItems = function() {
  return ElementResistData ? param.ElementResist.length : 0;
};

Window_StatusElement.prototype.maxCols = function() {
  return 2;
};

Window_StatusElement.prototype.itemHeight = function() {
  return this.lineHeight();
};

Window_StatusElement.prototype.drawItem = function(index) {
  const rect = this.itemLineRect(index);
  const elementId = param.ElementResist[index].ElementNo;
  if(elementId > 0) {
    const iconId = param.ElementResist[index].ElementIconId;
    if(iconId > 0) {
      this.drawIcon(iconId, rect.x, rect.y + 2);
    } else {
      const name = $dataSystem.elements[elementId];
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(name, rect.x, rect.y, 92);
    }
    let rate = this._actor.elementRate(elementId) * 100;
    rate = this.statusParamDecimal(rate);
    this.resetTextColor();
    this.drawText(rate +" %", rect.x + 100, rect.y, rect.width - 100, "right");
  }
};


function Window_StatusState() {
  this.initialize(...arguments);
}

Window_StatusState.prototype = Object.create(Window_StatusBase.prototype);
Window_StatusState.prototype.constructor = Window_StatusState;

Window_StatusState.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._actor = null;
  this.opacity = 0;
  this.frameVisible = false;
};

Window_StatusState.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
      this._actor = actor;
      this.refresh();
  }
};

Window_StatusState.prototype.maxItems = function() {
  return StateResistData ? param.StateResist.length : 0;
};

Window_StatusState.prototype.maxCols = function() {
  return 2;
};

Window_StatusState.prototype.itemHeight = function() {
  return this.lineHeight();
};

Window_StatusState.prototype.drawItem = function(index) {
  const rect = this.itemLineRect(index);
  if (param.StateResist.length > 0) {
    const stateId = param.StateResist[index].StateNo;
    if(stateId > 0) {
      const iconId = $dataStates[stateId].iconIndex;
      if(iconId > 0) {
        this.drawIcon(iconId, rect.x, rect.y + 2);
      } else {
        const name = $dataStates[stateId].name;
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(name, rect.x, rect.y, 92);
      }
      let rate = this._actor.stateRate(stateId) * 100;
      rate = this.statusParamDecimal(rate);
      this.resetTextColor();
      this.drawText(rate +" %", rect.x + 100, rect.y, rect.width - 100, "right");
    }
  }
};


function Sprite_StatusGauge() {
  this.initialize(...arguments);
}

Sprite_StatusGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_StatusGauge.prototype.constructor = Sprite_StatusGauge;

Sprite_StatusGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_StatusGauge.prototype.bitmapWidth = function() {
  return param.GaugeWidth;
};


function Sprite_StatusExpGauge() {
  this.initialize(...arguments);
}

Sprite_StatusExpGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_StatusExpGauge.prototype.constructor = Sprite_StatusExpGauge;

Sprite_StatusExpGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_StatusExpGauge.prototype.bitmapWidth = function() {
  return 300;
};

Sprite_StatusExpGauge.prototype.drawValue = function() {
  const currentValue = this._battler.isMaxLevel() ? "-------" : this._battler.nextRequiredExp();
  const width = this.bitmapWidth();
  const height = this.bitmapHeight();
  this.setupValueFont();
  this.bitmap.drawText(currentValue, 0, 0, width, height, "right");
};

Sprite_StatusExpGauge.prototype.currentValue = function() {
  if (this._battler) {
    return this._battler.currentExp() - this._battler.currentLevelExp();
  }
};

Sprite_StatusExpGauge.prototype.currentMaxValue = function() {
  if (this._battler) {
    return this._battler.nextLevelExp() - this._battler.currentLevelExp();
  }
};

Sprite_StatusExpGauge.prototype.gaugeColor1 = function() {
  return ColorManager.expGaugeColor1();
};

Sprite_StatusExpGauge.prototype.gaugeColor2 = function() {
  return ColorManager.expGaugeColor2();
};

ColorManager.expGaugeColor1 = function() {
  return this.textColor(17);
};

ColorManager.expGaugeColor2 = function() {
  return this.textColor(6);
};

})();