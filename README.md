# 利用規約
公開しているプラグインはフリー版のみMITライセンスで公開しています。  
フリー、シェアゲーム問わずご使用いただけます。

RPGツクールMVへの対応は行いません。  

不具合報告、質問、追加要望はツクールフォーラム(日本)、ツクマテまで  

[既知の不具合、更新予定](https://github.com/nuun888/MZ/blob/master/bug.md)  

[よくある質問](https://github.com/nuun888/MZ/blob/master/README/q&a.md)  

来月の4月1日よりコアスクリプトVer.1.5以前に対応するプラグインのサポートを終了させていただきます。  
今後はVer.1.6以降の対応のみにさせていただきます。  

# 公開プラグイン
共：要共通処理  
条：要条件付き  
条対：条件付き対応  
立対：立ち絵、顔グラ表示EX対応  
レ：レーダーチャート対応  
ス：要ステートターンカウント  
ス対：ステートターンカウント対応  
グ：グローバル情報ベース対応  
オ：要バトラーオーバーレイベース  
ポ：ポップアップ対応  
A：APNG対応(トリアコンタン様ApngPicture(APNGピクチャプラグイン)が必要です)  

前提、必須プラグインが必要なプラグインでエラーが出た場合は、まず前提、必須プラグインを最新版にしてください。  

| コア　　　　　　　　　　　　　　　　　 | プラグイン　プラグイン数5　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md) | [NUUN_Base](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_Base.js) |  | 1.6.4 |
| [条件付きベース](https://github.com/nuun888/MZ/blob/master/README/ConditionsBase.md) | [NUUN_ConditionsBase](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ConditionsBase.js) | 共 | 1.1.10 |
| [ステート経過ターンカウント](https://github.com/nuun888/MZ/blob/master/README/StateTurnCount.md) | [NUUN_StateTurnCount](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StateTurnCount.js) |  | 1.1.1 |
| [レーダーチャート表示ベース](https://github.com/nuun888/MZ/blob/master/README/RadarChartBase.md) | [NUUN_RadarChartBase](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_RadarChartBase.js) | 共 | 1.0.2 |
| [立ち絵、顔グラ表示EX](https://github.com/nuun888/MZ/blob/master/README/ActorPicture.md) | [NUUN_ActorPicture](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ActorPicture.js) | 共 | 1.5.2 |
| [ドロップ率確率操作ベース](https://github.com/nuun888/MZ/blob/master/README/DropItemRateBase.md) |  [NUUN_DropItemRateBase](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_DropItemRateBase.js) |  | 1.0.0 |
| [グローバル情報ベース](https://github.com/nuun888/MZ/blob/master/README/GlobalCore.md) | [NUUN_GlobalCore](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_GlobalCore.js) |  | 1.0.1 |
| [バトラーオーバーレイベース](https://github.com/nuun888/MZ/blob/master/README/BattlerOverlayBase.md) | [NUUN_BattlerOverlayBase](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattlerOverlayBase.js) |  | 1.0.3 |
|  |  |  |  |

| 戦闘　　　　　　　　　　　　　　　　　 | プラグイン　プラグイン数5　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [バトルスタイル拡張](https://github.com/nuun888/MZ/blob/master/README/BattleStyleEXBase.md) |  | 共 立対 | 3.10.1 |
| [XPスタイル対象選択ウィンドウ](https://github.com/nuun888/MZ/blob/master/README/XPSelectWindow.md) | [NUUN_XPSelectWindow](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_XPSelectWindow.js) | 共 | 1.1.4 |
| ┗ アクター対象選択画面 |  |  |  |
| [リザルト](https://github.com/nuun888/MZ/blob/master/README/Result.md) | [NUUN_Result](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_Result.js) | 共 立対 | 2.3.4 |
| ┣  [MVPアクター](https://github.com/nuun888/MZ/blob/master/README/ResultMVPActor.md) | [NUUN_ResultMVPActor](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ResultMVPActor.js) |  | 1.1.3 |
| ┗ [リザルト時スプライト非表示](https://github.com/nuun888/MZ/blob/master/README/ResultSpriteHide.md) | [NUUN_ResultSpriteHide](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ResultSpriteHide.js) | 共 | 1.0.0 |
| [戦闘中アイテム、スキル選択画面MV風表示](https://github.com/nuun888/MZ/blob/master/README/BattleItemSkillWindowMV.md) | [NUUN_BattleItemSkillWindowMV](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleItemSkillWindowMV.js) |  | 1.3.0 |
| [パーティコマンド表示順任意](https://github.com/nuun888/MZ/blob/master/README/PartyCommandCustomize.md) | [NUUN_PartyCommandCustomize](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_PartyCommandCustomize.js) | 共 | 1.0.0 |
| [アクターコマンド表示順任意](https://github.com/nuun888/MZ/blob/master/README/ActorCommandCustomize.md) | [NUUN_ActorCommandCustomize](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ActorCommandCustomize.js) | 共 | 1.0.1 |
| [スキップパーティコマンド](https://github.com/nuun888/MZ/blob/master/README/SkipPartyCommand.md) | [NUUN_SkipPartyCommand](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SkipPartyCommand.js) |  | 1.0.1 |
| [バトルログ簡易表示及び一括ポップアップ](https://github.com/nuun888/MZ/blob/master/README/BattleLogSimpleDisplayPopupBatch.md) | [NUUN_BattleLogSimpleDisplayPopupBatch](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleLogSimpleDisplayPopupBatch.js) | 共 |  1.0.0 |
| [フロントビューサイドビュー変更](https://github.com/nuun888/MZ/blob/master/README/ChangeBattleMode.md) | [NUUN_ChangeBattleMode](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ChangeBattleMode.js) |  |  1.0.0 |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

| バトラー　　　　　　　　　　　　　　　 | プラグイン　プラグイン数　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [バトラーHPゲージ](https://github.com/nuun888/MZ/blob/master/README/ButlerHPGauge.md) | [NUUN_ButlerHPGauge](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ButlerHPGauge.js) | オ | 1.7.2 |
| [バトラーMPゲージ](https://github.com/nuun888/MZ/blob/master/README/EnemyMPGauge.md) | [NUUN_BattlerMPGauge](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattlerMPGauge.js) | オ | 1.2.1 |
| [バトラーTPBゲージ表示](https://github.com/nuun888/MZ/blob/master/README/EnemyTpbGauge.md) | [NUUN_BattlerTpbGauge](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattlerTpbGauge.js) | オ | 1.5.1 |
| [バトラーTPゲージ](https://github.com/nuun888/MZ/blob/master/README/EnemyTPGauge.md) | [NUUN_BattlerTPGauge](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattlerTPGauge.js) | オ | 1.2.0 |
| [バトラー名前表示](https://github.com/nuun888/MZ/blob/master/README/ButlerName.md) | [NUUN_ButlerName](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ButlerName.js) | オ | 1.4.0 |
|  |  |  |  |

| アクター　　　　　　　　　　　　　　　 | プラグイン　プラグイン数6　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [レベル上限限界突破](https://github.com/nuun888/MZ/blob/master/README/LevelUnlimited.md)  | [NUUN_LevelUnlimited](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_LevelUnlimited.js) |  | 1.2.1 |
| [最大レベル変動](https://github.com/nuun888/MZ/blob/master/README/ChangeMaxLevel.md) | [NUUN_ChangeMaxLevel](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ChangeMaxLevel.js) |  | 1.2.1 |
| [アクターステータスの最大値設定](https://github.com/nuun888/MZ/blob/master/README/StatusParamEX.md) | [NUUN_StatusParamEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StatusParamEX.js) |  | 1.0.2 |
| [サポートアクター](https://github.com/nuun888/MZ/blob/master/README/SupportActor.md) | [NUUN_SupportActor](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SupportActor.js) | 共 | 1.4.2 |
| ┣  [サポートアクターインジケーター](https://github.com/nuun888/MZ/blob/master/README/DisplaySupportActor.md) | [NUUN_DisplaySupportActor](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_DisplaySupportActor.js) |  | 1.5.0 |
| ┣  [サポートアクター呼び出し](https://github.com/nuun888/MZ/blob/master/README/CallSupportActor.md) | [NUUN_CallSupportActor](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_CallSupportActor.js) |  | 1.0.2 |
| ┗  召喚アクター |  |  |
| [サイドビューアクターステートアイコン](https://github.com/nuun888/MZ/blob/master/README/SVActorStateIcon.md) | [NUUN_SVActorStateIcon](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SVActorStateIcon.js) | オ | 1.0.0 |
|  |  |  |  |
|  |  |  |  |

| 敵　　　　　　　　　　　　　　　　　　 | プラグイン　プラグイン数12　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [敵の行動パターン条件拡張](https://github.com/nuun888/MZ/blob/master/README/CondEnemyAction.md)| [NUUN_CondEnemyAction](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_CondEnemyAction.js) | 条 | 1.0.1 |
| [敵キャラのスタータス上限突破](https://github.com/nuun888/MZ/blob/master/README/EnemyParamNoLimit.md) | [NUUN_EnemyParamNoLimit](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyParamNoLimit.js) | 共 | 1.0.0 |
| [巨大モンスター](https://github.com/nuun888/MZ/blob/master/README/BigEnemy.md) | [NUUN_BigEnemy](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BigEnemy.js) |  | 1.2.0 |
| [敵ステート表示拡張](https://github.com/nuun888/MZ/blob/master/README/EnemyStateIconEX.md) | [NUUN_EnemyStateIconEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyStateIconEX.js) | オ | 1.1.0 |
| [エネミー個別座標](https://github.com/nuun888/MZ/edit/master/README/EnemyPosition.md)  | [NUUN_BattlePosition](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyPosition.js) |  | 1.1.0 |
| [敵のドロップアイテム追加](https://github.com/nuun888/MZ/blob/master/README/AddDropItems.md)  | [NUUN_AddDropItems](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AddDropItems.js) |  | 1.0.1 |
| [条件付きドロップアイテム](https://github.com/nuun888/MZ/blob/master/README/ConditionalDrops.md) | [NUUN_ConditionalDrops](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ConditionalDrops.js) | 条 | 1.0.8 |
| [ユニークモンスター](https://github.com/nuun888/MZ/blob/master/README/UniqueEnemy.md) | [NUUN_UniqueEnemy](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_UniqueEnemy.js) | 共 | 1.0.2 |
|  |  |  |  |
|  |  |  |  |

| 能力拡張　　　　　　　　　　　　　　　 | プラグイン　プラグイン数8　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| 属性吸収特徴 | [NUUN_ElementAbsorb](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ElementAbsorb.js) |  | 1.0.1 |
| [回復効果反転特徴](https://github.com/nuun888/MZ/blob/master/README/RecoveryReversal.md) | [NUUN_RecoveryReversal](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_RecoveryReversal.js) |  | 1.0.0 |
| [キャストタイムチャージ率特徴](https://github.com/nuun888/MZ/blob/master/README/CastTimeCharge.md) | [NUUN_CastTimeCharge](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_CastTimeCharge.js) |  | 1.0.0 |
| [ファイナルアタック特徴](https://github.com/nuun888/MZ/blob/master/README/FinalAttack.md) | [NUUN_FinalAttack](https://github.com/nuun888/MZ/blob/master/NUUN_FinalAttack.js) |  | 1.1.1 |
| [マナシールド](https://github.com/nuun888/MZ/blob/master/README/ManaShield.md) | [NUUN_ManaShield](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ManaShield.js) |  | 1.1.2 |
| [能力値ターン毎増減特徴](https://github.com/nuun888/MZ/blob/master/README/AccelerationFeature.md) | [NUUN_AccelerationFeature](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AccelerationFeature.js) |  | 2.0.0 |
| [行動時ブースト特徴](https://github.com/nuun888/MZ/blob/master/README/NUUN_boostEX.md) | [NUUN_boostEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_boostEX.js) | 条対 | 1.2.0 |
| [踏み止まり特徴](https://github.com/nuun888/MZ/blob/master/README/StoppingFeature.md) | [NUUN_StoppingFeature](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StoppingFeature.js) | 条対 | 1.0.0 |
| [カウンター拡張](https://github.com/nuun888/MZ/blob/master/README/CounterEX.md) | [NUUN_CounterEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_CounterEX.js) | 共 | 1.0.0 |
|  |  |  |  |
|  |  |  |  |


| アイテム、スキル　　　　　　　　　　　 | プラグイン　プラグイン数13　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [アイテム、スキルネームカラー](https://github.com/nuun888/MZ/blob/master/README/ItemNameColor.md) | [NUUN_ItemNameColor](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ItemNameColor.js) |  | 1.1.2 |
| [経験値増減アイテム、スキル](https://github.com/nuun888/MZ/blob/master/README/ExpItem.md) | [NUUN_ExpItem](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ExpItem.js) |  | 1.2.3 |
| [レベルアップアイテム](https://github.com/nuun888/MZ/blob/master/README/LevelUPItem.md) | [NUUN_LevelUPItem](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_LevelUPItem.js) |  | 1.0.2 |
| [キャストタイム（詠唱）キャンセルスキル、アイテム](https://github.com/nuun888/MZ/blob/master/README/CancelCastTime.md) | [NUUN_CancelCastTime](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_CancelCastTime.js) |  | 1.1.1 |
| [アイテム消耗率](https://github.com/nuun888/MZ/blob/master/README/ConsumptionItem.md) | [NUUN_ConsumptionItem](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ConsumptionItem.js) |  | 1.1.1 |
| [アイテム使用回数](https://github.com/nuun888/MZ/blob/master/README/ItemUseCount.md) | [NUUN_ItemUseCount](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ItemUseCount.js) |  | 1.0.2 |
| [盗みスキル](https://github.com/nuun888/MZ/blob/master/README/StealableItems.md) |  [NUUN_StealableItems](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StealableItems.js) | 共 条対 ポ | 1.4.1 |
| [アイテム最大所持数変更](https://github.com/nuun888/MZ/blob/master/README/MaxItem.md) | [NUUN_MaxItem](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_MaxItem.js) | 共 | 1.4.0 |
| [アイテム個数表示変更](https://github.com/nuun888/MZ/blob/master/README/ItemNum.md) | [NUUN_ItemNum](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ItemNum.js) |  | 1.0.0 |
| [アイテム全体所持制限](https://github.com/nuun888/MZ/blob/master/README/GroupMaxItems.md) | [NUUN_GroupMaxItems](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_GroupMaxItems.js) | 共 | 1.0.0 |
| [パッシブスキル](https://github.com/nuun888/MZ/blob/master/README/PassiveSkill.md) | [NUUN_PassiveSkill](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_PassiveSkill.js) | 共 条対 | 1.5.7 |
| [スキル、アイテム使用条件](https://github.com/nuun888/MZ/blob/master/README/ConditionalSkills.md) | [NUUN_ConditionalSkills](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ConditionalSkills.js) | 条 | 1.2.0 |
| [スキルコスト拡張](https://github.com/nuun888/MZ/blob/master/README/SkillCostEX.md) | [NUUN_SkillCostEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SkillCostEX.js) |  | 1.2.3 |
| [スキルコスト表示拡張](https://github.com/nuun888/MZ/blob/master/README/SkillCostShowEX.md) | [NUUN_SkillCostShowEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SkillCostShowEX.js) | 共 | 1.1.3 |
| [スキルラーニング](https://github.com/nuun888/MZ/blob/master/README/SkillLearning.md) | [NUUN_SkillLearning](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SkillLearning.js) | 共 | 1.1.2 |
| [設置型スキル](https://github.com/nuun888/MZ/blob/master/README/StationarySkill.md) | [NUUN_StationarySkill](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StationarySkill.js) | 共 | 1.0.0 |
|  |  |  |  |
|  |  |  |  |

| ステート、バフ　　　　　　　　　　　　 | プラグイン　プラグイン数6　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [ステート付与の仕様変更](https://github.com/nuun888/MZ/blob/master/README/AddStateDeviation.md) | [NUUN_AddStateDeviation](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AddStateDeviation.js) |  | 1.0.3 |
| [スリップダメージ拡張](https://github.com/nuun888/MZ/blob/master/README/SlipDamageEX.md) | [NUUN_SlipDamageEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SlipDamageEX.js) | ス | 1.1.1 |
| [ステート、バフターン数増減特徴](https://github.com/nuun888/MZ/blob/master/README/StateBuffTurnPlus.md) | [NUUN_StateBuffTurnPlus](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StateBuffTurnPlus.js) |  | 1.1.1 |
| [ステート付与率増減特徴](https://github.com/nuun888/MZ/blob/master/README/AddStateRateBoost.md) | [NUUN_AddStateRateBoost](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AddStateRateBoost.js) |  | 1.0.0 |
| [ステート残りターン表示](https://github.com/nuun888/MZ/blob/master/README/NUUN_StateTurn.md) | [NUUN_StateTurn](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StateTurn.js) | ス対 | 1.1.2 |
| [ステート横並び表示](https://github.com/nuun888/MZ/blob/master/README/StateIconSideBySide.md) | [NUUN_StateIconSideBySide](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StateIconSideBySide.js) | ス対 | 1.5.2 |
| [バフ、デバフ重ね掛け上限変更](https://github.com/nuun888/MZ/blob/master/README/BuffMaxLevel.md) | [NUUN_BuffMaxLevel](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BuffMaxLevel.js) |  | 1.0.0 |
| [バフ、デバフ倍率効果率増減特徴](https://github.com/nuun888/MZ/blob/master/README/BuffBoost.md) | [NUUN_BuffBoost](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BuffBoost.js) |  | 1.0.0 |
| [ステート、バフターン操作アイテム、スキル](https://github.com/nuun888/MZ/blob/master/README/StateBuffTurnOperation.md) | [NUUN_StateBuffTurnOperation](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StateBuffTurnOperation.js) |  | 1.0.0 |
| [行動制限TPB初期化無効ステート](https://github.com/nuun888/MZ/blob/master/README/KeepRestrictedTPB.md) | [NUUN_KeepRestrictedTPB](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_KeepRestrictedTPB.js) |  | 1.0.0 |
|  |  |  |  |
|  |  |  |  |

| パーティ、敵グループ　　　　　　　　　 | プラグイン　プラグイン数1　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [パーティ、敵グループリミットゲージ](https://github.com/nuun888/MZ/blob/master/README/PartyLimitGauge.md) | [NUUN_PartyLimitGauge](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_PartyLimitGauge.js) | 共 | 1.3.0 |
|  |  |  |  |
|  |  |  |  |

| パーティ　　　　　　　　　　　　　　　 | プラグイン　プラグイン数5　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [最大戦闘メンバー数変更](https://github.com/nuun888/MZ/blob/master/README/MaxBattleMembers.md) | [NUUN_MaxBattleMembers](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_MaxBattleMembers.js) |  | 1.0.6 |
| [バトルステータスゲージ幅修正](https://github.com/nuun888/MZ/blob/master/README/BattleGaugeWidthFix.md) | [NUUN_BattleGaugeWidthFix](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleGaugeWidthFix.js) |  | 1.0.0 |
| [メンバー変更画面](https://github.com/nuun888/MZ/blob/master/README/SceneFormation.md) | [NUUN_SceneFormation](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SceneFormation.js) | 共 立 対 | 1.7.3 |
| ┣ [メンバー変更画面(戦闘)](https://github.com/nuun888/MZ/blob/master/README/SceneBattleFormation.md) | [NUUN_SceneBattleFormation](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SceneBattleFormation.js) | 共 | 1.3.3 |
| ┗ [メンバー変更画面（サポートアクター対応）](https://github.com/nuun888/MZ/blob/master/README/SceneFormation_SupportActor.md) | [NUUN_SceneFormation_SupportActor](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SceneFormation_SupportActor.js) |  | 1.1.0 |
| [アクター並び替え固定](https://github.com/nuun888/MZ/blob/master/README/ActorFixed.md) | [NUUN_ActorFixed](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ActorFixed.js) |  | 1.2.0 |
| [隊列控えメンバー表示](https://github.com/nuun888/MZ/blob/master/README/StandbyMemberFollowers.md) | [NUUN_StandbyMemberFollowers](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StandbyMemberFollowers.js) |  | 1.0.0 |
|  |  |  |  |

| 敵グループ　　　　　　　　　　　　　　 | プラグイン　プラグイン数3　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [エンカウント条件拡張](https://github.com/nuun888/MZ/blob/master/README/EncounterCondition.md) | [NUUN_EncounterCondition](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EncounterCondition.js) | 条対 | 1.2.2 |
| [先制、不意打ちEX](https://github.com/nuun888/MZ/blob/master/README/PreemptiveSurpriseEx.md) | [NUUN_PreemptiveSurpriseEx](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_PreemptiveSurpriseEx.js) | | 1.2.0 |
| [敵グループの個別ＢＧＭ設定](https://github.com/nuun888/MZ/blob/master/README/BattleBGM.md) | [NUUN_BattleBGM](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleBGM.js) |  | 1.1.0 |
| [敵グループの個別戦闘勝利敗北ME設定](https://github.com/nuun888/MZ/blob/master/README/BattleME.md) | [NUUN_BattleME](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleME.js) |  | 1.0.0 |
|  |  |  |  |
|  |  |  |  |

| マップ　　　　　　　　　　　　　　　　 | プラグイン　プラグイン数2　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [床ダメージの処理を拡張](https://github.com/nuun888/MZ/blob/master/README/DamagedFloorEX.md) | [NUUN_DamagedFloorEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_DamagedFloorEX.js) | 共 | 1.1.1 |
| [地域マップ名](https://github.com/nuun888/MZ/blob/master/README/RegionMapName.md) | [NUUN_RegionMapName](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_RegionMapName.js) | 共 | 1.0.1 |
| [地域マップBGM](https://github.com/nuun888/MZ/blob/master/README/RegionMapBGM.md) | [NUUN_RegionMapBGM](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_RegionMapBGM.js) | 共 | 1.0.0 |
| [複数マップ結合](https://github.com/nuun888/MZ/blob/master/README/SeamlessMap.md) | [NUUN_SeamlessMap](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SeamlessMap.js) | 共 | 1.1.6 |
|  |  |  |  |

| コマンド　　　　　　　　　　　　　　　 | プラグイン　プラグイン数3　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [アイテムのカテゴリーカスタマイズ](https://github.com/nuun888/MZ/blob/master/README/ItemCategory.md) | [NUUN_ItemCategory](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ItemCategory.js) | 共 | 1.3.2 |
| [コマンド、カテゴリー表示拡張](https://github.com/nuun888/MZ/blob/master/README/NUUN_CommandIcon.md)| [NUUN_CommandIcon](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_CommandIcon.js) | 共 | 1.4.3 |
| [XP風バトルコマンド](https://github.com/nuun888/MZ/blob/master/README/XPBattleCommand.md) | [NUUN_XPBattleComman](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_XPBattleCommand.js) | 共 | 1.0.4 |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

| メッセージ　　　　　　　　　　　　　　　 | プラグイン　プラグイン数1　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [複数メッセージウィンドウ](https://github.com/nuun888/MZ/blob/master/README/MultiMessageWindows.md) | [NUUN_MultiMessageWindows](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_MultiMessageWindows.js) |  | 1.1.5 |

| メニュー　　　　　　　　　　　　　　　 | プラグイン　プラグイン数10　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [所持金拡張](https://github.com/nuun888/MZ/blob/master/README/GoldEX.md) | [NUUN_GoldEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_GoldEX.js) | 共 | 1.2.1 |
| [モンスター図鑑](https://github.com/nuun888/MZ/blob/master/README/EnemyBook.md) | [NUUN_EnemyBook](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyBook.js) | 共 レ グ A | 2.18.5 |
| ┣　[モンスター図鑑マップ遭遇チェック](https://github.com/nuun888/MZ/blob/master/README/EnemyBookEncounterCheck.md) | [NUUN_EnemyBookEncounterCheck](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyBookEncounterCheck.js) | 共 | 1.0.0 |
| ┣　[耐性表示マスク](https://github.com/nuun888/MZ/blob/master/README/EnemyBookEX_1.md) | [NUUN_EnemyBookEX_1](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyBookEX_1.js) |  | 1.0.1 |
| ┣ 条件付きドロップアイテム図鑑適用 | [NUUN_EnemyBookEX_2](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyBookEX_2.js) |  | 1.0.1 |
| ┗ [モンスター図鑑全セーブ共通](https://github.com/nuun888/MZ/blob/master/README/EnemyBook_Global.md) | [NUUN_EnemyBook_Global](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyBook_Global.js) |  | 1.0.1 |
| [アイテム図鑑](https://github.com/nuun888/MZ/blob/master/README/ItemBook.md) | [NUUN_ItemBook](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ItemBook.js) | 共 | 1.6.1 |
| ┗ [アイテム図鑑全セーブ共通](https://github.com/nuun888/MZ/blob/master/README/ItemBook_Global.md) | [NUUN_ItemBook_Global](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ItemBook_Global.js) |  | 1.0.0 |
| [ステータス画面拡張](https://github.com/nuun888/MZ/blob/master/README/StatusScreen.md) | [NUUN_StatusScreen](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StatusScreen.js) | 共 立対 レ | 2.6.1 |
| [セーブ画面拡張](https://github.com/nuun888/MZ/blob/master/README/SaveScreen.md) | [NUUN_SaveScreen](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SaveScreen.js)  | 共 | 2.0.3 |
| [メニュー画面](https://github.com/nuun888/MZ/blob/master/README/MenuScreen_default.md) | | 共 立対 | 2.0.10 |
| ┣ [メニューコマンド表示拡張](https://github.com/nuun888/MZ/blob/master/README/MenuCommandEX.md) | [NUUN_MenuCommandEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_MenuCommandEX.js) | 共 | 1.1.3 |
| ┗ [スキルステータス画面表示カスタマイズ](https://github.com/nuun888/MZ/blob/master/README/SkillStatusEX.md) | [NUUN_SkillStatusEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUNSkillStatusEX.js) | 共 | 1.0.0 |
| [行動目標表示](https://github.com/nuun888/MZ/blob/master/README/Destination.md) | [NUUN_Destination](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_Destination.js) | 共 | 1.0.2 |
| [チャプターテキスト](https://github.com/nuun888/MZ/blob/master/README/Chapter.md) | [NUUN_Chaptern](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_Chapter.js) | 共 | 1.0.0 |
| [ウィンドウスキン個別設定](https://github.com/nuun888/MZ/blob/master/README/WindowSkinIndividual.md) | [NUUN_WindowSkinIndividual](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_WindowSkinIndividual.js) | 共 | 1.0.0 |
| [マルチカーソル](https://github.com/nuun888/MZ/blob/master/README/MultiCursor.md) | [NUUN_MultiCursor](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_MultiCursor.js) |  | 1.0.0 |
| [メニューコマンド任意表示順](https://github.com/nuun888/MZ/blob/master/README/MenuCommandDisplayOrder.md) | [NUUN_MenuCommandDisplayOrder](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_MenuCommandDisplayOrder.js) | 共 | 1.0.0 |
|  |  |  |  |
|  |  |  |  |

| 装備　　　　　　　　　　　　　　　　　 | プラグイン　プラグイン数1　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [装備時ステート](https://github.com/nuun888/MZ/blob/master/README/EquipsState.md) | [NUUN_EquipsState](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EquipsState.js) | 共 | 1.0.2 |
| [装備セットボーナス](https://github.com/nuun888/MZ/blob/master/README/SetBonusEquip.md) | [NUUN_SetBonusEquip](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SetBonusEquip.js) | 共 | 1.3.5 |
| ┗ [セットボーナスツールチップウィンドウ](https://github.com/nuun888/MZ/blob/master/README/SetBonusWindow.md) | [NUUN_SetBonusWindow](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SetBonusWindow.js) | 共 | 1.0.3 |
| [装備能力値変化量上限突破](https://github.com/nuun888/MZ/blob/master/README/EquipParamUnlimited.md) | [NUUN_EquipParamUnlimited](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EquipParamUnlimited.js) |  | 1.0.1 |
| [装備ステータス表示拡張](https://github.com/nuun888/MZ/blob/master/README/EquipStatusEX.md) | [NUUN_EquipStatusEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EquipStatusEX.js) | 共 | 1.3.3 |
| 装備画面レイアウト変更 |  |  |  |
| [スキル習得装備](https://github.com/nuun888/MZ/blob/master/README/EquipSkillLearning.md) | [NUUN_EquipSkillLearning](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EquipSkillLearning.js) | 共 | 1.1.1 |
|  |  |  |  |

| ショップ　　　　　　　　　 | プラグイン　プラグイン数1　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [売値任意設定](https://github.com/nuun888/MZ/blob/master/README/AnySellPrice.md) | [NUUN_AnySellPrice](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AnySellPrice.js) | 共 | 1.1.0 |
| [ショップ購入カテゴリー表示](https://github.com/nuun888/MZ/blob/master/README/PurchaseCategory.md) | [NUUN_PurchaseCategory](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_PurchaseCategory.js) | 共 | 1.1.0 |
|  |  |  |  |
|  |  |  |  |

| 表現　　　　　　　　　　　　　　　　　 | プラグイン　プラグイン数9　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [ゲージの数値更新アニメーション](https://github.com/nuun888/MZ/blob/master/README/GaugeValueAnimation.md) | [NUUN_GaugeValueAnimation](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_GaugeValueAnimation.js) | 共 | 1.2.2 |
| [ゲージ画像化](https://github.com/nuun888/MZ/blob/master/README/GaugeImage.md) | [NUUN_GaugeImage](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_GaugeImage.js) | 共 | 1.6.5 |
| [TP円形ゲージ](https://github.com/nuun888/MZ/blob/master/README/TpCircularGauge.md) | [NUUN_TpCircularGauge](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_TpCircularGauge.js) |  | 1.1.1 |
| [ダメージポップアップ画像化](https://github.com/nuun888/MZ/blob/master/README/DamagePopUpImg.md) | [NUUN_DamagePopUpImg](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_DamagePopUpImg.js) |  | 1.1.1 |
| [ダメージポップアップ同時表示](https://github.com/nuun888/MZ/blob/master/README/DamagePopUpSimulDisplay.md) | [NUUN_DamagePopUpSimulDisplay](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_DamagePopUpSimulDisplay.js) |  | 1.0.0 |
| [ポップアップ](https://github.com/nuun888/MZ/blob/master/README/popUp.md) | [NUUN_popUp](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_popUp.js) | 共 | 2.0.0 |
| [アップフェードアウトポップアップ](https://github.com/nuun888/MZ/blob/master/README/UpFadeoutPopup.md) | [NUUN_UpFadeoutPopup](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_UpFadeoutPopup.js) | 共 | 1.0.2 |
| [スライドフェードアウトポップアップ](https://github.com/nuun888/MZ/blob/master/README/SlideFadeoutPopup.md) | [NUUN_SlideFadeoutPopup](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SlideFadeoutPopup.js) | 共 | 1.0.1 |
| [バウンドポップアップ](https://github.com/nuun888/MZ/blob/master/README/LateralBoundPopUp.md) | [NUUN_LateralBoundPopUp](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_LateralBoundPopUp.js) | 共 | 1.1.2 |
| [ゲージ表示拡張](https://github.com/nuun888/MZ/blob/master/README/NUUN_GaugeValueEX.md) | [NUUN_GaugeValueEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_GaugeValueEX.js) | 共 | 1.4.1 |
| [ダメージ量ゲージ可視化](https://github.com/nuun888/MZ/blob/master/README/DamageGauge.md) | [NUUN_DamageGauge](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_DamageGauge.js) | 共 | 1.0.0 |
| [コンテンツ背景非表示](https://github.com/nuun888/MZ/blob/master/README/ContentsBackVisible.md) | [NUUN_ContentsBackVisible](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ContentsBackVisible.js) | 共 | 1.1.1 |
| [再生率バトルログ表示](https://github.com/nuun888/MZ/blob/master/README/PlaybackRateBattleLog.md) | [NUUN_PlaybackRateBattleLog](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_PlaybackRateBattleLog.js) |  | 1.0.0 |
| [TPBタイムライン](https://github.com/nuun888/MZ/blob/master/README/TPBTimeLine.md) | [NUUN_TPBTimeLine](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_TPBTimeLine.js) |  | 1.1.6 |
|  |  |  |  |
|  |  |  |  |

| システム　　　　　　　　　　　　　　　 | プラグイン　プラグイン数7　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [複数属性](https://github.com/nuun888/MZ/blob/master/README/MultiElement.md) | [NUUN_MultiElement](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_MultiElement.js) |  | 1.0.1 |
| [ドロップ率百分率化](https://github.com/nuun888/MZ/blob/master/README/DropRatePercentage.md) | [NUUN_DropRatePercentage](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_DropRatePercentage.js) |  | 1.0.1 |
| [ドロップ率分子操作](https://github.com/nuun888/MZ/blob/master/README/DropItemMolecule.md) | [NUUN_DropItemMolecule](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_DropItemMolecule.js) |  | 1.0.0 |
| [ダメージタイプTP追加](https://github.com/nuun888/MZ/blob/master/README/TPDamageType.md) | [NUUN_TPDamageType](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_TPDamageType.js) |  | 1.0.1 |
| [全体、ランダム、敵味方全体攻撃でも対象選択](https://github.com/nuun888/MZ/blob/master/README/Scope_confirmation.md) | [NUUN_Scope_confirmation](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_Scope_confirmation.js) | 共 | 1.6.0 |
| [MV互換アニメーションフレームレート変更](https://github.com/nuun888/MZ/blob/master/README/AnimationFPSRate.md) | [NUUN_AnimationFPSRate](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AnimationFPSRate.js) |  | 1.1.1 |
| [戦闘背景の変更](https://github.com/nuun888/MZ/blob/master/README/BattleBackgroundEX.md) | [NUUN_BattleBackgroundEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleBackgroundEX.js) | 共 | 1.2.0 |
| [データベース上限突破](https://github.com/nuun888/MZ/blob/master/README/SystemDatabaseUnlimited.md) | [NUUN_SystemDatabaseUnlimited](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SystemDatabaseUnlimited.js) | 共 | 1.0.1 |
| [追加アニメーション表示](https://github.com/nuun888/MZ/blob/master/README/AddAnimation.md) | [NUUN_AddAnimation](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AddAnimation.js) |  | 1.0.0 |
|  |  |  |  |
|  |  |  |  |

| イベント　　　　　　　　　　　　　　　 | プラグイン　プラグイン数　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [イベント接触判定拡張](https://github.com/nuun888/MZ/blob/master/README/EventRange.md) | [NUUN_EventRange](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EventRange.js) | 共 | 1.5.2 |
| ┣  [場所範囲移動](https://github.com/nuun888/MZ/blob/master/README/RangeTransfer.md) | [NUUN_RangeTransfer](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_RangeTransfer.js) |  | 1.0.2 |
| ┗ [シンボルエンカウント](https://github.com/nuun888/MZ/blob/master/README/SymbolEncounter.md) |  [NUUN_SymbolEncounter](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SymbolEncounter.js) | 共 | 1.0.2 |
| [トリガー起動時のプレイヤーとイベントの向き状況取得](https://github.com/nuun888/MZ/blob/master/README/EventPlayerDirection.md) | [NUUN_EventPlayerDirection](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EventPlayerDirection.js) | | 1.0.3 |
| [イベント復活](https://github.com/nuun888/MZ/blob/master/README/EventRevived.md) | [NUUN_EventRevived](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EventRevived.js) | 共 | 1.0.0 |
|  |  |  |  |
|  |  |  |  |

| ユーティリティ　　　　　　　　　　　　 | プラグイン　プラグイン数2　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [アイテムなどのランダム取得](https://github.com/nuun888/MZ/blob/master/README/RandomItems.md) | [NUUN_RandomItems](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_RandomItems.js) |  | 1.3.3 |
| イベントでアイテム消費時消耗率、使用回数反映  | [NUUN_EventUseItem](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EventUseItem.js) |  | 1.0.0 |
| [ゲームパッド振動](https://github.com/nuun888/MZ/blob/master/README/GamePadVibration.md) | [NUUN_GamePadVibration](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_GamePadVibration.js) | 共 | 1.0.2 |
| [キーボタン割り当て](https://github.com/nuun888/MZ/blob/master/README/UserKey.md) | [NUUN_UserKey](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_UserKey.js) | 共 | 1.2.4 |
| ┗ [左スティック軸変化量比例移動](https://github.com/nuun888/MZ/blob/master/README/RealMoveLeftStick.md) | [NUUN_realMoveLeftStick](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_realMoveLeftStick.js) |  | 1.0.3 |
|  |  |  |  |

| 不具合修正　　　　　　　　　　　　　　 | プラグイン　プラグイン数1　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| [メニュー画面の全体対象時のカーソル表示修正](https://github.com/nuun888/MZ/blob/master/README/MenuStatusAllSelectFix.md) | [NUUN_MenuStatusAllSelectFix](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_MenuStatusAllSelectFix.js) |  | 1.0.0 |
|  |  |  |  |
|  |  |  |  |

| 競合対策、他作プラグイン対応　　　　　 | プラグイン　プラグイン数3　　　　　　　　　　 | 　　　　　　　　　　　　　　 | Ver |
| ---------- | ------------- | ------------- | -------- |
| ゲージ、名前疑似３Dバトル併用パッチ | [NUUN_ButlerGaugeNameIn3DBattle](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ButlerGaugeNameIn3DBattle.js) |  | 1.0.0 |
| バトルスタイル拡張疑似３Dバトル併用パッチ | [NUUN_BattleStyleEXInMPP_Pseudo3DBattle](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleStyleEXInMPP_Pseudo3DBattle.js) |  | 1.1.0 |
| [バトルスタイル拡張スピードスターバトル併用](https://github.com/nuun888/MZ/blob/master/README/BSEX_Animation_KK_SSBattle.md) | [NUUN_BSEX_Animation_KK_SSBattle](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BSEX_Animation_KK_SSBattle.js) |  | 1.0.0 |
| [経験値ゲージ](https://github.com/nuun888/MZ/blob/master/README/ExpGauge.md) | [NUUN_ExpGauge](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ExpGauge.js) |  | 1.0.1 |
|  |  |  |  |
|  |  |  |  |










