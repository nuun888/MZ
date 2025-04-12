/*:-----------------------------------------------------------------------------------
 * NUUN_GaugeImage.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc GaugeImaging
 * @author NUUN
 * @version 1.6.9
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * Image the gauge.
 * 
 * Specific conditions
 * HP gauge
 * It will switch to the image set when HP is dying.
 * TPB gauge
 * If TPB is during cast time, it will switch to the set image. (You need a separate plug-in that can visualize the cast time)
 * 
 * Image application at the time of damage requires a separate gauge display extension plug-in.
 * 
 * 'result_exp'　Result Acquisition EXP Gauge
 * 'exp' Status screen EXP gauge
 * 'limit' Party limit gauge image
 * 
 * Background image：This is the image displayed at the back.
 * Front image：A decorative image displayed in the foreground.
 * Main image：An image of the game.
 * 
 * Set 'Window_BattleStatus' and 'Window_BattleActor' in the filtering class settings if you want the image of the gauge to be reflected only during battle.
 * Image coordinate X and image coordinate Y are applied even if the label does not specify an image. Set the gauge display offset position of the label image.
 * 
 * GaugeImgAngle
 * Rotates the gauge to the left. A positive number rotates clockwise. The origin of rotation rotates from the center of "GaugeImgWidth" and "GaugeImgHeight".
 * With the core script default, the display height range of the gauge is 36, so if you don't change the base height, the image will be cut off.
 * 
 * GaugeInclined
 * Tilt the gauge diagonally. A positive number tilts to the left.
 * 
 * GaugeImgVariable
 * Extends the display of the gauge except for the range specified by the width of the front gauge image left side non-variable width and the front gauge image right side non-variable width.
 * 
 * Numeric image.
 * For the numerical image format, specify an image in which numbers from 0 to 9 are arranged from the left.
 * The number of vertical divisions is fixed at 1.
 * List 1: Normal
 * List 2: Dying (list 1 applies if not specified)
 * List 3: Incapacitated (list 1 applies if not specified)
 * There is no magnification setting for numerical images.
 * 
 * FilteringClass
 * Enter the applicable window class or gauge class, identification name, or identifier.
 * 
 * Specification
 * Coordinates need to be adjusted if the gauge is rotated using the core script specifications.
 * 
 *  
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * This plugin can be used for free or for a fee.
 * 
 * Log
 * 4/13/2025 Ver.1.6.9
 * Temporarily fixed an issue where an error occurred when some plugins were not installed.
 * 4/12/2025 Ver.1.6.8
 * Fixed so that images can be applied to the experience gauge values ​​of NUUN_StatusScreen, NUUN_MenuScreenEX, and NUUN_MenuParamListBase.
 * Fixed image angle processing to rotate based on the current coordinates (non-numeric values).
 * 5/24/2024 Ver.1.6.7
 * Corrected processing by updating "NUUN_GaugeValueEX".
 * 4/16/2023 Ver.1.6.6
 * Modified filtering class processing to support "ExtraGauge" and "SceneCustomMenu".
 * 1/10/2023 Ver.1.6.5
 * Fixed a flickering issue when viewing the gauge.
 * 1/9/2023 Ver.1.6.4
 * Fixed the problem that the gauge image shifts when the slope is specified as a negative value.
 * 12/15/2022 Ver.1.6.3
 * Fixed an issue that caused an error when displaying images in the party limit gauge.
 * 11/9/2022 Ver.1.6.2
 * Changed the display in languages other than Japanese to English.
 * 10/16/2022 Ver.1.6.1
 * Fixed an issue where numeric images were not rotated.
 * Fixed the problem that garbage is displayed when specifying rotation.
 * 10/15/2022 Ver.1.6.0
 * Supports numerical imaging.
 * 7/19/2022 Ver.1.5.2
 * Changed processing by plugging in damage amount gauge visualization.
 * 5/24/2022 Ver.1.5.1
 * Fixed an issue where label coordinates were not applied.
 * 5/24/2022 Ver.1.5.0
 * Significant review of processing contents and plug-in parameters.
 * Added a function that can specify the angle of the gauge.
 * 1/3/2022 Ver.1.4.3
 * Corresponds to the damage amount visualization of the gauge display extension plug-in.
 * Fixed the problem that the display of the front gauge is shifted.
 * 12/20/2021 Ver.1.4.2
 * Corresponds to the image of the party gauge.
 * Added a function to set the range in which the front gauge image is not displayed variably.
 * 12/19/2021 Ver.1.4.1
 * Fixed an issue where filtering classes were not being applied correctly.
 * 2/19/2021 Ver.1.4.0
 * Added processing by supporting gauge plug-ins.
 * Change image setting of gauge.
 * 10/4/2021 Ver.1.3.0
 * Added a function that can set the maximum image.
 * Fixed the problem that the image of the gauge during drowning and casting time did not reflect if the image setting of specific conditions was not set.
 * 9/24/2021 Ver.1.2.0
 * Added a function to image labels.
 * Fixed so that images can be displayed without combining them into one image.
 * Fixed the problem that the image is displayed duplicated.
 * 9/22/2021 Ver.1.1.1
 * Fixed an issue where the main gauge would not display properly.
 * 9/20/2021 Ver.1.1.0
 * Added filtering function.
 * Added a function that can display an image in front of the gauge.
 * 9/20/2021 Ver.1.0.1
 * Fixed the problem that the gauge is not displayed with the gauge that does not support this plug-in.
 * 9/20/2021 Ver.1.0.0
 * first edition
 * 
 * @param GaugeImgList
 * @text Gauge image setting
 * @desc Gauge image setting
 * @type struct<GaugeImg>[]
 * @default []
 * 
 * 
 */
/*~struct~GaugeImg:
 * 
 * @param Type
 * @text Display target
 * @desc Display target
 * @type combo
 * @option 'hp'
 * @option 'mp'
 * @option 'tp'
 * @option 'time'
 * @option 'result_exp'
 * @option 'exp'
 * @option 'limit'
 * @default 
 * 
 * @param GaugeImgX
 * @text Image coordinate X
 * @desc Move the X coordinate of the image all at once. (The label is applied even if the image is not specified)
 * @type number
 * @default 0
 * 
 * @param GaugeImgY
 * @text Image coordinate Y
 * @desc Move the Y coordinates of the image all at once. (The label is applied even if the image is not specified)
 * @type number
 * @default 0
 * 
 * @param GaugeImgWidth
 * @text Base width
 * @desc pecifies the width of the display range.
 * @type number
 * @default 160
 * 
 * @param GaugeImgHeight
 * @text Base height
 * @desc Specifies the height of the height range.
 * @type number
 * @default 160
 * 
 * @param GaugeImgScale
 * @text Image magnification
 * @desc Specify the magnification ratio for the image. (percentage)
 * @type number
 * @default 100
 * 
 * @param GaugeImgAngle
 * @text Image rotation angle
 * @desc Specify the skew rate for the image. A positive number skews the image to the left.
 * @type number
 * @min -999
 * @default 0
 * 
 * @param GaugeInclined
 * @desc Specify the tilt rate of the image. A positive number tilts to the left.
 * @text Slope rate
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeImgVariable
 * @text Gauge width stretch
 * @desc Scales the gauge to fit the width.
 * @type boolean
 * @default false
 * 
 * @param BackGauge
 * @text Rear gauge image setting
 * @default ------------------------------
 * 
 * @param GaugeBaukImg
 * @text Rear gauge image setting
 * @desc Rear gauge image setting.
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent BackGauge
 * 
 * @param MainGauge
 * @text Gauge image setting
 * @default ------------------------------
 * 
 * @param Default
 * @text Default configuration
 * @default ------------------------------
 * @parent MainGauge
 * 
 * @param MainGaugeImg
 * @text Gauge image setting
 * @desc Gauge image setting.
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent Default
 * 
 * @param Max
 * @text Gauge MAX image setting
 * @default ------------------------------
 * @parent MainGauge
 * 
 * @param GaugeMaxImg
 * @text Gauge MAX image setting
 * @desc Gauge MAX image setting.
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent Max
 * 
 * @param Cond
 * @text Image settings under specific conditions
 * @default ------------------------------
 * @parent MainGauge
 * 
 * @param GaugeCondImg
 * @text Image settings under specific conditions
 * @desc Image settings under specific conditions.
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent Cond
 * 
 * @param FrontGauge
 * @text Front gauge image setting
 * @default ------------------------------
 * 
 * @param GaugeFrontImg
 * @text Front gauge image setting
 * @desc Front gauge image setting.
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent FrontGauge
 * 
 * @param Damage
 * @text Damage amount visualization image setting
 * @default ------------------------------
 * 
 * @param GaugeDamageImg
 * @text Damage image settings
 * @desc Image setting at the time of damage. (NUUN_DamageGauge plug-in required)
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent Damage
 * 
 * @param VariableSetting
 * @text Setting when applying variable display
 * @default ------------------------------
 * 
 * @param GaugeLeftWidth
 * @desc The non-variable width of the left side of the front gauge image. (Variable mode only)
 * @text Front gauge image left side non-variable width
 * @type number
 * @default 0
 * 
 * @param GaugeRightWidth
 * @desc he non-variable width of the right side of the front gauge image. (Variable mode only)
 * @text Front gauge image right side non-variable width
 * @type number
 * @default 0
 * 
 * @param GaugeBackCorrectionWidth
 * @desc Rear image correction width (difference from display width)
 * @text Rear image correction width
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeCorrectionWidth
 * @desc Gauge image correction width (difference from display width)
 * @text Gauge back image correction width
 * @type number
 * @default 0
 * @min -999
 * 
 * @param LabelImg
 * @text Label image setting
 * @default ------------------------------
 * 
 * @param LabelGaugeImg
 * @desc Specifies the label image file name.
 * @text label image
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent LabelImg
 * 
 * @param GaugeLabelAngle
 * @text label rotation angle
 * @desc Specifies the rotation angle of the label. Positive numbers rotate clockwise.
 * @type number
 * @min -999
 * @default 0
 * @parent LabelImg
 * 
 * @param ValueSetting
 * @text Numeric image settings
 * @default ------------------------------
 * 
 * @param ValueImg
 * @desc pecifies the numeric image file name. List No. 0: Normal List No. 1: Dying List No. 2: Dead
 * @text Numeric image
 * @type file[]
 * @dir img/
 * @default []
 * @parent ValueSetting
 * 
 * @param ValueX
 * @desc Specifies a numeric X coordinate.
 * @text Numeric display offset position X
 * @type number
 * @default 0
 * @min -999
 * @parent ValueSetting
 * 
 * @param ValueY
 * @desc Specifies a numeric Y coordinate.
 * @text Numeric display offset position Y
 * @type number
 * @default 0
 * @min -999
 * @parent ValueSetting
 * 
 * @param GaugeValueAngle
 * @text numeric rotation angle
 * @desc Specifies the rotation angle of the number. Positive numbers rotate clockwise.
 * @type number
 * @min -999
 * @default 0
 * @parent ValueSetting
 * 
 * @param FilteringSetting
 * @text Application window setting
 * @default ------------------------------
 * 
 * @param FilteringClass
 * @text Filtering class setting
 * @desc Specifies the window class to apply. If not specified, it will be reflected in all windows. (multiple selection possible)
 * @type combo[]
 * @option 'Window_MenuStatus'
 * @option 'Window_MenuActor'
 * @option 'Window_Status'
 * @option 'Window_BattleStatus'
 * @option 'Window_BattleActor'
 * @option 'Window_BattleActorStatus'
 * @option 'Window_Result'
 * @option 'Window_FormationStatus'
 * @option 'Sprite_EnemyTPGauge'
 * @option 'Sprite_EnemyHPGauge'
 * @option 'Sprite_EnemyMPGauge'
 * @option 'Sprite_EnemyTPBGauge'
 * @option 'Window_EnemyBook'
 * @option 'Sprite_ExtraGauge'
 * @option 'Sprite_NuunGauge'
 * @default
 * 
 */
/*~struct~GaugeSetting:
 * 
 * @param Gaugeimage
 * @desc Specifies an image.
 * @text Image
 * @type file
 * @dir img/
 * @default 
 * 
 * @param GaugeX
 * @desc Specifies the x-coordinate of the gauge.
 * @text Gauge display offset position X
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeY
 * @desc Specifies the Y coordinate of the gauge.
 * @text Gauge display offset position Y
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeSX
 * @desc Specify the X origin coordinates for drawing the gauge image.
 * @text Gauge image origin position X
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeSY
 * @desc Specify the Y starting point coordinates for drawing the gauge image.
 * @text Gauge image origin position Y
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeSW
 * @desc Specify the width to draw the gauge image.
 * @text Gauge image width
 * @type number
 * @default 0
 * @min 0
 * 
 * @param GaugeSH
 * @desc Specifies the height to draw the gauge image.
 * @text Gauge image height
 * @type number
 * @default 0
 * @min 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ゲージ画像化
 * @author NUUN
 * @version 1.6.8
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * ゲージを画像化します。
 * 
 * 特定条件
 * HPゲージ
 * HPが瀕死の時に設定した画像に切り替わります。
 * TPBゲージ
 * TPBがキャストタイム中なら設定した画像に切り替わります。(別途キャストタイムを可視化できるプラグインが必要です)
 * 
 * ダメージ時の画像適用は別途ゲージ表示拡張プラグインが必要になります。
 * 
 * 'result_exp'　リザルト獲得経験値ゲージ
 * 'exp' ステータス画面経験値ゲージ
 * 'limit' パーティリミットゲージ画像
 * 
 * 背後画像：一番後ろに表示される画像です。
 * 前面画像：一番手前に表示される装飾用の画像です。
 * メイン画像：ゲージの画像です。
 * 
 * ゲージの画像化を戦闘中のみ反映させる場合はフィルタリングクラス設定で'Window_BattleStatus'、'Window_BattleActor'を設定してください。
 * 画像座標X及び画像座標Yは、ラベルが画像指定してない場合でも適用されます。ラベル画像のゲージ表示オフセット位置で設定してください。
 * 
 * 
 * 画像回転角度
 * ゲージを左基準に回転させます。正の数で時計回りに回転します。 回転の原点はベース横、高さの中心から回転します。
 * コアスクリプトデフォルトだとゲージの表示高さ範囲は36になっていますので、ベース高さを変更しないと画像が途切れてしまいます。
 * 
 * 傾斜率
 * ゲージを斜めに傾かせます。正の数で左に傾きます。
 * 
 * 可変表示
 * 前面ゲージ横幅から前面ゲージ画像左側非可変横幅と前面ゲージ画像右側非可変横幅で指定した範囲を除くゲージの表示を引き延ばします。
 * 
 * 数値画像
 * 数値の画像のフォーマットは左から0から9までの数値が並んだ画像を指定してください。縦分割数は1固定です。
 * リスト1:通常時
 * リスト2:瀕死時(未指定の場合はリスト1が適用)
 * リスト3:戦闘不能時(未指定の場合はリスト1が適用)
 * 数値画像に拡大率の設定はありません。
 * 
 * フィルタリングクラス設定
 * 適用させるウィンドウクラスまたはゲージクラスまたは識別名、識別子を記入します。
 * 
 * 仕様
 * コアスクリプトの仕様でゲージを回転する場合は、座標の調整を行う必要があります。
 * このプラグインは共通処理プラグインVer.1.4.4以降が必要になります。
 * 
 *  
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/4/13 Ver.1.6.9
 * 一部プラグインを導入していない時にエラーが出る問題を暫定修正。
 * 2025/4/12 Ver.1.6.8
 * NUUN_StatusScreen、NUUN_MenuScreenEX、NUUN_MenuParamListBaseの経験値ゲージの数値にも画像を適用できるように修正。
 * 画像の角度の処理を現座標を基準に回転させるように修正(数値以外)。
 * 2024/5/24 Ver.1.6.7
 * ゲージ表示拡張プラグイン更新による処理の修正。
 * 2023/4/16 Ver.1.6.6
 * フィルタリングクラスの処理を汎用ゲージ追加プラグイン、カスタムメニュー作成プラグインに対応できるよう修正。
 * 2023/1/10 Ver.1.6.5
 * ゲージを表示した際にちらつく問題を修正。
 * 2023/1/9 Ver.1.6.4
 * 傾斜率をマイナスに指定したときに、ゲージ画像がずれる問題を修正。
 * 2022/12/15 Ver.1.6.3
 * パーティリミットゲージで画像表示するとエラーがでる問題を修正。
 * 2022/11/9 Ver.1.6.2
 * 日本語以外での表示を英語表示に変更。
 * 2022/10/16 Ver.1.6.1
 * 数値画像が回転しない問題を修正。
 * 回転を指定したときにゴミが表示される問題を修正。
 * 2022/10/15 Ver.1.6.0
 * 数値の画像化に対応
 * 2022/7/19 Ver.1.5.2
 * ダメージ量ゲージ可視化別プラグイン化による処理変更。
 * 2022/5/24 Ver.1.5.1
 * ラベルの座標が適用されない問題を修正。
 * 2022/5/24 Ver.1.5.0
 * 処理内容、プラグインパラメータの大幅な見直し。
 * ゲージの角度を指定できる機能を追加。
 * 2022/1/3 Ver.1.4.3
 * ゲージ表示拡張プラグインのダメージ量可視化に対応。
 * 前面ゲージの表示がずれる問題を修正。
 * 2021/12/20 Ver.1.4.2
 * パーティゲージの画像化に対応。
 * 前面ゲージ画像を可変表示させない範囲を設定できる機能を追加。
 * 2021/12/19 Ver.1.4.1
 * フィルタリングクラスが正常に適用されていなかった問題を修正。
 * 2021/12/19 Ver.1.4.0
 * ゲージプラグイン対応による処理追加。
 * ゲージの画像設定を変更。
 * 2021/10/4 Ver.1.3.0
 * 最大時の画像を設定できる機能を追加。
 * 溺死、キャストタイム中のゲージの画像が、特定条件の画像設定をしていなかった場合反映しなかった問題を修正。
 * 2021/9/24 Ver.1.2.0
 * ラベルを画像化する機能を追加。
 * 画像を１枚にまとめなくとも表示できるように修正。
 * 画像が重複して表示されてしまう問題を修正。
 * 2021/9/22 Ver.1.1.1
 * メインゲージが正常に表示されない問題を修正。
 * 2021/9/20 Ver.1.1.0
 * フィルタリング機能を追加。
 * ゲージの前面に画像を表示出来る機能を追加。
 * 2021/9/20 Ver.1.0.1
 * 当プラグインに対応していないゲージで、ゲージが表示されない問題を修正。
 * 2021/9/20 Ver.1.0.0
 * 初版
 * 
 * @param GaugeImgList
 * @text ゲージ画像設定
 * @desc ゲージ画像設定
 * @type struct<GaugeImg>[]
 * @default []
 * 
 * 
 */
/*~struct~GaugeImg:ja
 * 
 * @param Type
 * @text 表示対象
 * @desc 表示対象
 * @type combo
 * @option 'hp'
 * @option 'mp'
 * @option 'tp'
 * @option 'time'
 * @option 'result_exp'
 * @option 'exp'
 * @option 'limit'
 * @default 
 * 
 * @param GaugeImgX
 * @text 画像座標X
 * @desc 画像のX座標を一括で移動します。(ラベルは画像指定してない場合でも適用されます)
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param GaugeImgY
 * @text 画像座標Y
 * @desc 画像のY座標を一括で移動します。(ラベルは画像指定してない場合でも適用されます)
 * @type number
 * @default 0
 * 
 * @param GaugeImgWidth
 * @text ベース横幅
 * @desc 表示範囲の横幅を指定します。
 * @type number
 * @default 160
 * 
 * @param GaugeImgHeight
 * @text ベース高さ
 * @desc 高さ範囲の高さを指定します。
 * @type number
 * @default 160
 * 
 * @param GaugeImgScale
 * @text 画像拡大率
 * @desc 画像を拡大率を指定。(百分率)
 * @type number
 * @default 100
 * 
 * @param GaugeImgAngle
 * @text 画像回転角度
 * @desc 画像を回転角度を指定。正の数で時計回りに回転します。
 * @type number
 * @min -999
 * @default 0
 * 
 * @param GaugeInclined
 * @desc 画像を傾斜率を指定。正の数で左に傾きます。
 * @text 傾斜率
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeImgVariable
 * @text ゲージ幅引き伸ばし
 * @desc ゲージを横幅に合わせ拡大縮小します。
 * @type boolean
 * @default false
 * 
 * @param BackGauge
 * @text 背面ゲージ画像設定
 * @default ------------------------------
 * 
 * @param GaugeBaukImg
 * @text 背面ゲージ画像設定
 * @desc 背面ゲージ画像設定
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent BackGauge
 * 
 * @param MainGauge
 * @text ゲージ画像設定
 * @default ------------------------------
 * 
 * @param Default
 * @text デフォルト設定
 * @default ------------------------------
 * @parent MainGauge
 * 
 * @param MainGaugeImg
 * @text ゲージ画像設定
 * @desc ゲージ画像設定
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent Default
 * 
 * @param Max
 * @text ゲージMAX時画像設定
 * @default ------------------------------
 * @parent MainGauge
 * 
 * @param GaugeMaxImg
 * @text ゲージMAX画像設定
 * @desc ゲージMAX画像設定
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent Max
 * 
 * @param Cond
 * @text 特定条件下時画像設定
 * @default ------------------------------
 * @parent MainGauge
 * 
 * @param GaugeCondImg
 * @text 特定条件下画像設定
 * @desc 特定条件下画像設定。
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent Cond
 * 
 * @param FrontGauge
 * @text 前面ゲージ画像設定
 * @default ------------------------------
 * 
 * @param GaugeFrontImg
 * @text 前面ゲージ画像設定
 * @desc 前面ゲージ画像設定
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent FrontGauge
 * 
 * @param Damage
 * @text ダメージ量可視化画像設定
 * @default ------------------------------
 * 
 * @param GaugeDamageImg
 * @text ダメージ時画像設定
 * @desc ダメージ時画像設定。(要ゲージ表示拡張プラグイン)
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent Damage
 * 
 * @param VariableSetting
 * @text 可変表示適用時設定
 * @default ------------------------------
 * 
 * @param GaugeLeftWidth
 * @desc 前面ゲージ画像の左側の可変させない横幅。（可変モードのみ）
 * @text 前面ゲージ画像左側非可変横幅
 * @type number
 * @default 0
 * 
 * @param GaugeRightWidth
 * @desc 前面ゲージ画像の右側の可変させない横幅。（可変モードのみ）
 * @text 前面ゲージ画像右側非可変横幅
 * @type number
 * @default 0
 * 
 * @param GaugeBackCorrectionWidth
 * @desc 背面画像の補正幅（表示幅からの差）
 * @text 背面画像補正幅
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeCorrectionWidth
 * @desc ゲージ画像の補正幅（表示幅からの差）
 * @text ゲージ背後画像補正幅
 * @type number
 * @default 0
 * @min -999
 * 
 * @param LabelImg
 * @text ラベル画像設定
 * @default ------------------------------
 * 
 * @param LabelGaugeImg
 * @desc ラベル画像ファイル名を指定します。
 * @text ラベル画像
 * @type struct<GaugeSetting>
 * @default {"Gaugeimage":"","GaugeX":"0","GaugeY":"0","GaugeSX":"0","GaugeSY":"0","GaugeSW":"0","GaugeSH":"0"}
 * @parent LabelImg
 * 
 * @param GaugeLabelAngle
 * @text ラベル回転角度
 * @desc ラベルの回転角度を指定。正の数で時計回りに回転します。
 * @type number
 * @min -999
 * @default 0
 * @parent LabelImg
 * 
 * @param ValueSetting
 * @text 数値画像設定
 * @default ------------------------------
 * 
 * @param ValueImg
 * @desc 数値画像ファイル名を指定します。リスト番号0:通常時 リスト番号1:瀕死時 リスト番号2:戦闘不能時
 * @text 数値画像
 * @type file[]
 * @dir img/
 * @default []
 * @parent ValueSetting
 * 
 * @param ValueX
 * @desc 数値のX座標を指定します。
 * @text 数値表示オフセット位置X
 * @type number
 * @default 0
 * @min -999
 * @parent ValueSetting
 * 
 * @param ValueY
 * @desc 数値のY座標を指定します。
 * @text 数値表示オフセット位置Y
 * @type number
 * @default 0
 * @min -999
 * @parent ValueSetting
 * 
 * @param GaugeValueAngle
 * @text 数値回転角度
 * @desc 数値の回転角度を指定。正の数で時計回りに回転します。
 * @type number
 * @min -999
 * @default 0
 * @parent ValueSetting
 * 
 * @param FilteringSetting
 * @text 適用クラス設定
 * @default ------------------------------
 * 
 * @param FilteringClass
 * @text フィルタリングクラス設定
 * @desc 適用するウィンドウクラスを指定します。無指定の場合は全てのウィンドウで反映されます。(複数指定可)
 * @type combo[]
 * @option 'Window_MenuStatus'
 * @option 'Window_MenuActor'
 * @option 'Window_Status'
 * @option 'Window_BattleStatus'
 * @option 'Window_BattleActor'
 * @option 'Window_BattleActorStatus'
 * @option 'Window_Result'
 * @option 'Window_FormationStatus'
 * @option 'Sprite_EnemyTPGauge'
 * @option 'Sprite_EnemyHPGauge'
 * @option 'Sprite_EnemyMPGauge'
 * @option 'Sprite_EnemyTPBGauge'
 * @option 'Window_EnemyBook'
 * @option 'Sprite_ExtraGauge'
 * @option 'Sprite_NuunGauge'
 * @default
 * 
 */
/*~struct~GaugeSetting:ja
 * 
 * @param Gaugeimage
 * @desc 画像を指定します。
 * @text 画像指定
 * @type file
 * @dir img/
 * @default 
 * 
 * @param GaugeX
 * @desc ゲージのX座標を指定します。
 * @text ゲージ表示オフセット位置X
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeY
 * @desc ゲージのY座標を指定します。
 * @text ゲージ表示オフセット位置Y
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeSX
 * @desc ゲージ画像の描画するX起点座標を指定します。
 * @text ゲージ画像起点位置X
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeSY
 * @desc ゲージ画像の描画するY起点座標を指定します。
 * @text ゲージ画像起点位置Y
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeSW
 * @desc ゲージ画像の描画する横幅を指定します。
 * @text ゲージ画像横幅
 * @type number
 * @default 0
 * @min 0
 * 
 * @param GaugeSH
 * @desc ゲージ画像の描画する高さを指定します。
 * @text ゲージ画像高さ
 * @type number
 * @default 0
 * @min 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_GaugeImage = true;

(() => {
const parameters = PluginManager.parameters('NUUN_GaugeImage');
const GaugeImgList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['GaugeImgList'])) : null) || [];


//旧バージョン用
Window_StatusBase.prototype.placeGaugeImg = function(battler, type, x, y) {

};


const _Sprite_Gauge_initMembers = Sprite_Gauge.prototype.initMembers;
Sprite_Gauge.prototype.initMembers = function() {
    _Sprite_Gauge_initMembers.call(this);
    this._gaugeImgData = null;
    this.setDefaultGaugeImg();
};

const _Sprite_Gauge_setup = Sprite_Gauge.prototype.setup;
Sprite_Gauge.prototype.setup = function(battler, statusType) {
    this._statusType = statusType;
    this._battler = battler;
    this._gaugeImgData = this.getFindGauge();
    if (!this._gaugeImgSprite && this._gaugeImgData) {
        this.createGaugeImg();
        this.createTextBitmap();
    }
    _Sprite_Gauge_setup.call(this, battler, statusType);
};

Sprite_Gauge.prototype.filteringGaugeImgClass = function(data) {
    const className = this.className ? this.className : NuunManager.isFilterClass(this);
    if (data.FilteringClass && data.FilteringClass.length > 0) {
        return data.FilteringClass.some(filterClass => filterClass === className);
    } else {
        return true;
    }
};

Sprite_Gauge.prototype.getFindGauge = function() {
    return GaugeImgList.find(data => data.Type === this._statusType && this.filteringGaugeImgClass(data));
};

const _Sprite_Gauge_bitmapWidth = Sprite_Gauge.prototype.bitmapWidth;
Sprite_Gauge.prototype.bitmapWidth = function() {
    if (this._gaugeImgData) {
        return this._gaugeImgData.GaugeImgWidth;
    } else {
        return _Sprite_Gauge_bitmapWidth.call(this);
    }
};

const _Sprite_Gauge_bitmapHeight = Sprite_Gauge.prototype.bitmapHeight;
Sprite_Gauge.prototype.bitmapHeight = function() {
    if (this._gaugeImgData) {
        return this._gaugeImgData.GaugeImgHeight;
    } else {
        return _Sprite_Gauge_bitmapHeight.call(this);
    }
};

Sprite_Gauge.prototype.createGaugeSpriteBitmap = function() {
    const inclined = (this._gaugeImgData.GaugeInclined !== 0 ? Math.abs((this.bitmapHeight() * this.gaugeInclinedRate()) * 2) : 0) + 1;
    this._gaugeImgSprite.bitmap = new Bitmap(this.bitmapWidth() + inclined, this.bitmapHeight());
};

Sprite_Gauge.prototype.gaugeInclinedRate  = function() {
    return this._gaugeImgData.GaugeInclined / 100;
};

Sprite_Gauge.prototype.gaugeScaleRate  = function() {
    return this._gaugeImgData.GaugeImgScale / 100;
};

Sprite_Gauge.prototype.loadMainBitmap  = function(data) {
    const bitmapImg = data ? data.Gaugeimage : null;
    if (bitmapImg) {
        return ImageManager.nuun_LoadPictures(bitmapImg);
    }
    return null;
};

Sprite_Gauge.prototype.createTextBitmap = function() {
    const sprite = new Sprite();
    this.addChild(sprite);
    this.textSprite = sprite;
    sprite.anchor.x = this.anchor.x;
    sprite.anchor.y = this.anchor.y;
    const width = this.bitmapWidth();
    const height = this.bitmapHeight(); 
    this.textSprite.bitmap = new Bitmap(width, height);
};

const _Sprite_Gauge_updateBitmap = Sprite_Gauge.prototype.updateBitmap;
Sprite_Gauge.prototype.updateBitmap = function() {
    _Sprite_Gauge_updateBitmap.call(this);
    if (this._gaugeImgData) {
        this.updateGaugeImg();
    }
};

Sprite_Gauge.prototype.createGaugeImg = function() {
    this.createGaugeBaukImg();
    this.createGaugeMainImg();
    this.createGaugeFrontImg();
    this.loadVauleImg();
};

Sprite_Gauge.prototype.createGaugeBaukImg = function() {
    const bitmapImg = this._gaugeImgData.GaugeBaukImg ? this._gaugeImgData.GaugeBaukImg.Gaugeimage : null;
    const bitmap = ImageManager.nuun_LoadPictures(bitmapImg);
    const sprite = new Sprite();
    sprite.anchor.x = this.anchor.x;
    sprite.anchor.y = this.anchor.y;
    this.addChild(sprite);
    if (bitmapImg && !bitmap.isReady()) {
        bitmap.addLoadListener(this.setupBackBitmap.bind(this, sprite, bitmap));
    } else if (bitmapImg) {
        this.setupBackBitmap(sprite, bitmap);
    }
};

Sprite_Gauge.prototype.setupBackBitmap = function(sprite, bitmap) {
    const width = this._gaugeImgData.GaugeBaukImg.GaugeSW || bitmap.width;
    const height = this._gaugeImgData.GaugeBaukImg.GaugeSH || bitmap.height;
    const inclined = this._gaugeImgData.GaugeInclined !== 0 ? Math.abs((this.bitmapHeight() * this.gaugeInclinedRate()) * 2) : 0;
    sprite.bitmap = new Bitmap(this.bitmapWidth() + inclined, this.bitmapHeight());
    const context = sprite.bitmap.context;
    const dx = this._gaugeImgData.GaugeBaukImg.GaugeX + this._gaugeImgData.GaugeImgX;
    const dy = this._gaugeImgData.GaugeBaukImg.GaugeY + this._gaugeImgData.GaugeImgY;
    const sx = this._gaugeImgData.GaugeBaukImg.GaugeSX;
    const sy = this._gaugeImgData.GaugeBaukImg.GaugeSY;
    const scale = this.gaugeScaleRate();
    context.setTransform(scale, 0, this.gaugeInclinedRate(), scale, 0, 0);
    this.gaugeRotate(context);
    const correctionWidth = this._gaugeImgData.GaugeImgVariable ? this._gaugeImgData.GaugeBackCorrectionWidth : 0;
    const inclinedX = this._gaugeImgData.GaugeInclined < 0 ? Math.abs((height * this.gaugeInclinedRate()) * (this.anchor.x > 0 ? 4 : 2)) : 0;
    sprite.bitmap.blt(bitmap, sx, sy, width, height, dx + inclinedX, dy, width * this.getVariableScale(width) + correctionWidth);
};

Sprite_Gauge.prototype.getVariableScale = function(width) {
    return this._gaugeImgData.GaugeImgVariable ? this.bitmapWidth() / (width * this.gaugeScaleRate()): 1.0;
};

Sprite_Gauge.prototype.createGaugeFrontImg = function() {
    const bitmapImg = this._gaugeImgData.GaugeFrontImg ? this._gaugeImgData.GaugeFrontImg.Gaugeimage : null;
    const bitmap = ImageManager.nuun_LoadPictures(bitmapImg);
    const sprite = new Sprite();
    sprite.anchor.x = this.anchor.x;
    sprite.anchor.y = this.anchor.y;
    this.addChild(sprite);
    if (bitmapImg && !bitmap.isReady()) {
        bitmap.addLoadListener(this.setupFrontBitmap.bind(this, sprite, bitmap));
    } else if (bitmapImg) {
        this.setupFrontBitmap(sprite, bitmap);
    }
};

Sprite_Gauge.prototype.setupFrontBitmap = function(sprite, bitmap) {
    const width = this._gaugeImgData.GaugeFrontImg.GaugeSW || bitmap.width;
    const height = this._gaugeImgData.GaugeFrontImg.GaugeSH || bitmap.height;
    const inclined = this._gaugeImgData.GaugeInclined !== 0 ? Math.abs((this.bitmapHeight() * this.gaugeInclinedRate()) * 2) : 0;
    sprite.bitmap = new Bitmap(this.bitmapWidth() + inclined, this.bitmapHeight());
    const context = sprite.bitmap.context;
    const inclinedX = this._gaugeImgData.GaugeInclined < 0 ? Math.abs((height * this.gaugeInclinedRate()) * (this.anchor.x > 0 ? 4 : 2)) : 0;
    const dx = this._gaugeImgData.GaugeFrontImg.GaugeX + this._gaugeImgData.GaugeImgX + inclinedX;
    const dy = this._gaugeImgData.GaugeFrontImg.GaugeY + this._gaugeImgData.GaugeImgY;
    const sx = this._gaugeImgData.GaugeFrontImg.GaugeSX;
    const sy = this._gaugeImgData.GaugeFrontImg.GaugeSY;
    const scale = this.gaugeScaleRate();
    context.setTransform(scale, 0, this.gaugeInclinedRate(), scale, 0, 0);
    this.gaugeRotate(context);
    if (this._gaugeImgData.GaugeImgVariable) {
        const leftWidth = this._gaugeImgData.GaugeLeftWidth;
        const rightWidth = this._gaugeImgData.GaugeLeftWidth;
        const variableWidth = width * this.getVariableScale(width);
        const width2 = width - (leftWidth + rightWidth);
        sprite.bitmap.blt(bitmap, sx, sy, leftWidth, height, dx, dy, leftWidth);
        sprite.bitmap.blt(bitmap, width - rightWidth, sy, this._gaugeImgData.GaugeLeftWidth, height, dx + variableWidth - rightWidth, dy, rightWidth);
        sprite.bitmap.blt(bitmap, sx + leftWidth, sy, width2, height, dx + leftWidth, dy, variableWidth - (leftWidth + rightWidth));
    } else {
        sprite.bitmap.blt(bitmap, sx, sy, width, height, dx, dy, width * this.getVariableScale(width));
    }
};

Sprite_Gauge.prototype.createGaugeMainImg = function() {
    this._GaugeImgBitmap = this.loadMainBitmap(this._gaugeImgData.MainGaugeImg);
    this._GaugeImgCondBitmap = this.loadMainBitmap(this._gaugeImgData.GaugeCondImg);
    this._GaugeImgMaxBitmap = this.loadMainBitmap(this._gaugeImgData.GaugeMaxImg);
    this._GaugeImgDamageBitmap = this.loadMainBitmap(this._gaugeImgData.GaugeDamageImg);
    if (!this._GaugeImgBitmap) {
        this._GaugeImgBitmap = ImageManager.nuun_LoadPictures(null);
    }
    this.updateGaugeImg();
    const sprite = new Sprite();
    this.addChild(sprite);
    sprite.anchor.x = this.anchor.x;
    sprite.anchor.y = this.anchor.y;
    this._gaugeImgSprite = sprite;
    this.createGaugeSpriteBitmap();
    const scale = this.gaugeScaleRate();
    const context = this._gaugeImgSprite.bitmap.context;
    context.setTransform(scale, 0, this.gaugeInclinedRate(), scale, 0, 0);
    this.gaugeRotate(context);
};

Sprite_Gauge.prototype.loadVauleImg = function() {
    const imgData = this._gaugeImgData.ValueImg;
    if (imgData && imgData.length > 0) {
        this._digitSprite = new Sprite();
        this.addChild(this._digitSprite);
        this._digitSprite.bitmap = new Bitmap(this.bitmapWidth(), this.bitmapHeight());
        this._valueImgBitmap = [];
        this._valueImgBitmap[0] = ImageManager.nuun_LoadPictures(imgData[0]);
        this._valueImgBitmap[1] = imgData[1] ? ImageManager.nuun_LoadPictures(imgData[1]) : this._valueImgBitmap[0];
        this._valueImgBitmap[2] = imgData[2] ? ImageManager.nuun_LoadPictures(imgData[2]) : this._valueImgBitmap[0];
        this._Digit = [];
    } else {
        this._valueImgBitmap = null;
    }
};

const _Sprite_Gauge_drawGauge = Sprite_Gauge.prototype.drawGauge;
Sprite_Gauge.prototype.drawGauge = function() {
    if (this._gaugeImgData) {
        this.drawGaugeImgRect();
    } else {
        _Sprite_Gauge_drawGauge.call(this);
    }
};

Sprite_Gauge.prototype.drawGaugeImgRect = function() {
    const bitmap = this._gaugeImgSprite.bitmap;
    const context = bitmap.context;
    const inclined = this._gaugeImgData.GaugeInclined !== 0 ? Math.abs((bitmap.height * this.gaugeInclinedRate()) * 2) : 0;
    context.clearRect(-inclined, 0, bitmap.width + inclined * 2, bitmap.height);
    if (!!this.gaugeDamageVisualization && this.gaugeDamageVisualization() && this._gaugeImgData.GaugeDamageImg.Gaugeimage) {
        this.drawGaugeDamageImgRect(bitmap);
    }
    const correctionWidth = this._gaugeImgData.GaugeImgVariable ? this._gaugeImgData.GaugeCorrectionWidth : 0;
    const rate = this.gaugeRate();
    const data = this.getMainGaugeImg();
    const width = data.GaugeSW || bitmap.width;
    const height = data.GaugeSH || bitmap.height;
    const dx = data.GaugeX + this._gaugeImgData.GaugeImgX;
    const dy = data.GaugeY + this._gaugeImgData.GaugeImgY;
    const sx = data.GaugeSX;
    const sy = data.GaugeSY;
    const inclinedX = this._gaugeImgData.GaugeInclined < 0 ? Math.abs((this.setImgBitmap.height * this.gaugeInclinedRate()) * (this.anchor.x > 0 ? 4 : 2)) : 0;
    bitmap.blt(this.setImgBitmap, sx, sy, width * rate, height, dx + inclinedX, dy, Math.floor((width * this.getVariableScale(width) + correctionWidth) * rate));  
};

Sprite_Gauge.prototype.drawGaugeDamageImgRect = function(bitmap) {
    const correctionWidth = this._gaugeImgData.GaugeImgVariable ? this._gaugeImgData.GaugeCorrectionWidth : 0;
    this._drawGaugeMode = 1;//
    const drate = this.gaugeRate();
    const width = this._gaugeImgData.GaugeDamageImg.GaugeSW || bitmap.width;
    const height = this._gaugeImgData.GaugeDamageImg.GaugeSH || bitmap.height;
    const dx = this._gaugeImgData.GaugeDamageImg.GaugeX + this._gaugeImgData.GaugeImgX;
    const dy = this._gaugeImgData.GaugeDamageImg.GaugeY + this._gaugeImgData.GaugeImgY;
    const sx = this._gaugeImgData.GaugeDamageImg.GaugeSX;
    const sy = this._gaugeImgData.GaugeDamageImg.GaugeSY;
    const inclinedX = this._gaugeImgData.GaugeInclined < 0 ? Math.abs((this._GaugeImgDamageBitmap.height * this.gaugeInclinedRate()) * (this.anchor.x > 0 ? 4 : 2)) : 0;
    bitmap.blt(this._GaugeImgDamageBitmap, sx, sy, width * drate, height, dx + inclinedX, dy, Math.floor((width * this.getVariableScale(width) + correctionWidth) * drate));
    this._drawGaugeMode = 0;//
};

const _Sprite_Gauge_drawLabel = Sprite_Gauge.prototype.drawLabel;
Sprite_Gauge.prototype.drawLabel = function() {
    const oldBitmap = this.bitmap;
    this.bitmap = this.textSprite ? this.textSprite.bitmap : this.bitmap;
    const context = this.bitmap.context;
    if (this._gaugeImgData) {
        context.beginPath();
        context.save();
        this.gaugeRotate(context);
    }
    if (this._gaugeImgData && this._gaugeImgData.LabelGaugeImg && this._gaugeImgData.LabelGaugeImg.Gaugeimage) {
        const bitmapImg = this._gaugeImgData.LabelGaugeImg.Gaugeimage;
        const bitmap = ImageManager.nuun_LoadPictures(bitmapImg);
        if (bitmapImg && !bitmap.isReady()) {
            bitmap.addLoadListener(this.setupDrawLabel.bind(this, bitmap));
        } else if (bitmapImg) {
            this.setupDrawLabel(bitmap);
        }
    } else {
        if (this._gaugeImgData) {
            context.translate(this._gaugeImgData.LabelGaugeImg.GaugeX + this._gaugeImgData.GaugeImgX, this._gaugeImgData.LabelGaugeImg.GaugeY + this._gaugeImgData.GaugeImgY);
        }
        _Sprite_Gauge_drawLabel.call(this);
    }
    if (this._gaugeImgData) {
        context.restore();
        this.bitmap = oldBitmap;
    }
};

Sprite_Gauge.prototype.setupDrawLabel = function(bitmap) {
    const width = this._gaugeImgData.LabelGaugeImg.GaugeSW || bitmap.width;
    const height = this._gaugeImgData.LabelGaugeImg.GaugeSH || bitmap.height;
    const dx = this._gaugeImgData.LabelGaugeImg.GaugeX + this._gaugeImgData.GaugeImgX;
    const dy = this._gaugeImgData.LabelGaugeImg.GaugeY + this._gaugeImgData.GaugeImgY;
    const sx = this._gaugeImgData.LabelGaugeImg.GaugeSX;
    const sy = this._gaugeImgData.LabelGaugeImg.GaugeSY;
    this.bitmap.paintOpacity = this.labelOpacity();
    this.bitmap.blt(bitmap, sx, sy, width, height, dx, dy);
    this.bitmap.paintOpacity = 255;
};

const _Sprite_Gauge_drawValue = Sprite_Gauge.prototype.drawValue;
Sprite_Gauge.prototype.drawValue = function() {
    const oldBitmap = this.bitmap;
    let context = null;
    if (this._valueImgBitmap) {
        this._digitSprite.rotation = (this._gaugeImgData.GaugeValueAngle * Math.PI / 180);
        if (this._gaugeData && this._gaugeData.isData()) {
            this.drawValueEXImg();
        } else {
            this.drawValueImg();
        }
    } else {
        this.bitmap = this.textSprite ? this.textSprite.bitmap : this.bitmap;
        context = this.bitmap.context;
        if (this._gaugeImgData) {
            context.beginPath();
            context.save();
            this.gaugeRotate(context);
        }
        _Sprite_Gauge_drawValue.call(this);
    }
    if (this._gaugeImgData && !!context) {
        context.restore();
        this.bitmap = oldBitmap;
    }
};

Sprite_Gauge.prototype.gaugeRotate = function(context) {
    const tsx = this._gaugeImgData.GaugeImgWidth / 2;
    const tsy = this._gaugeImgData.GaugeImgHeight / 2;
    context.translate(tsx, tsy);
    context.rotate(this._gaugeImgData.GaugeImgAngle * Math.PI / 180);
    context.translate(-tsx, -tsy);
};

try {
    const _Sprite_NuunGauge_drawValueExp = Sprite_NuunGauge.prototype.drawValueExp;
    Sprite_NuunGauge.prototype.drawValueExp = function() {
        Sprite_Gauge.prototype.drawValueExp.call(this, "base");
    };
} catch (error) {
    
}

try {
    const _Sprite_MenuGauge_drawValueExp = Sprite_MenuGauge.prototype.drawValueExp;
    Sprite_MenuGauge.prototype.drawValueExp = function() {
        Sprite_Gauge.prototype.drawValueExp.call(this, "menu");
    };
} catch (error) {
    
}

try {
    const _Sprite_StatusExpGauge_drawValueExp = Sprite_StatusExpGauge.prototype.drawValueExp;
    Sprite_StatusExpGauge.prototype.drawValueExp = function() {
        Sprite_Gauge.prototype.drawValueExp.call(this, "status");
    };
} catch (error) {
    
}

Sprite_Gauge.prototype.drawValueExp = function(param) {
    const mode = this.expDisplayModeParam();
    if (mode === 0) {
        return;
    }
    const oldBitmap = this.bitmap;
    let context = null;
    if (this._valueImgBitmap) {
        this._digitSprite.rotation = (this._gaugeImgData.GaugeValueAngle * Math.PI / 180);
        this.drawExpValueImg();
    } else {
        this.bitmap = this.textSprite ? this.textSprite.bitmap : this.bitmap;
        context = this.bitmap.context;
        if (this._gaugeImgData) {
            context.beginPath();
            context.save();
            this.gaugeRotate(context);
        }
        if (param === "base") {
            _Sprite_NuunGauge_drawValueExp.call(this);
        } else if (param === "menu") {
            _Sprite_MenuGauge_drawValueExp.call(this);
        } else if (param === "status") {
            _Sprite_StatusExpGauge_drawValueExp.call(this);
        } else if (param === "result") {
            //_Sprite_StatusExpGauge_drawValueExp.call(this);
        }
        if (this._gaugeImgData) {
            context.restore();
            this.bitmap = oldBitmap;
        }
    }
};

Sprite_Gauge.prototype.drawValueEXImg = function() {
    this._gaugeData.drawValueEXImg()
};

Sprite_Gauge.prototype.drawExpValueImg = function() {
    const mode = this.expDisplayModeParam();
    let currentValue = this.displyaExp();
    if (mode === 3) {
        currentValue = this._battler.isMaxLevel() ? "100" : currentValue;
    } else {
        currentValue = this._battler.isMaxLevel() ? "-------" : currentValue;
    }
    if (!isNaN(currentValue)) {
        this.createDigits(currentValue);
    }
};

Sprite_Gauge.prototype.drawValueImg = function() {
    const currentValue = this.currentValue();
    this.createDigits(currentValue);
};

Sprite_Gauge.prototype.createDigits = function(value) {
    for (const sprite of this._Digit) {
        if (sprite) {
            sprite.bitmap = null;
        }
    }
    const string = Math.abs(value).toString();
    const w = this.nuun_DigitWidth();
    const h = this.nuun_DigitHeight();
    for (let i = 0; i < string.length; i++) {
        const n = Number(string[i]);
        const sprite = this._Digit[i] ? this._Digit[i] : this.createChildSprite(w, h);
        sprite.bitmap = this.getValueBitmap();
        sprite.setFrame(n * w, 0, w, h);
        sprite.x = this.drawValuePositionImg(w * (string.length - 1)) + i * w + (this._gaugeImgData.ValueX || 0);
        sprite.y = (this._gaugeImgData.ValueY || 0);
        this._Digit[i] = sprite;
    }
};

Sprite_Gauge.prototype.drawValueAlignImg = function() {
    if (Imported.NUUN_GaugeValueEX && this._gaugeData) {
        return this._gaugeData.valueAlign();
    } else {
        return 'right';
    }
};


Sprite_Gauge.prototype.drawValueAlignAnchorX = function() {
    switch (this.drawValueAlignImg()) {
        case 'left':
            return 0.0;
        case 'center':
            return 1.0;
        case 'right':
            return 1.0;
        default:
            return 1.0;
    }
};

Sprite_Gauge.prototype.drawValuePositionImg = function(width) {
    switch (this.drawValueAlignImg()) {
        case 'left':
            return this.gaugeX();
        case 'center':
            return this.gaugeX() + (this.bitmapWidth() - width) / 2;
        case 'right':
            return this.bitmapWidth() - width;
        default:
            return this.bitmapWidth() - width;
    }
};

Sprite_Gauge.prototype.getValueBitmap = function() {
    const id = getBattlerStatus(this._battler);
    return this._valueImgBitmap[id];
};

Sprite_Gauge.prototype.createChildSprite = function(width, height) {
    const sprite = new Sprite();
    sprite.bitmap = this.createValueBitmap(width, height);
    sprite.anchor.x = this.drawValueAlignAnchorX();
    sprite.anchor.y = 0.0;
    sprite.y = 0;
    this._digitSprite.addChild(sprite);
    return sprite;
};

Sprite_Gauge.prototype.createValueBitmap = function(width, height) {
    return new Bitmap(width, height);
};

Sprite_Gauge.prototype.nuun_DigitWidth = function() {
    return this._valueImgBitmap[0].width / 10;
};

Sprite_Gauge.prototype.nuun_DigitHeight = function() {
    return this._valueImgBitmap[0].height;
};

const _Sprite_Gauge_redraw = Sprite_Gauge.prototype.redraw;
Sprite_Gauge.prototype.redraw = function() {
    if (this.textSprite) {
        this.textSprite.bitmap.clear();
    }
    _Sprite_Gauge_redraw.call(this);
};

Sprite_Gauge.prototype.updateGaugeImg = function() {
    if (this._statusType == 'hp' && this._battler.isDying()) {
        this._gaugeImgData.GaugeCondImg && this._gaugeImgData.GaugeCondImg.Gaugeimage ? this.setCondGaugeImg() : this.setDefaultGaugeImg();
    } else if ((this._statusType == 'time'  || this._statusType == 'cast') && this._battler.isTpbCast()) {
        this._gaugeImgData.GaugeCondImg && this._gaugeImgData.GaugeCondImg.Gaugeimage ? this.setCondGaugeImg() : this.setDefaultGaugeImg();
    } else if (this.isMaxValue()) {
        this._gaugeImgData.GaugeMaxImg && this._gaugeImgData.GaugeMaxImg.Gaugeimage ? this.setMaxGaugeImg() : this.setDefaultGaugeImg();
    } else {
        this.setDefaultGaugeImg();
    }
};

Sprite_Gauge.prototype.setDefaultGaugeImg  = function() {
    this._gaugeImgMode = 'default';
    this.setImgBitmap = this._GaugeImgBitmap;
};

Sprite_Gauge.prototype.setCondGaugeImg  = function() {
    this._gaugeImgMode = 'cond';
    this.setImgBitmap = this._GaugeImgCondBitmap;
};

Sprite_Gauge.prototype.setMaxGaugeImg  = function() {
    this._gaugeImgMode = 'max';
    this.setImgBitmap = this._GaugeImgMaxBitmap;
};

Sprite_Gauge.prototype.isMaxValue = function() {
    return this.currentValue() >= this.currentMaxValue();
};

Sprite_Gauge.prototype.getMainGaugeImg  = function() {
    if (this._gaugeImgMode === 'cond') {
        return this._gaugeImgData.GaugeCondImg;
    } else if (this._gaugeImgMode === 'max') {
        return this._gaugeImgData.GaugeMaxImg;
    } else {
        return this._gaugeImgData.MainGaugeImg;
    }
};


Game_Battler.prototype.isTpbCast = function() {
    return this._tpbState === "casting" && this.tpbRequiredCastTime() > 0 || this.isActing() || this._tpbState === "ready";
};

function getBattlerStatus(battler) {
    if (!battler || typeof battler === 'string') {
        return 0;
    } else if (battler.isDead()) {
        return 2;
    } else if (battler.isDying()) {
        return 1;
    } else {
        return 0;
    }
};

})();