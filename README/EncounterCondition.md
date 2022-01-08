# [エンカウント条件](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EncounterCondition.js)
# Ver.1.2.1
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EncounterCondition.js)  
#### 対応プラグイン  
[条件付きベース](https://github.com/nuun888/MZ/blob/master/README/ConditionsBase.md)  

敵グループに対してエンカウント条件を付けます。  
## 設定方法
敵グループの１ページ目に注釈(comment)で以下のタグを記入してください。  
条件が複数の場合、全ての条件に合致した場合のみエンカウント候補になります。  

変数  
`<Enc_Cond:[type],[id],[val][Inequality]>`  
スイッチ  
`<Enc_Cond:[type],[id],[flags]>`  
乗り物  
`<Enc_Cond:[type],[vehicle],[flags]>`  
条件式  
`<Enc_Cond:[type],[code]>`  
条件付きベースでの条件  
`<Enc_Cond:[type], [mode], [condid], [condid], ...>`  

`[type]`:数値で指定  
0:変数　1:スイッチ　2:乗り物　10:評価式 20:条件付きベース条件  
`[id]`:ゲーム変数、スイッチのID(１以上の整数)  
`[val]`:比較する数値（数値)  
`[Inequality]`:不等号  
equal:等しい　greater:より大きい　less:未満　greaterEqual:以上　lessEqual:以下  
`[flags]`:フラグ　trueまたはfalse  
`[vehicle]`:乗り物　boat:小型船　ship:大型船　airship:飛行船　vehicle:乗り物  
`[mode]`:条件モード　0 いずれかが一致　1：全て一致　※要条件付きベース  
`[condid]`:条件付きベースで設定したリストID　※要条件付きベース  

`<Enc_Cond:0, 3, 6, equal>` 変数のID３の値が6と同じ場合、エンカウントします。  
`<Enc_Cond:0, 3, 6, greater>` 変数のID３の値が6より大きい場合、エンカウントします。  
`<Enc_Cond:0, 3, 6, less>` 変数のID３の値が6未満場合、エンカウントします。  
`<Enc_Cond:0, 3, 6, greaterEqual>` 変数のID３の値が6以上場合、エンカウントします。  
`<Enc_Cond:0, 3, 6, lessEqual>` 変数のID３の値が6以下場合、エンカウントします。  
不等号識別がない場合は変数＞値で評価します。  
`<Enc_Cond:1, 3, true>` スイッチのID３がtrueの時、エンカウントします。  
`<Enc_Cond:2, boat, true>` ボートに乗っている場合のみエンカウントします。  
`<Enc_Cond:2, vehicle, false>` 乗り物に乗っていない場合のみエンカウントします。  
`<Enc_Cond:10, 条件式>` 条件式に合致する場合、エンカウントします。  

条件付きベースでの条件はパーティのみの判定になります。

## 更新履歴
2022/1/8 Ver.1.2.1  
新条件定義のスイッチと変数の条件が逆に定義されていた問題を修正。  
2021/12/19 Ver.1.2.0  
条件付きベースによる条件に対応。  
2021/8/5 Ver.1.1.0  
エンカウント条件のタグ記述方式を変更。  
2021/1/4 Ver.1.0.0  
初版  
