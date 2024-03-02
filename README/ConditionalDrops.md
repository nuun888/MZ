# [条件付きドロップ](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ConditionalDrops.js)
# Ver.1.0.9
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ConditionalDrops.js)
### 必須プラグイン
[条件付きベース](https://github.com/nuun888/MZ/blob/master/README/ConditionsBase.md)  

条件によりドロップするアイテムを設定できます。  

## 設定方法
敵のメモ欄  
`<CondDropItem:[item],[id],[rate],[condNameTag],[CondMode]>`  
`[item]`:I:アイテム W：武器 A：防具  
`[id]`：アイテムID  
`[rate]`：確率  
`[condNameTag]`：任意の条件タグ名（省略可）省略した場合はCondが指定されます。  
`[condMode]`：条件モード（省略可）0:一部一致 1:全て一致  

`<Drop[condNameTag]:[id],[id],[id]...>` 攻撃して倒したアクターが指定したIDの条件を満たしたときにドロップします。  
`<TargetDrop[condNameTag]:[id],[id],[id]...>` 倒された敵が指定したIDの条件を全て満たしたときにドロップします。  
`<PartyDrop[condNameTag]:[id],[id],[id]...>` パーティメンバーの指定したIDの条件を全て満たしたときにドロップします。  
`<TroopDrop[condNameTag]:[id],[id],[id]...>` 敵グループの指定したIDの条件を全て満たしたときにドロップします。  
`[id]`:条件付きベースの適用条件のリストID

例  
`<CondDropItem:I,16,50,cond1>` 条件cond1が一致したときにアイテム番号16番のアイテムが５０％の確率でドロップします。  
`<DropCond1:1>`上記の条件を参照するためのタグでリスト番号１番の条件を判定します。  

## 更新履歴
2024/3/2 Ver.1.0.9  
微修正。  
2022/6/14 Ver.1.0.8  
競合対策。  
2021/12/25 Ver.1.0.7  
モンスター図鑑の不具合修正による処理を追加。  
2021/12/22 Ver.1.0.6  
モンスター図鑑に表示させるための処理を追加。  
2021/12/20 Ver.1.0.5  
条件付きアイテムが正常に取得できない問題を修正。  
2021/11/28 Ver.1.0.4  
条件モードが機能していなかった問題を修正。  
2021/11/27 Ver.1.0.3  
[condNameTag]を省略したときの文字列がも違っていたのを修正。  
2021/11/12 Ver.1.0.2  
条件付きベースの定義変更による条件タグの設定方法を変更。  
ターゲットデータが取得できない問題を修正。  
2021/10/24 Ver.1.0.1  
条件タグにスペースを入れると条件が判定されない問題を修正。  
2021/10/22 Ver.1.0.0  
初版  
