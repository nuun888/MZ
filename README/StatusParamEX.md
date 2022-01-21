# [アクターパラメータの最大値設定](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StatusParamEX.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StatusParamEX.js)  

アクターの能力値に上限を授けます。デフォルトでは能力値の上限はInfinity（無限）となっています。このプラグインではあえて上限値を設定することが出来ます。

## 設定方法
アクターごと、職業ごとに最大値を設定できます。  
アクター又は職業のメモ欄  
<MaxLimitHP:[param]> 最大HP  
<MaxLimitMP:[param]> 最大MP  
<MaxLimitTP:[param]> 最大TP  
<MaxLimitATK:[param]> 最大攻撃力  
<MaxLimitDEF:[param]> 最大防御力  
<MaxLimitMAG:[param]> 最大魔法力  
<MaxLimitMAT:[param]> 最大魔法防御  
<MaxLimitAGI:[param]> 最大敏捷性  
<MaxLimitLUK:[param]> 最大運  
-1と設定することで無限（コアスクリプトの上限値）となります。  
複数設定されている場合は、一番最大値が高い値が適用されます。

## 更新履歴
2022/1/22 Ver.1.0.0  
初版  
