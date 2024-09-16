/*:-----------------------------------------------------------------------------------
 * NUUN_BattleBackgroundEX.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc  Battle background change
 * @author NUUN
 * @version 1.2.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * You can change the battle background by region and terrain tag, and set it for each enemy group.
 * You can change the battle background set in the field map to an arbitrary image. () is the name of the default auto tile.
 * If no file is specified, the original battle background will be displayed.
 * 
 * 
 * Enter "Comment" on the first page of the enemy group's battle event.
 * <battleBack:[id]>
 *  The battle background of this enemy group will be the battle background number [id] set in the list.
 * 
 * map Notes
 * <regionBattleBack:[regionId],[id]>
 *  At the time of encounter, when the region ID of the current location is [regionId], the battle background will be the battle background number [id] set in the list.
 * <tagBattleBack:[tagId],[id]>
 *  At the time of encounter, when the terrain tag ID of the current location is [tagId], the battle background will be the battle background number [id] set in the list.
 * 
 * The priority is normal battle background → terrain tag → region ID → enemy group.
 * 
 * If the battle background is changed using the <battleBack><regionBattleBack><tagBattleBack> tag after changing the battle background with the event command, it will be displayed with priority over the battle background changed with the event command.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 9/17/2024 Ver.1.2.2
 * Fixed an issue where battle backgrounds were not being applied for regions and tags.
 * 7/22/2023 Ver.1.2.1
 * Added a function to synchronize the Y coordinate of the background and the Y coordinate of the monster.
 * 12/11/2022 Ver.1.2.0
 * Changed the specification of the background setting.
 * Changed the display in languages other than Japanese to English.
 * 11/5/2021 Ver.1.1.1
 * Changed the specification of battle background size adjustment.
 * 6/27/2021 Ver.1.1.0
 * Added a function to adjust the position of the background image.
 * Added a function that allows you to change the battle background during battle.
 * 12/2/2020 Ver.1.0.1
 * Fixed a bug that caused an error in test battles.
 * 12/2/2020 Ver.1.0.0
 * First edition.
 * 
 * @command ChangeBattleBackground
 * @desc Change the battle background image. It changes even in battle.
 * @text Battle background change
 * 
 * @arg ChangeBackground
 * @text Battle background change
 * @desc Set the battle background to change.
 * @default 
 * @type struct<SetBattleBackgroundImg>
 * 
 * 
 * @param Setting
 * @text Basic setting
 * @default ------------------------------
 * 
 * @param BackgroundFit
 * @desc Set the battle background display mode.
 * @text Battle background size adjustment
 * @type select
 * @option Normal
 * @value 'Normal'
 * @option Fit
 * @value 'Fit'
 * @option NoResize
 * @value 'NoResize'
 * @default 'Normal'
 * @parent Setting
 * 
 * @param BackgroundRatio
 * @desc Correction magnification of the battle background when "NoResize" is selected. No enlargement at 100
 * @text Correction magnification (only when "NoResize" is selected)
 * @type number
 * @default 100
 * @min 0
 * @parent Setting
 * 
 * @param BackgroundPosition
 * @desc Move the Y coordinate of the battle background.
 * @text Battle background Y position
 * @type number
 * @default 0
 * @min -999
 * @parent Setting
 * 
 * @param BackgroundEnemySynchronization
 * @desc Move the Y coordinate of the battle background and the Y coordinate of the monster together.
 * @text Background and monster Y coordinate synchronization
 * @type boolean
 * @default false
 * @parent Setting
 * 
 * @param TagBattleBackground
 * @text Battle backgrounds for regions, terrain tags, and enemy groups
 * @default ------------------------------
 * 
 * @param BattleBackground
 * @text Battle background setting
 * @desc Set battle backgrounds to use for regions, terrain tags, and enemy groups.
 * @default []
 * @type struct<BattleBackgroundList>[]
 * @parent TagBattleBackground
 * 
 * @param DefaultBattlebackSetting
 * @text Default battle background
 * @default ------------------------------
 * 
 * @param DefaultBattleback
 * @text Default battle background
 * @desc Set default battle background.
 * @default 
 * @type struct<SetBattleBackgroundImg>
 * @parent DefaultBattlebackSetting
 * 
 * @param VehicleBattleback
 * @text vehicle combat background
 * @default ------------------------------
 * 
 * @param BoatBattleback
 * @text Boat battle background
 * @desc Set boat battle background.
 * @default 
 * @type struct<SetBattleBackgroundImg>
 * @parent VehicleBattleback
 * 
 * @param ShipBattleback
 * @text Ship battle background
 * @desc Set ship battle background.
 * @default 
 * @type struct<SetBattleBackgroundImg>
 * @parent VehicleBattleback
 * 
 * @param AirshipBattleback
 * @text Flying boat battle background
 * @desc Set the flying boat battle background.
 * @default 
 * @type struct<SetBattleBackgroundImg>
 * @parent VehicleBattleback
 * 
 * @param AutotileBattlebacksSetting
 * @text Autotile battle background setting
 * @default ------------------------------
 * 
 * @param AutotileBattlebacks
 * @text Autotile battle background
 * @desc Set the autotile battle background.
 * @default []
 * @type struct<AutotileBattlebacksList>[]
 * @parent AutotileBattlebacksSetting
 * 
 */
/*~struct~SetBattleBackgroundImg:
 * 
 * @param Battlebacks1
 * @text battle background 1
 * @desc Set battle background 1.
 * @type file
 * @default 
 * @dir img/battlebacks1
 * 
 * @param Battlebacks2
 * @text Battle background 2
 * @desc Set battle background 2.
 * @type file
 * @default 
 * @dir img/battlebacks2
 * 
 */
/*~struct~AutotileBattlebacksList:
 * 
 * @param BackgroundTarget
 * @desc Select the autotile ID to set the battle background
 * @text Autotile ID
 * @type select
 * @option None
 * @value -1
 * @option AutotileID 0 (Sea)
 * @value 0
 * @option AutotileID 1 (Deep Sea)
 * @value 1
 * @option AutotileID 2 (Rock Shoal)
 * @value 2
 * @option AutotileID 3 (Icebergs)
 * @value 3
 * @option AutotileID 4 (Poison Swamp)
 * @value 4
 * @option AutotileID 5 (Dead Trees)
 * @value 5
 * @option AutotileID 6 (Lava)
 * @value 6
 * @option AutotileID 7 (Lava Bubbles)
 * @value 7
 * @option AutotileID 8 (Pond)
 * @value 8
 * @option AutotileID 9 (Boulder)
 * @value 9
 * @option AutotileID 10 (Frozen Sea)
 * @value 10
 * @option AutotileID 11 (Whirlpool)
 * @value 11
 * @option AutotileID 12 (Land's End)
 * @value 12
 * @option AutotileID 13 (Endless Waterfall)
 * @value 13
 * @option AutotileID 14 (Cloud (Land's End))
 * @value 14
 * @option AutotileID 15 (Cloud)
 * @value 15
 * @option AutotileID 16 (Grassland A)
 * @value 16
 * @option AutotileID 17 (Grassland A (Dark))
 * @value 17
 * @option AutotileID 18 (Grassland B)
 * @value 18
 * @option AutotileID 19 (Grassland B (Dark))
 * @value 19
 * @option AutotileID 20 (Forest)
 * @value 20
 * @option AutotileID 21 (Forest (Conifer))
 * @value 21
 * @option AutotileID 22 (Mountain (Grass))
 * @value 22
 * @option AutotileID 23 (Mountain (Dirt))
 * @value 23
 * @option AutotileID 24 (Wasteland A)
 * @value 24
 * @option AutotileID 25 (Wasteland B)
 * @value 25
 * @option AutotileID 26 (Dirt Field A)
 * @value 26
 * @option AutotileID 27 (Dirt Field B)
 * @value 27
 * @option AutotileID 28 (Forest (Dead Trees))
 * @value 28
 * @option AutotileID 29 (Road (Dirt))
 * @value 29
 * @option AutotileID 30 (Hill (Dirt))
 * @value 30
 * @option AutotileID 31 (Mountain (Sandstone))
 * @value 31
 * @option AutotileID 32 (Desert A)
 * @value 32
 * @option AutotileID 33 (Desert B)
 * @value 33
 * @option AutotileID 34 (Rocky Land A)
 * @value 34
 * @option AutotileID 35 (Rocky Land B (Lava))
 * @value 35
 * @option AutotileID 36 (Forest (Palm Trees))
 * @value 36
 * @option AutotileID 37 (Road (Paved))
 * @value 37
 * @option AutotileID 38 (Mountain (Rock))
 * @value 38
 * @option AutotileID 39 (Mountain (Lava))
 * @value 39
 * @option AutotileID 40 (Snowfield)
 * @value 40
 * @option AutotileID 41 (Mountain (Snow))
 * @value 41
 * @option AutotileID 42 (Clouds)
 * @value 42
 * @option AutotileID 43 (Large Clouds)
 * @value 43
 * @option AutotileID 44 (Forest (Snow))
 * @value 44
 * @option AutotileID 45 (Pit)
 * @value 45
 * @option AutotileID 46 (Hill (Sandstone))
 * @value 46
 * @option AutotileID 47 (Hill (Snow))
 * @value 47
 * @default -1
 * 
 * @param AutotileBattleback
 * @text Autotile battle background
 * @desc Sets the battle background for the specified autotile.
 * @default 
 * @type struct<SetBattleBackgroundImg>
 * 
 */
/*~struct~BattleBackgroundList:
 * 
 * @param battlebacksName
 * @text Name
 * @desc You can name the battle background of any scene so that you can easily recognize it.
 * @type string
 * @default 
 * 
 * @param Battlebackground
 * @text battle background
 * @desc Set the battle background.
 * @default 
 * @type struct<SetBattleBackgroundImg>
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc  戦闘背景変更プラグイン
 * @author NUUN
 * @version 1.2.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 戦闘背景をリージョン、地形タグによって変更及び、敵グループごとに設定することが出来ます。
 * フィールドマップで設定されている戦闘背景を任意の画像に変更できます。()内はデフォルトのオートタイルの名前です。
 * ファイルを指定してない場合は、元の戦闘背景が表示されます。
 * 
 * 
 * 敵グループのバトルイベントの１ページ目に注釈で記入。
 * <battleBack:[id]>
 *  この敵グループの戦闘背景はリストで設定した番号[id]番の戦闘背景になります。
 * 
 * マップのメモ欄に記入
 * <regionBattleBack:[regionId],[id]>
 *  エンカウント時、現在位置のリージョンIDが[regionId]の時、戦闘背景はリストで設定した番号[id]番の戦闘背景になります。
 * <tagBattleBack:[tagId],[id]>
 *  エンカウント時、現在位置の地形タグIDが[tagId]の時、戦闘背景はリストで設定した番号[id]番の戦闘背景になります。
 * 
 * 優先度は通常の戦闘背景→地形タグ→リージョンID→敵グループとなります。
 * 
 * イベントコマンドで戦闘背景を変更した後で、<battleBack><regionBattleBack><tagBattleBack>タグによって戦闘背景が変更された場合、
 * イベントコマンドで変更した戦闘背景よりも優先して表示されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/9/17 Ver.1.2.2
 * リージョン、タグでのバトル背景が適用されていなかった問題を修正。
 * 2023/7/22 Ver.1.2.1
 * 背景Y座標とモンスターのY座標を同期させる機能を追加。
 * 2022/12/11 Ver.1.2.0
 * 背景設定の仕様を変更。
 * 日本語以外での表示を英語表示に変更。
 * 2021/11/5 Ver.1.1.1
 * バトル背景サイズ調整の仕様を変更。
 * 2021/6/27 Ver.1.1.0
 * 背景画像の位置を調整する機能を追加。
 * 戦闘中に戦闘背景を変更できる機能を追加。
 * 2020/12/2 Ver.1.0.1
 * テスト戦闘でエラーが出る不具合を修正。
 * 2020/12/2 Ver.1.0.0
 * 初版
 * 
 * @command ChangeBattleBackground
 * @desc 戦闘の背景画像を変更します。戦闘中でも適用されます。
 * @text 戦闘背景変更
 * 
 * @arg ChangeBackground
 * @text 戦闘背景変更
 * @desc 変更する戦闘背景を設定します。
 * @default 
 * @type struct<SetBattleBackgroundImg>
 * 
 * 
 * @param Setting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param BackgroundFit
 * @desc バトル背景を表示モードを設定します。
 * @text バトル背景サイズ調整
 * @type select
 * @option 通常
 * @value 'Normal'
 * @option 画面に合わせる
 * @value 'Fit'
 * @option サイズ調整しない
 * @value 'NoResize'
 * @default 'Normal'
 * @parent Setting
 * 
 * @param BackgroundRatio
 * @desc NoResize選択時のバトル背景の補正倍率。100で拡大なし
 * @text 補正倍率(NoResize選択時のみ)
 * @type number
 * @default 100
 * @min 0
 * @parent Setting
 * 
 * @param BackgroundPosition
 * @desc バトル背景のY座標を移動させます。
 * @text バトル背景Yポジション
 * @type number
 * @default 0
 * @min -999
 * @parent Setting
 * 
 * @param BackgroundEnemySynchronization
 * @desc バトル背景のY座標とモンスターのY座標を共に移動します。
 * @text 背景とモンスターのY座標同期
 * @type boolean
 * @default false
 * @parent Setting
 * 
 * @param TagBattleBackground
 * @text リージョン、地形タグ、敵グループで使用する戦闘背景
 * @default ------------------------------
 * 
 * @param BattleBackground
 * @text 戦闘背景設定
 * @desc リージョン、地形タグ、敵グループで使用する戦闘背景を設定します。
 * @default []
 * @type struct<BattleBackgroundList>[]
 * @parent TagBattleBackground
 * 
 * @param DefaultBattlebackSetting
 * @text デフォルトの戦闘背景
 * @default ------------------------------
 * 
 * @param DefaultBattleback
 * @text デフォルト戦闘背景
 * @desc デフォルトの戦闘背景を設定します。
 * @default 
 * @type struct<SetBattleBackgroundImg>
 * @parent DefaultBattlebackSetting
 * 
 * @param VehicleBattleback
 * @text 乗り物の戦闘背景
 * @default ------------------------------
 * 
 * @param BoatBattleback
 * @text ボート戦闘背景
 * @desc ボートの戦闘背景を設定します。
 * @default 
 * @type struct<SetBattleBackgroundImg>
 * @parent VehicleBattleback
 * 
 * @param ShipBattleback
 * @text 船戦闘背景
 * @desc 船の戦闘背景を設定します。
 * @default 
 * @type struct<SetBattleBackgroundImg>
 * @parent VehicleBattleback
 * 
 * @param AirshipBattleback
 * @text 飛行艇戦闘背景
 * @desc 飛行艇の戦闘背景を設定します。
 * @default 
 * @type struct<SetBattleBackgroundImg>
 * @parent VehicleBattleback
 * 
 * @param AutotileBattlebacksSetting
 * @text オートタイル戦闘背景設定
 * @default ------------------------------
 * 
 * @param AutotileBattlebacks
 * @text オートタイル戦闘背景
 * @desc オートタイルの戦闘背景を設定します。
 * @default []
 * @type struct<AutotileBattlebacksList>[]
 * @parent AutotileBattlebacksSetting
 * 
 */
/*~struct~SetBattleBackgroundImg:ja
 * 
 * @param Battlebacks1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * 
 * @param Battlebacks2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * 
 */
/*~struct~AutotileBattlebacksList:ja
 * 
 * @param BackgroundTarget
 * @desc 戦闘背景を設定するオートタイルIDを選択します。
 * @text オートタイルID
 * @type select
 * @option なし
 * @value -1
 * @option オートタイルID 0 （海）
 * @value 0
 * @option オートタイルID 1 （深い海）
 * @value 1
 * @option オートタイルID 2 （岩礁）
 * @value 2
 * @option オートタイルID 3 （氷山）
 * @value 3
 * @option オートタイルID 4 （毒の沼）
 * @value 4
 * @option オートタイルID 5 （枯れ木）
 * @value 5
 * @option オートタイルID 6 （溶岩）
 * @value 6
 * @option オートタイルID 7 （溶岩の泡）
 * @value 7
 * @option オートタイルID 8 （池）
 * @value 8
 * @option オートタイルID 9 （岩）
 * @value 9
 * @option オートタイルID 10 （凍った海）
 * @value 10
 * @option オートタイルID 11 （渦）
 * @value 11
 * @option オートタイルID 12 （大地の境界）
 * @value 12
 * @option オートタイルID 13 （下界に落ちる滝）
 * @value 13
 * @option オートタイルID 14 （雲（大地の境界））
 * @value 14
 * @option オートタイルID 15 （雲）
 * @value 15
 * @option オートタイルID 16 （草原A）
 * @value 16
 * @option オートタイルID 17 （草原A（濃））
 * @value 17
 * @option オートタイルID 18 （草原B）
 * @value 18
 * @option オートタイルID 19 （草原B（濃））
 * @value 19
 * @option オートタイルID 20 （森）
 * @value 20
 * @option オートタイルID 21 （森（針葉樹））
 * @value 21
 * @option オートタイルID 22 （山（草））
 * @value 22
 * @option オートタイルID 23 （山（土））
 * @value 23
 * @option オートタイルID 24 （荒れ地A）
 * @value 24
 * @option オートタイルID 25 （荒れ地B）
 * @value 25
 * @option オートタイルID 26 （土肌A）
 * @value 26
 * @option オートタイルID 27 （土肌B）
 * @value 27
 * @option オートタイルID 28 （森（枯れ木））
 * @value 28
 * @option オートタイルID 29 （道（土））
 * @value 29
 * @option オートタイルID 30 （丘（土））
 * @value 30
 * @option オートタイルID 31 （山（砂岩））
 * @value 31
 * @option オートタイルID 32 （砂漠A）
 * @value 32
 * @option オートタイルID 33 （砂漠B）
 * @value 33
 * @option オートタイルID 34 （岩地A）
 * @value 34
 * @option オートタイルID 35 （岩地B（溶岩））
 * @value 35
 * @option オートタイルID 36 （森（ヤシの木））
 * @value 36
 * @option オートタイルID 37 （道（舗装））
 * @value 37
 * @option オートタイルID 38 （山（岩））
 * @value 38
 * @option オートタイルID 39 （山（溶岩））
 * @value 39
 * @option オートタイルID 40 （雪原）
 * @value 40
 * @option オートタイルID 41 （山（雪））
 * @value 41
 * @option オートタイルID 42 （雲）
 * @value 42
 * @option オートタイルID 43 （大きな雲）
 * @value 43
 * @option オートタイルID 44 （森（雪））
 * @value 44
 * @option オートタイルID 45 （穴）
 * @value 45
 * @option オートタイルID 46 （丘（砂岩））
 * @value 46
 * @option オートタイルID 47 （丘（雪））
 * @value 47
 * @default -1
 * 
 * @param AutotileBattleback
 * @text オートタイル戦闘背景
 * @desc 指定のオートタイルの戦闘背景を設定します。
 * @default 
 * @type struct<SetBattleBackgroundImg>
 * 
 */
/*~struct~BattleBackgroundList:ja
 * 
 * @param battlebacksName
 * @text 名称
 * @desc どのシーンの戦闘背景か認識しやすいように名前を付けられます。リスト識別用のパラメータなので入力しなくても問題ありません。
 * @type string
 * @default 
 * 
 * @param Battlebackground
 * @text 戦闘背景
 * @desc 戦闘背景を設定します。
 * @default 
 * @type struct<SetBattleBackgroundImg>
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BattleBackgroundEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BattleBackgroundEX');
const BackgroundFit = eval(parameters['BackgroundFit']) || 'Normal';
const BackgroundRatio = Number(parameters['BackgroundRatio'] || 100);
const BackgroundPosition = Number(parameters['BackgroundPosition'] || 0);
const BattleBackground = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['BattleBackground'])) : [];
const DefaultBattleback = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefaultBattleback'])) : null;
const BoatBattleback = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['BoatBattleback'])) :  null;
const ShipBattleback = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ShipBattleback'])) :  null;
const AirshipBattleback = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['AirshipBattleback'])) :  null;
const AutotileBattlebacks = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['AutotileBattlebacks'])) : [];
const BackgroundEnemySynchronization = eval(parameters['BackgroundEnemySynchronization'] || 'false');

const pluginName = "NUUN_BattleBackgroundEX";
PluginManager.registerCommand(pluginName, 'ChangeBattleBackground', args => {
  changeBattleBackground(args);
});

function changeBattleBackground(args) {
  const background = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(args.ChangeBackground)) : [];
  BattleManager.nuun_ChangeBattleback(getBattlebacks1(background), getBattlebacks2(background));
  $gameTemp.BattleBackgroundRefresh = true;
};

BattleManager.nuun_ChangeBattleback = function(battleback1Name, battleback2Name) {
  this._changeBattleback1Name = battleback1Name;
  this._changeBattleback2Name = battleback2Name;
};

function getBattlebacks1(method) {
  return method ? method.Battlebacks1 : null;
};

function getBattlebacks2(method) {
  return method ? method.Battlebacks2 : null;
};

const _Spriteset_Battle_updateBattleback = Spriteset_Battle.prototype.updateBattleback;
Spriteset_Battle.prototype.updateBattleback = function() {
  _Spriteset_Battle_updateBattleback.call(this);
  if ($gameTemp.BattleBackgroundRefresh) {
    this._back1Sprite.bitmap = this._back1Sprite.battleback1Bitmap();
    this._back2Sprite.bitmap = this._back2Sprite.battleback2Bitmap();
    BattleManager.nuun_ChangeBattleback(null, null);
    $gameTemp.BattleBackgroundRefresh = false;
  }
};

const _Game_Enemy_screenY = Game_Enemy.prototype.screenY;
Game_Enemy.prototype.screenY = function() {
    return _Game_Enemy_screenY.call(this) + (BackgroundEnemySynchronization ? BackgroundPosition : 0);
};

const _Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
  _Game_Troop_setup.call(this, troopId);
  this.battleBackSetup();
};

Game_Troop.prototype.battleBackSetup = function() {
  let battleback1Name = null;
  let battleback2Name = null;
  let battleback1 = null;
  let battleback2 = null;
  const battleBack = this.battleBackTroopTag();
  if(($gameMap.regionIdBattleBack.length > 0 || $gameMap.mapTagIdBattleBack.length > 0) && !battleBack) {
    const x = $gamePlayer._x;
    const y = $gamePlayer._y;
    const regionBattleback = $gameMap.regionBattleBackSetup(x, y);
    const mapTagBattleback = $gameMap.mapTagBattleBackSetup(x, y);
    if (regionBattleback) {
      battleback1 = getBattlebacks1(regionBattleback);
      battleback2 = getBattlebacks2(regionBattleback);
    } else if (mapTagBattleback) {
      battleback1 = getBattlebacks1(mapTagBattleback);
      battleback2 = getBattlebacks2(mapTagBattleback);
    }
    battleback1Name = battleback1 ? battleback1 : battleback1Name;
    battleback2Name = battleback2 ? battleback2 : battleback2Name;
  }
  if(battleBack) {
    battleback1 = getBattlebacks1(battleBack.Battlebackground);
    battleback2 = getBattlebacks2(battleBack.Battlebackground);
    battleback1Name = battleback1 ? battleback1 : battleback1Name;
    battleback2Name = battleback2 ? battleback2 : battleback2Name;
  }
  $gameMap.NUUN_battleback1Name = battleback1Name;
  $gameMap.NUUN_battleback2Name = battleback2Name;
};

Game_Troop.prototype.battleBackTroopTag = function() {
  const re = /<(?:battleBack):\s*(\d+)>/;
  const pages = this.troop().pages[0];
  let list = null;
  pages.list.forEach(tag => {
    if ((tag.code === 108 || tag.code === 408) && !list) {
      let match = re.exec(tag.parameters[0]);
      if (match) {
        list = this.battleBackRequest(match[1]);
      }
    }
  });
  return list;
};

Game_Troop.prototype.battleBackRequest = function(data) {
  const list = data.split(',').map(Number);
  const battleback = BattleBackground[Number(list[0]) - 1];
  return battleback;
};

const _Game_Map_initialize  = Game_Map.prototype.initialize ;
Game_Map.prototype.initialize = function() {
  _Game_Map_initialize.call(this);
  this.regionIdBattleBack = [];
  this.mapTagIdBattleBack = [];
};

const _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  _Game_Map_setup.call(this, mapId);
  this.battleBackSetup()
};

Game_Map.prototype.battleBackSetup = function() {
  this.regionIdBattleBack = this.regionBattleBack();
  this.mapTagIdBattleBack = this.mapTagBattleBack();
};

Game_Map.prototype.regionBattleBack = function() {
  const reRegion = /<(?:regionBattleBack):\s*(\d+(?:\s*,\s*\d+)*)>/g;
  const list = [];
	while(true) {
    let match = reRegion.exec($dataMap.note);
		if (match) {
        let data = match[1].split(',').map(Number);
        if(data[0] > 0 && data[1] > 0) {
            const back = BattleBackground[Number(data[1]) - 1];
            if (back.Battlebackground) {
                const battlebackground = back.Battlebackground;
                list.push({Battlebacks1:battlebackground.Battlebacks1, Battlebacks2:battlebackground.Battlebacks2, regionId:data[0]});
            }
        }
    } else {
      return list;
    }
  }
};

Game_Map.prototype.mapTagBattleBack = function() {
  const reTag = /<(?:tagBattleBack):\s*(\d+(?:\s*,\s*\d+)*)>/g;
  const list = [];
	while(true) {
    let match = reTag.exec($dataMap.note);
		if (match) {
      let data = match[1].split(',').map(Number);
      if(data[0] > 0 && data[1] > 0) {
        const back = BattleBackground[Number(data[1]) - 1];
        if (back.Battlebackground) {
            const battlebackground = back.Battlebackground;
            list.push({Battlebacks1:battlebackground.Battlebacks1, Battlebacks2:battlebackground.Battlebacks2, regionId:data[0]});
        }
      }
    } else {
      return list;
    }
	}
};

Game_Map.prototype.regionBattleBackSetup = function(x, y) {
  const regionId = this.regionId(x, y);
  return this.regionIdBattleBack.find(region => region.regionId === regionId);
};

Game_Map.prototype.mapTagBattleBackSetup = function(x, y) {
  const mapTag = this.terrainTag(x, y);
  return this.mapTagIdBattleBack.find(region => region.tagId === mapTag);
};

const _Game_Map_battleback1Name = Game_Map.prototype.battleback1Name;
Game_Map.prototype.battleback1Name = function() {
  return $gameMap.NUUN_battleback1Name ? $gameMap.NUUN_battleback1Name : _Game_Map_battleback1Name.call(this);
};

const _Game_Map_battleback2Name = Game_Map.prototype.battleback2Name;
Game_Map.prototype.battleback2Name = function() {
  return $gameMap.NUUN_battleback2Name ? $gameMap.NUUN_battleback2Name : _Game_Map_battleback2Name.call(this);
};

const _Sprite_Battleback_battleback1Name = Sprite_Battleback.prototype.battleback1Name;
Sprite_Battleback.prototype.battleback1Name = function() {
  if ($gameTemp.BattleBackgroundRefresh && BattleManager._changeBattleback1Name) {
    return BattleManager._changeBattleback1Name;
  } else if (BattleManager.isBattleTest() && $gameMap.NUUN_battleback1Name) {
    return $gameMap.battleback1Name();
  } else {
    return _Sprite_Battleback_battleback1Name.call(this)
  }
};

const _Sprite_Battleback_battleback2Name = Sprite_Battleback.prototype.battleback2Name;
Sprite_Battleback.prototype.battleback2Name = function() {
  if ($gameTemp.BattleBackgroundRefresh && BattleManager._changeBattleback2Name) {
    return BattleManager._changeBattleback2Name;
  } else if (BattleManager.isBattleTest() && $gameMap.NUUN_battleback2Name) {
    return $gameMap.battleback2Name();
  } else {
    return _Sprite_Battleback_battleback2Name.call(this)
  }
};

const _Sprite_Battleback_terrainBattleback1Name = Sprite_Battleback.prototype.terrainBattleback1Name;
Sprite_Battleback.prototype.terrainBattleback1Name = function(type) {
  const data = AutotileBattlebacks.find(battleback => battleback.BackgroundTarget === type);
  if (data) {
    return getBattlebacks1(data.AutotileBattleback);
  } else {
    return _Sprite_Battleback_terrainBattleback1Name.call(this, type);
  }
};

const _Sprite_Battleback_terrainBattleback2Name = Sprite_Battleback.prototype.terrainBattleback2Name;
Sprite_Battleback.prototype.terrainBattleback2Name = function(type) {
  const data = AutotileBattlebacks.find(battleback => battleback.BackgroundTarget === type);
  if (data) {
    return getBattlebacks2(data.AutotileBattleback);
  } else {
    return _Sprite_Battleback_terrainBattleback2Name.call(this, type);
  }
};

const _Sprite_Battleback_defaultBattleback1Name = Sprite_Battleback.prototype.defaultBattleback1Name;
Sprite_Battleback.prototype.defaultBattleback1Name = function() {
  const battleback = getBattlebacks1(DefaultBattleback);
  return battleback ? battleback : _Sprite_Battleback_defaultBattleback1Name.call(this);
};

const _Sprite_Battleback_defaultBattleback2Name = Sprite_Battleback.prototype.defaultBattleback2Name
Sprite_Battleback.prototype.defaultBattleback2Name = function() {
  const battleback = getBattlebacks2(DefaultBattleback);
  return battleback ? battleback : _Sprite_Battleback_defaultBattleback2Name.call(this);
};

const _Sprite_Battleback_shipBattleback1Name = Sprite_Battleback.prototype.shipBattleback1Name;
Sprite_Battleback.prototype.shipBattleback1Name = function() {
  let battleback = null;
  if ($gamePlayer.isInBoat()) {
    battleback = getBattlebacks1(BoatBattleback);
  } else if ($gamePlayer.isInShip()) {
    battleback = getBattlebacks1(ShipBattleback);
  } else if ($gamePlayer.isInAirship()){
    battleback = getBattlebacks1(AirshipBattleback);
  }
  return battleback ? battleback : _Sprite_Battleback_shipBattleback1Name.call(this);
};

const _Sprite_Battleback_shipBattleback2Name = Sprite_Battleback.prototype.shipBattleback2Name;
Sprite_Battleback.prototype.shipBattleback2Name = function() {
  let battleback = null;
  if ($gamePlayer.isInBoat()) {
    battleback = getBattlebacks2(BoatBattleback);
  } else if ($gamePlayer.isInShip()) {
    battleback = getBattlebacks2(ShipBattleback);
  } else if ($gamePlayer.isInAirship()){
    battleback = getBattlebacks2(AirshipBattleback);
  }
  return battleback ? battleback : _Sprite_Battleback_shipBattleback2Name.call(this);
};

const _Sprite_Battleback_adjustPosition = Sprite_Battleback.prototype.adjustPosition;
Sprite_Battleback.prototype.adjustPosition = function() {
  _Sprite_Battleback_adjustPosition.call(this);
  if (BackgroundFit === 'Fit') {
    this.width = this.bitmap.width;
    this.height = this.bitmap.height;
    this.x = 0;
    this.scale.x = Graphics.width / this.bitmap.width;
    this.scale.y = Graphics.height / this.bitmap.height;
  } else if (BackgroundFit === 'NoResize') {
    this.width = this.bitmap.width;
    this.height = this.bitmap.height;
    const scale = BackgroundRatio / 100;
    this.x = (Graphics.width - this.bitmap.width * scale) / 2;
    this.scale.x = 1.0 * scale;
    this.scale.y = 1.0 * scale;
  }
  this.y += BackgroundPosition;
};

})();