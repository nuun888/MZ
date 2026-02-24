/*:-----------------------------------------------------------------------------------
 * NUUN_ConditionsBase.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc 条件付きベース
 * @author NUUN
 * @version 1.4.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 条件により発動する特徴、スキルなどを設定するためのプラグインです。
 * タグの記述方法は各対応のプラグインで確認してください。
 * 条件はプラグインパラメータの適用条件で設定します。適用条件は全ての条件付き対応プラグインで共通となります。
 * 
 * リストに条件を設定していきます。
 * 識別名：何の条件かを認識しやすいようにするためのパラメータです。現バージョンでは設定しなくても問題ありません。
 * 条件タイプ：条件を設定します。設定後に表示されている文字とパーティ、敵グループから評価式までの（）内に表示されている文字と同じ
 * 項目を指定します。（'Battler'ならアクター、敵(Battler)）
 * 
 * 共通設定の各項目は、設定した項目に記載してある()内の数字の項目に記入します。
 * (1)(3)なら共通設定の上限値、下限値または指定のIDに記入。
 * (1)(2)はどちらかを入力します。
 * 敵グループは戦闘中のみ有効です。
 * 
 * 生存しているパーティメンバーが４人以上の場合
 * 条件タイプ　パーティ、敵グループ(Member)
 * パーティ、敵グループ　生存メンバー数(1)(2)（(1)バトラー数、(2)バトラー数）'AliveMember'
 * 上限値(1) 0 下限値(1) 4
 * 上限値は指定の数値以下　下限値は指定の数字以上　指定の数値は固定値になります。(1)と(2)は両方選択することはできませんので別々にリストに設定してください。
 * 
 * ステート4番にかかっている
 * 条件タイプ　ステート(State)
 * ステート　指定のステートIDにかかっている(1)(2)(3)（(1)ターン (2)ターン (3)ステートID）'AddState'
 * 指定の数値(2) 無記入 または　上限値(1) 0、下限値(2) 0
 * 指定のID(3) 4
 * 
 * ステート5番6番にかかっていて残りターン３ターン目の場合
 * 条件タイプ　ステート(State)
 * ステート　指定のステートIDにかかっている(1)(2)(3)（(1)ターン (2)ターン (3)ステートID）'AddState'
 * 指定の数値(2) 3 または　上限値(1) 3、下限値(2) 3
 * 指定のID(3) 5,6
 * 
 * ゲーム変数１０番が１０２以上１１０以下の場合
 * 条件タイプ　ゲーム変数(Variable)
 * ゲーム変数　指定の変数(1)(2)(3)（(1)範囲値 (2)値 (3)ゲーム変数ID）'Var'
 * 上限値(1) 110 下限値(2) 102
 * 指定のID(3) 10
 * 
 * 
 * 条件
 * (1)上限下限値：上限値は判定する数値の最大値を参照します。下限値は判定する数値の最小値を参照します。
 * 下限値以上上限値以下なら条件を満たします。上限値が0なら下限値以上なら条件を満たします。
 * 
 * (2)指定した数値：数値は複数設定できますが複数設定する場合は、''または""で囲む必要があります。
 * いずれかの数値が一致したときに条件を満たします。　指定した数値に入力がある場合(1)上限下限値の設定は無視されます。
 * 2つ以上指定する場合は必ず''で囲ってください。例'6,7,17'
 * 
 * (3)指定したID：数値は複数設定できますが複数設定する場合は、''または""で囲む必要があります。
 * いずれかのIDが一致したときに条件を満たします。
 * 2つ以上指定する場合は必ず''で囲ってください。例'6,7,17'
 * 
 * 対象がアクター、パーティなら味方、エネミー、敵グループなら敵の条件を参照します。
 * 【パーティ、敵グループ】
 * [戦闘メンバー数]
 * 戦闘メンバー該当のメンバーの数が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * 敵グループは戦闘中以外の場合はfalseを返します。
 * [生存メンバー数]
 * 戦闘メンバーで戦闘不能になっていない該当のメンバーの数が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * 敵グループは戦闘中以外の場合はfalseを返します。
 * [戦闘不能メンバー数]
 * 戦闘メンバーで戦闘不能になっている該当のメンバーの数が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * 敵グループは戦闘中以外の場合はfalseを返します。
 * [サポートメンバー数]
 *  戦闘メンバーでサポートアクター数が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * 要サポートアクタープラグイン
 * 
 * 【アクター、敵】
 * [バトラーID]
 * 使用者、または対象のIDが「指定した数値」(3)を一致なら条件を満たします。
 * [一致したバトラーID数]
 * 「指定した数値」(3)が一致したIDの数が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * [アクターなら]
 * 対象がアクター、パーティなら条件を満たします。
 * [敵なら]
 * 対象が敵、敵グループなら条件を満たします。
 * 
 * 【職業】
 * [クラスID]
 * 使用者、または対象のクラスIDが「指定した数値」(3)を一致なら条件を満たします。対象が敵または敵グループの場合はfalseを返します。
 * [一致したクラスID数]
 * 「指定した数値」(3)が一致したクラスIDの数が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * 対象が敵または敵グループの場合はfalseを返します。
 * 
 * 【能力値】
 * [HP][MP][TP]
 * 対象のHP,MP,TPが「上限下限値%内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 上限値、下限値は割合(%)、指定の数値は通常の値です。
 * [攻撃][防御][魔法力][魔法防御][敏捷][運]
 * 対象のステータス値が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 
 * 【追加能力値】
 * 対象のステータス値が「上限下限値%内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 上限値、下限値は割合(%)、指定の数値は通常の値です。
 * 
 * 【特殊能力値】
 * 対象のステータス値が「上限下限値%内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 上限値、下限値は割合(%)、指定の数値は通常の値です。
 * 
 * 【レベル】
 * [指定のレベル]
 * 対象のレベルが「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * パーティの場合はいずれかが一致したときに条件を満たします。
 * [平均レベル]
 * メンバーの平均レベルが「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * 対象がアクター、パーティなら味方の条件を参照します。
 * 
 * 【ステート】
 * [指定のステートIDにかかっている]
 * 対象が「指定のステートID](3)にかかっていて残りターンが「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * ステートごとに残りターン条件を指定したい場合は条件リストを別途追加してください。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * [指定のステートIDにかかっていない]
 * 対象が「指定のステートID](3)にかかっていなければ条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * [指定のステートIDにかかっている(経過ターン)要ステート経過ターンカウント]
 * 対象が「指定のステートID](3)にかかっていて経過ターンが「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * ステートごとに残りターン条件を指定したい場合は条件リストを別途追加してください。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 
 * 【バフ】
 * [指定のバフIDにかかっている][指定のデバフIDにかかっている]
 * 対象が「指定のバフID](3)にかかっていれば条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * [指定のバフIDにかかっていない][指定のデバフIDにかかっていない]
 * 対象が「指定のバフID](3)にかかっていなければ条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 0：HP　1：MP　2:攻撃力　3：防御力　4：魔法力　5：魔法防御　6：敏捷性　7：運
 * 
 * 【武器タイプ】
 * [指定の武器装備][指定の防具装備]
 * 対象が「指定の装備ID](3)を装備していれば一致なら条件を満たします。
 * 「指定の武器ID]を0に指定した場合は素手の時に条件を満たします。
 * 「指定の防具ID]を0に指定した場合は防具を装備していない時に条件を満たします。
 * パーティの場合はいずれかが一致したときに条件を満たします。
 * 対象が敵または敵グループの場合はfalseを返します。
 * [指定の武器タイプ][指定の防具タイプ]
 * 対象が「指定の武器、防具タイプID](3)の装備を装備していれば一致なら条件を満たします。
 * パーティの場合はいずれかが一致したときに条件を満たします。
 * 対象が敵または敵グループの場合はfalseを返します。
 * 
 * 【ターン】
 * [指定のターン]
 * 対象または現在のターンが「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * ターン制の場合は現在のターンが参照されます。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 
 * 【属性】
 * [指定の属性]
 * 対象の攻撃属性が「指定した数値」(3))と一致なら条件を満たします。
 * なお対象がパーティ、敵グループの場合は判定しません。
 * 
 * 【有効度】
 * [属性有効度][ステート有効度]
 * 対象の「指定した属性、ステートIDの有効度」(3))が「上限下限値%内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 
 * 【アイテム、スキル使用】
 * [アイテムを使用][スキルを使用]
 * 使用したアイテム、スキル「指定したアイテム、スキルID」(3)が一致なら条件を満たします。
 * パーティ、敵グループの場合はfalseを返します。
 * [スキルタイプ]
 * 対象の攻撃時のスキルタイプが「指定した数値」(3))と一致なら条件を満たします。
 * パーティ、敵グループの場合はfalseを返します。
 * [アイテムグループ](未実装)
 * 対象のアイテム使用時のアイテムグループが「指定した数値」(3))と一致なら条件を満たします。
 * パーティ、敵グループの場合はfalseを返します。
 * 
 * 【アイテム所持、スキル習得】
 * [アイテム所持][武器所持][防具所持]
 * [指定した数値](3)の所持数が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * 下限値を1、上限値を0に設定することで１つ以上所持で条件を満たすようになります。
 * 敵、敵グループの場合はfalseを返します。
 * [アイテム未所持][武器未所持][防具未所持]
 * [指定した数値](3)が所持していなければ条件を満たします。
 * [スキル習得済み]
 * [指定した数値](3)が習得済みなら条件を満たします。
 * 敵の場合は行動スキルに(3)のスキルが存在すれば条件を満たします。
 * 
 * 【攻撃】
 * [命中タイプが物理][命中タイプが魔法][命中タイプが必中]
 * 攻撃時の命中タイプが一致すれば条件を満たします。
 * パーティ、敵グループの場合はfalseを返します。
 * [ダメージタイプがHP回復][ダメージタイプがMP回復][ダメージタイプがHP吸収][ダメージタイプがMP吸収]
 * 攻撃時のダメージタイプが一致すれば条件を満たします。
 * パーティ、敵グループの場合はfalseを返します。
 * [クリティカル時]
 * クリティカルなら条件を満たします。
 * 
 * 【ダメージ】
 * [指定のダメージ]
 * ダメージが「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * パーティ、敵グループの場合はfalseを返します。
 * 
 * 【反撃、反射】
 * [反撃時][魔法反射時]
 * 反撃時または魔法反射時なら条件を満たします。
 * 
 * 【乗り物】
 * [小舟に乗っている][大型船に乗っている][飛行船に乗っている][乗り物に乗っている]
 * 該当の乗り物に乗っているなら条件を満たします。
 * [小舟に乗っていない][大型船に乗っていない][飛行船に乗っていない][乗り物に乗っていない]
 * 該当の乗り物に乗っていないなら条件を満たします。
 * 
 * 【ゲーム変数】
 * [指定の変数]
 * 「指定した変数ID」(3)の値が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * 
 * 【スイッチ】
 * [指定のスイッチがON]
 * 「指定したスイッチID」(3)がONなら条件を満たします。
 * [指定のスイッチがOFF]
 *「指定したスイッチID」(3)がOFFなら条件を満たします。
 * 
 * 【所持金】
 * [所持金額]
 * 所持金が[上限下限値内](1)または「指定した数値」(2)と一致なら条件を満たします。
 * 対象が味方、パーティなら所持金を参照します。
 * 対象が敵なら敵の獲得できる所持金を参照します。
 * 対象が敵グループなら敵グループの獲得できる合計の所持金が参照されます。
 * 
 * 【経験値】
 * [現レベルの経験値]
 * 現レベルの獲得経験値が[上限下限値内](1)または「指定した数値」(2)と一致なら条件を満たします。
 * 
 * 【天候】
 * [晴れ][雨][嵐][雪]
 * 天候が指定した天候なら条件を満たします。
 * 
 * 【条件式】
 * 条件式の評価がtrueなら条件を満たします。
 * 
 * 【メモ欄】
 * [アクター、敵キャラのメモ欄]
 * アクター及び敵キャラのメモ欄に指定のタグが存在する場合に条件を満たします。
 * [特徴を有するメモ欄]
 * アクター及び敵キャラの特徴を有するメモ欄に指定のタグが存在する場合に条件を満たします。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2026/2/24 Ver.1.4.1
 * 装備のパーティメンバー条件を指定時にエラーが出る問題を修正。
 * 2025/8/15 Ver.1.4.0
 * 指定の数値、指定のID、文字列を配列で指定できるように修正。
 * 2024/6/27 Ver.1.3.3
 * 追加能力値、特殊能力値の条件が適用されていなかった問題を修正。
 * 2023/9/18 Ver.1.3.2
 * 条件が攻撃条件だったときにエラーが出る問題を修正。
 * 2023/7/31 Ver.1.3.1
 * 指定の数値が数値のみで入力されたときにエラーが出る問題を修正。
 * 2023/7/13 Ver.1.3.0
 * 天候による条件を追加。
 * 2023/7/1 Ver.1.2.2
 * 複数属性更新による処理の修正。
 * 2023/6/25 Ver.1.2.1
 * カウンターの処理を修正。
 * 2023/6/23 Ver.1.2.0
 * 条件にメモ欄を追加。
 * プラグインパラメータからの引数を処理できるように処理を追加。
 * 2023/4/8 Ver.1.1.12
 * 防具を所持していない条件を指定時にエラーが出る問題を修正。
 * 2023/4/7 Ver.1.1.11
 * アイテム、武器、防具を所持していない時の条件を追加。
 * 2023/3/25 Ver.1.1.10
 * スキル習得条件で特徴から習得したスキルが適用されない問題を修正。
 * 2022/12/18 Ver.1.1.9
 * ステート有効度の条件が正常に取得できていなかった問題を修正。
 * 2022/12/18 Ver.1.1.8
 * 属性有効度、ステート有効度を設定し、適用するとエラーが出る問題を修正。
 * 2022/11/23 Ver.1.1.7
 * 条件に能力値、追加能力値、特殊能力値を指定した場合、パフォーマンスが著しく低下する問題を修正。
 * 2022/8/28 Ver.1.1.6
 * ステートのターン条件に経過ターンで指定できる機能を追加。
 * 2022/6/19 Ver.1.1.5
 * 一部プラグインでエラーが出るため修正。
 * 2022/5/4 Ver.1.1.4
 * 一部条件によってはクリティカル時の条件が適用されない問題を修正。
 * リストにないIDが設定されていた場合にエラーが起きる問題を修正。
 * 2021/12/31 Ver.1.1.3
 * 戦闘外の敵グループ指定の戻り値をfalseで返すように修正。
 * 2021/12/19 Ver.1.1.2
 * 条件に戦闘不能メンバー、サポートアクターメンバーを追加。
 * エンカウント条件適用による処理の追加。
 * 2021/12/18 Ver.1.1.1
 * 使用者、または対象がアクター、敵の条件を追加。
 * 2021/12/13 Ver.1.1.0
 * 条件にアイテム、武器、防具の所持、スキルの習得、スキルタイプ、所持金、反撃、魔法反射を追加。
 * スキル、アイテム使用が適用されていなかった問題を修正。
 * 2021/11/27 Ver.1.0.5
 * 装備判定が適用されていなかった問題を修正。
 * 指定の装備に素手時、防具なしの時の条件を追加。
 * 2021/11/13 Ver.1.0.4
 * ステート、バフのID指定が正常に適用されていなかった問題を修正。
 * 一部のバフ条件が適用されなかった問題を修正。
 * 2021/11/12 Ver.1.0.3
 * ターン制時に条件ターンが正常に取得できていなかった問題を修正。
 * 一部プラグインの定義変更。
 * 複数属性取得処理の変更。NUUN_Base 要Ver.1.3.1以降
 * 2021/9/13 Ver.1.0.1
 * 属性時の条件が正常に判定されていなかった問題を修正。
 * 2021/9/13 Ver.1.0.0
 * 初版
 * 
 * @param TriggerConditions
 * @text 適用条件
 * @desc 適用する条件を設定します。
 * @type struct<Conditions>[]
 * 
 */
/*~struct~Conditions:
 * 
 * @param NameStr
 * @text 識別名
 * @desc 識別名
 * @type string
 * @default
 * 
 * @param ConditionsMode
 * @text 条件タイプ
 * @desc 条件を指定します。
 * @type select
 * @option パーティ、敵グループ(Member)
 * @value 'Member'
 * @option アクター、敵(Battler)
 * @value 'Battler'
 * @option 職業(Class)
 * @value 'Class'
 * @option 経験値(Exp)
 * @value 'Exp'
 * @option 能力値(Param)
 * @value 'Param'
 * @option 追加能力値(XParam)
 * @value 'Xparam'
 * @option 特殊能力値(SParam)
 * @value 'Sparam'
 * @option レベル(Lavel)
 * @value 'Lavel'
 * @option ステート(State)
 * @value 'State'
 * @option バフ(Buff)
 * @value 'Buff'
 * @option 装備(Equip)
 * @value 'Equip'
 * @option ターン(Turn)
 * @value 'Turn'
 * @option 属性(Element)
 * @value 'Element'
 * @option 有効度(Validity)
 * @value 'Validity'
 * @option アイテム、スキル使用(UseItemSkill)
 * @value 'UseItemSkill'
 * @option アイテム、スキル(ItemSkill)
 * @value 'ItemSkill'
 * @option 攻撃(Attack)
 * @value 'Attack'
 * @option ダメージ(Damage)
 * @value 'Damage'
 * @option 反撃、反射(CounterReflection)
 * @value 'CounterReflection'
 * @option 乗り物(Vehicle)
 * @value 'Vehicle'
 * @option ゲーム変数(Variable)
 * @value 'Variable'
 * @option スイッチ(Switch)
 * @value 'Switch'
 * @option 所持金(Gold)
 * @value 'Gold'
 * @option メモ欄(Notes)
 * @value 'Notes'
 * @option 天候(Weather)
 * @value 'Weather'
 * @option 条件式(Eval)
 * @value 'Eval'
 * @default 
 * 
 * @param MemberConditionsType
 * @text パーティ、敵グループ(Member)
 * @desc パーティ、敵グループの条件タイプを指定します。
 * @type select
 * @option 戦闘メンバー数(1)(2)（(1)バトラー数、(2)バトラー数）
 * @value 'BattleMember'
 * @option 生存メンバー数(1)(2)（(1)バトラー数、(2)バトラー数）
 * @value 'AliveMember'
 * @option 戦闘不能メンバー数(1)(2)（(1)バトラー数、(2)バトラー数）
 * @value 'DeadMember'
 * @option サポートメンバー数(1)(2)（(1)バトラー数、(2)バトラー数）要サポートアクタープラグイン
 * @value 'SupportMember'
 * @default 
 * 
 * @param BattlerConditionsType
 * @text アクター、敵(Battler)
 * @desc アクター、敵の条件タイプを指定します。
 * @type select
 * @option バトラーID(3)（(3)バトラーID）
 * @value 'ID'
 * @option 一致したバトラーID数(1)(2)(3)（(1)バトラー数、(2)バトラー数、(3)バトラーID）
 * @value 'IDNum'
 * @option アクターなら
 * @value 'IsActor'
 * @option 敵なら
 * @value 'IsEnemy'
 * @default 
 * 
 * @param ClassConditionsType
 * @text 職業(Class)
 * @desc 職業の条件タイプを指定します。
 * @type select
 * @option クラスID(2)
 * @value 'ID'
 * @option 一致したバトラーのクラスID数(1)(2)(3)（(1)バトラー数、(2)バトラー数、(3)クラスID）
 * @value 'IDNum'
 * @default 
 * 
 * @param ExpConditionsType
 * @text 経験値(Exp)
 * @desc 経験値の条件タイプを指定します。
 * @type select
 * @option 現レベルの経験値(1)(2)（(1)経験値割合　(2)経験値固定値）
 * @value 'EXP'
 * @default 
 * 
 * @param ParamConditionsType
 * @text 能力値(Param)
 * @desc 能力値の条件タイプを指定します。
 * @type select
 * @option HP(1)(2)（(1)HP割合　(2)HP固定値）
 * @value 'HP'
 * @option MP(1)(2)（(1)MP割合　(2)MP固定値）
 * @value 'MP'
 * @option TP(1)(2)（(1)TP割合　(2)TP固定値）
 * @value 'TP'
 * @option 攻撃(1)(2)（(1)攻撃力範囲値　(2)攻撃力固定値）
 * @value 'ATK'
 * @option 防御(1)(2)（(1)防御力範囲値　(2)防御力固定値）
 * @value 'DEF'
 * @option 魔法力(1)(2)（(1)魔法力範囲値　(2)魔法力固定値）
 * @value 'MAT'
 * @option 魔法防御(1)(2)（(1)魔法防御範囲値　(2)魔法防御固定値）
 * @value 'MDF'
 * @option 敏捷(1)(2)（(1)敏捷性範囲値　(2)敏捷性固定値）
 * @value 'AGI'
 * @option 運(1)(2)（(1)運範囲値　(2)運固定値）
 * @value 'LUK'
 * @default 
 * 
 * @param XParamConditionsType
 * @text 追加能力値(XParam)
 * @desc 追加能力値の条件タイプを指定します。
 * @type select
 * @option 命中(1)(2)（(1)命中率割合範囲　(2)命中率割合）
 * @value 'HIT'
 * @option 回避(1)(2)（(1)回避率割合範囲　(2)回避率割合）
 * @value 'EVA'
 * @option 会心(1)(2)（(1)会心率割合範囲　(2)会心率割合）
 * @value 'CRI'
 * @option 会心回避(1)(2)（(1)会心回避率割合範囲　(2)会心回避率割合）
 * @value 'CEV'
 * @option 魔法回避(1)(2)（(1)魔法回避率割合範囲　(2)魔法回避率割合）
 * @value 'MEV'
 * @option 魔法反射(1)(2)（(1)魔法反射率割合範囲　(2)魔法反射率割合）
 * @value 'MRF'
 * @option 反撃(1)(2)（(1)反撃率割合範囲　(2)反撃率割合）
 * @value 'CNT'
 * @option HP再生(1)(2)（(1)HP再生率割合範囲　(2)HP再生率割合）
 * @value 'HRG'
 * @option MP再生(1)(2)（(1)MP再生率割合範囲　(2)MP再生率割合）
 * @value 'MRG'
 * @option TP再生(1)(2)（(1)TP再生率割合範囲　(2)TP再生率割合）
 * @value 'TRG'
 * @default 
 * 
 * @param SParamConditionsType
 * @text 特殊能力値(SParam)
 * @desc 特殊能力値の条件タイプを指定します。
 * @type select
 * @option 狙われ(1)(2)（(1)狙われ率割合範囲　(2)狙われ率割合）
 * @value 'TGR'
 * @option 防御効果(1)(2)（(1)防御効果率割合範囲　(2)防御効果率割合）
 * @value 'GRD'
 * @option 回復効果(1)(2)（(1)回復効果率割合範囲　(2)回復効果率割合）
 * @value 'REC'
 * @option 薬の知識(1)(2)（(1)薬の知識割合範囲　(2)薬の知識割合）
 * @value 'PHA'
 * @option MP消費1)(2)（(1)MP消費率割合範囲　(2)MP消費率割合）
 * @value 'MCR'
 * @option TPチャージ(1)(2)（(1)TPチャージ率割合範囲　(2)TPチャージ率割合）
 * @value 'TCR'
 * @option 物理ダメージ(1)(2)（(1)物理ダメージ率割合範囲　(2)物理ダメージ率割合）
 * @value 'PDR'
 * @option 魔法ダメージ(1)(2)（(1)魔法ダメージ率割合範囲　(2)魔法ダメージ率割合）
 * @value 'MDR'
 * @option 床ダメージ(1)(2)（(1)床ダメージ率割合範囲　(2)床ダメージ率割合）
 * @value 'FDR'
 * @option 獲得経験(1)(2)（(1)獲得経験率割合範囲　(2)獲得経験率割合）
 * @value 'EXR'
 * @default 
 * 
 * @param LavelConditionsType
 * @text レベル(Lavel)
 * @desc レベルの条件タイプを指定します。
 * @type select
 * @option 指定のレベル(1)(2)（(1)レベル　(2)レベル）
 * @value 'DFT'
 * @option 平均（パーティのみ）(1)(2)（(1)レベル　(2)レベル）
 * @value 'AVE'
 * @default 
 * 
 * @param StateConditionsType
 * @text ステート(State)
 * @desc ステートの条件タイプを指定します。
 * @type select
 * @option 指定のステートIDにかかっている(1)(2)(3)（(1)残りターン (2)残りターン (3)ステートID）
 * @value 'AddState'
 * @option 指定のステートIDにかかっている(1)(2)(3)（(1)経過ターン (2)経過ターン (3)ステートID）
 * @value 'AddStateCount'
 * @option 指定のステートIDにかかっていない(3)（(3)ステートID）
 * @value 'NotState'
 * @default 
 * 
 * @param BuffConditionsType
 * @text バフ(Buff)
 * @desc バフの条件タイプを指定します。指定ID　0：HP　1：MP　2:攻撃力　3：防御力　4：魔法力　5：魔法防御　6：敏捷性　7：運
 * @type select
 * @option 指定のバフIDにかかっている(3)
 * @value 'AddBuff'
 * @option 指定のバフIDにかかっていない(3)（(3)で無記入の場合はすべてのバフにかかっていない時に条件を満たします）
 * @value 'NotBuff'
 * @option 指定のデバフIDにかかっている(3)
 * @value 'AddDebuff'
 * @option 指定のデバフIDにかかっていない(3)（(3)で無記入の場合はすべてのデバフにかかっていない時に条件を満たします）
 * @value 'NotDebuff'
 * @default 
 * 
 * @param EquipConditionsType
 * @text 装備(Equip)
 * @desc 装備の条件タイプを指定します。
 * @type select
 * @option 指定の武器装備(3)（(3)武器ID）
 * @value 'Weapon'
 * @option 指定の防具装備(3)（(3)防具ID）
 * @value 'Armor'
 * @option 指定の武器タイプ(3)（(3)武器タイプ）
 * @value 'WeaponType'
 * @option 指定の防具タイプ(3)（(3)防具タイプ）
 * @value 'ArmorType'
 * @default 
 * 
 * @param TurnConditionsType
 * @text ターン(Turn)
 * @desc ターンの条件タイプを指定します。
 * @type select
 * @option 指定のターン(1)(2)（(1)(2)ターン数）
 * @value 'Turn'
 * @default 
 * 
 * @param ElementConditionsType
 * @text 属性(Element)
 * @desc 属性の条件タイプを指定します。
 * @type select
 * @option 指定の属性(3)（(3)属性ID）
 * @value 'Element'
 * @default 
 * 
 * @param ValidityConditionsType
 * @text 有効度(Validity)
 * @desc 有効度の条件タイプを指定します。
 * @type select
 * @option 属性有効度(1)(2)(3)（(1)(2)有効度　(3)属性ID）
 * @value 'ElementValidity'
 * @option ステート有効度(1)(2)(3)（(1)(2)有効度　(3)ステートID）
 * @value 'StateValidity'
 * @default 
 * @parent ValiditySetting
 * 
 * @param ItemSkillConditionsType
 * @text 使用アイテム、スキル(UseItemSkill)
 * @desc 使用アイテム、スキルの条件タイプを指定します。
 * @type select
 * @option アイテムを使用(3)（(3)のスキルIDが未指定の場合は全てのアイテムが対象）
 * @value 'Item'
 * @option スキルを使用(3)（(3)のアイテムIDが未指定の場合は全てのスキルが対象）
 * @value 'Skill'
 * @option スキルタイプ(3)（(3)スキルタイプID）
 * @value 'SkillType'
 * @option アイテムグループ(未実装)
 * @value 'ItemGroup'
 * @default 
 * 
 * @param GetItemSkillConditionsType
 * @text アイテム、スキル(ItemSkill)
 * @desc アイテム、スキルの条件タイプを指定します。
 * @type select
 * @option アイテムを所持(1)(2)(3)（(1)(2)個数 (3)アイテムID）
 * @value 'PossessionItem'
 * @option 武器を所持(1)(2)(3)（(1)(2)個数 (3)武器ID）
 * @value 'PossessionWeapon'
 * @option 防具を所持(1)(2)(3)（(1)(2)個数 (3)防具ID）
 * @value 'PossessionArmor'
 * @option アイテムを所持していない(3)（(3)アイテムID）
 * @value 'NotPossessionItem'
 * @option 武器を所持していない(3)（(3)武器ID）
 * @value 'NotPossessionWeapon'
 * @option 防具を所持していない(3)（(3)防具ID）
 * @value 'NotPossessionArmor'
 * @option スキルを習得(3)（(3)スキルID）
 * @value 'MasterSkill'
 * @default 
 * 
 * @param AttackConditionsType
 * @text 攻撃(Attack)
 * @desc 攻撃の条件タイプを指定します。
 * @type select
 * @option 命中タイプが物理
 * @value 'Physical'
 * @option 命中タイプが魔法
 * @value 'Magical'
 * @option 命中タイプが必中
 * @value 'CertainHit'
 * @option ダメージタイプがHP回復
 * @value 'HpRecover'
 * @option ダメージタイプがMP回復
 * @value 'MpRecover'
 * @option ダメージタイプがHP吸収
 * @value 'HpDrain'
 * @option ダメージタイプがMP吸収
 * @value 'MpDrain'
 * @option クリティカル時
 * @value 'Critical'
 * @default 
 * 
 * @param DamageConditionsType
 * @text ダメージ(Damage)
 * @desc ダメージの条件タイプを指定します。
 * @type select
 * @option 指定のダメージ(1)(2)
 * @value 'Damage'
 * @default 
 * 
 * @param CntRefConditionsType
 * @text 反撃、反射
 * @desc 反撃、反射の条件タイプを指定します。
 * @type select
 * @option 反撃時
 * @value 'Counter'
 * @option 魔法反射時
 * @value 'Reflection'
 * @default 
 * 
 * @param VehicleConditionsType
 * @text 乗り物(Vehicle)
 * @desc 乗り物の条件タイプを指定します。
 * @type select
 * @option 小舟に乗っている
 * @value 'OnBoat'
 * @option 大型船に乗っている
 * @value 'OnShip'
 * @option 飛行船に乗っている
 * @value 'OnAirShip'
 * @option 乗り物に乗っている
 * @value 'OnVehicle'
 * @option 小舟に乗っていない
 * @value 'NotBoat'
 * @option 大型船に乗っていない
 * @value 'NotShip'
 * @option 飛行船に乗っていない
 * @value 'NotAirShip'
 * @option 乗り物に乗っていない
 * @value 'NotVehicle'
 * @default 
 * 
 * @param VariableConditionsType
 * @text ゲーム変数(Variable)
 * @desc ゲーム変数の条件タイプを指定します。
 * @type select
 * @option 指定の変数(1)(2)(3)（(1)範囲値 (2)値 (3)ゲーム変数ID）
 * @value 'Var'
 * @default 
 * 
 * @param SwitchConditionsType
 * @text スイッチ(Switch)
 * @desc スイッチの条件タイプを指定します。
 * @type select
 * @option 指定のスイッチがON(3)（(3)スイッチID）
 * @value 'ONSwitch'
 * @option 指定のスイッチがOFF(3)（(3)スイッチID）
 * @value 'OFFSwitch'
 * @default 
 * 
 * @param GoldConditionsType
 * @text 金額(Gold)
 * @desc 金額の条件タイプを指定します。
 * @type select
 * @option 所持金額を指定(1)(2)（範囲値 (2)値）
 * @value 'Gold'
 * @default 
 * 
 * @param WeatherConditionsType
 * @text 天候(Weather)
 * @desc 天候の条件タイプを指定します。
 * @type select
 * @option 天候が晴れ
 * @value 'None'
 * @option 天候が雨
 * @value 'Rain'
 * @option 天候が嵐
 * @value 'Storm'
 * @option 天候が雪
 * @value 'Snow'
 * @default 
 * 
 * @param NotesConditionsType
 * @text メモ欄
 * @desc メモ欄の条件タイプを指定します。
 * @type select
 * @option アクター、敵キャラのメモ欄(3)（(3)タグ名）
 * @value 'BattlerNotes'
 * @option 特徴を有するメモ欄(3)（(3)タグ名）
 * @value 'Notes'
 * @default 
 * 
 * @param EvalStr
 * @text 評価式(Eval)
 * @desc 評価式
 * @type string
 * @default 
 * 
 * @param CommonSetting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param UpLimit
 * @text 上限値(1)
 * @desc 上限値(1)
 * @type number
 * @default 0
 * @parent CommonSetting
 * 
 * @param DwLimit
 * @text 下限値(1)
 * @desc 下限値(1)
 * @type number
 * @default 0
 * @parent CommonSetting
 * 
 * @param ValList
 * @text 指定の数値(2)
 * @desc 指定の数値（複数の場合は,で区切り''又は""で囲む　例'10, 11, 13'）(2)非推奨
 * @type string
 * @default
 * @parent CommonSetting
 * 
 * @param ValListArray
 * @text 指定の数値(2)
 * @desc 指定の数値(2)
 * @type number[]
 * @default
 * @parent CommonSetting
 * 
 * 
 * @param IDList
 * @text 指定のID、文字列(3)
 * @desc 指定のIDまたは文字列（複数の場合は,で区切り''又は""で囲む　例'10, 11, 13'）(3)非推奨
 * @type string
 * @default
 * @parent CommonSetting
 * 
 * @param IDListArray
 * @text 指定のID、文字列(3)
 * @desc 指定のIDまたは文字列(3)
 * @type string[]
 * @default
 * @parent CommonSetting
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ConditionsBase = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ConditionsBase');
const TriggerConditions = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['TriggerConditions'])) : null) || [];

const _Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
  _Game_Temp_initialize.call(this);
  this.actionData = {};
};

Game_Temp.prototype.getActionData = function() {
  return this.actionData;
};

const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
  _Game_ActionResult_clear.call(this);
  this.criticalHit = false;
};

const _Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
  $gameTemp.actionData.subject = this.subject();
  $gameTemp.actionData.target = target;
  $gameTemp.actionData.action = this;
  $gameTemp.actionData.damage = 0;
  _Game_Action_apply.call(this, target);
};

const _Game_Action_executeDamage = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function(target, value) {
  $gameTemp.actionData.damage = value;
 _Game_Action_executeDamage.call(this, target, value);
};

Game_Action.prototype.traitTriggerConditions = function(target, tag1, tag2, tag3, tag4, damage, partialMode) {//特徴取得
  const subject = this.subject();
  return subject.getTraitTriggerConditions(target, tag1, tag2, tag3, tag4, this, damage, partialMode);
};

Game_Action.prototype.triggerConditions = function(obj, target, tag1, tag2, tag3, tag4, damage, partialMode) {//単体
  const subject = this.subject();
  return subject.getTriggerConditions(obj, target, tag1, tag2, tag3, tag4, this, damage, partialMode);
};

Game_BattlerBase.prototype.getTraitTriggerConditions  = function(target, tag1, tag2, tag3, tag4, action, damage, partialMode) {//特徴取得
  return this.traitObjects().some(traits => {
    return getTriggerConditions(traits, this, target, tag1, tag2, tag3, tag4, action, damage, partialMode);
  });
};

Game_BattlerBase.prototype.getTriggerConditions  = function(obj, target, tag1, tag2, tag3, tag4, action, damage, partialMode) {//単体
  return getTriggerConditions(obj, this, target, tag1, tag2, tag3, tag4, action, damage, partialMode);
};

Game_BattlerBase.prototype.getTriggerConditionsParams  = function(obj, target, params, action, damage, partialMode) {//単体
    return getTriggerConditionsParams(obj, this, target, params, action, damage, partialMode);
};

Game_Player.prototype.getTriggerConditions  = function(list, partialMode) {
  if (partialMode === 0) {
    return isTriggerConditionsSome(list, null, 'Party', null, null);
  } else {
    return isTriggerConditionsEvery(list, null, 'Party', null, null);
  }
};

function getTriggerConditions(obj, subject, target, tag1, tag2, tag3, tag4, action, damage, partialMode) {
    if (getTriggerConditionsMeta(obj, tag1, tag2, tag3, tag4)) {
        const result1 = getTriggerConditionsResult(obj, subject, tag1, 'Subject', action, damage, partialMode);
        const result2 = getTriggerConditionsResult(obj, target, tag2, 'Target', action, damage, partialMode);
        const result3 = getTriggerConditionsResult(obj, null, tag3, 'Party', action, damage, partialMode);
        const result4 = getTriggerConditionsResult(obj, null, tag4, 'Troop', action, damage, partialMode);
        if (partialMode === 0) {
        return result1 || result2 || result3 || result4;
        } else {
        return result1 && result2 && result3 && result4;
        }
    } else {
        return true;
    }
};

function getTriggerConditionsParams(obj, subject, target, params, action, damage, partialMode) {
    if (getTriggerConditionsParam(params)) {
        const result1 = getTriggerConditionsParamsResult(obj, subject, params.SubjectCond, 'Subject', action, damage, partialMode);
        const result2 = getTriggerConditionsParamsResult(obj, target, params.TargetCond, 'Target', action, damage, partialMode);
        const result3 = getTriggerConditionsParamsResult(obj, null, params.PartyCond, 'Party', action, damage, partialMode);
        const result4 = getTriggerConditionsParamsResult(obj, null, params.TroopCond, 'Troop', action, damage, partialMode);
        if (partialMode === 0) {
            return result1 || result2 || result3 || result4;
        } else {
            return result1 && result2 && result3 && result4;
        }
    } else {
      return true;
    }
  };

function getTriggerConditionsResult(obj, target, tag, mode, action, damage, partialMode) {
  let list = [];
  let result = partialMode === 1;
  if (tag && obj.meta[tag]) {
    if (!$gameParty.inBattle() && mode === 'Troop') {
      return false;
    }
    list = obj.meta[tag].split(',').map(Number);
    if (partialMode === 0) {
      result = isTriggerConditionsSome(list, target, mode, action, damage);
    } else {
      result = isTriggerConditionsEvery(list, target, mode, action, damage);
    }
  }
  return result;
};

function getTriggerConditionsParamsResult(obj, target, param, mode, action, damage, partialMode) {
    let list = [];
    let result = partialMode === 1;
    if (!!param) {
      if (!$gameParty.inBattle() && mode === 'Troop') {
        return false;
      }
      list = String(param).split(',').map(Number);
      if (partialMode === 0) {
        result = isTriggerConditionsSome(list, target, mode, action, damage);
      } else {
        result = isTriggerConditionsEvery(list, target, mode, action, damage);
      }
    }
    return result;
  };

function isTriggerConditionsSome(list, target, mode, action, damage) {
  return list.some(id => triggerConditions(TriggerConditions[id - 1], target, mode, action, damage));
}

function isTriggerConditionsEvery(list, target, mode, action, damage) {
  return list.every(id => triggerConditions(TriggerConditions[id - 1], target, mode, action, damage));
}

function triggerConditions(data, target, mode, action, damage) {
  if (!data) {
    return false;//データがなければ適用しない
  } else if (data.ConditionsMode === 'Member') {
    return memberTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Battler') {
    return battlerTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Class') {
    return classTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Exp') {
    return expTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Param') {
    return paramTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Xparam') {
    return xparamTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Sparam') {
    return sparamTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Lavel') {
    return lavelTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'State') {
    return stateTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Buff') {
    return buffTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Equip') {
    return equipTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Turn') {
    return turnTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Element') {
    return elementTriggerConditions(data, target, mode, action);
  } else if (data.ConditionsMode === 'Validity') {
    return validityTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'UseItemSkill') {
    return useItemSkillTriggerConditions(data, target, mode, action);
  } else if (data.ConditionsMode === 'ItemSkill') {
    return itemSkillTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Attack') {
    return attackTriggerConditions(data, target, mode, action);
  } else if (data.ConditionsMode === 'Damage') {
    return damageTriggerConditions(data, target, mode, damage);
  } else if (data.ConditionsMode === 'CounterReflection') {
    return cntRefTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Vehicle') {
    return vehicleiggerConditions(data);
  } else if (data.ConditionsMode === 'Variable') {
    return variableTriggerConditions(data);
  } else if (data.ConditionsMode === 'Switch') {
    return switchTriggerConditions(data);
  } else if (data.ConditionsMode === 'Gold') {
    return goldTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Notes') {
    return noteTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Weather') {
    return weatherTriggerConditions(data);
  } else if (data.ConditionsMode === 'Eval') {
    return evalTriggerConditions(data);
  }
};

//メンバー
function memberTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.MemberConditionsType === 'BattleMember') {
    return conditionsNum(data, unit.members().length);
  } else if (data.MemberConditionsType === 'AliveMember') {
    return conditionsNum(data, unit.aliveMembers().length);
  } else if (data.MemberConditionsType === 'DeadMember') {
    return conditionsNum(data, unit.deadMembers().length);
  } else if (Imported.NUUN_SupportActor && data.MemberConditionsType === 'SupportMember') {
    return conditionsNum(data, unit.supportBattleMembers().length);
  }
};

//バトラー
function battlerTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.BattlerConditionsType === 'ID') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => memberId(getIdList(data), member));
    } else {
      return memberId(getIdList(data), target);
    }
  } else if (data.BattlerConditionsType === 'IDNum') {
    sum = membersSum(getIdList(data), unit);
    return conditionsNum(data, sum);
  } else if (data.BattlerConditionsType === 'IsActor') {
    if (mode === 'Party') {
      return true;
    } else {
      return target.isActor();
    }
  } else if (data.BattlerConditionsType === 'IsEnemy') {
    if (mode === 'Troop') {
      return true;
    } else {
      return target.isEnemy();
    }
  }
};

//クラス
function classTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.ClassConditionsType === 'ID') {
    if (mode === 'Party') {
      return unit.members().some(member => classId(getIdList(data), member));
    } else if (target && target.isActor()) {
      return classId(getIdList(data), target);
    }
  } else if (data.ClassConditionsType === 'IDNum') {
    if (mode === 'Party' || target && target.isActor()) {
      let sum = 0;
      sum = classSum(getIdList(data), $gameParty);
      return conditionsNum(data, sum);
    }
  }
  return false;
};

//経験値
function expTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.ExpConditionsType === 'EXP') {
    if (mode === 'Party') {
      return unit.members().some(member => conditionsRate(data, member.currentExp() - member.currentLevelExp(), member.nextLevelExp() - member.currentLevelExp()));
    } else if (target && target.isActor()) {
      return conditionsRate(data, target.currentExp() - target.currentLevelExp(),  target.nextLevelExp() - target.currentLevelExp());
    }
    return false;
  }
};

//能力値
function paramTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (mode === 'Party' || mode === 'Troop') {
    return unit.members().some(member => member.triggerParamConditions(data));
  } else {
    return target.triggerParamConditions(data);
  }
};

//追加能力値
function xparamTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (mode === 'Party' || mode === 'Troop') {
    return unit.members().some(member => member.triggerXParamConditions(data));
  } else {
    return target.triggerXParamConditions(data);
  }
};

//特殊能力値
function sparamTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (mode === 'Party' || mode === 'Troop') {
    return unit.members().some(member => member.triggerSParamConditions(data));
  } else {
    return target.triggerSParamConditions(data);
  }
};

//レベル
function lavelTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.LavelConditionsType === 'DFT') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => lavelConditions(data, member));
    } else {
      return lavelConditions(data, target);
    }
  } else if (data.LavelConditionsType === 'AVE') {
    return conditionsAve(data, unit);
  }
  return false;
};

//ステート
function stateTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.StateConditionsType === 'AddState') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => state(data, member));
    } else {
      return state(data, target);
    }
  } else if (data.StateConditionsType === 'AddStateCount') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => stateTurnCount(data, member));
    } else {
      return stateTurnCount(data, target);
    }
  } else if (data.StateConditionsType === 'NotState') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => notStates(data, member));
    } else {
      return notStates(data, target);
    }
  }
};

//バフ
function buffTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.BuffConditionsType === 'AddBuff') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => buffs(data, member));
    } else {
      return buffs(data, target)
    }
  } else if (data.BuffConditionsType === 'NotBuff') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => notBuffs(data, member));
    } else {
      return notBuffs(data, target)
    }
  } else if (data.BuffConditionsType === 'AddDebuff') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => deBuffs(data, member));
    } else {
      return deBuffs(data, target)
    }
  } else if (data.BuffConditionsType === 'NotDebuff') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => notDebuffs(data, member));
    } else {
      return notDebuffs(data, target)
    }
  }
};

//装備
function equipTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.EquipConditionsType === 'Weapon') {
    if (mode === 'Party') {
      return unit.members().some(member => equipWeapon(getIdList(data), member));
    } else {
      return equipWeapon(getIdList(data), target);
    }
  } else if (data.EquipConditionsType === 'Armor') {
    if (mode === 'Party') {
      return unit.members().some(member => equipArmor(getIdList(data), member));
    } else {
      return equipArmor(getIdList(data), target);
    }
  } else if (data.EquipConditionsType === 'WeaponType') {
    if (mode === 'Party') {
      return unit.members().some(member => equipWeaponType(getIdList(data), member));
    } else {
      return equipWeaponType(getIdList(data), target);
    }
  } else if (data.EquipConditionsType === 'ArmorType') {
    if (mode === 'Party') {
      return unit.members().some(member => equipArmorType(getIdList(data), member));
    } else {
      return equipArmorType(getIdList(data), target);
    }
  }
  return false;
};

//ターン
function turnTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.TurnConditionsType === 'Turn') {
    if (BattleManager.isTpb() && (mode === 'Party' || mode === 'Troop')) {
      return unit.members().some(member => turn(data, member));
    } else {
      return turn(data, target);
    }
  }
};

//属性 //Action
function elementTriggerConditions(data, target, mode, action) {
  if (!action || mode === 'Party' || mode === 'Troop') {
    return false;
  }
  if (data.ElementConditionsType === 'Element') {
    return attackElement(getIdList(data), action);
  }
};

//有効度
function validityTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.ValidityConditionsType === 'ElementValidity') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => elementValidity(data, member));
    } else {
      return elementValidity(data, target)
    }
  } else if (data.ValidityConditionsType === 'StateValidity') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => stateValidity(data, member));
    } else {
      return stateValidity(data, target)
    }
  }
};

//使用アイテム、スキル
function useItemSkillTriggerConditions(data, target, mode, action) {
  if (!action) {
    return false;
  }
  if (data.ItemSkillConditionsType === 'Item') {
    return action.isItem() ? useItem(getIdList(data), action.item().id) : false;
  } else if (data.ItemSkillConditionsType === 'Skill') {
    return action.isSkill() ? useItem(getIdList(data), action.item().id) : false;
  } else if (data.ItemSkillConditionsType === 'SkillType') {
    return action.isSkill() ? useSkillType(getIdList(data), action.item()) : false;
  }
};

//アイテム所持、スキル習得
function itemSkillTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.GetItemSkillConditionsType === 'PossessionItem') {
    if (mode === 'Party' || (target && target.isActor())) {
      return possessionItems(data);
    }
    return false;
  } else if (data.GetItemSkillConditionsType === 'PossessionWeapon') {
    if (mode === 'Party' || (target && target.isActor())) {
      return possessionWeapons(data);
    }
    return false;
  } else if (data.GetItemSkillConditionsType === 'PossessionArmor') {
    if (mode === 'Party' || (target && target.isActor())) {
      return possessionArmors(data);
    }
    return false;
  } else if (data.GetItemSkillConditionsType === 'NotPossessionItem') {
    if (mode === 'Party' || (target && target.isActor())) {
      return notPossessionItems(data);
    }
    return false;
  } else if (data.GetItemSkillConditionsType === 'NotPossessionWeapon') {
    if (mode === 'Party' || (target && target.isActor())) {
      return notPossessionWeapons(data);
    }
    return false;
  } else if (data.GetItemSkillConditionsType === 'NotPossessionArmor') {
    if (mode === 'Party' || (target && target.isActor())) {
      return notPossessionArmors(data);
    }
    return false;
  } else if (data.GetItemSkillConditionsType === 'MasterSkill') {
    if (mode === 'Party') {
      return unit.members().some(member => masterSkill(data, member));
    } else if  (mode === 'Troop') {
      return unit.members().some(member => masterEnemySkill(data, member));
    } else if (target && target.isActor()) {
      return masterSkill(data, target);
    } else if (target && target.isEnemy()) {
      return masterEnemySkill(data, target);
    }
  }
};

//攻撃 //Action
function attackTriggerConditions(data, target, mode, action) {
  if (!action) {
    return false;
  }
  const result = $gameTemp.actionData.target.result();
  if (data.AttackConditionsType === 'Physical') {
    return action.isPhysical();
  } else if (data.AttackConditionsType === 'Magical') {
    return action.isMagical();
  } else if (data.AttackConditionsType === 'CertainHit') {
    return action.isCertainHit();
  } else if (data.AttackConditionsType === 'HpRecover') {
    return action.isHpRecover();
  } else if (data.AttackConditionsType === 'MpRecover') {
    return action.isMpRecover();
  } else if (data.AttackConditionsType === 'HpDrain') {
    return action.checkDamageType([5]);
  } else if (data.AttackConditionsType === 'MpDrain') {
    return action.checkDamageType([6]);
  } else if (data.AttackConditionsType === 'Critical') {
    return result.critical;
  }
};

//ダメージ
function damageTriggerConditions(data, target, mode, damage) {
  if (damage === undefined || damage === null) {
    return false;
  }
  if (data.DamageConditionsType === 'Damage') {
    return conditionsNum(data, damage);
  }
};

//反撃、反射
function cntRefTriggerConditions(data, target, mode) {
  if (mode === 'Party' || mode === 'Troop') {
    return false;
  }
  if (data.cntRefConditionsType === 'Counter') {
    return target.getCntAction();
  } else if (data.cntRefConditionsType === 'Reflection') {
    return target.getReflectionAction();
  }
};

//乗り物
function vehicleiggerConditions(data) {
  if (data.VehicleConditionsType === 'OnBoat') {
    return $gamePlayer.isInBoat();
  } else if (data.VehicleConditionsType === 'OnShip') {
    return $gamePlayer.isInShip();
  } else if (data.VehicleConditionsType === 'OnAirShip') {
    return $gamePlayer.isInAirship();
  } else if (data.VehicleConditionsType === 'OnVehicle') {
    return $gamePlayer.isInVehicle();
  } else if (data.VehicleConditionsType === 'NotBoat') {
    return !$gamePlayer.isInBoat();
  } else if (data.VehicleConditionsType === 'NotShip') {
    return !$gamePlayer.isInShip();
  } else if (data.VehicleConditionsType === 'NotAirShip') {
    return !$gamePlayer.isInAirship();
  } else if (data.VehicleConditionsType === 'NotVehicle') {
    return !$gamePlayer.isInVehicle();
  }
  return false;
};

//変数
function variableTriggerConditions(data) {
  if (data.VariableConditionsType === 'Var') {
    const list = isIdListArray(data) ? data.IDListArray : getValList(data.IDList);
    return list.some(listId => conditionsNum(data, $gameVariables.value(listId)));
  }
  return false;
};

//スイッチ
function switchTriggerConditions(data) {
    const list = isIdListArray(data) ? data.IDListArray : getValList(data.IDList);
    if (data.SwitchConditionsType === 'ONSwitch') {
        return list.some(listId => $gameSwitches.value(listId));
    } else if (data.SwitchConditionsType === 'OFFSwitch') {
        return list.some(listId => !$gameSwitches.value(listId));
    }
    return false;
};

//所持金
function goldTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.GoldConditionsType === 'Gold') {
    if (mode === 'Party' || (target && target.isActor())) {
      return getPartyGold(data);
    } else if (mode === 'Troop') {
      const val = unit.members().reduce((r, member) => r + member.gold());
      return conditionsNum(data, val);
    } else if (target && target.isEnemy()) {
      return getEnemyGold(data, target);
    }
    return false;
  }
};

//メモ欄
function noteTriggerConditions(data, target, mode) {
    const unit = getUnit(target, mode);
    if (data.NotesConditionsType === 'BattlerNotes') {
        if (mode === 'Party' || mode === 'Troop') {
            return unit.members().some(member => {
                if (member.isActor()) {
                    return isNoteTag(member.actor())
                } else if (member.isEnemy()) {
                    return isNoteTag(member.enemy())
                }
            });
        } else {
            if (target.isActor()) {
                return isNoteTag(target.actor())
            } else if (target.isEnemy()) {
                return isNoteTag(target.enemy())
            }
        }
    } else if (data.NotesConditionsType === 'Notes') {
        if (mode === 'Party' || mode === 'Troop') {
            return unit.members().some(member => {
                return isTraitNoteTag(member);
            });
        } else {
            return isTraitNoteTag(target);
        }
    }
};

//天候
function weatherTriggerConditions(data) {
    switch (data.WeatherConditionsType) {
        case "None":
            return $gameScreen._weatherType === "none";
        case "Rain":
            return $gameScreen._weatherType === "rain";
        case "Storm":
            return $gameScreen._weatherType === "storm";
        case "Snow":
            return $gameScreen._weatherType === "snow";
    }
};

//条件式
function evalTriggerConditions(data) {
  return eval(data.EvalStr);
};


function getValList(valList) {
  valList = String(valList);
  return valList ? valList.split(',').map(Number) : [];
};

function isIdListArray(data) {
    return !!data.IDListArray && data.IDListArray.length > 0;
};

function isValListArray(data) {
    return !!data.ValListArray && data.ValListArray.length > 0;
};

function getIdList(data) {
    return isIdListArray(data) ? data.IDListArray : getValList(data.IDList);
};

function getVarList(data) {
    return isValListArray(data) ? data.ValListArray : getValList(data.ValList);
};

function conditionsNum(data, num) {
    const list = isValListArray(data) ? data.ValListArray : getValList(data.ValList);
    if (list.length > 0) {
        return list.some(val => val === num);
    }
    return (num >= data.DwLimit && (data.UpLimit > 0 ? (num <= data.UpLimit) : true));
};

function conditionsRate(data, num, paramMax) {
    const list = isValListArray(data) ? data.ValListArray : getValList(data.ValList);
    if (list.length > 0) {
        return list.some(val => val === num);
    }
    return num >= paramMax * data.DwLimit / 100 && (data.UpLimit > 0 ? (num <= paramMax * data.UpLimit / 100) : true);
};

function getUnit(target, mode) {
  if ((target && target.isActor()) || mode === 'Party') {
    return $gameParty;
  } else if ((target && target.isEnemy()) || mode === 'Troop') {
    return $gameTroop;
  }
  return $gameParty;
};

function memberId(idList, member) {
  const id = member.isActor() ? member.actorId() : member.enemyId();
  return idList.some(listId => listId === id);
};

function membersSum(idList, unit) {
  return unit.members().reduce((r, member) => {
    if (memberId(idList, member)) {
    return r + 1;
    } else {
      return r;
    }
  }, 0);
};

function classId(idList, member) {
  const id = member._classId;
  return idList.some(listId => listId === id);
};

function classSum(IdList, unit) {
  return unit.members().reduce((r, member) => {
    if (classId(IdList, member)) {
      return r + 1;
    } else {
      return r;
    }
  }, 0);
};

function lavelConditions(data, member) {
  return conditionsNum(data, member._level);
};

function conditionsAve(data, unit) {
  const members = unit.members();
  const sum = members.reduce((r, member) => r + (member._level ? member._level : 0), 0);
  const ave = Math.floor(sum / members.length);
  return conditionsNum(data, ave);
}

function state(data, member) {
  const states = member._states;
  const list = getIdList(data);
  return list.some(id => id > 0 && stateTurn(data, getStateId(id, states), member));
}

function stateTurnCount(data, member) {
  const states = member._states;
  const list = getIdList(data);
  return list.some(id => id > 0 && getStateTurnCount(data, getStateId(id, states), member));
}

function getStateId(id, states) {
  return states.find(stateId => stateId > 0 && stateId === id);
};

function stateTurn(data, id, member) {
  const turn = member._stateTurns[id];
  return conditionsNum(data, turn);
};

function getStateTurnCount(data, id, member) {
    const turn = member.getStateNowTurn(id) - 1;
    return conditionsNum(data, turn);
};

function notStates(data, member) {
    const states = member._states;
    const list = getIdList(data);
    if (list.length > 0) {
        return list.some(id => !getStateId(id, states))
    } else {
        return !(states.some(id => id > 0));
    }
};

function buffs(data, member) {
    const buffs = member._buffs;
    const list = getIdList(data);
    return list.some(id => buffsLavel(data, id, buffs))
};

function deBuffs(data, member) {
    const buffs = member._buffs;
    const list = getIdList(data);
    return list.some(id => deBuffsLavel(data, id, buffs))
};

function notBuffs(data, member) {
    const buffs = member._buffs;
    const list = getIdList(data);
    if (list.length > 0) {
        return list.some(id => !buffsLavel(data, id, buffs))
    } else {
        return !(buffs.some(buff => buff > 0));
    }
};

function notDebuffs(data, member) {
    const buffs = member._buffs;
    const list = getIdList(data);
    if (list.length > 0) {
        return list.some(id => !deBuffsLavel(data, id, buffs))
    } else {
        return !(buffs.some(buff => buff < 0));
    }
};

function buffsLavel(data, id, buffs) {
  const lavel = buffs[id];
  return lavel > 0;
  //const lavel = Math.abs(buffs[id]);
  //return conditionsNum(data, lavel);
};

function deBuffsLavel(data, id, buffs) {
  const lavel = buffs[id];
  return lavel < 0;
  //if (buffs[id] < 0) {
  //  return conditionsNum(data, lavel);
  //} else {
  //  return false;
  //}
};

function buffsTurn(data, id, member) {
  const turn = member._buffTurns[id];
  return conditionsNum(data, turn);
};

function useItem(list, item) {
  return list.some(listId => listId === item);
};

function useSkillType(list, item) {
  return list.some(listId => listId === item.stypeId);
};

function possessionItems(data) {
  return getIdList(data).some(listId => conditionsNum(data, $gameParty.numItems($dataItems[listId])));
};

function possessionWeapons(data) {
  return getIdList(data).some(listId => conditionsNum(data, $gameParty.numItems($dataWeapons[listId])));
};

function possessionArmors(data) {
  return getIdList(data).some(listId => conditionsNum(data, $gameParty.numItems($dataArmors[listId])));
};

function notPossessionItems(data) {
    return !getIdList(data).some(listId => $gameParty.hasItem($dataItems[listId]));
};
  
function notPossessionWeapons(data) {
    return !getIdList(data).some(listId => $gameParty.hasItem($dataWeapons[listId]));
};
  
function notPossessionArmors(data) {
    return !getIdList(data).some(listId => $gameParty.hasItem($dataArmors[listId]));
};

function masterSkill(data, member) {
  return getIdList(data).some(listId => member.skills().some(skill => skill.id === listId));
};

function masterEnemySkill(data, member) {
  return getIdList(data).some(listId => member.enemy().actions.some(action => action.skillId === listId));
};

function equipWeapon(idList, member) {
  if (idList.length === 0) {
    return member.weapons().length === 0;
  } else {
    return idList.some(listId => member.hasWeapon($dataWeapons[listId]));
  }
};

function equipArmor(idList, member) {
  if (idList.length === 0) {
    return member.armors().length === 0;
  } else {
    return idList.some(listId => member.hasArmor($dataArmors[listId]));
  }
};

function equipWeaponType(idList, member) {
  const list = idList;
  return member.weapons().some(weapon => isEquipType(weapon.wtypeId, list));
};

function equipArmorType(idList, member) {
  const list = idList;
  return member.armors().some(armor => isEquipType(armor.atypeId, list));
};

function isEquipType(typeid, list) {
  return list.some(id => typeid === id);
};

function turn(data, member) {
  return conditionsNum(data, condTurnCount(member));
};

function condTurnCount(member) {
  if (BattleManager.isTpb()) {
    return member.turnCount();
  } else {
    return BattleManager.nuun_battleTurn;
  }
};

function attackElement(idList, action) {
    let elementsList = action._multiElements;
    if (!elementsList) {
        if (action.item().damage.elementId < 0) {
            elementsList = action.getAttackElementsList();
        } else {
            elementsList = action.getItemElementsList();
        }
    }
    const list = idList;
    return elementsList.some(id => elements(list, id));
};

function elements(list, id) {
  return list.some(listid => listid === id);
};

function elementValidity(data, battler) {
  return getIdList(data).some(id => conditionsNum(data, battler.elementRate(id) * 100));
};

function stateValidity(data, battler) {
  return getIdList(data).some(id => conditionsNum(data, battler.stateRate(id) * 100));
};

function getPartyGold(data) {
  return conditionsNum(data, $gameParty.gold());
};

function getEnemyGold(data, enemy) {
  return conditionsNum(data, enemy.gold());
};

function getTriggerConditionsMeta(obj, tag1, tag2, tag3, tag4) {
  return obj.meta[tag1] || obj.meta[tag2] || obj.meta[tag3] || obj.meta[tag4];
};

function getTriggerConditionsParam(params) {
    return !!params.SubjectCond || !!params.TargetCond || !!params.PartyCond || !!params.TroopCond;
};

function isTraitNoteTag(member) {
    const data = isIdListArray(data) ? data.IDListArray : data.IDList.split(',');
    return member.traitObjects().some(trait => {
        return data.some(tag => !!trait.meta[tag]);
    });
};

function isNoteTag(dMember) {
    const data = isIdListArray(data) ? data.IDListArray : data.IDList.split(',');
    return data.some(tag => !!dMember.meta[tag]);
};

Game_BattlerBase.prototype.triggerParamConditions = function(data) {
    if (!this._cParam) {
        this._cParam = [];
    }
    switch (data.ParamConditionsType) {
        case 'HP':
            return this.conditionsParam(data, 0);
        case 'MP':
            return this.conditionsParam(data, 1);
        case 'TP':
            return this.conditionsParam(data, 10);
        case 'ATK':
            return this.conditionsStatus(data, 2);
        case 'DEF':
            return this.conditionsStatus(data, 3);
        case 'MAT':
            return this.conditionsStatus(data, 4);
        case 'MDF':
            return this.conditionsStatus(data, 5);
        case 'AGI':
            return this.conditionsStatus(data, 6);
        case 'LUK':
            return this.conditionsStatus(data, 7);
    }
};

Game_BattlerBase.prototype.triggerXParamConditions = function(data) {
    if (!this._cParam) {
      this._cParam = [];
    }
    switch (data.XParamConditionsType) {
        case 'HIT':
            return this.conditionsXparam(data, 0);
        case 'EVA':
            return this.conditionsXparam(data, 1);
        case 'CRI':
            return this.conditionsXparam(data, 2)
        case 'CEV':
            return this.conditionsXparam(data, 3);
        case 'MEV':
            return this.conditionsXparam(data, 4);
        case 'MRF':
            return this.conditionsXparam(data, 5);
        case 'CNT':
            return this.conditionsXparam(data, 6);
        case 'HRG':
            return this.conditionsXparam(data, 7);
        case 'MRG':
            return this.conditionsXparam(data, 8);
        case 'TRG':
            return this.conditionsXparam(data, 9);
    }
};

 Game_BattlerBase.prototype.triggerSParamConditions = function(data) {
    if (!this._cParam) {
        this._cParam = [];
    }
    switch (data.ParamConditionsType) {
      case 'TGR':
        return this.conditionsSparam(data, 0);
      case 'GRD':
        return this.conditionsSparam(data, 1);
      case 'REC':
        return this.conditionsSparam(data, 2);
      case 'PHA':
        return this.conditionsSparam(data, 3);
      case 'MCR':
        return this.conditionsSparam(data, 4);
      case 'TCR':
        return this.conditionsSparam(data, 5);
      case 'PDR':
        return this.conditionsSparam(data, 6);
      case 'MDR':
        return this.conditionsSparam(data, 7);
      case 'FDR':
        return this.conditionsSparam(data, 8);
      case 'EXR':
        return this.conditionsSparam(data, 9);
    }
};

Game_BattlerBase.prototype.conditionsParam = function(data, paramId) {
    let paramVal = 0;
    let paramMaxVal = 0;
    if (paramId === 0) {
        paramVal = this._hp;
        if (!this._cParam[paramId]) {
        paramMaxVal = this.mhp;
        this._cParam[paramId] = paramMaxVal;
        }
    } else if (paramId === 1) {
        paramVal = this._mp;
        if (!this._cParam[paramId]) {
        paramMaxVal = this.mmp;
        this._cParam[paramId] = paramMaxVal;
        }
    } else if (paramId === 10) {
        paramVal = this._tp;
        if (!this._cParam[paramId]) {
        paramMaxVal = this.maxTp();
        this._cParam[paramId] = paramMaxVal;
        }
    }
    paramMaxVal = this._cParam[paramId];
    const list = getVarList(data);
    if (list.length > 0) {
        return list.some(val => val === paramVal);
    }
    return paramVal >= paramMaxVal * data.DwLimit / 100 && (data.UpLimit > 0 ? (paramVal <= paramMaxVal * data.UpLimit / 100) : true);
};

Game_BattlerBase.prototype.conditionsStatus = function(data, paramId) {
  let paramVal = 0;
  if (!this._cParam[paramId]) {
    paramVal = this.param(paramId);
    this._cParam[paramId] = paramVal;
  }
  paramVal = this._cParam[paramId];
  return conditionsNum(data, paramVal);
};

Game_BattlerBase.prototype.conditionsXparam = function(data, paramId) {
    let paramVal = 0;
    const id = paramId + 10;
    if (!this._cParam[id]) {
        paramVal = this.xparam(paramId);
        this._cParam[id] = paramVal;
    }
    paramVal = this._cParam[id] * 100;
    return conditionsNum(data, paramVal);
};

Game_BattlerBase.prototype.conditionsSparam = function(data, paramId) {
    let paramVal = 0;
    const id = paramId + 20;
    if (!this._cParam[id]) {
        paramVal = this.sparam(paramId);
        this._cParam[id] = paramVal;
    }
    paramVal = this._cParam[id] * 100;
    return conditionsNum(data, paramVal);
};

Game_BattlerBase.prototype.getTraitsTriggerConditions = function(tag) {
  const cond = this.traitObjects().reduce((r, traits) => {
    const data = traits.mata[tag].split(',').map(Number);
    return data ? r.concat(data) : r;
  }, []);
  return cond.length > 0 ? cond : null;
};

Game_BattlerBase.prototype.resetConditionsParam = function() {
  this._cParam = [];
};

const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
  _Game_Battler_initMembers.call(this);
  this._cntAction = false;
  this._reflectionAction = false;
  this._cParam = [];
};

Game_Battler.prototype.getCntAction = function() {
  return this._cntAction;
};

Game_Battler.prototype.getReflectionAction = function() {
  return this._reflectionAction;
};

const _Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
  _Game_Battler_refresh.call(this);
  this.resetConditionsParam();
};


const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.nuun_battleTurn = 1;
};

const _BattleManager_endAllBattlersTurn = BattleManager.endAllBattlersTurn;
BattleManager.endAllBattlersTurn = function() {
  _BattleManager_endAllBattlersTurn.call(this);
  this.nuun_battleTurn++;
};

const _BattleManager_invokeCounterAttack = BattleManager.invokeCounterAttack;
BattleManager.invokeCounterAttack = function(subject, target) {
  this.setCounterActionFlag(target, true);
  _BattleManager_invokeCounterAttack.call(this, subject, target);
  this.setCounterActionFlag(target, false);
};

const _BattleManager_invokeMagicReflection = BattleManager.invokeMagicReflection;
BattleManager.invokeMagicReflection = function(subject, target) {
  this.setReflectionActionFlag(target, true);
  _BattleManager_invokeMagicReflection.call(this, subject, target);
  this.setReflectionActionFlag(target, false);
};

BattleManager.setCounterActionFlag = function(target, flag) {
    target._cntAction = flag;
};

BattleManager.setReflectionActionFlag = function(target, flag) {
    target._reflectionAction = flag;
};

})();