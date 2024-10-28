# [アクターステータスの最大値設定](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StatusParamEX.js)
# Ver.1.0.3
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StatusParamEX.js)  
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

アクターの能力値に上限を授けます。デフォルトでは能力値の上限はInfinity（無限）となっています。  
このプラグインではあえて上限値を設定することが出来ます。

## 設定方法
アクターごと、職業ごとに最大値を設定できます。  
アクター又は職業のメモ欄  
`<MaxLimitHP:[param]>` 最大HP  
`<MaxLimitMP:[param]>` 最大MP  
`<MaxLimitTP:[param]>` 最大TP  
`<MaxLimitATK:[param]>` 最大攻撃力  
`<MaxLimitDEF:[param]>` 最大防御力  
`<MaxLimitMAT:[param]>` 最大魔法力  
`<MaxLimitMDF:[param]>` 最大魔法防御  
`<MaxLimitAGI:[param]>` 最大敏捷性  
`<MaxLimitLUK:[param]>` 最大運  
-1と設定することで無限（コアスクリプトの上限値）となります。  
複数設定されている場合は、一番最大値が高い値が適用されます。

## 更新履歴
2024/10/28 Ver.1.0.3  
最大魔法力、最大魔法防御の設定方法の誤字を修正。  
2022/1/22 Ver.1.0.2  
戦闘中にエラーが出る問題を修正。  
2022/1/22 Ver.1.0.1  
デフォルト値が正しく取得できない問題を修正。  
ゲーム開始時にエラーが出る問題を修正。  
2022/1/22 Ver.1.0.0  
初版  
