# [スリップダメージ拡張](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SlipDamageEX.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SlipDamageEX.js)  
## 必須、前提プラグイン
[ステート経過ターンカウント](https://github.com/nuun888/MZ/blob/master/README/StateTurnCount.md)  

スリップダメージに独自の式を定義できます。  
式は割合値になるように指定してください。  

## 設定方法
`<SlipDamageHP:[eval]>` HPのスリップダメージを設定します。  
`<SlipDamageMP:[eval]>` MPのスリップダメージを設定します。  
`<SlipDamageTP:[eval]>` TPのスリップダメージを設定します。  
`[eval]`:評価式  
b:バトラーゲームデータ  
db:バトラーのデータベースデータ  
st:ステートのターン  
例  
`<SlipDamageHP:-10>` 毎ターンごとに10%の割合のダメージを受けます。  
`<SlipDamageHP:-10 * st>` 毎ターンごとに10%加算した割合のダメージを受けます。  
`<SlipDamageMP:10 * st>` 毎ターンごとに10%加算した割合で回復します。  
`<SlipDamageHP:Math.pow(3, st) * -1>` 毎ターンごとに3%ずつスリップダメージが倍化します。  

ステートの経過ターンを取得するには[ステート経過ターンカウント](https://github.com/nuun888/MZ/blob/master/README/StateTurnCount.md)が必要です。

## 更新履歴
2022/1/16 Ver.1.0.1  
経過ターンの処理を別プラグイン化。  
2022/1/11 Ver.1.0.0  
初版  
