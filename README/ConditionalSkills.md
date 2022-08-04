# [条件付きアイテム、スキル示](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ConditionalSkills.js)
# Ver.1.1.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ConditionalSkills.js)  
#### 必須、前提プラグイン
[条件付きベース](https://github.com/nuun888/MZ/blob/master/README/Base.md)

スキル、アイテムに使用条件を設定できます。  
【属性】【攻撃】【ダメージ】【使用アイテム、スキル】【反撃、魔法反射】及び敵の対象は設定できません。  
敵グループ指定の場合戦闘中のみ条件判定します。  

## 設定方法
スキル。アイテムのメモ欄  
`<ConditionalSkill:[id],[id],[id]...>` 指定したIDの条件を全て満たしたときに使用可能です。  
`<TargetConditionalSkill:[id],[id],[id]...>` 対象に対し、指定したIDの条件を全て満たしたときに使用可能です。戦闘中は判定されません。  
`<PartyConditionalSkill:[id],[id],[id]...>` パーティメンバーの指定したIDの条件を全て満たしたときに使用可能です。  
`<TroopConditionalSkill:[id],[id],[id]...>` 敵グループの指定したIDの条件を全て満たしたときに使用可能です。  
敵グループは戦闘中のみ判定します。  
`[id]`:条件付きベースの適用条件のリストID  
`<MatchMode:[modeId]>`  
[modeId]:0 いずれかが一致　1：全て一致  
未記入の場合はいずれかが一致の場合条件を満たしたときになります。  
移動時の使用者は薬の知識が一番高いキャラになります。  

## 更新履歴
2022/8/4 Ver.1.1.0  
対象を条件に指定できるように修正(移動時のみ)。  
2021/11/12 Ver.1.0.1  
条件付きベースの条件付きベースの定義変更による条件タグの設定方法を変更。  
2021/9/13 Ver.1.0.0  
初版  
