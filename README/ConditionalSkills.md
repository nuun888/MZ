# [条件付きアイテム、スキル示](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ConditionalSkills.js)
# Ver.1.2.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ConditionalSkills.js)  
#### 必須、前提プラグイン
[条件付きベース](https://github.com/nuun888/MZ/blob/master/README/Base.md)

スキル、アイテムに使用条件を設定できます。  
【属性】【攻撃】【ダメージ】【使用アイテム、スキル】【反撃、魔法反射】及び敵の対象は設定できません。  
敵グループ指定の場合戦闘中のみ条件判定します。  

## 設定方法
スキル。アイテムのメモ欄  
`<ConditionalSkill[Num]:[id],[id],[id]...>` 指定したIDの条件を全て満たしたときに使用可能です。  
`<TargetConditionalSkil[Num]l:[id],[id],[id]...>` 対象に対し、指定したIDの条件を全て満たしたときに使用可能です。戦闘中は判定されません。  
`<PartyConditionalSkill[Num]:[id],[id],[id]...>` パーティメンバーの指定したIDの条件を全て満たしたときに使用可能です。  
`<TroopConditionalSkill[Num]:[id],[id],[id]...>` 敵グループの指定したIDの条件を全て満たしたときに使用可能です。  
敵グループは戦闘中のみ判定します。  
`[Num]`:識別ID (最初の識別IDは記入しません。ConditionalSkillと記入します)。  
つ目以降の条件は識別IDを2から開始します。ConditionalSkill2  
`[id]`:条件付きベースの適用条件のリストID  
`<MatchMode:[modeId]>`  
`[Num]`:識別ID (最初の識別IDは記入しません。MatchModeと記入します)。  
2つ目以降の条件は識別IDを2から開始します。MatchMode2  
[modeId]:0 いずれかが一致　1：全て一致  
未記入の場合はいずれかが一致の場合条件を満たしたときになります。  
移動時の使用者は薬の知識が一番高いキャラになります。  

...ConditionalSkill2だけを指定しても条件が適用されません。
複数の条件のいずれかが一致したときに適用されます。
例
`<TargetConditionalSkill:3,6>`
`<TargetConditionalSkill2:4,8>`
`<MatchMode:1>`
対象の条件ID3,6が全て一致または対象の条件4,8のいずれかが一致したときに適用されます。

## 更新履歴
2022/8/4 Ver.1.1.0  
対象を条件に指定できるように修正(移動時のみ)。  
2021/11/12 Ver.1.0.1  
条件付きベースの条件付きベースの定義変更による条件タグの設定方法を変更。  
2021/9/13 Ver.1.0.0  
初版  
