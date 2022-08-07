# [行動制限TPB初期化無効ステート](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_KeepRestrictedTPB.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_KeepRestrictedTPB.js)  

通常は行動制限があるステートにかかると、TPBゲージが初期化してしまいます。  
このプラグインでは初期化されないステートを作ることができます。  
キャストタイム中に行動制限ステートが付加された場合は行動がキャンセルされます。  

![gif](img/KeepRestrictedTPB.gif)  

## 設定
#### ステートのメモ欄　　
`<RestrictedKeepTpb:[ratio]>` このタグがあるステートはTPBが初期化されません。  
`[ratio]`:付加時のTPB変化割合 ※省略可能  
`<RestrictedKeepTpb>` 初期化無効  
`<RestrictedKeepTpb:50>` 現TPBの50%に減少 複数の場合はさらに乗算  

## 更新履歴
2022/8/7 Ver.1.0.0  
初版  
