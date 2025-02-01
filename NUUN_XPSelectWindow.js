/*:-----------------------------------------------------------------------------------
 * NUUN_XPSelectWindow.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc XP風対象選択ウィンドウ
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_MenuParamListBase
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MenuParamListBase
 * @version 1.3.1
 * 
 * @help
 * 敵、味方の対象選択時のウィンドウをXP風に変更します。
 * 
 * 全体、ランダム、敵味方全体攻撃(Ver.1.6.0以降)でも対象選択と併用することで、全体、ランダム対象時の表示をすることができます。
 * 
 * アクター、敵キャラのメモ欄
 * <XPBattlerFace:[imgUrl], [indexId]> 表示する顔グラを指定します。アクターの場合は未指定の場合はデフォルトの顔グラまたは立ち絵、顔グラEXの顔グラが表示されます。
 * [imgUrl]:faceインデックス内のURL(拡張子なし)
 * [indexId]:顔グラのインデックスID
 * ※[]は記入しないでください。
 * 
 * 記述欄のテキスト 制御文字が使用可能です。
 * <[tag]:[text]> 記述欄のテキスト
 * [tag]:記述欄タグ名
 * [text]:表示するテキスト。
 * 改行すれば何行でも表示可能ですので、独自の項目を追加することも可能です。
 * <desc:ああああ> descとタグ付けされた項目に「ああああ」が表示されます。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/2/2 Ver.1.3.1
 * 敵のウィンドウの透明度が適用されていなかった問題を修正。
 * ウィンドウ開閉時のアニメーションの有効無効化する機能を追加。
 * 2025/1/4 Ver.1.3.0
 * 背景画像を表示する機能を追加。
 * 2024/12/17 Ver.1.2.1
 * 対象選択時にエラーが出る問題を修正。
 * 2024/9/8 Ver.1.2.0
 * ステータス項目ベースプラグインを介しての処理に仕様変更。
 * 幾つかのプラグインパラメータのスペルミスを修正。
 * 2023/1/10 Ver.1.1.4
 * 対象選択画面表示位置が上部しか適用されていなかった問題を修正。
 * 2023/1/9 Ver.1.1.3
 * アクター及び敵キャラのウィンドウを表示しない設定にしたときエラーが出る問題を修正。
 * 対象選択ウィンドウが表示されない問題を修正。
 * 2022/9/4 Ver.1.1.2
 * 特定の場面でウィンドウが表示さてたままになってしまう問題を修正。
 * 2022/8/26 Ver.1.1.1
 * スクロール時のSEを再生しない機能を追加。
 * アクターコマンドを開くと対象選択時のカーソルSEが再生しまう問題を修正。
 * 2022/8/24 Ver.1.1.0
 * 敵対象選択時にスクロール選択出来る機能を追加。
 * 2022/6/5 Ver.1.0.5
 * 微修正。
 * 2022/4/2 Ver.1.0.4
 * 敵に顔グラを指定できる機能を追加。
 * 2022/4/1 Ver.1.0.3
 * 評価式のバトラーの取得する変数を変更。
 * 2022/3/31 Ver.1.0.2
 * 敵のデフォルトのステート表示が表示されないように修正。
 * 2022/3/30 Ver.1.0.1
 * 敵の対象選択時にアクターステータスウィンドウを表示するように修正。
 * アクター選択時の顔グラの表示を立ち絵、顔グラ表示EX設定に対応。
 * 2022/3/27 Ver.1.0.0
 * 初版
 * 
 * @param XPSelectPosition
 * @text 対象選択画面表示位置
 * @desc 対象選択画面の表示位置を指定します。
 * @type select
 * @option 上部
 * @value 'top'
 * @option 中間
 * @value 'middle'
 * @option アクターステータスウィンドウの上
 * @value 'under'
 * @default 'top'
 * 
 * @param OriginPositionMode
 * @text 背景基準位置
 * @desc 背景の基準位置をUIに合わせます。
 * @type boolean
 * @default false
 * 
 * @param OpenAnimation
 * @desc ウィンドウ開閉時のアニメーションを有効にします。
 * @text ウィンドウ開閉時のアニメーション有効
 * @type boolean
 * @default true
 * 
 * @param ActorSetting
 * @text アクター設定
 * @default ------------------------------
 * 
 * @param ActorXPSelect
 * @desc アクター対象選択画面をXPスタイルに変更します。
 * @text アクター対象選択画面XP有効
 * @type boolean
 * @default true
 * @parent ActorSetting
 * 
 * @param ActorData
 * @text 表示アクターデータ
 * @desc 選択時に表示するアクターのデータを選択します。
 * @default ["{\"DateSelect\":\"Face\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Decimal\":\"0\",\"TextMethod\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"ActorName\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"152\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"288\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Decimal\":\"0\",\"TextMethod\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"State2\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"448\",\"Y_Coordinate\":\"-8\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Decimal\":\"0\",\"TextMethod\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"HpGauge\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"500\",\"Y_Coordinate\":\"6\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Decimal\":\"0\",\"TextMethod\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"MpGauge\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"640\",\"Y_Coordinate\":\"6\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Decimal\":\"0\",\"TextMethod\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}"]
 * @type struct<DataActorList>[]
 * @parent ActorSetting
 * 
 * @param ActorXPSelectWindowVisible
 * @desc ウィンドウ画像を不透明化。背景指定時はOFFにしてください。
 * @text ウィンドウ不透明化
 * @type boolean
 * @default true
 * @parent ActorSetting
 * 
 * @param ActorSelect_X
 * @desc アクターコマンドウィンドウのX座標を指定します。
 * @text アクターコマンドウィンドウX座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorSetting
 * 
 * @param ActorSelect_Y
 * @desc アクターコマンドウィンドウのY座標を指定します。
 * @text アクターコマンドウィンドウY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorSetting
 * 
 * @param ActorSelect_Width
 * @desc アクターコマンドウィンドウの横幅を指定します。0でUIサイズ 画面より大きい値にすると自動的に画面の横幅になります。
 * @text アクターコマンドウィンドウの横幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent ActorSetting
 * 
 * @param ActorSelectionHelpWindowHide
 * @desc 味方対象選択時のヘルプウィンドウの表示。
 * @text 味方対象選択時ヘルプウィンドウの表示
 * @type boolean
 * @default false
 * @parent ActorSetting
 * 
 * @param ActorBackGroundImgSetting
 * @text 味方対象選択時背景設定
 * @default ------------------------------
 * 
 * @param ActorBackGroundImg
 * @desc 味方対象味方対象選択時の背景画像ファイル名を指定します。
 * @text 味方対象背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent ActorBackGroundImgSetting
 * 
 * @param ActorBackGroundImg_X
 * @desc 背景画像のX座標を指定します。
 * @text 背景画像X座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorBackGroundImgSetting
 * 
 * @param ActorBackGroundImg_Y
 * @desc 背景画像のY座標を指定します。
 * @text 背景画像Y座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorBackGroundImgSetting
 * 
 * @param EnemySetting
 * @text 敵キャラ設定
 * @default ------------------------------
 * 
 * @param EnemyXPSelect
 * @desc 敵キャラ対象選択画面をXPスタイルに変更します。
 * @text 敵キャラ対象選択画面XP有効
 * @type boolean
 * @default true
 * @parent EnemySetting
 * 
 * @param EnemyData
 * @text 表示敵キャラデータ
 * @desc 選択時に表示する敵キャラのデータを選択します。
 * @default ["{\"DateSelect\":\"EnemyName\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'center'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Decimal\":\"0\",\"TextMethod\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}"]
 * @type struct<DataEnemyList>[]
 * @parent EnemySetting
 * 
 * @param EnemyXPSelectWindowVisible
 * @desc ウィンドウ画像を不透明化。背景指定時はOFFにしてください。
 * @text ウィンドウ不透明化
 * @type boolean
 * @default true
 * @parent EnemySetting
 * 
 * @param EnemySelect_X
 * @desc 敵キャラコマンドウィンドウのX座標を指定します。
 * @text 敵キャラコマンドウィンドウX座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent EnemySetting
 * 
 * @param EnemySelect_Y
 * @desc 敵キャラコマンドウィンドウのY座標を指定します。
 * @text 敵キャラコマンドウィンドウY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent EnemySetting
 * 
 * @param EnemySelect_Width
 * @desc 敵キャラコマンドウィンドウの横幅を指定します。0でUIサイズ 画面より大きい値にすると自動的に画面の横幅になります。
 * @text 敵キャラコマンドウィンドウの横幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent EnemySetting
 * 
 * @param EnemySelectdScrollSE
 * @desc 敵対象選択時のスクロールをしたときにカーソルSEをならします。
 * @text 敵対象スクロール時カーソルSE_ON
 * @type boolean
 * @default true
 * @parent EnemySetting
 * 
 * @param EnemyBackGroundImgSetting
 * @text 味方対象選択時背景設定
 * @default ------------------------------
 * 
 * @param EnemyBackGroundImg
 * @desc 敵対象味方対象選択時の背景画像ファイル名を指定します。
 * @text 敵対象背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent EnemyBackGroundImgSetting
 * 
 * @param EnemyBackGroundImg_X
 * @desc 背景画像のX座標を指定します。
 * @text 背景画像X座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent EnemyBackGroundImgSetting
 * 
 * @param EnemyBackGroundImg_Y
 * @desc 背景画像のY座標を指定します。
 * @text 背景画像Y座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent EnemyBackGroundImgSetting
 * 
 * @param ActorPictureSetting
 * @text 立ち絵、顔グラ表示EX設定
 * @default ------------------------------
 * 
 * @param DynamicFace
 * @desc アクターの顔グラを条件による変化させます。（要立ち絵、顔グラ表示EX）
 * @text 条件顔グラ変化
 * @type boolean
 * @default true
 * @parent ActorPictureSetting
 * 
 */
/*~struct~DataActorList:
 * 
 * @param DateSelect
 * @text 表示するステータス
 * @desc 表示するステータスを指定します。
 * @type select
 * @option なし
 * @value None
 * @option 名称のみ(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option バトラー名(1)(2)(3)(4)(5)(9)(11)(12)
 * @value ActorName
 * @option 二つ名(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Nickname
 * @option 職業(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Class
 * @option レベル(1)(2)(3)(4)(5)(6)(9)(11)(12)(13)
 * @value Level
 * @option ステート(1)(2)(3)(4)(5)(16※1)
 * @value State
 * @option ステート(戦闘用と同じ表示)(1)(2)(3)(4)
 * @value State2
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(18)
 * @value OrgParam
 * @option HPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value HpGauge
 * @option MPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value MpGauge
 * @option TPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value TpGauge
 * @option 攻撃力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Atk
 * @option 防御力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Def
 * @option 魔法力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Mat
 * @option 魔法防御(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Mdf
 * @option 敏捷性(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Agi
 * @option 運(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Luk
 * @option 命中率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Hit
 * @option 回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Eva
 * @option 会心率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Cri
 * @option 会心回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value CritcalEvade
 * @option 魔法回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value MagicEvade
 * @option 魔法反射率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value MagicrEflect
 * @option 反撃率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Counter
 * @option HP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value HpRegen
 * @option MP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value MpRegen
 * @option TP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value TpRegen
 * @option 狙われ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Aggro
 * @option 防御効果率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Guard
 * @option 回復効果率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Recovery
 * @option 薬の知識(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value ItemEffect
 * @option MP消費率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value MpCost
 * @option TPチャージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value TpCharge
 * @option 物理ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value PhysicalDamage
 * @option 魔法ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value MagicalDamage
 * @option 床ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value FloorDamage
 * @option 獲得経験値率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value GainExpRate
 * @option 独自ゲージ(1)(2)(3)(4)(5)(7)(16)(18)(20)(21)(22)(23)(24)
 * @value OrgGauge
 * @option 画像(1)(2)(3)(4)(25)
 * @value Imges
 * @option 顔グラ(1)(2)(3)(4)(26)
 * @value Face
 * @option フリーテキスト(1)(2)(3)(4)(35)
 * @value Freetext
 * @option ライン(1)(2)(3)(4)(5)(8)
 * @value HorzLine
 * @option 記述欄(1)(2)(3)(4)(6)(7)(8)(19)
 * @value Desc
 * @default None
 * 
 * @param X_Position
 * @text X表示列位置(1)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 4
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(2)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X座標（相対）(3)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(4)
 * @desc Y座標（Y表示行位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目、ゲージ横幅（0でデフォルト幅）
 * @text 項目、ゲージ横幅(5)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc 項目名称の横幅（0でデフォルト幅）
 * @text 項目名称横幅(6)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(7)
 * @type string
 * @default
 * 
 * @param NameColor
 * @desc 項目名称のシステムカラーID。テキストタブでカラーコードを入力できます。
 * @text 項目名称文字色(8)
 * @type color
 * @default 16
 * @min 0
 * 
 * @param Align
 * @desc 文字揃え。
 * @text 文字揃え(9)
 * @type select
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @option 中央
 * @value 'center'
 * @default 'left'
 * 
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位(10)
 * @type string
 * @default 
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(11)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param FontFace
 * @desc 項目名称のフォントを設定します。
 * @text 項目名称フォント(12)
 * @type string
 * @default 
 * 
 * @param ValueFontFace
 * @desc 数値のフォントを設定します。
 * @text 数値フォント(13)
 * @type string
 * @default 
 * 
 * @param Icon
 * @desc アイコンを設定します。
 * @text アイコン(14)
 * @type icon
 * @default 0
 * 
 * @param IconY
 * @desc アイコンを調整するY座標を指定します。(相対)
 * @text アイコン調整Y座標(15)
 * @type number
 * @default 2
 * @min -99
 * 
 * @param DetaEval
 * @desc 評価式または文字列を記入します。
 * @text 評価式or文字列(javaScript)(16)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @option 'battler.turnCount()+"ターン";//ターン'
 * @default 
 * 
 * @param Decimal
 * @text 小数点桁数(18)
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * 
 * @param TextMethod
 * @desc 記述欄に紐づけするタグ名
 * @text 記述欄タグ名(19)
 * @type string
 * @default 
 * @parent textSetting
 * 
 * @param GaugeSetting
 * @text ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeID
 * @desc 識別ID。
 * @text 識別ID(20)
 * @type string
 * @default 
 * @parent GaugeSetting
 * 
 * @param GaugeHeight
 * @desc ゲージの縦幅を指定します。
 * @text ゲージの縦幅(21)
 * @type number
 * @default 12
 * @min 0
 * @max 24
 * @parent GaugeSetting
 * 
 * @param DetaEval2
 * @desc 最大値の評価式。
 * @text 最大値評価式(javaScript)(22)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @default 
 * @parent GaugeSetting
 * 
 * @param Color1
 * @desc ゲージのシステムカラーID(左)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(左)(23)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param Color2
 * @desc ゲージのシステムカラーID(右)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(右)(24)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param ImgSetting
 * @text 画像設定
 * @default ------------------------------
 * 
 * @param ImgData
 * @desc 表示する画像を指定します。
 * @text 画像(25)
 * @type file
 * @dir img/
 * @default 
 * @parent ImgSetting
 * 
 * @param OtherSetting
 * @text その他設定
 * @default ------------------------------
 * 
 * @param Text
 * @desc フリーテキストのテキストを記入します。(制御文字使用可能)
 * @text フリーテキストのテキスト(35)
 * @type multiline_string
 * @default
 * @parent OtherSetting
 * 
 * @param CondSetting
 * @text 表示条件設定
 * @default ------------------------------
 * 
 * @param Conditions
 * @desc 項目が表示される条件を指定します。(JavaScript)
 * @text 項目条件(all)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @option '$dataSystem.optDisplayTp'//TP表示
 * @default 
 * 
 */
/*~struct~DataEnemyList:
 * 
 * @param DateSelect
 * @text 表示するステータス
 * @desc 表示するステータスを指定します。
 * @type select
 * @option なし
 * @value None
 * @option 名称のみ(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option モンスター名(1)(2)(3)(4)(5)(9)(11)(12)
 * @value EnemyName
 * @option ステート(1)(2)(3)(4)(5)(16※1)
 * @value State
 * @option ステート(戦闘用と同じ表示)(1)(2)(3)(4)
 * @value State2
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(18)
 * @value OrgParam
 * @option HPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value HpGauge
 * @option MPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value MpGauge
 * @option TPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value TpGauge
 * @option 攻撃力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Atk
 * @option 防御力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Def
 * @option 魔法力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Mat
 * @option 魔法防御(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Mdf
 * @option 敏捷性(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Agi
 * @option 運(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Luk
 * @option 命中率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Hit
 * @option 回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Eva
 * @option 会心率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Cri
 * @option 会心回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value CritcalEvade
 * @option 魔法回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value MagicEvade
 * @option 魔法反射率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value MagicrEflect
 * @option 反撃率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Counter
 * @option HP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value HpRegen
 * @option MP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value MpRegen
 * @option TP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value TpRegen
 * @option 狙われ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Aggro
 * @option 防御効果率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Guard
 * @option 回復効果率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value Recovery
 * @option 薬の知識(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value ItemEffect
 * @option MP消費率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value MpCost
 * @option TPチャージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value TpCharge
 * @option 物理ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value PhysicalDamage
 * @option 魔法ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value MagicalDamage
 * @option 床ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value FloorDamage
 * @option 獲得経験値率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value GainExpRate
 * @option 独自ゲージ(1)(2)(3)(4)(5)(7)(16)(18)(20)(21)(22)(23)(24)
 * @value OrgGauge
 * @option 画像(1)(2)(3)(4)(25)
 * @value Imges
 * @option フリーテキスト(1)(2)(3)(4)(35)
 * @value Freetext
 * @option ライン(1)(2)(3)(4)(5)(8)
 * @value HorzLine
 * @option 記述欄(1)(2)(3)(4)(6)(7)(8)(19)
 * @value Desc
 * @default None
 * 
 * @param X_Position
 * @text X表示列位置(1)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 4
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(2)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X座標（相対）(3)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(4)
 * @desc Y座標（Y表示行位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目、ゲージ横幅（0でデフォルト幅）
 * @text 項目、ゲージ横幅(5)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc 項目名称の横幅（0でデフォルト幅）
 * @text 項目名称横幅(6)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(7)
 * @type string
 * @default
 * 
 * @param NameColor
 * @desc 項目名称のシステムカラーID。テキストタブでカラーコードを入力できます。
 * @text 項目名称文字色(8)
 * @type color
 * @default 16
 * @min 0
 * 
 * @param Align
 * @desc 文字揃え。
 * @text 文字揃え(9)
 * @type select
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @option 中央
 * @value 'center'
 * @default 'left'
 * 
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位(10)
 * @type string
 * @default 
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(11)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param FontFace
 * @desc 項目名称のフォントを設定します。
 * @text 項目名称フォント(12)
 * @type string
 * @default 
 * 
 * @param ValueFontFace
 * @desc 数値のフォントを設定します。
 * @text 数値フォント(13)
 * @type string
 * @default 
 * 
 * @param Icon
 * @desc アイコンを設定します。
 * @text アイコン(14)
 * @type icon
 * @default 0
 * 
 * @param IconY
 * @desc アイコンを調整するY座標を指定します。(相対)
 * @text アイコン調整Y座標(15)
 * @type number
 * @default 2
 * @min -99
 * 
 * @param DetaEval
 * @desc 評価式または文字列を記入します。
 * @text 評価式or文字列(javaScript)(16)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @option 'battler.turnCount()+"ターン";//ターン'
 * @default 
 * 
 * @param Decimal
 * @text 小数点桁数(18)
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * 
 * @param TextMethod
 * @desc 記述欄に紐づけするタグ名
 * @text 記述欄タグ名(19)
 * @type string
 * @default 
 * @parent textSetting
 * 
 * @param GaugeSetting
 * @text ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeID
 * @desc 識別ID。
 * @text 識別ID(20)
 * @type string
 * @default 
 * @parent GaugeSetting
 * 
 * @param GaugeHeight
 * @desc ゲージの縦幅を指定します。
 * @text ゲージの縦幅(21)
 * @type number
 * @default 12
 * @min 0
 * @max 24
 * @parent GaugeSetting
 * 
 * @param DetaEval2
 * @desc 最大値の評価式。
 * @text 最大値評価式(javaScript)(22)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @default 
 * @parent GaugeSetting
 * 
 * @param Color1
 * @desc ゲージのシステムカラーID(左)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(左)(23)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param Color2
 * @desc ゲージのシステムカラーID(右)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(右)(24)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param ImgSetting
 * @text 画像設定
 * @default ------------------------------
 * 
 * @param ImgData
 * @desc 表示する画像を指定します。
 * @text 画像(25)
 * @type file
 * @dir img/
 * @default 
 * @parent ImgSetting
 * 
 * @param OtherSetting
 * @text その他設定
 * @default ------------------------------
 * 
 * @param Text
 * @desc フリーテキストのテキストを記入します。(制御文字使用可能)
 * @text フリーテキストのテキスト(35)
 * @type multiline_string
 * @default
 * @parent OtherSetting
 * 
 * @param CondSetting
 * @text 表示条件設定
 * @default ------------------------------
 * 
 * @param Conditions
 * @desc 項目が表示される条件を指定します。(JavaScript)
 * @text 項目条件(all)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @option '$dataSystem.optDisplayTp'//TP表示
 * @default 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_XPSelectWindow = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const parameters = PluginManager.parameters('NUUN_XPSelectWindow');
    let contentsWidth = 0;

function actorSelectWindowWidth() {
    return params.ActorSelect_Width > 0 ? Math.min(params.ActorSelect_Width, Graphics.width) : Graphics.boxWidth;
};

function enemySelectWindowWidth() {
    return params.EnemySelect_Width > 0 ? Math.min(params.EnemySelect_Width, Graphics.width) : Graphics.boxWidth;
};


const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    _Scene_Battle_createAllWindows.apply(this, arguments);
    if (params.EnemyXPSelect) {
        this.createEnemySelectBackground();
        this.createSelectEnemyWindow();
    }
};

const _Scene_Battle_createActorWindow = Scene_Battle.prototype.createActorWindow;
Scene_Battle.prototype.createActorWindow = function() {
    _Scene_Battle_createActorWindow.apply(this, arguments);
    if (params.ActorXPSelect) {
        this.createActorSelectBackground();
        this.createSelectActorWindow();
    }
};

const _Scene_Battle_createEnemyWindow = Scene_Battle.prototype.createEnemyWindow;
Scene_Battle.prototype.createEnemyWindow = function() {
    _Scene_Battle_createEnemyWindow.apply(this, arguments);
    if (params.EnemyXPSelect) {
        this._enemyWindow.y = Graphics.height;//ウィンドウを隠す
    }
};

Scene_Battle.prototype.createSelectActorWindow = function() {
    const rect = this.actorSelectWindowRect();
    this._actorSelectWindow = new Window_BattleSelectBattler(rect);
    if (!!this._actorSelectBackground && !NuunManager.styleData) {
        this.addChild(this._actorSelectWindow);
        this._actorSelectWindow.x += ((Graphics.width - Graphics.boxWidth) / 2);
        this._actorSelectWindow.y += ((Graphics.height - Graphics.boxHeight) / 2);
    } else {
        this.addWindow(this._actorSelectWindow);
    }
    this._actorWindow.setActorSelectWindow(this._actorSelectWindow);
    this._actorSelectWindow.opacity = params.ActorXPSelectWindowVisible ? 255 : 0;
};

Scene_Battle.prototype.createSelectEnemyWindow = function() {
    const rect = this.enemySelectWindowRect();
    this._enemySelectWindow = new Window_BattleSelectEnemy(rect);
    if (!!this._enemySelectBackground && !NuunManager.styleData) {
        this.addChild(this._enemySelectWindow);
        this._enemySelectWindow.x += ((Graphics.width - Graphics.boxWidth) / 2);
        this._enemySelectWindow.y += ((Graphics.height - Graphics.boxHeight) / 2);
    } else {
        this.addWindow(this._enemySelectWindow);
    }
    this._enemyWindow.setEnemySelectWindow(this._enemySelectWindow);
    this._enemySelectWindow.opacity = params.EnemyXPSelectWindowVisible ? 255 : 0;
};

Scene_Battle.prototype.actorSelectWindowRect = function() {
    const ww = actorSelectWindowWidth();
    const wx = params.ActorSelect_X;
    const wh = this.calcWindowHeight(1, true);
    const wy = this.XPActorSelectY();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemySelectWindowRect = function() {
    const ww = enemySelectWindowWidth();
    const wx = params.EnemySelect_X;
    const wh = this.calcWindowHeight(1, true);
    const wy = this.XPEnemySelectY();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.XPActorSelectY = function() {
    switch (params.XPSelectPosition) {
        case 'top':
            return params.ActorSelect_Y;
        case 'under':
            return this._statusWindow.y - this.calcWindowHeight(1, true) + params.ActorSelect_Y - 6;
        case 'middle':
            return this._statusWindow.y / 2 - this.calcWindowHeight(1, true) / 2 + params.ActorSelect_Y;
    }
};

Scene_Battle.prototype.XPEnemySelectY = function() {
    switch (params.XPSelectPosition) {
        case 'top':
            return params.EnemySelect_Y;
        case 'under':
            return this._statusWindow.y - this.calcWindowHeight(1, true) + params.EnemySelect_Y - 6;
        case 'middle':
            return this._statusWindow.y / 2 - this.calcWindowHeight(1, true) / 2 + params.EnemySelect_Y;
    }
};

Scene_Battle.prototype.createActorSelectBackground = function() {
    if (params.ActorBackGroundImg) {
        const bitmap = ImageManager.nuun_LoadPictures(params.ActorBackGroundImg);
        const sprite = new Sprite(bitmap);
        const base = NuunManager.styleData ? this._battleHudBack : this;
        base.addChild(sprite);
        this._actorSelectBackground = sprite;
        sprite.hide();
        this.setXpSelectBackGround(sprite, (params.ActorBackGroundImg_X || 0), (params.ActorBackGroundImg_Y || 0));
    }
};

Scene_Battle.prototype.createEnemySelectBackground = function() {
    if (params.EnemyBackGroundImg) {
        const bitmap = ImageManager.nuun_LoadPictures(params.EnemyBackGroundImg);
        const sprite = new Sprite(bitmap);
        const base = NuunManager.styleData ? this._battleHudBack : this;
        base.addChild(sprite);
        this._enemySelectBackground = sprite;
        sprite.hide();
        this.setXpSelectBackGround(sprite, (params.EnemyBackGroundImg_X || 0), (params.EnemyBackGroundImg_Y || 0));
    }
};

const _Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
Scene_Battle.prototype.startEnemySelection = function() {
    _Scene_Battle_startEnemySelection.apply(this, arguments);
    if (params.EnemyXPSelect) {
        this._skillWindow.hide();
        this._itemWindow.hide();
        this._statusWindow.show();
        this.openSelectWindow(this._enemySelectWindow);
        if (!!this._enemySelectBackground) {
            this._enemySelectBackground.show();
        }
    }
};

const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
Scene_Battle.prototype.startActorSelection = function() {
    _Scene_Battle_startActorSelection.apply(this, arguments);
    if (params.ActorXPSelect) {
        this.openSelectWindow(this._actorSelectWindow);
        if (params.ActorSelectionHelpWindowHide) {
            this._helpWindow.hide();
        }
        if (!!this._actorSelectBackground) {
            this._actorSelectBackground.show();
        }
    }
};

Scene_Battle.prototype.setXpSelectBackGround = function(sprite, x, y) {
    if (params.OriginPositionMode) {
        sprite.x = ((Graphics.width - (Graphics.boxWidth + 8)) / 2) + x;
        sprite.y = ((Graphics.height - (Graphics.boxHeight + 8)) / 2) + y;
    }
};

const _Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function() {
    _Scene_Battle_onEnemyOk.apply(this, arguments);
    if (params.EnemyXPSelect) {
        this.closeSelectWindow(this._enemySelectWindow);
        if (!!this._enemySelectBackground) {
            this._enemySelectBackground.hide();
        }
    }
};

const _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    _Scene_Battle_onEnemyCancel.apply(this, arguments);
    if (params.EnemyXPSelect) {
        this.closeSelectWindow(this._enemySelectWindow);
        if (!!this._enemySelectBackground) {
            this._enemySelectBackground.hide();
        }
    }
};

const _Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
Scene_Battle.prototype.onActorOk = function() {
    _Scene_Battle_onActorOk.apply(this, arguments);
    if (params.ActorXPSelect) {
        this.closeSelectWindow(this._actorSelectWindow);
        if (!!this._actorSelectBackground) {
            this._actorSelectBackground.hide();
        }
    }
};

const _Scene_Battle_onActorCancel  =Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    _Scene_Battle_onActorCancel.apply(this, arguments);
    if (params.ActorXPSelect) {
        this.closeSelectWindow(this._actorSelectWindow);
        if (params.ActorSelectionHelpWindowHide) {
            this._helpWindow.show();
        }
        if (!!this._actorSelectBackground) {
            this._actorSelectBackground.hide();
        }
    }
};

const _Scene_Battle_hideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows;
Scene_Battle.prototype.hideSubInputWindows = function() {
    _Scene_Battle_hideSubInputWindows.apply(this, arguments);
    if (params.ActorXPSelect) {
        this._actorSelectWindow.deactivate();
        this._actorSelectWindow.hide();
        if (!!this._actorSelectBackground) {
            this._actorSelectBackground.hide();
        }
    }
    if (params.EnemyXPSelect) {
        this._enemySelectWindow.deactivate();
        this._enemySelectWindow.hide();
        if (!!this._enemySelectBackground) {
            this._enemySelectBackground.hide();
        }
    }
};

Scene_Battle.prototype.openSelectWindow = function(selectWindow) {
    selectWindow.show();
    if (params.OpenAnimation) {
        selectWindow.open();
    }
};

Scene_Battle.prototype.closeSelectWindow = function(selectWindow) {
    if (params.OpenAnimation) {
        selectWindow.close();
    } else {
        selectWindow.hide();
    }
};


Window_Selectable.prototype.setActorSelectWindow = function(actorSelectWindow) {
    this.selectActorWindow = actorSelectWindow;
};

Window_Selectable.prototype.setEnemySelectWindow = function(enemySelectWindow) {
    this.selectEnemyWindow = enemySelectWindow;
};


function Window_BattleSelectBattler() {
    this.initialize(...arguments);
}

Window_BattleSelectBattler.prototype = Object.create(Window_StatusBase.prototype);
Window_BattleSelectBattler.prototype.constructor = Window_BattleSelectBattler;

Window_BattleSelectBattler.prototype.initialize = function(rect) {
    this.createData();
    Window_StatusBase.prototype.initialize.call(this, rect);
    this.openness = params.OpenAnimation ? 0 : 255;
    this._battler = null;
    this.targetSelect = null;
};

Window_BattleSelectBattler.prototype.createData = function() {
    this._contentsData = new Nuun_DrawSelectListData(this, params);
};

Window_BattleSelectBattler.prototype.colSpacing = function() {
    return 0;
};

Window_BattleSelectBattler.prototype.setBattler = function(battler) {
    this._battler = battler;
    this._contentsData.imgSetup(battler);
    this.refresh();
};

Window_BattleSelectBattler.prototype.refresh = function() {
    Window_StatusBase.prototype.refresh.call(this);
    this.drawItem();
};

Window_BattleSelectBattler.prototype.drawItem = function() {
    this._contentsData.drawStatusContents(this._battler);
};

Window_BattleSelectBattler.prototype.setForItem = function(text) {
    this.targetSelect = text;
};

Window_BattleSelectBattler.prototype.drawEXTargetSelect = function(x, y, width) {
    this.drawText(this.targetSelect, x, y, width, 'center');
};

Window_BattleSelectBattler.prototype.placeStateIcon = function(battler, x, y) {
    const key = "ActorSelectStateIcon";
    const sprite = this.createInnerSprite(key, Sprite_StateIcon);
    sprite.setup(battler);
    sprite.move(x + 8, y + 12);
    sprite.show();
};

Window_BattleSelectBattler.prototype.placeGauge = function(battler, type, x, y) {
    if (Imported.NUUN_GaugeImage) {
        this.placeGaugeImg(actor, type, x, y);
    }
    const key = "ActorSelectGauge-%1".format(type);
    const sprite = this.createInnerSprite(key, Sprite_NuunGauge);
    sprite.setup(battler, type);
    sprite.move(x, y);
    sprite.show();
};

Window_BattleSelectBattler.prototype.isActorPictureEXApp = function() {
    return Imported.NUUN_ActorPicture && params.DynamicFace;
};


function Window_BattleSelectEnemy() {
    this.initialize(...arguments);
}

Window_BattleSelectEnemy.prototype = Object.create(Window_BattleSelectBattler.prototype);
Window_BattleSelectEnemy.prototype.constructor = Window_BattleSelectEnemy;

Window_BattleSelectEnemy.prototype.initialize = function(rect) {
    Window_BattleSelectBattler.prototype.initialize.call(this, rect);
};

Window_BattleSelectEnemy.prototype.createData = function() {
    this._contentsData = new Nuun_DrawEnemySelectListData(this, params);
};

Window_BattleSelectEnemy.prototype.placeStateIcon = function(battler, x, y) {
    const key = "EnemySelectStateIcon";
    const sprite = this.createInnerSprite(key, Sprite_StateIcon);
    sprite.setup(battler);
    sprite.move(x + 8, y + 12);
    sprite.show();
};

Window_BattleSelectEnemy.prototype.placeGauge = function(battler, type, x, y) {
    if (Imported.NUUN_GaugeImage) {
        this.placeGaugeImg(actor, type, x, y);
    }
    const key = "EnemySelectGauge-%1".format(type);
    const sprite = this.createInnerSprite(key, Sprite_NuunGauge);
    sprite.setup(battler, type);
    sprite.move(x, y);
    sprite.show();
};


const _Window_BattleActor_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index) {
    _Window_BattleActor_select.call(this, index);
    if (this.selectActorWindow) {
        this.selectActorWindow.setBattler(this.actor(index));
    }
};


const _Window_BattleEnemy_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    _Window_BattleEnemy_select.call(this, index);
    if (this.selectEnemyWindow) {
        this.selectEnemyWindow.setBattler(this.enemy());
    }
};

Window_BattleEnemy.prototype.maxCols = function() {
    return this.maxItems();
};

Window_BattleEnemy.prototype.processWheelScroll = function() {
    if (this.isWheelScrollEnabled() && this.active) {
        const threshold = 20;
        const oldIndex = this.index();
        if (TouchInput.wheelY >= threshold) {
            this.cursorRight(Input.isTriggered("right"));
            if (params.EnemySelectdScrollSE && this.index() !== oldIndex) {
                this.playCursorSound();
            }
        }
        if (TouchInput.wheelY <= -threshold) {
            this.cursorLeft(Input.isTriggered("left"));
            if (params.EnemySelectdScrollSE && this.index() !== oldIndex) {
                this.playCursorSound();
            }
        }
    }
};


class Nuun_DrawSelectListData extends Nuun_DrawListData {
    constructor(_window, params) {
        super(_window, params);
    }

    getParamsList() {
        return params.ActorData;
    }

    getActorsList() {
        return [];
    }

    nuun_PlaceGauge(actor, type, x, y, fmt) {
        this._window.placeGauge(actor, type, x, y);
        this.tempParamsClear();
    }

    drawItemImg(actor, index) {
        
    }

    isActorPictureEXApp() {
        return this._window.isActorPictureEXApp();
    }

    drawItemParams(actor) {
        const w = this._window;
        if (w.targetSelect) {
            const rect = w.itemLineRect(0);
            w.drawEXTargetSelect(rect.x, rect.y, rect.width);
        } else {
            super.drawItemParams(actor);
        }
    }
};

class Nuun_DrawEnemySelectListData extends Nuun_DrawListData {
    constructor(_window, params) {
        super(_window, params);
    }

    getParamsList() {
        return params.EnemyData;
    }

    nuun_PlaceGauge(enemy, type, x, y, fmt) {
        this._window.placeGauge(enemy, type, x, y);
        this.tempParamsClear();
    }

    getBattlerFace(battler) {
        return battler.enemy().meta.XPBattlerFace ? battler.enemy().meta.XPBattlerFace.split(',') : null;
    }

    drawItemParams(battler) {
        const w = this._window;
        if (w.targetSelect) {
            const rect = w.itemLineRect(0);
            w.drawEXTargetSelect(rect.x, rect.y, rect.width);
        } else {
            super.drawItemParams(battler);
        }
    }
};

})();