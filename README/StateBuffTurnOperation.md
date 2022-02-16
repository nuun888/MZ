# [ステート、バフターン操作アイテム、スキル](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StateBuffTurnOperation.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StateBuffTurnOperation.js)  

付与されているステート、バフのターンを増減させるアイテム、スキルを設定できます。

## 設定方法
アイテム、スキルのメモ欄
`<StateTurnOperations:[turn]>` 現在付与されているステートの残りターンを全て増減させます。  
`<StateTurnOperations[stateId]:[turn]>` 指定したステートの残りターンを増減させます。  

`<BuffTurnOperations:[turn]>` 現在付与されている強化バフの残りターンを全て増減させます。  
`<BuffTurnOperations[BuffId]:[turn]>` 指定した強化バフの残りターンを増減させます。  

`<DebuffTurnOperations:[turn]>` 現在付与されている弱体バフの残りターンを全て増減させます。  
`<DebuffTurnOperations[BuffId]:[turn]>` 指定した弱体バフの残りターンを増減させます。  
`[stateId]`:ステートID  
`[BuffId]`:バフID 0:HP 1:MP 2:攻撃力 3:防御力 4:魔法力 5:魔法防御 6:敏捷性 7:運  
`[turn]`:±ターン数  

`<StateTurnOperations:2>` 付与されているステートの残りターンが全て2ターン加算されます。  
`<StateTurnOperations5:-2>` 付与されているステートID5番のステートの残りターンが全て2ターン減算されます。  
`<BuffTurnOperations2:3>` 攻撃力上昇時の残りターンが3ターン加算されます。  

## 更新履歴
2022/2/16 Ver.1.0.0  
初版  
