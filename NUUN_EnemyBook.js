/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBook.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc モンスター図鑑
 * @author NUUN
 * @version 1.0.2
 * 
 * @help
 * モンスター図鑑を実装します。
 * 
 * 以下の項目が表示できます。
 * 
 * 表示基本パラメータ
 * 最大HP
 * 最大MP
 * 攻撃力
 * 防御力
 * 魔法力
 * 魔法防御
 * 敏捷性
 * 運
 * 命中率
 * 回避率
 * 会心率
 * オリジナルパラメータ（任意のステータス）×２
 * 
 * 
 * 追加表示パラメータ
 * 獲得経験値
 * 獲得金額
 * 撃破数
 * オリジナルパラメータ（任意のステータス）×３
 * 耐性属性
 * 弱点属性
 * 無効属性
 * 耐性ステート
 * 弱点ステート
 * 無効ステート
 * ドロップアイテム（ドロップアイテム追加対応）
 * スティールアイテム（盗みスキル導入時）
 * 記述欄（フリーテキストスペース）×３
 * 
 * 戦闘中にパーティコマンドからエネミー図鑑を開くことが出来ます。
 * アナライズ機能を使う場合、TPBバトルでは開いている間TPBゲージを止める仕様にしています。
 * 
 * エネミーのメモ欄
 * <desc1:[text]> 記述欄１のテキスト
 * <desc2:[text]> 記述欄２のテキスト
 * <desc3:[text]> 記述欄３のテキスト
 * [text]:表示するテキスト。リストの記述欄を選択すると表示されます。（desc1だと記述欄１）
 * 改行すれば何行でも表示可能ですので、独自の項目を追加することも可能です。
 * <NoBook>
 * エネミー図鑑に表示されません。
 * <ShowDataBook>
 * 未撃破でも撃破済みと判定されます。また情報がすべて表示されます。
 * 
 * 追加項目パラメータの行
 * 各パラメータ、経験値、お金、倒した数、オリジナルパラメータ：１行
 * 属性、ステート：２行
 * ドロップアイテム、スティールアイテム：４行
 * 記述欄：２行
 * 
 * 
 * 対応プラグイン
 * ドロップアイテム追加
 * 盗みスキル
 * 
 * 操作方法
 * 上下キー：エネミー選択
 * 左右 PgUp PgDn：ページ切り替え
 * 
 * タッチ操作
 * <>ボタン：キャラ切り替え
 * 
 * プラグインコマンド
 * EnemyBookOpen              図鑑を開きます。
 * EnemyBookAdd               エネミーを図鑑に追加します。
 * EnemyBookRemove            エネミーを図鑑から削除します。
 * EnemyBookComplete          図鑑を完成させます。
 * EnemyBookClear             図鑑をクリア（全削除）させます。
 * EnemyBookRemoveDefeat      エネミーの撃破数をリセットします。
 * EnemyBookGetDropItem       エネミーのドロップアイテムを取得済みにさせます。
 * EnemyBookRemoveDropItem    エネミーのドロップアイテムを未収得にさせます。
 * EnemyBookGetStealItem      エネミーのスティールアイテムを取得済みにします。
 * EnemyBookRemoveStealItem   エネミーのスティールアイテムを未収得にさせます。
 * EnemyBookDefeatEnemy       撃破したエネミー数を変数に格納します。
 * EnemyBookEncounteredEnemy  遭遇済みのエネミー数を変数に格納します。
 * EnemyBookCompleteRate      現在の完成度を変数に格納します。
 * EnemyBookDefeatEnemySum    指定のエネミーの撃破数を変数に格納します。
 * DorpItemAcquired           指定のアイテムがドロップ済みか判定します。
 * StealItemAcquired          指定のアイテムが盗み済みか判定します。
 * EnemyAnalyze               対象のステータスを表示します。
 * 
 * オリジナルパラメータ
 * this._enemy　データベースのエネミーデータを取得します。
 * this._enemy.meta メタタグを取得します。
 * enemy Game_Enemyのデータを取得します。
 * 
 * このプラグインはYoji Ojima様及びヱビ様、TOMY (Kamesoft)様を参考にさせていただきました。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 * 更新履歴
 * 2021/2/14 Ver.1.0.2
 * 特定の条件下で図鑑を開きドロップアイテム、スティールアイテムのあるページを開くとエラーが出る問題を修正。
 * 2021/2/14 Ver.1.0.1
 * アナライズモードをオープンした際の他のウィンドウの処理を変更。
 * 2021/2/7 Ver.1.0.0
 * 初版
 * 
 * @command EnemyBookOpen
 * @desc エネミー図鑑を開きます。
 * @text エネミー図鑑オープン
 * 
 * @command EnemyBookAdd
 * @desc エネミーを図鑑に追加します。
 * @text エネミー追加
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc エネミーIDを指定します。
 * 
 * @command EnemyBookRemove
 * @desc エネミーを図鑑から削除します。
 * @text エネミー削除
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc エネミーIDを指定します。
 * 
 * @command EnemyBookComplete
 * @desc 図鑑を完成させます。
 * @text 図鑑完成
 * 
 * @command EnemyBookClear
 * @desc 図鑑をクリア（消去）します。
 * @text 図鑑初期化
 *  
 * @command EnemyBookRemoveDefeat
 * @desc エネミーの撃破数をリセットします。
 * @text 図鑑初期化
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc エネミーIDを指定します。
 * 
 * @command EnemyBookGetDropItem
 * @desc エネミーのドロップアイテムを取得済みにします。
 * @text エネミードロップアイテム習得済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc エネミーIDを指定します。
 * 
 * @arg dropListId
 * @type number
 * @default 0
 * @text ドロップアイテムリストID
 * @desc ドロップアイテムリストIDを指定します。（0ですべて）
 * 
 * @command EnemyBookRemoveDropItem
 * @desc エネミーのドロップアイテムを未収得にします。
 * @text エネミードロップアイテム未収得
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc エネミーIDを指定します。
 * 
 * @arg dropListId
 * @type number
 * @default 0
 * @text ドロップアイテムリストID
 * @desc ドロップアイテムリストIDを指定します。（0ですべて）
 * 
 * @command EnemyBookGetStealItem
 * @desc エネミーのスティールアイテムを取得済みにします。
 * @text エネミースティールアイテム取得済み
 *
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc エネミーIDを指定します。
 * 
 * @arg stealListId
 * @type number
 * @default 0
 * @text スティールアイテムリストID
 * @desc スティールアイテムリストIDを指定します。（0ですべて）
 * 
 * @command EnemyBookRemoveStealItem
 * @desc エネミーのスティールアイテムを未取得にします。
 * @text エネミースティールアイテム未取得
 * @type 0
 * @default 0
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc エネミーIDを指定します。
 * 
 * @arg stealListId
 * @type number
 * @default 0
 * @text スティールアイテムリストID
 * @desc スティールアイテムリストIDを指定します。（0ですべて）
 * 
 * @command EnemyBookDefeatEnemy
 * @desc 撃破済みのエネミー数を格納します。
 * @text 撃破数
 * 
 * @arg DefeatEnemy
 * @type variable
 * @default 0
 * @text 変数
 * @desc 撃破済みエネミー数を代入する変数を指定します。
 * 
 * @command EnemyBookEncounteredEnemy
 * @desc 遭遇したエネミー数を格納します。
 * @text 遭遇数
 * 
 * @arg EncounteredEnemy
 * @type variable
 * @default 0
 * @text 変数
 * @desc 遭遇したエネミー数を代入する変数を指定します。
 * 
 * @command EnemyBookCompleteRate
 * @desc 図鑑の完成度を格納します。
 * @text 図鑑完成度
 * 
 * @arg CompleteRate
 * @type variable
 * @default 0
 * @text 変数
 * @desc 図鑑の完成度を代入する変数を指定します。
 * 
 * @command EnemyBookDefeatEnemySum
 * @desc エネミーの撃破数を格納します。
 * @text 総撃破数
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text エネミー
 * @desc エネミーを指定します。
 * 
 * @arg DefeatEnemySum
 * @type variable
 * @default 0
 * @text 変数
 * @desc エネミーの撃破数を代入する変数を指定します。
 * 
 * @command DorpItemAcquired
 * @desc 指定のアイテムがドロップ済みか判定します。
 * @text アイテムドロップ済み判定。
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc エネミーIDを指定します。
 * 
 * @arg DorpItemAcquiredId
 * @type number
 * @default 0
 * @text アイテムドロップリストID
 * @desc アイテムドロップリストIDを指定します。（0ですべて）
 * 
 * @arg DorpItemAcquiredswitch
 * @type switch
 * @default 0
 * @text 格納スイッチ
 * @desc アイテムがドロップ済みかを代入する変数を指定します。
 * 
 * @command StealItemAcquired
 * @desc 指定のアイテムが盗み済みか判定します。
 * @text アイテム盗み済み判定。
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc エネミーIDを指定します。
 * 
 * @arg stealAcquiredId
 * @type number
 * @default 0
 * @text スティールアイテムリストID
 * @desc スティールアイテムリストIDを指定します。（0ですべて）
 * 
 * @arg StealAcquiredswitch
 * @type switch
 * @default 0
 * @text 格納スイッチ
 * @desc アイテムが盗み済みかを代入する変数を指定します。
 * 
 * @command EnemyAnalyze
 * @desc エネミーの情報を表示します。
 * @text アナライズ
 * 
 * @arg EnemyNewStatus
 * @type boolean
 * @default true
 * @text エネミーの現在のステータスを表示します。
 * @desc エネミーを指定します。
 * 
 * 
 * パラメータ
 * @param BasicSetting
 * @text 基本設定
 * 
 * @param WindowMode
 * @desc エネミー選択画面の表示位置を指定します。
 * @text エネミー選択画面位置
 * @type select
 * @option 左側表示
 * @value 0
 * @option 右側表示
 * @value 1
 * @default 0
 * @parent BasicSetting
 * 
 * @param NumberType
 * @text エネミーのナンバー表示
 * @desc エネミーのナンバーを表示します。
 * @type select
 * @option エネミーNoの表示なし
 * @value 0
 * @option エネミーNoを表示する。
 * @value 1
 * @option エネミーNoを表示し、0埋めをする。
 * @value 2
 * @desc エネミーのNo表示
 * @default 1
 * @parent BasicSetting
 * 
 * @param RegistrationTiming
 * @text 登録タイミング
 * @desc 図鑑の登録タイミング。
 * @type select
 * @option 遭遇時
 * @value 0
 * @option 撃破時
 * @value 1
 * @option アナライズ時
 * @value 2
 * @desc エネミーのNo表示
 * @default 0
 * @parent BasicSetting
 * 
 * @param UnknownStatus
 * @desc 敵を撃破していない場合のステータス表示名
 * @text 未撃破エネミーステータス表示名
 * @type string
 * @default ？？？
 * @parent BasicSetting
 * 
 * @param UnknownData
 * @desc 未確認の索引名です。？1文字だけ入れると名前の文字数に応じて？に置き換えられます。
 * @text 未確認エネミー及びアイテム名
 * @type string
 * @default ？
 * @parent BasicSetting
 * 
 * @param TransformDefeat
 * @desc 変身前の敵を撃破したものとみなす。
 * @text 変身前撃破
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param MaxPage
 * @desc 表示するページ数を設定します。
 * @text 最大ページ数
 * @type number
 * @default 3
 * @max 3
 * @min 1
 * @parent BasicSetting
 * 
 * @param BackGround
 * @text 背景設定
 * 
 * @param BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/pictures
 * @parent BackGround
 * 
 * @param BackUiWidth
 * @text 背景サイズをUIに合わせる
 * @desc 背景サイズをUIに合わせる。
 * @type boolean
 * @default true
 * @parent BackGround
 * 
 * @param NoCursorBackground
 * @desc エネミー選択欄の背景を表示しない。
 * @text カーソル背景無し
 * @type boolean
 * @default false
 * @parent BackGround
 * 
 * @param PercentWindow
 * @text 完成度ウィンドウ設定
 * 
 * @param completeName
 * @desc 完成度の名称。
 * @text 完成度の表示名
 * @type string
 * @default 完成度
 * @parent PercentWindow
 * 
 * @param EncountName
 * @desc 遭遇済みの名称。
 * @text 遭遇済み表示名
 * @type string
 * @default 遭遇済み
 * @parent PercentWindow
 * 
 * @param DefeatName
 * @desc 撃破済みの名称。
 * @text 撃破済み表示名
 * @type string
 * @default 撃破済み
 * @parent PercentWindow
 * 
 * @param Interval
 * @desc 完成度ウィンドウの更新フレーム
 * @text 更新フレーム間隔
 * @type number
 * @default 100
 * @max 999999
 * @min 0
 * @parent PercentWindow
 * 
 * @param CommandData
 * @text コマンド設定
 * 
 * @param ShowCommand
 * @desc メニューコマンドにエネミー図鑑を追加します。
 * @text メニューコマンド表示
 * @type boolean
 * @default false
 * @parent CommandData
 * 
 * @param ShowBattleCommand
 * @desc 戦闘中のパーティコマンドにエネミー図鑑を追加します。
 * @text パーティコマンド表示
 * @type boolean
 * @default false
 * @parent CommandData
 * 
 * @param enemyBookSwitch 
 * @desc 表示させるフラグスイッチID
 * @text メニューコマンド表示スイッチ
 * @type switch
 * @default 0
 * @parent CommandData
 * 
 * @param CommandName
 * @desc コマンドの名称。
 * @text コマンドの表示名
 * @type string
 * @default 魔物図鑑
 * @parent CommandData
 * 
 * @param DropItemData
 * @text ドロップアイテム設定
 * 
 * @param dropItemsName
 * @desc 敵が落とすアイテムの名称。
 * @text ドロップアイテム名称
 * @type string
 * @default ドロップアイテム
 * @parent DropItemData
 * 
 * @param ShowDropItemName
 * @desc 未確認のドロップアイテムを隠す。
 * @text 未確認ドロップアイテム名
 * @type boolean
 * @default false
 * @parent DropItemData
 * 
 * @param DropItemProbabilityShow
 * @desc 確率を表示する。
 * @text 確率表示
 * @type boolean
 * @default true
 * @parent DropItemData
 * 
 * @param StealItemData
 * @text スティールアイテム設定
 * 
 * @param ShowStealItems
 * @desc スティールアイテムの表示（盗みスキル　NUUN_StealableItems.jsが必要）
 * @text スティールアイテム表示
 * @type boolean
 * @default false
 * @parent StealItemData
 * 
 * @param StealItemsName
 * @desc スティールアイテムの名称。
 * @text スティールアイテムの表示名
 * @default 盗めるアイテム
 * @parent StealItemData
 * 
 * @param ShowStealItemName
 * @desc 未確認のスティールアイテムを隠す。
 * @text 未確認スティールアイテム表示
 * @type boolean
 * @default false
 * @parent StealItemData
 * 
 * @param StealItemProbabilityShow
 * @desc 確率を表示する。
 * @text 確率表示
 * @type boolean
 * @default true
 * @parent StealItemData
 * 
 * @param ParamData
 * @text パラメータ項目設定
 * 
 * @param TwoColsMode
 * @desc パラメータの表示を２列にします。
 * @text ２列表示
 * @type boolean
 * @default false
 * @parent ParamData
 * 
 * @param HPgaugeWidth
 * @desc アナライズ時のHPゲージ横幅
 * @text アナライズ時HPゲージ横幅
 * @type number
 * @default 128
 * @max 999
 * @min 0
 * @parent ParamData
 * 
 * @param MPgaugeWidth
 * @desc アナライズ時のMPゲージ横幅
 * @text アナライズ時MPゲージ横幅
 * @type number
 * @default 128
 * @max 999
 * @min 0
 * @parent ParamData
 * 
 * @param ContentsFontSize
 * @desc フォントサイズ。
 * @text フォントサイズ
 * @type number
 * @default 26
 * @parent ParamData
 * @max 99
 * 
 * @param ParamList
 * @desc パラメータの表示するリスト。
 * @text パラメータ表示リスト
 * @type struct<ParamListData>[]
 * @default ["{\"NameColor\":\"16\",\"ShowParams\":\"1\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowParams\":\"2\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowParams\":\"3\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowParams\":\"4\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowParams\":\"5\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowParams\":\"6\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowParams\":\"7\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowParams\":\"8\",\"MaskMode\":\"false\"}"]
 * @parent ParamData
 * 
 * @param ConsensusName
 * @desc 会心率の名称。
 * @text 会心率名称
 * @type stirng
 * @default 会心率
 * @parent ParamData
 * 
 * @param paramOriginalName1
 * @desc オリジナルパラメータの名称１。
 * @text オリジナルパラメータ名称１
 * @type stirng
 * @default
 * @parent ParamData
 * 
 * @param paramOriginalEval
 * @desc オリジナルパラメータの評価式１。
 * @text オリジナルパラメータ評価式１
 * @type stirng
 * @default
 * @parent ParamData
 * 
 * @param paramOriginalName2
 * @desc オリジナルパラメータの名称２。
 * @text オリジナルパラメータ名称２
 * @type stirng
 * @default
 * @parent ParamData
 * 
 * @param paramOriginalEval2
 * @desc オリジナルパラメータの評価式２。
 * @text オリジナルパラメータ評価式２
 * @type stirng
 * @default
 * @parent ParamData
 * 
 * @param ParamMaskMode
 * @desc 未撃破のエネミーの基本ステータスを表示させません。
 * @text 未撃破基本ステータス非表示
 * @type boolean
 * @default false
 * @parent ParamData
 * 
 * @param PageData
 * @text 表示項目設定
 * 
 * @param Page1List
 * @desc １ページ目に表示するリスト。
 * @text １ページ目表示リスト
 * @type struct<Page1ListData>[]
 * @default ["{\"NameColor\":\"16\",\"ShowItem\":\"1\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"2\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"0\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"3\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"10\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"11\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"15\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"16\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}"]
 * @parent PageData
 * 
 * @param Page2List
 * @desc ２ページ目に表示するリスト。
 * @text ２ページ目表示リスト
 * @type struct<Page1ListData>[]
 * @default ["{\"NameColor\":\"16\",\"ShowItem\":\"20\",\"WideMode\":\"true\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"0\",\"WideMode\":\"false\",\"MaskMode\":\"false\"}","{\"NameColor\":\"16\",\"ShowItem\":\"31\",\"WideMode\":\"true\",\"MaskMode\":\"false\"}"]
 * @parent PageData
 * 
 * @param Page3List
 * @desc ３ページ目に表示するリスト。
 * @text ３ページ目表示リスト
 * @type struct<Page1ListData>[]
 * @default ["{\"NameColor\":\"16\",\"ShowItem\":\"30\",\"WideMode\":\"true\",\"MaskMode\":\"false\"}"]
 * @parent PageData
 * 
 * @param ParamEXData
 * @text 追加パラメータ項目設定
 * 
 * @param MoneyName
 * @desc 獲得金額の名称。
 * @text 獲得金額表示名
 * @type string
 * @default 獲得金額
 * @parent ParamEXData
 * 
 * @param defeatEnemyName
 * @desc 敵を倒した数の名称。
 * @text 敵を倒した数名
 * @type string
 * @default 撃破数
 * @parent ParamEXData
 * 
 * @param originalParamName1
 * @desc オリジナルパラメータの名称１。
 * @text オリジナルパラメータ表示名１
 * @type string
 * @default 
 * @parent ParamEXData
 * 
 * @param originalParamEval1
 * @desc オリジナルパラメータの式１。
 * @text オリジナルパラメータ式１
 * @type string
 * @default 
 * @parent ParamEXData
 * 
 * @param originalParamName2
 * @desc オリジナルパラメータの名称２。
 * @text オリジナルパラメータ表示名２
 * @type string
 * @default 
 * @parent ParamEXData
 * 
 * @param originalParamEval2
 * @desc オリジナルパラメータの式２。
 * @text オリジナルパラメータ式２
 * @type string
 * @default 
 * @parent ParamEXData
 * 
 * @param originalParamName3
 * @desc オリジナルパラメータの名称３。
 * @text オリジナルパラメータ表示名３
 * @type string
 * @default 
 * @parent ParamEXData
 * 
 * @param originalParamEval3
 * @desc オリジナルパラメータの式３。
 * @text オリジナルパラメータ式３
 * @type string
 * @default 
 * @parent ParamEXData
 * 
 * @param Desc1Name
 * @desc 記述欄１の名称。
 * @text 記述欄１表示名
 * @type string
 * @default 
 * @parent ParamEXData
 * 
 * @param Desc2Name
 * @desc 記述欄２の名称。
 * @text 記述欄２表示名
 * @type string
 * @default 生息地
 * @parent ParamEXData
 * 
 * @param Desc3Name
 * @desc 記述欄３の名称。
 * @text 記述欄３表示名
 * @type string
 * @default 
 * @parent ParamEXData
 * 
 * @param ParamEXMaskMode
 * @desc 未撃破のエネミーの追加ステータスを表示させません。
 * @text 未撃破追加ステータス非表示
 * @type boolean
 * @default false
 * @parent ParamEXData
 * 
 * @param ResistWeakData
 * @text 耐性弱点設定
 * 
 * @param ElementList
 * @desc 表示する属性。
 * @text 表示属性
 * @type struct<ElementData>[]
 * @default ["{\"ElementNo\":\"1\",\"ElementIconId\":\"76\"}","{\"ElementNo\":\"2\",\"ElementIconId\":\"64\"}","{\"ElementNo\":\"3\",\"ElementIconId\":\"65\"}","{\"ElementNo\":\"4\",\"ElementIconId\":\"66\"}","{\"ElementNo\":\"5\",\"ElementIconId\":\"67\"}","{\"ElementNo\":\"6\",\"ElementIconId\":\"68\"}","{\"ElementNo\":\"7\",\"ElementIconId\":\"69\"}","{\"ElementNo\":\"8\",\"ElementIconId\":\"70\"}","{\"ElementNo\":\"9\",\"ElementIconId\":\"71\"}"]
 * @parent ResistWeakData
 * 
 * @param StateList
 * @desc 表示するステート。
 * @text 表示ステート
 * @type struct<StateData>[]
 * @default ["{\"StateId\":\"1\"}","{\"StateId\":\"4\"}","{\"StateId\":\"5\"}","{\"StateId\":\"6\"}","{\"StateId\":\"7\"}","{\"StateId\":\"8\"}","{\"StateId\":\"9\"}","{\"StateId\":\"10\"}","{\"StateId\":\"12\"}","{\"StateId\":\"13\"}"]
 * @parent ResistWeakData
 * 
 * @param WeakElementName
 * @desc 効きやすい属性の名前です。属性有効度が101%以上で表示されます。
 * @text 効きやすい属性名称。
 * @type string
 * @default 弱点属性
 * @parent ResistWeakData
 * 
 * @param ResistElementName
 * @desc 効きにくい属性の名前です。
 * @text 効きやすい属性名称。
 * @type string
 * @default 耐性属性
 * @parent ResistWeakData
 * 
 * @param ResistNoEffectElement
 * @desc 効きにくい属性に無効を反映させるか。
 * @text 効きにくい属性に無効反映
 * @type boolean
 * @default true
 * @parent ResistWeakData
 * 
 * @param NoEffectElementName
 * @desc 効かない属性の名前です。
 * @text 効かない属性名称
 * @type string
 * @default 無効属性
 * @parent ResistWeakData
 * 
 * @param WeakStateName
 * @desc 効きやすいステートの名前です。
 * @text 効きやすいステート名称
 * @type string
 * @default 弱点ステート
 * @parent ResistWeakData
 * 
 * @param NormalWeakState
 * @desc 効きやすいステート対象を有効度100%以上から反映させるか。
 * @text 効きやすい属性有効度100%反映
 * @type boolean
 * @default true
 * @parent ResistWeakData
 * 
 * @param ResistStateName
 * @desc 効きにくいステートの名前です。
 * @text 効きにくいステート名称
 * @type string
 * @default 耐性ステート
 * @parent ResistWeakData
 * 
 * @param ResistNoEffectState
 * @desc 効きにくいステートに無効を反映させるか。
 * @text 効きにくいステートに無効反映
 * @type boolean
 * @default true
 * @parent ResistWeakData
 * 
 * @param NoEffectStateName
 * @desc 効かないステートの名前です。
 * @text 効かないステート名称
 * @type string
 * @default 無効ステート
 * @parent ResistWeakData
 * 
 * @param ResistWeakDataMaskMode
 * @desc 未撃破のエネミーの耐性弱点を表示させません。
 * @text 未撃破耐性弱点非表示
 * @type boolean
 * @default false
 * @parent ResistWeakData
 * 
 */
/*~struct~ParamListData:
 * 
 * @param NameColor
 * @desc 項目の文字色。
 * @text 項目文字色
 * @type number
 * @default 16
 * @max 999999
 * 
 * @param ShowParams
 * @desc 表示させる項目のリストです。奇数が左側、偶数が右側の順に表示させます。
 * @text 項目リスト
 * @type select
 * @option 表示なし
 * @value 0
 * @option 最大HP
 * @value 1
 * @option 最大MP
 * @value 2
 * @option 攻撃力
 * @value 3
 * @option 防御力
 * @value 4
 * @option 魔法力
 * @value 5
 * @option 魔法防御
 * @value 6
 * @option 敏捷性
 * @value 7
 * @option 運
 * @value 8
 * @option 命中率
 * @value 10
 * @option 回避率
 * @value 11
 * @option 会心率
 * @value 12
 * @option オリジナルパラメータ１
 * @value 20
 * @option オリジナルパラメータ２
 * @value 21
 * @default 0
 * 
 * @param ParamsTwoColsMode
 * @desc 項目の横いっぱいに表示する。左側（奇数）のみ及び２列表示がtrueの時のみ有効です。
 * @text 項目２列幅表示
 * @type boolean
 * @default false
 *  
 */
/*~struct~ElementData:
 * 
 * @param ElementNo
 * @desc 表示する属性番号です。
 * @text 属性番号
 * @type number
 * 
 * @param ElementIconId
 * @desc アイコンのIDを指定します。
 * @text アイコンID
 * @type number
 */
/*~struct~StateData:
 *
 * @param StateId
 * @desc 表示するステートです。
 * @text 表示ステート
 * @type state
 *
 */
/*~struct~Page1ListData:
 * 
 * @param NameColor
 * @desc 項目の文字色。
 * @text 項目文字色
 * @type number
 * @default 16
 * 
 * @param ShowItem
 * @desc 表示させる項目のリストです。奇数が左側、偶数が右側の順に表示させます。
 * @text 項目リスト
 * @type select
 * @option 表示なし
 * @value 0
 * @option 経験値
 * @value 1
 * @option 獲得金額
 * @value 2
 * @option 倒した数
 * @value 3
 * @option オリジナルパラメータ１
 * @value 4
 * @option オリジナルパラメータ２
 * @value 5
 * @option オリジナルパラメータ３
 * @value 6
 * @option 耐性属性
 * @value 10
 * @option 弱点属性
 * @value 11
 * @option 無効属性
 * @value 12
 * @option 耐性ステート
 * @value 15
 * @option 弱点ステート
 * @value 16
 * @option 無効ステート
 * @value 17
 * @option ドロップアイテム
 * @value 20
 * @option スティールアイテム
 * @value 21
 * @option 記述欄１
 * @value 30
 * @option 記述欄２
 * @value 31
 * @option 記述欄３
 * @value 32
 * @default 0
 * 
 * @param WideMode
 * @desc 項目の横いっぱいに表示する。左側（奇数）のみ有効です。
 * 右の項目(偶数）は0（表示なし)に設定してください。
 * @text 項目２列幅表示
 * @type boolean
 * @default false
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyBook = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EnemyBook');
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

let openAnalyze = false;

//プラグインコマンド
const pluginName = "NUUN_EnemyBook";

PluginManager.registerCommand(pluginName, 'EnemyBookOpen', args => {
  SceneManager.push(Scene_EnemyBook);
});

PluginManager.registerCommand(pluginName, 'EnemyBookAdd', args => {
  $gameSystem.addToEnemyBook(Number(args.enemyId));
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemove', args => {
  $gameSystem.removeFromEnemyBook(Number(args.enemyId));
});

PluginManager.registerCommand(pluginName, 'EnemyBookComplete', args => {
  $gameSystem.completeEnemyBook();
});

PluginManager.registerCommand(pluginName, 'EnemyBookClear', args => {
  $gameSystem.clearEnemyBook();
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemoveDefeat', args => {
  $gameSystem.resetDefeat();
});

PluginManager.registerCommand(pluginName, 'EnemyBookGetDropItem', args => {
  $gameSystem.dropItemListFlag(Number(args.enemyId), Number(args.dropListId) - 1, true);
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemoveDropItem', args => {
  $gameSystem.dropItemListFlag(Number(args.enemyId), Number(args.dropListId) - 1, false);
});

PluginManager.registerCommand(pluginName, 'EnemyBookGetStealItem', args => {
  $gameSystem.stealItemListFlag(Number(args.enemyId) , Number(args.stealListId) - 1, true);
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemoveStealItem', args => {
  $gameSystem.stealItemListFlag(Number(args.enemyId) , Number(args.stealListId) - 1, false);
});

PluginManager.registerCommand(pluginName, 'EnemyBookDefeatEnemy', args => {
  $gameSystem.defeatEnemyVar(args.DefeatEnemy);
});

PluginManager.registerCommand(pluginName, 'EnemyBookEncounteredEnemy', args => {
  $gameSystem.encounteredEnemyVar(args.EnemyBookEncounteredEnemy);
});

PluginManager.registerCommand(pluginName, 'EnemyBookCompleteRate', args => {
  $gameSystem.completeRate(args.CompleteRate);
});

PluginManager.registerCommand(pluginName, 'EnemyBookDefeatEnemySum', args => {
  $gameSystem.defeatEnemySumVar(Number(args.enemy), Number(args.DefeatEnemySum));
});

PluginManager.registerCommand(pluginName, 'EnemyAnalyze', args => {
  if ($gameParty.inBattle()) {
    SceneManager._scene.enemyBookEnemyAnalyze();
  }
});

PluginManager.registerCommand(pluginName, 'DorpItemAcquired', args => {
  $gameSystem.dorpItemAcquired(Number(args.DorpItemAcquiredswitch), Number(args.enemyId), Number(args.DorpItemAcquiredId) - 1);
});

PluginManager.registerCommand(pluginName, 'StealItemAcquired', args => {
  $gameSystem.stealItemAcquired(Number(args.StealAcquiredswitch), Number(args.enemyId), Number(args.stealAcquiredId) - 1);
});

//Game_System
Game_System.prototype.addToEnemyBook = function(enemyId) {
  if(!this._enemyBookFlags) {
    this.clearEnemyBookFlags();
  }
  this._enemyBookFlags[enemyId] = true;
};

Game_System.prototype.removeFromEnemyBook = function(enemyId) {
  if(this._enemyBookFlags) {
    this._enemyBookFlags[enemyId] = false;
    this.dropItemListFlag(enemyId, 0, false);
    this.stealItemListFlag(enemyId, 0, false);
    this._defeatNumber[i] = 0;
  }
};

Game_System.prototype.clearEnemyBookFlags = function() {
  this._enemyBookFlags = [];
};

Game_System.prototype.clearEnemyBook = function() {
  this.clearEnemyBookFlags();
  this.clearDefeat();
  this.clearDropItem();
  this.clearStealItem();
};

Game_System.prototype.completeEnemyBook = function() {
  this.clearEnemyBook();
  for (let i = 1; i < $dataEnemies.length; i++) {
    this._enemyBookFlags[i] = true;
    this.dropItemListFlag(i, 0, true);
    this.stealItemListFlag(i, 0, true);
    this.defeatCount(i);
  }
};

Game_System.prototype.isInEnemyBook = function(enemy) {
  return this._enemyBookFlags && enemy.name && this._enemyBookFlags[enemy.id];
};

Game_System.prototype.completeRate = function(val) {
  this.setDefeatEnemy(enemyList);
  const enemySum = $dataEnemies.reduce((r, enemy) => {
    return r + (enemy && enemy.name && !enemy.meta.NoBook ? 1 : 0);
  }, 0);
  const rate = Math.floor(this._defeatEnemy / enemySum * 100);
  $gameVariables.setValue(val, rate);
};

Game_System.prototype.clearDefeat = function() {
	this._defeatNumber = [];
};

Game_System.prototype.defeatCount = function(enemyId) {
  if (!this._defeatNumber) {
    this.clearDefeat();
  }
  this._defeatNumber[enemyId] = this._defeatNumber[enemyId] || 0;
  this._defeatNumber[enemyId]++;
};

Game_System.prototype.defeatNumber = function(enemyId) {
  if(this._defeatNumber && this._defeatNumber[enemyId]) {
    return this._defeatNumber[enemyId];
  }
  return 0;
};

Game_System.prototype.setDefeatEnemy = function(enemyList) {
  const enemy = enemyList ? enemyList : $dataEnemies;
  this._defeatEnemy = enemy.reduce((r, enemy) => {
    return r + (this.defeatNumber(enemy.id) > 0 || enemy.meta.ShowDataBook ? 1 : 0);
  }, 0);
};

Game_System.prototype.defeatEnemy = function(enemyList) {
  this.setDefeatEnemy(enemyList);
  return this._defeatEnemy;
};

Game_System.prototype.defeatEnemyVar = function(val) {
  this.setDefeatEnemy();
  $gameVariables.setValue(val, this._defeatEnemy);
};

Game_System.prototype.defeatEnemySumVar = function(enemy, val) {
  $gameVariables.setValue(val, this.defeatNumber(enemy));
};

Game_System.prototype.resetDefeat = function(enemyId) {
  if(this._defeatNumber && this._defeatNumber[enemyId]) {
    this._defeatNumber[enemyId] = 0;
  }
};

Game_System.prototype.setEncounteredEnemy = function(enemyList) {
  const enemy = enemyList ? enemyList : $dataEnemies;
  this._EncounteredEnemy = enemy.reduce((r ,enemy) => {
    if(enemyList) {
      return r + (this.isInEnemyBook(enemy) ? 1 : 0);
    } else {
      return r + (this.encounteredEnemyBook(enemy) ? 1 : 0);
    }
  }, 0);
};

Game_System.prototype.encounteredEnemy = function(enemyList) {
  this.setEncounteredEnemy(enemyList);
  return this._EncounteredEnemy;
};

Game_System.prototype.encounteredEnemyVar = function(val) {
  this.setEncounteredEnemy();
  $gameVariables.setValue(val, this._EncounteredEnemy);
};

Game_System.prototype.encounteredEnemyBook = function(enemy) {
  return enemy && enemy.name && !enemy.meta.NoBook && this.isInEnemyBook(enemy);
};

Game_System.prototype.clearDropItem = function() {
	this._itemDorps = [];
};

Game_System.prototype.setDropItemFlag = function(enemyId, dropId, flag) {
	if (!this._itemDorps) {
		this.clearDropItem();
  }
  this._itemDorps[enemyId] = this._itemDorps[enemyId] || [];
  this._itemDorps[enemyId][dropId] = flag;
};

Game_System.prototype.getDropItemFlag = function(enemyId, dropId) {
  if(!this._itemDorps || this._itemDorps[enemyId] === undefined || this._itemDorps[enemyId][dropId] === undefined) {
    return false;
  }
  return this._itemDorps[enemyId][dropId];
};

Game_System.prototype.clearStealItem = function() {
	this._stealItem = [];
};

Game_System.prototype.setStealItemFlag = function(enemyId, stealId, flag) {
	if (!this._stealItem) {
		this.clearStealItem();
  }
  this._stealItem[enemyId] = this._stealItem[enemyId] || [];
  this._stealItem[enemyId][stealId] = flag;
};

Game_System.prototype.getStealItemFlag = function(enemyId, stealId) {
  if(!this._stealItem || !this._stealItem[enemyId] === undefined || !this._stealItem[enemyId][stealId] === undefined) {
    return false;
  }
  return this._stealItem[enemyId][stealId];
};

Game_System.prototype.dropItemListFlag = function(enemyId, dropListId, mode) {
	if(enemyId > 0){
    if(dropListId > 0){
      this.setDropItemFlag(enemyId, dropListId, mode);
    } else {
      let itemList = $dataEnemies[enemyId].dropItems;
       for(let i = 0; itemList.length > i; i++){
        this.setDropItemFlag(enemyId, i, mode);
      }
    }
  }
};

Game_System.prototype.stealItemListFlag = function(enemyId, stealListId, mode) {
	if(enemyId > 0){
    if(stealListId > 0){
      this.setDropItemFlag(enemyId, stealListId, mode);
    } else {
      const enemy = $dataEnemies[enemyId];
      const itemList = (Imported.NUUN_StealableItems ? this.getStealList(enemy) : null);
      if(itemList) {
        for(let i = 0; itemList.length > i; i++){
          this.setStealItemFlag(enemyId, i, mode);
        }
      }
    }
  }
};

Game_System.prototype.dorpItemAcquired = function(switchId, enemyId, dropId) {
  if (dropId > 0) {
    drop = this.getDropItemFlag(enemyId, dropId);
  } else {
    drop = false;
    const itemList = $dataEnemies[enemyId].dropItems;
    if (itemList) {
      for(let i = 0; itemList.length > i; i++){
        if (itemList[i].kind > 0) {
          drop = this.getDropItemFlag(enemyId, i);
          if (!drop) {
            break;
          }
        }
      }
    }
  }
  if (switchId > 0) {
    $gameSwitches.setValue(switchId, drop);
  } else {
    return drop;
  }
};

Game_System.prototype.stealItemAcquired = function(switchId, enemyId, stealId) {
  if (stealId > 0) {
    steal = this.getStealItemFlag(enemyId, stealId);
  } else {
    steal = false;
    const itemList = this.getStealList($dataEnemies[enemyId]);
    if (itemList) {
      for(let i = 0; itemList.length > i; i++){
        steal = this.getStealItemFlag(enemyId, stealId);
        if (!steal) {
          break;
        }
      }
    }
  }
  if (switchId > 0) {
    $gameSwitches.setValue(switchId, steal);
  } else {
    return steal;
  }
};

Game_System.prototype.registrationTiming = function() {
  return param.RegistrationTiming;
};

Game_System.prototype.getStealList = function(enemy) {
  const re =/<(?:steal)\s*([IWAM]):\s*(\d+(?:\s*,\s*\d+)*)>/g;
  const stealItems = [];
	while(true) {
		let match = re.exec(enemy.note);
		if (match) {
			let data = match[2].split(',');
			switch (match[1]) {
				case 'I':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:1});
					break;
				case 'W':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:2});
					break;
				case 'A':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:3});
					break;
				case 'M':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:4});
					break;
			}
		} else {
			return stealItems;
		}
	}
};

//Game_Troop
const _Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
  _Game_Troop_setup.call(this, troopId);
  this.members().forEach(function(enemy) {
    if (enemy.isAppeared() && $gameSystem.registrationTiming() === 0) {
      $gameSystem.addToEnemyBook(enemy.enemyId());
    }
  }, this);
};

//Game_Enemy
const _Game_Enemy_appear = Game_Enemy.prototype.appear;
Game_Enemy.prototype.appear = function() {
  _Game_Enemy_appear.call(this);
  if ($gameSystem.registrationTiming() === 0) {
    $gameSystem.addToEnemyBook(this._enemyId);
  }
};

const _Game_Enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
  if (param.TransformDefeat) {
    $gameSystem.defeatCount(this._enemyId);
  }
  _Game_Enemy_transform.call(this, enemyId);
  if ($gameSystem.registrationTiming() === 0) {
    $gameSystem.addToEnemyBook(enemyId);
  }
};

const _Game_Enemy_die = Game_Enemy.prototype.die;
Game_Enemy.prototype.die = function() {
  _Game_Enemy_die.call(this);
  if ($gameSystem.registrationTiming() === 1) {
    $gameSystem.addToEnemyBook(this.enemyId());
  }
	$gameSystem.defeatCount(this.enemyId());
};

Game_Enemy.prototype.dropItemFlag = function(drop) {
  let di = this.enemy().dropItems;
  for (let i = 0; i < drop.length; i++){
    for(let r = 0; r < di.length; r++){
      if(drop[i].id === di[r].dataId){
        switch (di[r].kind) {
        case 1:
          if(DataManager.isItem(drop[i])){
            $gameSystem.setDropItemFlag(this._enemyId, r, true);
          } 
          break;
        case 2:
          if(DataManager.isWeapon(drop[i])){
            $gameSystem.setDropItemFlag(this._enemyId, r, true);
          }
          break;
        case 3:
          if(DataManager.isArmor(drop[i])){
            $gameSystem.setDropItemFlag(this._enemyId, r, true);
          }
          break;
        }
      }
    }
  }
};

const _Game_Enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
Game_Enemy.prototype.makeDropItems = function() {
  const drop = _Game_Enemy_makeDropItems.call(this);
  this.dropItemFlag(drop);
  return drop;
};

Game_Enemy.prototype.stealItemFlag = function() {
  const enemyId = this._enemyId;
  const number = $gameSystem._stealIndex;
  $gameSystem.setStealItemFlag(enemyId, number, true);
};

const _Game_Enemy_makeStealItems = Game_Enemy.prototype.makeStealItems;
Game_Enemy.prototype.makeStealItems = function(rate, mode) {
  const di = _Game_Enemy_makeStealItems.call(this, rate, mode)
  if(mode === 1 && di){
    this.stealItemFlag();
  }
  return di;
};

//Scene_Menu
const _Scene_Menu_createCommandWindow =　Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("enemyBook", this.commandEnemyBook.bind(this));
};

Scene_Menu.prototype.commandEnemyBook = function() {
  SceneManager.push(Scene_EnemyBook);
};

const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
  _Window_MenuCommand_addOriginalCommands.call(this);
  if(param.ShowCommand && ($gameSwitches.value(param.enemyBookSwitch) || param.enemyBookSwitch === 0)) {
    this.addCommand(param.CommandName, "enemyBook");
  }
};


//Scene_EnemyBook
function Scene_EnemyBook() {
  this.initialize(...arguments);
}

Scene_EnemyBook.prototype = Object.create(Scene_MenuBase.prototype);
Scene_EnemyBook.prototype.constructor = Scene_EnemyBook;

Scene_EnemyBook.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_EnemyBook.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createPercentWindow();
  this.createIndexWindow();
  this.createEnemyWindow();
  this.createEnemyBookButton();
};

Scene_EnemyBook.prototype.createIndexWindow = function() {
  const rect = this.indexWindowRect();
  this._indexWindow = new Window_EnemyBook_Index(rect);
  this._indexWindow.setHandler("cancel", this.popScene.bind(this));
  this._indexWindow.setHandler("pagedown", this.updateContentsPagedown.bind(this));
  this._indexWindow.setHandler("pageup", this.updateContentsPageup.bind(this));
  this.addWindow(this._indexWindow);
  this._indexWindow.setPercentWindow(this._percentWindow);
  this._indexWindow.activate();
};

Scene_EnemyBook.prototype.createPercentWindow = function() {
  const rect = this.percentWindowRect();
  this._percentWindow = new Window_EnemyBook_Percent(rect);
  this.addWindow(this._percentWindow);
};

Scene_EnemyBook.prototype.createEnemyWindow = function() {
  const rect = this.enemyWindowRect();
  this._enemyWindow = new Window_EnemyBook(rect);
  this.addWindow(this._enemyWindow);
  this._indexWindow.setEnemyWindow(this._enemyWindow);
  this._indexWindow.select(Window_EnemyBook_Index._lastIndex);
};

Scene_EnemyBook.prototype.percentWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyWindowWidth();
  const wy = this.mainAreaTop();
  const ww = Graphics.boxWidth / 3;
  const wh = this.calcWindowHeight(1, true);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.indexWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyWindowWidth();
  const wy = this.mainAreaTop() + this._percentWindow.height;
  const ww = Graphics.boxWidth / 3;
  const wh = Graphics.boxHeight - wy;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowRect = function() {
  const wx = param.WindowMode === 0 ? Graphics.boxWidth / 3 : 0;
  const wy = this.mainAreaTop();
  const ww = this.enemyWindowWidth();
  const wh = Graphics.boxHeight - wy;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowWidth = function() {
  return Graphics.boxWidth - Graphics.boxWidth / 3;
};

Scene_EnemyBook.prototype.createEnemyBookButton = function() {
  if(ConfigManager.touchUI) {
    this._pageupButton = new Sprite_Button("pageup");
    this._pageupButton.x = 4;
    this._pageupButton.y = this.buttonY();
    const pageupRight = this._pageupButton.x + this._pageupButton.width;
    this._pagedownButton = new Sprite_Button("pagedown");
    this._pagedownButton.x = pageupRight + 4;
    this._pagedownButton.y = this.buttonY();
    this.addWindow(this._pageupButton);
    this.addWindow(this._pagedownButton);
    this._pageupButton.setClickHandler(this.updateContentsPageup.bind(this));
    this._pagedownButton.setClickHandler(this.updateContentsPagedown.bind(this));
  }
};

Scene_EnemyBook.prototype.updateContentsPagedown = function() {
  SoundManager.playCursor();
  const maxPage = this.setMaxPage();
  this._enemyWindow._pageMode = (this._enemyWindow._pageMode + 1) % maxPage;
  this._enemyWindow.refresh();
  this._indexWindow.activate();
};

Scene_EnemyBook.prototype.updateContentsPageup = function() {
  SoundManager.playCursor();
  const maxPage = this.setMaxPage();
  this._enemyWindow._pageMode = (this._enemyWindow._pageMode + (maxPage - 1)) % maxPage;
  this._enemyWindow.refresh();
	this._indexWindow.activate();
};

Scene_EnemyBook.prototype.setMaxPage = function() {
  return param.MaxPage;
};

Scene_EnemyBook.prototype.update = function() {
  Scene_MenuBase.prototype.update.call(this);
  if (Input.isTriggered('left')) {
		this.updateContentsPageup();
	} else if (Input.isTriggered('right')){
		this.updateContentsPagedown();
	}
};


//Window_EnemyBook_Percent
function Window_EnemyBook_Percent() {
  this.initialize(...arguments);
}

Window_EnemyBook_Percent.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_Percent.prototype.constructor = Window_EnemyBook_Percent;

Window_EnemyBook_Percent.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this._defeat = {};
  this._encountered = {};
  this._duration = 0;
  this._oy = 0;
};

Window_EnemyBook_Percent.prototype.percentRefresh = function(enemyList) {
  this.defeatPercent(enemyList);
  this.encounteredPercent(enemyList);
  this.refresh();
};

Window_EnemyBook_Percent.prototype.defeatPercent = function(enemyList) {
  this._defeat.encNum = $gameSystem.defeatEnemy(enemyList);
  this._defeat.Percent = Math.floor(this._defeat.encNum / enemyList.length * 100);
  this._defeat.length = enemyList.length;
};

Window_EnemyBook_Percent.prototype.encounteredPercent = function(enemyList) {
  this._encountered.encNum = $gameSystem.encounteredEnemy(enemyList);
  //this._encountered.Percent = Math.floor(this._encountered.encNum / enemyList.length * 100);
  this._encountered.length = enemyList.length;
};

Window_EnemyBook_Percent.prototype.refresh = function() {
  const lineHeight = this.lineHeight();
  const rect = this.itemLineRect(0);
  const y = rect.y + (this._oy * -1);
  this.contents.clear();
  this.drawText(param.EncountName +'：'+ this._encountered.encNum +'/'+ this._encountered.length, rect.x, y, rect.width, 'center');
  this.drawText(param.DefeatName +'：'+ this._defeat.encNum +'/'+ this._defeat.length, rect.x, y + lineHeight * 1, rect.width, 'center');
  this.drawText(param.EncountName +'：'+ this._encountered.encNum +'/'+ this._encountered.length, rect.x, y + lineHeight * 3, rect.width, 'center');
  this.drawText(param.completeName +'：'+ this._defeat.Percent +' %', rect.x, y + lineHeight * 2, rect.width, 'center');
};

Window_EnemyBook_Percent.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  this._duration++;
  this.updateInterval();
};

Window_EnemyBook_Percent.prototype.updateInterval = function() {
  const lineHeight = this.lineHeight();
  if(this._duration >= param.Interval && this._duration < param.Interval + lineHeight){
    this._oy++;
    this.refresh();
  }
  if(this._duration >= param.Interval + lineHeight){
    this._duration = 0;
    if(this._oy >= lineHeight * 3){
       this._oy = 0;
    }
  }
};


//Window_EnemyBook_Index
function Window_EnemyBook_Index() {
  this.initialize(...arguments);
}

Window_EnemyBook_Index.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_Index.prototype.constructor = Window_EnemyBook_Index;

Window_EnemyBook_Index._lastTopRow = 0;
Window_EnemyBook_Index._lastIndex = 0;

Window_EnemyBook_Index.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this._enemyList = [];
  this.refresh();
  this.setTopRow(Window_EnemyBook_Index._lastTopRow);
  this.select(Window_EnemyBook_Index._lastIndex);
};

Window_EnemyBook_Index.prototype.processCancel = function() {
  Window_Selectable.prototype.processCancel.call(this);
  Window_EnemyBook_Index._lastTopRow = this.topRow();
  Window_EnemyBook_Index._lastIndex = this.index();
};

Window_EnemyBook_Index.prototype.maxCols = function() {
  return 1;
};

Window_EnemyBook_Index.prototype.maxItems = function() {
  return this._enemyList ? this._enemyList.length : 0;
};

Window_EnemyBook_Index.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
  //this.updateEnemyStatus();
};

Window_EnemyBook_Index.prototype.select = function(index) {
  Window_Selectable.prototype.select.call(this, index);
  this.updateEnemyStatus();
};

Window_EnemyBook_Index.prototype.updatePercent = function() {
  if (this._percentWindow) {
    const enemy = this._enemyList;
    this._percentWindow.percentRefresh(enemy);
  }
};

Window_EnemyBook_Index.prototype.updateEnemyStatus = function() {
  if (this._enemyWindow) {
    const enemy = this.getEnemy();
    this._enemyWindow.setEnemy(enemy);
  }
};

Window_EnemyBook_Index.prototype.getEnemy = function() {
  return this._enemyList[this.index()];
};

Window_EnemyBook_Index.prototype.setPercentWindow = function(percentWindow) {
  this._percentWindow = percentWindow;
  this.updatePercent();
};

Window_EnemyBook_Index.prototype.setEnemyWindow = function(enemyWindow) {
  this._enemyWindow = enemyWindow;
};

Window_EnemyBook_Index.prototype.enemyAt = function(index) {
  return this._enemyList && index >= 0 ? this._enemyList[index] : null;
};

Window_EnemyBook_Index.prototype.makeEnemyList = function() {
  this._enemyList = $dataEnemies.filter(enemy => this.includes(enemy));
};

Window_EnemyBook_Index.prototype.includes = function(enemy) {
  return enemy && enemy.name && !enemy.meta.NoBook;
};

Window_EnemyBook_Index.prototype.drawItem = function(index) {
  const enemy = this.enemyAt(index);
  if(enemy) {
    const rect = this.itemLineRect(index);
    let name = '';
    if ($gameSystem.isInEnemyBook(enemy)) {
      name = enemy.name;
    } else {
      name = this.unknownDataLength(enemy);
    }
    if(param.NumberType > 0) {
      let numberText = index += 1;
      const textWidth = this.numberWidth(numberText);
      if (param.NumberType === 2) {
        numberText = this.numberWidthSlice(numberText);
      }
      this.drawText(numberText, rect.x, rect.y, textWidth);
      this.drawText(":", rect.x + textWidth + 6, rect.y);
      this.drawText(name, rect.x + textWidth + 16, rect.y, rect.width - textWidth - 16);
    } else {
      this.drawText(name, rect.x, rect.y, rect.width);
    }
  }
};

Window_EnemyBook_Index.prototype.numberWidth = function(numberText) {
  return this.textWidth(this._enemyList.length >= 1000 || param.NumberType === 2 ? '000' : '00');
};

Window_EnemyBook_Index.prototype.numberWidthSlice = function(indexText) {
  return (this._enemyList.length >= 1000 ? ('0000' + indexText).slice(-4) : ('000' + indexText).slice(-3));
};

Window_EnemyBook_Index.prototype.unknownDataLength = function(enemy) {
  let name = '';
  if(param.UnknownData === '？' || param.UnknownData === '?') {
    const name_length = this.EnemyNameLength(enemy);
    for(let i = 0; i < name_length ;i++) {
      name += param.UnknownData;
    }
  } else {
    name = param.UnknownData;
  }
  return name;
};

Window_EnemyBook_Index.prototype.EnemyNameLength = function(enemy) {
	return enemy.name.length;
};

Window_EnemyBook_Index.prototype.drawItemBackground = function(index) {
  if(!param.NoCursorBackground) {
    Window_Selectable.prototype.drawItemBackground.call(this, index);
  }
};

Window_EnemyBook_Index.prototype.refresh = function() {
  this.makeEnemyList();
  this.updatePercent();
  Window_Selectable.prototype.refresh.call(this);
};


//Window_EnemyBook
function Window_EnemyBook() {
  this.initialize(...arguments);
}

Window_EnemyBook.prototype = Object.create(Window_Base.prototype);
Window_EnemyBook.prototype.constructor = Window_EnemyBook;

Window_EnemyBook.prototype.initialize = function(rect) {
  Window_Base.prototype.initialize.call(this, rect);
  this._additionalSprites = {};
  this._enemy = null;
  this._bookMode = 0;
  this._enemy = null;
  this._enemyData = [];
  this._pageMode = 0;
  this._enemySprite = new Sprite();
  this._enemySprite.anchor.x = 0.5;
  this._enemySprite.anchor.y = 0.5;
  this._enemySprite.x = rect.width / 4;
  this._enemySprite.y = rect.height / 4 + this.lineHeight();
  this.selectEnemy = null;
  this.addChildToBack(this._enemySprite);
  this.refresh();
};

Window_EnemyBook.prototype.setEnemy = function(enemy) {
  if(this._enemy !== enemy) {
    this._enemy = enemy;
    this.refresh();
  }
};

Window_EnemyBook.prototype.defeatFlag = function() {
  return $gameSystem.defeatNumber(this._enemy.id) > 0;
};

Window_EnemyBook.prototype.paramMask = function() {
  return param.ParamMaskMode && !this.noUnknownStatus() ? this.defeatFlag() : true;
};

Window_EnemyBook.prototype.paramEXMask = function() {
  return param.ParamEXMaskMode && !this.noUnknownStatus() ? this.defeatFlag() : true;
};

Window_EnemyBook.prototype.resistWeakDataMask = function() {
  return param.ResistWeakDataMaskMode && !this.noUnknownStatus() ? this.defeatFlag() : true;
};

Window_EnemyBook.prototype.showDropItemMask = function() {
  return param.ShowDropItemName && !this.noUnknownStatus() ? this.defeatFlag(): true;
};

Window_EnemyBook.prototype.dropItemFlag = function(index) {
  return $gameSystem.getDropItemFlag(this._enemy.id, index);
};

Window_EnemyBook.prototype.showStealItemMask = function() {
  return param.ShowStealItemName && !this.noUnknownStatus() ? this.defeatFlag(): true;
};

Window_EnemyBook.prototype.stealItemFlag = function(index) {
  return $gameSystem.getStealItemFlag(this._enemy.id, index);
};

Window_EnemyBook.prototype.noUnknownStatus = function(enemy) {
  return this._enemy.meta.ShowDataBook || this._bookMode === 1;
};

Window_EnemyBook.prototype.maxWidth = function() {
  return this.itemWidth() / 2 - this.itemPadding() * 2;
};

Window_EnemyBook.prototype.statusLineHeight = function() {
  return Math.floor((Graphics.boxHeight - 616) / 60) * 36;
};

Window_EnemyBook.prototype.refresh = function() {
  if(!this._enemy) {
    return;
  }
  let enemy = null;
  if(!this._enemyData[this._enemy.id]) {
    enemy = new Game_Enemy(this._enemy.id, 0, 0);
    this._enemyData[this._enemy.id] = enemy;
  } else {
    enemy = this._enemyData[this._enemy.id];
  }
  const padding = this.itemPadding();
  let x = padding;
  let x2 = x + this.itemWidth() / 2;
  let y = 0;
  const lineHeight = this.lineHeight();
  
  this.contents.clear();
  if ($gameParty.inBattle() && this.selectEnemy) {
    this.removeInnerSprite(this.selectEnemy, 'hp');
    this.removeInnerSprite(this.selectEnemy, 'mp');
  }
  if (!enemy || !$gameSystem.isInEnemyBook(this._enemy)) {
    this._enemySprite.bitmap = null;
    return;
  }
  this.enemyImg(enemy);
  this.enemyName(enemy, x, y);
  y += lineHeight + this.statusLineHeight();
  this.enemyParams(enemy, x2, y);
  y += lineHeight * 8 + this.statusLineHeight();
  if (this._pageMode === 0) {
    this.page(enemy, x, y);
  } else if (this._pageMode === 1) {
    this.page(enemy, x, y);
  } else if (this._pageMode === 2) {
    this.page(enemy, x, y);
  }
};

Window_EnemyBook.prototype.itemShow = function(list, enemy, x, y, width) {
  switch (list.ShowItem) {
    case 1:
      this.enemyExp(list.NameColor, enemy, x, y, width);
      return 1;
    case 2:
      this.enemyGold(list.NameColor, enemy, x, y, width);
      return 1;
    case 3:
      this.defeat(list.NameColor, enemy, x, y, width);
      return 1;
    case 4:
      this.originalParams(list.NameColor, enemy, x, y, width, param.originalParamName1, param.originalParamEval1);
      return 1;
    case 5:
      this.originalParams(list.NameColor, enemy, x, y, width, param.originalParamName2, param.originalParamEval2);
      return 1;
    case 6:
      this.originalParams(list.NameColor, enemy, x, y, width, param.originalParamName3, param.originalParamEval3);
      return 1;
    case 10:
      this.drawResistElement(list.NameColor, enemy, x, y, width);
      return 2;
    case 11:
      this.drawWeakElement(list.NameColor, enemy, x, y, width);
      return 2;
    case 12:
      this.drawNoEffectElement(list.NameColor, enemy, x, y, width);
      return 2;
    case 15:
      this.drawResistStates(list.NameColor, enemy, x, y, width);
      return 2;
    case 16:
      this.drawWeakStates(list.NameColor, enemy, x, y, width);
      return 2;
    case 17:
      this.drawNoEffectStates(list.NameColor, enemy, x, y, width);
      return 2;
    case 20:
      this.dropItems(list.NameColor, enemy, x, y, width);
      return 4;
    case 21:
      this.stealItems(list.NameColor, enemy, x, y, width);
      return 4;
    case 30:
      this.drawDesc1(list.NameColor, enemy, x, y, width);
      return 2;
    case 31:
      this.drawDesc2(list.NameColor, enemy, x, y, width);
      return 2;
    case 32:
      this.drawDesc3(list.NameColor, enemy, x, y, width);
      return 2;
    default:
      return 1;
  }
};

Window_EnemyBook.prototype.page = function(enemy, x, y) {
  const list = this.pageList(this._pageMode + 1);
  if(!list) {
    return;
  }
  const lineHeight = this.lineHeight();
  let width = 0;
  let y_Left = y;
  let y_Right = y;
  let row = 0;
  for(let i = 0; list.length > i; i++){
    if(list[i].ShowItem >= 0){
      if(i % 2 === 0){
        width = this.widthMode(list[i].WideMode);
        row = this.itemShow(list[i], enemy, x, y_Right, width);
        y_Right += row * lineHeight;
      } else {
        width = this.maxWidth();
        row = this.itemShow(list[i], enemy, x + this.itemWidth() / 2, y_Left, width);
        y_Left += row * lineHeight;
      }
    }
  }
};

Window_EnemyBook.prototype.widthMode = function(mode) {
  return mode ? this.itemWidth() - this.itemPadding() * 2 : this.maxWidth();
};

Window_EnemyBook.prototype.pageList = function(page) {
  switch (page) {
    case 1:
      return param.Page1List
    case 2:
      return param.Page2List;
    case 3:
      return param.Page3List;
  }
};

Window_EnemyBook.prototype.enemyImg = function(enemy) {
  const name = this.enemyBattlerName(enemy);
	const hue = enemy.battlerHue();
	let bitmap;
  	if ($gameSystem.isSideView()) {
      	bitmap = ImageManager.loadSvEnemy(name);
  	} else {
      	bitmap = ImageManager.loadEnemy(name);
    }
    Sprite_Battler.prototype.setHue.call(this._enemySprite, hue);
    this._enemySprite.bitmap = bitmap;
    if (bitmap && !bitmap.isReady()) {
      bitmap.addLoadListener(this.drowEnemy.bind(this));
    } else {
      this.drowEnemy(this);
    }
};

Window_EnemyBook.prototype.drowEnemy = function() {
  if(this._enemySprite.bitmap) {
    const bitmapWidth = this._enemySprite.bitmap.width;
    const bitmapHeight = this._enemySprite.bitmap.height;
    const contentsWidth = this.maxWidth();
    const contentsHeight = 350;
    let scale = 1.0;
    if (bitmapWidth > contentsWidth || bitmapHeight > contentsHeight) {
		  if (bitmapWidth - contentsWidth > bitmapHeight - contentsHeight) {
			  scale = contentsWidth / bitmapWidth;
		  } else {
		  	scale = contentsHeight / bitmapHeight;
		  }
    }
  	this._enemySprite.scale.x = scale;
  	this._enemySprite.scale.y = scale;
  }
};

Window_EnemyBook.prototype.enemyBattlerName = function(enemy) {
	return enemy.battlerName();
};

Window_EnemyBook.prototype.enemyName = function(enemy, x, y) {
	this.resetTextColor();
	this.drawText(enemy.name(), x, y, this.itemWidth() - 16, 'center');
};

Window_EnemyBook.prototype.enemyParams = function(enemy, x, y) {
  const list = param.ParamList;
  const padding = this.itemPadding();
  const maxWidth = this.maxWidth() + padding;
  const width = maxWidth / (param.TwoColsMode ? 2 : 1);
  this.contents.fontSize = param.ContentsFontSize;
	for (let i = 0; i < list.length; i++) {
    x2 = x + i % (param.TwoColsMode ? 2 : 1) * width;
    y2 = y + Math.floor(i / (param.TwoColsMode ? 2 : 1)) * (param.ContentsFontSize + 10);
    nameText = null;
    let text = this.paramShow(list[i].ShowParams, enemy);
    if (text !== null) {
      const textWidth = ((i % 2 === 0 && list[i].ParamsTwoColsMode && param.TwoColsMode) ? maxWidth : width) / 2 - padding;
      if ((list[i].ShowParams === 1 || list[i].ShowParams === 2) && $gameParty.inBattle() && this.selectEnemy) {
      } else {
        this.changeTextColor(ColorManager.textColor(list[i].NameColor));
        nameText = this.paramNameShow(list[i].ShowParams, enemy);
        this.drawText(nameText, x2, y2, textWidth);
      }
      this.resetTextColor();
      if(!this.paramMask()){
        text = param.UnknownStatus;
      }
      if (list[i].ShowParams === 1 && $gameParty.inBattle() && this.selectEnemy) {
        this.placeGauge(this.selectEnemy, "hp", x2, y2);
      } else if (list[i].ShowParams === 2 && $gameParty.inBattle() && this.selectEnemy) {
        this.placeGauge(this.selectEnemy, "mp", x2, y2);
      } else {
        if (i % 2 === 0 && list[i].ParamsTwoColsMode && param.TwoColsMode) {
          this.drawText(text, x2 + textWidth, y2, maxWidth - textWidth - padding, 'right');
        } else {
          this.drawText(text, x2 + textWidth, y2, width - textWidth - padding, 'right');
        }
      }
    }
  }
  this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_EnemyBook.prototype.paramNameShow = function(params, enemy) {
  switch (params) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return TextManager.param(params - 1);
    case 10:
    case 11:
      return TextManager.param(params - 2);
    case 12:
      return param.ConsensusName;
    case 20:
      return param.paramOriginalName1;
    case 21:
      return param.paramOriginalName2;
    default:
      return null;
  }
};

Window_EnemyBook.prototype.paramShow = function(params, enemy) {
  switch (params) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return enemy.param(params - 1);
    case 10:
    case 11:
    case 12:
      return enemy.xparam(params - 10) * 100 +"%";
    case 20:
      return eval(param.paramOriginalEval1);
    case 21:
      return eval(param.paramOriginalEval2);
    default:
      return null;
  }
};

Window_EnemyBook.prototype.enemyExp = function(color, enemy, x, y, width) {
	this.changeTextColor(ColorManager.textColor(color));
	this.drawText(TextManager.exp, x, y);
  this.resetTextColor();
  let text;
  if(this.paramEXMask()) {
    text = enemy.exp();
  } else {
    text = param.UnknownStatus;
  }
  const textWidth = this.textWidth(TextManager.exp) + 8;
  this.drawText(text, x + textWidth, y, width - textWidth, 'right');
};
  
Window_EnemyBook.prototype.enemyGold = function(color, enemy, x, y, width) {
  this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.MoneyName, x, y);
  this.resetTextColor();
  let text;
  if(this.paramEXMask()){
    text = enemy.gold();
    const textWidth = this.textWidth(param.MoneyName) + 8;
    this.drawCurrencyValue(text, this.currencyUnit(), x + textWidth, y, width - textWidth);
  } else {
    text = param.UnknownStatus;
    this.drawText(text, x, y, width, 'right');
  }
};

Window_EnemyBook.prototype.defeat = function(color, enemy, x, y, width) {
  this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.defeatEnemyName, x, y);
  this.resetTextColor();
  text = $gameSystem.defeatNumber(enemy.enemyId())
  this.drawText(text, x, y, width, 'right');
};

Window_EnemyBook.prototype.originalParams = function(color, enemy, x, y, width, params, paramsEval) {
  if(params){
    return this;
  }
	this.changeTextColor(ColorManager.textColor(color));
	this.drawText(params, x, y);
  this.resetTextColor();
  let text;
  if(this.paramEXMask()){
    text = eval(paramsEval);
  } else {
    text = param.UnknownStatus;
  }
	this.drawText(text, x, y, width, 'right');
};

Window_EnemyBook.prototype.drawResistElement = function(color, enemy, x, y, width) {
  if(!param.ElementList){
    return;
  }
  this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.ResistElementName, x, y);
  if(!this.resistWeakDataMask()){
    return this;
  }
  let icons = [];
  param.ElementList.forEach(Element => {
    if(Element.ElementNo){
      let rate = enemy.elementRate(Element.ElementNo);
      if(rate < 1 && param.ResistNoEffectElement || (rate < 1 && rate > 0 && !param.ResistNoEffectElement)){
        let icon = Element.ElementIconId;
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
	let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
		this.drawIcon(icon, x, y);
		x += dx;
	});
};

Window_EnemyBook.prototype.drawWeakElement = function(color, enemy, x, y, width) {
  if(!param.ElementList){
    return;
  }
  this.changeTextColor(ColorManager.textColor(color));
	this.drawText(param.WeakElementName, x, y);
  if(!this.resistWeakDataMask()){
    return this;
  }
  let icons = [];
  param.ElementList.forEach(Element => {
    if (Element.ElementNo) {
      let rate = enemy.elementRate(Element.ElementNo);
      if (rate > 1) {
        icon= Element.ElementIconId;
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
	let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
		this.drawIcon(icon, x, y);
		x += dx;
	});
};

Window_EnemyBook.prototype.drawNoEffectElement = function(color, enemy, x, y, width, mask) {
  if(!param.ElementList){
    return;
  }
  this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.NoEffectElementName, x, y);
  if(!this.resistWeakDataMask()){
    return this;
  }
  let icons = [];
  param.ElementList.forEach(Element => {
    if (Element.ElementNo) {
      let rate = enemy.elementRate(Element.ElementNo);
      if (rate <= 0) {
        let icon= Element.ElementIconId;
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
	let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
		this.drawIcon(icon, x, y);
		x += dx;
	});
};

Window_EnemyBook.prototype.drawResistStates = function(color, enemy, x, y, width, mask) {
  if(!param.StateList){
    return;
  }
  this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.ResistStateName, x, y);
  if(!this.resistWeakDataMask()){
    return this;
  }
  let icons = [];
  param.StateList.forEach(State => {
    if(State.StateId){
      let stateId = State.StateId;
      let rate = enemy.stateRate(stateId);
      if(rate < 1 && param.ResistNoEffectState || (rate < 1 && rate > 0 && !param.ResistNoEffectState)){
        let icon = $dataStates[stateId].iconIndex;
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
  });
};

Window_EnemyBook.prototype.drawWeakStates = function(color, enemy, x, y, width, mask) {
  if(!param.StateList){
    return;
  }
  this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.WeakStateName, x, y);
  if(!this.resistWeakDataMask()){
    return this;
  }
  let icons = [];
  param.StateList.forEach(State => {
  if(State.StateId){
    let stateId = State.StateId;
    let rate = enemy.stateRate(stateId);
    if (rate > 1 && !param.NormalWeakState || rate >= 1 && param.NormalWeakState) {
      let icon = $dataStates[stateId].iconIndex;
      if (icon && icon > 0) icons.push(icon);
      }
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
  });
};

Window_EnemyBook.prototype.drawNoEffectStates = function(color, enemy, x, y, width, mask) {
  if(!param.StateList){
    return;
  }
  this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.NoEffectStateName, x, y);
  if(!this.resistWeakDataMask()){
    return this;
  }
  let icons = [];
  param.StateList.forEach(State => {
    if(State.StateId){
      let stateId = State.StateId;
      let icon = null;
      let rate = enemy.stateRate(stateId);
      if (rate <= 0 || enemy.isStateResist(stateId)) {
        icon = $dataStates[stateId].iconIndex;
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
	});
};

Window_EnemyBook.prototype.dropItems = function(color, enemy, x, y, width, mask) {
  const maxWidth = width;
	this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.dropItemsName, x, y);
  let y2 = y + this.lineHeight();
  let list = this._enemy.dropItems;
  for(i = 0; i < list.length; i++){
    if(list[i].kind > 0){
      let item = enemy.itemObject(list[i].kind, list[i].dataId);
      if((this.showDropItemMask() && this.dropItemFlag(i)) || !param.ShowDropItemName) {
        let rate = list[i].denominator;
        let textWidth = this.textWidth("1/" + rate);
        this.drawItemName(item, x, y2, maxWidth - textWidth - this.itemPadding());
        if (param.DropItemProbabilityShow) {
          this.drawEnemyBookNumber("1/" + rate, x, y2, maxWidth);
        }
      } else {
        this.resetTextColor();
        this.drawText(this.unknownDataLength(item.name), x, y2, maxWidth,'left');
      }
      y2 += this.lineHeight();
    }
  }
};

Window_EnemyBook.prototype.stealItems = function(color, enemy, x, y, width, mask) {
	if(!param.ShowStealItems || !Imported.NUUN_StealableItems) {
		return this;
	}
	const maxWidth = width;
	this.changeTextColor(ColorManager.textColor(color));
  this.drawText(param.StealItemsName, x, y);
  let y2 = y + this.lineHeight();
  let list = enemy._stealItems;
  for(let i = 0; list.length > i; i++){
    if (list[i].kind > 0 && list[i].kind < 4) {
      let item = enemy.stealObject(list[i].kind, list[i].dataId);
      if((this.showStealItemMask() && this.stealItemFlag(i)) || !param.ShowStealItemName) {
        let rate = list[i].denominator;
        let textWidth = this.textWidth(rate +"%");
        this.drawItemName(item, x, y2, maxWidth - textWidth - this.itemPadding());
        if (param.StealItemProbabilityShow) {
          this.drawEnemyBookNumber(rate +"%", x, y2, maxWidth);
        }
      } else {
        this.resetTextColor();
        this.drawText(this.unknownDataLength(item.name), x, y2, maxWidth,'left');
      }
      y2 += this.lineHeight();
    }
  }
};

Window_EnemyBook.prototype.drawDesc1 = function(color, enemy, x, y, width, mask) {
  if (param.Desc1Name) {
    this.changeTextColor(ColorManager.textColor(color));
    this.drawText(param.Desc1Name, x, y);
    y += this.lineHeight();
  }
  if(this.paramEXMask()){
    this.resetTextColor();
    if(this._enemy.meta.desc1){
      this.drawTextEx(this._enemy.meta.desc1, x, y, width);
    }
  }
};

Window_EnemyBook.prototype.drawDesc2 = function(color, enemy, x, y, width, mask) {
  if (param.Desc2Name) {
    this.changeTextColor(ColorManager.textColor(color));
    this.drawText(param.Desc2Name, x, y);
    y += this.lineHeight();
  }
  if(this.paramEXMask()){
    this.resetTextColor();
    if(this._enemy.meta.desc2){
      this.drawTextEx(this._enemy.meta.desc2, x, y, width);
    }
  }
};

Window_EnemyBook.prototype.drawDesc3 = function(color, enemy, x, y, width, mask) {
  if (param.Desc3Name) {
    this.changeTextColor(ColorManager.textColor(color));
    this.drawText(param.Desc3Name, x, y);
    y += this.lineHeight();
  }
  if(this.paramEXMask()){
    this.resetTextColor();
    if(this._enemy.meta.desc3){
      this.drawTextEx(this._enemy.meta.desc3, x, y, width);
    }
  }
};

Window_EnemyBook.prototype.nameLength = function(name) {
	return name.length;
};

Window_EnemyBook.prototype.unknownDataLength = function(name) {
  const name_length = this.nameLength(name);
  let names = '';
  for(let i = 0; i < name_length ;i++) {
    names += param.UnknownData;
  }
  return names;
};

Window_EnemyBook.prototype.iconX = function(icons, width) {
	if (32 * icons.length > width) {
		return Math.floor(width / icons.length);
	}
	return 32;
};

Window_EnemyBook.prototype.drawEnemyBookNumber = function(text, x, y, width,) {
  this.resetTextColor();
  this.drawText(text , x, y, width,'right');
};

Window_EnemyBook.prototype.placeGauge = function(enemy, type, x, y, width) {
  const padding = this.itemPadding();
  const key = "enemyBook-gauge-%2".format(enemy.enemyId(), type);
  const sprite = this.createInnerSprite(key, Sprite_EnemyBookGauge);
  sprite.bitmap.width = width - padding;
  sprite.setup(enemy, type);
  sprite.move(x, y);
  sprite.show();
};

Window_EnemyBook.prototype.createInnerSprite = function(key, spriteClass) {
  const dict = this._additionalSprites;
  const sprite = new spriteClass();
  dict[key] = sprite;
  this.addInnerChild(sprite);
  return sprite;
};

Window_EnemyBook.prototype.removeInnerSprite = function(enemy, type) {
  const key = "enemyBook-gauge-%2".format(enemy.enemyId(), type);
  const dict = this._additionalSprites;
  if (dict[key]) {
    this._clientArea.removeChild(dict[key]);
    dict[key] = null;
  }
};

Window_EnemyBook.prototype.currencyUnit = function() {
  return TextManager.currencyUnit;
};

/////////////////////////////////////戦闘/////////////////////////////////////////
const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  _Scene_Battle_createAllWindows.call(this);
  this.createEnemyBookWindow();
};

Scene_Battle.prototype.createEnemyBookWindow = function() {
  this.createEnemyBookPercentWindow();
  this.createEnemyBookDummyWindow();
  this.createEnemyBookIndexWindow();
  this.createEnemyBookEnemyWindow();
  this.createEnemyBookButton();
};

Scene_Battle.prototype.createEnemyBookPercentWindow = function() {
  const rect = this.percentEnemyBookWindowRect();
  this._enemyBookPercentWindow = new Window_EnemyBook_Percent(rect);
  this.addWindow(this._enemyBookPercentWindow);
  this._enemyBookPercentWindow.hide();
};

Scene_Battle.prototype.createEnemyBookIndexWindow = function() {
  const rect = this.enemyBookIndexWindowRect();
  this._enemyBookIndexWindow = new Window_EnemyBook_Index(rect);
  this._enemyBookIndexWindow.setHandler("cancel", this.cancelEnemyBook.bind(this));
  this._enemyBookIndexWindow.setHandler("pagedown", this.updateEnemyBookPagedown.bind(this));
  this._enemyBookIndexWindow.setHandler("pageup", this.updateEnemyBookPageup.bind(this));
  this.addWindow(this._enemyBookIndexWindow);
  this._enemyBookIndexWindow.setPercentWindow(this._enemyBookPercentWindow);
  this._enemyBookIndexWindow.hide();
};

Scene_Battle.prototype.createEnemyBookDummyWindow = function() {
  const rect = this.dummyEnemyBookWindowRect();
  this._enemyBookDummyWindow = new Window_EnemyBook_Dummy(rect);
  this._enemyBookDummyWindow.setHandler("cancel", this.cancelEnemyBook.bind(this));
  this._enemyBookDummyWindow.setHandler("pagedown", this.updateEnemyBookPagedown.bind(this));
  this._enemyBookDummyWindow.setHandler("pageup", this.updateEnemyBookPageup.bind(this));
  this.addWindow(this._enemyBookDummyWindow);
  this._enemyBookDummyWindow.hide();
};
  
Scene_Battle.prototype.createEnemyBookEnemyWindow = function() {
  const rect = this.enemyBookWindowRect();
  this._enemyBookEnemyWindow = new Window_EnemyBook(rect);
  this.addWindow(this._enemyBookEnemyWindow);
  this._enemyBookIndexWindow.setEnemyWindow(this._enemyBookEnemyWindow);
  this._enemyBookEnemyWindow.hide();
};

Scene_Battle.prototype.percentEnemyBookWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
  const wy = Scene_MenuBase.prototype.mainAreaTop();
  const ww = Graphics.boxWidth / 3;
  const wh = this.calcWindowHeight(1, true);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.dummyEnemyBookWindowRect = function() {
  const wx = (Graphics.boxWidth - this.enemyBookWindowWidth()) / 2;
  const wy = this._enemyBookPercentWindow.y;
  const ww = this.enemyBookWindowWidth();
  const wh = this.calcWindowHeight(1, true);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookIndexWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
  const wy = this._enemyBookPercentWindow.y + this._enemyBookPercentWindow.height;
  const ww = Graphics.boxWidth / 3;
  const wh = Graphics.boxHeight - wy;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookWindowRect = function() {
  const wx = param.WindowMode === 0 ? Graphics.boxWidth / 3 : 0;
  const wy = this._enemyBookPercentWindow.y;
  const ww = this.enemyBookWindowWidth();
  const wh = Graphics.boxHeight - wy;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookWindowWidth = function() {
  return Graphics.boxWidth - Graphics.boxWidth / 3;
};

const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
  _Scene_Battle_createPartyCommandWindow.call(this);
  this._partyCommandWindow.setHandler("enemyBook", this.commandEnemyBook.bind(this));
};

const _Scene_Battle_hideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows;
Scene_Battle.prototype.hideSubInputWindows = function() {
  _Scene_Battle_hideSubInputWindows.call(this);
  if (this._enemyBookIndexWindow.active || this._enemyBookDummyWindow.active) {
  }
};

Scene_Battle.prototype.commandEnemyBook = function() {
  this._enemyBookEnemyWindow._bookMode = 0;
  this._enemyBookEnemyWindow.x = param.WindowMode === 0 ? Graphics.boxWidth / 3 : 0;
  this._enemyBookIndexWindow.activate();
  this._enemyBookIndexWindow.show();
  this._enemyBookIndexWindow.open();
  this._enemyBookPercentWindow.show();
  this._enemyBookPercentWindow.open();
  this._enemyBookEnemyWindow.show();
  this._enemyBookEnemyWindow.open();
  this._enemyBookIndexWindow.refresh();
  this._enemyBookEnemyWindow.refresh();
};

Scene_Battle.prototype.cancelEnemyBook = function() {
  this._enemyBookDummyWindow.interruptWindow = false;
  this._enemyBookIndexWindow.deactivate();
  this._enemyBookDummyWindow.deactivate();
  this._enemyBookIndexWindow.close();
  this._enemyBookPercentWindow.close();
  this._enemyBookEnemyWindow.close();
  this._enemyBookDummyWindow.close();
  this._enemyBookIndexWindow.hide();
  this._enemyBookPercentWindow.hide();
  this._enemyBookEnemyWindow.hide();
  this._enemyBookDummyWindow.hide();
  this._enemyBookEnemyWindow.selectEnemy = null;
  if (this._enemyBookEnemyWindow._bookMode === 0) {
    this._partyCommandWindow.activate();
  }
  openAnalyze = false;
};

Scene_Battle.prototype.enemyBookEnemyAnalyze = function() {
  openAnalyze = true;
  this._enemyBookDummyWindow.interruptWindow = true;
  //this.userWindowDeactivate();
  this._enemyBookEnemyWindow._enemy = null;
  this._enemyBookEnemyWindow._bookMode = 1;
  this._enemyBookEnemyWindow.x = (Graphics.boxWidth - this._enemyBookEnemyWindow.width) / 2;
  this._enemyBookDummyWindow.activate();
  this._enemyBookDummyWindow.show();
  this._enemyBookDummyWindow.open();
  this._enemyBookEnemyWindow.show();
  this._enemyBookEnemyWindow.open();
  this._enemyBookIndexWindow.refresh();
  const index = this._enemyWindow.enemyIndex();
  this._enemyBookEnemyWindow.selectEnemy = $gameTroop.members()[index];
  const enemy = this._enemyBookEnemyWindow.selectEnemy.enemy();
  if ($gameSystem.registrationTiming() === 2) {
    $gameSystem.addToEnemyBook(enemy.id);
  }
  this._enemyBookEnemyWindow.setEnemy(enemy);
};

Scene_Battle.prototype.createEnemyBookButton = function() {
  if(ConfigManager.touchUI) {
    this._pageupButton = new Sprite_Button("pageup");
    this._pageupButton.x = 4;
    this._pageupButton.y = this.buttonY();
    const pageupRight = this._pageupButton.x + this._pageupButton.width;
    this._pagedownButton = new Sprite_Button("pagedown");
    this._pagedownButton.x = pageupRight + 4;
    this._pagedownButton.y = this.buttonY();
    this.addWindow(this._pageupButton);
    this.addWindow(this._pagedownButton);
    this._pageupButton.setClickHandler(this.updateEnemyBookPageup.bind(this));
    this._pagedownButton.setClickHandler(this.updateEnemyBookPagedown.bind(this));
    this.updatePageupdownButton();
  }
};

Scene_Battle.prototype.updatePageupdownButton = function() {
  if (this._pageupButton && this._pagedownButton) {
    this._pageupButton.visible = this._enemyBookIndexWindow.active || this._enemyBookDummyWindow.active ? true : false;
    this._pagedownButton.visible = this._enemyBookIndexWindow.active || this._enemyBookDummyWindow.active ? true : false;
    this._pageupButton.y = this.buttonY();
    this._pagedownButton.y = this.buttonY();
  }
};

Scene_Battle.prototype.updateEnemyBookPagedown = function() {
  SoundManager.playCursor();
  const maxPage = this.setMaxPage();
  this._enemyBookEnemyWindow._pageMode = (this._enemyBookEnemyWindow._pageMode + 1) % maxPage;
  this._enemyBookEnemyWindow.refresh();
};

Scene_Battle.prototype.updateEnemyBookPageup = function() {
  SoundManager.playCursor();
  const maxPage = this.setMaxPage();
  this._enemyBookEnemyWindow._pageMode = (this._enemyBookEnemyWindow._pageMode + (maxPage - 1)) % maxPage;
  this._enemyBookEnemyWindow.refresh();
};

Scene_Battle.prototype.setMaxPage = function() {
  return param.MaxPage;
};

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  this.updatePageupdownButton();
  if (this._enemyBookIndexWindow.active || this._enemyBookDummyWindow.active) {
    if (Input.isTriggered('left')) {
      this.updateEnemyBookPageup();
    } else if (Input.isTriggered('right')){
      this.updateEnemyBookPagedown();
    }
  }
};

const _Scene_Battle_updateCancelButton = Scene_Battle.prototype.updateCancelButton;
Scene_Battle.prototype.updateCancelButton = function() {
  _Scene_Battle_updateCancelButton.call(this);
  if (this._cancelButton) {
    this._cancelButton.y = this.buttonY();
  }
};

const _Scene_Battle_buttonY = Scene_Battle.prototype.buttonY;
Scene_Battle.prototype.buttonY = function() {
  const y = _Scene_Battle_buttonY.call(this);
  if (this._enemyBookIndexWindow.active) {
    return y - this._helpWindow.height;
  }
  return y;
};

const _Scene_Battle_isAnyInputWindowActive  = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
  return this._enemyBookIndexWindow.active || this._enemyBookDummyWindow.active ||_Scene_Battle_isAnyInputWindowActive.call(this);
};


const _Scene_Battle_isTimeActive = Scene_Battle.prototype.isTimeActive;
Scene_Battle.prototype.isTimeActive = function() {
  return !this._enemyBookIndexWindow.active && !this._enemyBookDummyWindow.active && _Scene_Battle_isTimeActive.call(this);
};

Scene_Battle.prototype.userWindowDeactivate = function() {//暫定競合対策
  if (typeof this.hideFormationWindows == 'function') {
    this.hideFormationWindows();//DarkPlasma_FormationInBattle
  }
};

const _Window_Selectable_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(rect) {
  _Window_Selectable_initialize.call(this, rect);
  this.interruptWindow = false;
};

const _Window_Selectable_isOpenAndActive = Window_Selectable.prototype.isOpenAndActive;
Window_Selectable.prototype.isOpenAndActive = function() {
  if (openAnalyze && $gameParty.inBattle()) {
    return this.interruptWindow ? _Window_Selectable_isOpenAndActive.call(this) : false;
  }
  return _Window_Selectable_isOpenAndActive.call(this);
};

const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
  _Window_PartyCommand_makeCommandList.call(this);
  if (param.ShowBattleCommand && ($gameSwitches.value(param.enemyBookSwitch) || param.enemyBookSwitch === 0)) {
    this.addCommand(param.CommandName, "enemyBook");
  }
};

function Window_EnemyBook_Dummy() {
  this.initialize(...arguments);
}

Window_EnemyBook_Dummy.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_Dummy.prototype.constructor = Window_EnemyBook_Dummy;

Window_EnemyBook_Dummy.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this.opacity = 0;
};


function Sprite_EnemyBookGauge() {
  this.initialize(...arguments);
}

Sprite_EnemyBookGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_EnemyBookGauge.prototype.constructor = Sprite_EnemyBookGauge;

Sprite_EnemyBookGauge.prototype.bitmapWidth = function() {
  if (this._statusType === 'hp') {
    return param.HPgaugeWidth > 0 ? param.HPgaugeWidth : 128;
  } else if (this._statusType === 'mp') {
    return param.MPgaugeWidth > 0 ? param.MPgaugeWidth : 128;
  }
  return 999;
};

})();
