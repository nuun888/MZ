/*:-----------------------------------------------------------------------------------
 * NUUN_GaugeValueEX.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Gauge display EX
 * @author NUUN
 * @version 1.4.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * Extend the display of the gauge.
 * 
 * This plugin extends the following functionality:
 * Hide gauge
 * Number display method
 * Change the coordinates of numbers and labels
 * Gauge color change at max and below a certain percentage
 * Label icon display
 * 
 * Gauge numeric display format specifications
 * "time" (TPB gauge) does not display a numerical value.
 * 
 * Numeric display width
 * If you specify only numeric values, enclose them with ''.
 * 
 * The application priority of the gauge numerical value setting is given priority to the upper setting. Set the target to the bottom for the 'all' setting.
 * 
 * Font settings
 * Any font can be set for gauge numbers and labels.
 * 
 * color settings
 * All color settings can specify the color code from the text tab.
 *
 * Normal gauge color
 * By entering -1 for the normal gauge color (entering -1 in the text tab for editor Ver.1.6.0 or later), the original gauge color will be applied.
 * 
 * FilteringClass
 * Enter the applicable window class or gauge class, identification name, or identifier.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * To change the font, you need a separate plug-in to load the font.
 * Triacontane font load plug-in recommended
 * https://triacontane.blogspot.com/
 * 
 * Log
 * 4/16/2022 Ver.1.4.2
 * Modified filtering class processing to support "ExtraGauge" and "SceneCustomMenu".
 * 12/24/2022 Ver.1.4.1
 * Fixed an issue where normal gauge color settings were not being applied.
 * 12/15/2022 Ver.1.4.0
 * Added a function that can change numbers and labels to arbitrary fonts.
 * Fixed an issue where displaying an unset gauge type would cause an error.
 * 12/15/2022 Ver.1.3.3
 * Added a function to display the number display in the main font.
 * 12/13/2022 Ver.1.3.2
 * Fixed the problem that an error occurs when displaying with core script Ver.1.3.2 or earlier versions.
 * 12/6/2022 Ver.1.3.1
 * Changed the Type of color specification plug-in parameter to color. (Core script Ver.1.6.0 or later)
 * Changed the Type of icon specified plug-in parameter to icon. (Core script Ver.1.6.0 or later)
 * 11/25/2022 Ver.1.3.0
 * Added a function that can specify an icon for the label.
 * Changed the display in languages other than Japanese to English.
 * 7/19/2022 Ver.1.2.1
 * Added function to center the position of numbers.
 * 7/18/2022 Ver.1.2.0
 * Added a function that can specify the class to be displayed.
 * Changed font size specifications.
 * Changed processing of numeric display.
 * Added a function that can specify left alignment and right alignment of numerical values.
 * 1/3/2022 Ver.1.1.1
 * Changed so that the current value, /, and maximum value coordinate change can be changed respectively.
 * 12/12/2021 Ver.1.0.3
 * Changed because some plugins and functions were duplicated.
 * 12/5/2021 Ver.1.0.2
 * Fixed an issue where gauge hiding was not being applied.
 * 12/5/2021 Ver.1.0.1
 * Corrected so that the current value/maximum value is aligned to the right.
 * Fixed an issue where gauges below a certain percentage other than HP were not applied.
 * Fixed an issue where the color of numbers below a certain percentage was not applied at maximum.
 * Fixed an issue where the label's X coordinate was not applied.
 * Fixed some processing.
 * 12/4/2021 Ver.1.0.0
 * First edition
 * 
 * @param CommonSetting
 * @text Common setting
 * @default ------------------------------
 * 
 * @param GaugeValueSetting
 * @text Gauge value setting
 * @desc Gauge value setting.
 * @type struct<ValueGauge>[]
 * @default ["{\"Type\":\"'hp'\",\"ValueVisible\":\"'Value'\",\"ValueAlign\":\"'default'\",\"GaugeVisible\":\"true\",\"ValueDigits\":\"\",\"LabelIcon\":\"0\",\"LabelIconScale\":\"100\",\"FilteringClass\":\"\",\"CoordinateSetting\":\"------------------------------\",\"ValueWidth\":\"0\",\"GaugeAbsoluteCoordinates\":\"false\",\"GaugeX\":\"-1\",\"GaugeY\":\"0\",\"ValueAbsoluteCoordinates\":\"false\",\"ValueX\":\"0\",\"ValueY\":\"0\",\"MaxValueX\":\"0\",\"MaxValueY\":\"0\",\"SeparationX\":\"0\",\"SeparationY\":\"0\",\"LabelAbsoluteCoordinates\":\"false\",\"LabelX\":\"0\",\"LabelY\":\"3\",\"ValueSpaceMargin\":\"0\",\"ValueMargin\":\"0\",\"UserLabelFontFace\":\"\",\"FontSetting\":\"------------------------------\",\"ValueFontSize\":\"-6\",\"MaxValueFontSize\":\"-6\",\"SeparationFontSize\":\"-6\",\"LabelFontSize\":\"-2\",\"ValueFontFace\":\"false\",\"UserValueFontFace\":\"\",\"ColorSetting\":\"------------------------------\",\"MaxValueColor\":\"0\",\"SeparationColor\":\"0\",\"LabelColor\":\"16\",\"GaugeColorSetting\":\"------------------------------\",\"GaugeColor1\":\"-1\",\"GaugeColor2\":\"-1\",\"GaugeColorMaxSetting\":\"------------------------------\",\"GaugeColorMaxApply\":\"false\",\"MaxGaugeColor1\":\"0\",\"MaxGaugeColor2\":\"0\",\"GaugeColorRatioSetting\":\"------------------------------\",\"GaugeColorRatioApply\":\"false\",\"RatioGauge\":\"0\",\"RatioGaugeColor1\":\"0\",\"RatioGaugeColor2\":\"0\"}","{\"Type\":\"'mp'\",\"ValueVisible\":\"'Value'\",\"ValueAlign\":\"'default'\",\"GaugeVisible\":\"true\",\"ValueDigits\":\"\",\"LabelIcon\":\"0\",\"LabelIconScale\":\"100\",\"FilteringClass\":\"\",\"CoordinateSetting\":\"------------------------------\",\"ValueWidth\":\"0\",\"GaugeAbsoluteCoordinates\":\"false\",\"GaugeX\":\"-1\",\"GaugeY\":\"0\",\"ValueAbsoluteCoordinates\":\"false\",\"ValueX\":\"0\",\"ValueY\":\"0\",\"MaxValueX\":\"0\",\"MaxValueY\":\"0\",\"SeparationX\":\"0\",\"SeparationY\":\"0\",\"LabelAbsoluteCoordinates\":\"false\",\"LabelX\":\"0\",\"LabelY\":\"3\",\"ValueSpaceMargin\":\"0\",\"ValueMargin\":\"0\",\"UserLabelFontFace\":\"\",\"FontSetting\":\"------------------------------\",\"ValueFontSize\":\"-6\",\"MaxValueFontSize\":\"-6\",\"SeparationFontSize\":\"-6\",\"LabelFontSize\":\"-2\",\"ValueFontFace\":\"false\",\"UserValueFontFace\":\"\",\"ColorSetting\":\"------------------------------\",\"MaxValueColor\":\"0\",\"SeparationColor\":\"0\",\"LabelColor\":\"16\",\"GaugeColorSetting\":\"------------------------------\",\"GaugeColor1\":\"-1\",\"GaugeColor2\":\"-1\",\"GaugeColorMaxSetting\":\"------------------------------\",\"GaugeColorMaxApply\":\"false\",\"MaxGaugeColor1\":\"0\",\"MaxGaugeColor2\":\"0\",\"GaugeColorRatioSetting\":\"------------------------------\",\"GaugeColorRatioApply\":\"false\",\"RatioGauge\":\"0\",\"RatioGaugeColor1\":\"0\",\"RatioGaugeColor2\":\"0\"}","{\"Type\":\"'tp'\",\"ValueVisible\":\"'Value'\",\"ValueAlign\":\"'default'\",\"GaugeVisible\":\"true\",\"ValueDigits\":\"\",\"LabelIcon\":\"0\",\"LabelIconScale\":\"100\",\"FilteringClass\":\"\",\"CoordinateSetting\":\"------------------------------\",\"ValueWidth\":\"0\",\"GaugeAbsoluteCoordinates\":\"false\",\"GaugeX\":\"-1\",\"GaugeY\":\"0\",\"ValueAbsoluteCoordinates\":\"false\",\"ValueX\":\"0\",\"ValueY\":\"0\",\"MaxValueX\":\"0\",\"MaxValueY\":\"0\",\"SeparationX\":\"0\",\"SeparationY\":\"0\",\"LabelAbsoluteCoordinates\":\"false\",\"LabelX\":\"0\",\"LabelY\":\"3\",\"ValueSpaceMargin\":\"0\",\"ValueMargin\":\"0\",\"UserLabelFontFace\":\"\",\"FontSetting\":\"------------------------------\",\"ValueFontSize\":\"-6\",\"MaxValueFontSize\":\"-6\",\"SeparationFontSize\":\"-6\",\"LabelFontSize\":\"-2\",\"ValueFontFace\":\"false\",\"UserValueFontFace\":\"\",\"ColorSetting\":\"------------------------------\",\"MaxValueColor\":\"0\",\"SeparationColor\":\"0\",\"LabelColor\":\"16\",\"GaugeColorSetting\":\"------------------------------\",\"GaugeColor1\":\"-1\",\"GaugeColor2\":\"-1\",\"GaugeColorMaxSetting\":\"------------------------------\",\"GaugeColorMaxApply\":\"false\",\"MaxGaugeColor1\":\"0\",\"MaxGaugeColor2\":\"0\",\"GaugeColorRatioSetting\":\"------------------------------\",\"GaugeColorRatioApply\":\"false\",\"RatioGauge\":\"0\",\"RatioGaugeColor1\":\"0\",\"RatioGaugeColor2\":\"0\"}"]
 * @parent CommonSetting
 * 
 * @param ValueAlign
 * @desc Specifies the default numeric position.
 * @text default numeric position
 * @type select
 * @option Left
 * @value 'left'
 * @option Center
 * @value 'center'
 * @option Right
 * @value 'right'
 * @default 'right'
 * @parent CommonSetting
 * 
 * @param ValueDigits
 * @desc The display width of the numeric value when the default gauge numeric display format is current value/max value.
 * @text default number display width
 * @type string
 * @default '0000'
 * @parent CommonSetting
 * 
 * @param GaugeHeight
 * @desc Gauge height range. 0 is the default value *Applied even if not specified in the gauge value setting.
 * @text gauge height range
 * @type number
 * @default 0
 * @parent CommonSetting
 * 
 */
 /*~struct~ValueGauge:
 * 
 * @param Type
 * @text Status type
 * @desc Display status type.
 * @type combo
 * @option 'all'
 * @option 'hp'
 * @option 'mp'
 * @option 'tp'
 * @option 'time'
 * @option 'limit'
 * @default 
 * 
 * @param ValueVisible
 * @desc Specifies the gauge numeric display format.
 * @text Gauge numeric display format
 * @type select
 * @option Current value only
 * @value 'Value'
 * @option Current/Max
 * @value 'ValueMaxValue'
 * @option None
 * @value 'NoValue'
 * @default 'Value'
 * 
 * @param ValueAlign
 * @desc Specifies the numeric position.
 * @text Numeric position
 * @type select
 * @option Left
 * @value 'left'
 * @option Center
 * @value 'center'
 * @option Right
 * @value 'right'
 * @option Default
 * @value 'default'
 * @default 'default'
 * 
 * @param GaugeVisible
 * @desc Show gauge.
 * @text Show gauge
 * @type boolean
 * @default true
 * 
 * @param ValueDigits
 * @desc The display width of the numerical value when the gauge numerical display format is the current value/max value.
 * @text Numeric display width
 * @type string
 * @default 
 * 
 * @param LabelIcon
 * @desc Label icon ID. 0 is displayed as a letter.
 * @text Label icon ID
 * @type icon
 * @default 0
 * @min 0
 * 
 * @param LabelIconScale
 * @desc Specifies the magnification of the label icon. (percentage)
 * @text Label icon magnification
 * @type number
 * @default 100
 * @min 0
 * 
 * @param FilteringClass
 * @text Filtering class setting
 * @desc Specifies the window class to apply. If not specified, it will be reflected in all windows. (multiple selection)
 * @type combo[]
 * @option 'Window_MenuStatus'
 * @option 'Window_MenuActor'
 * @option 'Window_Status'
 * @option 'Window_BattleStatus'
 * @option 'Window_BattleActor'
 * @option 'Window_BattleActorStatus'
 * @option 'Window_Result'
 * @option 'Window_FormationStatus'
 * @option 'Sprite_Enemy'
 * @option 'Window_CustomMenuDataList'
 * @default
 * 
 * @param CoordinateSetting
 * @text Coordinate setting
 * @default ------------------------------
 * 
 * @param ValueWidth
 * @desc Numeric display range
 * @text Numeric display range
 * @type number
 * @default 0
 * @min 0
 * @parent CoordinateSetting
 * 
 * @param GaugeAbsoluteCoordinates
 * @desc Make gauge coordinates (current value, maximum value, /) absolute coordinates. (OFF relative coordinates)
 * @text gauge coordinates absolute coordinates
 * @type boolean
 * @default false
 * @parent CoordinateSetting
 * 
 * @param GaugeX
 * @desc The starting X coordinate of the left edge of the gauge. (-1 shifts by label)
 * @text Gauge start X coordinate
 * @type number
 * @default -1
 * @min -1
 * @parent CoordinateSetting
 * 
 * @param GaugeY
 * @desc Y coordinate of the gauge.
 * @text Gauge Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param ValueAbsoluteCoordinates
 * @desc Convert numeric coordinates (current value, maximum value, /) to absolute coordinates. (OFF relative coordinates)
 * @text Numeric coordinates absolute coordinates
 * @type boolean
 * @default false
 * @parent CoordinateSetting
 * 
 * @param ValueX
 * @desc Adjust the X coordinate of the current value.
 * @text Current value X coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param ValueY
 * @desc Adjust the Y coordinate of the current value.
 * @text Current value Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param MaxValueX
 * @desc Adjust the X coordinate of the maximum value.
 * @text Maximum X coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param MaxValueY
 * @desc Adjust the Y coordinate of the maximum value.
 * @text Maximum Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param SeparationX
 * @desc Adjust the X coordinate of "/".
 * @text "/" X coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param SeparationY
 * @desc Adjust the Y coordinate of "/".
 * @text "/" Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param LabelAbsoluteCoordinates
 * @desc Make the label coordinates (current value, maximum value, /) absolute coordinates. (OFF relative coordinates)
 * @text Label coordinates absolute coordinates
 * @type boolean
 * @default false
 * @parent CoordinateSetting
 * 
 * @param LabelX
 * @desc X coordinate of the label.
 * @text Label X coordinate
 * @type number
 * @default 0
 * @min 0
 * @parent CoordinateSetting
 * 
 * @param LabelY
 * @desc Y coordinate of the label.
 * @text Label Y coordinate
 * @type number
 * @default 3
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param ValueSpaceMargin
 * @desc Specify "/" and numeric padding.
 * @text "/" padding between numbers
 * @type number
 * @default 0
 * @min 0
 * @parent CoordinateSetting
 * 
 * @param ValueMargin
 * @desc Specifies the left margin for numbers. The display width of the gauge is deducted by the margin.
 * @text Numeric padding
 * @type number
 * @default 0
 * @min 0
 * @parent CoordinateSetting
 * 
 * @param UserLabelFontFace
 * @desc Specifies the font for any label. (no extension)
 * @text Font for label text
 * @type string
 * @default 
 * @parent CoordinateSetting
 * 
 * @param FontSetting
 * @text Font setting
 * @default ------------------------------
 * 
 * @param ValueFontSize
 * @desc The current numeric font size. (main font size + default current numeric font size)
 * @text Current numeric font size
 * @type number
 * @default -6
 * @min -9999
 * @parent FontSetting
 * 
 * @param MaxValueFontSize
 * @desc Maximum font size. (main font size + difference from default maximum font size)
 * @text Max font size
 * @type number
 * @default -6
 * @min -9999
 * @parent FontSetting
 * 
 * @param SeparationFontSize
 * @desc Font size for "/". (main font size + difference from default/font size)
 * @text "/"font size
 * @type number
 * @default -6
 * @min -9999
 * @parent FontSetting
 * 
 * @param LabelFontSize
 * @desc Default label font size. (main font size + difference from default label font size)
 * @text Default label font size
 * @type number
 * @default -2
 * @min -9999
 * @parent FontSetting
 * 
 * @param ValueFontFace
 * @desc Apply main font for numbers (turn off to use number font)
 * @text Apply main font for numeric text
 * @type boolean
 * @default false
 * @parent FontSetting
 * 
 * @param UserValueFontFace
 * @desc Specifies a font for arbitrary numbers. (no extension)
 * @text Numeric text font
 * @type string
 * @default 
 * @parent FontSetting
 * 
 * @param ColorSetting
 * @text Color setting
 * @default ------------------------------
 * 
 * @param MaxValueColor
 * @desc Maximum value color. (system color or color index (text tab)) -1 for the same color as the current value
 * @text Max color
 * @type color
 * @default 0
 * @min -1
 * @parent ColorSetting
 * 
 * @param SeparationColor
 * @desc Color of "/". (system color or color index (text tab)) -1 for the same color as the current value
 * @text "/" color
 * @type color
 * @default 0
 * @min -1
 * @parent ColorSetting
 * 
 * @param LabelColor
 * @desc Label color. (system color or color index (text tab))
 * @text Label color
 * @type color
 * @default 16
 * @min 0
 * @parent ColorSetting
 * 
 * @param GaugeColorSetting
 * @text Gauge setting
 * @default ------------------------------
 * 
 * @param GaugeColor1
 * @desc Gauge color left (-1 default value)
 * @text Gauge color left
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeColorSetting
 * 
 * @param GaugeColor2
 * @desc Gauge Color Right (-1 default value)
 * @text Gauge color right
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeColorSetting
 * 
 * @param GaugeColorMaxSetting
 * @text Max gauge setting
 * @default ------------------------------
 * 
 * @param GaugeColorMaxApply
 * @desc Applies a color change to gauges and numbers at max.
 * @text Max time gauge, number color change applied
 * @type boolean
 * @default false
 * @parent GaugeColorMaxSetting
 * 
 * @param MaxGaugeColor1
 * @desc Maximum Gauge Color Left (system color or color index (text tab))
 * @text Max Gauge Color Left
 * @type color
 * @default 0
 * @min 0
 * @parent GaugeColorMaxSetting
 * 
 * @param MaxGaugeColor2
 * @desc Gauge color right at max (system color or color index (text tab))
 * @text Max Gauge Color Right
 * @type color
 * @default 0
 * @min 0
 * @parent GaugeColorMaxSetting
 * 
 * @param GaugeColorRatioSetting
 * @text Gauge setting when below percentage
 * @default ------------------------------
 * 
 * @param GaugeColorRatioApply
 * @desc Applies a color change to gauges, numbers when percentage remaining changes.
 * @text Apply when change remaining ratio
 * @type boolean
 * @default false
 * @parent GaugeColorRatioSetting
 * 
 * @param RatioGauge
 * @desc Specifies the remaining percentage to change.By specifying 0 for HP, it will be applied when dying.
 * @text Remaining percentage rate changing
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorRatioSetting
 * 
 * @param RatioGaugeColor1
 * @desc Color for the left side of the gauge below the specified percentage. (system color or color index (text tab))
 * @text Specified percentage or less Gauge color Left
 * @type color
 * @default 0
 * @min 0
 * @parent GaugeColorRatioSetting
 * 
 * @param RatioGaugeColor2
 * @desc Color for the right side of the gauge below a specified percentage. (system color or color index (text tab))
 * @text Specified percentage or less gauge color right
 * @type color
 * @default 0
 * @min 0
 * @parent GaugeColorRatioSetting
 * 
 */
 /*~struct~GaugeHeightList:
 * 
 * @param GaugeHeight
 * @desc Gauge height range. (This is the display range, not the height of the gauge)
 * @text Gauge height range
 * @type number
 * @default 0
 * @min 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ゲージ表示拡張
 * @author NUUN
 * @version 1.4.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * ゲージの表示を拡張します。
 * 
 * このプラグインでは以下の機能を拡張します。
 * ゲージの非表示
 * 数値の表示方法
 * 数値、ラベルの座標変更
 * 最大時、特定の割合以下でのゲージの色変更
 * ラベルのアイコン表示
 * 
 * ゲージ数値表示形式の仕様
 * timeは数値が表示されません。
 * 
 * ゲージ数値設定の適用優先度は上に設定が優先されます。対象を'all'の設定は一番下に設定してください。
 * 
 * フォントの設定
 * ゲージの数値、ラベルに任意のフォントを設定できます。
 * なおフォントを変更するには別途フォントをロードするプラグインが必要です。
 * トリアコンタン様　フォントロードプラグイン推奨
 * https://triacontane.blogspot.com/
 * 
 * 色の設定
 * 色の設定は全てテキストタブからカラーコードを指定できます。
 * 
 * 通常時のゲージ色
 * 通常時のゲージの色は-1と記入(エディタVer.1.6.0以降の場合、テキストタブで-1と記入)することにより、元のゲージの色が適用されます。
 * 
 * フィルタリングクラス設定
 * 適用させるウィンドウクラスまたはゲージクラスまたは識別名、識別子を記入します。
 * 
 * Ver.1.2.0での変更点
 * フォントサイズをメインフォントサイズ+デフォルトフォントサイズ+個別フォントサイズに変更しました。
 * 数値の表示処理を変更しました。
 * ダメージ可視化機能は別プラグイン化しました。
 * ゲージ数値設定で設定していないゲージはデフォルトの表示のまま表示されるようになりました。
 * 全てのゲージに適用する場合は対象を'all'を選択してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/4/16 Ver.1.4.2
 * フィルタリングクラスの処理を汎用ゲージ追加プラグイン、カスタムメニュー作成プラグインに対応できるよう修正。
 * 2022/12/24 Ver.1.4.1
 * 通常時のゲージの色の設定が適用されていなかった問題を修正。
 * 2022/12/15 Ver.1.4.0
 * 数値、ラベルを任意のフォントに変更できる機能を追加。
 * 設定されていないゲージタイプを表示するとエラーが出る問題を修正。
 * 2022/12/15 Ver.1.3.3
 * 数値をメインフォントで表示させる機能を追加。
 * 2022/12/13 Ver.1.3.2
 * コアスクリプトVer.1.3.2以前のバージョンで表示するとエラーが出る問題を修正。
 * 2022/12/6 Ver.1.3.1
 * カラー指定のプラグインパラメータのTypeをcolorに変更。(コアスクリプトVer.1.6.0以降)
 * アイコン指定のプラグインパラメータのTypeをiconに変更。(コアスクリプトVer.1.6.0以降)
 * 2022/11/25 Ver.1.3.0
 * ラベルにアイコンを指定できる機能を追加。
 * 日本語以外での表示を英語表示に変更。
 * 2022/7/19 Ver.1.2.1
 * 数値の位置を中央揃えにする機能を追加。
 * 2022/7/18 Ver.1.2.0
 * 表示するクラスを指定できる機能を追加。
 * フォントサイズの仕様を変更。
 * 数値表示の処理の変更。
 * 数値の左揃え、右揃えを指定できる機能を追加。
 * ダメージ可視化機能は別プラグイン化。
 * 2022/1/3 Ver.1.1.1
 * 現在値、/、最大値の座標変更をそれぞれ変更できるように変更。
 * ダメージ可視化機能をルルの協会様LL_ExGaugeDrawingの「ゲージに立体感をつける」への対応。
 * 現在値のフォントカラーを設定する機能を廃止。
 * 2022/1/1 Ver.1.1.0
 * ダメージを可視化するゲージを表示する機能を追加。
 * 2021/12/12 Ver.1.0.3
 * 一部プラグインと関数が重複したため変更。
 * 2021/12/5 Ver.1.0.2
 * ゲージの非表示が適用されていなかった問題を修正。
 * 2021/12/5 Ver.1.0.1
 * 現在値/最大値が右揃えになるように修正。
 * HP以外の特定割合以下でのゲージが適用されていなかった問題を修正。
 * 最大時、特定割合以下での数値の色が適用されていなかった問題を修正。
 * ラベルのX座標が適用されていなかった問題を修正。
 * 一部の処理を修正。
 * 2021/12/4 Ver.1.0.0
 * 初版
 * 
 * @param CommonSetting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param GaugeValueSetting
 * @text ゲージ数値設定
 * @desc ゲージ数値設定
 * @type struct<ValueGauge>[]
 * @default ["{\"Type\":\"'hp'\",\"ValueVisible\":\"'Value'\",\"ValueAlign\":\"'default'\",\"GaugeVisible\":\"true\",\"ValueDigits\":\"\",\"LabelIcon\":\"0\",\"LabelIconScale\":\"100\",\"FilteringClass\":\"\",\"CoordinateSetting\":\"------------------------------\",\"ValueWidth\":\"0\",\"GaugeAbsoluteCoordinates\":\"false\",\"GaugeX\":\"-1\",\"GaugeY\":\"0\",\"ValueAbsoluteCoordinates\":\"false\",\"ValueX\":\"0\",\"ValueY\":\"0\",\"MaxValueX\":\"0\",\"MaxValueY\":\"0\",\"SeparationX\":\"0\",\"SeparationY\":\"0\",\"LabelAbsoluteCoordinates\":\"false\",\"LabelX\":\"0\",\"LabelY\":\"3\",\"ValueSpaceMargin\":\"0\",\"ValueMargin\":\"0\",\"UserLabelFontFace\":\"\",\"FontSetting\":\"------------------------------\",\"ValueFontSize\":\"-6\",\"MaxValueFontSize\":\"-6\",\"SeparationFontSize\":\"-6\",\"LabelFontSize\":\"-2\",\"ValueFontFace\":\"false\",\"UserValueFontFace\":\"\",\"ColorSetting\":\"------------------------------\",\"MaxValueColor\":\"0\",\"SeparationColor\":\"0\",\"LabelColor\":\"16\",\"GaugeColorSetting\":\"------------------------------\",\"GaugeColor1\":\"-1\",\"GaugeColor2\":\"-1\",\"GaugeColorMaxSetting\":\"------------------------------\",\"GaugeColorMaxApply\":\"false\",\"MaxGaugeColor1\":\"0\",\"MaxGaugeColor2\":\"0\",\"GaugeColorRatioSetting\":\"------------------------------\",\"GaugeColorRatioApply\":\"false\",\"RatioGauge\":\"0\",\"RatioGaugeColor1\":\"0\",\"RatioGaugeColor2\":\"0\"}","{\"Type\":\"'mp'\",\"ValueVisible\":\"'Value'\",\"ValueAlign\":\"'default'\",\"GaugeVisible\":\"true\",\"ValueDigits\":\"\",\"LabelIcon\":\"0\",\"LabelIconScale\":\"100\",\"FilteringClass\":\"\",\"CoordinateSetting\":\"------------------------------\",\"ValueWidth\":\"0\",\"GaugeAbsoluteCoordinates\":\"false\",\"GaugeX\":\"-1\",\"GaugeY\":\"0\",\"ValueAbsoluteCoordinates\":\"false\",\"ValueX\":\"0\",\"ValueY\":\"0\",\"MaxValueX\":\"0\",\"MaxValueY\":\"0\",\"SeparationX\":\"0\",\"SeparationY\":\"0\",\"LabelAbsoluteCoordinates\":\"false\",\"LabelX\":\"0\",\"LabelY\":\"3\",\"ValueSpaceMargin\":\"0\",\"ValueMargin\":\"0\",\"UserLabelFontFace\":\"\",\"FontSetting\":\"------------------------------\",\"ValueFontSize\":\"-6\",\"MaxValueFontSize\":\"-6\",\"SeparationFontSize\":\"-6\",\"LabelFontSize\":\"-2\",\"ValueFontFace\":\"false\",\"UserValueFontFace\":\"\",\"ColorSetting\":\"------------------------------\",\"MaxValueColor\":\"0\",\"SeparationColor\":\"0\",\"LabelColor\":\"16\",\"GaugeColorSetting\":\"------------------------------\",\"GaugeColor1\":\"-1\",\"GaugeColor2\":\"-1\",\"GaugeColorMaxSetting\":\"------------------------------\",\"GaugeColorMaxApply\":\"false\",\"MaxGaugeColor1\":\"0\",\"MaxGaugeColor2\":\"0\",\"GaugeColorRatioSetting\":\"------------------------------\",\"GaugeColorRatioApply\":\"false\",\"RatioGauge\":\"0\",\"RatioGaugeColor1\":\"0\",\"RatioGaugeColor2\":\"0\"}","{\"Type\":\"'tp'\",\"ValueVisible\":\"'Value'\",\"ValueAlign\":\"'default'\",\"GaugeVisible\":\"true\",\"ValueDigits\":\"\",\"LabelIcon\":\"0\",\"LabelIconScale\":\"100\",\"FilteringClass\":\"\",\"CoordinateSetting\":\"------------------------------\",\"ValueWidth\":\"0\",\"GaugeAbsoluteCoordinates\":\"false\",\"GaugeX\":\"-1\",\"GaugeY\":\"0\",\"ValueAbsoluteCoordinates\":\"false\",\"ValueX\":\"0\",\"ValueY\":\"0\",\"MaxValueX\":\"0\",\"MaxValueY\":\"0\",\"SeparationX\":\"0\",\"SeparationY\":\"0\",\"LabelAbsoluteCoordinates\":\"false\",\"LabelX\":\"0\",\"LabelY\":\"3\",\"ValueSpaceMargin\":\"0\",\"ValueMargin\":\"0\",\"UserLabelFontFace\":\"\",\"FontSetting\":\"------------------------------\",\"ValueFontSize\":\"-6\",\"MaxValueFontSize\":\"-6\",\"SeparationFontSize\":\"-6\",\"LabelFontSize\":\"-2\",\"ValueFontFace\":\"false\",\"UserValueFontFace\":\"\",\"ColorSetting\":\"------------------------------\",\"MaxValueColor\":\"0\",\"SeparationColor\":\"0\",\"LabelColor\":\"16\",\"GaugeColorSetting\":\"------------------------------\",\"GaugeColor1\":\"-1\",\"GaugeColor2\":\"-1\",\"GaugeColorMaxSetting\":\"------------------------------\",\"GaugeColorMaxApply\":\"false\",\"MaxGaugeColor1\":\"0\",\"MaxGaugeColor2\":\"0\",\"GaugeColorRatioSetting\":\"------------------------------\",\"GaugeColorRatioApply\":\"false\",\"RatioGauge\":\"0\",\"RatioGaugeColor1\":\"0\",\"RatioGaugeColor2\":\"0\"}"]
 * @parent CommonSetting
 * 
 * @param ValueAlign
 * @desc デフォルトの数値の位置を指定します。
 * @text デフォルト数値位置
 * @type select
 * @option 左揃え
 * @value 'left'
 * @option 中央
 * @value 'center'
 * @option 右揃え
 * @value 'right'
 * @default 'right'
 * 
 * @param ValueDigits
 * @desc デフォルトのゲージ数値表示形式が現在値/最大値の数値の表示幅。(空白で数値を詰めます。現在値/最大値のみ)
 * @text デフォルト数値の表示幅
 * @type string
 * @default '0000'
 * @parent CommonSetting
 * 
 * @param GaugeHeight
 * @desc ゲージの高さ範囲。0でデフォルト値 ※ゲージ数値設定で指定していなくても適用されます。
 * @text ゲージの高さ範囲
 * @type number
 * @default 0
 * @parent CommonSetting
 * 
 */
/*~struct~ValueGauge:ja
 * 
 * @param Type
 * @text 対象
 * @desc 表示ステータスタイプ対象
 * @type combo
 * @option 'all'
 * @option 'hp'
 * @option 'mp'
 * @option 'tp'
 * @option 'time'
 * @option 'limit'
 * @default 
 * 
 * @param ValueVisible
 * @desc ゲージ数値表示形式を指定します。
 * @text ゲージ数値表示形式
 * @type select
 * @option 現在値のみ
 * @value 'Value'
 * @option 現在値/最大値
 * @value 'ValueMaxValue'
 * @option 表示なし
 * @value 'NoValue'
 * @default 'Value'
 * 
 * @param ValueAlign
 * @desc 数値の位置を指定します。
 * @text 数値位置
 * @type select
 * @option 左揃え
 * @value 'left'
 * @option 中央
 * @value 'center'
 * @option 右揃え
 * @value 'right'
 * @option デフォルト
 * @value 'default'
 * @default 'default'
 * 
 * @param GaugeVisible
 * @desc ゲージを表示する。
 * @text ゲージ表示
 * @type boolean
 * @default true
 * 
 * @param ValueDigits
 * @desc ゲージ数値表示形式が現在値/最大値の数値の表示幅。数値のみで指定する場合は''で囲ってください。
 * @text 数値の表示幅
 * @type string
 * @default 
 * 
 * @param LabelIcon
 * @desc ラベルアイコンID。0で文字で表示されます。
 * @text ラベルアイコンID
 * @type icon
 * @default 0
 * @min 0
 * 
 * @param LabelIconScale
 * @desc ラベルアイコンの拡大率を指定します。(百分率)
 * @text ラベルアイコン拡大率
 * @type number
 * @default 100
 * @min 0
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
 * @option 'Sprite_Enemy'
 * @option 'Window_CustomMenuDataList'
 * @default
 * 
 * @param CoordinateSetting
 * @text 座標設定
 * @default ------------------------------
 * 
 * @param ValueWidth
 * @desc 数値の表示範囲
 * @text 数値表示範囲
 * @type number
 * @default 0
 * @min 0
 * @parent CoordinateSetting
 * 
 * @param GaugeAbsoluteCoordinates
 * @desc ゲージ座標(現在値、最大値、/)を絶対座標にする。(OFF相対座標)
 * @text ゲージ座標絶対座標
 * @type boolean
 * @default false
 * @parent CoordinateSetting
 * 
 * @param GaugeX
 * @desc ゲージの左端の開始X座標。(-1でラベル分シフトします)
 * @text ゲージ開始X座標
 * @type number
 * @default -1
 * @min -1
 * @parent CoordinateSetting
 * 
 * @param GaugeY
 * @desc ゲージのY座標。
 * @text ゲージY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param ValueAbsoluteCoordinates
 * @desc 数値座標(現在値、最大値、/)を絶対座標にする。(OFF相対座標)
 * @text 数値座標絶対座標
 * @type boolean
 * @default false
 * @parent CoordinateSetting
 * 
 * @param ValueX
 * @desc 現在値のX座標を調整します。
 * @text 現在値X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param ValueY
 * @desc 現在値のY座標を調整します。
 * @text 現在値Y座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param MaxValueX
 * @desc 最大値のX座標を調整します。
 * @text 最大値X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param MaxValueY
 * @desc 最大値のY座標を調整します。
 * @text 最大値Y座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param SeparationX
 * @desc /のX座標を調整します。
 * @text /X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param SeparationY
 * @desc /のY座標を調整します。
 * @text /Y座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param LabelAbsoluteCoordinates
 * @desc ラベル座標(現在値、最大値、/)を絶対座標にする。(OFF相対座標)
 * @text ラベル座標絶対座標
 * @type boolean
 * @default false
 * @parent CoordinateSetting
 * 
 * @param LabelX
 * @desc ラベルのX座標。
 * @text ラベルX座標
 * @type number
 * @default 0
 * @min 0
 * @parent CoordinateSetting
 * 
 * @param LabelY
 * @desc ラベルのY座標。
 * @text ラベルY座標
 * @type number
 * @default 3
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param ValueSpaceMargin
 * @desc /と数値の余白を指定します。
 * @text /数値間の余白
 * @type number
 * @default 0
 * @min 0
 * @parent CoordinateSetting
 * 
 * @param ValueMargin
 * @desc 左側の数値の余白を指定します。ゲージの表示横幅は余白分差し引かれます。
 * @text 数値の余白
 * @type number
 * @default 0
 * @min 0
 * @parent CoordinateSetting
 * 
 * @param UserLabelFontFace
 * @desc 任意のラベルのフォントを指定します。(拡張子なし)
 * @text ラベルテキスト部のフォント
 * @type string
 * @default 
 * @parent CoordinateSetting
 * 
 * @param FontSetting
 * @text フォント設定
 * @default ------------------------------
 * 
 * @param ValueFontSize
 * @desc 現在数値のフォントサイズ。（メインフォントサイズ+デフォルト現在数値フォントサイズ）
 * @text 現在数値フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * @parent FontSetting
 * 
 * @param MaxValueFontSize
 * @desc 最大値のフォントサイズ。（メインフォントサイズ+デフォルト最大値フォントサイズからの差）
 * @text 最大値フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * @parent FontSetting
 * 
 * @param SeparationFontSize
 * @desc /のフォントサイズ。（メインフォントサイズ+デフォルト/フォントサイズからの差）
 * @text /フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * @parent FontSetting
 * 
 * @param LabelFontSize
 * @desc デフォルトのラベルのフォントサイズ。（メインフォントサイズ+デフォルトラベルフォントサイズからの差）
 * @text デフォルトラベルフォントサイズ
 * @type number
 * @default -2
 * @min -9999
 * @parent FontSetting
 * 
 * @param ValueFontFace
 * @desc 数字のメインフォント適用(OFFで数字フォント)
 * @text 数字テキスト部のメインフォント適用
 * @type boolean
 * @default false
 * @parent FontSetting
 * 
 * @param UserValueFontFace
 * @desc 任意の数字のフォントを指定します。(拡張子なし)
 * @text 数字テキスト部のフォント
 * @type string
 * @default 
 * @parent FontSetting
 * 
 * @param ColorSetting
 * @text カラー設定
 * @default ------------------------------
 * 
 * @param MaxValueColor
 * @desc 最大値の色。(システムカラーまたはカラーインデックス(テキストタブ)) -1で現在値と同色
 * @text 最大値色
 * @type color
 * @default 0
 * @min -1
 * @parent ColorSetting
 * 
 * @param SeparationColor
 * @desc /の色。(システムカラーまたはカラーインデックス(テキストタブ)) -1で現在値と同色
 * @text /色
 * @type color
 * @default 0
 * @min -1
 * @parent ColorSetting
 * 
 * @param LabelColor
 * @desc ラベルの色。(システムカラーまたはカラーインデックス(テキストタブ))
 * @text ラベル色
 * @type color
 * @default 16
 * @min 0
 * @parent ColorSetting
 * 
 * @param GaugeColorSetting
 * @text ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeColor1
 * @desc ゲージの色左(-1でデフォルト値)
 * @text ゲージ色左
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeColorSetting
 * 
 * @param GaugeColor2
 * @desc ゲージの色右(-1でデフォルト値)
 * @text ゲージ色右
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeColorSetting
 * 
 * @param GaugeColorMaxSetting
 * @text 最大時ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeColorMaxApply
 * @desc 最大時のゲージ、数値の色変更を適用する。
 * @text 最大時ゲージ、数値色変更適用
 * @type boolean
 * @default false
 * @parent GaugeColorMaxSetting
 * 
 * @param MaxGaugeColor1
 * @desc 最大時のゲージの色左(システムカラーまたはカラーインデックス(テキストタブ))
 * @text 最大時ゲージ色左
 * @type color
 * @default 0
 * @min 0
 * @parent GaugeColorMaxSetting
 * 
 * @param MaxGaugeColor2
 * @desc 最大時のゲージの色右(システムカラーまたはカラーインデックス(テキストタブ))
 * @text 最大時ゲージ色右
 * @type color
 * @default 0
 * @min 0
 * @parent GaugeColorMaxSetting
 * 
 * @param GaugeColorRatioSetting
 * @text 特定割合以下時ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeColorRatioApply
 * @desc 変化する残り割合時のゲージ、数値の色変更を適用する。
 * @text 変化残り割合時ゲージ、数値色変更適用
 * @type boolean
 * @default false
 * @parent GaugeColorRatioSetting
 * 
 * @param RatioGauge
 * @desc 変化する残り割合を百分率で指定します。HPの場合0を指定することで瀕死時に適用されます。
 * @text 変化残り割合%
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorRatioSetting
 * 
 * @param RatioGaugeColor1
 * @desc 特定割合以下のゲージの色左。(システムカラーまたはカラーインデックス(テキストタブ))
 * @text 特定割合以下ゲージ色左
 * @type color
 * @default 0
 * @min 0
 * @parent GaugeColorRatioSetting
 * 
 * @param RatioGaugeColor2
 * @desc 特定割合以下のゲージの色右。(システムカラーまたはカラーインデックス(テキストタブ))
 * @text 特定割合以下ゲージ色右
 * @type color
 * @default 0
 * @min 0
 * @parent GaugeColorRatioSetting
 * 
 */
/*~struct~GaugeHeightList:ja
 * 
 * @param GaugeHeight
 * @desc ゲージの高さ範囲。(ゲージの高さではなく表示範囲です)
 * @text ゲージの高さ範囲
 * @type number
 * @default 0
 * @min 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_GaugeValueEX = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_GaugeValueEX');
    const ValueDigits = String(parameters['ValueDigits']);
    const GaugeValueSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['GaugeValueSetting'])) : null) || [];
    const ValueAlign = eval(parameters['ValueAlign']) || 'right';
    const GaugeHeight = Number(parameters['GaugeHeight'] || 0);

    const _Sprite_Gauge_initMembers = Sprite_Gauge.prototype.initMembers;
    Sprite_Gauge.prototype.initMembers = function() {
        this._gaugeData = null;
        this._LabelIconSprite = null;
        _Sprite_Gauge_initMembers.call(this);
    };

    const _Sprite_Gauge_setup = Sprite_Gauge.prototype.setup;
    Sprite_Gauge.prototype.setup = function(battler, statusType) {
        this.initGaugeData(statusType);
        this.createIconSprite();
        _Sprite_Gauge_setup.call(this, battler, statusType);
    };

    Sprite_Gauge.prototype.createIconSprite = function() {
        if (this._gaugeData && this._gaugeData.LabelIcon > 0) {
            if (!this._LabelIconSprite) {
                const sprite = new Sprite();
                this.addChild(sprite);
                sprite.bitmap = new Bitmap(ImageManager.iconWidth, ImageManager.iconHeight);
                sprite.bitmap = ImageManager.loadSystem("IconSet");
                this._LabelIconSprite = sprite;
                sprite.setFrame(0, 0, 0, 0);
            }
        }
    };

    Sprite_Gauge.prototype.initGaugeData = function(statusType) {
        this._gaugeData = this.getFindGaugeData(statusType);
    };

    Sprite_Gauge.prototype.filteringGaugeDataClass = function(data) {
        const className = this.className ? this.className : NuunManager.isFilterClass(this);
        if (data.FilteringClass && data.FilteringClass.length > 0) {
            return data.FilteringClass.some(filterClass => filterClass === className);
        } else {
            return true;
        }
    };

    Sprite_Gauge.prototype.getFindGaugeData = function(statusType) {
        return GaugeValueSetting.find(data => (data.Type === statusType || data.Type === 'all') && this.filteringGaugeDataClass(data));
    };

    Sprite_Gauge.prototype.valueWidth = function() {
        return (this._gaugeData.ValueWidth && this._gaugeData.ValueWidth > 0 ? Math.min(this._gaugeData.ValueWidth, this.bitmapWidth() - this.gaugeX()) : this.bitmapWidth() - this.gaugeX()) - this.valueMargin();
    };

    Sprite_Gauge.prototype.drawGaugeVisible = function() {
        return this._gaugeData ? this._gaugeData.GaugeVisible : true;
    };

    const _Sprite_Gauge_bitmapHeight = Sprite_Gauge.prototype.bitmapHeight;
    Sprite_Gauge.prototype.bitmapHeight = function() {
        if (GaugeHeight > 0) {
            return GaugeHeight;
        } else {
            return _Sprite_Gauge_bitmapHeight.call(this);
        }
    };

    const _Sprite_Gauge_gaugeX = Sprite_Gauge.prototype.gaugeX;
    Sprite_Gauge.prototype.gaugeX = function() {
        return this._gaugeData && this._gaugeData.GaugeX >= 0 ? this._gaugeData.GaugeX : _Sprite_Gauge_gaugeX.call(this);
    };

    Sprite_Gauge.prototype.gaugeY = function() {
        return this._gaugeData.GaugeY || 0;
    };

    Sprite_Gauge.prototype.valueX = function() {
        return this._gaugeData.ValueX || 0;
    };
    
    Sprite_Gauge.prototype.valueY = function() {
        return this._gaugeData.ValueY || 0;
    };

    Sprite_Gauge.prototype.maxValueX = function() {
        return this._gaugeData.MaxValueX || 0;
    };
    
    Sprite_Gauge.prototype.maxValueY = function() {
        return this._gaugeData.MaxValueY || 0;
    };
    
    Sprite_Gauge.prototype.separationX = function() {
        return this._gaugeData.SeparationX || 0;
    };
    
    Sprite_Gauge.prototype.separationY = function() {
        return this._gaugeData.SeparationY || 0;
    };

    Sprite_Gauge.prototype.labelX = function() {
        return this._gaugeData.LabelX || 0;
    };
    
    const _Sprite_Gauge_labelY = Sprite_Gauge.prototype.labelY;
    Sprite_Gauge.prototype.labelY = function() {
        return this._gaugeData ? (this._gaugeData.LabelY || 0) : _Sprite_Gauge_labelY.call(this);
    };

    Sprite_Gauge.prototype.valueDigits = function() {
        return this._gaugeData.ValueDigits ? this._gaugeData.ValueDigits : ValueDigits;
    };

    Sprite_Gauge.prototype.valueSpaceMargin = function() {
        return this._gaugeData.ValueSpaceMargin || 0
    };

    Sprite_Gauge.prototype.valueMargin = function() {
        return this._gaugeData.ValueMargin || 0
    };

    Sprite_Gauge.prototype.valueAlign = function() {
        return this._gaugeData && this._gaugeData.ValueAlign && this._gaugeData.ValueAlign !== 'default' ? this._gaugeData.ValueAlign : ValueAlign;
    };

    Sprite_Gauge.prototype.valueAbsoluteCoordinates = function() {
        return this._gaugeData.ValueAbsoluteCoordinates;
    };

    Sprite_Gauge.prototype.labelAbsoluteCoordinates = function() {
        return this._gaugeData.LabelAbsoluteCoordinates;
    };
    
    Sprite_Gauge.prototype.gaugeAbsoluteCoordinates = function() {
        return this._gaugeData.gaugeAbsoluteCoordinates;
    };

    const _Sprite_Gauge_valueFontSize = Sprite_Gauge.prototype.valueFontSize;
    Sprite_Gauge.prototype.valueFontSize  = function() {
        return this._gaugeData ? $gameSystem.mainFontSize() + (this._gaugeData.ValueFontSize || 0) : _Sprite_Gauge_valueFontSize.call(this);
    };
    
    Sprite_Gauge.prototype.maxValueFontSize  = function() {
        return $gameSystem.mainFontSize() + (this._gaugeData ? (this._gaugeData.MaxValueFontSize || 0) : -6);
    };
    
    Sprite_Gauge.prototype.separationFontSize  = function() {
        return $gameSystem.mainFontSize() + (this._gaugeData ? (this._gaugeData.SeparationFontSize || 0) : -6);
    };

    const _Sprite_Gauge_labelFontSize = Sprite_Gauge.prototype.labelFontSize;
    Sprite_Gauge.prototype.labelFontSize = function() {
        return this._gaugeData ? $gameSystem.mainFontSize() + (this._gaugeData.LabelFontSize || 0) : _Sprite_Gauge_labelFontSize.call(this);
    };

    const _Sprite_Gauge_labelColor = Sprite_Gauge.prototype.labelColor;
    Sprite_Gauge.prototype.labelColor = function() {
        return this._gaugeData ? NuunManager.getColorCode(this._gaugeData.LabelColor || 16) : _Sprite_Gauge_labelColor.call(this);
    };

    Sprite_Gauge.prototype.maxValueColor  = function() {
        return this._gaugeData ? (this._gaugeData.MaxValueColor === -1 ? this.valueColor() : NuunManager.getColorCode(this._gaugeData.MaxValueColor || 0)) : ColorManager.textColor(0);
    };
    
    Sprite_Gauge.prototype.separationColor  = function() {
        return this._gaugeData ? (this._gaugeData.SeparationColor === -1 ? this.valueColor() : NuunManager.getColorCode(this._gaugeData.SeparationColor || 0)) : ColorManager.textColor(0);
    };

    const _Sprite_Gauge_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
    Sprite_Gauge.prototype.gaugeColor1 = function() {
        if (this._gaugeData) {
            return NuunManager.getColorCode(this.changeGaugeColor1());
        }
        return _Sprite_Gauge_gaugeColor1.call(this);
    };

    const _Sprite_Gauge_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
    Sprite_Gauge.prototype.gaugeColor2 = function() {
        if (this._gaugeData) {
            return NuunManager.getColorCode(this.changeGaugeColor2());
        }
        return _Sprite_Gauge_gaugeColor2.call(this);
    };

    Sprite_Gauge.prototype.getGaugeHpRatio = function() {
        if (this._gaugeData.RatioGauge === 0) {
          return this._battler.isDying();
        } else {
          return this.isRatioGauge();
        }
    };

    Sprite_Gauge.prototype.changeGaugeColor1 = function() {
        if (this._gaugeData.GaugeColorMaxApply && this.currentMaxValue() === this.currentValue()) {
            return this._gaugeData.MaxGaugeColor1 || 0;
        } else if (this._gaugeData.GaugeColorRatioApply && this._statusType === 'hp' && this.getGaugeHpRatio()) {
            return this._gaugeData.RatioGaugeColor1 || 0;
        } else if (this._gaugeData.GaugeColorRatioApply && this.isRatioGauge()) {
            return this._gaugeData.RatioGaugeColor1 || 0;
        } else if (this._gaugeData.GaugeColor1 >= 0) {
            return this._gaugeData.GaugeColor1;
        }
        return _Sprite_Gauge_gaugeColor1.call(this);
    };
    
      Sprite_Gauge.prototype.changeGaugeColor2 = function() {
        if (this._gaugeData.GaugeColorMaxApply && this.currentMaxValue() === this.currentValue()) {
            return this._gaugeData.MaxGaugeColor2 || 0;
        } else if (this._gaugeData.GaugeColorRatioApply && this._statusType === 'hp' && this.getGaugeHpRatio()) {
            return this._gaugeData.RatioGaugeColor2 || 0;
        } else if (this._gaugeData.GaugeColorRatioApply && this.isRatioGauge()) {
            return this._gaugeData.RatioGaugeColor1 || 0;
        } else if (this._gaugeData.GaugeColor2 >= 0) {
            return this._gaugeData.GaugeColor2;
        }
        return _Sprite_Gauge_gaugeColor2.call(this);
    };

    const _Sprite_Gauge_drawValue = Sprite_Gauge.prototype.drawValue;
    Sprite_Gauge.prototype.drawValue = function() {
        if (this._gaugeData) {
            if (this._gaugeData.ValueVisible === 'ValueMaxValue') {
                this.drawValueMaxValue();
              } else if (this._gaugeData.ValueVisible === 'Value') {
                this.drawValue2(); 
              } else if (this._gaugeData.ValueVisible === 'NoValue') {
        
              }
        } else {
            _Sprite_Gauge_drawValue.call(this);
        }
    };

    Sprite_Gauge.prototype.valueXPosition = function(x, width, valueWidth, maxValueWidth, valueMarginX) {
        if (this.valueAbsoluteCoordinates()) {
            return this.valueMargin();
        }
        switch (this.valueAlign()) {
            case 'left':
                return x;
            case 'center':
                return x + width / 2 - (6 + valueWidth + valueMarginX);
            case 'right':
                return x + width - (maxValueWidth + (valueMarginX * 2) + valueWidth + 12);
            default:
                return x;
        }
    };

    Sprite_Gauge.prototype.maxValueXPosition = function(x, width, valueWidth, maxValueWidth, valueMarginX) {
        if (this.valueAbsoluteCoordinates()) {
            return this.valueMargin();
        }
        switch (this.valueAlign()) {
            case 'left':
                return x + (valueMarginX * 2) + valueWidth + 12;
            case 'center':
                return x + width / 2 + (6 + valueMarginX);
            case 'right':
                return x + (width - maxValueWidth);
            default:
                return x;
        }
    };

    Sprite_Gauge.prototype.separationXPosition = function(x, width, valueWidth, maxValueWidth, valueMarginX) {
        if (this.valueAbsoluteCoordinates()) {
            return this.valueMargin();
        }
        switch (this.valueAlign()) {
            case 'left':
                return x + valueWidth + valueMarginX;
            case 'center':
                return x + width / 2 - 6;
            case 'right':
                return x + width - maxValueWidth - valueMarginX - 12;
            default:
                return x;
        }
    };

    Sprite_Gauge.prototype.getValueTextWidth = function() {
        return this.bitmap.measureTextWidth(this.valueDigits());
    };

    const _Sprite_Gauge_drawGauge = Sprite_Gauge.prototype.drawGauge;
    Sprite_Gauge.prototype.drawGauge = function() {//再定義
        if (this._gaugeData) {
            this.drawGaugeGaugeValueEX()
        } else {
            _Sprite_Gauge_drawGauge.call(this);
        }
    };

    Sprite_Gauge.prototype.drawGaugeGaugeValueEX = function() {
        if (this.drawGaugeVisible()) {
            const gaugeX = this.gaugeX();
            const gaugeY = (this.gaugeAbsoluteCoordinates() ? 0 : (this.textHeight ? this.textHeight() : 24) - this.gaugeHeight()) + this.gaugeY();
            const gaugewidth = this.bitmapWidth() - gaugeX;
            const gaugeHeight = this.gaugeHeight();
            this.drawGaugeRect(gaugeX, gaugeY, gaugewidth, gaugeHeight);
        }
    };
    

    Sprite_Gauge.prototype.drawValue2 = function() {
        const currentValue = this.currentValue();
        const width = this.bitmapWidth() - this.gaugeX() - this.valueMargin();
        const height = (this.textHeight ? this.textHeight() : 24)
        const x = (this.valueAbsoluteCoordinates() ? 0 : this.gaugeX()) + this.valueX() + this.valueMargin();
        const y = this.valueY();
        this.setupValueFont();
        this.bitmap.drawText(currentValue, x, y, width, height, this.valueAlign());
    };

    Sprite_Gauge.prototype.drawValueMaxValue = function() {
        const valueDigits = this.valueDigits();
        const currentValue = this.currentValue();
        const currentMaxValue = this.currentMaxValue();
        const bitmapWidth = this.valueWidth();
        const ValueMarginX = this.valueSpaceMargin();
        const width = Math.floor((bitmapWidth - ValueMarginX * 2 - 12) / 2);
        const height = (this.textHeight ? this.textHeight() : 24)
        const x = this.gaugeX() + this.valueMargin();
        this.setupValueFont();
        const valueWidth = valueDigits ? Math.min(this.getValueTextWidth(), width) : Math.min(this.bitmap.measureTextWidth(currentValue), width);
        this.bitmap.fontSize = this.maxValueFontSize();
        const maxValueWidth = valueDigits ? Math.min(this.getValueTextWidth(), width) : Math.min(this.bitmap.measureTextWidth(currentMaxValue), width);
        this.setupValueFont();
        this.bitmap.drawText(currentValue, this.valueXPosition(x, bitmapWidth, valueWidth, maxValueWidth, ValueMarginX) + this.valueX(), this.valueY(), valueWidth, height, this.valueAlign());
        this.bitmap.fontSize = this.separationFontSize();
        this.bitmap.textColor = this.separationColor();
        this.bitmap.drawText('/', this.separationX() + this.separationXPosition(x, bitmapWidth, valueWidth, maxValueWidth, ValueMarginX), this.separationY(), 12, height, "center");
        this.bitmap.fontSize = this.maxValueFontSize();
        this.bitmap.textColor = this.maxValueColor();
        this.bitmap.drawText(currentMaxValue, this.maxValueXPosition(x, bitmapWidth, valueWidth, maxValueWidth, ValueMarginX) + this.maxValueX(), this.maxValueY(), maxValueWidth, height, this.valueAlign());
    };

    const _Sprite_Gauge_drawLabel = Sprite_Gauge.prototype.drawLabel;
    Sprite_Gauge.prototype.drawLabel = function() {
        if (this._gaugeData && !this.isGaugeImageLabel()) {
            this.drawLabel2();
        } else {
            _Sprite_Gauge_drawLabel.call(this);
        }
    };

    Sprite_Gauge.prototype.drawLabel2 = function() {
        if (this._LabelIconSprite && this._gaugeData.LabelIcon > 0) {
            const sprite = this._LabelIconSprite;
            this.nuun_IconFrame(this._gaugeData.LabelIcon);
            sprite.x = (this.labelAbsoluteCoordinates() ? 0 : this.labelOutlineWidth() / 2) + this.labelX();
            sprite.y = this.labelY();
            sprite.scale.x = (this._gaugeData.LabelIconScale || 100) / 100;
            sprite.scale.y = (this._gaugeData.LabelIconScale || 100) / 100;
        } else {
            const label = this.label();
            const x = (this.labelAbsoluteCoordinates() ? 0 : this.labelOutlineWidth() / 2) + this.labelX();
            const y = this.labelY();
            const width = this.bitmapWidth();
            const height = (this.textHeight ? this.textHeight() : 24)
            this.setupLabelFont();
            this.bitmap.paintOpacity = this.labelOpacity();
            this.bitmap.drawText(label, x, y, width, height, "left");
            this.bitmap.paintOpacity = 255;
        }
    };

    Sprite_Gauge.prototype.isGaugeImageLabel = function() {
        return Imported.NUUN_GaugeImage && this._gaugeImgData && this._gaugeImgData.LabelGaugeImg && this._gaugeImgData.LabelGaugeImg.Gaugeimage;
    };

    Sprite_Gauge.prototype.isGaugeImageValue = function() {
        return Imported.NUUN_GaugeImage && this._gaugeImgData;
    };

    const _Sprite_Gauge_valueFontFace = Sprite_Gauge.prototype.valueFontFace;
    Sprite_Gauge.prototype.valueFontFace = function() {
        if (this._gaugeData) {
            return this._gaugeData.UserValueFontFace ? this._gaugeData.UserValueFontFace : (this._gaugeData.ValueFontFace ? $gameSystem.mainFontFace() : _Sprite_Gauge_valueFontFace.call(this));
        } else {
            return _Sprite_Gauge_valueFontFace.call(this);
        }
    };

    const _Sprite_Gauge_labelFontFace = Sprite_Gauge.prototype.labelFontFace;
    Sprite_Gauge.prototype.labelFontFace = function() {
        if (this._gaugeData) {
            return this._gaugeData.UserLabelFontFace ? this._gaugeData.UserLabelFontFace : _Sprite_Gauge_labelFontFace.call(this);
        } else {
            return _Sprite_Gauge_labelFontFace.call(this);
        }
    };

    Sprite_Gauge.prototype.nuun_IconFrame = function(index) {
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (index % 16) * pw;
        const sy = Math.floor(index / 16) * ph;
        this._LabelIconSprite.setFrame(sx, sy, pw, ph);
    };

})();