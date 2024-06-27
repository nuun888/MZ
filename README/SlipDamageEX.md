# [スリップダメージ拡張](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SlipDamageEX.js)
# Ver.1.2.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SlipDamageEX.js)  
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  
[ステート経過ターンカウント](https://github.com/nuun888/MZ/blob/master/README/StateTurnCount.md)  

スリップダメージの機能を拡張します。  
移動時のスリップダメージ時にSE、またはフラッシュの色、無効の設定を行うことができます。  
スリップダメージに独自の式を定義できます。  
式は割合値になるように指定してください。  

## 設定方法
`<SlipDamageHP:[eval]>` HPのスリップダメージを設定します。  
`<SlipDamageMP:[eval]>` MPのスリップダメージを設定します。  
`<SlipDamageTP:[eval]>` TPのスリップダメージを設定します。  
`<SlipDamageFixedHP:[eval]>` HPのスリップダメージを固定値で設定します。  
`<SlipDamageFixedMP:[eval]>` MPのスリップダメージを固定値で設定します。  
`<SlipDamageFixedTP:[eval]>` TPのスリップダメージを固定値で設定します。  
`[eval]`:評価式  
b:バトラーゲームデータ  
db:バトラーのデータベースデータ  
st:ステートのターン  
例  
`<SlipDamageHP:-10>` 毎ターンごとに10%の割合のダメージを受けます。  
`<SlipDamageHP:-10 * st>` 毎ターンごとに10%加算した割合のダメージを受けます。  
`<SlipDamageMP:10 * st>` 毎ターンごとに10%加算した割合で回復します。  
`<SlipDamageHP:Math.pow(3, st) * -1>` 毎ターンごとに3%ずつスリップダメージが倍化します。  
`<SlipDamageFixedHP:-10>` 毎ターンごとに１０のスリップダメージを受けます。  

ステートの経過ターンを取得するには[ステート経過ターンカウント](https://github.com/nuun888/MZ/blob/master/README/StateTurnCount.md)が必要です。

## フラッシュ
フレーム数を0に指定することで移動中のスリップダメージを無効にできます。  

## 更新履歴
2024/6/28 Ver.1.2.0  
移動時のスリップダメージ時にSEを再生する機能を追加。  
移動時のスリップダメージ時のフラッシュの色を指定、フラッシュの再生を無効にする機能を追加。  
2022/2/19 Ver.1.1.1  
Ver.1.0.1以降で移動中にエラーが出る問題を修正。  
2022/1/29 Ver.1.1.0  
スリップダメージに固定値を設定できる機能を追加。  
2022/1/16 Ver.1.0.1  
経過ターンの処理を別プラグイン化。  
2022/1/11 Ver.1.0.0  
初版  
