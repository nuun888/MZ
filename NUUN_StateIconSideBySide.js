/*:-----------------------------------------------------------------------------------
 * NUUN_StateIconSideBySide.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc  State side-by-side display
 * @author NUUN
 * @version 1.5.9
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * Displays the states displayed during battle side by side.
 * Since this plugin has a function to display remaining turns, it cannot be used together with "NUUN_StateTurn".
 * 
 * Display turn mode
 * 'remaining' The default correction value when specified is 1.
 * 'elapsed' Set the number of turns correction to -1 when specifying.
 * "NUUN_StateTurnCount" is required to display elapsed turns.
 * 
 * Turn text color
 * State notes
 * <BatState>　A state with this tag is a disadvantageous state. Therefore, the color of the disadvantageous state and debuff turn is applied.
 * For states without the above tags, advantageous states and buff turn colors are applied.
 * 
 * When using a plug-in that enlarges the image of an enemy character, the image may be distorted.
 * If you are interested, please use it together with the enemy state display expansion.
 * 
 * If you are using a plug-in that changes the state icon coordinates, please set the ally icon display position coordinates to default.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 11/10/2024 Ver.1.5.9
 * Re-corrected.
 * 11/9/2024 Ver.1.5.8
 * Fixed an issue where state turns were not displayed correctly when using the Battle Style Extension Plugin.
 * 5/15/2024 Ver.1.5.7
 * Fixed an issue where state turns were not displayed.
 * 3/2/2024 Ver.1.5.6
 * Fixed an issue where the turn display would be misaligned when the state display was specified with "NUUN_BattleStyleEX".
 * 1/3/2024 Ver.1.5.5
 * Addressing conflicts with some plugins.
 * 7/15/2023 Ver.1.5.4
 * Added a function to turn on/off the smooth scale of the icon image.
 * 3/30/2023 Ver.1.5.3
 * Fixed an issue where the number of turns was not displayed correctly when the auto release timing was at the end of the turn.
 * 12/6/2022 Ver.1.5.2
 * Changed the Type of color specification plug-in parameter to color. (Ver.1.6.0 or later)
 * Changed the Type of icon specified plug-in parameter to icon. (Ver.1.6.0 or later)
 * Changed the display in languages other than Japanese to English.
 * 11/13/2022 Ver.1.5.1
 * Fixed the problem that an error occurs when adding a state or buff if the turn is not displayed.
 * 10/29/2022 Ver.1.5.0
 * Added a function that allows you to specify the text color for the number of turns.
 * Fixed the problem that the icon is not displayed when not in the state when "MPP_Pseudo3DBattle" is used together.
 * 10/15/2022 Ver.1.4.0
 * Added a function that allows you to specify the icon when the ally's state is not granted.
 * 8/22/2022 Ver.1.3.2
 * Separate setting for icon display position and icon display alignment.
 * 7/2/2022 Ver.1.3.1
 * Fixed an issue where state icons would remain after changing members.
 * 4/9/2022 Ver.1.3.0
 * Added a function that can specify the row of the display icon.
 * Lightening of processing.
 * 3/31/2022 Ver.1.2.3
 * Fixed an issue where the actor's state was not displayed when using "MPP_Pseudo3DBattle".
 * 3/30/2022 Ver.1.2.2
 * Fixed the problem that the image is distorted when more states are added than can be displayed.
 * 3/28/2022 Ver.1.2.1
 * Fixed the problem that a line-like image is displayed in the icon display part with a specific plug-in.
 * 1/21/2022 Ver.1.2.0
 * Added elapsed turns to how to display state turns. (requires ``NUUN_StateTurnCount'')
 * 9/23/2021 Ver.1.1.0
 * Significant change in processing by reflecting state display switching.
 * Added a function that allows enemies to be displayed side by side.
 * 1/24/2021 Ver.1.0.3
 * Corrected the processing when using "NUUN_BattleStayleEX" together.
 * 1/17/2021 Ver.1.0.2
 * Fixed the problem that coordinates are not reflected when "NUUN_BattleStayleEX" is introduced and the state's coordinate permission is set to true.
 * Supports "NUUN_BattleStayleEX" 2.0.0 or later.
 * 1/3/2021 Ver.1.0.1
 * Changed so that the width to be displayed can be specified.
 * 1/2/2021 Ver.1.0.0
 * First edition.
 * 
 * @param Setting
 * @text Common setting
 * @default ------------------------------
 * 
 * @param StateIconWidth
 * @desc Specify the width to display the state icon. 0 will be the width of the number of icon columns.
 * @text Width
 * @type number
 * @default 0
 * @min 0
 * @parent Setting
 * 
 * @param ActorStateIcon
 * @text Ally state icon
 * @default ------------------------------
 * 
 * @param ActorStateIconShowVal
 * @desc The number of allies' state cols.
 * @text Number of allied state cols
 * @type number
 * @default 4
 * @min 1
 * @parent ActorStateIcon
 * 
 * @param ActorStateIconRows
 * @desc The number of allied state rows.
 * @text Number of allied state rows
 * @type number
 * @default 1
 * @min 1
 * @parent ActorStateIcon
 * 
 * @param NoStateIcon
 * @desc Icon index when no state is attached.
 * @text No state icon
 * @type icon
 * @default 0
 * @min 0
 * @parent ActorStateIcon
 * 
 * @param ActorStateIconAlign
 * @desc Ally icon display align.
 * @text Ally icon display align
 * @type select
 * @option Left
 * @value 'left'
 * @option Center
 * @value 'center'
 * @option Right
 * @value 'right'
 * @default 'right'
 * @parent ActorStateIcon
 * 
 * @param ActorStateIconPosition
 * @desc Display position coordinates of friendly icon.
 * @text Ally icon display position coordinates
 * @type select
 * @option Ally icon display align criteria
 * @value 'auto'
 * @option Left
 * @value 'left'
 * @option Center
 * @value 'center'
 * @option Right
 * @value 'right'
 * @option Default (traditional processing)
 * @value 'default'
 * @default 'auto'
 * @parent ActorStateIcon
 * 
 * 
 * @param EnemyStateIcon
 * @text Enemy state icon
 * @default ------------------------------
 * 
 * @param EnemyStateIconShowVal
 * @desc The number of enemy state cols.
 * @text Number of enemy state cols
 * @type number
 * @default 5
 * @min 1
 * @parent EnemyStateIcon
 * 
 * @param EnemyStateIconRows
 * @desc The number of enemy state rows.
 * @text Number of enemy state rows
 * @type number
 * @default 1
 * @min 1
 * @parent EnemyStateIcon
 * 
 * @param EnemyStateIconAlign
 * @desc Enemy icon display align.
 * @text Enemy icon display align
 * @type select
 * @option Left
 * @value 'left'
 * @option Center
 * @value 'center'
 * @option Right
 * @value 'right'
 * @default 'center'
 * @parent EnemyStateIcon
 * 
 * @param StateTurn
 * @text Turn display setting
 * @default ------------------------------
 * 
 * @param TurnMode
 * @desc Specifies the turn mode to display.
 * @text Display turn mode
 * @type select
 * @option Remaining turn
 * @value 'remaining'
 * @option Elapsed turns (requires ``NUUN_StateTurnCount'')
 * @value 'elapsed'
 * @default 'remaining'
 * @parent StateTurn
 * 
 * @param ActorStateIconVisible
 * @desc Remaining turn indication on allied state icons.
 * @text Allied state remaining turn display
 * @type boolean
 * @default false
 * @parent StateTurn
 * 
 * @param EnemyStateIconVisible
 * @desc Remaining turn display on enemy state icon.
 * @text Enemy state remaining turn display
 * @type boolean
 * @default false
 * @parent StateTurn
 * 
 * @param TurnX
 * @desc Turn coordinate X. (relative)
 * @text Turn coordinate X (relative)
 * @type number
 * @default 0
 * @min -9999
 * @parent StateTurn
 * 
 * @param TurnY
 * @desc Turn coordinate Y. (relative)
 * @text Turn coordinate Y (relative)
 * @type number
 * @default -4
 * @min -9999
 * @parent StateTurn
 * 
 * @param TurnFontSize
 * @desc Font size for turns. (from main font)
 * @text Turn font size
 * @type number
 * @default -4
 * @min -9999
 * @parent StateTurn
 * 
 * @param TurnCorrection
 * @text Correction of the number of turns
 * @desc Correct the display of the number of turns.
 * @default 1
 * @type number
 * @min -9999
 * @max 9999
 * @parent StateTurn
 * 
 * @param TurnColor
 * @text Advantageous state, color of buff turn
 * @desc Advantageous state, system color number for debuff turns. (Color code can be entered from the text tab)
 * @type color
 * @default 0
 * @parent StateTurn
 * 
 * @param BadTurnColor
 * @text Unfavorable state, debuff turn color
 * @desc System color number for unfavorable states and debuff turns. (Color code can be entered from the text tab)
 * @type color
 * @default 0
 * @parent StateTurn
 * 
 * @param OtherSetting
 * @text Other setting
 * @default ------------------------------
 * 
 * @param SmoothMode
 * @desc Set smooth mode.
 * @text Smooth mode enabled
 * @type boolean
 * @default true
 * @parent OtherSetting
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc  ステート横並び表示
 * @author NUUN
 * @version 1.5.8
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 戦闘中に表示するステートを横並び表示にします。
 * このプラグインには残りターンを表示する機能が備わっているため、ステート、バフ残りターン表示プラグインとの
 * 併用はできません。
 * Ver.1.0.3以前とプラグイン名及びプラグインパラメータが変更になっていますので再度設定してください。
 * 
 * 表示ターンモード
 * 'remaining'指定時のデフォルトの補正値は1です。
 * 'elapsed'指定時はターン数補正を-1に設定してください。
 * 経過ターンを表示させるにはステート経過ターンカウントプラグインが必要です。
 * 
 * ターンの文字色
 * ステートのメモ欄  
 * <BatState> 子のタグがあるステートは不利なステートになります。よって不利ステート、デバフターンの色が適用されます。  
 * 上記タグがないステートは有利ステート、バフターンの色が適用されます。  
 * 
 * 敵キャラの画像を拡大等をするプラグインと併用する場合、画像に乱れが生じる場合があります。
 * 気になるようでしたら敵ステート表示拡張と併用してください。
 * 
 * ステートアイコンの座標を変更するプラグインを使用している場合は、味方アイコン表示位置座標の設定をデフォルトにしてください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/11/10 Ver.1.5.9
 * 再修正。
 * 2024/11/9 Ver.1.5.8
 * バトルスタイル拡張プラグイン併用時にステートターンが正常に表示されない問題を修正。
 * 2024/5/15 Ver.1.5.7
 * ステートターンが表示されない問題を修正。
 * 2024/3/2 Ver.1.5.6
 * バトルスタイル拡張プラグインでステートの表示を指定している場合に、ターンの表示がずれて表示されてしまう問題を修正。
 * 2024/1/3 Ver.1.5.5
 * 一部プラグインでの競合対応。
 * 2023/7/15 Ver.1.5.4
 * アイコン画像のスムーススケールをON、OFFに出来る機能を追加。
 * 2023/3/30 Ver.1.5.3
 * 自動解除のタイミングがターン終了時の時にターン数が正常に表示されていなかった問題を修正。
 * 2022/12/6 Ver.1.5.2
 * カラー指定のプラグインパラメータのTypeをcolorに変更。(Ver.1.6.0以降)
 * アイコン指定のプラグインパラメータのTypeをiconに変更。(Ver.1.6.0以降)
 * 日本語以外での表示を英語表示に変更。
 * 2022/11/13 Ver.1.5.1
 * ターンを表示しない場合、ステート、バフ付加時にエラーが出る問題を修正。
 * 2022/10/29 Ver.1.5.0
 * ターン数に文字色を指定できる機能を追加。
 * 疑似3Dバトル併用時でステートにかかってないときのアイコンが表示されなくなる問題を修正。
 * 2022/10/15 Ver.1.4.0
 * 味方のステートが付与されていないときのアイコンを指定できる機能を追加。
 * 2022/8/22 Ver.1.3.2
 * アイコンの表示位置とアイコンの表示揃えの設定を分割。
 * 2022/7/2 Ver.1.3.1
 * メンバー交代後ステートアイコンが残ってしまう問題を修正。
 * 2022/4/9 Ver.1.3.0
 * 表示アイコンの行を指定できる機能を追加。
 * 処理の軽量化。
 * 2022/3/31 Ver.1.2.3
 * 疑似3Dバトルとの併用時にアクターのステートが表示されない問題を修正。
 * 2022/3/30 Ver.1.2.2
 * ステートが表示できる個数を超えて付加されている時に画像が乱れる問題を修正。
 * 2022/3/28 Ver.1.2.1
 * 特定のプラグインにてアイコン表示部分に線のような画像が表示されてしまう問題を修正。
 * 2022/1/21 Ver.1.2.0
 * ステートのターンの表示方法に経過ターンを追加。（要ステート経過ターンカウント）
 * 2021/9/23 Ver.1.1.0
 * ステートの表示切り替え反映による処理の大幅変更。
 * 敵にも横並び表示に出来る機能を追加。
 * 2021/1/24 Ver.1.0.3
 * バトルスタイル拡張併用時の処理を再度修正。
 * 2021/1/17 Ver.1.0.2
 * バトルスタイル拡張プラグイン導入時、ステートの座標許可をtureにすると座標が反映されない問題を修正。
 * バトルスタイル拡張プラグイン2.0.0以降対応。
 * 2021/1/3 Ver.1.0.1
 * 表示する横幅を指定できるように変更。
 * 2021/1/2 Ver.1.0.0
 * 初版
 * 
 * @param Setting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param StateIconWidth
 * @desc ステートアイコンの表示する横幅を指定します。0でアイコン列数の幅になります。
 * @text 横幅
 * @type number
 * @default 0
 * @min 0
 * @parent Setting
 * 
 * @param ActorStateIcon
 * @text 味方ステートアイコン
 * @default ------------------------------
 * 
 * @param ActorStateIconShowVal
 * @desc 味方のステート列数。
 * @text 味方ステート列数
 * @type number
 * @default 4
 * @min 1
 * @parent ActorStateIcon
 * 
 * @param ActorStateIconRows
 * @desc 味方のステート行数。
 * @text 味方ステート行数
 * @type number
 * @default 1
 * @min 1
 * @parent ActorStateIcon
 * 
 * @param NoStateIcon
 * @desc ステートがひとつも付与されていない時のアイコンインデックス。
 * @text ステートなし時アイコン
 * @type icon
 * @default 0
 * @min 0
 * @parent ActorStateIcon
 * 
 * @param ActorStateIconAlign
 * @desc 味方のアイコンの表示揃え
 * @text 味方アイコン表示揃え
 * @type select
 * @option 左揃え
 * @value 'left'
 * @option 中央揃え
 * @value 'center'
 * @option 右揃え
 * @value 'right'
 * @default 'right'
 * @parent ActorStateIcon
 * 
 * @param ActorStateIconPosition
 * @desc 味方のアイコンの表示位置座標
 * @text 味方アイコン表示位置座標
 * @type select
 * @option 味方アイコン表示揃え基準
 * @value 'auto'
 * @option 左
 * @value 'left'
 * @option 中央
 * @value 'center'
 * @option 右
 * @value 'right'
 * @option デフォルト(従来の処理)
 * @value 'default'
 * @default 'auto'
 * @parent ActorStateIcon
 * 
 * 
 * @param EnemyStateIcon
 * @text 敵ステートアイコン
 * @default ------------------------------
 * 
 * @param EnemyStateIconShowVal
 * @desc 敵のステート列数。
 * @text 敵ステート列数
 * @type number
 * @default 5
 * @min 1
 * @parent EnemyStateIcon
 * 
 * @param EnemyStateIconRows
 * @desc 敵のステート行数。
 * @text 敵ステート行数
 * @type number
 * @default 1
 * @min 1
 * @parent EnemyStateIcon
 * 
 * @param EnemyStateIconAlign
 * @desc 敵のアイコンの表示揃え
 * @text 敵アイコン表示揃え
 * @type select
 * @option 左揃え
 * @value 'left'
 * @option 中央揃え
 * @value 'center'
 * @option 右揃え
 * @value 'right'
 * @default 'center'
 * @parent EnemyStateIcon
 * 
 * @param StateTurn
 * @text ターン表示設定
 * @default ------------------------------
 * 
 * @param TurnMode
 * @desc 表示するターンモードを指定します。
 * @text 表示ターンモード
 * @type select
 * @option 残りターン
 * @value 'remaining'
 * @option 経過ターン（要ステート経過ターンカウント）
 * @value 'elapsed'
 * @default 'remaining'
 * @parent StateTurn
 * 
 * @param ActorStateIconVisible
 * @desc 味方のステートに残りターンの表示。
 * @text 味方ステート残りターン表示
 * @type boolean
 * @default false
 * @parent StateTurn
 * 
 * @param EnemyStateIconVisible
 * @desc 敵のステートに残りターンの表示。
 * @text 敵ステート残りターン表示
 * @type boolean
 * @default false
 * @parent StateTurn
 * 
 * @param TurnX
 * @desc ターン座標X（相対）
 * @text ターン座標X（相対）
 * @type number
 * @default 0
 * @min -9999
 * @parent StateTurn
 * 
 * @param TurnY
 * @desc ターン座標Y（相対）
 * @text ターン座標Y（相対）
 * @type number
 * @default -4
 * @min -9999
 * @parent StateTurn
 * 
 * @param TurnFontSize
 * @desc ターンのフォントサイズ。（メインフォントから）
 * @text ターンフォントサイズ
 * @type number
 * @default -4
 * @min -9999
 * @parent StateTurn
 * 
 * @param TurnCorrection
 * @text ターン数補正
 * @desc ターン数の表示を補正します。
 * @default 1
 * @type number
 * @min -9999
 * @max 9999
 * @parent StateTurn
 * 
 * @param TurnColor
 * @text 有利ステート、バフターンの色
 * @desc 有利なステート、デバフのターンのシステムカラー番号。(テキストタブからカラーコード入力可能)
 * @type color
 * @default 0
 * @parent StateTurn
 * 
 * @param BadTurnColor
 * @text 不利ステート、デバフターンの色
 * @desc 不利なステート、デバフのターンのシステムカラー番号。(テキストタブからカラーコード入力可能)
 * @type color
 * @default 0
 * @parent StateTurn
 * 
 * @param OtherSetting
 * @text その他設定
 * @default ------------------------------
 * 
 * @param SmoothMode
 * @desc スムースモードの設定。
 * @text スムースモード有効
 * @type boolean
 * @default true
 * @parent OtherSetting
 * 
 */

var Imported = Imported || {};
Imported.NUUN_StateIconSideBySide = true;

(() => {
const parameters = PluginManager.parameters('NUUN_StateIconSideBySide');
let StateIconWidth = Number(parameters['StateIconWidth'] || 0);
const ActorStateIconShowVal = Number(parameters['ActorStateIconShowVal'] || 5);
const ActorStateIconRows = Number(parameters['ActorStateIconRows'] || 1);
const EnemyStateIconShowVal = Number(parameters['EnemyStateIconShowVal'] || 1);
const EnemyStateIconRows = Number(parameters['EnemyStateIconRows'] || 1);
const ActorStateIconAlign = eval(parameters['ActorStateIconAlign']) || 'right';
const EnemyStateIconAlign = eval(parameters['EnemyStateIconAlign']) || 'center';
const ActorStateIconPosition = eval(parameters['ActorStateIconPosition']) || 'auto';
const ActorStateIconVisible = eval(parameters['ActorStateIconVisible'] || 'true');
const EnemyStateIconVisible = eval(parameters['EnemyStateIconVisible'] || 'true');
const TurnMode = eval(parameters['TurnMode'] || 'remaining');
const TurnFontSize = Number(parameters['TurnFontSize'] || -4);
const TurnX = Number(parameters['TurnX'] || 0);
const TurnY = Number(parameters['TurnY'] || -4);
const TurnCorrection = Number(parameters['TurnCorrection'] || 1);
const NoStateIcon = Number(parameters['NoStateIcon'] || 0);
const TurnColor = (DataManager.nuun_structureData(parameters['TurnColor'])) || 0;
const BadTurnColor = (DataManager.nuun_structureData(parameters['BadTurnColor'])) || 0;
const SmoothMode = eval(parameters['SmoothMode'] || 'true');


const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
    NuunManager.isEnemyStateIconMode = true;
    _Sprite_Enemy_initMembers.call(this);
};


const _Sprite_StateIcon_initialize = Sprite_StateIcon.prototype.initialize;
Sprite_StateIcon.prototype.initialize = function() {
  _Sprite_StateIcon_initialize.call(this);
};

const _Sprite_StateIcon_initMembers = Sprite_StateIcon.prototype.initMembers;
Sprite_StateIcon.prototype.initMembers = function() {
    this._isEnemyMode = NuunManager.isEnemyStateIconMode;
    _Sprite_StateIcon_initMembers.call(this);
};

Sprite_StateIcon.prototype.bitmapWidth = function() {
    return Math.min(ImageManager.iconWidth * this.getStateIconShowVal(), StateIconWidth);
};

Sprite_StateIcon.prototype.bitmapHeight = function() {
    return ImageManager.iconHeight * this.getMaxStateIconRows();
};

Sprite_StateIcon.prototype.loadBitmap = function() {//再定義
    this._iconSprite = [];
    this.createSprite();
};

Sprite_StateIcon.prototype.createSprite = function() {
    for (let i = 0; i < this.getMaxStateIconShowVal() * this.getMaxStateIconRows(); i++) {
        const sprite = new Sprite();
        this.addChild(sprite);
        this._iconSprite.push(sprite);
        this.setInitIcon(sprite, i);
        this.textTurn(sprite);
    }
    NuunManager.isEnemyStateIconMode = false;
};

Sprite_StateIcon.prototype.textTurn = function(sprite) {
    const textSprite = new Sprite();
    sprite.addChild(textSprite);
    sprite.turnSprite = textSprite;
    textSprite.x = TurnX;
    textSprite.y = TurnY;
    textSprite.bitmap = new Bitmap(ImageManager.iconWidth, ImageManager.iconHeight);
};

Sprite_StateIcon.prototype.setInitIcon = function(sprite, i) {
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    this._animationCount = 0;
    this._animationIndex = 0;
    sprite.bitmap = ImageManager.loadSystem("IconSet");
    if (!SmoothMode) {
        sprite.bitmap.smooth = false;
    }
    sprite.setFrame(0, 0, 0, 0);
};

Sprite_StateIcon.prototype.stateIconWidth = function(iconlength) {
    return ImageManager.iconWidth * (iconlength- 1);
};

Sprite_StateIcon.prototype.stateIconDisplay = function(iconlength) {
    if (this._battler && this._isEnemyMode) {
        return this.stateIconDisplayAlign(iconlength, EnemyStateIconAlign);
    } else {
        return this.stateIconDisplayAlign(iconlength, ActorStateIconAlign);
    }
};

Sprite_StateIcon.prototype.stateIconDisplayAlign = function(iconlength, align) {
    if (align === 'center') {
        return Math.floor(this.stateIconWidth(iconlength) / 2) * -1;
    } else if (align === 'right') {
        return this.stateIconWidth(iconlength) * -1;
    }
    return 0;
};

Sprite_StateIcon.prototype.createStateIcons = function(icons, turns) {
    let displayIcons = [];
    let displayTurn = [];
    if (icons.length > 0) {
        displayIcons = icons.slice(this._animationIndex, this._animationIndex + this.getStateIconShowVal() * this.getStateIconRows());
        displayTurn = turns.slice(this._animationIndex, this._animationIndex + this.getStateIconShowVal() * this.getStateIconRows());
    }
    this._iconSprite.forEach((sprite, r) => {
        if (displayIcons[r]) {
        sprite._iconIndex = displayIcons[r];
        if (!!displayTurn[r]) {
            sprite._stateTurn = displayTurn[r].turn || 0;
            sprite._trunTextColor = displayTurn[r].bad ? BadTurnColor : TurnColor;
        }
        sprite.visible = true;
        } else {
        sprite._iconIndex = !this._isEnemyMode ? NoStateIcon : 0;
        sprite._stateTurn = 0;
        sprite._trunTextColor = 0;
        if (sprite.visible) {
            this.setFrameIcon(sprite);
        }
        if (sprite._iconIndex === 0) {
            sprite.visible = false;
        } else {
            sprite.visible = true;
        }
        }
    });
    this.displayIconsLength = !this._isEnemyMode && NoStateIcon > 0 ? ActorStateIconShowVal : displayIcons.length;
};

Sprite_StateIcon.prototype.updateIcon = function() {//再定義
  const icons = [];
  let turns = [];
  if (this.shouldDisplay()) {
    icons.push(...this._battler.allIcons());
    if (this._battler.isActor() && ActorStateIconVisible) {
      turns = this._battler.allStateTurns();
    } else if (this._battler.isEnemy() && EnemyStateIconVisible) {
      turns = this._battler.allStateTurns();
    }
  }
  this.createStateIcons(icons, turns);
  if (icons.length > 0) {
      this._animationIndex += this.getStateIconShowVal() * this.getStateIconRows();
      if (this._animationIndex >= icons.length) {
          this._animationIndex = 0;
      }
      this._iconIndex = icons.length;
      this.visible = this._battler.isBattleMember();
  } else {
      this._animationIndex = 0;
      this._iconIndex = NoStateIcon;
      if (NoStateIcon > 0) {
        this.visible = true;//疑似3Dバトル競合対策
      }
      if (!(this._battler.isActor() && NoStateIcon > 0)) {
        this.visible = false;//疑似3Dバトル競合対策
      }
  }
};

Sprite_StateIcon.prototype.updateFrame = function() {//再定義
  const iconsLength = this.displayIconsLength;
  const showLength = Math.min(iconsLength, this.getStateIconShowVal());
  this._iconSprite.forEach((sprite, r) => {
    sprite.x = Math.floor(r % this.getStateIconShowVal()) * this.iconX(showLength) + this.stateIconDisplay(showLength);
    sprite.y = Math.floor(r / this.getStateIconShowVal()) * ImageManager.iconHeight;
    if (sprite.visible) {
      this.setFrameIcon(sprite);
      this.setTurn(sprite);
    }
  });
};

Sprite_StateIcon.prototype.setFrameIcon = function(sprite) {
  const iconId = sprite._iconIndex;
  const pw = ImageManager.iconWidth;
  const ph = ImageManager.iconHeight;
  const sx = (iconId % 16) * pw;
  const sy = Math.floor(iconId / 16) * ph;
  sprite.setFrame(sx, sy, pw, ph);
};

Sprite_StateIcon.prototype.setTurn = function(sprite) {
  sprite.turnSprite.bitmap.clear();
  if (sprite._stateTurn > 0) {
    const textSprite = sprite.turnSprite;
    this.setupFont(textSprite, sprite._trunTextColor);
    textSprite.bitmap.drawText(sprite._stateTurn, 0, 0, ImageManager.iconWidth, ImageManager.iconHeight);
  }
};

Sprite_StateIcon.prototype.iconX = function(iconsLength) {
	if (StateIconWidth > 0 && ImageManager.iconWidth * iconsLength > StateIconWidth) {
		return Math.floor(StateIconWidth / iconsLength);
	}
	return ImageManager.iconWidth;
};

Sprite_StateIcon.prototype.getStateIconShowVal = function() {
  return this._battler && this._battler.isActor() ? ActorStateIconShowVal : EnemyStateIconShowVal;
};

Sprite_StateIcon.prototype.getMaxStateIconShowVal = function() {
    if (this._battler) {
        return this.getStateIconShowVal();
    } else {
        return this._isEnemyMode ? EnemyStateIconShowVal : ActorStateIconShowVal;
    }
};

Sprite_StateIcon.prototype.getStateIconRows = function() {
  return this._battler && !this._isEnemyMode ? ActorStateIconRows : EnemyStateIconRows;
};

Sprite_StateIcon.prototype.getMaxStateIconRows = function() {
  if (this._battler) {
    return this.getStateIconRows();
  } else {
    return this._isEnemyMode ? EnemyStateIconRows : ActorStateIconRows;
  }
};

Sprite_StateIcon.prototype.setupFont = function(sprite, trunTextColor) {
  sprite.bitmap.fontSize = this.nuun_fontSize() + TurnFontSize;
  sprite.bitmap.textColor = this.nuun_textColor(trunTextColor);
  sprite.bitmap.outlineColor = this.nuun_outlineColor();
  sprite.bitmap.outlineWidth = this.nuun_outlineWidth();
};

Sprite_StateIcon.prototype.nuun_textColor = function(trunTextColor) {
  return NuunManager.getColorCode(trunTextColor);
};

Sprite_StateIcon.prototype.nuun_outlineColor = function() {
  return ColorManager.outlineColor();
};

Sprite_StateIcon.prototype.nuun_outlineWidth = function() {
  return 3;
};

Sprite_StateIcon.prototype.nuun_fontSize = function() {
  return $gameSystem.mainFontSize();
};


const _Window_BattleStatus_stateIconX = Window_BattleStatus.prototype.stateIconX;
Window_BattleStatus.prototype.stateIconX = function(rect) {
  let mode = ActorStateIconPosition;
  if (ActorStateIconPosition === 'auto') {
    mode = ActorStateIconAlign;
  }
  if (mode=== 'center') {
    return rect.x + rect.width / 2;
  } else if (mode === 'left') {
    return rect.x + ImageManager.iconWidth / 2 - 4;
  } else if (mode === 'right' || mode === 'default') {
    return _Window_BattleStatus_stateIconX.call(this, rect);
  }
};

Game_BattlerBase.prototype.allStateTurns = function() {
  const turns = this.nuun_stateTurns();
  Array.prototype.push.apply(turns, this.allBuffTurns());
  return turns;
};

Game_BattlerBase.prototype.allBuffTurns = function() {
  return this.nuun_buffTurns();
};

Game_BattlerBase.prototype.nuun_stateTurns = function() {
    const states = this.nuun_stateTurnFilter();
    const stateIcons = this.stateIcons();
    const turns = [];
    stateIcons.forEach(icon => {
        const state = states.find(state => state.iconIndex === icon);
        if (state.iconIndex > 0) {
            const turn = [{turn: (this.nuun_isNonRemoval(state) ? 0 : this.nuun_getStateTurn(state.id) + (state.autoRemovalTiming === 2 ? -1 : 0)), bad: !!state.meta.BatState}];
            Array.prototype.push.apply(turns, turn);
        }
    });
    return turns;
};

Game_BattlerBase.prototype.nuun_buffTurns = function() {
    const buffs = this.buffIcons();
    let buffId = 0;
    const turns = [];
    buffs.forEach(buffIcon => {
        if (buffIcon > Game_BattlerBase.ICON_DEBUFF_START) {
            buffId = (buffIcon - Game_BattlerBase.ICON_DEBUFF_START) % 8;
        } else if (buffIcon > Game_BattlerBase.ICON_BUFF_START) {
            buffId = (buffIcon - Game_BattlerBase.ICON_BUFF_START) % 8;
        }
        const buff = this._buffs[buffId];
        if (buff !== 0 && this.nuun_buffTurnsFilter(buffId)) {
            const turn = [{turn: this.nuun_getBuffTurn(buffId), bad: buff < 0}];
            Array.prototype.push.apply(turns, turn);
        }
    });
    return turns;
};

Game_BattlerBase.prototype.nuun_stateTurnFilter = function() {
    if (this.statesFilter && BattleManager.bsVisibleStates && BattleManager.bsVisibleStates.length > 0) {
        return this.statesFilter();
    } else {
        return this.states();
    }
};

Game_BattlerBase.prototype.nuun_buffTurnsFilter = function(id) {
    return this.buffsFilter ? this.buffsFilter(id) : true;
};

Game_BattlerBase.prototype.nuun_isNonRemoval = function(state) {
  return state.autoRemovalTiming === 0;
};

Game_BattlerBase.prototype.nuun_getStateTurn = function(id) {
  return (Imported.NUUN_StateTurnCount && TurnMode === 'elapsed' ? this.getStateNowTurn(id) : this._stateTurns[id]) + TurnCorrection;
};

Game_BattlerBase.prototype.nuun_getBuffTurn = function(id) {
  return (Imported.NUUN_StateTurnCount && TurnMode === 'elapsed' ? this.getBuffNowTurn(id) : this._buffTurns[id]) + TurnCorrection;
};

})();