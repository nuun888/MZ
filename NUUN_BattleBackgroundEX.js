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
 * @plugindesc  戦闘背景変更プラグイン
 * @author NUUN
 * @version 1.1.1
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
 * @desc 戦闘中に背景画像を変更します。
 * @text 戦闘中戦闘背景変更
 * 
 * @arg ChangeBackground1
 * @text 変更戦闘背景１
 * @desc 変更する戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * 
 * @arg ChangeBackground2
 * @text 変更戦闘背景２
 * @desc 変更する戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * 
 * 
 * @param Setting
 * @text 基本設定
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
 * @desc NoResize選択時のバトル背景の補正倍率。
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
 * @param TagBattleBackground
 * @text リージョン、地形タグ、敵グループで使用する戦闘背景
 * 
 * @param BattleBackground
 * @text 戦闘背景設定
 * @desc リージョン、地形タグ、敵グループで使用する戦闘背景を設定します。
 * @default []
 * @type struct<BattleBackgroundList>[]
 * @parent TagBattleBackground
 * 
 * @param DefaultBattleback
 * @text デフォルトの戦闘背景
 * 
 * @param DefaultBattleback1
 * @text デフォルト戦闘背景１
 * @desc デフォルトの戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent DefaultBattleback
 * 
 * @param DefaultBattleback2
 * @text デフォルト戦闘背景２
 * @desc デフォルトの戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent DefaultBattleback
 * 
 * @param VehicleBattleback
 * @text 乗り物の戦闘背景
 * 
 * @param BoatBattleback1
 * @text 船戦闘背景１
 * @desc 船の戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent VehicleBattleback
 * 
 * @param BoatBattleback2
 * @text 船戦闘背景２
 * @desc 船の戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent VehicleBattleback
 * 
 * @param ShipBattleback1
 * @text 帆船戦闘背景１
 * @desc 帆船の戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent VehicleBattleback
 * 
 * @param ShipBattleback2
 * @text 帆船戦闘背景２
 * @desc 帆船の戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent VehicleBattleback
 * 
 * @param AirshipBattleback1
 * @text 飛行艇戦闘背景１
 * @desc 飛行艇の戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent VehicleBattleback
 * 
 * @param AirshipBattleback2
 * @text 飛行艇戦闘背景２
 * @desc 飛行艇の戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent VehicleBattleback
 * 
 * @param AutotileBattlebacks
 * @text オートタイル戦闘背景設定
 * 
 * @param AutotileBattlebacks0
 * @text オートタイルID 0 （海）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks0_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks0
 * 
 * @param battlebacks0_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks0
 * 
 * @param AutotileBattlebacks1
 * @text オートタイルID 1 （深い海）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks1_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks1
 * 
 * @param battlebacks1_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks1
 * 
 * @param AutotileBattlebacks2
 * @text オートタイルID 2 （岩礁）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks2_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks2
 * 
 * @param battlebacks2_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks2
 * 
 * @param AutotileBattlebacks3
 * @text オートタイルID 3 （氷山）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks3_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks3
 * 
 * @param battlebacks3_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks3
 * 
 * @param AutotileBattlebacks4
 * @text オートタイルID 4 （毒の沼）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks4_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks4
 * 
 * @param battlebacks4_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks4
 * 
 * @param AutotileBattlebacks5
 * @text オートタイルID 5 （枯れ木）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks5_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks5
 * 
 * @param battlebacks5_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks5
 * 
 * @param AutotileBattlebacks6
 * @text オートタイルID 6 （溶岩）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks6_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks6
 * 
 * @param battlebacks6_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks6
 * 
 * @param AutotileBattlebacks7
 * @text オートタイルID 7 （溶岩の泡）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks7_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks7
 * 
 * @param battlebacks7_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks7
 * 
 * @param AutotileBattlebacks8
 * @text オートタイルID 8 （池）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks8_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks8
 * 
 * @param battlebacks8_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks8
 * 
 * @param AutotileBattlebacks9
 * @text オートタイルID 9 （岩）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks9_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks9
 * 
 * @param battlebacks9_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks9
 * 
 * @param AutotileBattlebacks10
 * @text オートタイルID 10 （凍った海）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks10_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks10
 * 
 * @param battlebacks10_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks10
 * 
 * @param AutotileBattlebacks11
 * @text オートタイルID 11 （渦）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks11_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks11
 * 
 * @param battlebacks11_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks11
 * 
 * @param AutotileBattlebacks12
 * @text オートタイルID 12 （大地の境界）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks12_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks12
 * 
 * @param battlebacks12_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks12
 * 
 * @param AutotileBattlebacks13
 * @text オートタイルID 13 （下界に落ちる滝）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks13_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks13
 * 
 * @param battlebacks13_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks13
 * 
 * @param AutotileBattlebacks14
 * @text オートタイルID 14（雲（大地の境界））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks14_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks14
 * 
 * @param battlebacks14_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks14
 * 
 * @param AutotileBattlebacks15
 * @text オートタイルID 15 （雲）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks15_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks15
 * 
 * @param battlebacks15_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks15
 * 
 * @param AutotileBattlebacks16
 * @text オートタイルID 16 （草原A）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks16_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks16
 * 
 * @param battlebacks16_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks16
 * 
 * @param AutotileBattlebacks17
 * @text オートタイルID 17 （草原A（濃））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks17_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks17
 * 
 * @param battlebacks17_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks17
 * 
 * @param AutotileBattlebacks18
 * @text オートタイルID 18 （草原B）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks18_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks18
 * 
 * @param battlebacks18_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks18
 * 
 * @param AutotileBattlebacks19
 * @text オートタイルID 19 （草原B（濃））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks19_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks19
 * 
 * @param battlebacks19_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks19
 * 
 * @param AutotileBattlebacks20
 * @text オートタイルID 20 （森）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks20_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks20
 * 
 * @param battlebacks20_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks20
 * 
 * @param AutotileBattlebacks21
 * @text オートタイルID 21 （森（針葉樹））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks21_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks21
 * 
 * @param battlebacks21_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks21
 * 
 * @param AutotileBattlebacks22
 * @text オートタイルID 22 （山（草））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks22_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks22
 * 
 * @param battlebacks22_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks22
 * 
 * @param AutotileBattlebacks23
 * @text オートタイルID 23 （山（土））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks23_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks23
 * 
 * @param battlebacks23_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks23
 * 
 * @param AutotileBattlebacks24
 * @text オートタイルID 24 （荒れ地A）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks24_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks24
 * 
 * @param battlebacks24_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks24
 * 
 * @param AutotileBattlebacks25
 * @text オートタイルID 25 （荒れ地B）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks25_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks25
 * 
 * @param battlebacks25_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks25
 * 
 * @param AutotileBattlebacks26
 * @text オートタイルID 26 （土肌A）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks26_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks26
 * 
 * @param battlebacks26_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks26
 * 
 * @param AutotileBattlebacks27
 * @text オートタイルID 27 （土肌B）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks27_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks27
 * 
 * @param battlebacks27_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks27
 * 
 * @param AutotileBattlebacks28
 * @text オートタイルID 28 （森（枯れ木））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks28_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks28
 * 
 * @param battlebacks28_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks28
 * 
 * @param AutotileBattlebacks29
 * @text オートタイルID 29 （道（土））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks29_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks29
 * 
 * @param battlebacks29_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks29
 * 
 * @param AutotileBattlebacks30
 * @text オートタイルID 30 （丘（土））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks30_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks30
 * 
 * @param battlebacks30_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default Cliff
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks30
 * 
 * @param AutotileBattlebacks31
 * @text オートタイルID 31 （山（砂岩））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks31_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks31
 * 
 * @param battlebacks31_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks31
 * 
 * @param AutotileBattlebacks32
 * @text オートタイルID 32 （砂漠A）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks32_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks32
 * 
 * @param battlebacks32_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks32
 * 
 * @param AutotileBattlebacks33
 * @text オートタイルID 33 （砂漠B）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks33_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks33
 * 
 * @param battlebacks33_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks33
 * 
 * @param AutotileBattlebacks34
 * @text オートタイルID 34 （岩地A）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks34_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks34
 * 
 * @param battlebacks34_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks34
 * 
 * @param AutotileBattlebacks35
 * @text オートタイルID 35 （岩地B（溶岩））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks35_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks35
 * 
 * @param battlebacks35_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks35
 * 
 * @param AutotileBattlebacks36
 * @text オートタイルID 36 （森（ヤシの木））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks36_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks36
 * 
 * @param battlebacks36_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks36
 * 
 * @param AutotileBattlebacks37
 * @text オートタイルID 37（道（舗装））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks37_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks37
 * 
 * @param battlebacks37_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks37
 * 
 * @param AutotileBattlebacks38
 * @text オートタイルID 38（山（岩））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks38_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks38
 * 
 * @param battlebacks38_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks38
 * 
 * @param AutotileBattlebacks39
 * @text オートタイルID 39（山（溶岩））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks39_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks39
 * 
 * @param battlebacks39_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks39
 * 
 * @param AutotileBattlebacks40
 * @text オートタイルID 40（雪原）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks40_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks40
 * 
 * @param battlebacks40_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks40
 * 
 * @param AutotileBattlebacks41
 * @text オートタイルID 41（山（雪））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks41_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks41
 * 
 * @param battlebacks41_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks41
 * 
 * @param AutotileBattlebacks42
 * @text オートタイルID 42（雲）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks42_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks42
 * 
 * @param battlebacks42_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks42
 * 
 * @param AutotileBattlebacks43
 * @text オートタイルID 43（大きな雲）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks43_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks43
 * 
 * @param battlebacks43_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks43
 * 
 * @param AutotileBattlebacks44
 * @text オートタイルID 44（森（雪））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks44_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks44
 * 
 * @param battlebacks44_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks44
 * 
 * @param AutotileBattlebacks45
 * @text オートタイルID 45（穴）
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks45_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks45
 * 
 * @param battlebacks45_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks45
 * 
 * @param AutotileBattlebacks46
 * @text オートタイルID 46（丘（砂岩））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks46_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks46
 * 
 * @param battlebacks46_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks46
 * 
 * @param AutotileBattlebacks47
 * @text オートタイルID 47（丘（雪））
 * @parent AutotileBattlebacks
 * 
 * @param battlebacks47_1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * @parent AutotileBattlebacks47
 * 
 * @param battlebacks47_2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * @parent AutotileBattlebacks47
 * 
 */
/*~struct~BattleBackgroundList:
 * 
 * @param battlebacksName
 * @text 名称
 * @desc どのシーンの戦闘背景か認識しやすいように名前を付けられます。リスト識別用のパラメータなので入力しなくても問題ありません。
 * @type string
 * @default 
 * 
 * @param battlebacks1
 * @text 戦闘背景１
 * @desc 戦闘背景１を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks1
 * 
 * @param battlebacks2
 * @text 戦闘背景２
 * @desc 戦闘背景２を設定します。
 * @type file
 * @default 
 * @dir img/battlebacks2
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BattleBackgroundEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BattleBackgroundEX');
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

const pluginName = "NUUN_BattleBackgroundEX";
PluginManager.registerCommand(pluginName, 'ChangeBattleBackground', args => {
  changeBattleBackground(args);
});

function changeBattleBackground(args) {
  BattleManager.nuun_ChangeBattleback(args.ChangeBackground1, args.ChangeBackground2);
  $gameTemp.BattleBackgroundRefresh = true;
};

BattleManager.nuun_ChangeBattleback = function(battleback1Name, battleback2Name) {
  this._changeBattleback1Name = battleback1Name;
  this._changeBattleback2Name = battleback2Name;
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

const _Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
  _Game_Troop_setup.call(this, troopId);
  this.battleBackSetup();
};

Game_Troop.prototype.battleBackSetup = function() {
  let battleback1Name = null;
  let battleback2Name = null;
  const battleBack = this.battleBackTroopTag();
  if(($gameMap.regionIdBattleBack.length > 0 || $gameMap.mapTagIdBattleBack.length > 0) && !battleBack) {
    const x = $gamePlayer._x;
    const y = $gamePlayer._y;
    const regionBattleback = $gameMap.regionBattleBackSetup(x, y);
    const mapTagBattleback = $gameMap.mapTagBattleBackSetup(x, y);
    if (regionBattleback) {
      battleback1Name = regionBattleback.battlebacks1 ? regionBattleback.battlebacks1 : battleback1Name;
      battleback2Name = regionBattleback.battlebacks2 ? regionBattleback.battlebacks2 : battleback2Name;
    } else if (mapTagBattleback) {
      battleback1Name = mapTagBattleback.battlebacks1 ? mapTagBattleback.battlebacks1 : battleback1Name;
      battleback2Name = mapTagBattleback.battlebacks2 ? mapTagBattleback.battlebacks2 : battleback2Name;
    }
  }
  if(battleBack) {
    battleback1Name = battleBack.battlebacks1 ? battleBack.battlebacks1 : battleback1Name;
    battleback2Name = battleBack.battlebacks2 ? battleBack.battlebacks2 : battleback2Name;
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
}

Game_Troop.prototype.battleBackRequest = function(data) {
  const list = data.split(',').map(Number);
  const battleback = param.BattleBackground[Number(list[0]) - 1];
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
        const back = param.BattleBackground[Number(data[1]) - 1];
        list.push({battlebacks1:back.battlebacks1, battlebacks2:back.battlebacks2, regionId:data[0]});
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
        const back = param.BattleBackground[Number(data[1]) - 1];
        list.push({battlebacks1:back.battlebacks1, battlebacks2:back.battlebacks2, tagId:data[0]});
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

Sprite_Battleback.prototype.terrainBattleback1Name = function(type) {
  switch (type) {
    case 0:
      return param.battlebacks0_1 ? param.battlebacks0_1 : null;
    case 1:
      return param.battlebacks1_1 ? param.battlebacks1_1 : null;
    case 2:
      return param.battlebacks2_1 ? param.battlebacks2_1 : null;
    case 3:
      return param.battlebacks3_1 ? param.battlebacks3_1 : null;
    case 4:
      return param.battlebacks4_1 ? param.battlebacks4_1 : "PoisonSwamp";
    case 5:
      return param.battlebacks5_1 ? param.battlebacks5_1 : "PoisonSwamp";
    case 6:
      return param.battlebacks6_1 ? param.battlebacks6_1 : null;
    case 7:
      return param.battlebacks7_1 ? param.battlebacks7_1 : null;
    case 8:
      return param.battlebacks8_1 ? param.battlebacks8_1 : null;
    case 9:
      return param.battlebacks9_1 ? param.battlebacks9_1 : null;
    case 10:
      return param.battlebacks10_1 ? param.battlebacks10_1 : null;
    case 11:
      return param.battlebacks11_1 ? param.battlebacks11_1 : null;
    case 12:
      return param.battlebacks12_1 ? param.battlebacks12_1 : null;
    case 13:
      return param.battlebacks13_1 ? param.battlebacks13_1 : null;
    case 14:
      return param.battlebacks14_1 ? param.battlebacks14_1 : null;
    case 15:
      return param.battlebacks15_1 ? param.battlebacks15_1 : null;
    case 16:
      return param.battlebacks16_1 ? param.battlebacks16_1 : null;
    case 17:
      return param.battlebacks17_1 ? param.battlebacks17_1 : null;
    case 18:
      return param.battlebacks18_1 ? param.battlebacks18_1 : null;
    case 19:
      return param.battlebacks19_1 ? param.battlebacks19_1 : null;
    case 20:
      return param.battlebacks20_1 ? param.battlebacks20_1 : null;
    case 21:
      return param.battlebacks21_1 ? param.battlebacks21_1 : null;
    case 22:
      return param.battlebacks22_1 ? param.battlebacks22_1 : null;
    case 23:
      return param.battlebacks23_1 ? param.battlebacks23_1 : null;
    case 24:
      return param.battlebacks24_1 ? param.battlebacks24_1 : "Wasteland";
    case 25:
      return param.battlebacks25_1 ? param.battlebacks25_1 : "Wasteland";
    case 26:
      return param.battlebacks26_1 ? param.battlebacks26_1 : "DirtField";
    case 27:
      return param.battlebacks27_1 ? param.battlebacks27_1 : "DirtField";
    case 28:
      return param.battlebacks28_1 ? param.battlebacks28_1 : null;
    case 29:
      return param.battlebacks29_1 ? param.battlebacks29_1 : null;
    case 30:
      return param.battlebacks30_1 ? param.battlebacks30_1 : null;
    case 31:
      return param.battlebacks31_1 ? param.battlebacks31_1 : null;
    case 32:
      return param.battlebacks32_1 ? param.battlebacks32_1 : "Desert";
    case 33:
      return param.battlebacks33_1 ? param.battlebacks33_1 : "Desert";
    case 34:
      return param.battlebacks34_1 ? param.battlebacks34_1 : "Lava1";
    case 35:
      return param.battlebacks35_1 ? param.battlebacks35_1 : "Lava2";
    case 36:
      return param.battlebacks36_1 ? param.battlebacks36_1 : null;
    case 37:
      return param.battlebacks37_1 ? param.battlebacks37_1 : null;
    case 38:
      return param.battlebacks38_1 ? param.battlebacks38_1 : null;
    case 39:
      return param.battlebacks39_1 ? param.battlebacks39_1 : null;
    case 40:
      return param.battlebacks40_1 ? param.battlebacks40_1 : "Snowfield";
    case 41:
      return param.battlebacks41_1 ? param.battlebacks41_1 : "Snowfield";
    case 42:
      return param.battlebacks42_1 ? param.battlebacks42_1 : "Clouds";
    case 43:
      return param.battlebacks43_1 ? param.battlebacks43_1 : null;
    case 44:
      return param.battlebacks44_1 ? param.battlebacks44_1 : null;
    case 45:
      return param.battlebacks45_1 ? param.battlebacks45_1 : null;
    case 46:
      return param.battlebacks46_1 ? param.battlebacks46_1 : null;
    case 47:
      return param.battlebacks47_1 ? param.battlebacks47_1 : null;
  }
};

Sprite_Battleback.prototype.terrainBattleback2Name = function(type) {
  switch (type) {
    case 0:
      return param.battlebacks0_2 ? param.battlebacks0_2 : null;
    case 1:
      return param.battlebacks1_2 ? param.battlebacks1_2 : null;
    case 2:
      return param.battlebacks2_2 ? param.battlebacks2_2 : null;
    case 3:
      return param.battlebacks3_2 ? param.battlebacks3_2 : null;
    case 4:
      return param.battlebacks4_2 ? param.battlebacks4_2 : "PoisonSwamp";
    case 5:
      return param.battlebacks5_2 ? param.battlebacks5_2 : "PoisonSwamp";
    case 6:
      return param.battlebacks6_2 ? param.battlebacks6_2 : null;
    case 7:
      return param.battlebacks7_2 ? param.battlebacks7_2 : null;
    case 8:
      return param.battlebacks8_2 ? param.battlebacks8_2 : null;
    case 9:
      return param.battlebacks9_2 ? param.battlebacks9_2 : null;
    case 10:
      return param.battlebacks10_2 ? param.battlebacks10_2 : null;
    case 11:
      return param.battlebacks11_2 ? param.battlebacks11_2 : null;
    case 12:
      return param.battlebacks12_2 ? param.battlebacks12_2 : null;
    case 13:
      return param.battlebacks13_2 ? param.battlebacks13_1 : null;
    case 14:
      return param.battlebacks14_2 ? param.battlebacks14_2 : null;
    case 15:
      return param.battlebacks15_2 ? param.battlebacks15_2 : null;
    case 16:
      return param.battlebacks16_2 ? param.battlebacks16_2 : null;
    case 17:
      return param.battlebacks17_2 ? param.battlebacks17_2 : null;
    case 18:
      return param.battlebacks18_2 ? param.battlebacks18_2 : null;
    case 19:
      return param.battlebacks19_2 ? param.battlebacks19_2 : null;
    case 20:
      return param.battlebacks20_2 ? param.battlebacks20_2 : "Forest";
    case 21:
      return param.battlebacks21_2 ? param.battlebacks21_2 : "Forest";
    case 22:
      return param.battlebacks22_2 ? param.battlebacks22_2 : "Cliff";
    case 23:
      return param.battlebacks23_2 ? param.battlebacks23_2 : null;
    case 24:
      return param.battlebacks24_2 ? param.battlebacks24_2 : "Wasteland";
    case 25:
      return param.battlebacks25_2 ? param.battlebacks25_2 : "Wasteland";
    case 26:
      return param.battlebacks26_2 ? param.battlebacks26_2 : "Wasteland";
    case 27:
      return param.battlebacks27_2 ? param.battlebacks27_2 : "Wasteland";
    case 28:
      return param.battlebacks28_2 ? param.battlebacks28_2 : null;
    case 29:
      return param.battlebacks29_2 ? param.battlebacks29_2 : "Cliff";
    case 30:
      return param.battlebacks30_2 ? param.battlebacks30_2 : null;
    case 31:
      return param.battlebacks31_2 ? param.battlebacks31_2 : null;
    case 32:
      return param.battlebacks32_2 ? param.battlebacks32_2 : "Desert";
    case 33:
      return param.battlebacks33_2 ? param.battlebacks33_2 : "Desert";
    case 34:
      return param.battlebacks34_2 ? param.battlebacks34_2 : "Lava";
    case 35:
      return param.battlebacks35_2 ? param.battlebacks35_2 : "Lava";
    case 36:
      return param.battlebacks36_2 ? param.battlebacks36_2 : null;
    case 37:
      return param.battlebacks37_2 ? param.battlebacks37_2 : null;
    case 38:
      return param.battlebacks38_2 ? param.battlebacks38_2 : "Cliff";
    case 39:
      return param.battlebacks39_2 ? param.battlebacks39_2 : null;
    case 40:
      return param.battlebacks40_2 ? param.battlebacks40_2 : "Snowfield";
    case 41:
      return param.battlebacks41_2 ? param.battlebacks41_2 : "Snowfield";
    case 42:
      return param.battlebacks42_2 ? param.battlebacks42_2 : "Clouds";
    case 43:
      return param.battlebacks43_2 ? param.battlebacks43_2 : null;
    case 44:
      return param.battlebacks44_2 ? param.battlebacks44_2 : null;
    case 45:
      return param.battlebacks45_2 ? param.battlebacks45_2 : null;
    case 46:
      return param.battlebacks46_2 ? param.battlebacks46_2 : null;
    case 47:
      return param.battlebacks47_2 ? param.battlebacks47_2 : null;
  }
};

const _Sprite_Battleback_defaultBattleback1Name = Sprite_Battleback.prototype.defaultBattleback1Name;
Sprite_Battleback.prototype.defaultBattleback1Name = function() {
  return param.DefaultBattleback1 ? param.DefaultBattleback1 : _Sprite_Battleback_defaultBattleback1Name.call(this);
};

const _Sprite_Battleback_defaultBattleback2Name = Sprite_Battleback.prototype.defaultBattleback2Name
Sprite_Battleback.prototype.defaultBattleback2Name = function() {
  return param.DefaultBattleback2 ? param.DefaultBattleback2  : _Sprite_Battleback_defaultBattleback2Name.call(this);
};

const _Sprite_Battleback_shipBattleback1Name = Sprite_Battleback.prototype.shipBattleback1Name;
Sprite_Battleback.prototype.shipBattleback1Name = function() {
  if ($gamePlayer.isInBoat()) {
    return param.BoatBattleback1 ? param.BoatBattleback1 : _Sprite_Battleback_shipBattleback1Name.call(this);
  } else if ($gamePlayer.isInShip()) {
    return param.ShipBattleback1 ? param.ShipBattleback1 : _Sprite_Battleback_shipBattleback1Name.call(this);
  } else if ($gamePlayer.isInAirship()){
    return param.AirshipBattleback1 ? param.AirshipBattleback1 : _Sprite_Battleback_shipBattleback1Name.call(this);
  }
  return _Sprite_Battleback_shipBattleback1Name.call(this);
};

const _Sprite_Battleback_shipBattleback2Name = Sprite_Battleback.prototype.shipBattleback2Name;
Sprite_Battleback.prototype.shipBattleback2Name = function() {
  if ($gamePlayer.isInBoat()) {
    return param.BoatBattleback2 ? param.BoatBattleback2 : _Sprite_Battleback_shipBattleback2Name.call(this);
  } else if ($gamePlayer.isInShip()) {
    return param.ShipBattleback2 ? param.ShipBattleback2 : _Sprite_Battleback_shipBattleback2Name.call(this);
  } else if ($gamePlayer.isInAirship()){
    return param.AirshipBattleback2 ? param.AirshipBattleback2 : _Sprite_Battleback_shipBattleback2Name.call(this);
  }
  return _Sprite_Battleback_shipBattleback2Name.call(this);
};

const _Sprite_Battleback_adjustPosition = Sprite_Battleback.prototype.adjustPosition;
  Sprite_Battleback.prototype.adjustPosition = function() {
    _Sprite_Battleback_adjustPosition.call(this);
    if (param.BackgroundFit === 'Fit') {
      this.width = this.bitmap.width;
      this.height = this.bitmap.height;
      this.x = 0;
      this.scale.x = Graphics.width / this.bitmap.width;
      this.scale.y = Graphics.height / this.bitmap.height;
    } else if (param.BackgroundFit === 'NoResize') {
      this.width = this.bitmap.width;
      this.height = this.bitmap.height;
      const scale = param.BackgroundRatio / 100;
      this.x = (Graphics.width - this.bitmap.width * scale) / 2;
      this.scale.x = 1.0 * scale;
      this.scale.y = 1.0 * scale;
    }
    this.y += param.BackgroundPosition;
  };
})();