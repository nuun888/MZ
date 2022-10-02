/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBook.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc モンスター図鑑
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 2.14.0
 * 
 * @help
 * モンスター図鑑を実装します。
 * このプラグインではモンスター情報の表示内容を自由にカスタマイズする事が出来ます。
 * 
 * 機能
 * 図鑑：モンスターの情報を確認できます。戦闘中でも表示できます。
 * 敵の情報：現在戦っているモンスターの情報を確認できます。
 * アナライズ：指定のモンスターの情報を確認します。
 * 
 * モンスター情報の登録
 * プラグインパラメータの「図鑑登録設定」で設定します。
 * 戦闘開始時：戦闘開始時に出現モンスターを図鑑に登録します。
 * 撃破時：倒したときにそのモンスターを図鑑に登録します。
 * アナライズ時：アナライズ成功時に図鑑に登録します。
 * 戦闘終了時：戦闘終了時に出現モンスターを図鑑に登録します。
 * ステータス情報登録をOFFにしている場合は、項目設定で情報未登録ステータス表示をONにしている該当の項目で
 * ステータス情報登録をONにしている場面で図鑑に登録しない限り表示が？等で表示されます。
 * 例
 * 戦闘開始時に図鑑に登録し、撃破時にステータス情報を登録
 * リストで戦闘終了時(ステータス情報登録OFF)と撃破時(ステータス情報登録ON)を設定します。
 * アナライズ成功時に全て登録
 * リストでアナライズ時(ステータス情報登録ON)を設定します。
 * 
 * 敵キャラのメモ欄
 * 記述欄のテキスト　制御文字が使用可能です。
 * <[tag]:[text]> 記述欄のテキスト
 * [tag]:記述欄タグ名　デフォルト設定だとモンスターの説明を記述するタグはdescに設定されています。
 * [text]:表示するテキスト。
 * 改行すれば何行でも表示可能ですので、独自の項目を追加することも可能です。
 * <desc1:ああああ> descとタグ付けされた項目に「ああああ」が表示されます。
 * デフォルト設定では2ページ目に表示される項目にdescが設定されていますので、文章を表示させる場合は<desc:[text]>と記入してください。
 * 
 * モンスター別画像の表示
 * <[tag]:[img],[x],[y]> ページ内に表示させる任意の画像を指定します。
 * [tag]:モンスター個別画像タグ名（記述欄、個別指定画像タグで設定します）
 * [img]:画像パス(拡張子なし)　
 * 個別指定画像フォルダが'pictures'ならimg/pictures直下のファイルを拡張子なしで記入してください。
 * サブフォルダーから取得する場合はサブフォルダー名も記入してください。例 items/tankobu
 * [x]:x座標(相対)
 * [y]:y座標(相対)
 * 複数画像を指定したい場合は項目リストで表示する分だけ設定し、記述欄、個別指定画像タグ名で別々の名前で設定してください。
 * デフォルトの設定ではpicturesフォルダーが指定されています。
 * モンスター個別画像はモンスター毎に異なる任意の画像を表示させるための機能です。モンスター画像を表示させる場合はモンスター画像で表示させてください。
 * 
 * モンスターの図鑑登録
 * <NoBook>
 * モンスター図鑑に登録(表示)されません。
 * <NoBookData>
 * モンスター図鑑に登録(表示)されませんが、敵の情報、アナライズのみ表示されます。
 * <ShowDataBook>
 * 未撃破でも撃破済みと判定されます。また情報がすべて表示されます。
 * <AnalyzeResist:50> アナライズの抵抗値を設定します。この場合５０％の確率でアナライズが成功します。
 * <EnemyIcon:[iconid]>
 * モンスター名の左にアイコンを表示させることが出来ます。
 * <EnemyIcon:120> アイコンID120番のアイコンが表示されます。
 * <NoTransformInData> 変身時に撃破扱いに図鑑に登録しません。（変身前撃破をONにしている時のみ）
 * 
 * スキル、アイテムのメモ欄
 * <AnalyzeSkill:[id]> アナライズを発動します。
 * [id]:アナライズスキル設定のリスト番号
 * <AnalyzeSkill:1> このスキル、アイテムはアナライズスキルとし、「アナライズスキル設定」の１番の設定で発動します。
 * 
 * <CertainAnalyze> アナライズ耐性を無視します。
 * 
 * <EnemyInfo> 敵の情報を表示します。
 * 
 * アイテムのメモ欄
 * <NoDropProbability>
 * このタグを記入したアイテムはドロップアイテムの確率表示を表示しません。
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
 * アナライズスキル設定の失敗時のメッセージ
 * %1:ターゲット名
 * %2:使用者名
 * 「%2はアナライズに失敗した。」の時、スキル使用者がリードの場合は「リードはアナライズに失敗した。」と表示されます。
 * 
 * サイドビュー(項目設定のサイドビューエネミー表示時に指定されます)
 * <EB_SVBattler:[fileName]> モンスター画像をサイドビュー画像で表示させます。(モンスターにサイドビューアクターを表示する系のプラグイン導入が前提としています)
 * [fileName]:ファイル名　サイドビューバトラー画像を指定します。sv_actorsフォルダ内のファイル名を拡張子なしで指定してください。
 * <EB_SVBattlerMotion:[motionId]> 指定したモーションで表示させます。記入なしの場合は0のモーションで表示されます。
 * [motionId]:0～17モーションID(数値で入力)
 * 
 * キャラクター(項目設定のキャラクター指定時に表示されます)
 * <EnemyBookCharacter:[failName],[id],[direction]> キャラチップを表示します。指定していないモンスターには表示されません。
 * [failName]:ファイル名　charactersフォルダ内のファイル名を拡張子なしで指定してください。
 * [id]:キャラチップのインデックス番号。3×4のキャラチップは0になります。
 * [direction]:方向を指定します。2正面（一番上） 4左（２番目） 6右（３番目） 8後向き（一番下）　※省略可能
 * 
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
 * 敵の属性耐性弱点確認済み　　　敵の属性耐性弱点を確認済みにします。0で全て確認済みにします。(要NUUN_EnemyBookEX_1)
 * 敵の属性耐性弱点未確認　　　　敵の属性耐性弱点を未確認にします。0で全て未確認にします。(要NUUN_EnemyBookEX_1)
 * 敵のステート耐性弱点確認済み　敵のステート耐性弱点を確認済みにします。0で全て確認済みにします。(要NUUN_EnemyBookEX_1)
 * 敵のステート耐性弱点未確認　　敵のステート耐性弱点を未確認にします。0で全て未確認にします。(要NUUN_EnemyBookEX_1)
 * 敵のデバフ耐性弱点確認済み　　敵のデバフ耐性弱点を確認済みにします。0で全て確認済みにします。(要NUUN_EnemyBookEX_1)
 * 敵のデバフ耐性弱点未確認　　　敵のデバフ耐性弱点を未確認にします。0で全て未確認にします。(要NUUN_EnemyBookEX_1)
 * 
 * パラメータ参照変数
 * this._enemyまたはde　データベースのモンスターデータを取得します。
 * this._enemy.meta メタタグを取得します。
 * enemyまたはGame_Enemyのデータを取得します。
 * 
 * スティールアイテムを有効にするにはNUUN_StealableItemsが必要です。
 * 条件付きアイテムを有効にするにはNUUN_EnemyBookEX_2及びNUUN_ConditionalDropsがが必要です。
 * レーダーチャートを有効にするにはNUUN_RadarChartBaseが必要です。
 * ステート、属性、バフ耐性マスク機能を有効にするにはNUUN_EnemyBookEX_1が必要です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/10/2 Ver.2.14.0
 * 図鑑登録時の設定の仕様を変更。
 * ドロップアイテム、スティールアイテム、条件付きアイテム、敵のスキル、属性耐性、ステート耐性の列指定の仕様変更。
 * プラグインパラメータの整理。
 * スティールアイテムが正常に表示されなかった問題を修正。
 * アナライズの設定の仕様を変更。
 * <NoBook>と<NoBookData>の仕様変更。
 * カテゴリー選択時の背景画像を指定できるように変更。
 * 2022/7/30 Ver.2.13.4
 * 図鑑に表示しない名前を指定できる機能を追加。
 * コンテンツ背景の表示なしの時に、項目の表示がわずかにずれて表示される問題を修正。
 * 2022/6/15 Ver.2.13.3
 * 評価式に文字列を記入したときにNaNと表示されてしまう問題を修正。
 * 2022/6/13 Ver.2.13.2
 * 属性耐性一覧に物理ダメージ率と魔法ダメージ率を表示できる機能を追加。
 * 2022/6/5 Ver.2.13.1
 * 一部の処理を修正。
 * 2022/5/5 Ver.2.13.0
 * 盗みスキル率の表示を評価式形式に変更。
 * ドロップアイテム、盗みアイテムで確立を表示しない場合、アイテムの表示が不自然になる問題を修正。
 * ドロップアイテム、各項目の評価式記入の仕様を変更。
 * 図鑑のプリセットを変更。
 * 2022/4/2 Ver.2.12.1
 * 図鑑データセーブ共有化による処理追加。
 * 2022/3/4 Ver.2.12.0
 * 属性、ステート耐性を百分率で表示する機能を追加。
 * 図鑑登録のパターンによっては戦闘開始時にエラーが起きる問題を修正。
 * 2022/1/29 Ver.2.11.2
 * ドロップアイテム率の表示の仕様を変更。
 * 2022/1/24 Ver.2.11.1
 * 敵の詳細ページウィンドウを表示させない機能を追加。
 * 2022/1/24 Ver.2.11.0
 * プラグインパラメータを整理。
 * オリジナルパラメータの仕様変更。
 * モンスター詳細ページのプリセットの変更。
 * 項目フォントサイズを指定できる機能を追加。
 * 戦闘終了時に登録する機能を追加。
 * 登録時の処理を修正。
 * 2022/1/1 Ver.2.10.4
 * 戦闘中に情報ページの横幅指定時に敵の情報を開くと表示がずれる問題を修正。
 * カテゴリーのナンバー表記がおかしくなる問題を修正。
 * カテゴリー名が別のカテゴリー名で表示される問題を修正。
 * 2021/12/31 Ver.2.10.3
 * 表示していないカテゴリーを選択できてしまう問題を修正。
 * モンスターカテゴリーを強制的に左揃えにするように修正。
 * 2021/12/25 Ver.2.10.2
 * 単位を空白で設定したときにnullが表示されてしまう問題を修正。
 * 2021/12/25 Ver.2.10.1
 * ページカテゴリー、敵のカテゴリーをコマンド化。
 * 条件付きドロップアイテム図鑑表示併用時エラーが出る問題を修正。
 * 2021/12/22 Ver.2.10.0
 * 未確認ドロップアイテム、スティールアイテム名、使用スキル名を隠すをOFFにした時、フラグ処理を行わないように変更。
 * 条件付きドロップアイテムを表示する機能を追加。
 * 2021/12/12 Ver.2.9.6
 * メインウィンドウ（モンスターの情報を表示）の横幅を設定できる機能を追加。
 * 2021/12/11 Ver.2.9.5
 * 追加、特殊能力値に小数点数を指定できる機能を追加。
 * 2021/11/10 Ver.2.9.4
 * 使用していないプラグインパラメータを削除。
 * 2021/11/9 Ver.2.9.3
 * カラーコードに対応。
 * 評価式でのモンスターデータの参照方法を変更。
 * 敵の情報で背景を設定したときにモンスターリストの位置がズレる問題を修正。
 * 背景の表示方法を変更。
 * 2021/11/3 Ver.2.9.2
 * アナライズに成功して、別のスキルを実行しミスしたときにアナライズの失敗時のメッセージが表示される問題を修正。
 * 2021/9/27 Ver.2.9.1
 * 敵の情報に情報登録しているエネミー名に色を付けれる機能を追加。
 * 敵の情報の登録済みエネミー名の色の反映を登録タイミングに関係なく反映するように変更。
 * ナンバー表示をカテゴリー順に表示させる機能を追加。
 * 2021/9/26 Ver.2.9.0
 * 背景画像はページ、アナライズ、敵の情報毎に設定できるように変更。
 * 敵の情報に登録タイミングを反映させるように変更。
 * 敵の情報に登録しているエネミー名に色を付けれる機能を追加。
 * 背景画像を指定して敵の情報を開いた後に閉じるとモンスターの画像が残ってしまう問題を修正。
 * 2021/9/2 Ver.2.8.1
 * モンスター毎の個別画像の座標設定が反映されていなかった問題を修正。
 * 2021/8/28 Ver.2.8.0
 * 画像を表示できる機能を追加。
 * 2021/8/13 Ver.2.7.3
 * アイテム百分率化プラグインに対応。
 * 受けた属性、ステート、デバフ表示機能を別プラグイン化。
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
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param WindowMode
 * @desc 選択ウィンドウの表示位置を指定します。
 * @text 選択ウィンドウ位置
 * @type select
 * @option 左側表示
 * @value 0
 * @option 右側表示
 * @value 1
 * @default 0
 * @parent BasicSetting
 * 
 * @param RegistrationTiming
 * @desc モンスターの図鑑への登録方法を設定します。
 * @text 図鑑登録設定
 * @type struct<RegistrationTimingList>[]
 * @default ["{\"RegistrationTiming\":\"0\",\"RegisterStatus\":\"true\"}"]
 * @parent BasicSetting
 * 
 * @param TransformDefeat
 * @desc 変身前の敵を撃破したものとみなします。
 * @text 変身前撃破
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param NoDataName
 * @desc 図鑑に登録しない名前を指定します。名前空欄はデフォルトで登録されません。
 * @text 登録しない名前
 * @type string
 * @default 
 * @parent BasicSetting
 * 
 * @param DecimalMode
 * @text 端数処理四捨五入
 * @desc 表示外小数点を四捨五入で丸める。（falseで切り捨て）
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param ImgFolder
 * @desc 個別指定画像をフォルダ名を指定します。(img直下)
 * @text 個別指定画像フォルダ
 * @type string
 * @default 'pictures'
 * @parent BasicSetting
 * 
 * @param SVEnemyMirror
 * @type boolean
 * @default true
 * @text サイドビューバトラー反転
 * @desc サイドビューバトラーを表示時、画像を反転させる。
 * @parent BasicSetting
 * 
 * @param BackUiWidth
 * @text 背景画像ウィンドウサイズ
 * @desc 背景画像をウィンドウサイズに合わせる。
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param BackFitWidth
 * @text 背景画像拡大
 * @desc 背景画像をウィンドウサイズまたは画面に合わせ拡大します。
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param CommandSetting
 * @text 図鑑コマンド設定
 * @default ------------------------------
 * 
 * @param CommandName
 * @desc コマンドの名称。
 * @text コマンドの表示名
 * @type string
 * @default モンスター図鑑
 * @parent CommandSetting
 * 
 * @param ShowCommand
 * @desc メニューコマンドにモンスター図鑑を追加します。
 * @text メニューコマンド表示
 * @type boolean
 * @default false
 * @parent CommandSetting
 * 
 * @param enemyBookSwitch 
 * @desc 表示させるフラグスイッチID
 * @text メニューコマンド表示スイッチ
 * @type switch
 * @default 0
 * @parent CommandSetting
 * 
 * @param ShowBattleCommand
 * @desc 戦闘中のパーティコマンドにモンスター図鑑を追加します。
 * @text パーティコマンド表示
 * @type boolean
 * @default false
 * @parent CommandSetting
 * 
 * @param enemyBookBattleSwitch
 * @desc 戦闘中に表示させるフラグスイッチID
 * @text パーティコマンド表示スイッチ
 * @type switch
 * @default 0
 * @parent CommandSetting
 * 
 * @param InfoCommandSetting
 * @text 敵の情報コマンド設定
 * @default ------------------------------
 * 
 * @param EnemyInfoCommandName
 * @desc 敵の情報コマンドの名称。
 * @text 敵の情報コマンド表示名
 * @type string
 * @default 敵の情報
 * @parent InfoCommandSetting
 * 
 * @param ShowEnemyInfoCommand
 * @desc 戦闘中のパーティコマンドに敵の情報を追加します。
 * @text 敵の情報パーティコマンド表示
 * @type boolean
 * @default false
 * @parent InfoCommandSetting
 * 
 * @param enemyBookInfoSwitch
 * @desc 敵の情報を戦闘中に表示させるフラグスイッチID
 * @text 敵の情報パーティコマンド表示スイッチ
 * @type switch
 * @default 0
 * @parent InfoCommandSetting
 * 
 * @param WindowSetting
 * @text 共通ウィンドウ設定
 * @default ------------------------------
 * 
 * @param BookWidth
 * @desc モンスター情報ウィンドウの横幅。(0で画面の2/3)
 * @text モンスター情報ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent WindowSetting
 * 
 * @param NoTouchUIWindow
 * @type boolean
 * @default false
 * @text 戦闘時タッチUIがOFF時ウィンドウ上詰め
 * @desc 戦闘時タッチUIがOFFの時ウィンドウを上に詰めます。
 * @parent WindowSetting
 * 
 * @param AllEnemyBookWindowVisible
 * @type boolean
 * @default true
 * @text 図鑑ウィンドウ表示
 * @desc 図鑑のウィンドウ画像を表示します。
 * @parent WindowSetting
 * 
 * @param BattleAllEnemyBookWindowVisible
 * @type boolean
 * @default true
 * @text 戦闘時図鑑ウィンドウ表示
 * @desc 戦闘時の図鑑、敵の情報、アナライズのウィンドウ画像を表示します。
 * @parent WindowSetting
 * 
 * @param BackgoundWindowMode
 * @type boolean
 * @default false
 * @text 戦闘時背景画像モード
 * @desc 戦闘時の図鑑、敵の情報、アナライズのウィンドウを背景画像モードにします。背景画像設定時はONに設定してください。
 * @parent WindowSetting
 * 
 * @param CategorySetting
 * @text 表示カテゴリーウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param CategoryNameWindowsSkin
 * @desc 表示カテゴリーウィンドウのウィンドウスキンを指定します。
 * @text 表示カテゴリーウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent CategorySetting
 * 
 * @param SelectCategorySetting
 * @text カテゴリーウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param CategoryShow
 * @type boolean
 * @default false
 * @text カテゴリーウィンドウを表示
 * @desc カテゴリーウィンドウを表示します。非表示の場合は表示カテゴリーウィンドウと共に表示されません。
 * @parent SelectCategorySetting
 * 
 * @param EnemyBookCategory
 * @desc モンスターカテゴリーの設定をします。
 * @text モンスターカテゴリー設定
 * @type struct<BookCategoryList>[]
 * @default ["{\"CategoryName\":\"全て\",\"CategoryKey\":\"all\"}","{\"CategoryName\":\"ボス\",\"CategoryKey\":\"boss\"}"]
 * @parent SelectCategorySetting
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
 * @parent SelectCategorySetting
 * 
 * @param CategoryUnknownData
 * @desc 未遭遇カテゴリーの文字列です。？1文字だけ入れると名前の文字数に応じて？に置き換えられます。「別の文字列で隠す」時のみ有効。
 * @text 未遭遇カテゴリー文字列
 * @type string
 * @default ？
 * @parent SelectCategorySetting
 * 
 * @param CategoryWindowsSkin
 * @desc カテゴリーウィンドウのウィンドウスキンを指定します。
 * @text カテゴリーウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent SelectCategorySetting
 * 
 * @param SelectEnemySetting
 * @text モンスター選択ウィンドウ共通設定
 * @default ------------------------------
 * @parent WindowSetting
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
 * @default 1
 * @parent SelectEnemySetting
 * 
 * @param UnknownVisible
 * @desc 未確認のモンスターをリストに表示しません。
 * @text 未確認モンスター表示
 * @type boolean
 * @default false
 * @parent SelectEnemySetting
 * 
 * @param NumberMode
 * @desc カテゴリーから表示されたときに、ナンバー表示を各カテゴリー表示順で表示します。(カテゴリーウィンドウ表示時のみ有効)
 * @text ナンバーカテゴリー表示順表示
 * @type boolean
 * @default false
 * @parent SelectEnemySetting
 * 
 * @param UnknownEnemyIcons
 * @desc 未登録のモンスターアイコン。
 * @text 未登録モンスターアイコン
 * @type number
 * @default 0
 * @min 0
 * @parent SelectEnemySetting
 * 
 * @param UnknownData
 * @desc 未確認の文字列です。？1文字だけ入れると名前の文字数に応じて？に置き換えられます。
 * @text 未確認モンスター文字列
 * @type string
 * @default ？
 * @parent SelectEnemySetting
 * 
 * @param RegistrationEnemyColor
 * @desc 登録済みモンスター名の色。
 * @text 登録済みモンスター名文字色
 * @type number
 * @default 0
 * @max 999
 * @parent SelectEnemySetting
 * 
 * @param RegistrationStatusEnemyColor
 * @desc ステータス情報登録済みモンスター名の色。
 * @text ステータス情報登録済みモンスター名文字色
 * @type number
 * @default 0
 * @max 999
 * @parent SelectEnemySetting
 * 
 * @param SelectEnemybookSetting
 * @text 図鑑選択ウィンドウ共通設定
 * @default ------------------------------
 * @parent SelectEnemySetting
 * 
 * @param IndexWindowsSkin
 * @desc モンスター選択ウィンドウのウィンドウスキンを指定します。
 * @text モンスター選択ウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent SelectEnemybookSetting
 * 
 * @param SelectEnemyInfoSetting
 * @text 敵の情報選択ウィンドウ共通設定
 * @default ------------------------------
 * @parent SelectEnemySetting
 * 
 * @param InfoWindowsSkin
 * @desc 敵の情報ウィンドウのウィンドウスキンを指定します。
 * @text 敵の情報ウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent SelectEnemyInfoSetting
 * 
 * @param PercentWindow
 * @text 完成度ウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param PercentWindowShow
 * @type boolean
 * @default true
 * @text 完成度ウィンドウ表示
 * @desc 完成度ウィンドウを表示する。敵の情報、アナライズでは表示されません。
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
 * @param PercentWindowsSkin
 * @desc 完成度のウィンドウスキンを指定します。
 * @text 完成度ウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent PercentWindow
 * 
 * @param PageWindow
 * @text ページウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param PageWindowsShow
 * @desc ページウィンドウを表示します。非表示に設定することでページウィンドウを画面外に表示し、図鑑表示領域を拡大します。
 * @text ページウィンドウ表示
 * @type boolean
 * @default false
 * @parent PageWindow
 * 
 * @param PageCols
 * @desc 図鑑ページの最大表示列。
 * @text 図鑑ページ最大表示列
 * @type number
 * @default 2
 * @min 1
 * @parent PageWindow
 * 
 * @param InfoPageCols
 * @desc 敵の情報ページの最大表示列。
 * @text 敵の情報ページ最大表示列
 * @type number
 * @default 2
 * @min 1
 * @parent PageWindow
 * 
 * @param PageWindowsSkin
 * @desc ページ画面のウィンドウスキンを指定します。
 * @text ページウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent PageWindow
 * 
 * @param EnemyBookStatusSetting
 * @text モンスターステータス設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param EnemyBookDefaultFontSize
 * @desc デフォルトのフォントサイズ（メインフォントからの差）
 * @text デフォルトフォントサイズ
 * @type number
 * @min -99
 * @default 0
 * @parent EnemyBookStatusSetting
 * 
 * @param UnknownStatus
 * @desc ステータス情報未登録時のステータス表示名
 * @text ステータス情報未登録時ステータス表示名
 * @type string
 * @default ？？？
 * @parent EnemyBookStatusSetting
 * 
 * @param UnknownItems
 * @desc ステータス情報未登録時のアイテム、スキル表示名
 * @text ステータス情報未登録時アイテム、スキル表示名
 * @type string
 * @default ？
 * @parent EnemyBookStatusSetting
 * 
 * @param ContentWindowsSkin
 * @desc モンスターステータスウィンドウのウィンドウスキンを指定します。
 * @text モンスターステータスウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent EnemyBookStatusSetting
 * 
 * @param EnemyBookSetting
 * @text モンスター図鑑設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param PageSetting
 * @desc モンスターステータスウィンドウのページ設定。表示するページを表示項目設定の表示リストから選択してください。
 * @text ページ設定
 * @type struct<PageSettingData>[]
 * @default ["{\"ListDateSetting\":\"1\",\"PageCategoryName\":\"基本情報\",\"BackGroundImg\":\"\"}","{\"ListDateSetting\":\"2\",\"PageCategoryName\":\"属性、ステート\",\"BackGroundImg\":\"\"}"]
 * @parent EnemyBookSetting
 * 
 * @param ContentCols
 * @text モンスター情報項目列数
 * @desc モンスター情報の項目列数。
 * @type number
 * @default 2
 * @min 1
 * @parent EnemyBookSetting
 * 
 * @param CategoryBackGroundImg
 * @desc カテゴリー選択時の図鑑背景画像ファイル名を指定します。ページごとに指定してある場合は個別設定が優先されます。
 * @text カテゴリー図鑑背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent EnemyBookSetting
 * 
 * @param DefaultBackGroundImg
 * @desc デフォルトの図鑑背景画像ファイル名を指定します。ページごとに指定してある場合は個別設定が優先されます。
 * @text 図鑑背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent EnemyBookSetting
 * 
 * @param EnemyInfoSetting
 * @text 敵の情報基本設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param InfoPageSetting
 * @desc モンスターインフォウィンドウのページ設定。表示するページを表示項目設定の表示リストから選択してください。
 * @text ページ設定
 * @type struct<PageSettingData>[]
 * @default ["{\"ListDateSetting\":\"1\",\"PageCategoryName\":\"基本情報\",\"BackGroundImg\":\"\"}","{\"ListDateSetting\":\"2\",\"PageCategoryName\":\"属性、ステート\",\"BackGroundImg\":\"\"}"]
 * @parent EnemyInfoSetting
 * 
 * @param InfoContentCols
 * @text モンスター情報項目列数
 * @desc モンスター情報の項目列数。
 * @type number
 * @default 2
 * @min 1
 * @parent EnemyInfoSetting
 * 
 * @param InfoStatusGaugeVisible
 * @type boolean
 * @default true
 * @text ゲージを表示
 * @desc HP、MP、TPのゲージを表示します。
 * @parent EnemyInfoSetting
 * 
 * @param InfoEnemyCurrentStatus
 * @type boolean
 * @default true
 * @text モンスターの現在ステータス表示
 * @desc モンスターの現在のステータスを表示します。
 * @parent EnemyInfoSetting
 * 
 * @param RegistrationEnemyInfo
 * @desc 登録タイミングを敵の情報にも反映させます。
 * @text 敵の情報登録タイミング反映
 * @type boolean
 * @default false
 * @parent EnemyInfoSetting
 * 
 * @param InfoMaskMode
 * @desc ステータス情報を登録していない場合はステータスを隠す。
 * @text 情報未登録ステータス非表示
 * @type boolean
 * @default false
 * @parent EnemyInfoSetting
 * 
 * @param DefaultInfoBackGroundImg
 * @desc デフォルトの敵の情報背景画像ファイル名を指定します。ページごとに指定してある場合は個別設定が優先されます。
 * @text 敵の情報背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent EnemyInfoSetting
 * 
 * @param AnalyzeSetting
 * @text アナライズ基本設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param AnalyzeSkillMode
 * @desc アナライズスキルの設定をします。
 * @text アナライズスキル設定
 * @type struct<AnalyzeSkill>[]
 * @default ["{\"ListNumber\":\"0\",\"PageCols\":\"2\",\"ContentCols\":\"2\",\"StatusGaugeVisible\":\"true\",\"EnemyCurrentStatus\":\"true\",\"AnalyzeMissMessage\":\"%2はアナライズに失敗した。\",\"BuffColor\":\"0\",\"DebuffColor\":\"0\"}","{\"ListNumber\":\"1\",\"PageCols\":\"2\",\"ContentCols\":\"2\",\"StatusGaugeVisible\":\"true\",\"EnemyCurrentStatus\":\"true\",\"AnalyzeMissMessage\":\"%2はアナライズに失敗した。\",\"BuffColor\":\"0\",\"DebuffColor\":\"0\"}"]
 * @parent AnalyzeSetting
 * 
 * @param AnalyzeListData
 * @desc アナライズの設定。
 * @text アナライズ設定
 * @type struct<AnalyzeList>[]
 * @default ["{\"Name\":\"\",\"AnalyzePageList\":\"[\\\"{\\\\\\\"ListDateSetting\\\\\\\":\\\\\\\"11\\\\\\\",\\\\\\\"PageCategoryName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BackGroundImg\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\"}"]
 * @parent AnalyzeSetting
 * 
 * @param CommonVariableID
 * @desc コモンイベント指定にモンスターIDを代入する変数
 * @text モンスターID代入変数
 * @type variable
 * @default 0
 * @parent AnalyzeSetting
 * 
 * @param BattleEnemyBookSetting
 * @text 戦闘時図鑑共通設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param HPgaugeWidth
 * @desc HPゲージ横幅
 * @text HPゲージ横幅
 * @type number
 * @default 200
 * @max 999
 * @min 0
 * @parent BattleEnemyBookSetting
 * 
 * @param MPgaugeWidth
 * @desc MPゲージ横幅
 * @text MPゲージ横幅
 * @type number
 * @default 200
 * @max 999
 * @min 0
 * @parent BattleEnemyBookSetting
 * 
 * @param TPgaugeWidth
 * @desc TPゲージ横幅
 * @text TPゲージ横幅
 * @type number
 * @default 200
 * @max 999
 * @min 0
 * @parent BattleEnemyBookSetting
 * 
 * @param BuffColor
 * @desc ステータスバフ時のステータスパラメータの数値色。(敵の情報、アナライズ)
 * @text ステータスバフ時数値色
 * @type number
 * @default 0
 * @max 999999
 * @parent BattleEnemyBookSetting
 * 
 * @param DebuffColor
 * @desc ステータスデバフ時のステータスパラメータの数値色。(敵の情報、アナライズ)
 * @text ステータスデバフ時数値色
 * @type number
 * @default 0
 * @max 999999
 * @parent BattleEnemyBookSetting
 * 
 * @param ListData
 * @text 表示項目設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
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
 * @default ["{\"BasicSetting\":\"\",\"DateSelect\":\"200\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"0\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"32\",\"X_Position\":\"2\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"1\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"2\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"3\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"4\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"5\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"6\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"7\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"8\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"30\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"31\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"40\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"41\",\"X_Position\":\"2\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"45\",\"X_Position\":\"1\",\"Y_Position\":\"13\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"46\",\"X_Position\":\"2\",\"Y_Position\":\"13\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}"]
 * @parent ListData1_10
 *  
 * @param PageList2
 * @desc 表示するリスト。
 * @text 表示リスト２
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"DateSelect\":\"200\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"\",\"NameColor\":\"0\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"60\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"70\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"desc\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}"]
 * @parent ListData1_10
 * 
 * @param PageList3
 * @desc 表示するリスト。
 * @text 表示リスト３
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"DateSelect\":\"200\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"\",\"NameColor\":\"0\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"32\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"1\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"2\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"3\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"120\",\"SystemItemWidth\":\"50\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"4\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"128\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"120\",\"SystemItemWidth\":\"50\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"5\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"120\",\"SystemItemWidth\":\"50\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"6\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"128\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"120\",\"SystemItemWidth\":\"50\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"7\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"120\",\"SystemItemWidth\":\"50\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"8\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"128\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"120\",\"SystemItemWidth\":\"50\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"30\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"31\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"40\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"41\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"45\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"46\",\"X_Position\":\"2\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\"}"]
 * @parent ListData1_10
 * 
 * @param PageList4
 * @desc 表示するリスト。
 * @text 表示リスト４
 * @type struct<PageListData>[]
 * @default []
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
 * @default ["{\"BasicSetting\":\"\",\"DateSelect\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"\",\"NameColor\":\"0\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textMethod\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"200\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"2\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"3\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"4\",\"X_Position\":\"2\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"5\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"6\",\"X_Position\":\"2\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"7\",\"X_Position\":\"1\",\"Y_Position\":\"13\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"8\",\"X_Position\":\"2\",\"Y_Position\":\"13\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\"}"]
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
 * @parent EnemyBookStatusSetting
 * 
 * @param DropItemProbabilityShow
 * @desc 確率を表示する。
 * @text 確率表示
 * @type boolean
 * @default true
 * @parent DropItemData
 * 
 * @param DropRateEval
 * @desc ドロップ率の評価式を定義します。rate:分母　di:ドロップ情報
 * @text ドロップ率評価式
 * @type combo
 * @option '1/'+ rate
 * @option ge.getDropItemsRatePercentage(di) +'%';//ドロップ率百分率化Ver.1.0.1～
 * @option ge.dropItemMolecule(i) +'/'+ rate;//ドロップ率分子操作
 * @default 
 * @parent DropItemData
 * 
 * @param ShowDropItemName
 * @desc 未確認のドロップアイテムを隠す。(ステータス情報登録をしてもドロップアイテムを確認するまでは表示されません)
 * @text 未確認ドロップアイテム名
 * @type boolean
 * @default false
 * @parent DropItemData
 * 
 * @param DropItemMultiCols
 * @desc ドロップアイテムの表示列。
 * @text 表示列
 * @type number
 * @min 1
 * @default 1
 * @parent DropItemData
 * 
 * @param CondDropData
 * @text 条件付きドロップアイテム設定
 * @default ------------------------------
 * @parent DropItemData
 * 
 * @param CondDropItemCols
 * @desc 条件付きドロップアイテムの表示列。
 * @text 表示列
 * @type number
 * @min 1
 * @default 1
 * @parent CondDropData
 * 
 * @param StealItemData
 * @text スティールアイテム設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param StealItemProbabilityShow
 * @desc 確率を表示する。
 * @text 確率表示
 * @type boolean
 * @default true
 * @parent StealItemData
 * 
 * @param StealRateEval
 * @desc 盗み率の評価式を定義します。rate:盗み率(100分率)
 * @text 盗み率評価式
 * @type combo
 * @option rate +'%';//盗み率
 * @default 
 * @parent StealItemData
 * 
 * @param ShowStealItemName
 * @desc 未確認のスティールアイテムを隠す。(ステータス情報登録をしてもスティールアイテムを確認するまでは表示されません)
 * @text 未確認スティールアイテム表示
 * @type boolean
 * @default false
 * @parent StealItemData
 * 
 * @param StealItemCols
 * @desc スティールアイテムの表示列。
 * @text 表示列
 * @type number
 * @min 1
 * @default 1
 * @parent StealItemData
 * 
 * @param ActionData
 * @text 敵の使用スキル設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
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
 * @param ActionCols
 * @desc 敵のスキルの表示列。
 * @text 表示列
 * @type number
 * @min 1
 * @default 1
 * @parent ActionData
 * 
 * @param ResistWeakElementData
 * @text 属性耐性弱点設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param ElementList
 * @desc 表示する属性。アイコン、耐性表、レーダーチャート共通
 * @text 表示属性
 * @type struct<ElementData>[]
 * @default ["{\"ElementNo\":\"1\",\"ElementIconId\":\"76\"}","{\"ElementNo\":\"2\",\"ElementIconId\":\"64\"}","{\"ElementNo\":\"3\",\"ElementIconId\":\"65\"}","{\"ElementNo\":\"4\",\"ElementIconId\":\"66\"}","{\"ElementNo\":\"5\",\"ElementIconId\":\"67\"}","{\"ElementNo\":\"6\",\"ElementIconId\":\"68\"}","{\"ElementNo\":\"7\",\"ElementIconId\":\"69\"}","{\"ElementNo\":\"8\",\"ElementIconId\":\"70\"}","{\"ElementNo\":\"9\",\"ElementIconId\":\"71\"}"]
 * @parent ResistWeakElementData
 * 
 * @param ElementUnknownIconId
 * @desc ステータス情報未登録時に表示する属性アイコンのIDを指定します。
 * @text ステータス情報未登録時属性アイコンID
 * @type number
 * @default 0
 * @parent ResistWeakElementData
 * 
 * @param ElementIcon
 * @text 属性耐性（アイコン表示）設定
 * @default ------------------------------
 * @parent ResistWeakElementData
 * 
 * @param ResistNoEffectElement
 * @desc 効きにくい属性に無効を反映させます。OFFにした場合耐性0%の属性が耐性属性に表示されます。
 * @text 効きにくい属性に無効反映
 * @type boolean
 * @default true
 * @parent ElementIcon
 * 
 * @param ElementValue
 * @text 属性耐性（耐性数値表示）
 * @default ------------------------------
 * @parent ResistWeakElementData
 * 
 * @param ResistWeakElementMode
 * @text 属性耐性表示列数
 * @desc 属性耐性表示列数。
 * @type select
 * @option 属性名のみ
 * @value 0
 * @option アイコンのみ
 * @value 1
 * @option 属性名+アイコンのみ
 * @value 2
 * @default 2
 * @parent ElementValue
 * 
 * @param ElementCol
 * @desc 属性耐性の表示列。
 * @text 属性耐性表示列
 * @type boolean
 * @default false
 * @parent ElementValue
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
 * @param NUUN_EnemyBookEX_1
 * @text (要NUUN_EnemyBookEX_1)
 * @default ------------------------------
 * @parent ResistWeakElementData
 * 
 * @param ShowElementsIcon
 * @desc 耐性弱点未確認の属性を隠す。(ステータス情報登録をしても属性耐性弱点を確認するまでは表示されません)
 * @text 未確認属性を隠す(要NUUN_EnemyBookEX_1)
 * @type boolean
 * @default false
 * @parent NUUN_EnemyBookEX_1
 * 
 * @param ResistWeakStateData
 * @text ステート耐性弱点設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param StateList
 * @desc 表示するステート。
 * @text 表示ステート
 * @type struct<StateData>[]
 * @default ["{\"StateId\":\"1\"}","{\"StateId\":\"4\"}","{\"StateId\":\"5\"}","{\"StateId\":\"6\"}","{\"StateId\":\"7\"}","{\"StateId\":\"8\"}","{\"StateId\":\"9\"}","{\"StateId\":\"10\"}","{\"StateId\":\"12\"}","{\"StateId\":\"13\"}"]
 * @parent ResistWeakStateData
 * 
 * @param StateUnknownIconId
 * @desc ステータス情報未登録時に表示するステートアイコンのIDを指定します。
 * @text ステータス情報未登録時ステートアイコンID
 * @type number
 * @default 0
 * @parent ResistWeakStateData
 * 
 * @param ResistWeakStateIcon
 * @text ステート耐性（アイコン表示）設定
 * @default ------------------------------
 * @parent ResistWeakStateData
 * 
 * @param NormalWeakState
 * @desc 効きやすいステート対象を有効度100%以上から反映させるか。OFFの場合は101%以上になります。
 * @text 効きやすい属性有効度100%適用
 * @type boolean
 * @default false
 * @parent ResistWeakStateIcon
 * 
 * @param ResistNoEffectState
 * @desc 効きにくいステートに無効を反映させるか。OFFにした場合耐性0%のステートが耐性ステートに表示されます。
 * @text 効きにくいステートに無効反映
 * @type boolean
 * @default true
 * @parent ResistWeakStateIcon
 * 
 * @param ResistWeakStateValue
 * @text 耐性ステート（耐性数値表示）設定
 * @default ------------------------------
 * @parent ResistWeakStateData
 * 
 * @param ResistWeakStateMode
 * @text ステート表示列数
 * @desc ステート表示列数。
 * @type select
 * @option ステート名のみ
 * @value 0
 * @option アイコンのみ
 * @value 1
 * @option ステート名+アイコンのみ
 * @value 2
 * @default 2
 * @parent ResistWeakStateValue
 * 
 * @param StateCol
 * @desc ステート耐性の表示列。
 * @text ステート耐性表示列
 * @type boolean
 * @default false
 * @parent ResistWeakStateValue
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
 * @param NUUN_EnemyBookEX_1_State
 * @text (要NUUN_EnemyBookEX_1)
 * @default ------------------------------
 * @parent ResistWeakStateData
 * 
 * @param ShowStateIcon
 * @desc 耐性弱点未確認のステートを隠す。(ステータス情報登録をしてもステート耐性弱点を確認するまでは表示されません)
 * @text 未確認ステートを隠す(要NUUN_EnemyBookEX_1)
 * @type boolean
 * @default false
 * @parent NUUN_EnemyBookEX_1_State
 * 
 * @param ResistWeakDebuffData
 * @text デバフ耐性弱点設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param DeBuffList
 * @desc 表示するデバフ。
 * @text 表示デバフ
 * @type struct<DebuffData>[]
 * @default ["{\"ParamId\":\"0\",\"DebuffIconId\":\"48\"}","{\"ParamId\":\"1\",\"DebuffIconId\":\"49\"}","{\"ParamId\":\"2\",\"DebuffIconId\":\"50\"}","{\"ParamId\":\"3\",\"DebuffIconId\":\"51\"}","{\"ParamId\":\"4\",\"DebuffIconId\":\"52\"}","{\"ParamId\":\"5\",\"DebuffIconId\":\"53\"}","{\"ParamId\":\"6\",\"DebuffIconId\":\"54\"}","{\"ParamId\":\"7\",\"DebuffIconId\":\"55\"}"]
 * @parent ResistWeakDebuffData
 * 
 * @param DeBuffUnknownIconId
 * @desc ステータス情報未登録時に表示するデバフアイコンのIDを指定します。
 * @text ステータス情報未登録時デバフアイコンID
 * @type number
 * @default 0
 * @parent ResistWeakDebuffData
 * 
 * @param NUUN_EnemyBookEX_1_DeBuff
 * @text (要NUUN_EnemyBookEX_1)
 * @default ------------------------------
 * @parent ResistWeakDebuffData
 * 
 * @param ShowDebuffIcon
 * @desc 耐性弱点未確認のステートデバフを隠す。(ステータス情報登録をしてもデバフ耐性弱点を確認するまでは表示されません)
 * @text 未確認デバフを隠す(要NUUN_EnemyBookEX_1)
 * @type boolean
 * @default false
 * @parent NUUN_EnemyBookEX_1_DeBuff
 * 
 * 
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
 * @desc モンスターの未確認の属性耐性弱点情報を確認済みにします。(要NUUN_EnemyBookEX_1)
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
 * @desc モンスターの確認済みの属性耐性弱点情報を未確認にします。(要NUUN_EnemyBookEX_1)
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
 * @desc モンスターの未確認のステート耐性弱点情報を確認済みにします。(要NUUN_EnemyBookEX_1)
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
 * @desc モンスターの確認済みのステート耐性弱点情報を未確認にします。(要NUUN_EnemyBookEX_1)
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
 * @desc モンスターの未確認のデバフ耐性弱点情報を確認済みにします。(要NUUN_EnemyBookEX_1)
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
 * @desc モンスターの確認済みのデバフ耐性弱点情報を未確認にします。(要NUUN_EnemyBookEX_1)
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
 */
/*~struct~RegistrationTimingList:
 * 
 * @param RegistrationTiming
 * @text 登録タイミング
 * @desc 図鑑の登録タイミング。
 * @type select
 * @option 戦闘開始時
 * @value 0
 * @option 撃破時
 * @value 1
 * @option アナライズ成功時
 * @value 2
 * @option 戦闘終了時
 * @value 4
 * @option 登録なし
 * @value 10
 * @default 0
 * 
 * @param RegisterStatus
 * @desc ステータス情報を登録します。
 * @text ステータス情報登録。
 * @type boolean
 * @default true
 * 
 */
/*~struct~PageListData:
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default
 * 
 * @param DateSelect
 * @desc 表示させる項目を指定。
 * @text 項目リスト
 * @type select
 * @option 表示なし
 * @value 0
 * @option 最大HP(1)～(14)(16)
 * @value 1
 * @option 最大MP(1)～(14)(16)
 * @value 2
 * @option 攻撃力(1)～(14)(16)
 * @value 3
 * @option 防御力(1)～(14)(16)
 * @value 4
 * @option 魔法力(1)～(14)(16)
 * @value 5
 * @option 魔法防御(1)～(14)(16)
 * @value 6
 * @option 敏捷性(1)～(14)(16)
 * @value 7
 * @option 運(1)～(14)(16)
 * @value 8
 * @option TP（現在のステータスをONのときのみ）(1)～(16)
 * @value 9
 * @option 命中率(1)～(16)
 * @value 10
 * @option 回避率(1)～(16)
 * @value 11
 * @option 会心率(1)～(16)
 * @value 12
 * @option 会心回避率(1)～(16)
 * @value 13
 * @option 魔法回避率(1)～(16)
 * @value 14
 * @option 魔法反射率(1)～(16)
 * @value 15
 * @option 反撃率(1)～(16)
 * @value 16
 * @option HP再生率(1)～(16)
 * @value 17
 * @option MP再生率(1)～(16)
 * @value 18
 * @option TP再生率(1)～(16)
 * @value 19
 * @option 狙われ率(1)～(16)
 * @value 20
 * @option 防御効果率(1)～(16)
 * @value 21
 * @option 回復効果率(1)～(16)
 * @value 22
 * @option 薬の知識(1)～(16)
 * @value 23
 * @option MP消費率(1)～(16)
 * @value 24
 * @option TPチャージ率(1)～(16)
 * @value 25
 * @option 物理ダメージ率(1)～(16)
 * @value 26
 * @option 魔法ダメージ率(1)～(16)
 * @value 27
 * @option 経験値(1)～(14)(16)
 * @value 30
 * @option 獲得金額(1)～(14)(16)
 * @value 31
 * @option 倒した数(1)～(14)(16)
 * @value 32
 * @option モンスター名(1)～(5)(7)(8)(9)(12)(16)
 * @value 33
 * @option 名称のみ(1)～(5)(7)(8)(9)(12)(16)
 * @value 35
 * @option ターン（TPBバトルで現在のステータスをONにしている時のみ表示）(1)～(14)(16)
 * @value 36
 * @option モンスターブックナンバー(1)～(5)(7)(8)(9)(12)(16)
 * @value 37
 * @option 耐性属性（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)
 * @value 40
 * @option 弱点属性（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)
 * @value 41
 * @option 無効属性（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)
 * @value 42
 * @option 属性耐性（耐性数値表示）(1)～(16)
 * @value 43
 * @option 耐性ステート（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)
 * @value 45
 * @option 弱点ステート（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)
 * @value 46
 * @option 無効ステート（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)
 * @value 47
 * @option 耐性ステート（耐性数値表示）(1)～(16)
 * @value 48
 * @option 耐性デバフ（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)
 * @value 50
 * @option 弱点デバフ（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)
 * @value 51
 * @option ドロップアイテム(1)～(15)
 * @value 60
 * @option スティールアイテム(1)～(15)
 * @value 61
 * @option 条件付きドロップアイテム(1)～(15)
 * @value 62
 * @option 記述欄(1)～(5)(7)(8)(9)(12)(13)(17)
 * @value 70
 * @option オリジナルパラメータ(1)～(16)
 * @value 80
 * @option 敵の使用スキル(1)～(15)
 * @value 100
 * @option 属性レーダーチャート
 * @value 121
 * @option ステートレーダーチャート
 * @value 122
 * @option モンスター画像(1)(2)(3)(4)(5)(7)(19)
 * @value 200
 * @option キャラチップ
 * @value 201
 * @option 共通画像
 * @value 250
 * @option 個別画像
 * @value 251
 * @option ページ切り替え
 * @value 500
 * @option ライン(1)(2)(3)(4)(5)(7)(9)
 * @value 1000
 * @default 0
 * @parent BasicSetting
 * 
 * @param X_Position
 * @text X表示列位置(1)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 3
 * @parent BasicSetting
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(2)
 * @type number
 * @default 1
 * @min 1
 * @parent BasicSetting
 * 
 * @param X_Coordinate
 * @text X座標（相対）(3)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent BasicSetting
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(4)
 * @desc Y座標（Y表示列位置からの相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent BasicSetting
 * 
 * @param ItemWidth
 * @desc 項目横幅（0で自動）
 * @text 項目横幅(5)
 * @type number
 * @default 0
 * @min 0
 * @parent BasicSetting
 * 
 * @param SystemItemWidth
 * @desc システム項目の横幅（0で自動）
 * @text システム項目横幅(6)
 * @type number
 * @default 0
 * @min 0
 * @parent BasicSetting
 * 
 * @param WideMode
 * @desc 項目表示モード。複数列にまたがって表示されます。
 * @text 項目表示モード(7)
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
 * @param paramName
 * @desc 表示する項目の名称を設定します。
 * @text 名称(8)
 * @type string
 * @default
 * @parent BasicSetting
 * 
 * @param NameColor
 * @desc システム項目の文字色。(システムカラーまたはカラーコード)
 * @text システム項目文字色(9)
 * @type number
 * @default 16
 * @min 0
 * @parent BasicSetting
 * 
 * @param DetaEval
 * @desc パラメータ評価式または文字列を設定します。
 * @text パラメータ評価式or文字列(10)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'ge._race;//種族（要蒼竜氏バトラー種族定義）'
 * @option 'ge.sp;//取得SP（要うなぎおおとろ氏スキルツリー）'
 * @default 
 * @parent BasicSetting
 * 
 * @param Back
 * @text コンテンツ背景表示(11)
 * @desc コンテンツ背景を表示させます。
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォント+デフォルトフォントからの差）
 * @text フォントサイズ(12)
 * @type number
 * @default 0
 * @min -99
 * @parent BasicSetting
 * 
 * @param MaskMode
 * @desc 図鑑登録の際、ステータス情報登録タイミングで情報登録してない場合はステータスを隠します。
 * @text 情報未登録ステータス表示(13)
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param Decimal
 * @text 小数点桁数(14)
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * @parent BasicSetting
 * 
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位(15)
 * @type string
 * @default 
 * @parent UnitSetting
 * 
 * @param namePosition
 * @desc 文字の表示位置を指定します。
 * @text 文字の表示位置(16)
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
 * @param textMethod
 * @desc 記述欄に紐づけするタグ名
 * @text 記述欄タグ名(17)
 * @type string
 * @default 
 * @parent textSetting
 * 
 * @param ImgData
 * @desc 全てのモンスターページに表示される共通画像ファイル名を指定します。横幅は「項目横幅」、高さは「画像の最大縦幅」
 * @text 共通画像(18)
 * @type file
 * @dir img/
 * @default 
 * @parent ImgSetting
 * 
 * @param ImgMaxHeight
 * @desc 画像の最大縦幅（行数で指定）
 * @text 画像の最大縦幅(19)
 * @type number
 * @default 8
 * @min 0
 * @parent ImgSetting
 * 
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
 * @desc ページの名前を設定します。
 * @text ページ名
 * @type string
 * @default
 * 
 * @param BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
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
 * @type combo
 * @option 'all'
 * @default 
 * 
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
 * @desc 表示する情報を指定します。
 * @text 表示情報
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
*
*/
/*~struct~ElementData:
 * 
 * @param ElementNo
 * @desc 表示する属性番号です。(0:なし、-1:物理ダメージ率、-2:魔法ダメージ率)
 * @text 属性番号
 * @type number
 * @min -2
 * 
 * @param ElementIconId
 * @desc アイコンのIDを指定します。
 * @text アイコンID
 * @type number
 * @min 0
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
/*~struct~AnalyzeSkill:
 * 
 * @param ListNumber
 * @desc 表示するアナライズのリスト番号を指定します。0で図鑑表示と同じ
 * @text アナライズ項目指定
 * @type number
 * @default 0
 * 
 * @param PageCols
 * @desc ページの最大表示列。
 * @text ページ最大表示列
 * @type number
 * @default 2
 * @min 1
 * 
 * @param ContentCols
 * @text モンスター情報項目列数
 * @desc モンスター情報の項目列数。
 * @type number
 * @default 2
 * @min 1
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
 * @text モンスターの現在ステータス表示
 * @desc モンスターの現在のステータスを表示します。
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
/*~struct~AnalyzeList:
 * 
 * @param Name
 * @desc 識別名。
 * @text 識別名
 * @type string
 * @default 
 * 
 * @param AnalyzePageList
 * @desc 表示する項目設定。
 * @text 表示項目設定
 * @type struct<PageSettingData>[]
 * @default 
 * @parent AnalyzeSetting
 * 
 */

var Imported = Imported || {};
Imported.NUUN_EnemyBook = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EnemyBook');

const WindowMode = eval(parameters['WindowMode']) || 0;
const DecimalMode = eval(parameters['DecimalMode'] || 'true');
const NoDataName = String(parameters['NoDataName']);
const TransformDefeat = eval(parameters['TransformDefeat'] || 'true');
const BackUiWidth = eval(parameters['BackUiWidth'] || 'true');
const BackFitWidth = eval(parameters['BackFitWidth'] || 'false');

const RegistrationTiming = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['RegistrationTiming'])) : [];
const RegistrationEnemyColor = (DataManager.nuun_structureData(parameters['RegistrationEnemyColor'])) || 0;
const RegistrationStatusEnemyColor = (DataManager.nuun_structureData(parameters['RegistrationStatusEnemyColor'])) || 0;

const CommandName = String(parameters['CommandName']);
const enemyBookSwitch = Number(parameters['enemyBookSwitch'] || 0);
const ShowCommand = eval(parameters['ShowCommand'] || 'false');
const ShowBattleCommand = eval(parameters['ShowBattleCommand'] || 'false');
const enemyBookBattleSwitch = Number(parameters['enemyBookBattleSwitch'] || 0);

const RegistrationEnemyInfo = eval(parameters['RegistrationEnemyInfo'] || 'false');
const ShowEnemyInfoCommand = eval(parameters['ShowEnemyInfoCommand'] || 'false');
const EnemyInfoCommandName = String(parameters['EnemyInfoCommandName']);
const enemyBookInfoSwitch = Number(parameters['enemyBookInfoSwitch'] || 0);
const InfoWindowsSkin = String(parameters['InfoWindowsSkin']);

const PageSetting = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageSetting'])) : [];
const PageCols = Number(parameters['PageCols'] || 2);
const ContentCols = Number(parameters['ContentCols'] || 2);
const InfoPageSetting = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['InfoPageSetting'])) : [];
const InfoPageCols = Number(parameters['InfoPageCols'] || 2);
const InfoContentCols = Number(parameters['InfoContentCols'] || 2);
const InfoStatusGaugeVisible = eval(parameters['InfoStatusGaugeVisible'] || 'true');
const InfoEnemyCurrentStatus = eval(parameters['InfoEnemyCurrentStatus'] || 'true');
const AnalyzeSkillMode = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['AnalyzeSkillMode'])) : [];
const AnalyzeListData = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['AnalyzeListData'])) : [];
const ContentWindowsSkin = String(parameters['ContentWindowsSkin']);
const CommonVariableID = Number(parameters['CommonVariableID'] || 0);

const BookWidth = Number(parameters['BookWidth'] || 0);
const NoTouchUIWindow = eval(parameters['NoTouchUIWindow'] || 'false');
const PercentWindowShow = eval(parameters['PercentWindowShow'] || 'true');
const PercentContent = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PercentContent'])) : [];
const Interval = Number(parameters['Interval'] || 0);
const PercentWindowsSkin = String(parameters['PercentWindowsSkin']);

const CategoryNameWindowsSkin = String(parameters['CategoryNameWindowsSkin']);

const CategoryShow = eval(parameters['CategoryShow'] || 'true');
const EnemyBookCategory = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EnemyBookCategory'])) : [];
const CategoryVisibleType = eval(parameters['CategoryVisibleType']) || 0;
const CategoryUnknownData = String(parameters['CategoryUnknownData'] || '？');
const CategoryWindowsSkin = String(parameters['CategoryWindowsSkin']);

const NumberType = eval(parameters['NumberType']) || 0;
const UnknownVisible = eval(parameters['UnknownVisible'] || 'false');
const NumberMode = eval(parameters['NumberMode'] || 'false');
const UnknownData = String(parameters['UnknownData'] || '？');
const UnknownEnemyIcons = Number(parameters['UnknownEnemyIcons'] || 0);
const IndexWindowsSkin = String(parameters['IndexWindowsSkin']);

const PageWindowsShow = eval(parameters['PageWindowsShow'] || 'false');
const PageWindowsSkin = String(parameters['PageWindowsSkin']);

const EnemyBookDefaultFontSize = Number(parameters['EnemyBookDefaultFontSize'] || 0);
const UnknownStatus = String(parameters['UnknownStatus'] || '？？？');
const UnknownItems = String(parameters['UnknownItems'] || '？');
const ImgFolder = String(parameters['ImgFolder'] || 'pictures');
const SVEnemyMirror = eval(parameters['SVEnemyMirror'] || 'true');

const BuffColor = (DataManager.nuun_structureData(parameters['BuffColor'])) || 0;
const DebuffColor = (DataManager.nuun_structureData(parameters['DebuffColor'])) || 0;
const HPgaugeWidth = Number(parameters['HPgaugeWidth'] || 200);
const MPgaugeWidth = Number(parameters['MPgaugeWidth'] || 200);
const TPgaugeWidth = Number(parameters['TPgaugeWidth'] || 200);

const DropItemProbabilityShow = eval(parameters['DropItemProbabilityShow'] || 'false');
const DropRateEval = eval(parameters['DropRateEval']);
const ShowDropItemName = eval(parameters['ShowDropItemName'] || 'false');
const DropItemMultiCols = Number(parameters['DropItemMultiCols'] || 1);
const CondDropItemCols = Number(parameters['CondDropItemCols'] || 1);

const StealItemProbabilityShow = eval(parameters['StealItemProbabilityShow'] || 'false');
const StealRateEval = eval(parameters['StealRateEval']);
const ShowStealItemName = eval(parameters['ShowStealItemName'] || 'false');
const StealItemCols = Number(parameters['StealItemCols'] || 1);

const ShowActionName = eval(parameters['ShowActionName'] || 'false');
const ActionMaxItems = Number(parameters['ActionMaxItems'] || 0);
const ActionCols = Number(parameters['ActionCols'] || 1);

const ElementList = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ElementList'])) : [];
const ShowElementsIcon = eval(parameters['ShowElementsIcons'] || 'false');
const ElementUnknownIconId = Number(parameters['ElementUnknownIconId'] || 1);
const ResistNoEffectElement = eval(parameters['ResistNoEffectElement'] || 'true');
const ResistWeakElementMode = eval(parameters['ResistWeakElementMode']) || 2;
const ElementCol = Number(parameters['ElementCol'] || 1);
const ElementRadarChartRadius = Number(parameters['ElementRadarChartRadius'] || 100);
const ElementRadarChartFramecolor = Number(parameters['ElementRadarChartFramecolor'] || 15);
const ElementRadarChartLineColor = Number(parameters['ElementRadarChartLineColor'] || 15);
const ElementRadarChartMainColor1 = Number(parameters['ElementRadarChartMainColor1'] || 3);
const ElementRadarChartMainColor2 = Number(parameters['ElementRadarChartMainColor2'] || 3);
const ElementRadarChartX = Number(parameters['ElementRadarChartX'] || 48);
const ElementRadarChartY = Number(parameters['ElementRadarChartY'] || 48);
const ElementRadarChart_FontSize = Number(parameters['ElementRadarChart_FontSize'] || 0);

const StateList = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['StateList'])) : [];
const StateUnknownIconId = Number(parameters['StateUnknownIconId'] || 1);
const NormalWeakState = eval(parameters['NormalWeakState'] || 'false');
const ResistNoEffectState = eval(parameters['ResistNoEffectState'] || 'true');
const ResistWeakStateMode = eval(parameters['ResistWeakStateMode']) || 2;
const StateCol = Number(parameters['StateCol'] || 1);
const ShowStateIcon = eval(parameters['ShowStateIcon'] || 'false');
const StateRadarChartRadius = Number(parameters['StateRadarChartRadius'] || 100);
const StateRadarChartFramecolor = Number(parameters['StateRadarChartFramecolor'] || 15);
const StateRadarChartLineColor = Number(parameters['StateRadarChartLineColor'] || 15);
const StateRadarChartMainColor1 = Number(parameters['StateRadarChartMainColor1'] || 3);
const StateRadarChartMainColor2 = Number(parameters['StateRadarChartMainColor2'] || 3);
const StateRadarChartX = Number(parameters['StateRadarChartX'] || 48);
const StateRadarChartY = Number(parameters['StateRadarChartY'] || 48);
const StateRadarChart_FontSize = Number(parameters['StateRadarChart_FontSize'] || 0);
const RadarChartIcon = eval(parameters['RadarChartIcon'] || 'false');

const DeBuffList = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DeBuffList'])) : [];
const DeBuffUnknownIconId = Number(parameters['DeBuffUnknownIconId'] || 1);
const ShowDebuffIcon = eval(parameters['ShowDebuffIcon'] || 'false');

const DefaultBackGroundImg = String(parameters['DefaultBackGroundImg']);
const DefaultInfoBackGroundImg = String(parameters['DefaultInfoBackGroundImg']);
const CategoryBackGroundImg = String(parameters['CategoryBackGroundImg']);
const AllEnemyBookWindowVisible = eval(parameters['AllEnemyBookWindowVisible'] || 'true');
const BattleAllEnemyBookWindowVisible = eval(parameters['BattleAllEnemyBookWindowVisible'] || 'true');
const BackgoundWindowMode = eval(parameters['BackgoundWindowMode'] || 'false');

const bookContents = {};
bookContents.PageList1 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList1'])) : [];
bookContents.PageList2 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList2'])) : [];
bookContents.PageList3 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList3'])) : [];
bookContents.PageList4 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList4'])) : [];
bookContents.PageList5 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList5'])) : [];
bookContents.PageList6 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList6'])) : [];
bookContents.PageList7 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList7'])) : [];
bookContents.PageList8 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList8'])) : [];
bookContents.PageList9 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList9'])) : [];
bookContents.PageList10 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList10'])) : [];
bookContents.PageList11 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList11'])) : [];
bookContents.PageList12 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList12'])) : [];
bookContents.PageList13 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList13'])) : [];
bookContents.PageList14 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList14'])) : [];
bookContents.PageList15 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList15'])) : [];
bookContents.PageList16 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList16'])) : [];
bookContents.PageList17 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList17'])) : [];
bookContents.PageList18 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList18'])) : [];
bookContents.PageList19 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList19'])) : [];
bookContents.PageList20 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList20'])) : [];

const pageIndex = {category:0, index:0, page:0, infoIndex:0}

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
    if (!Imported.NUUN_EnemyBookEX_1) {
        return;
    }
    $gameSystem.enemyBookElementList(Number(args.enemyId), Number(args.elementId) - 1, Number(args.elementId) > 0, true);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookElementRemove', args => {
    if (!Imported.NUUN_EnemyBookEX_1) {
        return;
    }
    $gameSystem.enemyBookElementList(Number(args.enemyId), Number(args.elementId) - 1, Number(args.elementId) > 0, false);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookStateAdd', args => {
    if (!Imported.NUUN_EnemyBookEX_1) {
        return;
    }
    $gameSystem.enemyBookStateList(Number(args.enemyId), Number(args.stateId) - 1, Number(args.stateId) > 0, true);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookStateRemove', args => {
    if (!Imported.NUUN_EnemyBookEX_1) {
        return;
    }
    $gameSystem.enemyBookStateList(Number(args.enemyId), Number(args.stateId) - 1, Number(args.stateId) > 0, false);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookDebuffAdd', args => {
    if (!Imported.NUUN_EnemyBookEX_1) {
        return;
    }
    $gameSystem.enemyBookDebuffList(Number(args.enemyId), Number(args.debuffId) - 1, Number(args.debuffId) > 0, true);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookDebuffRemove', args => {
    if (!Imported.NUUN_EnemyBookEX_1) {
        return;
    }
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
  this._enemyBookFlags = this._enemyBookFlags || [];
  this._enemyBookStatusFlags = this._enemyBookStatusFlags || [];
  this._defeatNumber = this._defeatNumber || [];
  this._itemDorps = this._itemDorps || [];
  this._condItemDorps = this._condItemDorps || [];
  this._stealItem = this._stealItem || [];
  this._enemyBookElementFlags = this._enemyBookElementFlags || [];
  this._enemyBookStateFlags = this._enemyBookStateFlags || [];
  this._enemyBookDebuffFlags = this._enemyBookDebuffFlags || [];
  this._enemyBookActionFlags = this._enemyBookActionFlags || [];
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
  if (enemy && this.isInEnemyBook(enemy)) {
    const enemyCategory = enemy.meta.CategoryKey ? enemy.meta.CategoryKey.split(',') : [];
    for (key of enemyCategory) {
      const index = EnemyBookCategory.findIndex(category => category.CategoryKey === key);
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
  this._enemyBookCategoryFlags = [];
  const enemyBookCategoryLength = EnemyBookCategory.length;
  for (let i = 0; i < enemyBookCategoryLength; i++) {
    this._enemyBookCategoryFlags[i] = false;
  }
  const index = EnemyBookCategory.findIndex(category => category.CategoryKey === 'all');
  if (index >= 0) {
    this._enemyBookCategoryFlags[index] = true;
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
    if (Imported.NUUN_EnemyBookEX_1) {
      this.enemyBookElementList(enemyId, 0, false, false);
      this.enemyBookStateList(enemyId, 0, false, false);
      this.enemyBookDebuffList(enemyId, 0, false, false);
    }
    if (Imported.NUUN_EnemyBookEX_2) {
      this.condDropItemListFlag(enemyId, 0, false, false);
    }
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
  if (Imported.NUUN_EnemyBookEX_1) {
    this.clearEnemyBookElement();
    this.clearEnemyBookState();
    this.clearEnemyBookDebuff();
  }
  if (Imported.NUUN_EnemyBookEX_2) {
    this.clearCondDropItem();
  }
};

Game_System.prototype.completeEnemyBook = function() {
  for (let i = 1; i < $dataEnemies.length; i++) {
    this.addToEnemyBook(i);
    this.addStatusToEnemyBook(i);
    this.dropItemListFlag(i, 0, true, false);
    this.stealItemListFlag(i, 0, true, false);
    this.enemyBookActionList(i, 0, false, true);
    if (Imported.NUUN_EnemyBookEX_1) {
      this.enemyBookElementList(i, 0, false, true);
      this.enemyBookStateList(i, 0, false, true);
      this.enemyBookDebuffList(i, 0, false, true);
    }
    if (Imported.NUUN_EnemyBookEX_2) {
      this.condDropItemListFlag(i, 0, true, false);
    }
  }
};

Game_System.prototype.getEnemyBookFlag = function(enemyId) {
  return this._enemyBookFlags ? this._enemyBookFlags[enemyId] : false;
};

Game_System.prototype.isInEnemyBook = function(enemy) {
  return enemy && enemy.name && this.noEnemyBookEnemyName(enemy) && this._enemyBookFlags && this._enemyBookFlags[enemy.id];
};

Game_System.prototype.isInEnemyBookStatus = function(enemy) {
  return enemy && enemy.name && this.noEnemyBookEnemyName(enemy) && this._enemyBookStatusFlags && this._enemyBookStatusFlags[enemy.id];
};

Game_System.prototype.completeRateVariables = function(val) {
  const rate = this.completeRate();
  $gameVariables.setValue(val, rate);
};

Game_System.prototype.completeRate = function() {
  return this.onStatusEnemyDate() / this.bookEnemyDate() * 100;
};

Game_System.prototype.isEnemyBook = function(enemy) {//データベース
  return enemy && enemy.name && this.noEnemyBookEnemyName(enemy) && !enemy.meta.NoBook && !enemy.meta.NoBookData;
};

Game_System.prototype.isEnemyBookData = function(enemy) {//データベース
    return enemy && enemy.name && this.noEnemyBookEnemyName(enemy) && !enemy.meta.NoBook;
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
    return r + (enemy && enemy.name && this.noEnemyBookEnemyName(enemy) && (this.defeatNumber(enemy.id) > 0 || enemy.meta.ShowDataBook && !enemy.meta.NoBook && !enemy.meta.NoBookData) ? 1 : 0);
  }, 0);
};

Game_System.prototype.noEnemyBookEnemyName = function(enemy) {
  return NoDataName ? NoDataName !== enemy.name : true;
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
  if (!ShowDropItemName) {
    return;
  }
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
  if (!ShowStealItemName) {
    return;
  }
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

Game_System.prototype.registrationTiming = function(mode) {
  return RegistrationTiming.some(data => data.RegistrationTiming === mode && !data.RegisterStatus);
};

Game_System.prototype.registrationStatusTiming = function(mode) {
  return RegistrationTiming.some(data => data.RegistrationTiming === mode && data.RegisterStatus);
};

Game_System.prototype.registrationStatusNoTransform = function() {
    return RegistrationTiming.some(data => {
        (data.RegistrationTiming === 0 || data.RegistrationTiming === 1 || data.RegistrationTiming === 4) 
        && data.RegisterStatus;
    });
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
  if (!ShowActionName) {
    return;
  }
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
      const list = ElementList;
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
      const list = StateList;
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
      const list = DeBuffList;
      for(let i = 0; list.length > i; i++){
        this.setEnemyBookDebuffFlag(enemyId, list[i].ParamId, mode);
      }
    }
  }
};

Game_System.prototype.initEnemyBookNumber = function() {
  this._enemyBookNumber = [];
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
    for (const enemy of this.members()) {
        if (enemy.isAppeared()) {
        const enemyId = enemy.enemyId();
        if ($gameSystem.registrationTiming(0)) {
            $gameSystem.addToEnemyBook(enemyId);
        }
        if ($gameSystem.registrationStatusTiming(0)) {
            if (!$gameSystem.getEnemyBookFlag(enemyId)) {
                $gameSystem.addToEnemyBook(enemyId);
            }
            $gameSystem.addStatusToEnemyBook(enemyId);
            }
        }
    }
};


const _Game_BattlerBase_appear = Game_BattlerBase.prototype.appear;
Game_BattlerBase.prototype.appear = function() {
     _Game_BattlerBase_appear.call(this);
    if (this.isEnemy()) {
        const enemyId = this.enemyId();
        if ($gameTroop.inBattle()) {
            if ($gameSystem.registrationTiming(0)) {
                $gameSystem.addToEnemyBook(enemyId);
            }
            if ($gameSystem.registrationStatusTiming(0)) {
                if (!$gameSystem.getEnemyBookFlag(enemyId)) {
                $gameSystem.addToEnemyBook(enemyId);
                }
                $gameSystem.addStatusToEnemyBook(enemyId);
            }
        } else {
            if ($gameSystem.registrationTiming(4)) {
                $gameSystem.addToEnemyBook(enemyId);
            }
            if ($gameSystem.registrationStatusTiming(4)) {
                if (!$gameSystem.getEnemyBookFlag(enemyId)) {
                $gameSystem.addToEnemyBook(enemyId);
                }
                $gameSystem.addStatusToEnemyBook(enemyId);
            }
        }
    }
};

const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
    _Game_BattlerBase_die.call(this);
    if (this.isEnemy()) {
        const enemyId = this.enemyId();
        if ($gameSystem.registrationTiming(3)) {
            $gameSystem.addToEnemyBook(enemyId);
        }
        if ($gameSystem.registrationStatusTiming(3)) {
            if (!$gameSystem.getEnemyBookFlag(enemyId)) {
                $gameSystem.addToEnemyBook(enemyId);
            }
            $gameSystem.addStatusToEnemyBook(enemyId);
        }
    $gameSystem.defeatCount(enemyId);
    }
};

//Game_Enemy
const _Game_Enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
    if (TransformDefeat && !this.enemy().meta.NoTransformInData) {
        $gameSystem.defeatCount(enemyId);
        if ($gameSystem.registrationStatusNoTransform()) {
            if (!$gameSystem.getEnemyBookFlag(enemyId)) {
                $gameSystem.addToEnemyBook(enemyId);
            }
            $gameSystem.addStatusToEnemyBook(enemyId);
        }
    }
    _Game_Enemy_transform.call(this, enemyId);
    if ($gameSystem.registrationTiming(0)) {
        $gameSystem.addToEnemyBook(enemyId);
    }
    if ($gameSystem.registrationStatusTiming(0)) {
        if (!$gameSystem.getEnemyBookFlag(enemyId)) {
            $gameSystem.addToEnemyBook(enemyId);
        }
        $gameSystem.addStatusToEnemyBook(enemyId);
    }
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


const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
  _Game_Action_applyItemUserEffect.call(this, target);
  this.analyzeSkill(target);
};

Game_Action.prototype.analyzeSkill = function(target) {
    if (target.isEnemy() && $gameSystem.isEnemyBookData(target.enemy())) {
        const data = this.item().meta.AnalyzeSkill ? this.item().meta.AnalyzeSkill.split(',').map(Number) : [-1];
        if (data[0] >= 0) {
            const analyzeSkill = AnalyzeSkillMode[data[0] - 1];
            if (analyzeSkill) {
                target.result().analyzeSkill = true;
                const rate = this.item().meta.CertainAnalyze || !target.enemy().meta.AnalyzeResist ? 100 : Number(target.enemy().meta.AnalyzeResist);
                if (Math.floor(Math.random() * 100 >= rate)) {
                    target.result().missed = true;
                    BattleManager.analyzeMissMessage = analyzeSkill.AnalyzeMissMessage.format(target.name(), this.subject().name());
                    return;
                }
                this.makeSuccess(target);
                if (data[0] === 0 && data[1] > 0) {
                    $gameVariables.setValue(CommonVariableID, target.enemy().id);
                    $gameTemp.reserveCommonEvent(data[1]);
                } else {
                    SceneManager._scene.setEnemyBookEnemyAnalyze(target, analyzeSkill);
                }
            }
        }
    }
};

const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    _Game_ActionResult_clear.call(this);
    this.analyzeSkill = false;
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
    if(ShowCommand && ($gameSwitches.value(enemyBookSwitch) || enemyBookSwitch === 0)) {
        this.addCommand(CommandName, "enemyBook");
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
    this._backGroundImg = null;
};

Scene_EnemyBook.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    this.createEnemybookBackground();
};
  
Scene_EnemyBook.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createPercentWindow();
    this.createCategoryNameWindow();
    this.createCategoryWindow();
    this.createIndexEnemyWindow();
    this.createEnemyPageWindow();
    this.createEnemyWindow();
    this.updateEnemyBookBackground();
    this.createEnemyBookButton();
    this.openBook();
};

Scene_EnemyBook.prototype.createEnemybookBackground = function() {
    const sprite = new Sprite();
    this.addChild(sprite);
    this._enemyBookBackgroundSprite = sprite;
    sprite.show();
};

Scene_EnemyBook.prototype.updateEnemyBookBackground = function() {
    const sprite = this._enemyBookBackgroundSprite;
    const img = this.getEnemyBookBackground();
    if (sprite.bitmapName !== img) {
        const bitmap = img ? ImageManager.nuun_LoadPictures(img) : null;
        sprite.bitmap = bitmap;
        sprite.bitmapName = img;
        if (bitmap) {
            bitmap.addLoadListener(function() {
                this.backgroundRefresh();
            }.bind(this));
        }
    }
};

Scene_EnemyBook.prototype.backgroundRefresh = function() {
    const sprite = this._enemyBookBackgroundSprite;
    if (BackUiWidth) {
        sprite.x = (Graphics.width - Graphics.boxWidth) / 2 - 4;
        sprite.y = (Graphics.height - Graphics.boxHeight) / 2 - 4;
    } else {
        sprite.x = 0;
        sprite.y = 0;
    }
    if (BackFitWidth) {
        if(BackUiWidth) {
            sprite.scale.x = (this.width !== sprite.bitmap.width ? this.width / sprite.bitmap.width : 1);
            sprite.scale.y = (this.height !== sprite.height ? this.height / sprite.bitmap.height : 1);
        } else {
            sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
            sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
        }
    }
};

Scene_EnemyBook.prototype.createPercentWindow = function() {
    if (PercentWindowShow) {
        const rect = this.percentWindowRect();
        this._percentWindow = new Window_EnemyBook_Percent(rect);
        this.addWindow(this._percentWindow);
        if (!AllEnemyBookWindowVisible) {
          this._percentWindow.opacity = 0;
        }
    } else {
        this._percentWindow = null;
    }
};

Scene_EnemyBook.prototype.createCategoryWindow = function() {
    if (CategoryShow) {
        const rect = this.categoryWindowRect();
        this._categoryWindow = new Window_EnemyBook_Category(rect);
        this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
        this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
        this.addWindow(this._categoryWindow);
        this._categoryWindow.setCategoryNameWindow(this._categoryNameWindow);
        if (!AllEnemyBookWindowVisible) {
          this._categoryWindow.opacity = 0;
        }
    } else {
        this._categoryWindow = null;
    }
};

Scene_EnemyBook.prototype.createCategoryNameWindow = function() {
    if (CategoryShow) {
        const rect = this.categoryNameWindowRect();
        this._categoryNameWindow = new Window_EnemyBook_CategoryName(rect);
        this.addWindow(this._categoryNameWindow);
        if (!AllEnemyBookWindowVisible) {
          this._categoryNameWindow.opacity = 0;
        }
    } else {
        this._categoryNameWindow = null;
    }
};

Scene_EnemyBook.prototype.createEnemyPageWindow = function() {
    pageIndex.page = 0;
    const rect = this.enemyWindowPageRect();
    this._enemyPageWindow = new Window_EnemyBookPage(rect);
    this.addWindow(this._enemyPageWindow);
    this._enemyPageWindow.setPageList(PageSetting, PageCols);
    this._enemyPageWindow.setIndexWindow(this._indexWindow);
    if (!AllEnemyBookWindowVisible) {
      this._enemyPageWindow.opacity = 0;
    }
};

Scene_EnemyBook.prototype.createIndexEnemyWindow = function() {
    const rect = this.indexWindowRect();
    this._indexWindow = new Window_EnemyBook_Index(rect);
    this._indexWindow.setHandler("cancel", this.onEnemyIndexCancel.bind(this));
    this.addWindow(this._indexWindow);
    this._indexWindow.setPercentWindow(this._percentWindow);
    if (this._categoryWindow) {
        this._categoryWindow.setEnemyIndexWindow(this._indexWindow);
        this._indexWindow.hide();
    } else {
        this._indexWindow.activate();
    }
    if (!AllEnemyBookWindowVisible) {
        this._indexWindow.opacity = 0;
    }
};

Scene_EnemyBook.prototype.createEnemyWindow = function() {
    const rect = this.enemyWindowRect();
    this._enemyWindow = new Window_EnemyBook(rect);
    this.addWindow(this._enemyWindow);
    this._indexWindow.setEnemyWindow(this._enemyWindow);
    this._enemyPageWindow.setEnemyWindow(this._enemyWindow);
    if (!AllEnemyBookWindowVisible) {
        this._enemyWindow.opacity = 0;
    }
};

Scene_EnemyBook.prototype.percentWindowRect = function() {
    const wx = WindowMode === 0 ? 0 : this.enemyWindowWidth();
    const wy = this.mainAreaTop();
    const ww = this.indexWidth();
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowPageRect = function() {
    const wx = WindowMode === 0 ? this.indexWidth() : 0;
    const wh = this.calcWindowHeight(1, true);
    const wy = PageWindowsShow ? this.mainAreaTop() : (wh + (Graphics.height - Graphics.boxHeight) / 2) * -1;
    const ww = this.enemyWindowWidth();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.indexWindowRect = function() {
    const height = (this._percentWindow ? this._percentWindow.height : 0) + (this._categoryNameWindow ? this._categoryNameWindow.height : 0);
    const wx = WindowMode === 0 ? 0 : this.enemyWindowWidth();
    const wy = this.mainAreaTop() + height;
    const ww = this.indexWidth();
    const wh = this.mainAreaHeight() - height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.categoryWindowRect = function() {
    const height = (this._percentWindow ? this._percentWindow.height : 0);
    const wx = WindowMode === 0 ? 0 : this.enemyWindowWidth();
    const wy = this.mainAreaTop() + height;
    const ww = this.indexWidth();
    const wh = this.mainAreaHeight() - height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.categoryNameWindowRect = function() {
    const wx = WindowMode === 0 ? 0 : this.enemyWindowWidth();
    const wy = this.mainAreaTop() + (this._percentWindow ? this._percentWindow.height : 0);
    const ww = this.indexWidth();
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowRect = function() {
    const wx = WindowMode === 0 ? this.indexWidth() : 0;
    const wy = this.mainAreaTop() + (PageWindowsShow ? this._enemyPageWindow.height : 0);
    const ww = this.enemyWindowWidth();
    const wh = this.mainAreaHeight() - (PageWindowsShow ? this._enemyPageWindow.height : 0);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.createEnemyBookButton = function() {
    if (ConfigManager.touchUI) {
        this._enemyBook_downButton = new Sprite_Button("pagedown");
        this._enemyBook_upButton = new Sprite_Button("pageup");
        this.addWindow(this._enemyBook_downButton);
        this.addWindow(this._enemyBook_upButton);
        this.setEnemyBookButton();
        this._enemyBook_downButton.setClickHandler(this.updateEnemyBookPagedownButton.bind(this));
        this._enemyBook_upButton.setClickHandler(this.updateEnemyBookPageupButton.bind(this));
    }
};

Scene_EnemyBook.prototype.setEnemyBookButton = function() {
    if (this._cancelButton && this._enemyBook_downButton && this._enemyBook_upButton) {
        this._enemyBook_downButton.x = (this._cancelButton ? this._cancelButton.x - 20 : 0) - this._enemyBook_downButton.width;
        this._enemyBook_downButton.y = this.buttonY();
        this._enemyBook_upButton.x = this._enemyBook_downButton.x - this._enemyBook_upButton.width - 4;
        this._enemyBook_upButton.y = this.buttonY();
    }
};

Scene_EnemyBook.prototype.openBook = function() {
    if (!CategoryShow) {
        this.enemyIndexSelection();
    }
};

Scene_EnemyBook.prototype.enemyWindowWidth = function() {
    return Graphics.boxWidth - this.indexWidth();
};
  
Scene_EnemyBook.prototype.helpAreaHeight = function() {
    return 0;
};

Scene_EnemyBook.prototype.indexWidth = function() {
    return BookWidth > 0 ? Graphics.boxWidth - BookWidth : Math.floor(Graphics.boxWidth / 3);
};

Scene_EnemyBook.prototype.onEnemyIndexCancel = function() {
    if (CategoryShow) {
      this.enemyCategorySelection();
    } else {
      this.popScene();
    }
};

Scene_EnemyBook.prototype.onCategoryOk = function() {
    this.enemyIndexSelection();
};

Scene_EnemyBook.prototype.enemyIndexSelection = function() {
    if (CategoryShow) {
      this._categoryWindow.hide();
      this._categoryWindow.deselect();
      this._categoryWindow.deactivate();
    }
    this._indexWindow.refresh();
    this._indexWindow.show();
    this._indexWindow.activate();
    this._enemyPageWindow.activate();
    this._enemyPageWindow.select(pageIndex.page);
    this._enemyPageWindow.refresh();
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
    this._enemyPageWindow.refresh();
};

Scene_EnemyBook.prototype.updateEnemyBookPagedownButton = function() {
    this._enemyPageWindow.cursorLeft(true);
    SoundManager.playCursor();
};
  
Scene_EnemyBook.prototype.updateEnemyBookPageupButton = function() {
    this._enemyPageWindow.cursorRight(true);
    SoundManager.playCursor();
};

Scene_EnemyBook.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    this.updateEnemyBookBackground();
};

Scene_EnemyBook.prototype.getEnemyBookBackground = function() {
    if (this._categoryWindow && this._categoryWindow.active) {
        return CategoryBackGroundImg ? CategoryBackGroundImg : DefaultBackGroundImg;
    }
    const data = this._enemyWindow.getDisplayPage();
    if (data && data.BackGroundImg) {
        return data.BackGroundImg;
    } else {
        return DefaultBackGroundImg;
    }
};

//Scene_Battle
const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
    _Scene_Battle_createPartyCommandWindow.call(this);
    this._partyCommandWindow.setHandler("enemyBook", this.commandEnemyBook.bind(this));
    this._partyCommandWindow.setHandler("enemyBookInfo", this.commandEnemyBookInfo.bind(this));
};

const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  _Scene_Battle_createAllWindows.call(this);
  this.createEnemyBookWindow();
};

Scene_Battle.prototype.createEnemyBookWindow = function() {
    this.createEnemyBookBackground();
    this.createEnemyBookPercentWindow();
    this.createEnemyBookCategoryNameWindow();
    this.createEnemyBookCategoryWindow();
    this.createEnemyBookIndexWindow();
    this.createEnemyBookInfoIndexWindow();
    this.createEnemyBookPageWindow();
    this.createEnemyBookStatusWindow();
    this.createEnemyBookButton();
};

Scene_Battle.prototype.createEnemyBookBackground = function() {
    const sprite = new Sprite();
    this.addChild(sprite);
    this._enemyBookBackgroundSprite = sprite;
    sprite.hide();
};

Scene_Battle.prototype.createEnemyBookPercentWindow = function() {
    if (PercentWindowShow) {
        const rect = this.enemyBookPercentWindowRect();
        this._enemyBookPercentWindow = new Window_EnemyBook_Percent(rect);
        this.createEnemyBookAddWindow(this._enemyBookPercentWindow, true);
    } else {
        this._enemyBookPercentWindow = null;
    }
};

Scene_Battle.prototype.createEnemyBookCategoryNameWindow = function() {
    if (CategoryShow) {
        const rect = this.enemyBookCategoryNameWindowRect();
        this._enemyBookCategoryNameWindow = new Window_EnemyBook_CategoryName(rect);
        this.createEnemyBookAddWindow(this._enemyBookCategoryNameWindow, false);
    } else {
        this._enemyBookCategoryNameWindow = null;
    }
};

Scene_Battle.prototype.createEnemyBookCategoryWindow = function() {
    if (CategoryShow) {
        const rect = this.enemyBookCategoryWindowRect();
        this._enemyBookCategoryWindow = new Window_EnemyBook_Category(rect);
        this._enemyBookCategoryWindow.setHandler("cancel",this.cancelEnemyBook.bind(this));
        this._enemyBookCategoryWindow.setHandler("ok", this.onEnemyBookCategoryOk.bind(this));
        this.createEnemyBookAddWindow(this._enemyBookCategoryWindow, true);
        this._enemyBookCategoryWindow.setCategoryNameWindow(this._enemyBookCategoryNameWindow);
        this._enemyBookCategoryWindow.deactivate();
    } else {
        this._enemyBookCategoryWindow = null;
    }
};

Scene_Battle.prototype.createEnemyBookIndexWindow = function() {
    const rect = this.enemyBookIndexWindowRect();
    this._enemyBookIndexWindow = new Window_EnemyBook_Index(rect);
    this._enemyBookIndexWindow.setHandler("cancel", this.onEnemyBookIndexCancel.bind(this));
    this.createEnemyBookAddWindow(this._enemyBookIndexWindow, true);
    this._enemyBookIndexWindow.setPercentWindow(this._enemyBookPercentWindow);
    if (this._enemyBookCategoryWindow) {
        this._enemyBookCategoryWindow.setEnemyIndexWindow(this._enemyBookIndexWindow);
    }
};

Scene_Battle.prototype.createEnemyBookInfoIndexWindow = function() {
    const rect = this.enemyBookInfoIndexWindowRect();
    this._enemyBookInfoIndexWindow = new Window_EnemyBook_InfoIndex(rect);
    this._enemyBookInfoIndexWindow.setHandler("cancel", this.onEnemyBookInfoCancel.bind(this));
    this.createEnemyBookAddWindow(this._enemyBookInfoIndexWindow, true);
};

Scene_Battle.prototype.createEnemyBookPageWindow = function() {
    const rect = this.enemyBookPageWindowRect();
    this._enemyBookPageWindow = new Window_EnemyBookPage(rect);
    this._enemyBookPageWindow.setHandler("cancel", this.onEnemyBookPageCancel.bind(this));
    this.createEnemyBookAddWindow(this._enemyBookPageWindow, true);
    this._enemyBookPageWindow.setIndexWindow(this._enemyBookIndexWindow);
    this._enemyBookPageWindow.setInfoIndexWindow(this._enemyBookInfoIndexWindow);
    this._enemyBookPageWindow.deactivate();
};

Scene_Battle.prototype.createEnemyBookStatusWindow = function() {
    const rect = this.enemyBookWindowRect();
    this._enemyBookEnemyWindow = new Window_BattleEnemyBook(rect);
    this.createEnemyBookAddWindow(this._enemyBookEnemyWindow, true);
    this._enemyBookIndexWindow.setEnemyWindow(this._enemyBookEnemyWindow);
    this._enemyBookInfoIndexWindow.setEnemyWindow(this._enemyBookEnemyWindow);
    this._enemyBookPageWindow.setEnemyWindow(this._enemyBookEnemyWindow);
    BattleManager.setEnemyBookWinsow(this._enemyBookEnemyWindow);
};

Scene_Battle.prototype.createEnemyBookButton = function() {
    if (ConfigManager.touchUI) {
        this._enemyBook_cancelButton = new Sprite_Button("cancel");
        this._enemyBook_downButton = new Sprite_Button("pagedown");
        this._enemyBook_upButton = new Sprite_Button("pageup");
        this.createEnemyBookAddWindow(this._enemyBook_cancelButton, false);
        this.createEnemyBookAddWindow(this._enemyBook_downButton, false);
        this.createEnemyBookAddWindow(this._enemyBook_upButton, false);
        this.setEnemyBookButton();
        this._enemyBook_downButton.setClickHandler(this.updateEnemyBookPagedownButton.bind(this));
        this._enemyBook_upButton.setClickHandler(this.updateEnemyBookPageupButton.bind(this));
    }
};

Scene_Battle.prototype.setEnemyBookButton = function() {
    let x = this._enemyBookEnemyWindow.x + this._enemyBookEnemyWindow.width;
    const y = this.enemyBookButtonY() + this.enemyBookWindowUi_Y();
    if (this._enemyBook_cancelButton) {
        this._enemyBook_cancelButton.x = x - this._enemyBook_cancelButton.width;
        this._enemyBook_cancelButton.y = y;
    }
    if (this._enemyBook_downButton && this._enemyBook_upButton) {
        this._enemyBook_downButton.x = (this._enemyBook_cancelButton ? this._enemyBook_cancelButton.x - 20 : 0) - this._enemyBook_downButton.width;
        this._enemyBook_downButton.y = y;
        this._enemyBook_upButton.x = this._enemyBook_downButton.x - this._enemyBook_upButton.width - 4;
        this._enemyBook_upButton.y = y;
    }
};

Scene_Battle.prototype.enemyBookButtonY = function() {
    return Math.floor((this.buttonAreaHeight() - 48) / 2);
};

Scene_Battle.prototype.enemyBookPercentWindowRect = function() {
    const wx = WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
    const wy = this.enemyBookMainAreaTop();
    const ww = this.enemyBookIndexWidth();
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookCategoryNameWindowRect = function() {
    const wx = WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
    const wy = this.enemyBookMainAreaTop() + (this._enemyBookPercentWindow ? this._enemyBookPercentWindow.height : 0);
    const ww = this.enemyBookIndexWidth();
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookCategoryWindowRect = function() {
    const height = (this._enemyBookPercentWindow ? this._enemyBookPercentWindow.height : 0);
    const wx = WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
    const wy = this.enemyBookMainAreaTop() + height;
    const ww = this.enemyBookIndexWidth();
    const wh = this.enemyBookMainAreaHeight() - height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookIndexWindowRect = function() {
    const height = (this._enemyBookPercentWindow ? this._enemyBookPercentWindow.height : 0) + (this._enemyBookCategoryNameWindow ? this._enemyBookCategoryNameWindow.height : 0);
    const wx = WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
    const wy = this.enemyBookMainAreaTop() + height;
    const ww = this.enemyBookIndexWidth();
    const wh = this.enemyBookMainAreaHeight() - height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookInfoIndexWindowRect = function() {
    const wx = WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
    const wy = this.enemyBookMainAreaTop();
    const ww = this.enemyBookIndexWidth();
    const wh = this.enemyBookMainAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookPageWindowRect = function() {
    const wx = WindowMode === 0 ? this.enemyBookIndexWidth() : 0;
    const wh = this.calcWindowHeight(1, true);
    const wy = this.enemyBookMainAreaTop();
    const ww = this.enemyBookWindowWidth();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookWindowRect = function() {
    const wx = WindowMode === 0 ? this.enemyBookIndexWidth() : 0;
    const wy = this.enemyBookMainAreaTop();
    const ww = this.enemyBookWindowWidth();
    const wh = Graphics.boxHeight;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookAnalyzeWindowRect = function() {
    const ww = this.enemyBookWindowWidth();
    const wx = (Graphics.width - ww) / 2;
    const wy = this.enemyBookMainAreaTop();
    const wh = Graphics.boxHeight;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createEnemyBookAddWindow = function(windowDate, openness) {
    if (BackgoundWindowMode) {
        this.addChild(windowDate);
    } else {
        this.addWindow(windowDate);
    }
    windowDate.x += this.enemyBookWindowUi_X();
    windowDate.y += this.enemyBookWindowUi_Y();
    windowDate.hide();
    if (!BattleAllEnemyBookWindowVisible) {
        windowDate.opacity = 0;
    } else {
        if (openness) {
            windowDate.openness = 0;
        }
    }
};

Scene_Battle.prototype.enemyBookWindowClose = function(window) {
    if (BattleAllEnemyBookWindowVisible) {
        window.close();
    } else {
        window.hide();
    }
};

Scene_Battle.prototype.enemyBookWindowUi_X = function() {
    return BackgoundWindowMode ? (Graphics.width - Graphics.boxWidth) / 2 : 0;
};

Scene_Battle.prototype.enemyBookWindowUi_Y = function() {
    return BackgoundWindowMode ? (Graphics.height - Graphics.boxHeight) / 2 : 0;
};

Scene_Battle.prototype.enemyBookWindowWidth = function() {
    return Graphics.boxWidth - this.enemyBookIndexWidth();
};
  
Scene_Battle.prototype.enemyBookIndexWidth = function() {
    return BookWidth > 0 ? Graphics.boxWidth - BookWidth : Math.floor(Graphics.boxWidth / 3);
};

Scene_Battle.prototype.pageWindowsShowMode = function(list) {
    return PageWindowsShow && list.length > 1;
};

Scene_Battle.prototype.enemyBookMainAreaTop = function() {
    const y = 0;
    if (NoTouchUIWindow && !ConfigManager.touchUI) {
      return y;
    }
    return y + this.buttonAreaHeight();
};
  
Scene_Battle.prototype.enemyBookMainAreaHeight = function() {
    return Graphics.boxHeight - this.enemyBookMainAreaTop();
};

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  this.updateEnemyBookBackground();
  this.updatePageCancelButton();
  this.updatePageupdownButton();
};

Scene_Battle.prototype.updateEnemyBookBackground = function() {
    if (BackgoundWindowMode) {
        const sprite = this._enemyBookBackgroundSprite;
        const img = this.getEnemyBookBackground();
        if (sprite.bitmapName !== img) {
            const bitmap = img ? ImageManager.nuun_LoadPictures(img) : null;
            sprite.bitmap = bitmap;
            sprite.bitmapName = img;
            if (bitmap) {
                bitmap.addLoadListener(function() {
                    this.backgroundRefresh();
                }.bind(this));
            }
        }
    }
};

Scene_Battle.prototype.backgroundRefresh = function() {
    const sprite = this._enemyBookBackgroundSprite;
    if (BackUiWidth) {
        sprite.x = (Graphics.width - Graphics.boxWidth) / 2 - 4;
        sprite.y = (Graphics.height - Graphics.boxHeight) / 2 - 4;
    } else {
        sprite.x = 0;
        sprite.y = 0;
    }
    if (BackFitWidth) {
        if(BackUiWidth) {
            sprite.scale.x = (this.width !== sprite.bitmap.width ? this.width / sprite.bitmap.width : 1);
            sprite.scale.y = (this.height !== sprite.height ? this.height / sprite.bitmap.height : 1);
        } else {
            sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
            sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
        }
    }
};

Scene_Battle.prototype.updatePageCancelButton = function() {
    if (this._enemyBook_cancelButton) {
        this._enemyBook_cancelButton.visible = this._enemyBookPageWindow.active || (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active);
    }
};

Scene_Battle.prototype.updatePageupdownButton = function() {
    if (this._enemyBook_downButton) {
        this._enemyBook_downButton.visible = this._enemyBookPageWindow.active && this.updatePageupdownButtonBookMode();
    }
    if (this._enemyBook_upButton) {
        this._enemyBook_upButton.visible = this._enemyBookPageWindow.active && this.updatePageupdownButtonBookMode();
    }
};

Scene_Battle.prototype.updateEnemyBookPagedownButton = function() {
    this._enemyBookPageWindow.cursorLeft(true);
    SoundManager.playCursor();
};
  
Scene_Battle.prototype.updateEnemyBookPageupButton = function() {
    this._enemyBookPageWindow.cursorRight(true);
    SoundManager.playCursor();
};

Scene_Battle.prototype.updatePageupdownButtonBookMode = function() {
    return this._enemyBookEnemyWindow.getEnemyStatusList().length > 1;
};

Scene_Battle.prototype.getEnemyBookBackground = function() {
    if (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active) {
        return CategoryBackGroundImg ? CategoryBackGroundImg : DefaultBackGroundImg;
    }
    const data = this._enemyBookEnemyWindow.getDisplayPage();
    if (data && data.BackGroundImg) {
        return data.BackGroundImg;
    } else {
        switch (this._enemyBookEnemyWindow._mode) {
            case 'book':
                return DefaultBackGroundImg
            case 'info':
                return DefaultInfoBackGroundImg;
            default:
                return null;
        }
    }
};

Scene_Battle.prototype.setEnemyBook = function() {
    const rect = this.enemyBookWindowRect();
    const pageRect = this.enemyBookPageWindowRect();
    this._enemyBookPageWindow.y = pageRect.y - (this.pageWindowsShowMode(PageSetting) ? 0 : this._enemyBookPageWindow.height + pageRect.y) + this.enemyBookWindowUi_Y() - (Graphics.height - Graphics.boxHeight) / 2;
    this._enemyBookEnemyWindow.x = rect.x + this.enemyBookWindowUi_X();
    this._enemyBookPageWindow.x = this._enemyBookEnemyWindow.x;
    this._enemyBookEnemyWindow.y = rect.y + (this.pageWindowsShowMode(PageSetting) ? this._enemyBookPageWindow.height : 0) + this.enemyBookWindowUi_Y();
    this._enemyBookEnemyWindow.width = rect.width;
    this._enemyBookEnemyWindow.height = rect.height - (rect.y + (this.pageWindowsShowMode(PageSetting) ? this._enemyBookPageWindow.height : 0));
    this._enemyBookEnemyWindow.setMode('book');
    this._enemyBookEnemyWindow.setEnemyData(null);
    this._enemyBookPageWindow.setPageList(PageSetting, PageCols);
    this.setEnemyBookButton();
    BattleManager.enemyBook_Open = true;
    this.updateEnemyBookBackground();
    this._enemyBookBackgroundSprite.show();
};

Scene_Battle.prototype.setEnemyBookInfo = function() {
    const rect = this.enemyBookWindowRect();
    const pageRect = this.enemyBookPageWindowRect();
    this._enemyBookPageWindow.y = pageRect.y - (this.pageWindowsShowMode(InfoPageSetting) ? 0 : this._enemyBookPageWindow.height + pageRect.y) + this.enemyBookWindowUi_Y() - (Graphics.height - Graphics.boxHeight) / 2;
    this._enemyBookEnemyWindow.x = rect.x + this.enemyBookWindowUi_X();
    this._enemyBookPageWindow.x = this._enemyBookEnemyWindow.x;
    this._enemyBookEnemyWindow.y = rect.y + (this.pageWindowsShowMode(InfoPageSetting) ? this._enemyBookPageWindow.height : 0) + this.enemyBookWindowUi_Y();
    this._enemyBookEnemyWindow.width = rect.width;
    this._enemyBookEnemyWindow.height = rect.height - (rect.y + (this.pageWindowsShowMode(InfoPageSetting) ? this._enemyBookPageWindow.height : 0));
    this._enemyBookEnemyWindow.setMode('info');
    this._enemyBookEnemyWindow.setEnemyData(null);
    this._enemyBookPageWindow.setPageList(InfoPageSetting, InfoPageCols);
    this.setEnemyBookButton();
    BattleManager.enemyBook_Open = true;
    this.updateEnemyBookBackground();
    this._enemyBookBackgroundSprite.show();
};

Scene_Battle.prototype.setEnemyBookEnemyAnalyze = function(target, analyzeDate) {
    const rect = this.enemyBookAnalyzeWindowRect();
    const pageRect = this.enemyBookPageWindowRect();
    const id = analyzeDate.ListNumber;
    let data = null;
    let cols = 0;
    if (data = id > 0 && AnalyzeListData[id]) {
        data = AnalyzeListData[id].AnalyzePageList;
        cols = analyzeDate.PageCols;
        this._enemyBookEnemyWindow.setMode('analyze', analyzeDate);
    } else {
        data = PageSetting;
        cols = PageCols;
        this._enemyBookEnemyWindow.setMode('analyze');
    }
    this._enemyBookPageWindow.y = pageRect.y - (this.pageWindowsShowMode(data) ? 0 : this._enemyBookPageWindow.height + pageRect.y) + this.enemyBookWindowUi_Y() - (Graphics.height - Graphics.boxHeight) / 2;
    this._enemyBookPageWindow.x = rect.x;
    this._enemyBookEnemyWindow.x = rect.x;
    this._enemyBookEnemyWindow.y = rect.y + (this.pageWindowsShowMode(data) ? this._enemyBookPageWindow.height : 0) + this.enemyBookWindowUi_Y();
    this._enemyBookEnemyWindow.width = rect.width;
    this._enemyBookEnemyWindow.height = rect.height - (rect.y + (this.pageWindowsShowMode(data) ? this._enemyBookPageWindow.height : 0));
    this._enemyBookEnemyWindow.selectEnemy = target;
    this._enemyBookEnemyWindow.setEnemyData(target.enemy());
    this._enemyBookPageWindow.setPageList(data, analyzeDate.PageCols);
    this.enemyBookEnemyAnalyze();
    this.setEnemyBookButton();
    BattleManager.enemyBook_Open = true;
    this.updateEnemyBookBackground();
    this._enemyBookBackgroundSprite.show();
};

Scene_Battle.prototype.commandEnemyBook = function() {
    this.setEnemyBook();
    if (PercentWindowShow) {
        this._enemyBookPercentWindow.show();
        this._enemyBookPercentWindow.open();
    }
    if (CategoryShow) {
        this.openEnemyBookCategory();
    } else {
        this.onEnemyBookCategoryOk();
    }
    this._enemyBookPageWindow.show();
    this._enemyBookEnemyWindow.show();
    this._enemyBookPageWindow.open();
    this._enemyBookEnemyWindow.open();
    pageIndex.page = 0;
};

Scene_Battle.prototype.commandEnemyBookInfo = function() {
    this.setEnemyBookInfo();
    this._enemyBookInfoIndexWindow.show();
    this._enemyBookInfoIndexWindow.open();
    this._enemyBookPageWindow.show();
    this._enemyBookEnemyWindow.show();
    this._enemyBookPageWindow.open();
    this._enemyBookEnemyWindow.open();
    this._enemyBookInfoIndexWindow.activate();
    this._enemyBookPageWindow.activate();
    this._enemyBookPageWindow.select(0);
    this._enemyBookPageWindow.refresh();
    this._enemyBookInfoIndexWindow.refresh();
};

Scene_Battle.prototype.enemyBookEnemyAnalyze = function() {
    this._enemyBookPageWindow.show();
    this._enemyBookEnemyWindow.show();
    this._enemyBookPageWindow.open();
    this._enemyBookEnemyWindow.open();
    this._enemyBookPageWindow.activate();
    this._enemyBookPageWindow.select(0);
    this._enemyBookPageWindow.refresh();
};

Scene_Battle.prototype.openEnemyBookCategory = function() {
    this._enemyBookCategoryWindow.show();
    this._enemyBookCategoryWindow.open();
    this._enemyBookCategoryWindow.activate();
    this._enemyBookCategoryWindow.refresh();
    this._enemyBookCategoryNameWindow.hide();
    this._enemyBookIndexWindow.hide();
    this._enemyBookPageWindow.deselect();
    this._enemyBookPageWindow.deactivate();
    this._enemyBookPageWindow.refresh();
    this._enemyBookIndexWindow.deselect();
    this._enemyBookIndexWindow.deactivate();
};

Scene_Battle.prototype.onEnemyBookCategoryOk = function() {
    if (CategoryShow) {
        this._enemyBookCategoryWindow.hide();
        this._enemyBookCategoryWindow.deselect();
        this._enemyBookCategoryWindow.deactivate();
        this._enemyBookCategoryNameWindow.show();
        this._enemyBookCategoryNameWindow.open();
    }
    this._enemyBookIndexWindow.show();
    this._enemyBookIndexWindow.open();
    this._enemyBookIndexWindow.activate();
    this._enemyBookIndexWindow.refresh();
    this._enemyBookPageWindow.activate();
    this._enemyBookPageWindow.select(pageIndex.page);
    this._enemyBookPageWindow.refresh();
};

Scene_Battle.prototype.onEnemyBookIndexCancel = function() {
    if (CategoryShow) {
        this.openEnemyBookCategory();
    } else {
        this.cancelEnemyBook();
    }
};

Scene_Battle.prototype.onEnemyBookInfoCancel = function() {
    this.enemyBookWindowClose(this._enemyBookInfoIndexWindow);
    this._enemyBookInfoIndexWindow.deselect();
    this._enemyBookInfoIndexWindow.deactivate();
    this.enemyBookWindowClose(this._enemyBookPageWindow);
    this._enemyBookPageWindow.deselect();
    this._enemyBookPageWindow.deactivate();
    this.enemyBookWindowClose(this._enemyBookEnemyWindow);
    BattleManager.enemyBook_Open = false;
    this._enemyBookBackgroundSprite.hide();
    if (this._partyCommandWindow.isOpen()) {
        this._partyCommandWindow.activate();
    } else if (this._actorCommandWindow.isOpen()) {
        this._actorCommandWindow.activate();
    } else {
        this._partyCommandWindow.activate();
    }
};

Scene_Battle.prototype.onEnemyBookPageCancel = function() {
    if (this._enemyBookEnemyWindow._mode === "analyze") {
        this.enemyBookWindowClose(this._enemyBookEnemyWindow);
        this.enemyBookWindowClose(this._enemyBookPageWindow);
        this._enemyBookPageWindow.deselect();
        this._enemyBookPageWindow.deactivate();
        this._enemyBookBackgroundSprite.hide();
        BattleManager.enemyBook_Open = false;
    }
};

Scene_Battle.prototype.cancelEnemyBook = function() {
    if (PercentWindowShow) {
        this.enemyBookWindowClose(this._enemyBookPercentWindow);
    }
    if (CategoryShow) {
        this.enemyBookWindowClose(this._enemyBookCategoryWindow);
        this.enemyBookWindowClose(this._enemyBookCategoryNameWindow);
        this._enemyBookCategoryWindow.deselect();
        this._enemyBookCategoryWindow.deactivate();
    } else {
        this.enemyBookWindowClose(this._enemyBookIndexWindow);
        this._enemyBookIndexWindow.deselect();
        this._enemyBookIndexWindow.deactivate();
        this._enemyBookPageWindow.deselect();
        this._enemyBookPageWindow.deactivate();
    }
    this.enemyBookWindowClose(this._enemyBookEnemyWindow);
    this.enemyBookWindowClose(this._enemyBookPageWindow);
    BattleManager.enemyBook_Open = false;
    this._enemyBookBackgroundSprite.hide();
    if (this._partyCommandWindow.isOpen()) {
        this._partyCommandWindow.activate();
    } else if (this._actorCommandWindow.isOpen()) {
        this._actorCommandWindow.activate();
    } else {
        this._partyCommandWindow.activate();
    }
};

const _Scene_Battle_isAnyInputWindowActive  = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
    return this._enemyBookPageWindow.active || (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active) || _Scene_Battle_isAnyInputWindowActive.call(this);
};

const _Scene_Battle_isTimeActive = Scene_Battle.prototype.isTimeActive;
Scene_Battle.prototype.isTimeActive = function() {
    return this._enemyBookPageWindow.active || (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active) || _Scene_Battle_isTimeActive.call(this);
};

const _Scene_Battle_updateCancelButton = Scene_Battle.prototype.updateCancelButton;
Scene_Battle.prototype.updateCancelButton = function() {
  if (this._cancelButton) {
    _Scene_Battle_updateCancelButton.call(this);
    if (BattleManager.enemyBook_Open) {
        this._cancelButton.visible = !BattleManager.enemyBook_Open;
    }
  }
};

const _Window_Selectable_isOpenAndActive = Window_Selectable.prototype.isOpenAndActive;
Window_Selectable.prototype.isOpenAndActive = function() {
    if (BattleManager.enemyBook_Open && $gameParty.inBattle()) {
        return this.interruptWindow && _Window_Selectable_isOpenAndActive.call(this);
    } else {
        return _Window_Selectable_isOpenAndActive.call(this);
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
    this._percentContent = PercentContent || [];
    this._percentContentLength = this._percentContent.length;
};

Window_EnemyBook_Percent.prototype.loadWindowskin = function() {
    if (PercentWindowsSkin) {
      this.windowskin = ImageManager.loadSystem(PercentWindowsSkin);
    } else {
      Window_Base.prototype.loadWindowskin.call(this);
    }
};

Window_EnemyBook_Percent.prototype.percentRefresh = function(enemyList) {
    this._enemyListLength = enemyList.length;
    this.defeatPercent(enemyList);
    this.encounteredPercent(enemyList);
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
    if(this._duration >= Interval && this._duration < Interval + lineHeight){
        this._oy++;
        this.refresh();
    }
    if(this._duration >= Interval + lineHeight){
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
    Window_Selectable.prototype.initialize.call(this, rect);
    this._categoryName = null;
};

Window_EnemyBook_CategoryName.prototype.loadWindowskin = function() {
    if (CategoryNameWindowsSkin) {
      this.windowskin = ImageManager.loadSystem(CategoryNameWindowsSkin);
    } else {
      Window_Base.prototype.loadWindowskin.call(this);
    }
};

Window_EnemyBook_CategoryName.prototype.setCategoryName = function(name) {
    if (this._categoryName !== name) {
        this._categoryName = name;
        this.refresh();
    }
};

Window_EnemyBook_CategoryName.prototype.refresh = function() {
    const rect = this.itemRect(0);
    this.contents.clear();
    this.drawText(this._categoryName, rect.x, rect.y, rect.width);
};

//Window_EnemyBook_Category
function Window_EnemyBook_Category() {
    this.initialize(...arguments);
}
  
Window_EnemyBook_Category.prototype = Object.create(Window_Command.prototype);
Window_EnemyBook_Category.prototype.constructor = Window_EnemyBook_Category;
  
Window_EnemyBook_Category.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.interruptWindow = true;
};

Window_EnemyBook_Category.prototype.loadWindowskin = function() {
    if (CategoryWindowsSkin) {
      this.windowskin = ImageManager.loadSystem(CategoryWindowsSkin);
    } else {
      Window_Base.prototype.loadWindowskin.call(this);
    }
};

Window_EnemyBook_Category.prototype.maxCols = function() {
    return 1;
};

Window_EnemyBook_Category.prototype.categoryFilter = function() {
    return this._list.filter((data, i) => $gameSystem.getCategoryEnemyBook(i));
};

Window_EnemyBook_Category.prototype.setCategoryFlags = function() {
    $gameSystem.initCategoryEnemyBook();
    for (enemy of $dataEnemies) {
        $gameSystem.categoryToEnemyBook(enemy);
    }
};

Window_EnemyBook_Category.prototype.makeCommandList = function() {
    const list = EnemyBookCategory;
    list.forEach((command, i) => {
        let categoryName = command.CategoryName;
        let enabled = true;
        if (CategoryVisibleType === 2) {
            categoryName = this.unknownDataLength(categoryName);
            enabled = false;
        }
        this.addCommand(categoryName, command.CategoryKey, enabled, i);
    });
    if (CategoryVisibleType === 1) {
        this._list = this.categoryFilter();
    }
};

Window_EnemyBook_Category.prototype.unknownDataLength = function(name) {
    if(CategoryUnknownData === '？' || CategoryUnknownData === '?') {
        const name_length = name.length;
        return CategoryUnknownData.repeat(name_length);
    } else {
        return CategoryUnknownData;
    }
};

Window_EnemyBook_Category.prototype.refresh = function() {
    this.setCategoryFlags();
    Window_Command.prototype.refresh.call(this);
    this.setSelect();
};

Window_EnemyBook_Category.prototype.processOk = function() {
    pageIndex.category = this.index();
    this._enemyIndexWindow.setCategoryType(this.currentExt());
    const name = this.currentData() ? this.currentData().name : '';
    this._categoryNameWindow.setCategoryName(name);
    Window_Command.prototype.processOk.call(this);
};

Window_EnemyBook_Category.prototype.processCancel = function() {
    pageIndex.category = this.index();
    Window_Command.prototype.processCancel.call(this);
};

Window_EnemyBook_Category.prototype.setSelect = function() {
    this.select(pageIndex.category || 0);
};

Window_EnemyBook_Category.prototype.setEnemyIndexWindow = function(enemyIndexWindow) {
    this._enemyIndexWindow = enemyIndexWindow;
};

Window_EnemyBook_Category.prototype.setCategoryNameWindow = function(categoryNameWindow) {
    this._categoryNameWindow = categoryNameWindow;
};

Window_EnemyBook_Category.prototype.itemTextAlign = function() {
    return "left";
};


//Window_EnemyBook_Index
function Window_EnemyBook_Index() {
    this.initialize(...arguments);
}
  
Window_EnemyBook_Index.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_Index.prototype.constructor = Window_EnemyBook_Index;
  
Window_EnemyBook_Index.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._enemyList = [];
    this._category = null;
    this.interruptWindow = true;
};

Window_EnemyBook_Index.prototype.loadWindowskin = function() {
    if (IndexWindowsSkin) {
      this.windowskin = ImageManager.loadSystem(IndexWindowsSkin);
    } else {
      Window_Base.prototype.loadWindowskin.call(this);
    }
};

Window_EnemyBook_Index.prototype.maxCols = function() {
    return 1;
};

Window_EnemyBook_Index.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_EnemyBook_Index.prototype.makeEnemyList = function() {
    this._enemyPercentList = [];
    this._data = $dataEnemies.filter(enemy => this.includes(enemy));
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
    return !UnknownVisible || (UnknownVisible && $gameSystem.isInEnemyBook(enemy));
};
  
Window_EnemyBook_Index.prototype.categoryIncludes = function(enemy) { 
    if (!this._category || this._category.symbol === "all") {
        return true;
    } else if (this._category.symbol === "map") {

    } else {
        const enemyCategory = enemy.meta.CategoryKey ? enemy.meta.CategoryKey.split(',') : ["all"];
        return enemyCategory.find(category => category === this._category.symbol);
    }
};

Window_EnemyBook_Index.prototype.setSelect = function() {
    this.select(Math.min(pageIndex.index, this.maxItems()) || 0);
};

Window_EnemyBook_Index.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    this.refreshEnemyData();
};

Window_EnemyBook_Index.prototype.getEnemy = function() {
    return this._data[this.index()];
};
  
Window_EnemyBook_Index.prototype.refreshEnemyData = function() {
    if (this._enemyWindow && this.active) {
      const enemy = this.getEnemy();
      this._enemyWindow.setEnemyData(enemy);
    }
};

Window_EnemyBook_Index.prototype.processOk = function() {
    pageIndex.index = this.index();
    Window_Selectabled.prototype.processOk.call(this);
};

Window_EnemyBook_Index.prototype.processCancel = function() {
    pageIndex.index = this.index();
    Window_Selectable.prototype.processCancel.call(this);
};

Window_EnemyBook_Index.prototype.enemyAt = function(index) {
    return this._data && index >= 0 ? this._data[index] : null;
};

Window_EnemyBook_Index.prototype.refresh = function() {
    this.makeEnemyList();
    this.refreshPercent();
    this.setSelect();
    Window_Selectable.prototype.refresh.call(this);
};

Window_EnemyBook_Index.prototype.drawItem = function(index) {
    const enemy = this.enemyAt(index);
    if (enemy) {
        const rect = this.itemLineRect(index);
        let name = '';
        let iconId = 0;
        if ($gameSystem.isInEnemyBook(enemy)) {
            name = enemy.name;
            iconId = enemy.meta.EnemyIcon ? Number(enemy.meta.EnemyIcon) : 0;
        } else {
            name = this.unknownDataLength(enemy);
            iconId = enemy.meta.EnemyIcon && enemy.meta.EnemyIcon > 0 ? UnknownEnemyIcons : 0;
        }
        const textMargin = iconId > 0 ? ImageManager.iconWidth + 4 : 0;
        const itemWidth = Math.max(0, rect.width - textMargin);
        if(NumberType > 0) {
            let numberText = NumberMode ? index + 1 : $gameSystem.getEnemyBookNumber(enemy.id);
            const textWidth = this.numberWidth(numberText);
            if (NumberType === 2) {
                numberText = this.numberWidthSlice(numberText);
            }
            this.drawText(numberText, rect.x, rect.y, textWidth);
            this.drawText(":", rect.x + textWidth + 6, rect.y);
            if (iconId > 0) {
                const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
                this.drawIcon(iconId, rect.x + textWidth + 24, iconY);
            }
            this.isEnemyNameColor();
            this.drawText(name, rect.x + textWidth + 24 + textMargin, rect.y, itemWidth - textWidth - 24);
        } else {
            if (iconId > 0) {
                const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
                this.drawIcon(iconId, rect.x, iconY);
            }
            this.isEnemyNameColor();
            this.drawText(name, rect.x + textMargin, rect.y, itemWidth);
        }
    }
};

Window_EnemyBook_Index.prototype.numberWidth = function(numberText) {
    return this.textWidth($gameSystem._enemyBookLength >= 1000 || NumberType === 2 ? '000' : '00');
};
  
Window_EnemyBook_Index.prototype.numberWidthSlice = function(indexText) {
    return ($gameSystem._enemyBookLength >= 1000 ? ('0000' + indexText).slice(-4) : ('000' + indexText).slice(-3));
};

Window_EnemyBook_Index.prototype.EnemyNameLength = function(enemy) {
	return enemy.name.length;
};
  
Window_EnemyBook_Index.prototype.unknownDataLength = function(enemy) {
    if(UnknownData === '？' || UnknownData === '?') {
        const name_length = this.EnemyNameLength(enemy);
        return UnknownData.repeat(name_length);
    } else {
        return UnknownData;
    }
};

Window_EnemyBook_Index.prototype.setCategoryType = function(category) {
    if (this._category !== category) {
        this._category = category;
    }
};

Window_EnemyBook_Index.prototype.refreshPercent = function() {
    if (this._percentWindow) {
      this._percentWindow.percentRefresh(this._enemyPercentList);
    }
};

Window_EnemyBook_Index.prototype.setPercentWindow = function(percentWindow) {
    this._percentWindow = percentWindow;
    this.refresh();
};

Window_EnemyBook_Index.prototype.setEnemyWindow = function(enemyWindow) {
    this._enemyWindow = enemyWindow;
};
  
Window_EnemyBook_Index.prototype.setCategoryWindow = function(categoryWindow) {
    this._categoryWindow = categoryWindow;
};

Window_EnemyBook_Index.prototype.isEnemyNameColor = function() {
    if ($gameSystem.isInEnemyBookStatus(enemy)) {
        this.changeTextColor(NuunManager.getColorCode(RegistrationStatusEnemyColor));
    } else if ($gameSystem.isInEnemyBook(enemy)) {
        this.changeTextColor(NuunManager.getColorCode(RegistrationEnemyColor));
    } else {
        this.resetTextColor();
    }
};


function Window_EnemyBook_InfoIndex() {
    this.initialize(...arguments);
}
  
Window_EnemyBook_InfoIndex.prototype = Object.create(Window_EnemyBook_Index.prototype);
Window_EnemyBook_InfoIndex.prototype.constructor = Window_EnemyBook_InfoIndex;
  
Window_EnemyBook_InfoIndex.prototype.initialize = function(rect) {
    Window_EnemyBook_Index.prototype.initialize.call(this, rect);
};

Window_EnemyBook_InfoIndex.prototype.loadWindowskin = function() {
    if (InfoWindowsSkin) {
      this.windowskin = ImageManager.loadSystem(InfoWindowsSkin);
    } else {
      Window_Base.prototype.loadWindowskin.call(this);
    }
};

Window_EnemyBook_InfoIndex.prototype.setSelect = function() {
    this.select(Math.min(pageIndex.infoIndex, this.maxItems()) || 0);
};

Window_EnemyBook_InfoIndex.prototype.processOk = function() {
    pageIndex.infoIndex = this.index();
    Window_Selectabled.prototype.processOk.call(this);
};

Window_EnemyBook_InfoIndex.prototype.processCancel = function() {
    pageIndex.infoIndex = this.index();
    Window_Selectable.prototype.processCancel.call(this);
};

Window_EnemyBook_InfoIndex.prototype.refreshEnemyData = function() {
    if (this._enemyWindow && this.active) {
        const enemy = this.getEnemy();
        if (enemy) {
            this._enemyWindow.selectEnemy = this._data[this.index()];
        }
        this._enemyWindow.setEnemyData(enemy);
    }
};

Window_EnemyBook_InfoIndex.prototype.refresh = function() {
    this.makeEnemyList();
    this.setSelect();
    Window_Selectable.prototype.refresh.call(this);
};

Window_EnemyBook_InfoIndex.prototype.makeEnemyList = function() {
    this._data = [];
    this._data = $gameTroop._enemies.filter(enemy => this.includes(enemy));
};

Window_EnemyBook_InfoIndex.prototype.includes = function(enemy) {
    if ($gameSystem.isEnemyBookData(enemy.enemy()) && enemy.isAlive()) {
      return true;
    }
    return false;
};
  
Window_EnemyBook_InfoIndex.prototype.enemyAt = function(index) {
    return this._data && index >= 0 ? this._data[index].enemy() : null;
};
  
Window_EnemyBook_InfoIndex.prototype.getEnemy = function() {
    return this._data && this._data[this.index()] ? this._data[this.index()].enemy() : null;
};

Window_EnemyBook_InfoIndex.prototype.drawItem = function(index) {
    const enemy = this.enemyAt(index);
    if(enemy) {
        const rect = this.itemLineRect(index);
        let name = '';
        let iconId = 0;
        if (RegistrationEnemyInfo) {
            if ($gameSystem.isInEnemyBook(enemy) || !!enemy.meta.NoBookData) {
                name = enemy.name;
                iconId = enemy.meta.EnemyIcon ? Number(enemy.meta.EnemyIcon) : 0;
            } else {
                name = this.unknownDataLength(enemy);
                iconId = enemy.meta.EnemyIcon && enemy.meta.EnemyIcon > 0 ? UnknownEnemyIcons : 0;
            }
        } else {
            name = enemy.name;
            iconId = enemy.meta.EnemyIcon ? Number(enemy.meta.EnemyIcon) : 0;
        }
        const textMargin = iconId > 0 ? ImageManager.iconWidth + 4 : 0;
        const itemWidth = Math.max(0, rect.width - textMargin);
        if (iconId > 0) {
            const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
            this.drawIcon(iconId, rect.x, iconY);
        }
        this.isEnemyNameColor();
        this.drawText(name, rect.x + textMargin, rect.y, itemWidth); 
    }
};

//Window_EnemyBookPage
function Window_EnemyBookPage() {
    this.initialize(...arguments);
}
  
Window_EnemyBookPage.prototype = Object.create(Window_HorzCommand.prototype);
Window_EnemyBookPage.prototype.constructor = Window_EnemyBookPage;
  
Window_EnemyBookPage.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
    this._data = null;
    this.interruptWindow = true;
};

Window_EnemyBookPage.prototype.loadWindowskin = function() {
    if (PageWindowsSkin) {
      this.windowskin = ImageManager.loadSystem(PageWindowsSkin);
    } else {
      Window_Base.prototype.loadWindowskin.call(this);
    }
};

Window_EnemyBookPage.prototype.maxCols = function() {
    return this._pageCols;
};

Window_EnemyBookPage.prototype.select = function(index) {
    Window_HorzCommand.prototype.select.call(this, index);
    this.refreshEnemyData(index);
    if (index >= 0) {
        pageIndex.page = index;
    }
};

Window_EnemyBookPage.prototype.refreshEnemyData = function(index) {
    if (this._enemyWindow) {
        this._enemyWindow.setPage(index);
    }
};

Window_EnemyBookPage.prototype.makeCommandList = function() {
    if (this._data && (this._indexWindow && this._indexWindow.active) || (this._infoIndexWindow && this._infoIndexWindow.active)) {
        this._data.forEach((command, i) => {
            this.addCommand(command.PageCategoryName, 'page' + i, true, i);
        });
    } else if (this._enemyWindow && this._enemyWindow._mode === 'analyze') {
        this._data.forEach((command, i) => {
            this.addCommand(command.PageCategoryName, 'page' + i, true, i);
        });
    }
};

Window_EnemyBookPage.prototype.setPageList = function(list, cols) {
    this._data = list;
    this._pageCols = cols;
    this.refresh();
};

Window_EnemyBookPage.prototype.setEnemyWindow = function(enemyWindow) {
    this._enemyWindow = enemyWindow;
};

Window_EnemyBookPage.prototype.setIndexWindow = function(indexWindow) {
    this._indexWindow = indexWindow;
};

Window_EnemyBookPage.prototype.setInfoIndexWindow = function(indexWindow) {
    this._infoIndexWindow = indexWindow;
};

Window_EnemyBookPage.prototype.refresh = function() {
    Window_HorzCommand.prototype.refresh.call(this);
};


function Window_EnemyBook() {
    this.initialize(...arguments);
}
  
Window_EnemyBook.prototype = Object.create(Window_StatusBase.prototype);
Window_EnemyBook.prototype.constructor = Window_EnemyBook;
  
Window_EnemyBook.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._page = 0;
    this._enemySprite = null;
    this._displayList = null;
    this._enemy = null;
    this._enemyData = [];
    this.setEnemySprite();
    this.language_Jp = $gameSystem.isJapanese();
};

Window_EnemyBookPage.prototype.loadWindowskin = function() {
    if (ContentWindowsSkin) {
      this.windowskin = ImageManager.loadSystem(ContentWindowsSkin);
    } else {
      Window_Base.prototype.loadWindowskin.call(this);
    }
};

Window_EnemyBook.prototype.maxCols = function() {
    return ContentCols;
};

Window_EnemyBook.prototype.setEnemyData = function(enemy) {
    if (this._enemy !== enemy) {
        this._enemy = enemy;
        this.refresh();
    }
};

Window_EnemyBook.prototype.setEnemySprite = function() {
    this._enemySprite = new Sprite_BookEnemy();
    this.addChildToBack(this._enemySprite);
};

Window_EnemyBook.prototype.setPage = function(index) {
    this._page = index;
    this._displayList = index >= 0 ? PageSetting[index] : null;
    this.refresh();
};

Window_EnemyBook.prototype.getDisplayPage = function() {
    return this._displayList;
};

Window_EnemyBook.prototype.listDate = function(list) {
    const tag = 'PageList' + list.ListDateSetting;
    return bookContents[tag];
};

Window_EnemyBook.prototype.paramMask = function(MaskMode) {
    return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy) : true;
};

Window_EnemyBook.prototype.resistWeakDataMask = function(MaskMode) {
    return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy) : true;
};

Window_EnemyBook.prototype.showDropItemMask = function(MaskMode) {
    return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy): true;
};
  
Window_EnemyBook.prototype.dropItemFlag = function(index) {
    return ShowDropItemName ? $gameSystem.getDropItemFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.showStealItemMask = function(MaskMode) {
    return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy): true;
};
  
Window_EnemyBook.prototype.stealItemFlag = function(index) {
    return param.ShowStealItemName ? $gameSystem.getStealItemFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.condDropItemFlag = function(index) {
    return Imported.NUUN_EnemyBookEX_2 && this.getShowCondDropItemName() ? $gameSystem.getCondDropItemFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.showActionMask = function(MaskMode) {
    return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy): true;
};
  
Window_EnemyBook.prototype.actionFlag = function(index) {
    return ShowActionName ? $gameSystem.getEnemyBookActionFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.onElementsFlag = function(index) {
    return Imported.NUUN_EnemyBookEX_1 && ShowElementsIcon && index >= 0 ? $gameSystem.getEnemyBookElementFlag(this._enemy.id, index) : true;
};
  
Window_EnemyBook.prototype.onStateFlag = function(index) {
    return Imported.NUUN_EnemyBookEX_1 && ShowStateIcon ? $gameSystem.getEnemyBookStateFlag(this._enemy.id, index) : true;
};
  
Window_EnemyBook.prototype.onDebuffFlag = function(index) {
    return Imported.NUUN_EnemyBookEX_1 && ShowDebuffIcon ? $gameSystem.getEnemyBookDebuffFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.noUnknownStatus = function(enemy) {
    return this._enemy.meta.ShowDataBook;
};

Window_EnemyBook.prototype.refresh = function() {
    Window_StatusBase.prototype.refresh.call(this);
    this._enemySprite.bitmap = null;
    if (this._enemy && $gameSystem.isInEnemyBook(this._enemy) && this._displayList) {
        this.loadBitmap();
    }
};

Window_EnemyBook.prototype.getEnemyData = function() {
    return new Game_Enemy(this._enemy.id, 0, 0);
};

Window_EnemyBook.prototype.drawEnemyBookContents = function() {
    const lineHeight = this.lineHeight();
    const listContents = this.listDate(this._displayList);
    const enemy = this.getEnemyData();
    for (const date of listContents) {
        this.resetFontSettings();
        const x_Position = date.X_Position;
        const position = Math.min(x_Position, this.maxCols());
        const rect = this.itemRect(position - 1);
        const x = rect.x + (date.X_Coordinate || 0);
        const y = (date.Y_Position - 1) * lineHeight + rect.y + (date.Y_Coordinate || 0);
        const width = (date.ItemWidth && date.ItemWidth > 0 ? Math.min(data.ItemWidth, rect.width - data.X_Coordinate) : this.widthMode(date, rect));
        this.dateDisplay(date, enemy, x, y, width);
    }
};

Window_EnemyBook.prototype.loadBitmap = function() {
    const listContents = this.listDate(this._displayList);
    let bitmap = null;
    let loadBitmap = null;
    listContents.forEach(list => {
        switch (list.DateSelect) {
            case 250:
                loadBitmap = ImageManager.nuun_LoadPictures(list.ImgData);
            case 251:
                const dataImg = this._enemy.meta[list.textMethod] ? this._enemy.meta[list.textMethod].split(',') : null;
                if (dataImg) {
                    loadBitmap = ImageManager.loadBitmap("img/"+ ImgFolder +"/", dataImg[0]);
                }
        }
        if (loadBitmap && !loadBitmap.isReady()) {
            bitmap = loadBitmap;
        }
    });
    if (bitmap && !bitmap.isReady()) {
        bitmap.addLoadListener(this.drawEnemyBookContents.bind(this))
        return;
    }
    this.drawEnemyBookContents();
};

Window_EnemyBook.prototype.widthMode = function(list, rect) {
    if (list.WideMode === 2) {
      rect.width = rect.width * 2 + this.colSpacing();
    } else if (list.WideMode === 3 && ContentCols >= 3) {
      rect.width = rect.width * 3 + (this.colSpacing() * 2);
    }
    return rect.width;
};

Window_EnemyBook.prototype.dateDisplay = function(list, enemy, x, y, width) {
    switch (list.DateSelect) {
        case 0:
            break;
        case 1:
        case 2:
            this.enemyGauge(list, enemy, x, y, width);
            break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            this.enemyParams(list, enemy, x, y, width);
            break;
        case 9:
            this.enemyGauge(list, enemy, x, y, width);
            break;
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
            this.enemyXParams(list, enemy, x, y, width);
            break;
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
            this.enemySParams(list, enemy, x, y, width);
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
        case 43:
            this.drawResistValueElement(list, enemy, x, y, width);
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
        case 48:
            this.drawResistValueState(list, enemy, x, y, width);
            break;
        case 50:
            this.drawWeakDebuff(list, enemy, x, y, width);
            break;
        case 51:
            this.drawResistDebuff(list, enemy, x, y, width);
            break;
        case 52:
            this.drawResistValueDebuff(list, enemy, x, y, width);
            break;
        case 60:
            this.dropItems(list, enemy, x, y, width);
            break;
        case 61:
            this.stealItems(list, enemy, x, y, width);
            break;
        case 62:
            this.condDropItems(list, enemy, x, y, width);
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
        case 250:
            this.commonEnemyBitmap(list, enemy, x, y, width);
            break;
        case 251:
            this.enemyBitmap(list, enemy, x, y, width);
            break;
        case 500:
            this.enemyPageSwitching(list, enemy, x, y, width);
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
            return this.language_Jp ? "会心率" : 'Critcal Rate';
        case 13:
            return this.language_Jp ? "会心回避率" : 'Critical Evade';
        case 14:
            return this.language_Jp ? "魔法回避率" : 'Magic Evade';
        case 15:
            return this.language_Jp ? "魔法反射率" : 'Magic Reflect';
        case 16:
            return this.language_Jp ? "反撃率" : 'Counter';
        case 17:
            return this.language_Jp ? "HP再生率" : 'HP Regen';
        case 18:
            return this.language_Jp ? "MP再生率" : 'MP Regen';
        case 19:
            return this.language_Jp ? "TP再生率" : 'TP Regen';
        case 20:
            return this.language_Jp ? "狙われ率" : 'Aggro';
        case 21:
            return this.language_Jp ? "防御効果率" : 'Guard';
        case 22:
            return this.language_Jp ? "回復効果率" : 'Recovery';
        case 23:
            return this.language_Jp ? "薬の知識" : 'Item Effect';
        case 24:
            return this.language_Jp ? "MP消費率" : 'MP Cost';
        case 25:
            return this.language_Jp ? "TPチャージ率" : 'TP Charge';
        case 26:
            return this.language_Jp ? "物理ダメージ率" : 'Physical Damage';
        case 27:
            return this.language_Jp ? "魔法ダメージ率" : 'Magical Damage';
        case 28:
            return this.language_Jp ? "床ダメージ率" : 'Floor Damage';
        case 29:
            return this.language_Jp ? "獲得経験率" : 'EXP Gain';
        default:
            return null;
    }
};

Window_EnemyBook.prototype.paramShow = function(list, enemy) {
    const de = this._enemy;
    if (list.DetaEval) {
      return eval(list.DetaEval);
    }
    const params = list.DateSelect;
    switch (params) {
        case 1:
            return enemy._hp;
        case 2:
            return enemy._mp;
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
    const de = this._enemy;
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

Window_EnemyBook.prototype.horzLine = function(list, enemy, x, y, width) {
    const lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(x, lineY, width, 2, NuunManager.getColorCode(list.NameColor));
    this.contents.paintOpacity = 255;
};

Window_EnemyBook.prototype.enemyPageSwitching = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const nameText = list.paramName ? list.paramName : '←→キー：ページ切り替え';
    this.drawText(nameText, x, y, width, list.namePosition);
};

Window_EnemyBook.prototype.enemyImg = function(list, enemy, x, y, width) {
    const height = list.ImgMaxHeight * this.lineHeight();
    const itemPadding = this.itemPadding();
    this._enemySprite.setMaxWidth(width);
    this._enemySprite.setMaxHeight(height - itemPadding);
    this._enemySprite.setup(enemy, width / 2 + x + (itemPadding * 2), (y + height / 2) + (itemPadding * 2));
};

Window_EnemyBook.prototype.enemyName = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
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

Window_EnemyBook.prototype.name = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const nameText = list.paramName;
    if (nameText) {
      this.drawText(nameText, x, y, width, list.namePosition);
    }
};

Window_EnemyBook.prototype.enemyGauge = function(list, enemy, x, y, width) {
    this.enemyParams(list, enemy, x, y, width);
};

Window_EnemyBook.prototype.setBuffColor = function(list, enemy) {
    
};

Window_EnemyBook.prototype.enemyParams = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    if (list.Back) {
        this.drawContentsBackground(list.Back, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    const nameText = this.paramNameShow(list, enemy);
    const systemWidth = list.SystemItemWidth || 100;
    this.drawText(nameText, x, y, systemWidth);
    this.resetTextColor();
    let text = this.paramShow(list, enemy);
    if (!this.paramMask(list.MaskMode)){
        text = UnknownStatus;
    } else {
        this.setBuffColor(list, enemy);
    }
    this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
};

Window_EnemyBook.prototype.enemyXParams = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    if (list.Back) {
        this.drawContentsBackground(list.Back, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    const nameText = this.paramNameShow(list, enemy);
    const systemWidth = list.SystemItemWidth || 100;
    this.drawText(nameText, x, y, systemWidth);
    this.resetTextColor();
    let text = this.paramShow(list, enemy);
    if (!this.paramMask(list.MaskMode)){
        text = UnknownStatus;
    } else {
        text = NuunManager.numPercentage(text, list.Decimal, DecimalMode);
        this.setBuffColor(list, enemy);
    }
    text += list.paramUnit ? String(list.paramUnit) : " %";
    this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
};

Window_EnemyBook.prototype.enemySParams = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    if (list.Back) {
        this.drawContentsBackground(list.Back, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    const nameText = this.paramNameShow(list, enemy);
    const systemWidth = list.SystemItemWidth || 100;
    this.drawText(nameText, x, y, systemWidth);
    this.resetTextColor();
    let text = this.paramShow(list, enemy);
    if (!this.paramMask(list.MaskMode)){
        text = UnknownStatus;
    } else {
        text = NuunManager.numPercentage(text, list.Decimal, DecimalMode);
        this.setBuffColor(list, enemy);
    }
    text += list.paramUnit ? String(list.paramUnit) : " %";
    this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
};

Window_EnemyBook.prototype.enemyExp = function(list, enemy, x, y, width) {
    const de = this._enemy;
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    if (list.Back) {
        this.drawContentsBackground(list.Back, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    const nameText = list.paramName ? list.paramName : TextManager.exp;
    const systemWidth = list.SystemItemWidth || 100;
    this.drawText(nameText, x, y, systemWidth);
    this.resetTextColor();
    let text;
    if(this.paramMask(list.MaskMode)) {
      text = list.DetaEval ? eval(list.DetaEval) : enemy.exp();
    } else {
      text = UnknownStatus;
    }
    this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
};

Window_EnemyBook.prototype.enemyGold = function(list, enemy, x, y, width) {
    const de = this._enemy;
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    if (list.Back) {
        this.drawContentsBackground(list.Back, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "獲得金額" : 'Gold Gain');
    const systemWidth = list.SystemItemWidth || 100;
    this.drawText(nameText, x, y, systemWidth);
    this.resetTextColor();
    let text;
    if(this.paramMask(list.MaskMode)) {
      text = list.DetaEval ? eval(list.DetaEval) : enemy.gold();
      this.drawCurrencyValue(text, this.currencyUnit(), x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()));
    } else {
      text = UnknownStatus;
      this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), 'right');
    }
};

Window_EnemyBook.prototype.defeat = function(list, enemy, x, y, width) {
    const de = this._enemy;
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    if (list.Back) {
        this.drawContentsBackground(list.Back, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "倒した数" : 'Eefeat Enemy');
    const systemWidth = list.SystemItemWidth || 100;
    this.drawText(nameText, x, y, systemWidth);
    this.resetTextColor();
    let text = null;
    if(this.paramMask(list.MaskMode)) {
        text = list.DetaEval ? eval(list.DetaEval) : $gameSystem.defeatNumber(enemy.enemyId());
        if (list.paramUnit) {
            text += String(list.paramUnit);
        }
    } else {
        text = UnknownStatus;
    }
    this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
};

Window_EnemyBook.prototype.originalParams = function(list, enemy, x, y, width) {
    const de = this._enemy;
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    if (list.Back) {
        this.drawContentsBackground(list.Back, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    const nameText = list.paramName;
    const systemWidth = nameText ? (list.SystemItemWidth || 100) : 0;
    if (nameText) {
        this.drawText(nameText, x, y, systemWidth);
    }
    let text = null;
    if(this.paramMask(list.MaskMode)) {
        text = eval(list.DetaEval);
        if (list.paramUnit) {
            text += String(list.paramUnit);
        }
    } else {
        text = UnknownStatus;
    }
    this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
};

Window_EnemyBook.prototype.bookEnemyNo = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const nameText = list.paramName;
    const systemWidth = nameText ? (list.SystemItemWidth || 100) : 0;
    if (nameText) {
        this.drawText(nameText, x, y, systemWidth, list.namePosition);
    }
    this.resetTextColor();
    let text = $gameSystem.getEnemyBookNumber(this._enemy.id);
    if (NumberType === 2) {
      text = this.numberWidthSlice(text);
    }
    this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
};

Window_EnemyBook.prototype.turn = function(list, enemy, x, y, width) {

};

Window_EnemyBook.prototype.dropItems = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const dropList = this._enemy.dropItems;
    const lineHeight = this.lineHeight();
    let x2 = 0;
    let y2 = 0;
    let dropIndex = 0;
    width = Math.floor((width - this.colSpacing()) / DropItemMultiCols);
    const nameText = list.paramName;
    if (nameText) {
        this.drawText(nameText, x, y, width);
        y += lineHeight;
    }
    this.resetTextColor();
    dropList.forEach((di, i) => {
        if(di.kind > 0){
            x2 = Math.floor(dropIndex % DropItemMultiCols) * (width + this.itemPadding()) + x;
            y2 = Math.floor(dropIndex / DropItemMultiCols) * lineHeight + y;
            let width2 = width;
            if (list.Back) {
                this.drawContentsBackground(list.Back, x2, y2, width);
                x2 = this.contensX(x2);
                width2 = this.contensWidth(width);
            }
            const item = enemy.itemObject(di.kind, di.dataId);
            if((this.showDropItemMask(list.MaskMode, enemy) && this.dropItemFlag(i))) {
                if (DropItemProbabilityShow && !item.meta.NoDropProbability) {
                    let rate = di.denominator;
                    const text = DropRateEval ? eval(DropRateEval) : "1/" + rate;
                    let textWidth = this.textWidth(text);
                    this.drawItemName(item, x2, y2, width2 - (textWidth + this.itemPadding()));
                    this.drawEnemyBookNumber(text, x2, y2, width2);
                } else {
                    this.drawItemName(item, x2, y2, width2);
                }
            } else {
                this.resetTextColor();
                this.drawText(this.unknownDataLength(item.name), x2, y2, width2, 'left');
            }
            dropIndex++;
        }
    });
};

Window_EnemyBook.prototype.stealItems = function(list, enemy, x, y, width) {
    if (Imported.NUUN_StealableItems) {
        this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
        this.changeTextColor(NuunManager.getColorCode(list.NameColor));
        const stealList = enemy._stealItems;
        const lineHeight = this.lineHeight();
        let x2 = 0;
        let y2 = 0;
        let stealIndex = 0;
        width = Math.floor((width - this.colSpacing()) / StealItemCols);
        const nameText = list.paramName;
        if (nameText) {
            this.drawText(nameText, x, y, width);
            y += lineHeight;
        }
        this.resetTextColor();
        stealList.forEach((di, i) => {
            if(di.kind > 0 && kind < 4){
                x2 = Math.floor(stealIndex % StealItemCols) * (width + this.itemPadding()) + x;
                y2 = Math.floor(stealIndex / StealItemCols) * lineHeight + y;
                let width2 = width;
                if (list.Back) {
                    this.drawContentsBackground(list.Back, x2, y2, width);
                    x2 = this.contensX(x2);
                    width2 = this.contensWidth(width);
                }
                const item = enemy.stealObject(di.kind, di.dataId);
                if((this.showStealItemMask(list.MaskMode, enemy) && this.stealItemFlag(i))) {
                    if (StealItemProbabilityShow) {
                        let rate = di.denominator;
                        const text = StealRateEval ? eval(StealRateEval) : rate;
                        let textWidth = this.textWidth(rate);
                        this.drawItemName(item, x2, y2, width2 - textWidth - this.itemPadding());
                        this.drawEnemyBookNumber(text, x2, y2, width2);
                      } else {
                        this.drawItemName(item, x2, y2, width2);
                      }
                } else {
                    this.resetTextColor();
                    this.drawText(this.unknownDataLength(item.name), x2, y2, width2, 'left');
                }
                stealIndex++;
            }
        });
    } else {
        this.drawText('盗みスキルプラグイン(NUUN_StealableItems)が導入されていません。', x, y, width, 'left');
    }
};

Window_EnemyBook.prototype.condDropItems = function(list, enemy, x, y, width) {
    if (Imported.NUUN_ConditionalDrops && Imported.NUUN_EnemyBookEX_2) {
        this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
        this.changeTextColor(NuunManager.getColorCode(list.NameColor));
        const dropList = enemy._conditionalDropItems;
        const lineHeight = this.lineHeight();
        let x2 = 0;
        let y2 = 0;
        let dropIndex = 0;
        width = Math.floor((width - this.colSpacing()) / CondDropItemCols);
        const nameText = list.paramName;
        if (nameText) {
            this.drawText(nameText, x, y, width);
            y += lineHeight;
        }
        this.resetTextColor();
        dropList.forEach((di, i) => {
            if(di[1] > 0){
                x2 = Math.floor(dropIndex % CondDropItemCols) * (width + this.itemPadding()) + x;
                y2 = Math.floor(dropIndex / CondDropItemCols) * lineHeight + y;
                let width2 = width;
                if (list.Back) {
                    this.drawContentsBackground(list.Back, x2, y2, width);
                    x2 = this.contensX(x2);
                    width2 = this.contensWidth(width);
                }
            }
            const item = enemy.getCondDropItem(di);
            if((this.showDropItemMask(list.MaskMode, enemy) && this.condDropItemFlag(i))) {
                this.drawItemName(item, x2, y2, width2 - this.itemPadding());
            } else {
                this.resetTextColor();
                this.drawText(this.unknownDataLength(item.name), x2, y2, width2, 'left');
            }
            dropIndex++;
        });
    } else {
        this.drawText('条件付きドロップアイテムプラグイン(Imported.NUUN_ConditionalDrops)が導入されていません。', x, y, width, 'left');
    }
};

Window_EnemyBook.prototype.enemyAction = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const action = this._enemy.actions;
    const lineHeight = this.lineHeight();
    let x2 = 0;
    let y2 = 0;
    width = Math.floor((width - this.colSpacing()) / ActionCols);
    const nameText = list.paramName;
    if (nameText) {
        this.drawText(nameText, x, y, width);
        y += lineHeight;
    }
    this.resetTextColor();
    const dateLenght = ActionMaxItems === 0 ? action.length : ActionMaxItems;
    for (let i = 0; i < dateLenght; i++) {
        x2 = Math.floor(i % ActionCols) * (width + this.itemPadding()) + x;
        y2 = Math.floor(i / ActionCols) * lineHeight + y;
        let width2 = width;
        if (list.Back) {
            this.drawContentsBackground(list.Back, x2, y2, width);
            x2 = this.contensX(x2);
            width2 = this.contensWidth(width);
        }
        const skillDate = $dataSkills[action[i].skillId];
        if(this.showActionMask(list.MaskMode, enemy) && this.actionFlag(i)){
            this.drawItemName(skillDate, x2, y2, width2);
        } else {
            this.drawText(this.unknownDataLength(skillDate.name), x2, y2, width2);
        }
    }
};

Window_EnemyBook.prototype.drawResistValueElement = function(list, enemy, x, y, width) {
    const de = this._enemy;
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    let x2 = 0;
    let y2 = 0;
    width = Math.floor((width - this.colSpacing()) / ElementCol);
    const nameText = list.paramName;
    if (nameText) {
        this.drawText(nameText, x, y, width);
        y += lineHeight;
    }
    this.resetTextColor();
    ElementList.forEach((element, i) => {
        x2 = Math.floor(i % ElementCol) * (width + this.itemPadding()) + x;
        y2 = Math.floor(i / ElementCol) * lineHeight + y;
        let width2 = width;
        if (list.Back) {
            this.drawContentsBackground(list.Back, x2, y2, width);
            x2 = this.contensX(x2);
            width2 = this.contensWidth(width);
        }
        let textWidth = 0;
        if (element.ElementNo && element.ElementNo !== 0) {
            if (element.ElementIconId > 0 && ResistWeakElementMode >= 1) {
                const iconId = ElementUnknownIconId > 0 && this.onElementsFlag(element.ElementNo) ? ElementUnknownIconId : element.ElementIconId;
                this.drawIcon(iconId, x2, y2);
                textWidth += ImageManager.iconWidth + 4;
            }
            if (ResistWeakElementMode !== 1) {
                const systemWidth = nameText ? (list.SystemItemWidth || 60) : 0;
                this.changeTextColor(NuunManager.getColorCode(list.NameColor));
                const elementText = this.onElementsFlag(element.ElementNo) ? getElementTextName(element.ElementNo) : UnknownStatus;
                this.drawText(elementText, x2, y2, systemWidth);
                textWidth += systemWidth;
            }
            if (this.resistWeakDataMask(list.MaskMode)) {
                let rate = 1.0;
                if (element.ElementNo < 0) {
                    rate = (element.ElementNo === -1 ? enemy.sparam(6) : enemy.sparam(7)) * 100;
                } else if (element.ElementNo > 0) {
                    rate = enemy.elementRate(element.ElementNo) * 100;
                }
                rate = NuunManager.numPercentage(rate, list.Decimal || 0, DecimalMode);
                rate += list.paramUnit ? String(list.paramUnit) : " %";
                const rateText = list.DetaEval ? eval(list.DetaEval) : rate;
                this.resetTextColor();
                this.drawText(rateText, x2 + textWidth + this.itemPadding(), y2, width2 - (textWidth + this.itemPadding()), "right");
            } else {
                this.resetTextColor();
                this.drawText(UnknownStatus, x2 + textWidth + this.itemPadding(), y2, width2 - (textWidth + this.itemPadding()), "right");
            }
        }
    });
};

Window_EnemyBook.prototype.drawResistValueState = function(list, enemy, x, y, width) {
    const de = this._enemy;
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    let x2 = 0;
    let y2 = 0;
    width = Math.floor((width - this.colSpacing()) / StateCol);
    const nameText = list.paramName;
    if (nameText) {
        this.drawText(nameText, x, y, width);
        y += lineHeight;
    }
    this.resetTextColor();
    StateList.forEach((state, i) => {
        x2 = Math.floor(i % StateCol) * (width + this.itemPadding()) + x;
        y2 = Math.floor(i / StateCol) * lineHeight + y;
        let width2 = width;
        if (list.Back) {
            this.drawContentsBackground(list.Back, x2, y2, width);
            x2 = this.contensX(x2);
            width2 = this.contensWidth(width);
        }
        let textWidth = 0;
        if (state.StateId) {
            const stateId = state.StateId;
            if (stateId > 0) {
                if ($dataStates[stateId].iconIndex > 0 && ResistWeakStateMode >= 1) {
                    const iconId = StateUnknownIconId > 0 && this.onStateFlag(stateId) ? StateUnknownIconId : $dataStates[stateId].iconIndex;
                    this.drawIcon(iconId, x2, y2);
                    textWidth += ImageManager.iconWidth + 4;
                }
                if (ResistWeakStateMode !== 1) {
                    const systemWidth = nameText ? (list.SystemItemWidth || 60) : 0;
                    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
                    const stateText = this.onStateFlag(stateId) ? $dataStates[stateId].name : UnknownStatus;
                    this.drawText(stateText, x2, y2, systemWidth);
                    textWidth += systemWidth;
                }
                if (this.resistWeakDataMask(list.MaskMode)) {
                    let rate = (enemy.isStateResist(stateId) ? 0 : enemy.stateRate(stateId)) * 100;
                    rate = NuunManager.numPercentage(rate, list.Decimal || 0, DecimalMode);
                    rate += list.paramUnit ? String(list.paramUnit) : " %";
                    const rateText = list.DetaEval ? eval(list.DetaEval) : rate;
                    this.resetTextColor();
                    this.drawText(rateText, x2 + textWidth + this.itemPadding(), y2, width2 - (textWidth + this.itemPadding()), "right");
                  } else {
                    this.resetTextColor();
                    this.drawText(UnknownStatus, x2 + textWidth + this.itemPadding(), y2, width2 - (textWidth + this.itemPadding()), "right");
                  }
            }
        }
    });
};

Window_EnemyBook.prototype.drawResistElement = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "耐性属性" : 'Resist Element');
    let Unknown = false;
    if (nameText) {
        this.drawText(nameText, x, y, width);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (ElementUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    let icons = [];
    ElementList.forEach(Element => {
        let rate = 1.0;
        let icon = 0;
        if(Element.ElementNo < 0) {
            rate = Element.ElementNo === -1 ? enemy.sparam(6) : enemy.sparam(7);
        } else if (Element.ElementNo > 0) {
            rate = enemy.elementRate(Element.ElementNo);
        }
        if(rate < 1 && ResistNoEffectElement || (rate < 1 && rate > 0 && !ResistNoEffectElement)){
            if (Unknown || (ElementUnknownIconId > 0 && !this.onElementsFlag(Element.ElementNo))) {
                icon = ElementUnknownIconId;
            } else {
                icon = this.onElementsFlag(Element.ElementNo) ? Element.ElementIconId : 0;
            }
            if (icon && icon > 0) icons.push(icon);
        }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawWeakElement = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "弱点属性" : 'Weak Element');
    let Unknown = false;
    if (nameText) {
        this.drawText(nameText, x, y, width);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (ElementUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    let icons = [];
    ElementList.forEach(Element => {
        let rate = 1.0;
        let icon = 0;
        if (Element.ElementNo < 0) {
            rate = Element.ElementNo === -1 ? enemy.sparam(6) : enemy.sparam(7);
          } else if (Element.ElementNo > 0) {
            rate = enemy.elementRate(Element.ElementNo);
          }
          if (rate > 1) {
            if (Unknown || (ElementUnknownIconId > 0 && !this.onElementsFlag(Element.ElementNo))) {
              icon = ElementUnknownIconId;
            } else {
              icon = this.onElementsFlag(Element.ElementNo) ? Element.ElementIconId : 0;
            }
            if (icon && icon > 0) icons.push(icon);
          }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawNoEffectElement = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "無効属性" : 'Invalid Element');
    let Unknown = false;
    if (nameText) {
        this.drawText(nameText, x, y, width);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (ElementUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    let icons = [];
    ElementList.forEach(Element => {
        let rate = 1.0;
        let icon = 0;
        if (Element.ElementNo < 0) {
            rate = Element.ElementNo === -1 ? enemy.sparam(6) : enemy.sparam(7);
          } else if (Element.ElementNo > 0) {
            rate = enemy.elementRate(Element.ElementNo);
          }
          if (rate <= 0) {
            if (Unknown || (ElementUnknownIconId > 0 && !this.onElementsFlag(Element.ElementNo))) {
              icon = ElementUnknownIconId;
            } else {
              icon = this.onElementsFlag(Element.ElementNo) ? Element.ElementIconId : 0;
            }
            if (icon && icon > 0) icons.push(icon);
          }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawResistStates = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "耐性ステート" : 'Resist State');
    let Unknown = false;
    if (nameText) {
        this.drawText(nameText, x, y, width);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (StateUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    let icons = [];
    StateList.forEach(state => {
        let rate = 1.0;
        let icon = 0;
        if(state.StateId > 0){
            let stateId = state.StateId;
            let rate = enemy.stateRate(stateId);
            if (ResistNoEffectState) {
              rate *= enemy.isStateResist(stateId) ? 0 : 1;
            }
            if (rate < 1 && (ResistNoEffectState || (!ResistNoEffectState && rate > 0))) {
              if (Unknown || (StateUnknownIconId > 0 && !this.onStateFlag(stateId))) {
                icon = StateUnknownIconId;
              } else {
                icon = this.onStateFlag(stateId) ? $dataStates[stateId].iconIndex : 0;
              }
              if (icon && icon > 0) icons.push(icon);
            }
        }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawWeakStates = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "弱点ステート" : 'Weak State');
    let Unknown = false;
    if (nameText) {
        this.drawText(nameText, x, y, width);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (StateUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    let icons = [];
    StateList.forEach(state => {
        let rate = 1.0;
        let icon = 0;
        if(state.StateId > 0) {
            let stateId = state.StateId;
            let rate = enemy.stateRate(stateId);
            if (((!NormalWeakState && rate > 1) || (NormalWeakState && rate >= 1)) && !enemy.isStateResist(stateId)) {
                if (Unknown || (StateUnknownIconId > 0 && !this.onStateFlag(stateId))) {
                    icon = StateUnknownIconId;
                } else {
                    icon = this.onStateFlag(stateId) ? $dataStates[stateId].iconIndex : 0;
                }
                if (icon && icon > 0) icons.push(icon);
            }
        }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawNoEffectStates = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "無効ステート" : 'Invalid State');
    let Unknown = false;
    if (nameText) {
        this.drawText(nameText, x, y, width);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (StateUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    let icons = [];
    StateList.forEach(state => {
        let rate = 1.0;
        let icon = 0;
        if(state.StateId){
            let stateId = state.StateId;
            let rate = enemy.stateRate(stateId);
            if (rate <= 0 || enemy.isStateResist(stateId)) {
                if (Unknown || (StateUnknownIconId > 0 && !this.onStateFlag(stateId))) {
                    icon = StateUnknownIconId;
                } else {
                    icon = this.onStateFlag(stateId) ? $dataStates[stateId].iconIndex : 0;
                }
                if (icon && icon > 0) icons.push(icon);
            }
        }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawWeakDebuff = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "弱点デバフ" : 'Weak Debuff');
    let Unknown = false;
    if (nameText) {
        this.drawText(nameText, x, y, width);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (DeBuffUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    let icons = [];
    DeBuffList.forEach(buff => {
        let icon = 0;
        let rate = enemy.debuffRate(buff.ParamId);
        if (rate > 1) {
            if (Unknown || (DeBuffUnknownIconId > 0 && !this.onDebuffFlag(buff.ParamId))) {
                icon = DeBuffUnknownIconId;
            } else {
                icon = this.onDebuffFlag(buff.ParamId) ? buff.DebuffIconId : 0;
            }
            if (icon && icon > 0) icons.push(icon);
        }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawResistDebuff = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "耐性デバフ" : 'Resist Debuff');
    let Unknown = false;
    if (nameText) {
        this.drawText(nameText, x, y, width);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (DeBuffUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    let icons = [];
    DeBuffList.forEach(buff => {
        let icon = 0;
        let rate = enemy.debuffRate(buff.ParamId);
        if (rate < 1) {
            if (Unknown || (DeBuffUnknownIconId > 0 && !this.onDebuffFlag(buff.ParamId))) {
                icon = DeBuffUnknownIconId;
            } else {
                icon = this.onDebuffFlag(bufff.ParamId) ? buff.DebuffIconId : 0;
            }
            if (icon && icon > 0) icons.push(icon);
        }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawDesc = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName;
    if (nameText) {
        this.drawText(nameText, x, y, width);
        y += lineHeight;
    }
    this.resetTextColor();
    if(this.paramMask(list.MaskMode)){
        let text = list.DetaEval ? list.DetaEval : undefined;
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

Window_EnemyBook.prototype.enemyCharacter = function(list, enemy, x, y, width) {
    this.enemyCharacterChip(enemy, x, y);
};

Window_EnemyBook.prototype.enemyElementChart = function(list, enemy, x, y, width) {
    if (!Imported.NUUN_RadarChartBase) {
      return;
    }
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "耐性属性" : 'Resist Element');
    this.drawText(nameText, x, y, width);
    const lineHeight = this.lineHeight();
    this.enemyElementRadarChart(this.setEnemyElementChart(enemy), enemy, x, y + lineHeight ,'element');
};

Window_EnemyBook.prototype.enemyStateChart = function(list, enemy, x, y, width) {
    if (!Imported.NUUN_RadarChartBase) {
      return;
    }
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "耐性ステート" : 'Resist State');
    this.drawText(nameText, x, y, width);
    const lineHeight = this.lineHeight();
    this.enemyStateRadarChart(this.setEnemyStateChart(enemy), enemy, x, y + lineHeight ,'state');
};

Window_EnemyBook.prototype.setEnemyElementChart = function(enemy) {
    const data = [];
    for (const element of ElementList) {
      let rate = enemy.elementRate(element.ElementNo);
      const elementName = $dataSystem.elements[element.ElementNo];
      const elementIconId = element.ElementIconId || 0;
      data.push(this.setRadarChart(elementName, rate, elementIconId));
    }
    return data;
};

Window_EnemyBook.prototype.setEnemyStateChart = function(enemy) {
    const data = [];
    for (const state of StateList) {
      let stateId = state.StateId;
      let rate = enemy.stateRate(stateId);
      rate *= enemy.isStateResist(stateId) ? 0 : 1;
      const stateName = $dataStates[stateId].name;
      const iconId = RadarChartIcon ? $dataStates[stateId].iconIndex : 0;
      data.push(this.setRadarChart(stateName, rate, iconId));
    }
    return data;
};

Window_EnemyBook.prototype.enemyElementRadarChart = function(list, enemy, x, y, type) { 
    const key = "enemyRadarChart_%1".format(type);
    const sprite = this.createInnerSprite(key, Sprite_NUUN_RadarChart);
    sprite.setupColor(ElementRadarChartFramecolor, ElementRadarChartLineColor, ElementRadarChartMainColor1, ElementRadarChartMainColor2);
    sprite.setup(enemy, type, list, ElementRadarChartRadius, ElementRadarChartX, ElementRadarChartY, ElementRadarChart_FontSize);
    sprite.move(x, y);
};

Window_EnemyBook.prototype.enemyStateRadarChart = function(list, enemy, x, y, type) { 
    const key = "enemyRadarChart_%1".format(type);
    const sprite = this.createInnerSprite(key, Sprite_NUUN_RadarChart);
    sprite.setupColor(StateRadarChartFramecolor, StateRadarChartLineColor, StateRadarChartMainColor1, StateRadarChartMainColor2);
    sprite.setup(enemy, type, list, StateRadarChartRadius, StateRadarChartX, StateRadarChartY, StateRadarChart_FontSize);
    sprite.move(x, y);
};

Window_EnemyBook.prototype.commonEnemyBitmap = function(list, enemy, x, y, width) {
    if (!list.ImgData) {
        return;
    }
    const bitmap = ImageManager.nuun_LoadPictures(list.ImgData);
    bitmap.addLoadListener(function() {
        this.drawImg(bitmap, list, x, y, width);
    }.bind(this));
};

Window_EnemyBook.prototype.enemyBitmap = function(list, enemy, x, y, width) {
    const dataImg = this._enemy.meta[list.textMethod] ? this._enemy.meta[list.textMethod].split(',') : null;
    if (dataImg) {
        const bitmap = ImageManager.loadBitmap("img/"+ ImgFolder +"/", dataImg[0]);
        x += Number(dataImg[1]) || 0;
        y += Number(dataImg[2]) || 0;
        bitmap.addLoadListener(function() {
            this.drawImg(bitmap, list, x, y, width);
        }.bind(this));
    }
};

Window_EnemyBook.prototype.drawImg = function(bitmap, list, x, y, width) {
    const height = list.ImgMaxHeight * this.lineHeight();
    const scalex = Math.min(1.0, width / bitmap.width);
    const scaley = Math.min(1.0, height / bitmap.height);
    const scale = scalex > scaley ? scaley : scalex;
    const dw = Math.floor(bitmap.width * scale);
    const dh = Math.floor(bitmap.height * scale);
    x += Math.floor(width / 2 - dw / 2);
    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, dw, dh);
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
    const fontSize = $gameSystem.mainFontSize() - this.contents.fontSize;
    const height = this.lineHeight() - fontSize - this.rowSpacing();
    return new Rectangle(x, y + 2 + Math.floor(fontSize / 2), width, height);
};

Window_EnemyBook.prototype.contensX = function(x) {
    return x + (this.itemPadding() / 2);
};

Window_EnemyBook.prototype.contensWidth = function(width) {
    return width - this.itemPadding();
};

Window_EnemyBook.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_EnemyBook.prototype.numberWidthSlice = function(indexText) {
    return ($gameSystem._enemyBookLength >= 1000 ? ('0000' + indexText).slice(-4) : ('000' + indexText).slice(-3));
};

Window_EnemyBook.prototype.drawEnemyBookNumber = function(text, x, y, width) {
    this.drawText(text , x, y, width,'right');
};

Window_EnemyBook.prototype.buffIconIndex = function(rate, paramId) {
	if (rate > 1) {
        return Game_BattlerBase.ICON_BUFF_START + (buffLevel - 1) * 8 + paramId;
    }
};

Window_EnemyBook.prototype.iconX = function(icons, width) {
	if (ImageManager.iconWidth * icons.length > width) {
		return Math.floor(width / icons.length);
	}
	return ImageManager.iconWidth;
};

Window_EnemyBook.prototype.enemyCharacterChip = function(enemy, x, y) { 
    const key = "enemyBook_character";
    const sprite = this.createInnerSprite(key, Sprite_EnemyBookCharacter);
    sprite.setup(enemy);
    sprite._character.setPosition(x + 24, y + this.lineHeight());
    sprite.updatePosition();
    sprite.show();
};

Window_EnemyBook.prototype.nameLength = function(name) {
	return name.length;
};

Window_EnemyBook.prototype.unknownDataLength = function(name) {
    if(UnknownItems === '？' || UnknownItems === '?') {
        const name_length = this.nameLength(name);
        return UnknownItems.repeat(name_length);
    } else {
        return UnknownItems;
    }
};

function Window_BattleEnemyBook() {
    this.initialize(...arguments);
}
  
Window_BattleEnemyBook.prototype = Object.create(Window_EnemyBook.prototype);
Window_BattleEnemyBook.prototype.constructor = Window_BattleEnemyBook;
  
Window_BattleEnemyBook.prototype.initialize = function(rect) {
    Window_EnemyBook.prototype.initialize.call(this, rect);
    this._mode = 'book'
    this.selectEnemy = null;
    this._contentsData = null;
};

Window_BattleEnemyBook.prototype.setMode = function(mode, data) {
    this._mode = mode;
    this._contentsData = data || null;
};

Window_BattleEnemyBook.prototype.setPage = function(index) {
    this._page = index;
    this._displayList = index >= 0 ? this.getEnemyStatusList()[index] : null;
    this.refresh();
};

Window_BattleEnemyBook.prototype.maxCols = function() {
    switch (this._mode) {
        case 'book':
            return ContentCols;
        case 'info':
            return InfoContentCols;
        case 'analyze':
            return this._contentsData ? this._contentsData.ContentCols : ContentCols;
    }
};

Window_BattleEnemyBook.prototype.getEnemyStatusList = function() {
    switch (this._mode) {
        case 'book':
            return PageSetting;
        case 'info':
            return InfoPageSetting;
        case 'analyze':
            const id = this._contentsData ? this._contentsData.ListNumber : -1;
            return id > 0 && AnalyzeListData[id] ? AnalyzeListData[id].AnalyzePageList : PageSetting;
    }
};

Window_BattleEnemyBook.prototype.statusMode = function() {
    switch (this._mode) {
        case 'book':
            return false;
        case 'info':
            return InfoEnemyCurrentStatus;
        case 'analyze':
            return this._contentsData ? this._contentsData.EnemyCurrentStatus : false;
    }
};

Window_BattleEnemyBook.prototype.statusGaugeMode = function() {
    switch (this._mode) {
        case 'book':
            return false;
        case 'info':
            return InfoStatusGaugeVisible;
        case 'analyze':
            return this._contentsData ? this._contentsData.StatusGaugeVisible : false;
    }
};

Window_BattleEnemyBook.prototype.noUnknownStatus = function(enemy) {
    if (this._mode === 'info' || this._mode === 'analyze') {
        return this._enemy.meta.ShowDataBook || this._enemy.meta.NoBookData;
    } else {
        return this._enemy.meta.ShowDataBook;
    }
};

Window_BattleEnemyBook.prototype.setBuffColor = function(list, enemy) {
    if (this.statusMode()) {
        if (list.DateSelect === 1 && enemy.isDying()) {
            this.changeTextColor(this.crisisColor());
        } else if (list.DateSelect > 2 && list.DateSelect !== 9) {
            this.changeTextColor(this.buffColor(this.paramShow(list, enemy), this.normalParam(list, enemy)));
        }
    }
};

Window_BattleEnemyBook.prototype.getEnemyData = function() {
    return this.statusMode() ? this.selectEnemy : new Game_Enemy(this._enemy.id, 0, 0);
};

Window_BattleEnemyBook.prototype.enemyGauge = function(list, enemy, x, y, width) {
    if (!this.statusMode() || !this.statusGaugeMode()) {
        this.enemyParams(list, enemy, x, y, width);
        return;
    }
    switch (list.DateSelect) {
        case 1:
            $gameTemp.bookGaugeType = "hp";
            this.placeGauge(enemy, "hp", x, y);
            break;
        case 2:
            $gameTemp.bookGaugeType = "mp";
            this.placeGauge(enemy, "mp", x, y);
            break;
        case 9:
            $gameTemp.bookGaugeType = "tp";
            this.placeGauge(enemy, "tp", x, y);
            break;
    }
};

Window_BattleEnemyBook.prototype.turn = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    if (BattleManager.isTpb() && this.statusMode()) {
        if (list.Back) {
            this.drawContentsBackground(list.Back, x, y, width);
            x = this.contensX(x);
            width = this.contensWidth(width);
        }
        const nameText = list.paramName ? list.paramName : (this.language_Jp ? "ターン" : 'Turn');
        const systemWidth = nameText ? (list.SystemItemWidth || 100) : 0;
        this.drawText(nameText, x, y, systemWidth);
        this.resetTextColor();
        let text;
        if(this.paramMask(list.MaskMode)){
            text = list.DetaEval ? eval(list.DetaEval) : Math.max(enemy.turnCount(), 1);
        } else {
            text = UnknownStatus;
        }
        this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
    }
};

Window_BattleEnemyBook.prototype.placeGauge = function(enemy, type, x, y, width) {
    const key = "enemyBook-gauge-%1".format(type);
    const sprite = this.createInnerSprite(key, Sprite_EnemyBookGauge);
    sprite.setup(enemy, type);
    sprite.move(x, y);
    sprite.show();
};

Window_EnemyBook.prototype.buffColor = function(params, nparams) {
    const _buffColor = this._mode === 'info' ? BuffColor : (this._contentsData ? this._contentsData.BuffColor : BuffColor);
    const _debuffColor = this._mode === 'info' ? DebuffColor : (this._contentsData ? this._contentsData.DebuffColor : DebuffColor);
    if (params > nparams) {
        return NuunManager.getColorCode(_buffColor)
    } else if (params < nparams) {
        return NuunManager.getColorCode(_debuffColor)
    } else {
        return ColorManager.normalColor();
    }
};

Window_EnemyBook.prototype.crisisColor = function() {
    return ColorManager.crisisColor();
};


const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
  _Window_PartyCommand_makeCommandList.call(this);
  if (this.isEnemyBook()) {
    this.addCommand(CommandName, "enemyBook");
  }
  if (this.isEnemyInfo()) {
    this.addCommand(EnemyInfoCommandName, "enemyBookInfo");
  }
};

Window_Command.prototype.isEnemyBook = function() {
    return ShowBattleCommand && ($gameSwitches.value(enemyBookBattleSwitch) || enemyBookBattleSwitch === 0);
};
  
Window_Command.prototype.isEnemyInfo = function() {
    return ShowEnemyInfoCommand && ($gameSwitches.value(enemyBookInfoSwitch) || enemyBookInfoSwitch === 0);
};


const _Window_BattleLog_displayMiss =Window_BattleLog.prototype.displayMiss;
Window_BattleLog.prototype.displayMiss = function(target) {
    if (target.result().analyzeSkill) {
        const fmt = BattleManager.analyzeMissMessage;
        this.push("pushBaseLine");
        this.push("addText", fmt);
    } else {
    _Window_BattleLog_displayMiss.call(this, target);
    }
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
        this.scale.x = SVEnemyMirror ? -1 : 1;
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


function Sprite_EnemyBookGauge() {
    this.initialize(...arguments);
}
  
Sprite_EnemyBookGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_EnemyBookGauge.prototype.constructor = Sprite_EnemyBookGauge;

Sprite_EnemyBookGauge.prototype.initialize = function() {
    Sprite_Gauge.prototype.initialize.call(this);
    this._statusType = $gameTemp.bookGaugeType;
    $gameTemp.bookGaugeType = null;
};
  
Sprite_EnemyBookGauge.prototype.bitmapWidth = function() {
    const statusType = !this._statusType ? $gameTemp.bookGaugeType : this._statusType;
    switch (statusType) {
        case "hp":
            return HPgaugeWidth;
        case "mp":
            return MPgaugeWidth;
        case "tp":
            return TPgaugeWidth;
        default:
            return Sprite_Gauge.prototype.bitmapWidth.call(this);
    }
};

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

Sprite_EnemyBookCharacter.prototype.setup = function(battler) {
    const character = new Game_EnemyBookCharacter(battler.enemyId());
    this.setCharacter(character);
};


const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _BattleManager_initMembers.call(this);
    this.analyzeMissMessage = null;
    this.enemyBook_Open = false;
};

const _BattleManager_isBusy = BattleManager.isBusy;
BattleManager.isBusy = function() {
    return this.enemyBookIsBusy() || _BattleManager_isBusy.call(this);
};

BattleManager.enemyBookIsBusy = function() {
    return this.enemyBook_Open;
};

BattleManager.setEnemyBookWinsow = function(window) {
    return this.enemyBookWindow = window;
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


})();