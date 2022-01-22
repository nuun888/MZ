# [地域名](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_RegionMapName.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_RegionMapName.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

場所によってマップ名が変わる地域名を表示します。  
地域名はリージョンIDによりマップ名が変わります。  

## 設定方法
設定方法はマップの設定のメモ欄での設定またはプラグインパラメータから設定します。  
両方設定してある場合はマップの設定が適用されます。  

マップの設定のメモ欄  
`<RegionMapName[regionId]:[MapName]>` 指定したリージョンID内の地域名を設定します。  
`[regionId]`:リージョンID  
`[MapName]`:マップ名  
`<RegionMapName6:'ジャングル'>` プレイヤーがリージョンID６番の場所に入ったときに、マップ名をジャングルに変更します。  

地域名は設定したリージョンID内のみマップ名が変更します。指定のリージョンIDから外れた場合は元のマップ名または別の地域名が表示されます。  

## 更新履歴
2022/1/22 Ver.1.0.0  
初版  
