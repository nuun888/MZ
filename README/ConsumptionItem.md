# [アイテム消耗率](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ConsumptionItem.js)
# Ver.1.1.1
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ConsumptionItem.js)


アイテムに一定の確率で消費するアイテムを作ることが出来ます。
また、消耗する確率を軽減できる特徴を設定できます。

### 設定方法
#### アイテムのメモ欄  
`<ConsumptionRate:[rate]>` アイテムの消耗率を設定します。  
[rate]:消耗確率  
`<ConsumptionRate:50>` アイテム使用時に50%の確率で消費します。

`<ConsumptionMessage:[Text]>` 戦闘時のアイテム消耗時に表示するメッセージ（ログ）を表示します。  
[Text]:表示メッセージ（ログ）  
%1：使用者名  
%2：アイテム名  

`<ConsumptionSE:[name],[volume],[pitch],[pan]>` アイテム消耗時に再生するSEを指定します。  
[name]:ファイル名（拡張子なし）  
[volume]:音量  
[pitch]:ピッチ  
[pan]:位相  

#### 特徴を持つメモ欄
`<ConsumptionRatio:[ratio]>` 消耗する確率を軽減します。  
[ratio]：補正消耗率  
`<ConsumptionRatio:70>` 消耗率が70%されます。消耗率50%のアイテムは35%の確率で消耗します。  
このタグが有効なのはアイテムはConsumptionRateのタグが設定されたアイテムのみ適用されます。  
`<ConsumptionRate:100>`と設定することで通常の消費アイテムでも消耗率が軽減する特徴があれば、確率で消耗するステート等などを作ることができます。  
なお、複数のキャラにこの特徴がある場合、マップ上ではパーティメンバーの中で一番軽減率の高い数値で判定します。  
戦闘中では使用者の軽減率で判定します。  

### 更新履歴
2021/11/6 Ver.1.1.1  
消耗時のデフォルトのSEを設定出来る項目を追加。  
消耗率を軽減出来る特徴を設定できる機能を追加。  
2021/11/3 Ver.1.1.0  
メッセージのフォーマットを変更。  　　
2020/12/31 Ver.1.0.0  
初版
