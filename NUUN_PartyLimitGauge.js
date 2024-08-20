/*:-----------------------------------------------------------------------------------
 * NUUN_PartyLimitGauge.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc  Party limit gauge
 * @author NUUN
 * @version 1.6.3
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_GaugeValueEX
 * 
 * @help
 * Implement gauges shared by party members and enemy groups.
 * Limit points are charged when taking damage, defeating, winning, losing, and escaping.
 * All evaluation expressions are available.
 * 
 * For color settings, you can enter a color code in the text tab.
 * 
 * Get parameters
 * $gameParty._limitGauge　Ally's limit gauge
 * $gameTroop._limitGauge　Enemy limit gauge
 * 
 * skill notes
 * <limitCost:[cost]> Set the skill cost.
 * [cost]:cost
 * <limitCost:50> Consume 50 limit gauge as skill cost.
 * 
 * <LimitCostWidth:[string]> Specify the display width of the cost as a string. The width of the specified string affects the width of the skill name.
 * [string]:string
 * <LimitCostWidth:00000> Let the length of 00000 be set as the display width of the cost.
 * 
 * Skill or item notes
 * <LimitEffect:10> Increases limit gauge by 10.
 * <LimitEffect:-10> Reduces limit gauge by 10.
 * If the target is an actor, the limit gauge of the ally will increase or decrease, and if it is an enemy, the limit gauge of the enemy group will increase or decrease.
 * 
 * Skill or item notes
 * <LimitAttacklStr:[eval]> Increases limit gauge when attacking.
 * <LimitCriticalStr:[eval]> Increases the limit gauge when critical.
 * [eval]:Evaluation formula
 * 
 * Evaluation formula
 * Damage received
 * a: Damaged battler data da: Damaged battler database damage: Damage value
 * Successful attack, critical
 * a: Attacker's battler data da: Attacker's battler database cri: Critical success
 * Defeat
 * a: Defeated Battler data da: Defeated Battler database
 * 
 * When used together with ”NUUN_GaugeValueEX”
 * Please set the following plug-in parameters with "NUUN_GaugeValueEX".
 * Gauge color 1
 * Gauge color 2
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 8/20/2024 Ver.1.6.3
 * Added the ability to hide the gauge in certain situations.
 * 8/9/2024 Ver.1.6.2
 * Added the ability to specify the display priority of gauge sprites.
 * 3/16/2024 Ver.1.6.1
 * Fixed an issue where the limit gauge would disappear on the first turn.
 * 2/17/2024 Ver.1.6.0
 * Added turn time to limit gauge recovery.
 * 7/28/2023 Ver.1.5.2
 * Fixed the problem that display switch of display switch ID was not working.
 * Fixed an issue where enemy limit points were not displayed.
 * 5/20/2023 Ver.1.5.1
 * Fixed typos.
 * Correction of description.
 * 5/13/2023 Ver.1.5.0
 * Added time for successful attack and time for critical hit to the limit gauge recovery settings.
 * 4/1/2023 Ver.1.4.1
 * Fixed limit gauge processing.
 * 4/1/2023 Ver.1.4.0
 * Added function to increase/decrease limit gauge by plug-in command.
 * Unify the display of the gauge when setting the label name with the display of the normal gauge.
 * 1/21/2023 Ver.1.3.0
 * Fixed the problem that the party limit cost overlaps when the cost of MP and TP is set.
 * Added a function that allows you to specify the display width when the skill cost of MP and TP is set.
 * Added a function that allows you to specify the cost display width for each skill that activates the party limit.
 * 12/28/2022 Ver.1.2.1
 * Processing fixes.
 * 12/24/2022 Ver.1.2.0
 * Added a function that allows you to set items and skills that increase or decrease the limit gauge.
 * 12/15/2022 Ver.1.1.2
 * Change the Type of the color specification plug-in parameter to color. (Ver.1.6.0 or later)
 * Fixed an issue that caused an error when imaging a gauge in Gauge Imaging.
 * 6/11/2022 Ver.1.1.1
 * Fixed issue where Party Limit was not reset at the start of battle.
 * 12/20/2021 Ver.1.1.0
 * Supports gauge imaging.
 * 12/19/2021 Ver.1.0.4
 * Fixed the problem that an error occurs when using "NUUN_GaugeValueEX" together.
 * 12/5/2021 Ver.1.0.3
 * Conflict measures with "NUUN_GaugeValueEX".
 * 11/24/2021 Ver.1.0.2
 * Fixed an issue where skills could not be used when limit point cost and remaining cost were the same.
 * 11/24/2021 Ver.1.0.1
 * Fixed an issue where an error occurred when winning a battle or escaping.
 * 11/15/2021 Ver.1.0.0
 * First edition.
 * 
 * @command LimitValue
 * @desc Increases or decreases the limit gauge.
 * @text Increase/decrease limit gauge
 * 
 * @arg Target
 * @text Target
 * @desc Specify the target to increase or decrease the limit gauge.
 * @type select
 * @default 0
 * @option Party member
 * @value 0
 * @option Troop (only in battle)
 * @value 1
 * 
 * @arg Value
 * @type number
 * @default 0
 * @text Increment/decrease value
 * @desc Enter the value to increase or decrease the limit gauge.
 * @min -99999999
 * 
 * 
 * @param MaxLimitValue
 * @desc Max limit gauge.
 * @text Max limit gauge
 * @type number
 * @default 1000
 * 
 * @param BattleStartReset
 * @desc Resets the party limit gauge value at the start of battle.
 * @text Initialize at each battle start
 * @type boolean
 * @default false
 * 
 * @param GaugeSetting
 * @text Gauge setting
 * @default ------------------------------
 * 
 * @param PartyGaugeVisible
 * @desc Displays the party limit gauge.
 * @text Gauge display
 * @type boolean
 * @default true
 * @parent GaugeSetting
 * 
 * @param PartyGaugeShowSwitch
 * @desc Specify a switch to display the party limit gauge. When hidden, the gauge will not accumulate.
 * @text Display switch ID
 * @type switch
 * @default 0
 * @parent GaugeSetting
 * 
 * @param PartyLimitValueVisible
 * @desc Displays party limit points.
 * @text Limit point display
 * @type boolean
 * @default true
 * @parent GaugeSetting
 * 
 * @param PartyGaugeLabel
 * @desc Party gauge label.
 * @text Party gauge label
 * @type string
 * @default 
 * @parent GaugeSetting
 * 
 * @param PartyGauge_LabelFontSize
 * @desc Label font size. (difference from main font)
 * @text Label font size
 * @type number
 * @default 0
 * @min -99
 * @parent GaugeSetting
 * 
 * @param PartyGauge_LabelColor
 * @desc Label text color. (You can fill in the color code in the text tab)
 * @text Label text color
 * @type color
 * @default 16
 * @min 0
 * @parent GaugeSetting
 * 
 * @param PartyGauge_X
 * @desc Set the X coordinate.
 * @text X-coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent GaugeSetting
 * 
 * @param PartyGauge_Y
 * @desc Set the Y coordinate.
 * @text Y-coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent GaugeSetting
 * 
 * @param PartyGauge_Width
 * @desc Set the width.
 * @text Gauge width
 * @type number
 * @default 500
 * @min 0
 * @parent GaugeSetting
 * 
 * @param PartyGaugeColor1
 * @desc Specifies color 1 of the gauge. (You can fill in the color code in the text tab)
 * @text Gauge color 1
 * @type color
 * @default 6
 * @parent GaugeSetting
 * 
 * @param PartyGaugeColor2
 * @desc Specifies color 2 of the gauge. (You can fill in the color code in the text tab)
 * @text Gauge color 2
 * @type color
 * @default 14
 * @parent GaugeSetting
 * 
 * @param GaugePriority
 * @text Limit gauge display sprite
 * @desc Specifies the display sprite for the limit gauge.
 * @type select
 * @option Spriteset_Battle
 * @value 'Spriteset_Battle'
 * @option Scene_Battle
 * @value 'Scene_Battle'
 * @option BattleField
 * @value 'BattleField'
 * @default 'Spriteset_Battle'
 * @parent GaugeSetting
 * 
 * @param EnemyGaugeSetting
 * @text Enemy Gauge Settings
 * @default ------------------------------
 * 
 * @param EnemyGaugeVisible
 * @desc Displays enemy party limit gauge.
 * @text Enemy gauge display
 * @type boolean
 * @default true
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGaugeShowSwitch
 * @desc Specify a switch to display the party limit gauge. When hidden, the gauge will not accumulate.
 * @text Display switch ID
 * @type switch
 * @default 0
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyLimitValueVisible
 * @desc Displays enemy limit points.
 * @text Limit point display
 * @type boolean
 * @default false
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGaugeLabel
 * @desc Enemy group gauge label.
 * @text Enemy group gauge label
 * @type string
 * @default 
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_LabelFontSize
 * @desc Label font size. (difference from main font)
 * @text Label font size
 * @type number
 * @default 0
 * @min -99
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_LabelColor
 * @desc Label text color. (You can fill in the color code in the text tab)
 * @text Label text color
 * @type color
 * @default 16
 * @min 0
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_X
 * @desc Set the X coordinate.
 * @text X-coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_Y
 * @desc Set the Y coordinate.
 * @text Y-coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_Width
 * @desc Set the width.
 * @text Gauge width
 * @type number
 * @default 500
 * @min 0
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGaugeColor1
 * @desc Specifies color 1 of the gauge. (You can fill in the color code in the text tab)
 * @text Gauge color 1
 * @type color
 * @default 6
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGaugeColor2
 * @desc Specifies color 2 of the gauge. (You can fill in the color code in the text tab)
 * @text Gauge color 2
 * @type color
 * @default 14
 * @parent EnemyGaugeSetting
 * 
 * @param ChargeSetting
 * @text Charge setting
 * @default ------------------------------
 * 
 * @param DamageAmount
 * @desc Amount of recovery when damaged.
 * @text Recovery amount when damaged
 * @type string
 * @default Math.floor(25 * damage / a.mhp)
 * @parent ChargeSetting
 * 
 * @param AttackAmount
 * @desc Amount recovered from a successful attack.
 * @text Amount recovered after a successful attack
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param CriticalAmount
 * @desc Critical recovery amount.
 * @text Critical recovery amount
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param VictoryAmount
 * @desc Amount recovered after winning.
 * @text Victory Recovery Amount
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param LoseAmount
 * @desc Recovery amount after defeat.
 * @text Loss recovery amount
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param EscapeAmount
 * @desc Recovery amount when running away.
 * @text Escape Recovery Amount
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param DieAmount
 * @desc Amount of recovery when defeated. a: defeated battler data da: defeated battler database
 * @text Amount recovered when defeated
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param TurnAmount
 * @desc Amount of recovery over the course of a turn.
 * @text Recovery amount after turn
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param CostSetting
 * @text Cost setting
 * @default ------------------------------
 * 
 * @param LimitCostColor
 * @desc Consumption limit gauge cost color number.
 * @text Consumption limit gauge cost color
 * @type color
 * @default 16
 * @parent CostSetting
 * 
 * @param CostWidth
 * @desc Cost range for multiple costs. blank and disabled
 * @text Cost range for multiple costs
 * @type string
 * @default 00000
 * @parent CostSetting
 * 
 * @param OtherSetting
 * @text Other settings
 * @default ------------------------------
 * 
 * @param WindowHideActorPartyLimit
 * @desc Hides the ally limit gauge during certain events.
 * @text Hide ally limit gauge specific gauge
 * @type select[]
 * @option Battle starts
 * @value startBattle
 * @option Battle end
 * @value battleEnd
 * @option Battle event
 * @value battleEvent
 * @option Animation
 * @value animation
 * @default []
 * @parent OtherSetting
 * 
 * @param WindowHideEnemyPartyLimit
 * @desc Hides the enemy limit gauge during certain events.
 * @text Hide specific enemy limit gauge
 * @type select[]
 * @option Battle starts
 * @value startBattle
 * @option Battle end
 * @value battleEnd
 * @option Battle event
 * @value battleEvent
 * @option Animation
 * @value animation
 * @default []
 * @parent OtherSetting
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc  パーティリミットゲージ
 * @author NUUN
 * @version 1.6.3
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_GaugeValueEX
 * 
 * @help
 * パーティメンバー、敵グループでそれぞれ共用するゲージを実装します。
 * ダメージを受けた時、撃破時、勝利時、敗北時、逃走時にリミットポイントがチャージします。
 * すべて評価式が使用可能です。
 * 
 * 色設定はテキストタブでカラーコードが入力できます。
 * 
 * 取得パラメータ
 * $gameParty._limitGauge　味方のリミットゲージ
 * $gameTroop._limitGauge　敵のリミットゲージ
 * 
 * スキルのメモ欄
 * <limitCost:[cost]> スキルのコストを設定します。
 * [cost]:コスト
 * <limitCost:50> スキルのコストとしてリミットゲージを５０を消費します。
 * 
 * <LimitCostWidth:[string]> コストの表示幅を文字列で指定します。指定した文字列の横幅がスキル名の横幅に影響します。
 * [string]:文字列
 * <LimitCostWidth:00000> コストの表示幅として00000の長さが設定させます。
 * 
 * スキル、アイテムのメモ欄
 * <LimitEffect:10> リミットゲージが10増加します。
 * <LimitEffect:-10> リミットゲージが10減少します。
 * 単体選択のスキル、アイテムの場合は対象がアクターなら味方のリミットゲージ、敵なら敵グループのリミットゲージが増減します。
 * 
 * スキル、アイテムのメモ欄
 * <LimitAttackStr:[eval]> 攻撃時にリミットゲージが増加します。
 * <LimitCriticalStr:[eval]> クリティカル時にリミットゲージが増加します。
 * [eval]:評価式
 * 
 * 評価式(JavaScript)
 * 被ダメージ時
 * a:被ダメージバトラーデータ　da：被ダメージバトラーデータベース　damage:ダメージ値 cri:クリティカル
 * 攻撃成功時、クリティカル時
 * a:攻撃者バトラーデータ　da：攻撃者バトラーデータベース cri:クリティカル成功
 * 撃破時
 * a:撃破されたバトラーデータ　da：撃破されたバトラーデータベース
 * 
 * 設定例
 * Math.floor(25 * damage / a.mhp) ダメージ量に応じて最大25回復
 * Math.floor(25 * damage / a.mhp) * (cri ? 3 : 1) クリティカル時のみ３倍
 * (a.actorId() === 6 ? 10 : 0) アクターIDが6番のアクターのした時に10回復
 * 10 10回復
 * 
 * ゲージ表示拡張プラグインと併用する場合
 * 以下のプラグインパラメータはゲージ表示拡張プラグインで設定してください。
 * ゲージの色1
 * ゲージの色2
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/8/20 Ver.1.6.3
 * 特定の状況でゲージを非表示にする機能を追加。
 * 2024/8/9 Ver.1.6.2
 * ゲージSpriteの表示優先度を指定できる機能を追加。
 * 2024/3/16 Ver.1.6.1
 * 最初のターンでリミットゲージが消えてしまう問題を修正。
 * 2024/2/17 Ver.1.6.0
 * リミットゲージの回復にターン時を追加。
 * 2023/7/28 Ver.1.5.2
 * 表示スイッチIDの表示切り替えが機能していなかった問題を修正。
 * 敵のリミットポイントの表示がされなかった問題を修正。
 * 2023/5/20 Ver.1.5.1
 * 誤字修正。
 * 説明文の修正。
 * 2023/5/13 Ver.1.5.0
 * リミットゲージの回復時の設定に、攻撃時とクリティカル時を追加。
 * 2023/4/1 Ver.1.4.1
 * リミットゲージの処理修正。
 * 2023/4/1 Ver.1.4.0
 * プラグインコマンドでリミットゲージを増減させる機能を追加。
 * ラベル名設定時のゲージの表示を通常のゲージの表示と統一。
 * 2023/1/21 Ver.1.3.0
 * MP、TPのコストが設定されていた場合、パーティリミットコストが重なってします問題を修正。
 * MP、TPのスキルコストが設定されている場合、表示幅を指定できる機能を追加。
 * パーティリミットの発動スキル毎にコストの表示幅を指定できる機能を追加。
 * 2022/12/28 Ver.1.2.1
 * 処理の修正。
 * 2022/12/24 Ver.1.2.0
 * リミットゲージを増減するアイテム、スキルを設定できる機能を追加。
 * 日本語以外での表示を英語表示に変更。
 * 2022/12/15 Ver.1.1.2
 * カラー指定のプラグインパラメータのTypeをcolorに変更。(Ver.1.6.0以降)
 * ゲージ画像化でゲージを画像化するとエラーが出る問題を修正。
 * 2022/6/11 Ver.1.1.1
 * パーティリミットが戦闘開始時にリセットされない問題を修正。
 * 2021/12/20 Ver.1.1.0
 * ゲージ画像化に対応。
 * 2021/12/19 Ver.1.0.4
 * ゲージ表示拡張併用時にエラーが出る問題を修正。
 * 2021/12/5 Ver.1.0.3
 * ゲージ表示拡張プラグインとの競合対策。
 * 2021/11/24 Ver.1.0.2
 * リミットポイントのコストと残りコストが同じ時にスキルが使えない問題を修正。
 * 2021/11/24 Ver.1.0.1
 * 戦闘勝利時、逃走時にエラーが出る問題を修正。
 * 2021/11/15 Ver.1.0.0
 * 初版
 * 
 * @command LimitValue
 * @desc リミットゲージを増減させます。
 * @text リミットゲージ増減
 * 
 * @arg Target
 * @text 対象
 * @desc リミットゲージを増減させる対象を指定します。
 * @type select
 * @default 0
 * @option パーティメンバー
 * @value 0
 * @option 敵グループ(戦闘中のみ)
 * @value 1
 * 
 * @arg Value
 * @type number
 * @default 0
 * @text 増減値
 * @desc リミットゲージを増減させる値を入力します。
 * @min -99999999
 * 
 * 
 * @param MaxLimitValue
 * @desc リミットゲージの最大値。
 * @text リミットゲージ最大値
 * @type number
 * @default 1000
 * 
 * @param BattleStartReset
 * @desc 戦闘開始時にパーティリミットゲージ値をリセットします。
 * @text 戦闘開始毎に初期化
 * @type boolean
 * @default false
 * 
 * @param GaugeSetting
 * @text ゲージ設定
 * @default ------------------------------
 * 
 * @param PartyGaugeVisible
 * @desc パーティリミットゲージを表示します。
 * @text ゲージ表示
 * @type boolean
 * @default true
 * @parent GaugeSetting
 * 
 * @param PartyGaugeShowSwitch
 * @desc パーティリミットゲージを表示するスイッチを指定します。非表示の時はゲージがたまりません。
 * @text 表示スイッチID
 * @type switch
 * @default 0
 * @parent GaugeSetting
 * 
 * @param PartyLimitValueVisible
 * @desc パーティリミットポイントを表示します。
 * @text リミットポイント表示
 * @type boolean
 * @default true
 * @parent GaugeSetting
 * 
 * @param PartyGaugeLabel
 * @desc パーティゲージのラベル。
 * @text パーティゲージラベル
 * @type string
 * @default 
 * @parent GaugeSetting
 * 
 * @param PartyGauge_LabelFontSize
 * @desc ラベルのフォントサイズ。（メインフォントからの差）
 * @text ラベルフォントサイズ
 * @type number
 * @default 0
 * @min -99
 * @parent GaugeSetting
 * 
 * @param PartyGauge_LabelColor
 * @desc ラベルの文字色。（テキストタブでカラーコードを記入できます）
 * @text ラベル文字色
 * @type color
 * @default 16
 * @min 0
 * @parent GaugeSetting
 * 
 * @param PartyGauge_X
 * @desc X座標を設定します。
 * @text X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GaugeSetting
 * 
 * @param PartyGauge_Y
 * @desc Y座標を設定します。
 * @text Y座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GaugeSetting
 * 
 * @param PartyGauge_Width
 * @desc 横幅を設定します。
 * @text 横幅
 * @type number
 * @default 500
 * @min 0
 * @parent GaugeSetting
 * 
 * @param PartyGaugeColor1
 * @desc ゲージの色1を指定します。（テキストタブでカラーコードを記入できます）
 * @text ゲージの色1
 * @type color
 * @default 6
 * @parent GaugeSetting
 * 
 * @param PartyGaugeColor2
 * @desc ゲージの色2を指定します。（テキストタブでカラーコードを記入できます）
 * @text ゲージの色2
 * @type color
 * @default 14
 * @parent GaugeSetting
 * 
 * @param GaugePriority
 * @text リミットゲージの表示Sprite
 * @desc リミットゲージの表示Spriteを指定します。
 * @type select
 * @option Spriteset_Battle
 * @value 'Spriteset_Battle'
 * @option Scene_Battle
 * @value 'Scene_Battle'
 * @option BattleField
 * @value 'BattleField'
 * @default 'Spriteset_Battle'
 * @parent GaugeSetting
 * 
 * @param EnemyGaugeSetting
 * @text 敵のゲージ設定
 * @default ------------------------------
 * 
 * @param EnemyGaugeVisible
 * @desc 敵のパーティリミットゲージを表示します。
 * @text 敵ゲージ表示
 * @type boolean
 * @default true
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGaugeShowSwitch
 * @desc パーティリミットゲージを表示するスイッチを指定します。非表示の時はゲージがたまりません。
 * @text 表示スイッチID
 * @type switch
 * @default 0
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyLimitValueVisible
 * @desc 敵のリミットポイントを表示します。
 * @text リミットポイント表示
 * @type boolean
 * @default false
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGaugeLabel
 * @desc 敵グループゲージのラベル。
 * @text 敵グループゲージラベル
 * @type string
 * @default 
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_LabelFontSize
 * @desc ラベルのフォントサイズ。（メインフォントからの差）
 * @text ラベルフォントサイズ
 * @type number
 * @default 0
 * @min -99
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_LabelColor
 * @desc ラベルの文字色。（テキストタブでカラーコードを記入できます）
 * @text ラベル文字色
 * @type color
 * @default 16
 * @min 0
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_X
 * @desc X座標を設定します。
 * @text X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_Y
 * @desc Y座標を設定します。
 * @text Y座標
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_Width
 * @desc 横幅を設定します。
 * @text 横幅
 * @type number
 * @default 500
 * @min 0
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGaugeColor1
 * @desc ゲージの色1を指定します。（テキストタブでカラーコードを記入できます）
 * @text ゲージの色1
 * @type color
 * @default 6
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGaugeColor2
 * @desc ゲージの色2を指定します。（テキストタブでカラーコードを記入できます）
 * @text ゲージの色2
 * @type color
 * @default 14
 * @parent EnemyGaugeSetting
 * 
 * @param ChargeSetting
 * @text チャージ設定
 * @default ------------------------------
 * 
 * @param DamageAmount
 * @desc 被ダメージ時の回復量。（評価式）a:被ダメージバトラーデータ　da：被ダメージバトラーデータベース　damage:ダメージ値
 * @text 被ダメージ時回復量
 * @type string
 * @default Math.floor(25 * damage / a.mhp)
 * @parent ChargeSetting
 * 
 * @param AttackAmount
 * @desc 攻撃成功時の回復量。a:攻撃者バトラーデータ　da：攻撃者バトラーデータベース cri:クリティカル成功
 * @text 攻撃成功時回復量
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param CriticalAmount
 * @desc クリティカル時の回復量。a:攻撃者バトラーデータ　da：攻撃者バトラーデータベース
 * @text クリティカル時回復量
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param VictoryAmount
 * @desc 勝利時の回復量。
 * @text 勝利時回復量
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param LoseAmount
 * @desc 敗北時の回復量。
 * @text 敗北時回復量
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param EscapeAmount
 * @desc 逃走時の回復量。
 * @text 逃走時回復量
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param DieAmount
 * @desc 撃破時の回復量。a:撃破されたバトラーデータ　da：撃破されたバトラーデータベース
 * @text 撃破時回復量
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param TurnAmount
 * @desc ターン経過時の回復量。
 * @text ターン経過時回復量
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param CostSetting
 * @text コスト設定
 * @default ------------------------------
 * 
 * @param LimitCostColor
 * @desc 消費リミットゲージコストの色番号
 * @text 消費リミットゲージコスト色
 * @type color
 * @default 16
 * @parent CostSetting
 * 
 * @param CostWidth
 * @desc 複数コスト時のコスト幅。空白で無効
 * @text 複数コスト時コスト幅
 * @type string
 * @default 00000
 * @parent CostSetting
 * 
 * @param OtherSetting
 * @text その他設定
 * @default ------------------------------
 * 
 * @param WindowHideActorPartyLimit
 * @desc 味方リミットゲージの特定のイベントでゲージを非表示にします。
 * @text 味方リミットゲージ特定ゲージ非表示
 * @type select[]
 * @option バトル開始
 * @value startBattle
 * @option バトル終了
 * @value battleEnd
 * @option バトルイベント
 * @value battleEvent
 * @option アニメーション
 * @value animation
 * @default []
 * @parent OtherSetting
 * 
 * @param WindowHideEnemyPartyLimit
 * @desc 敵リミットゲージの特定のイベントでゲージを非表示にします。
 * @text 敵リミットゲージ特定ゲージ非表示
 * @type select[]
 * @option バトル開始
 * @value startBattle
 * @option バトル終了
 * @value battleEnd
 * @option バトルイベント
 * @value battleEvent
 * @option アニメーション
 * @value animation
 * @default []
 * @parent OtherSetting
 * 
 */
var Imported = Imported || {};
Imported.NUUN_PartyLimitGauge = true;

(() => {
const parameters = PluginManager.parameters('NUUN_PartyLimitGauge');
try {
    NuunManager.getEvalCode();
} catch (e) {
    throw ["LoadError", "'NUUN_Base' is not Ver.1.6.4 or later."];
}
const MaxLimitValue = Number(parameters['MaxLimitValue'] || 1000);
const PartyGaugeVisible = eval(parameters['PartyGaugeVisible'] || 'true');
const PartyGaugeShowSwitch = Number(parameters['PartyGaugeShowSwitch'] || 0);
const BattleStartReset = eval(parameters['BattleStartReset'] || "false");
const PartyLimitValueVisible = eval(parameters['PartyLimitValueVisible'] || "true");
const PartyGaugeIcon = Number(parameters['PartyGaugeIcon'] || 0);
const PartyGaugeLabel = String(parameters['PartyGaugeLabel'] || '');
const PartyGauge_LabelFontSize = Number(parameters['PartyGauge_LabelFontSize'] || 0);
const PartyGauge_X = Number(parameters['PartyGauge_X'] || 0);
const PartyGauge_Y = Number(parameters['PartyGauge_Y'] || 0);
const PartyGauge_Width = Number(parameters['PartyGauge_Width'] || 500);
const PartyGaugeColor1 = (DataManager.nuun_structureData(parameters['PartyGaugeColor1'])) || 6;
const PartyGaugeColor2 = (DataManager.nuun_structureData(parameters['PartyGaugeColor2'])) || 14;
const PartyGauge_LabelColor = (DataManager.nuun_structureData(parameters['PartyGauge_LabelColor'])) || 16;
const EnemyGaugeShowSwitch = Number(parameters['EnemyGaugeShowSwitch'] || 0);
const EnemyGaugeVisible = eval(parameters['EnemyGaugeVisible'] || 'true');
const EnemyLimitValueVisible = eval(parameters['EnemyLimitValueVisible'] || "false");
const EnemyGaugeIcon = Number(parameters['EnemyGaugeIcon'] || 0);
const EnemyGaugeLabel = String(parameters['EnemyGaugeLabel'] || '');
const EnemyGauge_LabelFontSize = Number(parameters['EnemyGauge_LabelFontSize'] || 0);
const EnemyGauge_X = Number(parameters['EnemyGauge_X'] || 0);
const EnemyGauge_Y = Number(parameters['EnemyGauge_Y'] || 0);
const EnemyGauge_Width = Number(parameters['EnemyGauge_Width'] || 500);
const EnemyGaugeColor1 = (DataManager.nuun_structureData(parameters['EnemyGaugeColor1'])) || 6;
const EnemyGaugeColor2 = (DataManager.nuun_structureData(parameters['EnemyGaugeColor2'])) || 14;
const EnemyGauge_LabelColor = (DataManager.nuun_structureData(parameters['EnemyGauge_LabelColor'])) || 16;
const DamageAmount = NuunManager.getEvalCode(parameters['DamageAmount']) || 'Math.floor(25 * damage / a.mhp)';
const VictoryAmount = NuunManager.getEvalCode(parameters['VictoryAmount']) || '';
const LoseAmount = NuunManager.getEvalCode(parameters['LoseAmount']) || '';
const EscapeAmount = NuunManager.getEvalCode(parameters['EscapeAmount']) || '';
const DieAmount = NuunManager.getEvalCode(parameters['DieAmount']) || '';
const AttackAmount = NuunManager.getEvalCode(parameters['AttackAmount']) || '';
const TurnAmount = NuunManager.getEvalCode(parameters['TurnAmount']) || '';
const CriticalAmount = NuunManager.getEvalCode(parameters['CriticalAmount']) || '';
const LimitCostColor = Number(parameters['LimitCostColor'] || 0);
const MultiCostWidth = String(parameters['CostWidth'] || '00000');
const GaugePriority = eval(parameters['GaugePriority'] || 'Scene_Battle');
const WindowHideActorPartyLimit = (DataManager.nuun_structureData(parameters['WindowHideActorPartyLimit'])) || [];
const WindowHideEnemyPartyLimit = (DataManager.nuun_structureData(parameters['WindowHideEnemyPartyLimit'])) || [];

const pluginName = "NUUN_PartyLimitGauge";
PluginManager.registerCommand(pluginName, 'LimitValue', args => {
    if (args.Target == 0) {
        $gameParty.setPartyLimit(Number(args.Value));
    } else if ($gameParty.inBattle() && args.Target == 1) {
        $gameTroop.setPartyLimit(Number(args.Value));
    }
});

const _BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
  _BattleManager_setup.call(this, troopId, canEscape, canLose);
  $gameParty.initPartyLimit();
  $gameTroop.initPartyLimit();
};

const _BattleManager_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function() {
  _BattleManager_processDefeat.call(this);
  setChargeLimit(LoseAmount);
};

const _BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
  _BattleManager_gainRewards.call(this);
  setChargeLimit(VictoryAmount);
};

const _BattleManager_onEscapeSuccess = BattleManager.onEscapeSuccess;
BattleManager.onEscapeSuccess = function() {
  setChargeLimit(EscapeAmount);
  _BattleManager_onEscapeSuccess.call(this);
};

const _BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function() {
    _BattleManager_startInput.call(this);
    this.chargeLimitByTurnInput();
};

BattleManager.chargeLimitByTurnInput = function() {
    if (!this._surprise) {
        $gameParty.chargeLimitByTurn(TurnAmount);
    }
    if (!this._preemptive) {
        $gameTroop.chargeLimitByTurn(TurnAmount);
    }
};


const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
  _Game_Action_applyItemUserEffect.call(this, target);
  const item = this.item();
  if (item.damage.type > 0) {
    this.subject().chargeLimitByAttack(item, target.result().critical);
  }
  if (this.isLimitIncreaseItem()) {
    target.limitIncreaseItem(this.subject(), item);
    this.makeSuccess(target);
  }
};

Game_Action.prototype.isLimitIncreaseItem = function() {
  return this.item().meta.LimitEffect;
};

const _Game_Action_testApply = Game_Action.prototype.testApply;
Game_Action.prototype.testApply = function(target) {
  return _Game_Action_testApply.call(this, target) || this.testLimitIncreaseItem(target);
};

Game_Action.prototype.testLimitIncreaseItem = function(target) {
  return this.isLimitIncreaseItem();
};

Game_Action.prototype.isGrow = function(target) {
    return _Game_Action_testApply.call(this, target) || this.testLimitIncreaseItem(target);
};

Game_Battler.prototype.limitIncreaseItem = function(subject, item) {
  const damege = Number(item.meta.LimitEffect);
  this.chargeLimit(damege);
};


Game_BattlerBase.prototype.skillLimitCost = function(skill) {
  if (skill.meta.limitCost) {
    return skill.meta.limitCost;
  }
  return null;
};

const _Game_BattleBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
  return this.canPaySkillLimitCost(skill) && _Game_BattleBase_canPaySkillCost.call(this, skill);
};

const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
  const cost = this.skillLimitCost(skill);
  if (cost > 0) {
    if (this.isActor()) {
      $gameParty._limitGauge -= cost;
    } else {
      $gameTroop._limitValue -= cost;
    }
  }
  _Game_BattlerBase_paySkillCost.call(this, skill);
};

const _Game_Battler_onDamage = Game_Battler.prototype.onDamage;
Game_Battler.prototype.onDamage = function(value) {
  _Game_Battler_onDamage.call(this, value);
  this.chargeLimitByDamage(DamageAmount, value, this.result().critical);
};

Game_Battler.prototype.chargeLimitByDamage = function(evalStr, damage, critical) {
  if (evalStr) {
    const a = this;
    const da = this.isActor() ? this.actor() : this.enemy();
    const cri = critical;
    const val = Number(eval(evalStr));
    this.chargeLimit(val);
  }
};

Game_Battler.prototype.chargeLimitByAttack = function(item, critical) {
    if (critical) {
        evalStr = item && item.meta.LimitCriticalStr ? String(item.meta.LimitCriticalStr) : CriticalAmount;
    } else {
        evalStr = item && item.meta.LimitAttackStr ? String(item.meta.LimitAttackStr) : AttackAmount;
    }
    if (evalStr) {
      const a = this;
      const da = this.isActor() ? this.actor() : this.enemy();
      const cri = critical;
      const val = Number(eval(evalStr));
      this.chargeLimit(val);
    }
  };

Game_Actor.prototype.chargeLimit = function(value) {
  this.setLimitGauge($gameParty.isPartyLimitValue() + value);
};

Game_Enemy.prototype.chargeLimit = function(value) {
  this.setLimitGauge($gameTroop.isPartyLimitValue() + value);
};

Game_Actor.prototype.setLimitGauge = function(value) {
  $gameParty._limitGauge = value.clamp(0, MaxLimitValue);
};

Game_Enemy.prototype.setLimitGauge = function(value) {
  $gameTroop._limitGauge = value.clamp(0, MaxLimitValue);
};

Game_Actor.prototype.canPaySkillLimitCost = function(skill) {
  const cost = this.skillLimitCost(skill)
  if (cost !== null) {
    return $gameParty.isPartyLimitValue() >= cost;
  } else {
    return true;
  }
};

Game_Enemy.prototype.canPaySkillLimitCost = function(skill) {
  const cost = this.skillLimitCost(skill)
  if (cost !== null) {
    return $gameTroop.isPartyLimitValue() >= cost;
  } else {
    return true;
  }
};

const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
  _Game_BattlerBase_die.call(this);
  this.chargeLimitByDie(DieAmount);
};

Game_Enemy.prototype.chargeLimitByDie = function(evalStr) {
  if (evalStr) {
    const a = this;
    const da = this.enemy();
    const val = Number(eval(evalStr));
    $gameParty._limitGauge = Math.min($gameParty.isPartyLimitValue() + val, MaxLimitValue);
  }
};

Game_Actor.prototype.chargeLimitByDie = function(evalStr) {
  if (evalStr) {
    const a = this;
    const da = this.actor();
    const val = Number(eval(evalStr));
    $gameTroop._limitGauge = Math.min($gameTroop.isPartyLimitValue() + val, MaxLimitValue);
  }
};

const _Game_Battler_startTpbTurn = Game_Battler.prototype.startTpbTurn;
Game_Battler.prototype.startTpbTurn = function() {
    _Game_Battler_startTpbTurn.call(this);
    this.chargeLimitByTpbTurn(TurnAmount);
};

Game_Battler.prototype.chargeLimitByTpbTurn = function(evalStr) {
    if (evalStr) {
      const a = this;
      const da = this.isActor() ? this.actor() : this.enemy();
      const val = Number(eval(evalStr));
      this.chargeLimit(val);
    }
};


const _Game_Unit_initialize = Game_Unit.prototype.initialize;
Game_Unit.prototype.initialize = function() {
  _Game_Unit_initialize.call(this);
  this._limitGauge = 0;
};

Game_Unit.prototype.isPartyLimitValue = function() {
  if (this._limitGauge === undefined) {
    this._limitGauge = 0;
  }
  return this._limitGauge;
};

Game_Party.prototype.initPartyLimit = function() {
  this._limitGauge = BattleStartReset ? 0 : this.isPartyLimitValue();
};

Game_Party.prototype.setPartyLimit = function(value) {
  if (onPartyChargeLimitGauge()) {
    this._limitGauge = value;
  }
};

Game_Party.prototype.chargeLimitByTurn = function(evalStr) {
    if (!!evalStr) {
        const a = this;
        const val = Number(eval(evalStr));
        this._limitGauge = Math.min(this.isPartyLimitValue() + val, MaxLimitValue);
    }
};

Game_Troop.prototype.initPartyLimit = function() {
  this._limitGauge = 0;
};

Game_Troop.prototype.setPartyLimit = function(value) {
  if (onEnemyChargeLimitGauge()) {
    this._limitGauge = value;
  }
};

Game_Troop.prototype.chargeLimitByTurn = function(evalStr) {
    if (!!evalStr) {
        const a = this;
        const val = Number(eval(evalStr));
        this._limitGauge = Math.min(this.isPartyLimitValue() + val, MaxLimitValue);
    }
};

Game_Party.prototype.getPartyLimitSprite = function(width) {
    return new Sprite_PartyGauge(width);
};


const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
    _Scene_Battle_createSpriteset.call(this);
    if (PartyGaugeVisible) {
        this.createPartyGauge();
    }
    if (EnemyGaugeVisible) {
        this.createTroopGauge();
    }
};

Scene_Battle.prototype.addPartyGauge = function(sprite) {
    switch (GaugePriority) {
        case 'Scene_Battle':
            this.addChild(sprite);
            return;
        case 'Spriteset_Battle':
            this._spriteset._baseSprite.addChild(sprite);
            return;
        case 'BattleField':
            this._spriteset._battleField.addChild(sprite);
            return;
        default:
            break;
    }
};

Scene_Battle.prototype.createPartyGauge = function() {
    const x = PartyGauge_X;
    const y = PartyGauge_Y;
    const sprite = new Sprite_PartyGauge();
    this.addPartyGauge(sprite);
    sprite.setSpriteset(this._spriteset);
    sprite.setup('actor', 'limit');
    sprite.move(x, y);
    if (onPartyChargeLimitGauge()) {
        sprite.show();
    } else {
        sprite.hide();
    }
    this._partyGauge = sprite;
};

Scene_Battle.prototype.createTroopGauge = function() {
    const x = EnemyGauge_X;
    const y = EnemyGauge_Y;
    const sprite = new Sprite_TroopGauge();
    this.addPartyGauge(sprite);
    sprite.setSpriteset(this._spriteset);
    sprite.setup('enemy', 'limit');
    sprite.move(x, y);
    if (onEnemyChargeLimitGauge()) {
        sprite.show();
    } else {
        sprite.hide();
    }
    this._troopGauge = sprite;
};

if (!Imported.NUUN_SkillCostShowEX) {

    const _Window_SkillList_drawItem = Window_SkillList.prototype.drawItem;
    Window_SkillList.prototype.drawItem = function(index) {
        const skill = this.itemAt(index);
        if (skill) {
            const cost = this._actor.skillLimitCost(skill);
            this.multiCost = cost > 0 && (this._actor.skillTpCost(skill) > 0 || this._actor.skillMpCost(skill) > 0);
            this._limitCostWidth = cost > 0 ? skill.meta.LimitCostWidth : null;
        }
        _Window_SkillList_drawItem.call(this, index);
    };

    const _Window_SkillList_costWidth = Window_SkillList.prototype.costWidth;
    Window_SkillList.prototype.costWidth = function() {
        if (this._limitCostWidth) {
            return this.textWidth(this._limitCostWidth);
        } else if (!!MultiCostWidth && this.multiCost) {
            return this.textWidth(MultiCostWidth);
        } else {
            return _Window_SkillList_costWidth.call(this);
        }
    };
    
    const _Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
    Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
        const cost = this._actor.skillLimitCost(skill);
        let x2 = 0;
        if (cost !== null && cost > 0) {
            if (this._actor.skillTpCost(skill) > 0) {
                x2 = this.textWidth(this._actor.skillTpCost(skill)) + this.itemPadding();
            } else if (this._actor.skillMpCost(skill) > 0) {
                x2 = this.textWidth(this._actor.skillMpCost(skill)) + this.itemPadding();
            }
            this.changeTextColor(getColorCode(LimitCostColor));
            this.drawText(cost, x, y, width, "right");
        }
        _Window_SkillList_drawSkillCost.call(this, skill, x, y, width - x2);
    };
}

function Sprite_PartyGauge() {
    this.initialize(...arguments);
}

Sprite_PartyGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_PartyGauge.prototype.constructor = Sprite_PartyGauge;

Sprite_PartyGauge.prototype.initialize = function(width, type) {
    this._gaugeWidth = width || 0;
    this._statusType = type;
    Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_PartyGauge.prototype.initMembers = function() {
    Sprite_Gauge.prototype.initMembers.call(this);
};

Sprite_PartyGauge.prototype.bitmapWidth = function() {
    return this._gaugeWidth > 0 ? this._gaugeWidth : PartyGauge_Width;
};

Sprite_PartyGauge.prototype.setup = function(unit, statusType) {
    this._unit = unit;
    Sprite_Gauge.prototype.setup.call(this, unit, statusType);
};

Sprite_PartyGauge.prototype.setSpriteset = function(spriteset) {
    this._spriteset = spriteset;
};

const _Sprite_Gauge_gaugeX = Sprite_Gauge.prototype.gaugeX;
Sprite_Gauge.prototype.gaugeX = function() {
    if (this._statusType === "limit") {
        return this.limitGaugeX();
    } else {
        return _Sprite_Gauge_gaugeX.call(this);
    }
};

Sprite_PartyGauge.prototype.limitGaugeX = function() {
    return !!this.label() ? _Sprite_Gauge_gaugeX.call(this) : 0;
};

Sprite_PartyGauge.prototype.measureLabelWidth = function() {
    this.setupLabelFont();
    return this.bitmap.measureTextWidth(this.label());
};

Sprite_Gauge.prototype.limitGaugeAnimationVisible = function() {
    return true;
};

const _Sprite_Gauge_currentValue = Sprite_Gauge.prototype.currentValue;
Sprite_Gauge.prototype.currentValue = function() {
  if (this._statusType === 'limit') {
    if (this._unit === 'actor') {
      return $gameParty.isPartyLimitValue();
    } else {
      return $gameTroop.isPartyLimitValue();
    }
  } else {
    return _Sprite_Gauge_currentValue.call(this);
  }
};

const _Sprite_Gauge_currentMaxValue = Sprite_Gauge.prototype.currentMaxValue;
Sprite_Gauge.prototype.currentMaxValue = function() {
  if (this._statusType === 'limit') {
    return MaxLimitValue;
  } else {
    return _Sprite_Gauge_currentMaxValue.call(this);
  }
};

const _Sprite_Gauge_drawValue =Sprite_Gauge.prototype.drawValue;
Sprite_Gauge.prototype.drawValue = function() {
  if (this._statusType === 'limit') {
    if ((this._unit === 'actor' && PartyLimitValueVisible) || (this._unit === 'enemy' && EnemyLimitValueVisible)) {
      _Sprite_Gauge_drawValue.call(this);
    }
  } else {
    _Sprite_Gauge_drawValue.call(this);
  }
};

Sprite_PartyGauge.prototype.label = function() {
  return PartyGaugeLabel;
};

Sprite_PartyGauge.prototype.update = function() {
    Sprite_Gauge.prototype.update.call(this);
    this.updatePartyLimitHideSprite();
};

Sprite_PartyGauge.prototype.updatePartyLimitHideSprite = function() {
    this.visible = onPartyChargeLimitGauge();
    if (!this.visible) return;
    for (const data of WindowHideActorPartyLimit) {
        switch (data) {
            case 'startBattle':
                this.visible = BattleManager._phase !== 'start';
                if (!this.visible) return;
                break;
            case 'battleEnd':
                this.visible = BattleManager._phase !== 'battleEnd';
                if (!this.visible) return;
                break;
            case 'battleEvent':
                this.visible = !$gameTroop.isEventRunning();
                if (!this.visible) return;
                break;
            case 'animation':
                this.visible = !this._spriteset.isAnimationPlaying();
                if (!this.visible) return;
                break;
            default:
                break;
        }
    }
    return true;
};

Sprite_PartyGauge.prototype.measureLabelWidth = function() {
    this.setupLabelFont();
    return this.bitmap.measureTextWidth(this.label());
};

Sprite_PartyGauge.prototype.labelFontSize = function() {
  return $gameSystem.mainFontSize() + PartyGauge_LabelFontSize;
};

Sprite_PartyGauge.prototype.gaugeColor1 = function() {
  return this._isGaugeData ? getColorCode(this.changeGaugeColor1()) : getColorCode(PartyGaugeColor1);
};

Sprite_PartyGauge.prototype.gaugeColor2 = function() {
  return this._isGaugeData ? getColorCode(this.changeGaugeColor2()) : getColorCode(PartyGaugeColor2);
};

Sprite_PartyGauge.prototype.labelColor = function() {
  return getColorCode(PartyGauge_LabelColor);
};

function Sprite_TroopGauge() {
  this.initialize(...arguments);
}

Sprite_TroopGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_TroopGauge.prototype.constructor = Sprite_TroopGauge;

Sprite_TroopGauge.prototype.initialize = function(type) {
    this._statusType = type;
    Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_TroopGauge.prototype.initMembers = function() {
    Sprite_Gauge.prototype.initMembers.call(this);
};

Sprite_TroopGauge.prototype.bitmapWidth = function() {
  return EnemyGauge_Width;
};

Sprite_TroopGauge.prototype.setup = function(unit, statusType) {
  this._unit = unit;
  Sprite_Gauge.prototype.setup.call(this, unit, statusType);
};

Sprite_TroopGauge.prototype.setSpriteset = function(spriteset) {
    this._spriteset = spriteset;
};

Sprite_TroopGauge.prototype.update = function() {
    Sprite_Gauge.prototype.update.call(this);
    this.updatePartyLimitHideSprite();
};

Sprite_TroopGauge.prototype.updatePartyLimitHideSprite = function() {
    this.visible = onEnemyChargeLimitGauge();
    if (!this.visible) return;
    for (const data of WindowHideEnemyPartyLimit) {
        switch (data) {
            case 'startBattle':
                this.visible = BattleManager._phase !== 'start';
                if (!this.visible) return;
                break;
            case 'battleEnd':
                this.visible = BattleManager._phase !== 'battleEnd';
                if (!this.visible) return;
                break;
            case 'battleEvent':
                this.visible = !$gameTroop.isEventRunning();
                if (!this.visible) return;
                break;
            case 'animation':
                this.visible = !this._spriteset.isAnimationPlaying();
                if (!this.visible) return;
                break;
            default:
                break;
        }
    }
    return true;
};

Sprite_TroopGauge.prototype.label = function() {
  return EnemyGaugeLabel;
};

Sprite_TroopGauge.prototype.limitGaugeX = function() {
    return !!this.label() ? _Sprite_Gauge_gaugeX.call(this) : 0;
};

Sprite_TroopGauge.prototype.labelFontSize = function() {
  return $gameSystem.mainFontSize() + EnemyGauge_LabelFontSize;
};

Sprite_TroopGauge.prototype.gaugeColor1 = function() {
  return getColorCode(EnemyGaugeColor1);
};

Sprite_TroopGauge.prototype.gaugeColor2 = function() {
  return getColorCode(EnemyGaugeColor2);
};

Sprite_TroopGauge.prototype.labelColor = function() {
  return getColorCode(EnemyGauge_LabelColor);
};


function getColorCode(color) {
  if (typeof(color) === "string") {
    return color;
  }
  return ColorManager.textColor(color);
};

function setChargeLimit(evalStr) {
  if (evalStr) {
    const val = Number(eval(evalStr));
    $gameParty._limitGauge = Math.min($gameParty.isPartyLimitValue() + val, MaxLimitValue);
  }
};

function onPartyChargeLimitGauge() {
  return PartyGaugeShowSwitch === 0 || $gameSwitches.value(PartyGaugeShowSwitch);
};

function onEnemyChargeLimitGauge() {
  return EnemyGaugeShowSwitch === 0 || $gameSwitches.value(EnemyGaugeShowSwitch);
};

function allMemberChargeLimitGauge(members) {
    return members.aliveMembers().reduce((r, m) => {
        r += m.actor().meta.Charge ;
        return r;
    });
};

})();