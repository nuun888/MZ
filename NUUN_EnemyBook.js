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
 * @version 2.7.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * モンスター図鑑を実装します。
 * このプラグインではエネミーの表示内容を自由に設定することが出来ます。
 * 
 * 以下の項目が表示できます。
 * 
 * HP（アナライズモードでは現在のステータスをONにしている時のみゲージが表示可能です）
 * MP（アナライズモードでは現在のステータスをONにしている時のみゲージが表示可能です）
 * TP（アナライズモードで現在のステータスをONにしている時のみ表示します）
 * 攻撃力
 * 防御力
 * 魔法力
 * 魔法防御
 * 敏捷性
 * 運
 * 命中率
 * 回避率
 * 会心率
 * 会心回避率
 * 魔法回避率
 * 魔法反射率
 * 反撃率
 * HP再生率
 * MP再生率
 * TP再生率
 * 狙われ率
 * 防御効果率
 * 回復効果率
 * 薬の知識
 * MP消費率
 * TPチャージ率
 * 物理ダメージ率
 * 魔法ダメージ率
 * 経験値
 * 獲得金額
 * 倒した数
 * ターン（TPBバトルで現在のステータスをONにしている時のみ表示します）
 * モンスター名
 * 名称のみ
 * 耐性属性
 * 弱点属性
 * 無効属性
 * 耐性ステート
 * 弱点ステート
 * 無効ステート
 * 耐性デバフ
 * 弱点デバフ
 * ドロップアイテム
 * スティールアイテム（盗みスキル導入時）
 * 記述欄（フリーテキストスペース　制御文字が使用できます）
 * オリジナルパラメータ（任意のステータス）
 * 敵の使用スキル
 * モンスター画像
 * キャラチップ
 * 属性耐性レーダーチャート
 * ステート耐性レーダーチャート
 * モンスターブックナンバー
 * 
 * 戦闘中にパーティコマンドからエネミー図鑑を開くことが出来ます。
 * アナライズ機能を使う場合、TPBバトルでは開いている間TPBゲージを止める仕様にしています。
 * 
 * レーダーチャートを表示するにはNUUN_RadarChartBaseが必要です。
 * 
 * 
 * 敵キャラのメモ欄
 * <[tag]:[text]> 記述欄のテキスト
 * [tag]:記述欄タグ名　デフォルト設定だとモンスターの説明を記述するタグはdesc1に設定されています。
 * [text]:表示するテキスト。
 * 改行すれば何行でも表示可能ですので、独自の項目を追加することも可能です。
 * <desc1:ああああ> desc1とタグ付けされた項目に「ああああ」が表示されます。
 * デフォルト設定では４ページ目に表示される項目にdesc1が設定されていますので、文章を表示させる場合は<desc1:[text]>と記入してください。
 * 
 * <NoBook>
 * モンスター図鑑に表示されません。アナライズのみデータを見ることが出来ます。
 * <NoBookData>
 * モンスター図鑑に表示されず、アナライズを使用しても表示されません。
 * <ShowDataBook>
 * 未撃破でも撃破済みと判定されます。また情報がすべて表示されます。
 * <AnalyzeResist:50> アナライズの抵抗値を設定します。この場合５０％の確率でアナライズが成功します。
 * <EnemyIcon:[iconid]>
 * モンスター名の左にアイコンを表示させることが出来ます。
 * <EnemyIcon:120> アイコンID120番のアイコンが表示されます。
 * <NoTransformInData> 変身時に撃破扱いに図鑑に登録しません。（変身前撃破をONにしている時のみ）
 * 
 * 
 * <EB_SVBattler:[fileName]> モンスター画像をサイドビュー画像で表示させます。(モンスターにサイドビューアクターを表示する系のプラグイン導入が前提としています)
 * [fileName]:ファイル名　サイドビューバトラー画像を指定します。sv_actorsフォルダ内のファイル名を拡張子なしで指定してください。
 * <EB_SVBattlerMotion:[motionId]> 指定したモーションで表示させます。記入なしの場合は0のモーションで表示されます。
 * [motionId]:0～17モーションID(数値で入力)
 * 
 * <EnemyBookCharacter:[failName],[id],[direction]> キャラチップを表示します。指定していないモンスターには表示されません。
 * [failName]:ファイル名　charactersフォルダ内のファイル名を拡張子なしで指定してください。
 * [id]:キャラチップのインデックス番号。3×4のキャラチップは0になります。
 * [direction]:方向を指定します。2正面（一番上） 4左（２番目） 6右（３番目） 8後向き（一番下）　※省略可能
 * 
 * 
 * スキル、アイテムのメモ欄
 * <AnalyzeSkill:1> このスキル、アイテムはアナライズスキルとし、「アナライズスキル設定」の１番の設定で発動します。
 * アイテムのメモ欄
 * <NoDropProbability>
 * このタグを記入したアイテムはドロップアイテムの確率表示を表示しません。
 * <CertainAnalyze> アナライズ耐性を無視します。
 * <EnemyInfo> 敵の情報を表示します。
 * 
 * 
 * 図鑑の登録タイミングを遭遇時、撃破時、アナライズ時、撃破またはアナライズ時から選択できます。（ステータス情報は登録されません）
 * モンスターのステータス情報の登録タイミングを遭遇時、撃破時、アナライズ時、撃破またはアナライズ時から選択可能です。
 * またステータス情報の未登録のモンスターのステータスを？？？で表示する機能を個別に設定できます。
 *
 * 
 * モンスターの種類カテゴリーの設定
 * モンスターを種類別に表示させることが出来ます。
 * カテゴリーkeyはallを除いて任意の文字列で設定可能です。
 * allを記入の場合は図鑑に登録される全てのモンスターが表示されます。
 * 敵キャラのメモ欄
 * <CategoryKey:[Key]> 表示するカテゴリーを設定します。
 * <CategoryKey:[Key],[Key]....> 表示出来るカテゴリーは複数設定可能です。
 * [Key]:カテゴリーKey([]は付けずにプラグインパラメータで設定した文字列を記入してください)
 * 
 * ページの各項目の設定
 * 
 * 各ページの項目は「表示項目設定」から設定します。
 * 図鑑に表示するには「ページ設定」の「表示リスト指定」から表示させるリストを選択してください。
 * この設定は「アナライズ設定」の「表示項目設定」でも同じです。
 * 
 * 【名称の設定】
 * モンスター名、モンスター画像以外で任意の名称を設定できます。
 * 無記入の場合はデーターベース及びこのプラグイン内で設定した名称が表示されます。
 * 
 * 【システム項目文字色の設定】
 * 名称の文字色を指定します。
 * 
 * 【パラメータ評価式の設定】
 * 評価式を記入します。オリジナルパラメータでは必ず記入してください。
 * モンスター名、モンスター画像、耐性属性、弱点属性、無効属性、耐性ステート、弱点ステート、無効ステート、ドロップアイテム、スティールアイテム以外でも有効ですが
 * 無記入の場合は自動的に参照されます。
 * 
 * 【記述欄設定】
 * 記述欄はプラグインパラメータ「記述欄タグ名」に任意の文字列を記入してください。一部文字列は使用できない場合も
 * ありますので注意してください。desc1と記入した場合はモンスターのメモ欄に<desc1:ああああ>と記入したとき、記述欄タグ名にdesc1と
 * 記入した項目に「ああああ」と表示されます。
 * 
 * 【X表示位置】
 * 表示する列を指定します。
 * 
 * 【Y表示位置】
 * 表示する行を指定します。
 * 
 * 【項目表示モード】
 * 項目を複数列に跨いで表示します。
 * 
 * 【システム項目横幅】
 * システム文字の表示幅を指定します。
 * 
 * 【情報未登録ステータス表示】
 * ステータス情報を登録していない（撃破してない又はアナライズをされていない）モンスターのステータスを隠します。
 * 
 * 【名称、モンスター名表示位置】
 * 名称、モンスター名の文字の位置を指定します。
 * 
 * 【画像の最大縦幅】
 * モンスターの表示サイズを指定した行分のサイズに調整します。デフォルトで８行で設定されていますので８行分の高さを超えたらサイズ調整します。
 * 
 * 【単位】
 * 追加能力値、特殊能力値、任意ステータス、盗めるアイテム、倒した数で接尾につける単位を設定します。
 * 
 * 【コンテンツ背景表示】
 * 能力値、追加能力値、特殊能力値、任意ステータス、ドロップアイテム、盗めるアイテム、使用スキル、経験値、獲得金額、倒した数、現在ターンで黒い背景（デフォルトの場合）を表示、表表示かを設定します。
 * 
 * アナライズの設定方法
 * 「アナライズ設定」の「アナライズスキル設定」から設定します。
 * 表示する内容は「アナライズ項目指定」から表示する内容を選択します。
 * 図鑑と同じ：ページ設定で設定した内容と同じ項目が表示されます。
 * 表示項目設定１:表示項目設定１で設定した項目が表示されます。
 * 表示項目設定２:表示項目設定２で設定した項目が表示されます。
 * 
 * アナライズスキル設定の失敗時のメッセージ
 * %1:ターゲット名
 * %2:使用者名
 * 「%2はアナライズに失敗した。」の時、スキル使用者がリードの場合は「リードはアナライズに失敗した。」と表示されます。
 * 
 * 
 * 対応プラグイン
 * ドロップアイテム追加
 * 盗みスキル
 * 
 * このプラグインは「共通処理」(NUUN_Base)プラグインVer.1.1.4以降が必要となります。
 * 
 * 操作方法
 * 上下（↑ ↓）キー：モンスター選択
 * 左右（← →）キー ：ページ切り替え
 * PgUp PgDnキー：モンスターページ送り
 * 
 * タッチ操作
 * 上下スワイプ：スクロール（弾くように勢いよくスワイプすることでページ送りと同等になります）
 * 
 * プラグインコマンド
 * モンスター図鑑オープン       図鑑を開きます。
 * 敵の情報表示　　　　　       敵の情報を開きます。
 * モンスター追加              モンスターを図鑑に追加します。ステータス情報は登録されません。
 * モンスター削除              モンスターを図鑑から削除します。
 * 図鑑完成                    図鑑を完成させます。
 * 図鑑初期化                  図鑑をクリア（全削除）させます。
 * モンスターステータス情報登録  モンスターのステータス情報を登録します。同時に「モンスター追加」の処理も行います。
 * モンスターステータス情報削除  モンスターをステータス情報を削除します。
 * モンスター撃破済み           モンスターを撃破済みにします。
 * 撃破数初期化                 モンスターの撃破数をリセットします。
 * モンスタードロップアイテム習得済み   モンスターのドロップアイテムを取得済みにさせます。
 * モンスタードロップアイテム未収得     モンスターのドロップアイテムを未収得にさせます。
 * モンスタースティールアイテム取得済み モンスターのスティールアイテムを取得済みにします。
 * モンスタースティールアイテム未取得   モンスターのスティールアイテムを未収得にさせます。
 * 総撃破数モンスター数          撃破したモンスター数を変数に格納します。
 * 遭遇数                      遭遇済みのモンスター数を変数に格納します。
 * 図鑑完成度                   現在の完成度を変数に格納します。
 * 総撃破数                    指定のモンスターの撃破数を変数に格納します。
 * 図鑑登録済み判定             指定のモンスターが図鑑登録済みが判定します。
 * ステータス情報登録済み判定    指定のモンスターのステータス情報登録済みか判定します。
 * アイテムドロップ済み判定      指定のアイテムがドロップ済みか判定します。
 * アイテム盗み済み判定         指定のアイテムが盗み済みか判定します。
 * 敵の使用スキル確認済み　　　　敵の使用スキルを確認済みにします。0で全て確認済みにします。
 * 敵の使用スキル未確認　　　　　敵の使用スキルを未確認にします。0で全て未確認にします。
 * 敵の属性耐性弱点確認済み　　　敵の属性耐性弱点を確認済みにします。0で全て確認済みにします。
 * 敵の属性耐性弱点未確認　　　　敵の属性耐性弱点を未確認にします。0で全て未確認にします。
 * 敵のステート耐性弱点確認済み　敵のステート耐性弱点を確認済みにします。0で全て確認済みにします。
 * 敵のステート耐性弱点未確認　　敵のステート耐性弱点を未確認にします。0で全て未確認にします。
 * 敵のデバフ耐性弱点確認済み　　敵のデバフ耐性弱点を確認済みにします。0で全て確認済みにします。
 * 敵のデバフ耐性弱点未確認　　　敵のデバフ耐性弱点を未確認にします。0で全て未確認にします。
 * 
 * オリジナルパラメータ参照変数
 * this._enemy　データベースのモンスターデータを取得します。
 * this._enemy.meta メタタグを取得します。
 * enemy Game_Enemyのデータを取得します。
 * 
 * このプラグインはYoji Ojima様及びヱビ様、TOMY (Kamesoft)様を参考にさせていただきました。
 * 
 * 仕様
 * ページ選択ウィンドウのカーソル移動は左右キーのみ動作します。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/7/25 Ver.2.7.2
 * 登録タイミングに登録なしを追加。
 * 2021/7/19 Ver.2.7.1
 * レーダーチャートの座標調整でマイナス側に設定できなかった問題を修正。
 * 2021/7/18 Ver.2.7.0
 * 属性耐性、ステート耐性をレーダーチャートで表示できる機能を追加。(要NUUN_RadarChartBase)
 * 2021/6/26 Ver.2.6.1
 * 変身時撃破をONにしても変身時の図鑑登録をしない機能を追加。
 * 2021/6/16 Ver.2.6.0
 * モンスターブックナンバーを表示する機能を追加。
 * 図鑑に登録されていないモンスターをリストから表示しない機能を追加。
 * 完成度ウィンドウに幾つかの項目を追加。
 * 2021/6/13 Ver.2.5.2
 * プラグインコマンドで敵の情報を表示できる機能を追加。
 * 2021/6/12 Ver.2.5.1
 * ウィンドウの端に謎の黒い縦線が出る問題を修正。
 * 2021/6/9 Ver.2.5.0
 * 遭遇していないカテゴリーをシークレット表示、非表示にする機能を追加。
 * アナライズ耐性を無視するスキルを設定できる機能を追加。
 * 2021/6/6 Ver.2.4.3
 * プラグインコマンドに図鑑登録済み判定とステータス情報登録済み判定を追加。
 * モンスターにアナライズ耐性を設定できる機能を追加。
 * TPBアクティブで敵を全滅させた直後に敵の情報を開くとエラーが出る問題を修正。
 * 2021/5/29 Ver.2.4.2
 * キャラチップを表示する機能を追加。
 * 色相が変化しているモンスターの次にサイドビューアクターが表示されると、色相が前のモンスターの色相で表示される問題を修正。
 * 2021/5/24 Ver.2.4.1
 * モンスター図鑑を開いた後に敵の情報を開くと特定の条件でエラーが起きる問題を修正。
 * 登録タイミングを遭遇時にして途中から出現するモンスターが出現せずに戦闘を終了すると図鑑に登録してしまう問題を修正。
 * 敵の情報でステータス情報登録をしていないモンスターの情報を隠す機能を追加。
 * 2021/5/22 Ver.2.4.0
 * 戦闘中の敵の情報を確認する機能を追加。
 * 2021/5/20 Ver.2.3.1
 * 各項目の背景（黒い背景）を表示する機能を追加。
 * システム文字の幅を指定できる機能を追加。
 * 単位を付けられる機能を追加。
 * 2021/5/15 Ver.2.3.0
 * 各ウィンドウのウィンドウスキンを個別に設定できる機能を追加。（要NUUN_Base Ver.1.1.4以降）
 * 2021/5/7 Ver.2.2.1
 * 変身前のモンスターを撃破済みにしてもステータス情報が反映されなかった問題を修正。
 * 2021/5/4 Ver.2.2.0
 * モンスター情報の各項目の座標、横幅を詳細に設定できるように変更。
 * ターン数を表示する機能を追加。
 * 2021/5/2 Ver.2.1.3
 * 図鑑、アナライズに表示されないモンスターを攻撃したときダメージが表示されない問題を修正。
 * 2021/5/1 Ver.2.1.2
 * プラグインコマンド「モンスター図鑑オープン」を戦闘中にも対応。
 * 図鑑登録、アナライズを使用しても表示しない機能を追加。
 * 2021/4/30 Ver.2.1.1
 * 登録タイミングを撃破済みにしてモンスターを撃破しても登録されない問題を修正。
 * 2021/4/30 Ver.2.1.0
 * 敵の使用スキルに未確認の使用スキルを隠す機能を追加。
 * 敵の属性、ステート、デバフに未確認のアイコンを隠す機能を追加。
 * 不要なプラグインパラメータを削除。
 * アイテム、スティール情報を確認済み及び未確認にする時に、１番目のアイテムを指定したときに全てのアイテムが対象になってしまう問題を修正。
 * 情報登録タイミングを遭遇時に設定するとエラーが出る問題を修正。
 * 2021/4/28 Ver.2.0.3
 * 敵の現在のTPを表示する機能を追加。
 * モンスター名にアイコンを表示する機能を追加。
 * ゲージの表示が現在のステータスを表示のみ表示以外に表示されていた問題を修正。
 * NRP_LoopCursorと併用するとエラーが出る問題を修正。
 * 2021/4/27 Ver.2.0.2
 * 未情報のアイテム、スキルの表示を未確認の索引名から別々に変更。
 * リスト型のプラグインパラメータで空白のまま図鑑を実行するとエラーが起きる問題を修正。
 * 2021/4/26 Ver.2.0.1
 * 表示できる項目に行動、耐性デバフ、弱点デバフを追加。
 * 弱点ステートに無効化ステートが表示してしまう問題を修正。
 * 2021/4/25 Ver.2.0.0
 * 敵のステータスを表示する項目を大幅にリニューアル。
 * ステータス情報の登録タイミングを指定できる機能を追加。
 * ステータス情報未登録時に耐性属性、弱点属性、無効属性、耐性ステート、弱点ステート、無敵ステートに未登録時の表示アイコンを指定できる機能を追加。
 * 背景画像の参照先を指定できるように変更。
 * 完成度を撃破数からステータス登録した数に変更。
 * プラグインコマンド「図鑑完成」を実行すると撃破数がリセットされる問題を修正。
 * 2021/4/19 Ver.1.4.5
 * 戦闘中でモンスターのカテゴリーをONにして図鑑を開いたときにスクロールしてしまう問題を修正。
 * 一部の不具合が再発していたので修正。
 * 2021/4/15 Ver.1.4.4
 * サイズによってはモンスターのサイズ調整がうまくいっていなかった問題を修正。
 * ボタン画像が表示されていない時に図鑑を開くとエラーが出る問題を修正。
 * 2021/4/13 Ver.1.4.3
 * 完成度ウィンドウを非表示にする機能が機能していなかった問題を修正。
 * 2021/4/12 Ver.1.4.2
 * 戦闘中で背景画像を表示できる機能を追加。
 * モンスターを登録した後、項目が未登録のままになる問題を修正。
 * 2021/4/11 Ver.1.4.1
 * 未登録のモンスターを選択した状態で図鑑を閉じた時にエラーが出る問題を修正。
 * 2021/4/11 Ver.1.4.0
 * サイドビューアクターを表示する機能を追加。
 * 2021/4/10 Ver.1.3.0
 * モンスターを種類毎に表示する機能を追加。
 * 2021/4/8 Ver.1.2.2
 * 耐性ステートで無効を反映した時にステート無効化が反映されない問題を修正。
 * 2021/4/1 Ver.1.2.1
 * 色相の異なるモンスターを連続で表示すると一瞬別の色相が反映されてしまう問題を修正。
 * 2021/3/31 Ver.1.2.0
 * ドロップアイテム、スティールアイテムのWideModeをtrueにしたときにアイテムの表示を２列にする機能を追加。
 * 特定のドロップアイテムの確率表示を表示しない機能を追加。
 * 2021/3/27 Ver.1.1.5
 * オリジナルパラメータが反映されていなかった問題を修正。
 * 2021/3/17 Ver.1.1.4
 * 背景画像の参照先が変更されていなかった問題を修正。
 * 2021/3/16 Ver.1.1.3
 * アナライズを使用し、ウィンドウを閉じるとき一瞬別のモンスターが表示される問題を修正。
 * アナライズを使用すると別のターゲットの情報が表示される問題を修正。
 * 2021/3/14 Ver.1.1.2
 * アナライズモードの時にバフ、デバフ以外の色指定がカラーコードになっていたので修正。
 * 2021/3/14 Ver.1.1.1
 * アナライズ設定で一部の設定が空欄の時エラーが出る問題を修正。
 * 2021/3/14 Ver.1.1.0
 * 一部プラグイン導入時、戦闘開始時にエラーが出る問題を修正。
 * アナライズでHP,MPの現在のステータス以外が取得できていなかった問題を修正。
 * アナライズでモンスターの現在のステータス表示が機能していなかった問題を修正。
 * 登録タイミングに「撃破時及びアナライズ時」を追加。
 * アナライズモードでコモンイベント経由で使用すると行動失敗時でも画面が開いてしまう問題があったため、メモ欄での指定に変更。
 * アナライズでバフ、デバフ時ステータスの文字色を指定できる機能を追加。
 * 背景画像の指定先フォルダーを変更。
 * 2021/3/10 Ver.1.0.11
 * 新規に登録されたモンスター名の文字色を付ける機能を追加。
 * 2021/3/6 Ver.1.0.10
 * タッチUIがOFFの時にウィンドウの表示範囲を上に詰める機能を追加。
 * 2021/2/28 Ver.1.0.9
 * 背景画像が反映されていなかった問題を修正。
 * 2021/2/24 Ver.1.0.8
 * バトルリザルト中にモンスター図鑑を閉じるように修正。
 * 2021/2/22 Ver.1.0.7
 * ロード後に図鑑を開いてドロップアイテムのあるページを表示するとエラーが出る問題を修正。
 * 2021/2/18 Ver.1.0.6
 * 戦闘中のモンスター図鑑の表示スイッチをメニューコマンドと別に変更。
 * プラグインコマンドに「モンスターを撃破済みにする」を追加。
 * 2021/2/16 Ver.1.0.5
 * Scene_Base.prototype.isBottomHelpMode、Scene_Base.prototype.isBottomButtonModeで設定の反映するように修正。
 * 2021/2/15 Ver.1.0.4
 * PageUp・PageDownキーでモンスターリストをページ送り出来る仕様に変更。なおモンスター情報ページの切り替えは左右（← →）キーのみになります。
 * ターン制の時に図鑑を開いたとき、裏でアクションが進行してしまう問題を修正。
 * アナライズモード以外で開くとHP,MPゲージが表示される問題を修正。
 * 2021/2/14 Ver.1.0.3
 * 戦闘中でアナライズを使用中PageUp・PageDownキーを押した後操作ができなくなる問題を修正。
 * 図鑑の登録タイミングが「撃破時」に設定している時にアナライズを使用した際、画面が空白になる問題を修正。
 * プラグインコマンドで「モンスター削除」「撃破数」「図鑑完成度」を実行するとエラーが出る問題を修正。
 * プラグインコマンドで「モンスター撃破数リセット」「遭遇数」「総撃破数」を実行しても変数が変わらない問題を修正。
 * 「モンスター撃破数リセット」が「図鑑完成度」と表示されていた問題を修正。
 * 2021/2/14 Ver.1.0.2
 * 特定の条件下で図鑑を開きドロップアイテム、スティールアイテムのあるページを開くとエラーが出る問題を修正。
 * 2021/2/14 Ver.1.0.1
 * アナライズモードをオープンした際の他のウィンドウの処理を変更。
 * 2021/2/7 Ver.1.0.0
 * 初版
 * 
 * @command EnemyBookOpen
 * @desc モンスター図鑑を開きます。
 * @text モンスター図鑑オープン
 * 
 * @command EnemyInfoOpen
 * @desc 敵の情報を開きます。
 * @text 敵の情報表示
 * 
 * @command EnemyBookAdd
 * @desc モンスターを図鑑に追加します。ステータス情報は登録されません。
 * @text モンスター追加
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookRemove
 * @desc モンスターを図鑑から削除します。
 * @text モンスター削除
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookStatusAdd
 * @desc モンスターのステータス情報を登録します。「モンスター追加」の処理も行います。
 * @text モンスターステータス情報登録
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookStatusRemove
 * @desc モンスターのステータス情報を削除します。
 * @text モンスターステータス情報削除
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookComplete
 * @desc 図鑑を完成させます。
 * @text 図鑑完成
 * 
 * @command EnemyBookClear
 * @desc 図鑑をクリア（消去）します。
 * @text 図鑑初期化
 * 
 * @command EnemyBookAddDefeat
 * @desc モンスターを撃破済みにします。
 * @text モンスター撃破済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 *  
 * @command EnemyBookRemoveDefeat
 * @desc モンスターの撃破数をリセットします。(0で全てのモンスターの撃破数をリセットします)
 * @text 撃破数初期化
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookGetDropItem
 * @desc モンスターのドロップアイテムを取得済みにします。
 * @text モンスタードロップアイテム習得済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg dropListId
 * @type number
 * @default 0
 * @text ドロップアイテムリストID
 * @desc ドロップアイテムリストIDを指定します。（0ですべて取得済みにします）
 * 
 * @command EnemyBookRemoveDropItem
 * @desc モンスターのドロップアイテムを未収得にします。
 * @text モンスタードロップアイテム未収得
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg dropListId
 * @type number
 * @default 0
 * @text ドロップアイテムリストID
 * @desc ドロップアイテムリストIDを指定します。（0ですべて未取得済みにします）
 * 
 * @command EnemyBookGetStealItem
 * @desc モンスターのスティールアイテムを取得済みにします。
 * @text モンスタースティールアイテム取得済み
 *
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg stealListId
 * @type number
 * @default 0
 * @text スティールアイテムリストID
 * @desc スティールアイテムリストIDを指定します。（0ですべて取得済みにします）
 * 
 * @command EnemyBookRemoveStealItem
 * @desc モンスターのスティールアイテムを未取得にします。
 * @text モンスタースティールアイテム未取得
 * @type 0
 * @default 0
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg stealListId
 * @type number
 * @default 0
 * @text スティールアイテムリストID
 * @desc スティールアイテムリストIDを指定します。（0ですべて未取得済みにします）
 * 
 * @command EnemyBookDefeatEnemy
 * @desc 撃破済みのモンスター数を格納します。
 * @text 総撃破数モンスター数
 * 
 * @arg DefeatEnemy
 * @type variable
 * @default 0
 * @text 変数
 * @desc 撃破済みモンスター数を代入する変数を指定します。
 * 
 * @command EnemyBookEncounteredEnemy
 * @desc 遭遇したモンスター数を格納します。
 * @text 遭遇数
 * 
 * @arg EncounteredEnemy
 * @type variable
 * @default 0
 * @text 変数
 * @desc 遭遇したモンスター数を代入する変数を指定します。
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
 * @command EnemyBookRegistration
 * @desc モンスターが図鑑に登録済みか判定します。
 * @text 図鑑登録済み判定
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text モンスター
 * @desc モンスターを指定します。
 * 
 * @arg registrationSwitch
 * @type switch
 * @default 0
 * @text スイッチ
 * @desc モンスターが図鑑に登録済みかを代入するスイッチを指定します。
 * 
 * @command EnemyBookStatusRegistration
 * @desc モンスターのステータス情報が図鑑に登録済みか判定します。
 * @text ステータス情報登録済み判定
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text モンスター
 * @desc モンスターを指定します。
 * 
 * @arg statusRegistrationSwitch
 * @type switch
 * @default 0
 * @text スイッチ
 * @desc モンスターが図鑑に登録済みかを代入するスイッチを指定します。
 * 
 * @command EnemyBookDefeatEnemySum
 * @desc モンスターの撃破数を格納します。
 * @text 総撃破数
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text モンスター
 * @desc モンスターを指定します。
 * 
 * @arg DefeatEnemySum
 * @type variable
 * @default 0
 * @text 変数
 * @desc モンスターの撃破数を代入する変数を指定します。
 * 
 * @command DorpItemAcquired
 * @desc 指定のアイテムがドロップ済みか判定します。
 * @text アイテムドロップ済み判定
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
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
 * @text アイテム盗み済み判定
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
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
 * @command EnemyBookActionAdd
 * @desc モンスターの未確認の使用スキルを確認済みにします。
 * @text 未確認使用スキル確認済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg actionId
 * @type number
 * @default 0
 * @text 行動パターンID
 * @desc 行動パターンID（一番上が１番）（0ですべて）
 * 
 * @command EnemyBookActionRemove
 * @desc モンスターの確認済みの使用スキルを未確認にします。
 * @text 確認済み使用スキル未確認
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg actionId
 * @type number
 * @default 0
 * @text 行動パターンID
 * @desc 行動パターンID（一番上が１番）（0ですべて）
 * 
 * @command EnemyBookElementAdd
 * @desc モンスターの未確認の属性耐性弱点情報を確認済みにします。
 * @text 未確認属性耐性弱点情報確認済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg elementId
 * @type number
 * @default 0
 * @text 属性ID
 * @desc 属性ID（データベースのタイプタグの属性）（0ですべて）
 * 
 * @command EnemyBookElementRemove
 * @desc モンスターの確認済みの属性耐性弱点情報を未確認にします。
 * @text 確認済み属性耐性弱点情報未確認
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg elementId
 * @type number
 * @default 0
 * @text 属性ID
 * @desc 属性ID（データベースのタイプタグの属性）（0ですべて）
 * 
 * @command EnemyBookStateAdd
 * @desc モンスターの未確認のステート耐性弱点情報を確認済みにします。
 * @text 未確認ステート耐性弱点情報確認済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg stateId
 * @type state
 * @default 0
 * @text ステートID
 * @desc ステートID（データベースのタイプタグの属性）（0ですべて）
 * 
 * @command EnemyBookStateRemove
 * @desc モンスターの確認済みのステート耐性弱点情報を未確認にします。
 * @text 確認済みステート耐性弱点情報未確認
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg stateId
 * @type state
 * @default 0
 * @text ステートID
 * @desc ステートID（データベースのタイプタグの属性）（0（なし）ですべて）
 * 
 * @command EnemyBookDebuffAdd
 * @desc モンスターの未確認のデバフ耐性弱点情報を確認済みにします。
 * @text 未確認デバフ耐性弱点情報確認済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg debuffId
 * @text デバフ対象
 * @desc 確認済みにするデバフ対象を指定します。
 * @type select
 * @option ＨＰ
 * @value 0
 * @option ＭＰ
 * @value 1
 * @option 攻撃力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 運
 * @value 7
 * @option 全て
 * @value -1
 * @default -1
 * 
 * @command EnemyBookDebuffRemove
 * @desc モンスターの確認済みのデバフ耐性弱点情報を未確認にします。
 * @text 確認済みデバフ耐性弱点情報未確認
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg debuffId
 * @text デバフ対象
 * @desc 確認済みにするデバフ対象を指定します。
 * @type select
 * @option ＨＰ
 * @value 0
 * @option ＭＰ
 * @value 1
 * @option 攻撃力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 運
 * @value 7
 * @option 全て
 * @value -1
 * @default -1
 * 
 * パラメータ
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param WindowMode
 * @desc モンスター選択画面の表示位置を指定します。
 * @text モンスター選択画面位置
 * @type select
 * @option 左側表示
 * @value 0
 * @option 右側表示
 * @value 1
 * @default 0
 * @parent BasicSetting
 * 
 * @param NumberType
 * @text モンスターのナンバー表示
 * @desc モンスターのナンバーを表示します。
 * @type select
 * @option モンスターNoの表示なし
 * @value 0
 * @option モンスターNoを表示する。
 * @value 1
 * @option モンスターNoを表示し、0埋めをする。
 * @value 2
 * @desc モンスターのNo表示
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
 * @option 撃破時またはアナライズ時
 * @value 3
 * @option 登録なし
 * @value 10
 * @desc 図鑑の登録タイミング
 * @default 0
 * @parent BasicSetting
 * 
 * @param RegistrationStatusTiming
 * @text ステータス情報登録タイミング
 * @desc ステータス情報登録タイミング。
 * @type select
 * @option 遭遇時
 * @value 0
 * @option 撃破時
 * @value 1
 * @option アナライズ時
 * @value 2
 * @option 撃破時またはアナライズ時
 * @value 3
 * @option 登録なし
 * @value 10
 * @default 1
 * @parent BasicSetting
 * 
 * @param UnknownVisible
 * @desc 未確認のモンスターをリストに表示しません。
 * @text 未確認モンスター表示
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param UnknownData
 * @desc 未確認の索引名です。？1文字だけ入れると名前の文字数に応じて？に置き換えられます。
 * @text 未確認エネミー及びアイテム名
 * @type string
 * @default ？
 * @parent BasicSetting
 * 
 * @param UnknownStatus
 * @desc ステータス情報未登録時のステータス表示名
 * @text ステータス情報未登録時ステータス表示名
 * @type string
 * @default ？？？
 * @parent BasicSetting
 * 
 * @param UnknownItems
 * @desc ステータス情報未登録時のアイテム、スキル表示名
 * @text ステータス情報未登録時アイテム、スキル表示名
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
 * @param NoTouchUIWindow
 * @type boolean
 * @default false
 * @text 戦闘時タッチUI OFF時ウィンドウ上詰め
 * @desc 戦闘時タッチUIがOFFの時ウィンドウを上に詰めます。
 * @parent BasicSetting
 * 
 * @param MonsterSetting
 * @text モンスター設定
 * @default ------------------------------
 * 
 * @param UnknownEnemyIcons
 * @desc 未登録のモンスターアイコン。
 * @text 未登録モンスターアイコン
 * @type number
 * @default 0
 * @min 0
 * @parent MonsterSetting
 * 
 * @param SVEnemyMirror
 * @type boolean
 * @default true
 * @text サイドビューバトラー反転
 * @desc サイドビューバトラーを表示時、画像を反転させる。
 * @parent MonsterSetting
 * 
 * @param Category
 * @text カテゴリー設定
 * @default ------------------------------
 * 
 * @param CategoryOn
 * @type boolean
 * @default false
 * @text モンスターカテゴリー表示
 * @desc モンスターをカテゴリー毎に表示する。
 * @parent Category
 * 
 * @param EnemyBookCategory
 * @desc モンスターカテゴリーの設定をします。
 * @text モンスターカテゴリー設定
 * @type struct<BookCategoryList>[]
 * @default ["{\"CategoryName\":\"全て\",\"CategoryKey\":\"all\"}","{\"CategoryName\":\"ボス\",\"CategoryKey\":\"boss\"}"]
 * @parent Category
 * 
 * @param CategoryVisibleType
 * @text 未遭遇カテゴリー表示
 * @desc １体も遭遇してない場合のカテゴリー表示。
 * @type select
 * @option 表示
 * @value 0
 * @option 非表示
 * @value 1
 * @option 別の文字列で隠す
 * @value 2
 * @default 0
 * @parent Category
 * 
 * @param BackGround
 * @text 背景、ウィンドウスキン設定
 * @default ------------------------------
 * 
 * @param BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file[]
 * @dir img/
 * @default []
 * @parent BackGround
 * 
 * @param AnalyzeBackGroundImg
 * @desc アナライズ用の背景画像ファイル名を指定します。
 * @text アナライズ用背景画像
 * @type file[]
 * @dir img/
 * @default []
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
 * @param PercentWindowsSkin
 * @desc 完成度のウィンドウスキンを指定します。
 * @text 完成度ウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent BackGround
 * 
 * @param CategoryWindowsSkin
 * @desc カテゴリー画面のウィンドウスキンを指定します。
 * @text カテゴリーウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent BackGround
 * 
 * @param CategoryNameWindowsSkin
 * @desc カテゴリー名画面のウィンドウスキンを指定します。
 * @text カテゴリー名ウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent BackGround
 * 
 * @param IndexWindowsSkin
 * @desc モンスター一覧画面のウィンドウスキンを指定します。
 * @text モンスター一覧ウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent BackGround
 * 
 * @param InfoIndexWindowsSkin
 * @desc 敵の情報画面のウィンドウスキンを指定します。
 * @text 敵の情報ウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent BackGround
 * 
 * @param PageWindowsSkin
 * @desc ページ画面のウィンドウスキンを指定します。
 * @text ページウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent BackGround
 * 
 * @param ContentWindowsSkin
 * @desc モンスター情報画面のウィンドウスキンを指定します。
 * @text ウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent BackGround
 * 
 * @param PercentWindow
 * @text 完成度ウィンドウ設定
 * @default ------------------------------
 * 
 * @param PercentWindowVisible
 * @type boolean
 * @default true
 * @text 完成度ウィンドウ表示
 * @desc 完成度ウィンドウを表示する。
 * @parent PercentWindow
 * 
 * @param PercentContent
 * @desc 完成度ウィンドウの表示項目を設定をします。
 * @text 表示項目設定
 * @type struct<PercentContentList>[]
 * @default ["{\"ContentName\":\"完成度\",\"ContentDate\":\"0\"}","{\"ContentName\":\"遭遇済み\",\"ContentDate\":\"1\"}","{\"ContentName\":\"撃破済み\",\"ContentDate\":\"2\"}"]
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
 * @default ------------------------------
 * 
 * @param ShowCommand
 * @desc メニューコマンドにエネミー図鑑を追加します。
 * @text メニューコマンド表示
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
 * @param ShowBattleCommand
 * @desc 戦闘中のパーティコマンドにエネミー図鑑を追加します。
 * @text パーティコマンド表示
 * @type boolean
 * @default false
 * @parent CommandData
 * 
 * @param enemyBookBattleSwitch
 * @desc 戦闘中に表示させるフラグスイッチID
 * @text パーティコマンド表示スイッチ
 * @type switch
 * @default 0
 * @parent CommandData
 * 
 * @param CommandName
 * @desc コマンドの名称。
 * @text コマンドの表示名
 * @type string
 * @default モンスター図鑑
 * @parent CommandData
 * 
 * @param ShowEnemyInfoCommand
 * @desc 戦闘中のパーティコマンドに敵の情報を追加します。
 * @text 敵の情報パーティコマンド表示
 * @type boolean
 * @default false
 * @parent CommandData
 * 
 * @param enemyBookInfoSwitch
 * @desc 敵の情報を戦闘中に表示させるフラグスイッチID
 * @text 敵の情報パーティコマンド表示スイッチ
 * @type switch
 * @default 0
 * @parent CommandData
 * 
 * @param EnemyInfoCommandName
 * @desc 敵の情報コマンドの名称。
 * @text 敵の情報コマンド表示名
 * @type string
 * @default 敵の情報
 * @parent CommandData
 * 
 * @param PageData
 * @text 表示ページ設定
 * @default ------------------------------
 * 
 * @param PageSetting
 * @desc ページ設定。
 * @text ページ設定
 * @type struct<PageSettingData>[]
 * @default ["{\"ListDateSetting\":\"1\",\"PageCategoryName\":\"基本情報\"}","{\"ListDateSetting\":\"2\",\"PageCategoryName\":\"属性、ステート\"}","{\"ListDateSetting\":\"3\",\"PageCategoryName\":\"ドロップアイテム\"}","{\"ListDateSetting\":\"4\",\"PageCategoryName\":\"説明\"}"]
 * @parent PageData
 * 
 * @param PageCols
 * @desc ページの最大表示列。
 * @text ページ最大表示列
 * @type number
 * @default 4
 * @min 1
 * @parent PageData
 * 
 * @param ContentCols
 * @text モンスター情報項目列数
 * @desc モンスター情報の項目列数。
 * @type select
 * @option ２列
 * @value 2
 * @option ３列
 * @value 3
 * @default 2
 * @parent PageData
 * 
 * @param AnalyzeSetting
 * @text アナライズ設定
 * @default ------------------------------
 * 
 * @param AnalyzeSkillMode
 * @desc アナライズスキルの設定をします。0:図鑑設定と同じ　1:AnalyzePageList1　2:AnalyzePageList2　3以上は反映されません。
 * @text アナライズスキル設定
 * @type struct<AnalyzeSkill>[]
 * @default ["{\"PageCols\":\"4\",\"Mode\":\"0\",\"StatusGaugeVisible\":\"true\",\"EnemyCurrentStatus\":\"true\",\"AnalyzeMissMessage\":\"%2はアナライズに失敗した。\",\"BuffColor\":\"0\",\"DebuffColor\":\"0\"}","{\"PageCols\":\"1\",\"Mode\":\"1\",\"StatusGaugeVisible\":\"true\",\"EnemyCurrentStatus\":\"true\",\"AnalyzeMissMessage\":\"%2はアナライズに失敗した。\",\"BuffColor\":\"0\",\"DebuffColor\":\"0\"}"]
 * @parent AnalyzeSetting
 * 
 * @param AnalyzePageList1
 * @desc 表示する項目設定。
 * @text 表示項目設定１
 * @type struct<PageSettingData>[]
 * @default ["{\"ListDateSetting\":\"11\",\"PageCategoryName\":\"\"}"]
 * @parent AnalyzeSetting
 * 
 * @param AnalyzePageList2
 * @desc 表示する項目設定。
 * @text 表示項目設定２
 * @type struct<PageSettingData>[]
 * @default []
 * @parent AnalyzeSetting
 * 
 * @param AnalyzePageList3
 * @desc 表示する項目設定。
 * @text 表示項目設定３
 * @type struct<PageSettingData>[]
 * @default []
 * @parent AnalyzeSetting
 * 
 * @param HPgaugeWidth
 * @desc アナライズ時のHPゲージ横幅
 * @text アナライズ時HPゲージ横幅
 * @type number
 * @default 128
 * @max 999
 * @min 0
 * @parent AnalyzeSetting
 * 
 * @param MPgaugeWidth
 * @desc アナライズ時のMPゲージ横幅
 * @text アナライズ時MPゲージ横幅
 * @type number
 * @default 128
 * @max 999
 * @min 0
 * @parent AnalyzeSetting
 * 
 * @param TPgaugeWidth
 * @desc アナライズ時のTPゲージ横幅
 * @text アナライズ時TPゲージ横幅
 * @type number
 * @default 128
 * @max 999
 * @min 0
 * @parent AnalyzeSetting
 * 
 * @param EnemyInfoSetting
 * @text 敵の情報設定
 * @default ------------------------------
 * 
 * @param InfoMode
 * @desc 表示する敵の情報データを指定します。
 * @text 情報データ指定
 * @type select
 * @option 図鑑表示と同じ
 * @value 0
 * @option 独自に設定
 * @value 1
 * @default 0
 * @parent EnemyInfoSetting
 * 
 * @param InfoPageSetting
 * @desc ページ設定。（情報データが独自に設定(1)に設定している時）
 * @text ページ設定
 * @type struct<PageSettingData>[]
 * @default ["{\"ListDateSetting\":\"1\",\"PageCategoryName\":\"基本情報\"}","{\"ListDateSetting\":\"2\",\"PageCategoryName\":\"属性、ステート\"}","{\"ListDateSetting\":\"3\",\"PageCategoryName\":\"ドロップアイテム\"}","{\"ListDateSetting\":\"4\",\"PageCategoryName\":\"説明\"}"]
 * @parent EnemyInfoSetting
 * 
 * @param InfoPageCols
 * @desc ページの最大表示列。
 * @text ページ最大表示列
 * @type number
 * @default 4
 * @min 1
 * @parent EnemyInfoSetting
 * 
 * @param InfoContentCols
 * @text モンスター情報項目列数
 * @desc モンスター情報の項目列数。
 * @type select
 * @option ２列
 * @value 2
 * @option ３列
 * @value 3
 * @default 2
 * @parent EnemyInfoSetting
 * 
 * @param InfoStatusGaugeVisible
 * @type boolean
 * @default true
 * @text ゲージを表示
 * @desc HP、MPのゲージを表示します。
 * @parent EnemyInfoSetting
 * 
 * @param InfoEnemyCurrentStatus
 * @type boolean
 * @default true
 * @text エネミーの現在ステータス表示
 * @desc エネミーの現在のステータスを表示します。
 * @parent EnemyInfoSetting
 * 
 * @param InfoBuffColor
 * @desc バフ時の文字色。
 * @text バフ時文字色
 * @type number
 * @default 0
 * @max 999999
 * @parent EnemyInfoSetting
 * 
 * @param InfoDebuffColor
 * @desc デバフ時の文字色。
 * @text デバフ時文字色
 * @type number
 * @default 0
 * @max 999999
 * @parent EnemyInfoSetting
 * 
 * @param InfoMaskMode
 * @desc 情報開示してない場合はステータスを隠す。表示リストの各項目で設定した「情報未登録ステータス表」を反映。
 * @text 情報未登録ステータス表示
 * @type boolean
 * @default false
 * @parent EnemyInfoSetting
 * 
 * @param ListData
 * @text 表示項目設定
 * @default ------------------------------
 * 
 * @param ListData1_10
 * @text 表示項目設定1-10
 * @default ------------------------------
 * @parent ListData
 * 
 * @param PageList1
 * @desc 表示するリスト。
 * @text 表示リスト１
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＨＰ\",\"DateSelect\":\"1\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＭＰ\",\"DateSelect\":\"2\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"3\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"4\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"5\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"6\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"7\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"8\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"30\",\"DetaEval\":\"\",\"NameColor\":\"27\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"31\",\"DetaEval\":\"\",\"NameColor\":\"27\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"32\",\"DetaEval\":\"\",\"NameColor\":\"27\",\"X_Position\":\"2\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}"]
 * @parent ListData1_10
 * 
 * @param PageList2
 * @desc 表示するリスト。
 * @text 表示リスト２
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＨＰ\",\"DateSelect\":\"1\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＭＰ\",\"DateSelect\":\"2\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"3\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"4\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"5\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"6\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"7\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"8\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"40\",\"DetaEval\":\"\",\"NameColor\":\"2\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"41\",\"DetaEval\":\"\",\"NameColor\":\"2\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"45\",\"DetaEval\":\"\",\"NameColor\":\"3\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"46\",\"DetaEval\":\"\",\"NameColor\":\"3\",\"X_Position\":\"2\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}"]
 * @parent ListData1_10
 * 
 * @param PageList3
 * @desc 表示するリスト。
 * @text 表示リスト３
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＨＰ\",\"DateSelect\":\"1\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＭＰ\",\"DateSelect\":\"2\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"3\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"4\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"5\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"6\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"7\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"8\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"60\",\"DetaEval\":\"\",\"NameColor\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}"]
 * @parent ListData1_10
 * 
 * @param PageList4
 * @desc 表示するリスト。
 * @text 表示リスト４
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＨＰ\",\"DateSelect\":\"1\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＭＰ\",\"DateSelect\":\"2\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"3\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"4\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"5\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"6\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"7\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"8\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"70\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"desc\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}"]
 * @parent ListData1_10
 * 
 * @param PageList5
 * @desc 表示するリスト。
 * @text 表示リスト５
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList6
 * @desc 表示するリスト。
 * @text 表示リスト６
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList7
 * @desc 表示するリスト。
 * @text 表示リスト７
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList8
 * @desc 表示するリスト。
 * @text 表示リスト８
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList9
 * @desc 表示するリスト。
 * @text 表示リスト９
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList10
 * @desc 表示するリスト。
 * @text 表示リスト１０
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param ListData11_20
 * @text 表示項目設定11-20
 * @default ------------------------------
 * @parent ListData
 * 
 * @param PageList11
 * @desc 表示するリスト。
 * @text 表示リスト１１
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"WideMode\":\"2\",\"MaskMode\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"1\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"2\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"3\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"4\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"11\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"5\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"6\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"12\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"7\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"13\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"8\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"13\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}"]
 * @parent ListData11_20
 * 
 * @param PageList12
 * @desc 表示するリスト。
 * @text 表示リスト１２
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList13
 * @desc 表示するリスト。
 * @text 表示リスト１３
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList14
 * @desc 表示するリスト。
 * @text 表示リスト１４
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList15
 * @desc 表示するリスト。
 * @text 表示リスト１５
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList16
 * @desc 表示するリスト。
 * @text 表示リスト１６
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList17
 * @desc 表示するリスト。
 * @text 表示リスト１７
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList18
 * @desc 表示するリスト。
 * @text 表示リスト１８
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList19
 * @desc 表示するリスト。
 * @text 表示リスト１９
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList20
 * @desc 表示するリスト。
 * @text 表示リスト２０
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param DropItemData
 * @text ドロップアイテム設定
 * @default ------------------------------
 * 
 * @param DropItemProbabilityShow
 * @desc 確率を表示する。
 * @text 確率表示
 * @type boolean
 * @default true
 * @parent DropItemData
 * 
 * @param ShowDropItemName
 * @desc 未確認のドロップアイテムを隠す。(ステータス情報登録をしてもドロップアイテムを確認するまでは表示されません)
 * @text 未確認ドロップアイテム名
 * @type boolean
 * @default false
 * @parent DropItemData
 * 
 * @param DropItemMultiCol
 * @desc ワイドモード２列表示以上時の複数列表示。
 * @text ワイドモード時の複数列表示
 * @type boolean
 * @default false
 * @parent DropItemData
 * 
 * @param StealItemData
 * @text スティールアイテム設定
 * @default ------------------------------
 * 
 * @param StealItemProbabilityShow
 * @desc 確率を表示する。
 * @text 確率表示
 * @type boolean
 * @default true
 * @parent StealItemData
 * 
 * @param ShowStealItemName
 * @desc 未確認のスティールアイテムを隠す。(ステータス情報登録をしてもスティールアイテムを確認するまでは表示されません)
 * @text 未確認スティールアイテム表示
 * @type boolean
 * @default false
 * @parent StealItemData
 * 
 * @param StealItem2Col
 * @desc ワイドモード２列表示以上時の複数列表示。
 * @text ワイドモード時の複数列表示
 * @type boolean
 * @default false
 * @parent StealItemData
 * 
 * @param ActionData
 * @text 敵の使用スキル設定
 * @default ------------------------------
 * 
 * @param ShowActionName
 * @desc 未確認の使用スキルを隠す。(ステータス情報登録をしてもスティールアイテム使用スキルを確認するまでは表示されません)
 * @text 未確認使用スキル表示
 * @type boolean
 * @default false
 * @parent ActionData
 * 
 * @param ActionMaxItems
 * @desc 表示する最大項目数。(0で制限なし)
 * @text 最大項目数
 * @type number
 * @default 0
 * @min 0
 * @parent ActionData
 * 
 * @param ActionMultiCol
 * @desc ワイドモード２列表示以上時の複数列表示。
 * @text ワイドモード時の複数列表示
 * @type boolean
 * @default false
 * @parent ActionData
 * 
 * @param ResistWeakElementData
 * @text 属性耐性弱点設定
 * @default ------------------------------
 * 
 * @param ElementList
 * @desc 表示する属性。
 * @text 表示属性
 * @type struct<ElementData>[]
 * @default ["{\"ElementNo\":\"1\",\"ElementIconId\":\"76\"}","{\"ElementNo\":\"2\",\"ElementIconId\":\"64\"}","{\"ElementNo\":\"3\",\"ElementIconId\":\"65\"}","{\"ElementNo\":\"4\",\"ElementIconId\":\"66\"}","{\"ElementNo\":\"5\",\"ElementIconId\":\"67\"}","{\"ElementNo\":\"6\",\"ElementIconId\":\"68\"}","{\"ElementNo\":\"7\",\"ElementIconId\":\"69\"}","{\"ElementNo\":\"8\",\"ElementIconId\":\"70\"}","{\"ElementNo\":\"9\",\"ElementIconId\":\"71\"}"]
 * @parent ResistWeakElementData
 * 
 * @param ShowElementsIcon
 * @desc 耐性弱点未確認の属性を隠す。(ステータス情報登録をしても属性耐性弱点を確認するまでは表示されません)
 * @text 未確認属性を隠す
 * @type boolean
 * @default false
 * @parent ResistWeakElementData
 * 
 * @param ResistNoEffectElement
 * @desc 効きにくい属性に無効を反映させるか。
 * @text 効きにくい属性に無効反映
 * @type boolean
 * @default true
 * @parent ResistWeakElementData
 * 
 * @param ElementUnknownIconId
 * @desc ステータス情報未登録時に表示する属性アイコンのIDを指定します。
 * @text ステータス情報未登録時属性アイコンID
 * @type number
 * @default 0
 * @parent ResistWeakElementData
 * 
 * @param ElementRadarChart
 * @text 属性耐性レーダーチャート
 * @default ------------------------------
 * @parent ResistWeakElementData
 * 
 * @param ElementRadarChartRadius
 * @desc レーダチャートの半径。
 * @text レーダチャート半径
 * @type number
 * @default 100
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartFramecolor
 * @desc レーダチャートの枠の色を設定します。
 * @text レーダチャート枠色
 * @type number
 * @default 15
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartLineColor
 * @desc レーダチャートの線の色を設定します。
 * @text レーダチャート線色
 * @type number
 * @default 15
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartMainColor1
 * @desc レーダチャートの中心の背景色を設定します。
 * @text レーダチャート中心背景色
 * @type number
 * @default 3
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartMainColor2
 * @desc レーダチャートの外側背景色を設定します。
 * @text レーダチャート外側背景色
 * @type number
 * @default 3
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartX
 * @desc レーダチャートのX座標（相対）。
 * @text レーダチャートX座標
 * @type number
 * @min -9999
 * @default 48
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartY
 * @desc レーダチャートのY座標（相対）。
 * @text レーダチャートY座標
 * @type number
 * @min -9999
 * @default 48
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChart_FontSize
 * @desc フォントサイズ。（メインフォントから）
 * @text フォントサイズ
 * @type number
 * @default -12
 * @min -9999
 * @parent ElementRadarChart
 * 
 * @param ResistWeakStateData
 * @text ステート耐性弱点設定
 * @default ------------------------------
 * 
 * @param StateList
 * @desc 表示するステート。
 * @text 表示ステート
 * @type struct<StateData>[]
 * @default ["{\"StateId\":\"1\"}","{\"StateId\":\"4\"}","{\"StateId\":\"5\"}","{\"StateId\":\"6\"}","{\"StateId\":\"7\"}","{\"StateId\":\"8\"}","{\"StateId\":\"9\"}","{\"StateId\":\"10\"}","{\"StateId\":\"12\"}","{\"StateId\":\"13\"}"]
 * @parent ResistWeakStateData
 * 
 * @param ShowStateIcon
 * @desc 耐性弱点未確認のステートを隠す。(ステータス情報登録をしてもステート耐性弱点を確認するまでは表示されません)
 * @text 未確認ステートを隠す
 * @type boolean
 * @default false
 * @parent ResistWeakStateData
 * 
 * @param NormalWeakState
 * @desc 効きやすいステート対象を有効度100%以上から反映させるか。
 * @text 効きやすい属性有効度100%反映
 * @type boolean
 * @default true
 * @parent ResistWeakStateData
 * 
 * @param ResistNoEffectState
 * @desc 効きにくいステートに無効を反映させるか。
 * @text 効きにくいステートに無効反映
 * @type boolean
 * @default true
 * @parent ResistWeakStateData
 * 
 * @param StateUnknownIconId
 * @desc ステータス情報未登録時に表示するステートアイコンのIDを指定します。
 * @text ステータス情報未登録時ステートアイコンID
 * @type number
 * @default 0
 * @parent ResistWeakStateData
 * 
 * @param StateRadarChart
 * @text ステート耐性レーダーチャート
 * @default ------------------------------
 * @parent ResistWeakStateData
 * 
 * @param StateRadarChartRadius
 * @desc レーダチャートの半径。
 * @text レーダチャート半径
 * @type number
 * @default 100
 * @parent StateRadarChart
 * 
 * @param StateRadarChartFramecolor
 * @desc レーダチャートの枠の色を設定します。
 * @text レーダチャート枠色
 * @type number
 * @default 15
 * @parent StateRadarChart
 * 
 * @param StateRadarChartLineColor
 * @desc レーダチャートの線の色を設定します。
 * @text レーダチャート線色
 * @type number
 * @default 15
 * @parent StateRadarChart
 * 
 * @param StateRadarChartMainColor1
 * @desc レーダチャートの中心の背景色を設定します。
 * @text レーダチャート中心背景色
 * @type number
 * @default 3
 * @parent StateRadarChart
 * 
 * @param StateRadarChartMainColor2
 * @desc レーダチャートの外側背景色を設定します。
 * @text レーダチャート外側背景色
 * @type number
 * @default 3
 * @parent StateRadarChart
 * 
 * @param StateRadarChartX
 * @desc レーダチャートのX座標（相対）。
 * @text レーダチャートX座標
 * @type number
 * @min -9999
 * @default 48
 * @parent StateRadarChart
 * 
 * @param StateRadarChartY
 * @desc レーダチャートのY座標（相対）。
 * @text レーダチャートY座標
 * @min -9999
 * @type number
 * @default 48
 * @parent StateRadarChart
 * 
 * @param StateRadarChart_FontSize
 * @desc フォントサイズ。（メインフォントから）
 * @text フォントサイズ
 * @type number
 * @default -12
 * @min -9999
 * @parent StateRadarChart
 * 
 * @param RadarChartIcon
 * @desc ステートの表示をアイコンで表示する。OFFはステート名
 * @text アイコン表示
 * @type boolean
 * @default true
 * @parent StateRadarChart
 * 
 * @param ResistWeakDebuffData
 * @text デバフ耐性弱点設定
 * @default ------------------------------
 * 
 * @param DeBuffList
 * @desc 表示するデバフ。
 * @text 表示デバフ
 * @type struct<DebuffData>[]
 * @default ["{\"ParamId\":\"0\",\"DebuffIconId\":\"48\"}","{\"ParamId\":\"1\",\"DebuffIconId\":\"49\"}","{\"ParamId\":\"2\",\"DebuffIconId\":\"50\"}","{\"ParamId\":\"3\",\"DebuffIconId\":\"51\"}","{\"ParamId\":\"4\",\"DebuffIconId\":\"52\"}","{\"ParamId\":\"5\",\"DebuffIconId\":\"53\"}","{\"ParamId\":\"6\",\"DebuffIconId\":\"54\"}","{\"ParamId\":\"7\",\"DebuffIconId\":\"55\"}"]
 * @parent ResistWeakDebuffData
 * 
 * @param ShowDebuffIcon
 * @desc 耐性弱点未確認のステートデバフを隠す。(ステータス情報登録をしてもデバフ耐性弱点を確認するまでは表示されません)
 * @text 未確認デバフを隠す
 * @type boolean
 * @default false
 * @parent ResistWeakDebuffData
 * 
 * @param DeBuffUnknownIconId
 * @desc ステータス情報未登録時に表示するデバフアイコンのIDを指定します。
 * @text ステータス情報未登録時デバフアイコンID
 * @type number
 * @default 0
 * @parent ResistWeakDebuffData
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
/*~struct~DebuffData:
 * 
 * @param ParamId
 * @text デバフ対象
 * @desc 表示デバフを指定します。
 * @type select
 * @option ＨＰ
 * @value 0
 * @option ＭＰ
 * @value 1
 * @option 攻撃力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 運
 * @value 7
 * @default 0
 * 
 * @param DebuffIconId
 * @desc アイコンのIDを指定します。
 * @text アイコンID
 * @type number
 */
/*~struct~PageSettingData:
 * 
 * @param ListDateSetting
 * @desc 表示するリストを指定します。
 * @text 表示リスト指定
 * @type select
 * @option 表示リスト１
 * @value 1
 * @option 表示リスト２
 * @value 2
 * @option 表示リスト３
 * @value 3
 * @option 表示リスト４
 * @value 4
 * @option 表示リスト５
 * @value 5
 * @option 表示リスト６
 * @value 6
 * @option 表示リスト７
 * @value 7
 * @option 表示リスト８
 * @value 8
 * @option 表示リスト９
 * @value 9
 * @option 表示リスト１０
 * @value 10
 * @option 表示リスト１１
 * @value 11
 * @option 表示リスト１２
 * @value 12
 * @option 表示リスト１３
 * @value 13
 * @option 表示リスト１４
 * @value 14
 * @option 表示リスト１５
 * @value 15
 * @option 表示リスト１６
 * @value 16
 * @option 表示リスト１７
 * @value 17
 * @option 表示リスト１８
 * @value 18
 * @option 表示リスト１９
 * @value 19
 * @option 表示リスト２０
 * @value 20 
 * @default 1
 * 
 * @param PageCategoryName
 * @desc ページカテゴリーの名前を設定します。
 * @text ページカテゴリー名
 * @type string
 * @default
 *  
 */
/*~struct~PageListData:
 * 
 * @param BasicSetting
 * @text 基本設定
 * 
 * @param paramName
 * @desc 表示する項目の名称を設定します。
 * @text 名称
 * @type string
 * @default
 * @parent BasicSetting
 * 
 * @param DateSelect
 * @desc 表示させる項目を指定。
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
 * @option TP（現在のステータスをONのときのみ）
 * @value 9
 * @option 命中率
 * @value 10
 * @option 回避率
 * @value 11
 * @option 会心率
 * @value 12
 * @option 会心回避率
 * @value 13
 * @option 魔法回避率
 * @value 14
 * @option 魔法反射率
 * @value 15
 * @option 反撃率
 * @value 16
 * @option HP再生率
 * @value 17
 * @option MP再生率
 * @value 18
 * @option TP再生率
 * @value 19
 * @option 狙われ率
 * @value 20
 * @option 防御効果率
 * @value 21
 * @option 回復効果率
 * @value 22
 * @option 薬の知識
 * @value 23
 * @option MP消費率
 * @value 24
 * @option TPチャージ率
 * @value 25
 * @option 物理ダメージ率
 * @value 26
 * @option 魔法ダメージ率
 * @value 27
 * @option 経験値
 * @value 30
 * @option 獲得金額
 * @value 31
 * @option 倒した数
 * @value 32
 * @option モンスター名
 * @value 33
 * @option 名称のみ
 * @value 35
 * @option ターン（TPBバトルで現在のステータスをONにしている時のみ表示）
 * @value 36
 * @option モンスターブックナンバー
 * @value 37
 * @option 耐性属性
 * @value 40
 * @option 弱点属性
 * @value 41
 * @option 無効属性
 * @value 42
 * @option 耐性ステート
 * @value 45
 * @option 弱点ステート
 * @value 46
 * @option 無効ステート
 * @value 47
 * @option 耐性デバフ
 * @value 50
 * @option 弱点デバフ
 * @value 51
 * @option ドロップアイテム
 * @value 60
 * @option スティールアイテム（要盗みスキルプラグイン）
 * @value 61
 * @option 記述欄
 * @value 70
 * @option オリジナルパラメータ
 * @value 80
 * @option 敵の使用スキル
 * @value 100
 * @option 属性レーダーチャート
 * @value 121
 * @option ステートレーダーチャート
 * @value 122
 * @option モンスター画像
 * @value 200
 * @option キャラチップ
 * @value 201
 * @option 盗み抵抗（要盗みスキルプラグイン）（未実装）
 * @value 300
 * @option ライン
 * @value 1000
 * @default 0
 * @parent BasicSetting
 * 
 * @param DetaEval
 * @desc パラメータ評価式を設定します。
 * @text パラメータ評価式
 * @type string
 * @default 
 * @parent BasicSetting
 * 
 * @param NameColor
 * @desc システム項目の文字色。
 * @text システム項目文字色
 * @type number
 * @default 16
 * @min 0
 * @parent BasicSetting
 * 
 * @param X_Position
 * @text X表示列位置
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 3
 * @parent BasicSetting
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置
 * @type number
 * @default 1
 * @min 1
 * @parent BasicSetting
 * 
 * @param X_Coordinate
 * @text X座標（相対）
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent BasicSetting
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）
 * @desc Y座標（Y表示列位置からの相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent BasicSetting
 * 
 * @param ItemWidth
 * @desc 項目横幅（0で自動）
 * @text 項目横幅
 * @type number
 * @default 0
 * @min 0
 * @parent BasicSetting
 * 
 * @param SystemItemWidth
 * @desc システム項目の横幅（0でデフォルト幅）
 * @text システム項目横幅
 * @type number
 * @default 0
 * @min 0
 * @parent BasicSetting
 * 
 * @param WideMode
 * @desc 項目表示モード
 * @text 項目表示モード
 * @type select
 * @option １列表示
 * @value 1
 * @option ２列表示
 * @value 2
 * @option ３列表示（表示列数が３の時のみ）
 * @value 3
 * @default 1
 * @parent BasicSetting
 * 
 * @param MaskMode
 * @desc 図鑑登録の際、撃破及びアナライズで情報開示してない場合はステータスを隠す。
 * @text 情報未登録ステータス表示
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param Back
 * @text コンテンツ背景表示
 * @desc コンテンツ背景を表示させます。
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param nameSetting
 * @text 名称、モンスター名設定
 * 
 * @param namePosition
 * @desc 名称、モンスター名の表示位置を指定します
 * @text 名称、モンスター名表示位置
 * @type select
 * @option 左
 * @value "left"
 * @option 中央
 * @value "center"
 * @option 右
 * @value "raight"
 * @default "left"
 * @parent nameSetting
 * 
 * @param textSetting
 * @text 記述欄設定
 * 
 * @param textMethod
 * @desc 記述欄に紐づけするタグ名
 * @text 記述欄タグ名
 * @type string
 * @default 
 * @parent textSetting
 * 
 * @param enemySetting
 * @text モンスター画像設定
 * 
 * @param ImgMaxHeight
 * @desc 画像の最大縦幅（行数で指定）
 * @text 画像の最大縦幅
 * @type number
 * @default 8
 * @min 0
 * @parent enemySetting
 * 
 * @param UnitSetting
 * @text モンスター画像設定
 * 
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位
 * @type string
 * @default 
 * @parent UnitSetting
 * 
 */
/*~struct~AnalyzeSkill:
 * 
 * @param PageCols
 * @desc ページの最大表示列。
 * @text ページ最大表示列
 * @type number
 * @default 4
 * @min 1
 * 
 * @param Mode
 * @desc 表示するアナライズ項目を指定します。
 * @text アナライズ項目指定
 * @type select
 * @option 図鑑表示と同じ
 * @value 0
 * @option 表示項目設定１
 * @value 1
 * @option 表示項目設定２
 * @value 2
 * @option 表示項目設定３
 * @value 3
 * @default 0
 * 
 * @param ContentCols
 * @text モンスター情報項目列数
 * @desc モンスター情報の項目列数。
 * @type select
 * @option ２列
 * @value 2
 * @option ３列
 * @value 3
 * @default 2
 * @parent EnemyInfoSetting
 * 
 * @param StatusGaugeVisible
 * @type boolean
 * @default true
 * @text ゲージを表示
 * @desc HP、MPのゲージを表示します。
 * 
 * @param EnemyCurrentStatus
 * @type boolean
 * @default true
 * @text エネミーの現在ステータス表示
 * @desc エネミーの現在のステータスを表示します。
 * 
 * @param AnalyzeMissMessage
 * @type string
 * @default %2はアナライズに失敗した。
 * @text アナライズ失敗時メッセージ
 * @desc アナライズの失敗時のメッセージを設定します。
 * 
 * @param BuffColor
 * @desc バフ時の文字色。
 * @text バフ時文字色
 * @type number
 * @default 0
 * @max 999999
 * 
 * @param DebuffColor
 * @desc デバフ時の文字色。
 * @text デバフ時文字色
 * @type number
 * @default 0
 * @max 999999
 * 
 * 
 */
/*~struct~BookCategoryList:
 * 
 * @param CategoryName
 * @desc カテゴリー名を設定します。
 * @text カテゴリー名
 * @type string
 * 
 * @param CategoryKey
 * @desc カテゴリーのKeyを設定します。(all:全て表示)
 * @text カテゴリーKey
 * @type string
 */
/*~struct~PercentContentList:
 *
 * @param ContentName
 * @desc 名称。
 * @text 表示名称
 * @type string
 * @default 
 * 
 * @param ContentDate
 * @desc 表示する
 * @text 名称、モンスター名表示位置
 * @type select
 * @option 完成度
 * @value 0
 * @option 遭遇済み
 * @value 1
 * @option 撃破済み
 * @value 2
 * @option 情報登録済み
 * @value 3
 * @option 遭遇数
 * @value 11
 * @option 撃破数
 * @value 12
 * @option 情報登録数
 * @value 13
 * @default 0
 * @parent nameSetting
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
param.BackGroundImg = param.BackGroundImg && param.BackGroundImg.length > 0 ? param.BackGroundImg[0] : null;
param.AnalyzeBackGroundImg = param.AnalyzeBackGroundImg && param.AnalyzeBackGroundImg.length > 0 ? param.AnalyzeBackGroundImg[0] : null;
const PercentContentLength = param.PercentWindowVisible && (param.PercentContent && param.PercentContent.length > 0);
param.PageSetting = param.PageSetting || [];
param.EnemyBookCategory = param.EnemyBookCategory || [];
const NRP_pLoopLR = PluginManager.parameters("NRP_LoopCursor").loopLR;
let enemyBook_Open = false;

//プラグインコマンド
const pluginName = "NUUN_EnemyBook";

PluginManager.registerCommand(pluginName, 'EnemyBookOpen', args => {
  if ($gameParty.inBattle()) {
    SceneManager._scene.commandEnemyBook();
  } else {
    SceneManager.push(Scene_EnemyBook);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyInfoOpen', args => {
  if ($gameParty.inBattle()) {
    SceneManager._scene.commandEnemyBookInfo();
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookAdd', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.addToEnemyBook(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemove', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.removeFromEnemyBook(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookStatusAdd', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.statusToEnemyBook(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookStatusRemove', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.removeStatusEnemyBook(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookComplete', args => {
  $gameSystem.completeEnemyBook();
});

PluginManager.registerCommand(pluginName, 'EnemyBookClear', args => {
  $gameSystem.clearEnemyBook();
});

PluginManager.registerCommand(pluginName, 'EnemyBookAddDefeat', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.addDefeat(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemoveDefeat', args => {
  $gameSystem.resetDefeat(Number(args.enemyId));
});

PluginManager.registerCommand(pluginName, 'EnemyBookRegistration', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSwitches.setValue(Number(args.registrationSwitch), $gameSystem.isInEnemyBook($dataEnemies[enemyId]));
  } else {
    $gameSwitches.setValue(Number(args.registrationSwitch), false);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookStatusRegistration', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSwitches.setValue(Number(args.statusRegistrationSwitch), $gameSystem.isInEnemyBookStatus($dataEnemies[enemyId]));
  } else {
    $gameSwitches.setValue(Number(args.statusRegistrationSwitch), false);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookGetDropItem', args => {
  $gameSystem.dropItemListFlag(Number(args.enemyId), Number(args.dropListId) - 1, true, Number(args.dropListId) > 0);
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemoveDropItem', args => {
  $gameSystem.dropItemListFlag(Number(args.enemyId), Number(args.dropListId) - 1, false, Number(args.dropListId) > 0);
});

PluginManager.registerCommand(pluginName, 'EnemyBookGetStealItem', args => {
  $gameSystem.stealItemListFlag(Number(args.enemyId) , Number(args.stealListId) - 1, true, Number(args.stealListId) > 0);
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemoveStealItem', args => {
  $gameSystem.stealItemListFlag(Number(args.enemyId) , Number(args.stealListId) - 1, false, Number(args.stealListId) > 0);
});

PluginManager.registerCommand(pluginName, 'EnemyBookDefeatEnemy', args => {
  $gameSystem.defeatEnemyVar(Number(args.DefeatEnemy));
});

PluginManager.registerCommand(pluginName, 'EnemyBookEncounteredEnemy', args => {
  $gameSystem.encounteredEnemyVar(Number(args.EncounteredEnemy));
});

PluginManager.registerCommand(pluginName, 'EnemyBookCompleteRate', args => {
  $gameSystem.completeRateVariables(Number(args.CompleteRate));
});

PluginManager.registerCommand(pluginName, 'EnemyBookDefeatEnemySum', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.defeatEnemySumVar(enemyId, Number(args.DefeatEnemySum));
  }
});

PluginManager.registerCommand(pluginName, 'DorpItemAcquired', args => {
  $gameSystem.dorpItemAcquired(Number(args.DorpItemAcquiredswitch), Number(args.enemyId), Number(args.DorpItemAcquiredId) - 1);
});

PluginManager.registerCommand(pluginName, 'StealItemAcquired', args => {
  $gameSystem.stealItemAcquired(Number(args.StealAcquiredswitch), Number(args.enemyId), Number(args.stealAcquiredId) - 1);
});

PluginManager.registerCommand(pluginName, 'EnemyBookActionAdd', args => {
  $gameSystem.enemyBookActionList(Number(args.enemyId), Number(args.actionId) - 1, Number(args.actionId) > 0, true);
});

PluginManager.registerCommand(pluginName, 'EnemyBookActionRemove', args => {
  $gameSystem.enemyBookActionList(Number(args.enemyId), Number(args.actionId) - 1, Number(args.actionId) > 0, false);
});

PluginManager.registerCommand(pluginName, 'EnemyBookElementAdd', args => {
  $gameSystem.enemyBookElementList(Number(args.enemyId), Number(args.elementId) - 1, Number(args.elementId) > 0, true);
});

PluginManager.registerCommand(pluginName, 'EnemyBookElementRemove', args => {
  $gameSystem.enemyBookElementList(Number(args.enemyId), Number(args.elementId) - 1, Number(args.elementId) > 0, false);
});

PluginManager.registerCommand(pluginName, 'EnemyBookStateAdd', args => {
  $gameSystem.enemyBookStateList(Number(args.enemyId), Number(args.stateId) - 1, Number(args.stateId) > 0, true);
});

PluginManager.registerCommand(pluginName, 'EnemyBookStateRemove', args => {
  $gameSystem.enemyBookStateList(Number(args.enemyId), Number(args.stateId) - 1, Number(args.stateId) > 0, false);
});

PluginManager.registerCommand(pluginName, 'EnemyBookDebuffAdd', args => {
  $gameSystem.enemyBookDebuffList(Number(args.enemyId), Number(args.debuffId) - 1, Number(args.debuffId) > 0, true);
});

PluginManager.registerCommand(pluginName, 'EnemyBookDebuffRemove', args => {
  $gameSystem.enemyBookDebuffList(Number(args.enemyId), Number(args.debuffId) - 1, Number(args.debuffId) > 0, false);
});

const _DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
  _DataManager_extractSaveContents.call(this, contents);
  $gameSystem.initEnemyBookNumber();
};

//Game_System
const _Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  _Game_System_initialize.call(this);
  this._enemyBookFlags = [];
  this._enemyBookStatusFlags = [];
  this._defeatNumber = [];
  this._itemDorps = [];
  this._stealItem = [];
  this._enemyBookElementFlags = [];
  this._enemyBookStateFlags = [];
  this._enemyBookDebuffFlags = [];
  this._enemyBookActionFlags = [];
  this.initEnemyBookNumber();
  this.initCategoryEnemyBook();
};

Game_System.prototype.addToEnemyBook = function(enemyId) {
  if(!this._enemyBookFlags) {
    this.clearEnemyBookFlags();
  }
  this._enemyBookFlags[enemyId] = true;
};

Game_System.prototype.addStatusToEnemyBook = function(enemyId) {
  if(!this._enemyBookStatusFlags) {
    this.clearEnemyBookStatusFlags();
  }
  this._enemyBookStatusFlags[enemyId] = true;
};

Game_System.prototype.categoryToEnemyBook = function(enemy) {
  this.initCategoryEnemyBook();
  if (enemy && this.isInEnemyBook(enemy)) {
    const enemyCategory = enemy.meta.CategoryKey ? enemy.meta.CategoryKey.split(',') : [];
    for (key of enemyCategory) {
      const index = param.EnemyBookCategory.findIndex(category => category.CategoryKey === key);
      if (index >= 0) {
        this._enemyBookCategoryFlags[index] = true;
      }
    }
  }
};

Game_System.prototype.getCategoryEnemyBook = function(index) {
  return this._enemyBookCategoryFlags[index];
};

Game_System.prototype.initCategoryEnemyBook = function() {
  if (!this._enemyBookCategoryFlags) {
    this._enemyBookCategoryFlags = [];
    const enemyBookCategoryLength = param.EnemyBookCategory.length;
    for (let i = 0; i < enemyBookCategoryLength; i++) {
      this._enemyBookCategoryFlags[i] = false;
    }
    const index = param.EnemyBookCategory.findIndex(category => category.CategoryKey === 'all');
    if (index >= 0) {
      this._enemyBookCategoryFlags[index] = true;
    }
  }
};

Game_System.prototype.statusToEnemyBook = function(enemyId) {
  this.addToEnemyBook(enemyId);
  this.addStatusToEnemyBook(enemyId);
};

Game_System.prototype.removeEnemyBook = function(enemyId) {
  if(!this._enemyBookFlags) {
    this.clearEnemyBookFlags();
  }
  this._enemyBookFlags[enemyId] = false;
};

Game_System.prototype.removeStatusEnemyBook = function(enemyId) {
  if(!this._enemyBookStatusFlags) {
    this.clearEnemyBookStatusFlags();
  }
  this._enemyBookStatusFlags[enemyId] = false;
};

Game_System.prototype.removeFromEnemyBook = function(enemyId) {
  if(this._enemyBookFlags) {
    this.removeEnemyBook(enemyId);
    this.removeStatusEnemyBook(enemyId);
    this.dropItemListFlag(enemyId, 0, false, false);
    this.stealItemListFlag(enemyId, 0, false, false);
    this.enemyBookActionList(enemyId, 0, false, false);
    this.enemyBookElementList(enemyId, 0, false, false);
    this.enemyBookStateList(enemyId, 0, false, false);
    this.enemyBookDebuffList(enemyId, 0, false, false);
    if (!this._defeatNumber) {
      this.clearDefeat();
    }
    this._defeatNumber[enemyId] = 0;
  }
};

Game_System.prototype.clearEnemyBookFlags = function() {
  this._enemyBookFlags = [];
};

Game_System.prototype.clearEnemyBookStatusFlags = function() {
  this._enemyBookStatusFlags = [];
};

Game_System.prototype.clearEnemyBook = function() {
  this.clearEnemyBookFlags();
  this.clearEnemyBookStatusFlags();
  this.clearDefeat();
  this.clearDropItem();
  this.clearStealItem();
  this.clearEnemyBookAction();
  this.clearEnemyBookElement();
  this.clearEnemyBookState();
  this.clearEnemyBookDebuff();
};

Game_System.prototype.completeEnemyBook = function() {
  //this.clearEnemyBook();
  for (let i = 1; i < $dataEnemies.length; i++) {
    this.addToEnemyBook(i);
    this.addStatusToEnemyBook(i);
    this.dropItemListFlag(i, 0, true, false);
    this.stealItemListFlag(i, 0, true, false);
    this.enemyBookActionList(i, 0, false, true);
    this.enemyBookElementList(i, 0, false, true);
    this.enemyBookStateList(i, 0, false, true);
    this.enemyBookDebuffList(i, 0, false, true);
  }
};

Game_System.prototype.isInEnemyBook = function(enemy) {
  return enemy && enemy.name && this._enemyBookFlags && this._enemyBookFlags[enemy.id];
};

Game_System.prototype.isInEnemyBookStatus = function(enemy) {
  return enemy && enemy.name && this._enemyBookStatusFlags && this._enemyBookStatusFlags[enemy.id];
};

Game_System.prototype.completeRateVariables = function(val) {
  const rate = this.completeRate();
  $gameVariables.setValue(val, rate);
};

Game_System.prototype.completeRate = function() {
  return this.onStatusEnemyDate() / this.bookEnemyDate() * 100;
};

Game_System.prototype.isEnemyBook = function(enemy) {//データベース
  return enemy && enemy.name && !enemy.meta.NoBook && !enemy.meta.NoBookData;
};

Game_System.prototype.bookEnemyDate = function() {
  return $dataEnemies.reduce((r, enemy) => {
    return r + (this.isEnemyBook(enemy) ? 1 : 0);
  }, 0);
};

Game_System.prototype.onStatusEnemyDate = function(enemyList) {
  const enemy = enemyList ? enemyList : $dataEnemies;
  return enemy.reduce((r, enemy) => {
    return r + (this.isEnemyBook(enemy) && this.isInEnemyBookStatus(enemy) ? 1 : 0);
  }, 0);
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
    return r + (enemy && enemy.name && (this.defeatNumber(enemy.id) > 0 || enemy.meta.ShowDataBook && !enemy.meta.NoBook && !enemy.meta.NoBookData) ? 1 : 0);
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

Game_System.prototype.addDefeat = function(enemy) {
  if (this.defeatNumber(enemy) <= 0) {
    this.defeatCount(enemy);
  }
};

Game_System.prototype.resetDefeat = function(enemyId) {
  if (!this._defeatNumber) {
    this.clearDefeat();
  }
  if (enemyId > 0) {
    if(this._defeatNumber[enemyId]) {
      this._defeatNumber[enemyId] = 0;
    }
  } else {
    for(let i = 1; $dataEnemies.length > i; i++) {
      this._defeatNumber[i] = 0;
    }
  }
};

Game_System.prototype.setEncounteredEnemy = function(enemyList) {
  const enemy = enemyList ? enemyList : $dataEnemies;
  this._EncounteredEnemy = enemy.reduce((r ,enemy) => {
    return r + (this.encounteredEnemyBook(enemy) ? 1 : 0);
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
  return this.isEnemyBook(enemy) && this.isInEnemyBook(enemy);
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
  if(!this._itemDorps || !this._itemDorps[enemyId] || !this._itemDorps[enemyId][dropId]) {
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
  if(!this._stealItem || !this._stealItem[enemyId] || !this._stealItem[enemyId][stealId]) {
    return false;
  }
  return this._stealItem[enemyId][stealId];
};

Game_System.prototype.dropItemListFlag = function(enemyId, dropListId, mode, Individual) {
	if(enemyId > 0){
    if(Individual){
      this.setDropItemFlag(enemyId, dropListId, mode);
    } else {
      let itemList = $dataEnemies[enemyId].dropItems;
       for(let i = 0; itemList.length > i; i++){
        this.setDropItemFlag(enemyId, i, mode);
      }
    }
  }
};

Game_System.prototype.stealItemListFlag = function(enemyId, stealListId, mode, Individual) {
	if(enemyId > 0){
    if(Individual){
      this.setStealItemFlag (enemyId, stealListId, mode);
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

Game_System.prototype.registrationStatusTiming = function() {
  return param.RegistrationStatusTiming;
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

Game_System.prototype.clearEnemyBookAction = function() {
	this._enemyBookActionFlags = [];
};

Game_System.prototype.setEnemyBookActionFlag = function(enemyId, actionId, flag) {
	if (!this._enemyBookActionFlags) {
		this.clearEnemyBookAction();
  }
  this._enemyBookActionFlags[enemyId] = this._enemyBookActionFlags[enemyId] || [];
  this._enemyBookActionFlags[enemyId][actionId] = flag;
};

Game_System.prototype.getEnemyBookActionFlag = function(enemyId, actionId) {
  if(!this._enemyBookActionFlags || !this._enemyBookActionFlags[enemyId] || !this._enemyBookActionFlags[enemyId][actionId]) {
    return false;
  }
  return this._enemyBookActionFlags[enemyId][actionId];
};

Game_System.prototype.enemyBookActionList = function(enemyId, actionId, Individual, mode) {
  if (enemyId > 0) {
    if (Individual) {
      this.setEnemyBookActionFlag(enemyId, actionId, mode);
    } else {
      const action = $dataEnemies[enemyId].actions;
      for(let i = 0; action.length > i; i++){
        this.setEnemyBookActionFlag(enemyId, i, mode);
      }
    }
  }
};

Game_System.prototype.clearEnemyBookElement = function() {
	this._enemyBookElementFlags = [];
};

Game_System.prototype.setEnemyBookElementFlag = function(enemyId, elementId, flag) {
	if (!this._enemyBookElementFlags) {
		this.clearEnemyBookElement();
  }
  this._enemyBookElementFlags[enemyId] = this._enemyBookElementFlags[enemyId] || [];
  this._enemyBookElementFlags[enemyId][elementId] = flag;
};

Game_System.prototype.getEnemyBookElementFlag = function(enemyId, elementId) {
  if(!this._enemyBookElementFlags || !this._enemyBookElementFlags[enemyId] || !this._enemyBookElementFlags[enemyId][elementId]) {
    return false;
  }
  return this._enemyBookElementFlags[enemyId][elementId];
};

Game_System.prototype.enemyBookElementList = function(enemyId, elementId, Individual, mode) {
  if (enemyId > 0) {
    if (Individual) {
      this.setEnemyBookElementFlag(enemyId, elementId, mode);
    } else {
      const list = param.ElementList;
      for(let i = 0; list.length > i; i++){
        this.setEnemyBookElementFlag(enemyId, list[i].ElementNo - 1, mode);
      }
    }
  }
};

Game_System.prototype.clearEnemyBookState = function() {
	this._enemyBookStateFlags = [];
};

Game_System.prototype.setEnemyBookStateFlag = function(enemyId, stateId, flag) {
	if (!this._enemyBookStateFlags) {
		this.clearEnemyBookState();
  }
  this._enemyBookStateFlags[enemyId] = this._enemyBookStateFlags[enemyId] || [];
  this._enemyBookStateFlags[enemyId][stateId] = flag;
};

Game_System.prototype.getEnemyBookStateFlag = function(enemyId, stateId) {
  if(!this._enemyBookStateFlags || !this._enemyBookStateFlags[enemyId] || !this._enemyBookStateFlags[enemyId][stateId]) {
    return false;
  }
  return this._enemyBookStateFlags[enemyId][stateId];
};

Game_System.prototype.enemyBookStateList = function(enemyId, stateId, Individual, mode) {
  if (enemyId > 0) {
    if (Individual) {
      this.setEnemyBookStateFlag(enemyId, stateId, mode);
    } else {
      const list = param.StateList;
      for(let i = 0; list.length > i; i++){
        this.setEnemyBookStateFlag(enemyId, list[i].StateId, mode);
      }
    }
  }
};

Game_System.prototype.clearEnemyBookDebuff = function() {
	this._enemyBookDebuffFlags = [];
};

Game_System.prototype.setEnemyBookDebuffFlag = function(enemyId, debuffId, flag) {
	if (!this._enemyBookDebuffFlags) {
		this.clearEnemyBookDebuff();
  }
  this._enemyBookDebuffFlags[enemyId] = this._enemyBookDebuffFlags[enemyId] || [];
  this._enemyBookDebuffFlags[enemyId][debuffId] = flag;
};

Game_System.prototype.getEnemyBookDebuffFlag = function(enemyId, debuffId) {
  if(!this._enemyBookDebuffFlags || !this._enemyBookDebuffFlags[enemyId] || !this._enemyBookDebuffFlags[enemyId][debuffId]) {
    return false;
  }
  return this._enemyBookDebuffFlags[enemyId][debuffId];
};

Game_System.prototype.enemyBookDebuffList = function(enemyId, debuffId, Individual, mode) {
  if (enemyId > 0) {
    if (Individual) {
      this.setEnemyBookDebuffFlag(enemyId, debuffId, mode);
    } else {
      const list = param.DeBuffList;
      for(let i = 0; list.length > i; i++){
        this.setEnemyBookDebuffFlag(enemyId, list[i].ParamId, mode);
      }
    }
  }
};

Game_System.prototype.initEnemyBookNumber = function() {
  if(!this._enemyBookNumber) {
    this._enemyBookNumber = [];
  }
  let index = 0;
  for (enemy of $dataEnemies) {
    if (enemy && this.isEnemyBook(enemy)) {
      index++;
      this._enemyBookNumber.push(index);
    } else {
      this._enemyBookNumber.push(-1);
    }
  }
  this._enemyBookLength = index;
};

Game_System.prototype.addToEnemyBookNumber = function(enemyId, index) {
  if(!this._enemyBookNumber) {
    this._enemyBookNumber = [];
  }
  this._enemyBookNumber[enemyId] = index;
};

Game_System.prototype.getEnemyBookNumber = function(enemyId) {
  return enemyId === 0 ? this._enemyBookNumber : this._enemyBookNumber[enemyId];
};

//Game_Troop
const _Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
  _Game_Troop_setup.call(this, troopId);
  this.members().forEach(function(enemy) {
    if (enemy.isAppeared() && $gameSystem.registrationTiming() === 0) {
      $gameSystem.addToEnemyBook(enemy.enemyId());
      if ($gameSystem.registrationStatusTiming() === 0) {
        $gameSystem.addStatusToEnemyBook(enemy.enemyId());
      }
    }
  }, this);
};

//Game_Enemy
const _Game_Enemy_appear = Game_Enemy.prototype.appear;
Game_Enemy.prototype.appear = function() {
  _Game_Enemy_appear.call(this);
  if ($gameTroop.inBattle() && $gameSystem.registrationTiming() === 0) {
    $gameSystem.addToEnemyBook(this.enemyId());
    if ($gameSystem.registrationStatusTiming() === 0) {
      $gameSystem.addStatusToEnemyBook(this.enemyId());
    }
  }
};

const _Game_Enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
  if (param.TransformDefeat && !this.enemy().meta.NoTransformInData) {
    $gameSystem.defeatCount(this.enemyId());
    if ($gameSystem.registrationStatusTiming() !== 2) {
      $gameSystem.addStatusToEnemyBook(this.enemyId());
    }
  }
  _Game_Enemy_transform.call(this, enemyId);
  if ($gameSystem.registrationTiming() === 0) {
    $gameSystem.addToEnemyBook(enemyId);
    if ($gameSystem.registrationStatusTiming() === 0) {
      $gameSystem.addStatusToEnemyBook(enemyId);
    }
  }
};

const _Game_Enemy_die = Game_Enemy.prototype.die;
Game_Enemy.prototype.die = function() {
  _Game_Enemy_die.call(this);
  if ($gameSystem.registrationStatusTiming() === 1 || $gameSystem.registrationStatusTiming() === 3) {
    $gameSystem.statusToEnemyBook(this.enemyId());
  } else if ($gameSystem.registrationTiming() === 1 || $gameSystem.registrationTiming() === 3) {
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

const _Game_Action_apply = Game_Action.prototype.apply
Game_Action.prototype.apply = function(target) {
  this._analyzeDate = this.item().meta.AnalyzeSkill ? param.AnalyzeSkillMode[Number(this.item().meta.AnalyzeSkill) - 1] : null;
  if (this._analyzeDate) {
    const text = this._analyzeDate.AnalyzeMissMessage
    if (text) {
      BattleManager.analyzeMissMessage = text.format(target.name(), this.subject().name())
    }
  }
  _Game_Action_apply.call(this, target);
};

const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
  _Game_Action_applyItemUserEffect.call(this, target);
  if (target.isEnemy()) {
    if (this._analyzeDate) {
      const rate = this.item().meta.CertainAnalyze || !target.enemy().meta.AnalyzeResist ? 100 : Number(target.enemy().meta.AnalyzeResist);
      if (Math.floor(Math.random() * 100 >= rate) || target.enemy().meta.NoBookData) {
        target.result().missed = true;
        return;
      }
      BattleManager.analyzeTarget = target;
      SceneManager._scene.enemyBookEnemyAnalyze(this._analyzeDate);
    }
  }
};

const _Game_Action_calcElementRate = Game_Action.prototype.calcElementRate;
Game_Action.prototype.calcElementRate = function(target) {
  if (target.isEnemy()) {  
    if (this.item().damage.elementId < 0) {
      this.enemyBookAttackElementDate(target, this.subject().attackElements());
    } else {
      $gameSystem.setEnemyBookElementFlag(target.enemyId(), this.item().damage.elementId, true);
    }
  }
  return _Game_Action_calcElementRate.call(this, target);
};

Game_Action.prototype.enemyBookAttackElementDate = function(target, element) {
  for (const elementId of element) {
    $gameSystem.setEnemyBookElementFlag(target.enemyId(), elementId, true);
  }
};

const _Game_Action_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
Game_Action.prototype.itemEffectAddState = function(target, effect) {
  _Game_Action_itemEffectAddState.call(this, target, effect);
  if (target.isEnemy()) {
    if (effect.dataId === 0) {
      this.enemyBookAttackStateDate(target);
    } else {
      $gameSystem.setEnemyBookStateFlag(target.enemyId(), effect.dataId, true);
    }
  }
};

Game_Action.prototype.enemyBookAttackStateDate = function(target) {
  for (const stateId of this.subject().attackStates()) {
    $gameSystem.setEnemyBookStateFlag(target.enemyId(), stateId, true);
  }
};

const _Game_Action_itemEffectAddDebuff = Game_Action.prototype.itemEffectAddDebuff;
Game_Action.prototype.itemEffectAddDebuff = function(target, effect) {
  _Game_Action_itemEffectAddDebuff.call(this, target, effect);
  if (target.isEnemy()) {
    $gameSystem.setEnemyBookDebuffFlag(target.enemyId(), effect.dataId, true);
  }
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
  this.createEnemyPageWindow();
  this.createEnemyWindow();
  if (param.CategoryOn && param.EnemyBookCategory) {
    this.createCategoryNameWindow();
    this.createCategoryWindow();
    this.enemyCategorySelection();
  } else {
    this.enemyIndexSelection();
  }
};

Scene_EnemyBook.prototype.createIndexWindow = function() {
  const rect = this.indexWindowRect();
  this._indexWindow = new Window_EnemyBook_Index(rect);
  this._indexWindow.setHandler("cancel", this.onEnemyIndexCancel.bind(this));
  this.addWindow(this._indexWindow);
  this._indexWindow.setPercentWindow(this._percentWindow);
  this._indexWindow.activate();
  this._indexWindow.hide();
  if (param.BackGroundImg) {
    this._indexWindow.opacity = 0;
    this._indexWindow.frameVisible = false;
  }
};

Scene_EnemyBook.prototype.createCategoryNameWindow = function() {
  const rect = this.categoryNameWindowRect();
  this._categoryNameWindow = new Window_EnemyBook_CategoryName(rect);
  this.addWindow(this._categoryNameWindow);
  if (param.BackGroundImg) {
    this._categoryNameWindow.opacity = 0;
    this._categoryNameWindow.frameVisible = false;
  }
};

Scene_EnemyBook.prototype.createCategoryWindow = function() {
  const rect = this.indexWindowRect();
  this._categoryWindow = new Window_EnemyBook_Category(rect);
  this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
  this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
  this.addWindow(this._categoryWindow);
  this._categoryWindow.hide();
  this._indexWindow.setCategoryWindow(this._categoryWindow);
  this._categoryNameWindow.setCategoryWindow(this._categoryWindow);
  if (param.BackGroundImg) {
    this._categoryWindow.opacity = 0;
    this._categoryWindow.frameVisible = false;
  }
};

Scene_EnemyBook.prototype.createPercentWindow = function() {
  if (PercentContentLength) {
    const rect = this.percentWindowRect();
    this._percentWindow = new Window_EnemyBook_Percent(rect);
    this.addWindow(this._percentWindow);
    if (param.BackGroundImg) {
      this._percentWindow.opacity = 0;
      this._percentWindow.frameVisible = false;
    }
  }
};

Scene_EnemyBook.prototype.createEnemyWindow = function() {
  const rect = this.enemyWindowRect();
  this._enemyWindow = new Window_EnemyBook(rect);
  this.addWindow(this._enemyWindow);
  this._indexWindow.setEnemyWindow(this._enemyWindow);
  this._enemyPageWindow.setEnemyWindow(this._enemyWindow);
  this._indexWindow.select(Window_EnemyBook_Index._lastIndex);
  if (param.BackGroundImg) {
    this._enemyWindow.opacity = 0;
    this._enemyWindow.frameVisible = false;
  }
  this.setMaxPage(param.PageSetting);
};

Scene_EnemyBook.prototype.createEnemyPageWindow = function() {
  const rect = this.enemyWindowPageRect();
  this._enemyPageWindow = new Window_EnemyBookPageCategory(rect);
  this.addWindow(this._enemyPageWindow);
  if (param.BackGroundImg) {
    this._enemyPageWindow.opacity = 0;
    this._enemyPageWindow.frameVisible = false;
  }
  this._enemyPageWindow.setPageList(param.PageSetting, param.PageCols);
  if (param.PageSetting.length <= 1) {
    this._enemyPageWindow.height = 0;
    this._enemyPageWindow.hide();
  }
};

Scene_EnemyBook.prototype.percentWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyWindowWidth();
  const wy = this.mainAreaTop();
  const ww = Math.floor(Graphics.boxWidth / 3);
  const wh = PercentContentLength ? this.calcWindowHeight(1, true) : 0;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowPageRect = function() {
  const wx = param.WindowMode === 0 ? Math.floor(Graphics.boxWidth / 3) : 0;
  const wy = this.mainAreaTop();
  const ww = this.enemyWindowWidth();
  const wh = this.calcWindowHeight(1, true);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.indexWindowRect = function() {
  const height = this.percentWindowRect().height;
  const wx = param.WindowMode === 0 ? 0 : this.enemyWindowWidth();
  const wy = this.mainAreaTop() + height;
  const ww = Math.floor(Graphics.boxWidth / 3);
  const wh = this.mainAreaHeight() - height;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowRect = function() {
  const wx = param.WindowMode === 0 ? Math.floor(Graphics.boxWidth / 3) : 0;
  const wy = this.mainAreaTop() + this._enemyPageWindow.height;
  const ww = this.enemyWindowWidth();
  const wh = this.mainAreaHeight() - this._enemyPageWindow.height;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.categoryNameWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyWindowWidth();
  const wy = this.mainAreaTop() + this.percentWindowRect().height;
  const ww = Math.floor(Graphics.boxWidth / 3);
  const wh = this.calcWindowHeight(1, true);
  this._indexWindow.y += wh;
  this._indexWindow.height -= wh;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowWidth = function() {
  return Graphics.boxWidth - Math.floor(Graphics.boxWidth / 3);
};

Scene_EnemyBook.prototype.helpAreaHeight = function() {
  return 0;
};

Scene_EnemyBook.prototype.setMaxPage = function(page) {
  page = page || [];
  this._maxPage = page.length;
  this._enemyWindow.displayList = page;
};

Scene_EnemyBook.prototype.getMaxPage = function() {
  return this._maxPage;
};

const _Scene_EnemyBook_createBackground = Scene_EnemyBook.prototype.createBackground;
Scene_EnemyBook.prototype.createBackground = function() {
  Scene_MenuBase.prototype.createBackground.call(this);
	if (param.BackGroundImg) {
		const sprite = new Sprite();
    sprite.bitmap = ImageManager.nuun_LoadPictures(param.BackGroundImg);
    sprite.x = param.BackUiWidth ? (Graphics.width - (Graphics.boxWidth + 8)) / 2 : 0;
    sprite.y = param.BackUiWidth ? (Graphics.height - (Graphics.boxHeight + 8)) / 2 : 0;
    this.addChild(sprite);
    this._backGroundImg = sprite;
  }
};

Scene_EnemyBook.prototype.update = function() {
  Scene_MenuBase.prototype.update.call(this);
  if (param.BackGroundImg) {
    const sprite = this._backGroundImg;
    if(param.BackUiWidth) {
      sprite.scale.x = (Graphics.boxWidth + 8 !== sprite.bitmap.width ? (Graphics.boxWidth + 8) / sprite.bitmap.width : 1);
      sprite.scale.y = (Graphics.boxHeight + 8!== sprite.bitmap.height ? (Graphics.boxHeight + 8) / sprite.bitmap.height : 1);
    } else {
      sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
      sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
    }
	}
};

Scene_EnemyBook.prototype.onEnemyIndexCancel = function() {
  if (param.CategoryOn && param.EnemyBookCategory) {
    this.enemyCategorySelection();
  } else {
    this.popScene();
  }
};

Scene_EnemyBook.prototype.onCategoryOk = function() {
  this.enemyIndexSelection();
  this._indexWindow.setCategory();
  this._indexWindow.refresh();
};

Scene_EnemyBook.prototype.enemyIndexSelection = function() {
  if (param.CategoryOn && param.EnemyBookCategory) {
    this._categoryWindow.hide();
    this._categoryWindow.deselect();
    this._categoryWindow.deactivate();
    this._categoryNameWindow.setName(this._categoryWindow.index());
  }
  this._indexWindow.show();
  this._indexWindow.activate();
  this._enemyPageWindow.setPage();
  this._enemyPageWindow.activate();
};

Scene_EnemyBook.prototype.enemyCategorySelection = function() {
  this._categoryWindow.setSelect();
  this._categoryWindow.show();
  this._indexWindow.hide();
  this._categoryWindow.activate();
  this._indexWindow.deselect();
  this._indexWindow.deactivate();
  this._enemyPageWindow.deselect();
  this._enemyPageWindow.deactivate();
  this._enemyPageWindow.itemClear();
};


//Window_EnemyBook_Percent
function Window_EnemyBook_Percent() {
  this.initialize(...arguments);
}

Window_EnemyBook_Percent.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_Percent.prototype.constructor = Window_EnemyBook_Percent;

Window_EnemyBook_Percent.prototype.initialize = function(rect) {
  this._userWindowSkin = param.PercentWindowsSkin;
  Window_Selectable.prototype.initialize.call(this, rect);
  this._defeat = {};
  this._encountered = {};
  this._duration = 0;
  this._oy = 0;
  this._percentContent = param.PercentContent || [];
  this._percentContentLength = this._percentContent.length;
};

Window_EnemyBook_Percent.prototype.percentRefresh = function(enemyList) {
  this._enemyListLength = enemyList.length;
  this.defeatPercent(enemyList);
  this.encounteredPercent(enemyList);
  //this.registrationPercent(enemyList);
  this.refresh();
};

Window_EnemyBook_Percent.prototype.defeatPercent = function(enemyList) {
  this._defeat.length = enemyList.length;
  this._defeat.encNum = $gameSystem.defeatEnemy(enemyList);
  this._defeat.onStatus = $gameSystem.onStatusEnemyDate(enemyList);
  this._defeat.Percent = Math.floor(this._defeat.encNum / this._defeat.length * 100);
  this._defeat.complete = Math.floor(this._defeat.onStatus / this._defeat.length * 100);
};

Window_EnemyBook_Percent.prototype.encounteredPercent = function(enemyList) {
  this._encountered.encNum = $gameSystem.encounteredEnemy(enemyList);
  //this._encountered.Percent = Math.floor(this._encountered.encNum / enemyList.length * 100);
  this._encountered.length = enemyList.length;
};

Window_EnemyBook_Percent.prototype.registrationPercent = function(enemyList) {
  this.registration.encNum = $gameSystem.registrationEnemy(enemyList);
};

Window_EnemyBook_Percent.prototype.refresh = function() {
  const lineHeight = this.lineHeight();
  const rect = this.itemLineRect(0);
  let y = rect.y + (this._oy * -1);
  this.contents.clear();
  for (const content of this._percentContent) {
    const text = this.getParam(content);
    this.drawText(text, rect.x, y, rect.width, 'center');
    y += lineHeight;
  }
  const text = this.getParam(this._percentContent[0]);
  this.drawText(text, rect.x, y, rect.width, 'center');
};

Window_EnemyBook_Percent.prototype.getParam = function(content) {
  switch (content.ContentDate) {
    case 0:
      return content.ContentName +' : '+ this._defeat.complete +' %';
    case 1:
      return content.ContentName +' : '+ this._encountered.encNum +'/'+ this._encountered.length;
    case 2:
      return content.ContentName +' : '+ this._defeat.encNum +'/'+ this._defeat.length;
    case 11:
      return content.ContentName +' : '+ this._encountered.encNum;
    case 12:
      return content.ContentName +' : '+ this._defeat.encNum;
    case 13:
      return content.ContentName +' : '+ this._defeat.onStatus;
  }
};

Window_EnemyBook_Percent.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  if (this._percentContentLength > 1) {
    this._duration++;
    this.updateInterval();
  }
};

Window_EnemyBook_Percent.prototype.updateInterval = function() {
  const lineHeight = this.lineHeight();
  if(this._duration >= param.Interval && this._duration < param.Interval + lineHeight){
    this._oy++;
    this.refresh();
  }
  if(this._duration >= param.Interval + lineHeight){
    this._duration = 0;
    if(this._oy >= lineHeight * this._percentContentLength){
       this._oy = 0;
    }
  }
};

//Window_EnemyBook_CategoryName
function Window_EnemyBook_CategoryName() {
  this.initialize(...arguments);
}

Window_EnemyBook_CategoryName.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_CategoryName.prototype.constructor = Window_EnemyBook_CategoryName;

Window_EnemyBook_CategoryName.prototype.initialize = function(rect) {
  this._userWindowSkin = param.CategoryNameWindowsSkin;
  Window_Selectable.prototype.initialize.call(this, rect);
  this._categoryName = null;
  this.refresh();
};

Window_EnemyBook_CategoryName.prototype.setName = function() {
  const name = this._categoryWindow._categoryList[this._categoryWindow._categorySelect].CategoryName;
  this._categoryName = name;
  this.refresh();
};

Window_EnemyBook_CategoryName.prototype.refresh = function() {
  const rect = this.itemLineRect(0);
  this.contents.clear();
  this.drawText(this._categoryName, rect.x, rect.y, rect.width);
};

Window_EnemyBook_CategoryName.prototype.setCategoryWindow = function(categoryWindow) {
  this._categoryWindow = categoryWindow;
};


//Window_EnemyBook_Category
function Window_EnemyBook_Category() {
  this.initialize(...arguments);
}

Window_EnemyBook_Category.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_Category.prototype.constructor = Window_EnemyBook_Category;

Window_EnemyBook_Category.prototype.initialize = function(rect) {
  this._userWindowSkin = param.CategoryWindowsSkin;
  Window_Selectable.prototype.initialize.call(this, rect);
  this._categoryList = param.EnemyBookCategory || [];
  this._categorySelect = 0;
  this.setCategoryFlags();
  this._maxNum = param.CategoryVisibleType === 1 ? this.maxItemsVisible() : (this._categoryList ? this._categoryList.length : 0);
  this.select(this._categorySelect);
  this.refresh();
};

Window_EnemyBook_Category.prototype.setCategoryFlags = function() {
  for (enemy of $dataEnemies) {
    $gameSystem.categoryToEnemyBook(enemy);
  }
};

Window_EnemyBook_Category.prototype.isCurrentItemEnabled = function() {
  return param.CategoryVisibleType === 2 ? $gameSystem.getCategoryEnemyBook(this.index()) : true;
};

Window_EnemyBook_Category.prototype.maxCols = function() {
  return 1;
};

Window_EnemyBook_Category.prototype.maxItems = function() {
  return this._maxNum;
};

Window_EnemyBook_Category.prototype.maxItemsVisible = function() {
  const categoryLength = this._categoryList.length;
  this._newCategoryList = [];
  let num = 0;
  for (let i = 0; i < categoryLength; i++) {
    const result = $gameSystem.getCategoryEnemyBook(i);
    if (result) {
      this._newCategoryList.push({category : this._categoryList[i], categoryVisible : result});
      num++;
    }
  }
  return num;
};

Window_EnemyBook_Category.prototype.processOk = function() {
  this._categorySelect = this.index();
  Window_Selectable.prototype.processOk.call(this);
};

Window_EnemyBook_Category.prototype.processCancel = function() {
  this._categorySelect = this.index();
  Window_Selectable.prototype.processCancel.call(this);
};

Window_EnemyBook_Category.prototype.getDate = function(index) {
  return param.CategoryVisibleType === 1 ? this._newCategoryList[index].category : this._categoryList[index];
};

Window_EnemyBook_Category.prototype.drawItem = function(index) {
  const rect = this.itemLineRect(index);
  let categoryName = this.getDate(index).CategoryName;
  const result = this.getCategoryVisible(index);
  if (param.CategoryVisibleType === 1 && !result) {
    return;
  }
  if (param.CategoryVisibleType === 2 && !result) {
    categoryName = this.unknownDataLength(categoryName);
  }
  this.drawText(categoryName, rect.x, rect.y, rect.width);
};

Window_EnemyBook_Category.prototype.getCategoryVisible = function(index) {
  return param.CategoryVisibleType === 1 ? this._newCategoryList[index].categoryVisible : $gameSystem.getCategoryEnemyBook(index);
};

Window_EnemyBook_Category.prototype.unknownDataLength = function(name) {
  if(param.UnknownData === '？' || param.UnknownData === '?') {
    const name_length = name.length;
    return param.UnknownData.repeat(name_length);
  } else {
    return param.UnknownData;
  }
};

Window_EnemyBook_Category.prototype.setSelect = function() {
  this.select(this._categorySelect);
};

Window_EnemyBook_Category.prototype.drawItemBackground = function(index) {
  if(!param.NoCursorBackground) {
    Window_Selectable.prototype.drawItemBackground.call(this, index);
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
  this._userWindowSkin = param.IndexWindowsSkin;
  Window_Selectable.prototype.initialize.call(this, rect);
  this._enemyList = [];
  this._category = null;
  this.refresh();
};

Window_EnemyBook_Index.prototype.setSelect = function() {
  if (param.CategoryOn && param.EnemyBookCategory) {
    Window_EnemyBook_Index._lastIndex = this.maxItems() > 0 ? Math.min(Window_EnemyBook_Index._lastIndex, this.maxItems() - 1) : 0;
  }
  if (Window_EnemyBook_Index._lastTopRow + this.maxPageRows() - 1 < Window_EnemyBook_Index._lastIndex) {
    Window_EnemyBook_Index._lastTopRow += 1;
  }
  this.setTopRow(Window_EnemyBook_Index._lastTopRow);
  this.select(Window_EnemyBook_Index._lastIndex);
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
    const enemy = this._enemyPercentList;
    this._percentWindow.percentRefresh(enemy);
  }
};

Window_EnemyBook_Index.prototype.updateEnemyStatus = function() {
  if (this._enemyWindow) {
    const enemy = this.getEnemy();
    this._enemyWindow.setEnemy(enemy);
  }
};

Window_EnemyBook_Index.prototype.updateIndex = function() {
  Window_EnemyBook_Index._lastTopRow = this.topRow();
  Window_EnemyBook_Index._lastIndex = this.index();
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

Window_EnemyBook_Index.prototype.setCategoryWindow = function(categoryWindow) {
  this._categoryWindow = categoryWindow;
};

Window_EnemyBook_Index.prototype.setCategory = function() {
  const index = this._categoryWindow._categorySelect;
  this._category = this._categoryWindow.getDate(index);
};

Window_EnemyBook_Index.prototype.enemyAt = function(index) {
  return this._enemyList && index >= 0 ? this._enemyList[index] : null;
};

Window_EnemyBook_Index.prototype.makeEnemyList = function() {
  this._enemyPercentList = [];
  this._enemyList = $dataEnemies.filter(enemy => this.includes(enemy));
};

Window_EnemyBook_Index.prototype.includes = function(enemy) {
  const result = $gameSystem.isEnemyBook(enemy);
  if (result) {
    this._enemyPercentList.push(enemy);
  }
  if (result && this.categoryIncludes(enemy) && this.unknownEnemyVisible(enemy)) {
    return true;
  }
  return false;
};

Window_EnemyBook_Index.prototype.unknownEnemyVisible = function(enemy) {
  return !param.UnknownVisible || (param.UnknownVisible && $gameSystem.isInEnemyBook(enemy));
};

Window_EnemyBook_Index.prototype.categoryIncludes = function(enemy) { 
  if (!this._category || this._category.CategoryKey === "all") {
    return true;
  }
  const enemyCategory = enemy.meta.CategoryKey ? enemy.meta.CategoryKey.split(',') : ["all"];
  return enemyCategory.find(category => category === this._category.CategoryKey);
};

Window_EnemyBook_Index.prototype.drawItem = function(index) {
  const enemy = this.enemyAt(index);
  if(enemy) {
    const rect = this.itemLineRect(index);
    let name = '';
    let iconId = 0;
    if ($gameSystem.isInEnemyBook(enemy)) {
      name = enemy.name;
      iconId = enemy.meta.EnemyIcon ? Number(enemy.meta.EnemyIcon) : 0;
    } else {
      name = this.unknownDataLength(enemy);
      iconId = enemy.meta.EnemyIcon && enemy.meta.EnemyIcon > 0 ? param.UnknownEnemyIcons : 0;
    }
    const textMargin = iconId > 0 ? ImageManager.iconWidth + 4 : 0;
    const itemWidth = Math.max(0, rect.width - textMargin);
    if(param.NumberType > 0) {
      let numberText = $gameSystem.getEnemyBookNumber(enemy.id);
      const textWidth = this.numberWidth(numberText);
      if (param.NumberType === 2) {
        numberText = this.numberWidthSlice(numberText);
      }
      this.drawText(numberText, rect.x, rect.y, textWidth);
      this.drawText(":", rect.x + textWidth + 6, rect.y);
      if (iconId > 0) {
        const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        this.drawIcon(iconId, rect.x + textWidth + 24, iconY);
      }
      this.drawText(name, rect.x + textWidth + 24 + textMargin, rect.y, itemWidth - textWidth - 24);
    } else {
      if (iconId > 0) {
        const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        this.drawIcon(iconId, rect.x, iconY);
      }
      this.drawText(name, rect.x + textMargin, rect.y, itemWidth);
    }
  }
};

Window_EnemyBook_Index.prototype.numberWidth = function(numberText) {
  return this.textWidth($gameSystem._enemyBookLength >= 1000 || param.NumberType === 2 ? '000' : '00');
};

Window_EnemyBook_Index.prototype.numberWidthSlice = function(indexText) {
  return ($gameSystem._enemyBookLength >= 1000 ? ('0000' + indexText).slice(-4) : ('000' + indexText).slice(-3));
};

Window_EnemyBook_Index.prototype.unknownDataLength = function(enemy) {
  if(param.UnknownData === '？' || param.UnknownData === '?') {
    const name_length = this.EnemyNameLength(enemy);
    return param.UnknownData.repeat(name_length);
  } else {
    return param.UnknownData;
  }
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
  this.setSelect();
  Window_Selectable.prototype.refresh.call(this);
};

Window_EnemyBook_Index.prototype.processCancel = function() {
  this.updateIndex();
  Window_Selectable.prototype.processCancel.call(this);
};

//Window_EnemyBook_InfoIndex
function Window_EnemyBook_InfoIndex() {
  this.initialize(...arguments);
}

Window_EnemyBook_InfoIndex.prototype = Object.create(Window_EnemyBook_Index.prototype);
Window_EnemyBook_InfoIndex.prototype.constructor = Window_EnemyBook_InfoIndex;

Window_EnemyBook_InfoIndex._lastTopRow = 0;
Window_EnemyBook_InfoIndex._lastIndex = 0;

Window_EnemyBook_InfoIndex.prototype.initialize = function(rect) {
  this._userWindowSkin = param.InfoIndexWindowsSkin;
  Window_Selectable.prototype.initialize.call(this, rect);
  this.refresh();
};

Window_EnemyBook_InfoIndex.prototype.setSelect = function() {
  if (Window_EnemyBook_InfoIndex._lastTopRow + this.maxPageRows() - 1 < Window_EnemyBook_InfoIndex._lastIndex) {
    Window_EnemyBook_InfoIndex._lastTopRow += 1;
  }
  this.setTopRow(Window_EnemyBook_InfoIndex._lastTopRow);
  this.select(Window_EnemyBook_InfoIndex._lastIndex);
};

Window_EnemyBook_InfoIndex.prototype.updateEnemyStatus = function() {
  if (this._enemyWindow) {
    const enemy = this.getEnemy();
    this._enemyWindow.selectEnemy = this._enemyList[this.index()];
    this._enemyWindow.setEnemy(enemy);
  }
};

Window_EnemyBook_InfoIndex.prototype.refresh = function() {
  this.makeEnemyList();
  this.setSelect();
  Window_Selectable.prototype.refresh.call(this);
};

Window_EnemyBook_InfoIndex.prototype.makeEnemyList = function() {
  this._enemyList = [];
  this._enemyList = $gameTroop._enemies.filter(enemy => this.includes(enemy));
};

Window_EnemyBook_InfoIndex.prototype.includes = function(enemy) {
  if (!enemy.enemy().meta.NoBookData && enemy.isAlive()) {
    return true;
  }
  return false;
};

Window_EnemyBook_InfoIndex.prototype.enemyAt = function(index) {
  return this._enemyList && index >= 0 ? this._enemyList[index].enemy() : null;
};

Window_EnemyBook_InfoIndex.prototype.getEnemy = function() {
  return this._enemyList[this.index()] ? this._enemyList[this.index()].enemy() : null;
};

Window_EnemyBook_InfoIndex.prototype.drawItem = function(index) {
  const enemy = this.enemyAt(index);
  if(enemy) {
    const rect = this.itemLineRect(index);
    const name = this._enemyList[index].name();
    const iconId = enemy.meta.EnemyIcon ? Number(enemy.meta.EnemyIcon) : 0;
    const textMargin = iconId > 0 ? ImageManager.iconWidth + 4 : 0;
    const itemWidth = Math.max(0, rect.width - textMargin);
    if (iconId > 0) {
      const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
      this.drawIcon(iconId, rect.x, iconY);
    }
    this.drawText(name, rect.x + textMargin, rect.y, itemWidth);
  }
};

//Window_EnemyBook
function Window_EnemyBook() {
  this.initialize(...arguments);
}

Window_EnemyBook.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook.prototype.constructor = Window_EnemyBook;

Window_EnemyBook.prototype.initialize = function(rect) {
  this._userWindowSkin = param.ContentWindowsSkin;
  Window_Selectable.prototype.initialize.call(this, rect);
  this._additionalSprites = {};
  this._enemy = null;
  this._bookMode = 0;
  this._enemy = null;
  this._enemyData = [];
  this._pageMode = 0;
  this._enemySprite = new Sprite_BookEnemy();
  this.selectEnemy = null;
  this._AnalyzeStatus = null;
  this.displayList = null;
  this.addChildToBack(this._enemySprite);
  this.refresh();
};

Window_EnemyBook.prototype.setAnalyzeStatus = function(args) {
  this._AnalyzeStatus = args;
  if (this._AnalyzeStatus) {
    this._AnalyzeStatus.ContentCols = !this._AnalyzeStatus.ContentCols ? param.ContentCols : this._AnalyzeStatus.ContentCols;
  }
};

Window_EnemyBook.prototype.setEnemy = function(enemy) {
  if(this._enemy !== enemy) {
    this._enemy = enemy;
    this.refresh();
  } else if (this._bookMode === 2) {
    this._enemy = enemy;
    this.refresh();
  }
};

Window_EnemyBook.prototype.maxCols = function() {
  if (this._bookMode === 1) {
    return this._AnalyzeStatus.ContentCols;
  } else if (this._bookMode === 2) {
    return param.InfoContentCols;
  }
  return param.ContentCols;
};

Window_EnemyBook.prototype.defeatFlag = function() {
  return $gameSystem.defeatNumber(this._enemy.id) > 0;
};

Window_EnemyBook.prototype.paramMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy) : true;
};

Window_EnemyBook.prototype.paramEXMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy) : true;
};

Window_EnemyBook.prototype.resistWeakDataMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy) : true;
};

Window_EnemyBook.prototype.showDropItemMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy): true;
};

Window_EnemyBook.prototype.dropItemFlag = function(index) {
  return param.ShowDropItemName ? $gameSystem.getDropItemFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.showStealItemMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy): true;
};

Window_EnemyBook.prototype.stealItemFlag = function(index) {
  return param.ShowStealItemName ? $gameSystem.getStealItemFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.showActionMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy): true;
};

Window_EnemyBook.prototype.actionFlag = function(index) {
  return param.ShowActionName ? $gameSystem.getEnemyBookActionFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.onElementsFlag = function(index) {
  return param.ShowElementsIcon ? $gameSystem.getEnemyBookElementFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.onStateFlag = function(index) {
  return param.ShowStateIcon ? $gameSystem.getEnemyBookStateFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.onDebuffFlag = function(index) {
  return param.ShowDebuffIcon ? $gameSystem.getEnemyBookDebuffFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.noUnknownStatus = function(enemy) {
  return this._enemy.meta.ShowDataBook || this._bookMode === 1 || (this._bookMode === 2 && !param.InfoMaskMode);
};

Window_EnemyBook.prototype.analyzeGaugeVisible = function() {
  return this._AnalyzeStatus && this.scanMode() && eval(this._AnalyzeStatus.StatusGaugeVisible);
};

Window_EnemyBook.prototype.infoGaugeVisible = function() {
  return this.scanMode() && param.InfoStatusGaugeVisible;
};

Window_EnemyBook.prototype.gaugeVisibleMode = function(maskMode) {
  return (this._bookMode === 1 && this.analyzeGaugeVisible()) || (this._bookMode === 2 && this.infoGaugeVisible() && this.paramMask(maskMode));
};

Window_EnemyBook.prototype.analyzeCurrentStatus = function() {
  return this._AnalyzeStatus && eval(this._AnalyzeStatus.EnemyCurrentStatus);
};

Window_EnemyBook.prototype.infoCurrentStatus = function() {
  return param.InfoEnemyCurrentStatus;
};

Window_EnemyBook.prototype.maxWidth = function() {
  return this.itemWidth() / 2 - this.itemPadding() * 2;
};

Window_EnemyBook.prototype.crisisColor = function(enemy) {
  return enemy.isDying() ? ColorManager.crisisColor() : ColorManager.normalColor();
};

Window_EnemyBook.prototype.systemWidth = function(swidth, width) {
  return swidth > 0 ? swidth : Math.floor(width / 3);
};

Window_EnemyBook.prototype.scanMode = function() {
  return (this._bookMode === 1 && this.analyzeCurrentStatus()) || (this._bookMode === 2 && this.infoCurrentStatus());
};

Window_EnemyBook.prototype.buffColor = function(params, nparams) {
  const buffColor = this._bookMode === 1 ? this._AnalyzeStatus.BuffColor : param.InfoBuffColor;
  const debuffColor = this._bookMode === 1 ? this._AnalyzeStatus.DebuffColor : param.InfoDebuffColor;
  if (this._bookMode === 0) {
    return ColorManager.normalColor();
  } else if (params > nparams) {
    return buffColor !== undefined ? ColorManager.textColor(buffColor) : ColorManager.normalColor();
  } else if (params < nparams) {
    return debuffColor !== undefined ? ColorManager.textColor(debuffColor) : ColorManager.normalColor();
  } else {
    return ColorManager.normalColor();
  }
};

Window_EnemyBook.prototype.refresh = function() {
  if(!this._enemy || this._pageMode < 0) {
    this.contents.clear();
    this.removeSprite();
    this._enemySprite.bitmap = null;
    return;
  }
  let enemy = null;
  if (this._bookMode >= 1) {
    enemy = this.scanMode() ? this.selectEnemy : new Game_Enemy(this._enemy.id, 0, 0);
  } else {
    if(!this._enemyData[this._enemy.id]) {
      enemy = new Game_Enemy(this._enemy.id, 0, 0);
      this._enemyData[this._enemy.id] = enemy;
    } else {
      enemy = this._enemyData[this._enemy.id];
    }
  }
  this.contents.clear();
  this._enemySprite.bitmap = null;
  this._enemySprite._svEnemy = false;
  this.removeSprite();
  if (this._bookMode === 0) {//通常モード
    if (!enemy || !$gameSystem.isInEnemyBook(this._enemy)) {
      return;
    }
  } else if (this._bookMode >= 1){//アナライズモード、敵の情報
    if (!enemy) {
      return;
    }
  }
  this.page(enemy);
};

Window_EnemyBook.prototype.page = function(enemy) {
  if (!this.displayList || this.displayList.length <= 0) {
    return;
  }
  const list = this.displayList[this._pageMode];
  const listContent = this.listDate(list) || [];
  const lineHeight = this.lineHeight();
  for (const date of listContent) {
    const x_Position = date.X_Position;
    const position = Math.min(x_Position, this.maxCols());
    const rect = this.itemRect(position - 1);
    const x = rect.x + (date.X_Coordinate || 0);
    const y = (date.Y_Position - 1) * lineHeight + rect.y + (date.Y_Coordinate || 0);
    const width = date.ItemWidth && date.ItemWidth > 0 ? date.ItemWidth : this.widthMode(date, rect);
    this.dateDisplay(date, enemy, x, y, width);
  }
};

Window_EnemyBook.prototype.widthMode = function(list, rect) {
  if (list.WideMode === 2) {
    rect.width = rect.width * 2 + this.colSpacing();
  } else if (list.WideMode === 3 && param.ContentCols === 3) {
    rect.width = rect.width * 3 + (this.colSpacing() * 2);
  }
  return rect.width;
};

Window_EnemyBook.prototype.listDate = function(list) {
  switch (list.ListDateSetting) {
    case 1:
      return param.PageList1;
    case 2:
      return param.PageList2;
    case 3:
      return param.PageList3;
    case 4:
      return param.PageList4;
    case 5:
      return param.PageList5;
    case 6:
      return param.PageList6;
    case 7:
      return param.PageList7;
    case 8:
      return param.PageList8;
    case 9:
      return param.PageList9;
    case 10:
      return param.PageList10;
    case 11:
      return param.PageList11;
    case 12:
      return param.PageList12;
    case 13:
      return param.PageList13;
    case 14:
      return param.PageList14;
    case 15:
      return param.PageList15;
    case 16:
      return param.PageList16;
    case 17:
      return param.PageList17;
    case 18:
      return param.PageList18;
    case 19:
      return param.PageList19;
    case 20:
      return param.PageList20;
    default:
      return null;
  }
};

Window_EnemyBook.prototype.dateDisplay = function(list, enemy, x, y, width) {
  switch (list.DateSelect) {
    case 0:
      break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
      this.enemyParams(list, enemy, x, y, width);
      break;
    case 30:
      this.enemyExp(list, enemy, x, y, width);
      break;
    case 31:
      this.enemyGold(list, enemy, x, y, width);
      break;
    case 32:
      this.defeat(list, enemy, x, y, width);
      break;
    case 33:
      this.enemyName(list, enemy, x, y, width);
      break;
    case 35:
      this.name(list, enemy, x, y, width);
      break;
    case 36:
      this.turn(list, enemy, x, y, width);
      break;
    case 37:
      this.bookEnemyNo(list, enemy, x, y, width);
      break;
    case 40:
      this.drawResistElement(list, enemy, x, y, width);
      break;
    case 41:
      this.drawWeakElement(list, enemy, x, y, width);
      break;
    case 42:
      this.drawNoEffectElement(list, enemy, x, y, width);
      break;
    case 45:
      this.drawResistStates(list, enemy, x, y, width);
      break;
    case 46:
      this.drawWeakStates(list, enemy, x, y, width);
      break;
    case 47:
      this.drawNoEffectStates(list, enemy, x, y, width);
      break;
    case 50:
      this.drawWeakDebuff(list, enemy, x, y, width);
      break;
    case 51:
      this.drawResistDebuff(list, enemy, x, y, width);
      break;
    case 60:
      this.dropItems(list, enemy, x, y, width);
      break;
    case 61:
      this.stealItems(list, enemy, x, y, width);
      break;
    case 70:
      this.drawDesc(list, enemy, x, y, width);
      break;
    case 80:
      this.originalParams(list, enemy, x, y, width);
      break;
    case 100:
      this.enemyAction(list, enemy, x, y, width);
      break;
    case 121:
      this.enemyElementChart(list, enemy, x, y, width);
      break;
    case 122:
      this.enemyStateChart(list, enemy, x, y, width);
      break;
    case 200:
      this.enemyImg(list, enemy, x - 4, y - 4, width);
      break;
    case 201:
      this.enemyCharacter(list, enemy, x, y, width);
      break;
    case 300:
    //this.enemyCharacter(list, enemy, x, y, width);
    break;
    case 1000:
      this.horzLine(list, enemy, x, y, width);
      break;
    default:
      break;
  }
};

Window_EnemyBook.prototype.paramNameShow = function(list, enemy) {
  if (list.paramName) {
    return list.paramName
  }
  const params = list.DateSelect;
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
    case 9:
      return TextManager.basic(6);
    case 10:
    case 11:
      return TextManager.param(params - 2);
    case 12:
      return "会心率";
    case 13:
      return "会心回避率";
    case 14:
      return "魔法回避率";
    case 15:
      return "魔法反射率";
    case 16:
      return "反撃率";
    case 17:
      return "HP再生率";
    case 18:
      return "MP再生率";
    case 19:
      return "TP再生率";
    case 20:
      return "狙われ率";
    case 21:
      return "防御効果率";
    case 22:
      return "回復効果率";
    case 23:
      return "薬の知識";
    case 24:
      return "MP消費率";
    case 25:
      return "TPチャージ率";
    case 26:
      return "物理ダメージ率";
    case 27:
      return "魔法ダメージ率";
    case 28:
      return "床ダメージ率";
    case 29:
      return "獲得経験率";
    default:
      return null;
  }
};

Window_EnemyBook.prototype.paramShow = function(list, enemy) {
  if (list.DetaEval) {
    return eval(list.DetaEval);
  }
  const params = list.DateSelect;
  switch (params) {
    case 1:
      return this._bookMode >= 1 && this.scanMode() ? enemy._hp : enemy.param(params - 1);
    case 2:
      return this._bookMode >= 1 && this.scanMode() ? enemy._mp : enemy.param(params - 1);
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return enemy.param(params - 1);
    case 9:
      return enemy._tp;
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
      return enemy.xparam(params - 10) * 100;
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
      return enemy.sparam(params - 20) * 100;
    default:
      return null;
  }
};

Window_EnemyBook.prototype.normalParam = function(list, enemy) {
  if (list.DetaEval) {
    return eval(list.DetaEval);
  }
  const params = list.DateSelect;
  if (params >= 10) {
    return this.paramShow(list, enemy);
  }
  switch (params) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return this._enemy.params[params - 1];
    default:
      return null;
  }
};

Window_EnemyBook.prototype.enemyParams = function(list, enemy, x, y, width) {
  let text = this.paramShow(list, enemy);
  let textWidth = width;
  if (text !== undefined) {
    if ((list.DateSelect === 1 || list.DateSelect === 2 || list.DateSelect === 9) && $gameParty.inBattle() && enemy && this.gaugeVisibleMode(list.MaskMode)) {
    } else {
      if (list.DateSelect === 9 && !this.scanMode()) {
        return;
      }
      this.drawContentsBackground(list.Back, x, y, width);
      x = this.contensX(x);
      width = this.contensWidth(width);
      this.changeTextColor(ColorManager.textColor(list.NameColor));
      nameText = this.paramNameShow(list, enemy);
      textWidth = this.systemWidth(list.SystemItemWidth, width);
      this.drawText(nameText, x, y, textWidth);
    }
    this.resetTextColor();
    if(!this.paramMask(list.MaskMode)){
      text = param.UnknownStatus;
    }
    if ($gameParty.inBattle() && this.gaugeVisibleMode(list.MaskMode) && list.DateSelect === 1) {
      this.placeGauge(enemy, "hp", x, y);
    } else if ($gameParty.inBattle() && this.gaugeVisibleMode(list.MaskMode) && list.DateSelect === 2) {
      this.placeGauge(enemy, "mp", x, y);
    } else if ($gameParty.inBattle() && this.gaugeVisibleMode(list.MaskMode) && list.DateSelect === 9) {
      this.placeGauge(enemy, "tp", x, y);
    } else {
      if (this.scanMode()) {
        if (!this.gaugeVisibleMode(list.MaskMode) && list.DateSelect === 1) {
          this.changeTextColor(this.crisisColor(enemy));
        } else {
          this.changeTextColor(this.buffColor(text, this.normalParam(list, enemy)));
        }
      }
      if (list.DateSelect >= 10) {
        text += list.paramUnit ? String(list.paramUnit) : " %";
      }
      this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
      this.resetTextColor();
    }
  }
};

Window_EnemyBook.prototype.enemyImg = function(list, enemy, x, y, width) {
  const height = list.ImgMaxHeight * this.lineHeight();
  const itemPadding = this.itemPadding();
  this._enemySprite.setMaxWidth(width);
  this._enemySprite.setMaxHeight(height - itemPadding);
  this._enemySprite.setup(enemy, width / 2 + x + (itemPadding * 2), (y + height / 2) + (itemPadding * 2));
};

Window_EnemyBook.prototype.enemyName = function(list, enemy, x, y, width) {
	this.changeTextColor(ColorManager.textColor(list.NameColor));
  const text = enemy.name();
  const iconId = this._enemy.meta.EnemyIcon ? Number(this._enemy.meta.EnemyIcon) : 0;
  if (iconId > 0) {
    const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
    const textMargin = iconId > 0 ? ImageManager.iconWidth + 4 : 0;
    const itemWidth = Math.max(0, width - textMargin);
    const textWidth = this.textWidth(text);
    const width2 = Math.min(itemWidth, textWidth);
    if(list.namePosition === 'center') {
      this.drawIcon(iconId, x + (width / 2 - width2 / 2) - textMargin / 2, iconY);
    } else if (list.namePosition === 'left') {
      this.drawIcon(iconId, x, iconY);
    } else {
      this.drawIcon(iconId, x + itemWidth - width2, iconY);
    }
    this.drawText(text, x + textMargin, y, itemWidth, list.namePosition);
  } else {
    this.drawText(text, x, y, width, list.namePosition);
  }
};

Window_EnemyBook.prototype.enemyExp = function(list, enemy, x, y, width) {
  this.drawContentsBackground(list.Back, x, y, width);
  x = this.contensX(x);
  width = this.contensWidth(width);
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : TextManager.exp;
  const textWidth = this.systemWidth(list.SystemItemWidth, width);
  this.drawText(nameText, x, y, textWidth);
  this.resetTextColor();
  let text;
  if(this.paramEXMask(list.MaskMode)) {
    text = list.DetaEval ? eval(list.DetaEval) : enemy.exp();
  } else {
    text = param.UnknownStatus;
  }
  this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
};

Window_EnemyBook.prototype.enemyGold = function(list, enemy, x, y, width) {
  this.drawContentsBackground(list.Back, x, y, width);
  x = this.contensX(x);
  width = this.contensWidth(width);
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "獲得金額";
  const textWidth = this.systemWidth(list.SystemItemWidth, width);
  this.drawText(nameText, x, y, textWidth);
  this.resetTextColor();
  let text;
  if(this.paramEXMask(list.MaskMode)){
    text = list.DetaEval ? eval(list.DetaEval) : enemy.gold();
    this.drawCurrencyValue(text, this.currencyUnit(), x + textWidth + 8, y, width - (textWidth + 8));
  } else {
    text = param.UnknownStatus;
    this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
  }
};

Window_EnemyBook.prototype.defeat = function(list, enemy, x, y, width) {
  this.drawContentsBackground(list.Back, x, y, width);
  x = this.contensX(x);
  width = this.contensWidth(width);
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "倒した数";
  const textWidth = this.systemWidth(list.SystemItemWidth, width);
  this.drawText(nameText, x, y, textWidth);
  this.resetTextColor();
  let text;
  if(this.paramEXMask(list.MaskMode)){
    text = list.DetaEval ? eval(list.DetaEval) : $gameSystem.defeatNumber(enemy.enemyId());
    text += list.paramUnit ? String(list.paramUnit) : null;
  } else {
    text = param.UnknownStatus;
  }
  this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
};

Window_EnemyBook.prototype.turn = function(list, enemy, x, y, width) {
  if (BattleManager.isTpb() && this.scanMode()) {
    this.drawContentsBackground(list.Back, x, y, width);
    x = this.contensX(x);
    width = this.contensWidth(width);
    this.changeTextColor(ColorManager.textColor(list.NameColor));
    const nameText = list.paramName ? list.paramName : "ターン";
    const textWidth = this.systemWidth(list.SystemItemWidth, width);
    this.drawText(nameText, x, y, textWidth);
    this.resetTextColor();
    let text;
    if(this.paramEXMask(list.MaskMode)){
      text = list.DetaEval ? eval(list.DetaEval) : Math.max(enemy.turnCount(), 1);
    } else {
      text = param.UnknownStatus;
    }
    this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
  }
};

Window_EnemyBook.prototype.name = function(list, enemy, x, y, width) {
  const nameText = list.paramName;
  if (nameText) {
    this.changeTextColor(ColorManager.textColor(list.NameColor));
    this.drawText(nameText, x, y, width, list.namePosition);
  }
};

Window_EnemyBook.prototype.bookEnemyNo = function(list, enemy, x, y, width) {
  const nameText = list.paramName;
  let textWidth  = 0;
  if (nameText) {
    this.changeTextColor(ColorManager.textColor(list.NameColor));
    this.drawText(nameText, x, y, width, list.namePosition);
    textWidth = this.textWidth(nameText) + this.itemPadding();
    this.resetTextColor();
  }
  let text = $gameSystem.getEnemyBookNumber(this._enemy.id);
  if (param.NumberType === 2) {
    text = this.numberWidthSlice(text);
  }
  this.drawText(text, x + textWidth, y, width - textWidth, "left");
};

Window_EnemyBook.prototype.drawEnemyBookStealRate = function(text, x, y, width,) {
  this.drawContentsBackground(list.Back, x, y, width);
  const nameText = list.paramName;
};

Window_EnemyBook.prototype.horzLine = function(list, enemy, x, y, width) {
  const lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(x, lineY, width, 2, ColorManager.textColor(list.NameColor));
  this.contents.paintOpacity = 255;
};

Window_EnemyBook.prototype.drawResistElement = function(list, enemy, x, y, width) {
  if(!param.ElementList){
    return;
  }
  let Unknown = false;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "耐性属性";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.ElementUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.ElementList.forEach(Element => {
    if(Element.ElementNo){
      let rate = enemy.elementRate(Element.ElementNo);
      if(rate < 1 && param.ResistNoEffectElement || (rate < 1 && rate > 0 && !param.ResistNoEffectElement)){
        if (Unknown || (param.ElementUnknownIconId > 0 && !this.onElementsFlag(Element.ElementNo))) {
          icon = param.ElementUnknownIconId;
        } else {
          icon = this.onElementsFlag(Element.ElementNo) ? Element.ElementIconId : 0;
        }
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

Window_EnemyBook.prototype.drawWeakElement = function(list, enemy, x, y, width) {
  if(!param.ElementList){
    return;
  }
  let Unknown = false;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "弱点属性";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.ElementUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.ElementList.forEach(Element => {
    if (Element.ElementNo) {
      let rate = enemy.elementRate(Element.ElementNo);
      if (rate > 1) {
        if (Unknown || (param.ElementUnknownIconId > 0 && !this.onElementsFlag(Element.ElementNo))) {
          icon = param.ElementUnknownIconId;
        } else {
          icon = this.onElementsFlag(Element.ElementNo) ? Element.ElementIconId : 0;
        }
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

Window_EnemyBook.prototype.drawNoEffectElement = function(list, enemy, x, y, width) {
  if(!param.ElementList){
    return;
  }
  let Unknown = false;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "無効属性";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.ElementUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.ElementList.forEach(Element => {
    if (Element.ElementNo) {
      let rate = enemy.elementRate(Element.ElementNo);
      if (rate <= 0) {
        if (Unknown || (param.ElementUnknownIconId > 0 && !this.onElementsFlag(Element.ElementNo))) {
          icon = param.ElementUnknownIconId;
        } else {
          icon = this.onElementsFlag(Element.ElementNo) ? Element.ElementIconId : 0;
        }
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

Window_EnemyBook.prototype.drawResistStates = function(list, enemy, x, y, width) {
  if(!param.StateList){
    return;
  }
  let Unknown = false;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "耐性ステート";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.StateUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.StateList.forEach(State => {
    if(State.StateId){
      let stateId = State.StateId;
      let rate = enemy.stateRate(stateId);
      if (param.ResistNoEffectState) {
        rate *= enemy.isStateResist(stateId) ? 0 : 1;
      }
      if (rate < 1 && (param.ResistNoEffectState || (!param.ResistNoEffectState && rate > 0))) {
        if (Unknown || (param.StateUnknownIconId > 0 && !this.onStateFlag(stateId))) {
          icon = param.StateUnknownIconId;
        } else {
          icon = this.onStateFlag(stateId) ? $dataStates[stateId].iconIndex : 0;
        }
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

Window_EnemyBook.prototype.drawWeakStates = function(list, enemy, x, y, width) {
  if(!param.StateList){
    return;
  }
  let Unknown = false;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "弱点ステート";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.StateUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.StateList.forEach(State => {
  if(State.StateId){
    let stateId = State.StateId;
    let rate = enemy.stateRate(stateId);
    if (((!param.NormalWeakState && rate > 1) || (param.NormalWeakState && rate >= 1)) && !enemy.isStateResist(stateId)) {
      if (Unknown || (param.StateUnknownIconId > 0 && !this.onStateFlag(stateId))) {
        icon = param.StateUnknownIconId;
      } else {
        icon = this.onStateFlag(stateId) ? $dataStates[stateId].iconIndex : 0;
      }
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

Window_EnemyBook.prototype.drawNoEffectStates = function(list, enemy, x, y, width) {
  if(!param.StateList){
    return;
  }
  let Unknown = false;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "無効ステート";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.StateUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.StateList.forEach(State => {
    if(State.StateId){
      let stateId = State.StateId;
      let icon = null;
      let rate = enemy.stateRate(stateId);
      if (rate <= 0 || enemy.isStateResist(stateId)) {
        if (Unknown || (param.StateUnknownIconId > 0 && !this.onStateFlag(stateId))) {
          icon = param.StateUnknownIconId;
        } else {
          icon = this.onStateFlag(stateId) ? $dataStates[stateId].iconIndex : 0;
        }
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

Window_EnemyBook.prototype.buffIconIndex = function(rate, paramId) {
	if (rate > 1) {
    return Game_BattlerBase.ICON_BUFF_START + (buffLevel - 1) * 8 + paramId;
  }
};

Window_EnemyBook.prototype.drawWeakDebuff = function(list, enemy, x, y, width) {
  let Unknown = false;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "弱点デバフ";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.DeBuffUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.DeBuffList.forEach(deBuff => {
    let rate = enemy.debuffRate(deBuff.ParamId);
    if (rate > 1) {
      if (Unknown || (param.DeBuffUnknownIconId > 0 && !this.onDebuffFlag(deBuff.ParamId))) {
        icon = param.DeBuffUnknownIconId;
      } else {
        icon = this.onDebuffFlag(deBuff.ParamId) ? deBuff.DebuffIconId : 0;
      }
      if (icon && icon > 0) icons.push(icon);
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
  });
};

Window_EnemyBook.prototype.drawResistDebuff = function(list, enemy, x, y, width) {
  let Unknown = false;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "耐性デバフ";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.DeBuffUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.DeBuffList.forEach(deBuff => {
    let rate = enemy.debuffRate(deBuff.ParamId);
    if (rate < 1) {
      if (Unknown || (param.DeBuffUnknownIconId > 0 && !this.onDebuffFlag(deBuff.ParamId))) {
        icon = param.DeBuffUnknownIconId;
      } else {
        icon = this.onDebuffFlag(deBuff.ParamId) ? deBuff.DebuffIconId : 0;
      }
      if (icon && icon > 0) icons.push(icon);
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
  });
};

Window_EnemyBook.prototype.dropItems = function(list, enemy, x, y, width) {
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "ドロップアイテム";
  this.drawText(nameText, x, y);
  const lineHeight = this.lineHeight();
  let cols = 1;
  if (param.DropItemMultiCol) {
    if (list.WideMode === 2) {
      width = (width - this.colSpacing()) / 2;
      cols = 2;
    } else if (list.WideMode === 3 && param.ContentCols === 3) {
      width = (width - this.colSpacing() * 2) / 3;
      cols = 3;
    }
  }
  const dropList = this._enemy.dropItems;
  let x2 = x;
  let y2 = y;
  let dropIndex = 0;
  const listLength = dropList.length;
  for(i = 0; i < listLength; i++){
    if(dropList[i].kind > 0){
      if (param.DropItemMultiCol) {
        x2 = Math.floor(dropIndex % cols) * (width + this.itemPadding()) + x;
        y2 = Math.floor(dropIndex / cols) * lineHeight + y + lineHeight;
      } else {
        y2 += lineHeight;
      }
      this.drawContentsBackground(list.Back, x2, y2, width);
      x3 = this.contensX(x2);
      width2 = this.contensWidth(width);
      let item = enemy.itemObject(dropList[i].kind, dropList[i].dataId);
      if((this.showDropItemMask(list.MaskMode, enemy) && this.dropItemFlag(i))) {
        let rate = dropList[i].denominator;
        let textWidth = this.textWidth("1/" + rate);
        this.drawItemName(item, x3, y2, width2 - textWidth - this.itemPadding());
        if (param.DropItemProbabilityShow && !item.meta.NoDropProbability) {
          this.drawEnemyBookNumber("1/" + rate, x3, y2, width2);
        }
        dropIndex++;
      } else {
        this.resetTextColor();
        this.drawText(this.unknownDataLength(item.name), x3, y2, width2,'left');
        dropIndex++;
      }
    }
  }
};

Window_EnemyBook.prototype.stealItems = function(list, enemy, x, y, width) {
  if (!Imported.NUUN_StealableItems) {
    return;
  }
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "盗めるアイテム";
  this.drawText(nameText, x, y);
  const lineHeight = this.lineHeight();
  let cols = 1;
  if (param.DropItemMultiCol) {
    if (list.WideMode === 2) {
      width = (width - this.colSpacing()) / 2;
      cols = 1;
    } else if (list.WideMode === 3) {
      width = (width - this.colSpacing() * 2) / 3;
      cols = 2;
    }
  }
  const stealList = enemy._stealItems;
  let x2 = x;
  let y2 = y;
  let stealIndex = 0;
  const listLength = stealList.length;
  for(let i = 0; listLength > i; i++){
    if (stealList[i].kind > 0 && stealList[i].kind < 4) {
      if (param.DropItemMultiCol) {
        x2 = Math.floor(dropIndex % cols) * (width + this.itemPadding()) + x;
        y2 = Math.floor(dropIndex / cols) * lineHeight + y + lineHeight;
      } else {
        y2 += lineHeight;
      }
      this.drawContentsBackground(list.Back, x2, y2, width);
      x3 = this.contensX(x2);
      width2 = this.contensWidth(width);
      let item = enemy.stealObject(stealList[i].kind, stealList[i].dataId);
      if((this.showStealItemMask(list.MaskMode, enemy) && this.stealItemFlag(i))) {
        let rate = stealList[i].denominator;
        const unit = list.paramUnit ? String(list.paramUnit) : " %";
        let textWidth = this.textWidth(rate + unit);
        this.drawItemName(item, x3, y2, width2 - textWidth - this.itemPadding());
        if (param.StealItemProbabilityShow) {
          this.drawEnemyBookNumber(rate + unit, x3, y2, width2);
        }
        stealIndex++;
      } else {
        this.resetTextColor();
        this.drawText(this.unknownDataLength(item.name), x3, y2, width2,'left');
        stealIndex++;
      }
    }
  }
};

Window_EnemyBook.prototype.drawDesc = function(list, enemy, x, y, width) {
  const nameText = list.paramName
  if (nameText) {
    this.changeTextColor(ColorManager.textColor(list.NameColor));
    this.drawText(nameText, x, y);
    y += this.lineHeight();
  }
  this.resetTextColor();
  if(this.paramEXMask(list.MaskMode)){
    let text = list.DetaEval;
    if (!text) {
      const method = list.textMethod;
      if (method) {
        text = enemy.enemy().meta[method];
      }
    } else {
      text = eval(text);
    }
    if(text){
      this.drawTextEx(text, x, y, width);
    }
  }
};

Window_EnemyBook.prototype.originalParams = function(list, enemy, x, y, width) {
  this.drawContentsBackground(list.Back, x, y, width);
  x = this.contensX(x);
  width = this.contensWidth(width);
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName;
  let textWidth = width;
  if (nameText) {
    textWidth = this.systemWidth(list.SystemItemWidth, width);
    this.drawText(nameText, x, y, textWidth);
  }
  this.resetTextColor();
  let text;
  if(this.paramEXMask(list.MaskMode)){
    text = eval(list.DetaEval);
    text += list.paramUnit ? String(list.paramUnit) : null;
  } else {
    text = param.UnknownStatus;
  }
  this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
};

Window_EnemyBook.prototype.enemyAction = function(list, enemy, x, y, width) {
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "使用スキル";
  this.drawText(nameText, x, y, width);
  const lineHeight = this.lineHeight();
  let cols = 1;
  let x2 = x;
  let y2 = y;
  if (param.ActionMultiCol) {
    if (list.WideMode === 2) {
      width = (width - this.colSpacing()) / 2;
      cols = 2;
    } else if (list.WideMode === 3 && param.ContentCols === 3) {
      width = (width - this.colSpacing() * 2) / 3;
      cols = 3;
    }
  }
  const action = this._enemy.actions;
  this.resetTextColor();
  const dateLenght = param.ActionMaxItems === 0 ? action.length : param.ActionMaxItems;
  for (let i = 0; i < dateLenght; i++) {
    if (param.ActionMultiCol) {
      x2 = Math.floor(i % cols) * (width + this.itemPadding()) + x;
      y2 = Math.floor(i / cols) * lineHeight + y + lineHeight;
    } else {
      y2 += lineHeight;
    }
    this.drawContentsBackground(list.Back, x2, y2, width);
    x3 = this.contensX(x2);
    width2 = this.contensWidth(width);
    const skillDate = $dataSkills[action[i].skillId];
    if(this.showActionMask(list.MaskMode, enemy) && this.actionFlag(i)){
      this.drawItemName(skillDate, x3, y2, width2);
    } else {
      this.drawText(this.unknownDataLength(skillDate.name), x3, y2, width2);
    }
  }
};

Window_EnemyBook.prototype.enemyElementChart = function(list, enemy, x, y, width) {
  if (!Imported.NUUN_RadarChartBase) {
    return;
  }
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "属性耐性";
  this.drawText(nameText, x, y, width);
  const lineHeight = this.lineHeight();
  this.enemyElementRadarChart(this.setEnemyElementChart(enemy), enemy, x, y + lineHeight ,'element');
};

Window_EnemyBook.prototype.setEnemyElementChart = function(enemy) {
  const data = [];
  for (const element of param.ElementList) {
    let rate = enemy.elementRate(element.ElementNo);
    const elementName = $dataSystem.elements[element.ElementNo];
    const elementIconId = element.ElementIconId || 0;
    data.push(this.setRadarChart(elementName, rate, elementIconId));
  }
  return data;
};

Window_EnemyBook.prototype.enemyStateChart = function(list, enemy, x, y, width) {
  if (!Imported.NUUN_RadarChartBase) {
    return;
  }
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "ステート耐性";
  this.drawText(nameText, x, y, width);
  const lineHeight = this.lineHeight();
  this.enemyStateRadarChart(this.setEnemyStateChart(enemy), enemy, x, y + lineHeight ,'state');
};

Window_EnemyBook.prototype.setEnemyStateChart = function(enemy) {
  const data = [];
  for (const state of param.StateList) {
    let stateId = state.StateId;
    let rate = enemy.stateRate(stateId);
    rate *= enemy.isStateResist(stateId) ? 0 : 1;
    const stateName = $dataStates[stateId].name;
    const iconId = param.RadarChartIcon ? $dataStates[stateId].iconIndex : 0;
    data.push(this.setRadarChart(stateName, rate, iconId));
  }
  return data;
};

Window_EnemyBook.prototype.enemyCharacter = function(list, enemy, x, y, width) {
  this.enemyCharacterChip(enemy, x, y);
};

Window_EnemyBook.prototype.nameLength = function(name) {
	return name.length;
};

Window_EnemyBook.prototype.unknownDataLength = function(name) {
  if(param.UnknownItems === '？' || param.UnknownItems === '?') {
    const name_length = this.nameLength(name);
    return param.UnknownItems.repeat(name_length);
  } else {
    return param.UnknownItems;
  }
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

Window_EnemyBook.prototype.enemyCharacterChip = function(enemy, x, y) { 
  const type = 'character';
  const key = "enemyBook_%1".format(type);
  const sprite = this.createInnerChipSprite(key, enemy.enemyId());
  sprite._character.setPosition(x + 24, y + this.lineHeight());
  sprite.updatePosition();
  sprite.show();
};

Window_EnemyBook.prototype.createInnerChipSprite = function(key, id) {
  const enemyCharacter = new Game_EnemyBookCharacter(id);
  const dict = this._additionalSprites;
  if (dict[key]) {
    dict[key].setCharacter(enemyCharacter);
    return dict[key];
  } else {
    const sprite = new Sprite_EnemyBookCharacter(enemyCharacter);
    dict[key] = sprite;
    this.addInnerChild(sprite);
    return sprite;
  }
};

Window_EnemyBook.prototype.placeGauge = function(enemy, type, x, y, width) {
  const padding = this.itemPadding();
  const key = "enemyBook-gauge-%2".format(enemy.enemyId(), type);
  const sprite = this.createInnerGaugeSprite(key, Sprite_EnemyBookGauge);
  sprite.bitmap.width = width - padding;
  sprite.setup(enemy, type);
  sprite.move(x, y);
  sprite.show();
};

Window_EnemyBook.prototype.createInnerGaugeSprite = function(key, spriteClass) {
  const dict = this._additionalSprites;
  const sprite = new spriteClass();
  dict[key] = sprite;
  this.addInnerChild(sprite);
  return sprite;
};

Window_EnemyBook.prototype.createInnerSprite = function(key, spriteClass) {
  const dict = this._additionalSprites;
  if (dict[key]) {
      return dict[key];
  } else {
      const sprite = new spriteClass();
      dict[key] = sprite;
      this.addInnerChild(sprite);
      return sprite;
  }
};

Window_EnemyBook.prototype.removeInnerSprite = function(type) {
  let key = null;
  if (type === 'element' || type === 'state') {
    key = "enemyRadarChart_%1".format(type);
  } else if (type === 'character') {
    key = "enemyBook_%1".format(type);
  } else {
    key = "enemyBook-gauge-%2".format(null, type);
  }
  const dict = this._additionalSprites;
  if (dict[key]) {
    this._clientArea.removeChild(dict[key]);
    dict[key] = null;
  }
};

Window_EnemyBook.prototype.removeInnerCharacterSprite = function(type) {
  const key = "enemyBook-gauge-%2".format(null, type);
  const dict = this._additionalSprites;
  if (dict[key]) {
    this._clientArea.removeChild(dict[key]);
    dict[key] = null;
  }
};

Window_EnemyBook.prototype.removeSprite = function() {
  if ($gameParty.inBattle()) {
    this.removeInnerSprite('hp');
    this.removeInnerSprite('mp');
    this.removeInnerSprite('tp');
  }
  this.removeInnerSprite('character');
  this.removeInnerSprite('element');
  this.removeInnerSprite('state');
};

Window_EnemyBook.prototype.enemyElementRadarChart = function(list, enemy, x, y, type) { 
  const key = "enemyRadarChart_%1".format(type);
  const sprite = this.createInnerSprite(key, Sprite_NUUN_RadarChart);
  sprite.setupColor(param.ElementRadarChartFramecolor,param.ElementRadarChartLineColor, param.ElementRadarChartMainColor1, param.ElementRadarChartMainColor2);
  sprite.setup(enemy, type, list, param.ElementRadarChartRadius, param.ElementRadarChartX, param.ElementRadarChartY, param.ElementRadarChart_FontSize);
  sprite.move(x, y);
};

Window_EnemyBook.prototype.enemyStateRadarChart = function(list, enemy, x, y, type) { 
  const key = "enemyRadarChart_%1".format(type);
  const sprite = this.createInnerSprite(key, Sprite_NUUN_RadarChart);
  sprite.setupColor(param.StateRadarChartFramecolor,param.StateRadarChartLineColor, param.StateRadarChartMainColor1, param.StateRadarChartMainColor2);
  sprite.setup(enemy, type, list, param.StateRadarChartRadius, param.StateRadarChartX, param.StateRadarChartY, param.StateRadarChart_FontSize);
  sprite.move(x, y);
};

Window_EnemyBook.prototype.currencyUnit = function() {
  return TextManager.currencyUnit;
};

Window_EnemyBook.prototype.drawContentsBackground = function(back, x, y, width) {
  if (back) {
    const rect = this.contentsRect(x, y, width);
    this.drawContentsBackgroundRect(rect);
  }
};

Window_EnemyBook.prototype.drawContentsBackgroundRect = function(rect) {
    const c1 = ColorManager.itemBackColor1();
    const c2 = ColorManager.itemBackColor2();
    const x = rect.x;
    const y = rect.y;
    const w = rect.width;
    const h = rect.height;
    this.contents.gradientFillRect(x, y, w, h, c1, c2, true);
    this.contents.strokeRect(x, y, w, h, c1);
};

Window_EnemyBook.prototype.contentsRect = function(x, y, width) {
  const height = this.lineHeight() - this.rowSpacing();
  return new Rectangle(x, y + 2, width, height);
};

Window_EnemyBook.prototype.contensHeight = function() {
  return this.lineHeight();
};

Window_EnemyBook.prototype.contensX = function(x) {
  return x + (this.itemPadding() / 2);
};

Window_EnemyBook.prototype.contensWidth = function(width) {
  return width - this.itemPadding();
};

Window_EnemyBook.prototype.numberWidthSlice = function(indexText) {
  return ($gameSystem._enemyBookLength >= 1000 ? ('0000' + indexText).slice(-4) : ('000' + indexText).slice(-3));
};


//Window_EnemyBookPageCategory
function Window_EnemyBookPageCategory() {
  this.initialize(...arguments);
}

Window_EnemyBookPageCategory.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBookPageCategory.prototype.constructor = Window_EnemyBookPageCategory;

Window_EnemyBookPageCategory.prototype.initialize = function(rect) {
  this._userWindowSkin = param.PageWindowsSkin;
  Window_Selectable.prototype.initialize.call(this, rect);
  this._bookList = [];
  this._categorySelect = 0;
  this.maxPageCols = 4;
  this.select(this._categorySelect);
};

Window_EnemyBookPageCategory.prototype.maxCols = function() {
  return this.maxPageCols;
};

Window_EnemyBookPageCategory.prototype.maxItems = function() {
  return this._bookList ? this._bookList.length : 0;
};

Window_EnemyBookPageCategory.prototype.setPageList = function(page, cols) {
  this._bookList = page || [];
  this.maxPageCols = cols;
};

Window_EnemyBookPageCategory.prototype.setPage = function() {
  this._categorySelect = 0;
  this.select(this._categorySelect);
  this.refresh();
};

Window_EnemyBookPageCategory.prototype.drawItem = function(index) {
  const rect = this.itemLineRect(index);
  const text = this._bookList[index].PageCategoryName ? this._bookList[index].PageCategoryName : "ページ"+ Number(index + 1);
  this.drawText(text, rect.x, rect.y, rect.width);
};

Window_EnemyBookPageCategory.prototype.itemClear = function() {
  if (this.contents) {
    this.contents.clear();
    this.contentsBack.clear();
  }
};

Window_EnemyBookPageCategory.prototype.select = function(index) {
  Window_Selectable.prototype.select.call(this, index);
  this.updateEnemyStatus();
};

Window_EnemyBookPageCategory.prototype.updateEnemyStatus = function() {
  if (this.index() >= 0) {
    this._categorySelect = this.index();
  }
  if (this._enemyWindow) {
    this._enemyWindow._pageMode = this._categorySelect;
    this._enemyWindow.refresh();
  }
};

Window_EnemyBookPageCategory.prototype.drawItemBackground = function(index) {
  if(!param.NoCursorBackground) {
    Window_Selectable.prototype.drawItemBackground.call(this, index);
  }
};

Window_EnemyBookPageCategory.prototype.setEnemyWindow = function(enemyWindow) {
  this._enemyWindow = enemyWindow;
};

Window_EnemyBookPageCategory.prototype.cursorDown = function(wrap) {
  
};

Window_EnemyBookPageCategory.prototype.cursorUp = function(wrap) {
  
};

Window_EnemyBookPageCategory.prototype.cursorPagedown = function() {
  
};

Window_EnemyBookPageCategory.prototype.cursorPageup = function() {
  
};

/////////////////////////////////////戦闘/////////////////////////////////////////
const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  _Scene_Battle_createAllWindows.call(this);
  this.createEnemyBookWindow();
};

Scene_Battle.prototype.createEnemyBookWindow = function() {
  this.createEnemyBookBackGroundSprite();
  this.createEnemyBookPercentWindow();
  this.createEnemyPageWindow();
  //this.createEnemyBookDummyWindow();
  this.createEnemyBookIndexWindow();
  this.createEnemyBookInfoIndexWindow();
  this.createEnemyBookEnemyWindow();
  this.createEnemyBookButton();
  if (param.CategoryOn && param.EnemyBookCategory) {
    this.createEnemyBookCategoryNameWindow();
    this.createEnemyBookCategoryWindow();
  }
};

Scene_Battle.prototype.createEnemyBookBackGroundSprite = function() {
  this._enemyBookBackGround = null;
  if (param.BackGroundImg || param.AnalyzeBackGroundImg) {
    const sprite = new Sprite();
    this._enemyBookBackGround = sprite;
    this.addChild(sprite);
    this.loadEnemyBookBackGround();
  }
};

Scene_Battle.prototype.createEnemyBookPercentWindow = function() {
  if (PercentContentLength) {
    const rect = this.percentEnemyBookWindowRect();
    this._enemyBookPercentWindow = new Window_EnemyBook_Percent(rect);
    this.createEnemyBookAddWindow(this._enemyBookPercentWindow, true);
    this._enemyBookPercentWindow.hide();
  }
};

Scene_Battle.prototype.createEnemyBookCategoryNameWindow = function() {
  const rect = this.enemyBookCategoryNameWindowRect();
  this._enemyBookCategoryNameWindow = new Window_EnemyBook_CategoryName(rect);
  this.createEnemyBookAddWindow(this._enemyBookCategoryNameWindow, false);
  this._enemyBookCategoryNameWindow.hide();
};

Scene_Battle.prototype.createEnemyBookCategoryWindow = function() {
  const rect = this.enemyBookIndexWindowRect();
  this._enemyBookCategoryWindow = new Window_EnemyBook_Category(rect);
  this._enemyBookCategoryWindow.setHandler("cancel",this.cancelEnemyBook.bind(this));
  this._enemyBookCategoryWindow.setHandler("ok", this.onEnemyBookCategoryOk.bind(this));
  this.createEnemyBookAddWindow(this._enemyBookCategoryWindow, true);
  this._enemyBookCategoryWindow.hide();
  this._enemyBookIndexWindow.setCategoryWindow(this._enemyBookCategoryWindow);
  this._enemyBookCategoryNameWindow.setCategoryWindow(this._enemyBookCategoryWindow);
};

Scene_Battle.prototype.createEnemyBookIndexWindow = function() {
  const rect = this.enemyBookIndexWindowRect();
  this._enemyBookIndexWindow = new Window_EnemyBook_Index(rect);
  this._enemyBookIndexWindow.setHandler("cancel", this.onEnemyBookIndexCancel.bind(this));
  this.createEnemyBookAddWindow(this._enemyBookIndexWindow, true);
  this._enemyBookIndexWindow.setPercentWindow(this._enemyBookPercentWindow);
  this._enemyBookIndexWindow.hide();
};

Scene_Battle.prototype.createEnemyBookInfoIndexWindow = function() {
  const rect = this.enemyBookInfoIndexWindowRect();
  this._enemyBookInfoIndexWindow = new Window_EnemyBook_InfoIndex(rect);
  this._enemyBookInfoIndexWindow.setHandler("cancel", this.onEnemyBookIndexCancel.bind(this));
  this.createEnemyBookAddWindow(this._enemyBookInfoIndexWindow, true);
  this._enemyBookInfoIndexWindow.hide();
};

Scene_Battle.prototype.createEnemyPageWindow = function() {
  const rect = this.enemyBookPageWindowRect();
  this._enemyBookPageWindow = new Window_EnemyBookPageCategory(rect);
  this._enemyBookPageWindow.setHandler("cancel", this.onEnemyBookIndexCancel.bind(this));
  this.createEnemyBookAddWindow(this._enemyBookPageWindow, true);
  this._enemyBookPageWindow.hide();
  this._enemyBookPageWindow.setPageList(param.PageSetting, param.PageCols);
};
  
Scene_Battle.prototype.createEnemyBookEnemyWindow = function() {
  const rect = this.enemyBookWindowRect();
  this._enemyBookEnemyWindow = new Window_EnemyBook(rect);
  this.createEnemyBookAddWindow(this._enemyBookEnemyWindow, true);
  this._enemyBookIndexWindow.setEnemyWindow(this._enemyBookEnemyWindow);
  this._enemyBookInfoIndexWindow.setEnemyWindow(this._enemyBookEnemyWindow);
  this._enemyBookPageWindow.setEnemyWindow(this._enemyBookEnemyWindow);
  this._enemyBookEnemyWindow.hide();
};

Scene_Battle.prototype.createEnemyBookAddWindow = function(windowDate, openness) {
  if (this._enemyBookBackGround) {
    this.addChild(windowDate);
    windowDate.x += (Graphics.width - Graphics.boxWidth) / 2;
    windowDate.y += (Graphics.height - Graphics.boxHeight) / 2;
    windowDate.opacity = 0;
  } else {
    this.addWindow(windowDate);
    if (openness) {
      windowDate.openness = 0;
    }
  }
};

Scene_Battle.prototype.percentEnemyBookWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
  const wy = this.enemyBookMainAreaTop();
  const ww = Graphics.boxWidth / 3;
  const wh = PercentContentLength ? this.calcWindowHeight(1, true) : 0;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookPageWindowRect = function() {
  const wx = param.WindowMode === 0 ? Graphics.boxWidth / 3 : 0;
  const wy = this.enemyBookMainAreaTop();
  const ww = this.enemyBookWindowWidth();
  const wh = this.calcWindowHeight(1, true);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookIndexWindowRect = function() {
  const height = this.percentEnemyBookWindowRect().height;
  const wx = param.WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
  const wy = this.enemyBookMainAreaTop() + height;
  const ww = Graphics.boxWidth / 3;
  const wh = this.enemyBookMainAreaHeight() - height;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookInfoIndexWindowRect = function() {
  const wx = this._enemyBookIndexWindow.x;
  const wy = this.enemyBookMainAreaTop();
  const ww = this._enemyBookIndexWindow.width;
  const wh = this.enemyBookMainAreaHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookWindowRect = function() {
  const wx = param.WindowMode === 0 ? Graphics.boxWidth / 3 : 0;
  const wy = this.enemyBookMainAreaTop();
  const ww = this.enemyBookWindowWidth();
  const wh = this.enemyBookMainAreaHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookCategoryNameWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
  const wy = this.enemyBookMainAreaTop() + this.percentEnemyBookWindowRect().height;
  const ww = Graphics.boxWidth / 3;
  const wh = this.calcWindowHeight(1, true);
  this._enemyBookIndexWindow.y += wh;
  this._enemyBookIndexWindow.height -= wh;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookWindowWidth = function() {
  return Graphics.boxWidth - Graphics.boxWidth / 3;
};

const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
  _Scene_Battle_createPartyCommandWindow.call(this);
  this._partyCommandWindow.setHandler("enemyBook", this.commandEnemyBook.bind(this));
  this._partyCommandWindow.setHandler("enemyBookInfo", this.commandEnemyBookInfo.bind(this));
};

const _Scene_Battle_hideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows;
Scene_Battle.prototype.hideSubInputWindows = function() {
  _Scene_Battle_hideSubInputWindows.call(this);
  if (this._enemyBookIndexWindow.active || this._enemyBookInfoIndexWindow.active || this._enemyBookPageWindow.active) {
  }
};

const _Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
Scene_Battle.prototype.updateVisibility = function() {
  _Scene_Battle_updateVisibility.call(this);
  if (BattleManager.isBattleEnd() && (this._enemyBookIndexWindow.active || this._enemyBookInfoIndexWindow.active || this._enemyBookPageWindow.active)) {
    this.cancelEnemyBook();
  }
};

Scene_Battle.prototype.openyBookEnemyRefresh = function() {
  this._enemyBookEnemyWindow.show();
  this._enemyBookEnemyWindow.open();
  this._enemyBookEnemyWindow.refresh();
};

Scene_Battle.prototype.commandEnemyBook = function() {
  enemyBook_Open = true;
  let CategoryOn = false;
  this.setMaxPage(param.PageSetting);
  this._enemyBookPageWindow.setPageList(param.PageSetting, param.PageCols);
  this._enemyBookPageWindow.setPage();

  this._enemyBookPageWindow.interruptWindow = true;
  this._enemyBookIndexWindow.interruptWindow = true;
  if (param.CategoryOn && param.EnemyBookCategory) {
    this.enemyBookCategorySelection();
    CategoryOn = true;
    this._enemyBookCategoryWindow.interruptWindow = true;
  } else {
    this.enemyBookIndexSelection();
  }
  this._enemyBookEnemyWindow._bookMode = 0;
  this.setButtonY();
  this.setEnemyBookBackGround();
  this._enemyBookEnemyWindow.x = (param.WindowMode === 0 ? Graphics.boxWidth / 3 : 0) + (this._enemyBookBackGround ? (Graphics.width - Graphics.boxWidth) / 2 : 0);
  const pageLength = this._enemyBookPageWindow._bookList.length;
  const rect = this.enemyBookWindowRect();
  this._enemyBookPageWindow.x = this._enemyBookEnemyWindow.x;
  this._enemyBookEnemyWindow.y = rect.y + (pageLength > 1 ? this._enemyBookPageWindow.height : 0) + (this._enemyBookBackGround ? (Graphics.height - Graphics.boxHeight) / 2 : 0);
  this._enemyBookEnemyWindow.height = rect.height - (pageLength > 1 ? this._enemyBookPageWindow.height : 0);
  if (PercentContentLength) {
    this._enemyBookPercentWindow.show();
    this._enemyBookPercentWindow.open();
  }
  if (pageLength > 1) {
    this._enemyBookPageWindow.show();
    this._enemyBookPageWindow.open();
    if (CategoryOn) {
      //this._enemyBookPageWindow.itemClear();
      //this._enemyBookPageWindow.deselect();
    }
  }
  this.openyBookEnemyRefresh();
};



Scene_Battle.prototype.commandEnemyBookInfo = function() {
  enemyBook_Open = true;
  const infoPage = param.InfoMode === 0 ? param.PageSetting : param.InfoPageSetting;
  const cols = param.InfoMode === 0 ? param.PageCols : param.InfoPageCols;
  this.setMaxPage(infoPage);
  this._enemyBookPageWindow.setPageList(infoPage, cols);
  this._enemyBookPageWindow.setPage();
  this._enemyBookPageWindow.interruptWindow = true;
  this._enemyBookInfoIndexWindow.interruptWindow = true;
  this._enemyBookInfoIndexWindow.refresh();
  this._enemyBookInfoIndexWindow.show();
  this._enemyBookInfoIndexWindow.open();
  this._enemyBookInfoIndexWindow.activate();
  this._enemyBookPageWindow.activate();
  this._enemyBookEnemyWindow._bookMode = 2;
  this.setButtonY();
  this.setEnemyBookBackGround();
  this._enemyBookEnemyWindow.x = (param.WindowMode === 0 ? Graphics.boxWidth / 3 : 0) + (this._enemyBookBackGround ? (Graphics.width - Graphics.boxWidth) / 2 : 0);
  const pageLength = this._enemyBookPageWindow._bookList.length;
  const rect = this.enemyBookWindowRect();
  this._enemyBookPageWindow.x = this._enemyBookEnemyWindow.x;
  this._enemyBookEnemyWindow.y = rect.y + (pageLength > 1 ? this._enemyBookPageWindow.height : 0) + (this._enemyBookBackGround ? (Graphics.height - Graphics.boxHeight) / 2 : 0);
  this._enemyBookEnemyWindow.height = rect.height - (pageLength > 1 ? this._enemyBookPageWindow.height : 0);
  if (pageLength > 1) {
    this._enemyBookPageWindow.show();
    this._enemyBookPageWindow.open();
  }
  this.openyBookEnemyRefresh();
};

Scene_Battle.prototype.cancelEnemyBook = function() {
  enemyBook_Open = false;
  this._enemyBookPageWindow.interruptWindow = false;
  this._enemyBookIndexWindow.interruptWindow = false;
  this._enemyBookInfoIndexWindow.interruptWindow = false;
  this._enemyBookIndexWindow.close();
  this._enemyBookInfoIndexWindow.close();
  this._enemyBookEnemyWindow.close();
  this._enemyBookPageWindow.close();
  if (PercentContentLength) {
    this._enemyBookPercentWindow.close();
  }
  if (param.CategoryOn && param.EnemyBookCategory) {
    this._enemyBookCategoryWindow.interruptWindow = false;
    this._enemyBookCategoryWindow.close();
  }
  if (this._enemyBookBackGround) {
    this._enemyBookBackGround.hide();
  }
  this._enemyBookEnemyWindow._enemySprite.hide();
  if (this._enemyBookEnemyWindow._bookMode === 0) {
    this._partyCommandWindow.activate();
    this._enemyBookIndexWindow.deactivate();
    this._enemyBookEnemyWindow.selectEnemy = null;
  } else if (this._enemyBookEnemyWindow._bookMode === 2) {
    this._partyCommandWindow.activate();
    this._enemyBookInfoIndexWindow.deactivate();
    this._enemyBookEnemyWindow.selectEnemy = null;
  } else {
    this._enemyBookEnemyWindow.setEnemy(null);
    this._enemyBookPageWindow.deactivate();
    this._enemyBookEnemyWindow.setAnalyzeStatus(null);
  }
  this._enemyBookEnemyWindow._bookMode = 0;
};

Scene_Battle.prototype.enemyBookEnemyAnalyze = function(args) {
  enemyBook_Open = true;
  this._enemyBookPageWindow.interruptWindow = true;
  //this.userWindowDeactivate();
  this._enemyBookEnemyWindow._enemy = null;
  this._enemyBookEnemyWindow.setAnalyzeStatus(args);
  this._enemyBookEnemyWindow._bookMode = 1;
  this.setButtonY();
  this.setEnemyBookBackGround();
  this.setAnalyzeDate(args);  
  this._enemyBookEnemyWindow.x = ((Graphics.boxWidth - this._enemyBookEnemyWindow.width) / 2) + (this._enemyBookBackGround ? (Graphics.width - Graphics.boxWidth) / 2 : 0);
  const pageLength = this._enemyBookPageWindow._bookList.length;
  const rect = this.enemyBookWindowRect();
  this._enemyBookPageWindow.x = this._enemyBookEnemyWindow.x;
  this._enemyBookEnemyWindow.y = rect.y + (pageLength > 1 ? this._enemyBookPageWindow.height : 0) + (this._enemyBookBackGround ? (Graphics.height - Graphics.boxHeight) / 2 : 0);
  this._enemyBookEnemyWindow.height = rect.height - (pageLength > 1 ? this._enemyBookPageWindow.height : 0);
  this._enemyBookPageWindow.activate();
  this._enemyBookPageWindow.show();
  this._enemyBookPageWindow.open();
  this._enemyBookEnemyWindow.show();
  this._enemyBookEnemyWindow.open();
  this._enemyBookEnemyWindow.selectEnemy = BattleManager.analyzeTarget;
  const enemy = BattleManager.analyzeTarget.enemy();
  if (!$gameSystem.isInEnemyBook(enemy) && ($gameSystem.registrationTiming() === 2 || $gameSystem.registrationTiming() === 3)) {
    $gameSystem.addToEnemyBook(enemy.id);
  }
  if (!$gameSystem.isInEnemyBookStatus(enemy) && ($gameSystem.registrationStatusTiming() === 2 || $gameSystem.registrationStatusTiming() === 3)) {
    $gameSystem.addStatusToEnemyBook(enemy.id);
  }
  this._enemyBookPageWindow.refresh();
  this._enemyBookEnemyWindow.setEnemy(enemy);
};

Scene_Battle.prototype.setAnalyzeDate = function(args) {
  let list = null;
  if (args.Mode === 0) {
    list = param.PageSetting;
  } else if (args.Mode === 1) {
    list = param.AnalyzePageList1;
  } else if (args.Mode === 2) {
    list = param.AnalyzePageList2;
  } else if (args.Mode === 3) {
    list = param.AnalyzePageList3;
  }
  this.setMaxPage(list);
  this._enemyBookPageWindow.setPageList(list, args.PageCols);
  this._enemyBookPageWindow.setPage();
};

Scene_Battle.prototype.createEnemyBookButton = function() {
  if(ConfigManager.touchUI) {
    this._EnemyBook_cancelButton = new Sprite_Button("cancel");
    this._EnemyBook_cancelButton.x = Graphics.boxWidth - this._EnemyBook_cancelButton.width - 4;
    this._EnemyBook_cancelButton.y = 0;
    if (this._enemyBookBackGround) {
      this.addChild(this._EnemyBook_cancelButton);
      this._EnemyBook_cancelButton.x += (Graphics.width - Graphics.boxWidth) / 2;
    } else {
      this.addWindow(this._EnemyBook_cancelButton);
    }
    this.updatePageupdownButton();
  }
};

Scene_Battle.prototype.setButtonY = function() {
  if (this._EnemyBook_cancelButton) {
    this._EnemyBook_cancelButton.y = this.buttonY() + (this._enemyBookBackGround ? (Graphics.height - Graphics.boxHeight) / 2 : 0);
  }
};

Scene_Battle.prototype.loadEnemyBookBackGround = function() {
  if (this._enemyBookBackGround) {
    this._enemyBookBackBitmap = ImageManager.nuun_LoadPictures(param.BackGroundImg);
    this._analyzeBackBitmap = ImageManager.nuun_LoadPictures(param.AnalyzeBackGroundImg);
    this._enemyBookBackGround.hide();
  }
};

Scene_Battle.prototype.setEnemyBookBackGround = function() {
  if (!this._enemyBookBackGround) {
    return;
  }
  let bitmap = null;
  if (this._enemyBookEnemyWindow._bookMode === 0 || this._enemyBookEnemyWindow._bookMode === 2) {
    bitmap = this._enemyBookBackBitmap;
  } else if (this._enemyBookEnemyWindow._bookMode === 1) {
    bitmap = this._analyzeBackBitmap;
  }
  this._enemyBookBackGround.bitmap = bitmap;
  this._enemyBookBackGround.show();
  if (bitmap && !bitmap.isReady()) {
    bitmap.addLoadListener(this.setBackGround.bind(this));
  } else {
    this.setBackGround();
  }
};

Scene_Battle.prototype.setBackGround = function() {
  const sprite = this._enemyBookBackGround;
  if (param.BackUiWidth) {
    sprite.x = (Graphics.width - (Graphics.boxWidth + 8)) / 2;
    sprite.y = (Graphics.height - (Graphics.boxHeight + 8)) / 2;
    sprite.scale.x = (Graphics.boxWidth + 8 !== sprite.bitmap.width ? (Graphics.boxWidth + 8) / sprite.bitmap.width : 1);
    sprite.scale.y = (Graphics.boxHeight + 8!== sprite.bitmap.height ? (Graphics.boxHeight + 8) / sprite.bitmap.height : 1);
  } else {
    sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
    sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
  }
};

Scene_Battle.prototype.updatePageupdownButton = function() {
  if (this._EnemyBook_cancelButton) {
    this._EnemyBook_cancelButton.visible = this._enemyBookIndexWindow.active || this._enemyBookPageWindow.active || this._enemyBookInfoIndexWindow.active || 
    (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active) ? true : false;
  }
};

const _Scene_Battle_updateCancelButton = Scene_Battle.prototype.updateCancelButton;
Scene_Battle.prototype.updateCancelButton = function() {
  if (this._cancelButton) {
    _Scene_Battle_updateCancelButton.call(this);
    this._cancelButton.visible = this._cancelButton.visible && !this._EnemyBook_cancelButton.visible;
  }
};

Scene_Battle.prototype.setMaxPage = function(page) {
  page = page || [];
  this._enemyBookMaxPage = page.length;
  this._enemyBookEnemyWindow.displayList = page;
};

Scene_Battle.prototype.getMaxPage = function() {
  return this._enemyBookMaxPage;
};

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  this.updatePageupdownButton();
};

const _Scene_Battle_buttonY = Scene_Battle.prototype.buttonY;
Scene_Battle.prototype.buttonY = function() {
  const y = _Scene_Battle_buttonY.call(this);
  if ((this._enemyBookIndexWindow && this._enemyBookIndexWindow.active) || 
  (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active) || 
  (this._enemyBookInfoIndexWindow && this._enemyBookInfoIndexWindow.active)) {
    return y - this._helpWindow.height;
  }
  return y;
};

const _Scene_Battle_isAnyInputWindowActive  = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
  return this._enemyBookIndexWindow.active || this._enemyBookInfoIndexWindow.active || this._enemyBookPageWindow.active || (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active) || _Scene_Battle_isAnyInputWindowActive.call(this);
};

const _Scene_Battle_isTimeActive = Scene_Battle.prototype.isTimeActive;
Scene_Battle.prototype.isTimeActive = function() {
  const result = !this._enemyBookIndexWindow.active && !this._enemyBookInfoIndexWindow.active && !this._enemyBookPageWindow.active &&  _Scene_Battle_isTimeActive.call(this);
  if (param.CategoryOn && param.EnemyBookCategory) {
    return result && (this._enemyBookCategoryWindow && !this._enemyBookCategoryWindow.active);
  }
  return result;
};

Scene_Battle.prototype.enemyBookMainAreaTop = function() {
  const y = 0;
  if (param.NoTouchUIWindow && !ConfigManager.touchUI) {
    return y;
  }
  return y + this.buttonAreaHeight();
};

Scene_Battle.prototype.enemyBookMainAreaHeight = function() {
  return Graphics.boxHeight - this.enemyBookMainAreaTop();
};

Scene_Battle.prototype.onEnemyBookIndexCancel = function() {
  if (this._enemyBookEnemyWindow._bookMode === 0) {
    if (param.CategoryOn && param.EnemyBookCategory) {
      this._enemyBookIndexWindow.updateIndex();
      this.enemyBookCategorySelection();
    } else {
      this.cancelEnemyBook();
    }
  } else {
    this.cancelEnemyBook();
  }
  
};

Scene_Battle.prototype.onEnemyBookCategoryOk = function() {
  this._enemyBookIndexWindow.setCategory();
  this.enemyBookIndexSelection();
};

Scene_Battle.prototype.enemyBookIndexSelection = function() {
  this._enemyBookIndexWindow.show();
  if (param.CategoryOn && param.EnemyBookCategory) {
    this._enemyBookCategoryWindow.hide();
    this._enemyBookCategoryNameWindow.show();
    this._enemyBookCategoryWindow.deselect();
    this._enemyBookCategoryWindow.deactivate();
    this._enemyBookCategoryNameWindow.setName(this._enemyBookCategoryWindow.index());
    this._enemyBookIndexWindow.openness = 255;
  }
  this._enemyBookIndexWindow.refresh();
  this._enemyBookIndexWindow.open();
  this._enemyBookIndexWindow.activate();
  this._enemyBookPageWindow.setPage();
  this._enemyBookPageWindow.activate();
};

Scene_Battle.prototype.enemyBookCategorySelection = function() {
  this._enemyBookCategoryWindow.setSelect();
  this._enemyBookCategoryWindow.show();
  this._enemyBookCategoryWindow.open();
  this._enemyBookCategoryNameWindow.hide();
  this._enemyBookIndexWindow.hide();
  this._enemyBookCategoryWindow.activate();
  this._enemyBookIndexWindow.deselect();
  this._enemyBookIndexWindow.deactivate();
  this._enemyBookPageWindow.deselect();
  this._enemyBookPageWindow.deactivate();
  this._enemyBookPageWindow.itemClear();
};

const _Window_Selectable_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(rect) {
  _Window_Selectable_initialize.call(this, rect);
  this.interruptWindow = false;
};

const _Window_Selectable_isOpenAndActive = Window_Selectable.prototype.isOpenAndActive;
Window_Selectable.prototype.isOpenAndActive = function() {
  if (enemyBook_Open && $gameParty.inBattle()) {
    return this.interruptWindow && this.active ? _Window_Selectable_isOpenAndActive.call(this) : false;
 }
  return _Window_Selectable_isOpenAndActive.call(this);
};

const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
  _Window_PartyCommand_makeCommandList.call(this);
  if (this.isEnemyBook()) {
    this.addCommand(param.CommandName, "enemyBook");
  }
  if (this.isEnemyInfo()) {
    this.addCommand(param.EnemyInfoCommandName, "enemyBookInfo");
  }
};

Window_Command.prototype.isEnemyBook = function() {
  return param.ShowBattleCommand && ($gameSwitches.value(param.enemyBookBattleSwitch) || param.enemyBookBattleSwitch === 0);
};

Window_Command.prototype.isEnemyInfo = function() {
  return param.ShowEnemyInfoCommand && ($gameSwitches.value(param.enemyBookInfoSwitch) || param.enemyBookInfoSwitch === 0);
};

const _Window_BattleLog_displayMiss =Window_BattleLog.prototype.displayMiss;
Window_BattleLog.prototype.displayMiss = function(target) {
  let fmt;
  if (BattleManager.analyzeMissMessage) {
    fmt = BattleManager.analyzeMissMessage;
    BattleManager.analyzeMissMessage = null;
    this.push("addText", fmt);
  } else {
    _Window_BattleLog_displayMiss.call(this, target);
  }
};

const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.analyzeMissMessage = null;
  BattleManager.analyzeTarget = null;
};

const _BattleManager_isBusy = BattleManager.isBusy;
BattleManager.isBusy = function() {
  return this.enemyBookIsBusy() || _BattleManager_isBusy.call(this);
};

BattleManager.enemyBookIsBusy = function() {
  return enemyBook_Open;
};

const _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
  _BattleManager_startAction.call(this);
  this.setEnemyBookAction();
};

BattleManager.setEnemyBookAction = function() {
  const subject = this._subject;
  if (subject.isEnemy() && this._action) {
    const actionId = subject.enemy().actions.findIndex(action => action.skillId === this._action.item().id);
    $gameSystem.setEnemyBookActionFlag(subject.enemyId(), actionId, true);
  }
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
  }  else if (this._statusType === 'tp') {
    return param.TPgaugeWidth > 0 ? param.TPgaugeWidth : 128;
  }
  return 999;
};


function Sprite_BookEnemy() {
  this.initialize(...arguments);
}

Sprite_BookEnemy.prototype = Object.create(Sprite.prototype);
Sprite_BookEnemy.prototype.constructor = Sprite_BookEnemy;

Sprite_BookEnemy.prototype.initialize = function() {
  Sprite.prototype.initialize.call(this);
  this.initMembers();
};

Sprite_BookEnemy.prototype.initMembers = function() {
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this._battler = null;
  this._svEnemy = false;
  this.maxWidth = 0;
  this.hide();
};

Sprite_BookEnemy.prototype.setup = function(battler,x, y) {
  this._battler = battler;
  this.x = x;
  this.y = y;
  this._svEnemy = battler.enemy().meta.EB_SVBattler ? true : false;
  this.refresh();
};

Sprite_BookEnemy.prototype.refresh = function() {
  let bitmap = null;
  if (this._svEnemy) {
    const sv_name = this.enemySVBattlerName();
    bitmap = ImageManager.loadSvActor(sv_name);
  } else {
    const name = this.enemyBattlerName();
    if ($gameSystem.isSideView()) {
      bitmap = ImageManager.loadSvEnemy(name);
    } else {
      bitmap = ImageManager.loadEnemy(name);
    }
  }
  this.bitmap = bitmap;
  this.show();
  if (bitmap && !bitmap.isReady()) {
    bitmap.addLoadListener(this.drawEnemy.bind(this));
  } else {
    this.drawEnemy();
  }
};

Sprite_BookEnemy.prototype.drawEnemy = function() {
  if (!this.bitmap) {
    return;
  }
  if (this._svEnemy) {
    this._pattern = 0;
    this._motionCount = 0;
    this.scale.x = param.SVEnemyMirror ? -1 : 1;
    this.scale.y = 1;
    this.setSvActor();
  } else {
    const hue = this._battler.battlerHue();
    Sprite_Battler.prototype.setHue.call(this, hue);
    const bitmapWidth = this.bitmap.width;
    const bitmapHeight = this.bitmap.height;
    const contentsWidth = this.maxWidth;
    const contentsHeight = this.maxHeight;
    let scale = 1.0;
    if (bitmapHeight > contentsHeight) {
      scale = Math.min((contentsHeight / bitmapHeight), 1.0);
    }
    if (bitmapWidth > contentsWidth) {
      scale = Math.min((contentsWidth / bitmapWidth), scale);
    }
    this.scale.x = scale;
    this.scale.y = scale;
    this.setFrame(0, 0, this.bitmap.width, this.bitmap.height);
  }
};

Sprite_BookEnemy.prototype.update = function() {
  if (this.bitmap && this._svEnemy) {
    if (++this._motionCount >= this.motionSpeed()) {
      this._pattern = (this._pattern + 1) % 4;
      this.setSvActor();
      this._motionCount = 0;
    }
  } else if (!this.bitmap && this._svEnemy) {
    this._svEnemy = false;
  }
};

Sprite_BookEnemy.prototype.setSvActor = function() {
  const motionIndex = this._battler.enemy().meta.EB_SVBattlerMotion ? Number(this._battler.enemy().meta.EB_SVBattlerMotion) : 0;
  const pattern = this._pattern < 3 ? this._pattern : 1;
  const cw = this.bitmap.width / 9;
  const ch = this.bitmap.height / 6;
  const cx = Math.floor(motionIndex / 6) * 3 + pattern;
  const cy = motionIndex % 6;
  this.setFrame(cx * cw, cy * ch, cw, ch);
  const hue = this._battler.battlerHue();
  Sprite_Battler.prototype.setHue.call(this, hue);
};

Sprite_BookEnemy.prototype.motionSpeed = function() {
  return 12;
};

Sprite_BookEnemy.prototype.enemyBattlerName = function() {
	return this._battler.battlerName();
};

Sprite_BookEnemy.prototype.enemySVBattlerName = function() {
	return this._battler.enemy().meta.EB_SVBattler;
};

Sprite_BookEnemy.prototype.resetSVEnemy = function() {
  this._svEnemy = false;
};

Sprite_BookEnemy.prototype.setMaxWidth = function(width) {
  this.maxWidth = width;
};

Sprite_BookEnemy.prototype.setMaxHeight = function(height) {
  this.maxHeight = height;
};

if (NRP_pLoopLR) {
  Window_EnemyBookPageCategory.prototype.cursorRight = function(wrap) {
    const index = this.index();
    const maxItems = this.maxItems();
    const maxCols = this.maxCols();
    const horizontal = this.isHorizontal();
    if (maxCols >= 2 && (index < maxItems - 1 || (wrap && horizontal))) {
        this.smoothSelect((index + 1) % maxItems);
    }
  };

  Window_EnemyBookPageCategory.prototype.cursorLeft = function(wrap) {
    const index = Math.max(0, this.index());
    const maxItems = this.maxItems();
    const maxCols = this.maxCols();
    const horizontal = this.isHorizontal();
    if (maxCols >= 2 && (index > 0 || (wrap && horizontal))) {
        this.smoothSelect((index - 1 + maxItems) % maxItems);
    }
  };
}

function Game_EnemyBookCharacter() {
  this.initialize(...arguments);
}

Game_EnemyBookCharacter.prototype = Object.create(Game_Character.prototype);
Game_EnemyBookCharacter.prototype.constructor = Game_EnemyBookCharacter;

Game_EnemyBookCharacter.prototype.initialize = function(id) {
  Game_Character.prototype.initialize.call(this);
  this._enemyId = id;
  this.setStepAnime(true);
  this.refresh();
};

Game_EnemyBookCharacter.prototype.refresh = function() {
  const enemy = $dataEnemies[this._enemyId];
  if (enemy && enemy.meta.EnemyBookCharacter) {
    const data = enemy.meta.EnemyBookCharacter.split(',');
    const characterName = String(data[0]);
    const characterIndex = Number(data[1]);
    this.setImage(characterName, characterIndex);
    this.setDirection(Number(data[2]) || 0);
  } else {
    this.setImage("", 0);
  }
};

Game_EnemyBookCharacter.prototype.setPosition = function(x, y) {
  this._bookEnemyX = x;
  this._bookEnemyY = y;
};

Game_EnemyBookCharacter.prototype.screenX = function() {
  return this._bookEnemyX;
};

Game_EnemyBookCharacter.prototype.screenY = function() {
  return this._bookEnemyY;
};

function Sprite_EnemyBookCharacter() {
  this.initialize(...arguments);
}

Sprite_EnemyBookCharacter.prototype = Object.create(Sprite_Character.prototype);
Sprite_EnemyBookCharacter.prototype.constructor = Sprite_EnemyBookCharacter;

Sprite_EnemyBookCharacter.prototype.initialize = function(character) {
  Sprite_Character.prototype.initialize.call(this, character);
};

Sprite_EnemyBookCharacter.prototype.setCharacter = function(character) {
  this._character = character;
};

Sprite_EnemyBookCharacter.prototype.update = function() {
  if (this.visible) {
  Sprite_Character.prototype.update.call(this);
    this._character.updateAnimation();
  }
};
})();