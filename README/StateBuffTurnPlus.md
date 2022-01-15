# [ステート、バフターン数増減特徴](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StateBuffTurnPlus.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StateBuffTurnPlus.js)  

ステート、バフの効果ターンが増加、減少する特徴を設定できます。

## 設定方法
特徴を持つメモ欄  
`<StateTurn[stateId]:[turn]>` 指定のステートのターンが[Turn]増加します。  
`<BuffTurn[BuffId]:[turn]>` 指定のバフのターンが[Turn]増加します。  
`<DebuffTurn[BuffId]:[turn]>` 指定のデバフのターンが[Turn]増加します。  
`[stateId]`:ステートID  
`[BuffId]`:バフID 0:HP 1:MP 2:攻撃力 3:防御力 4:魔法力 5:魔法防御 6:敏捷性 7:運  
`[turn]`:±ターン数  
`<StateTurn4:2>` ステート４番のターンが２ターン増加します。  
`<BuffTurn3:3>` 攻撃力上昇のバフの効果が３ターン増加します。  
`<DebuffTurn5:-2>` 魔法力低下のデバフの効果が２ターン減少します。  
加算ターンと付与するターンのターンが0を下回った場合は最低１ターン効果が適用されます。  

## 更新履歴
2022/1/15 Ver.1.0.0  
初版
