# [複数属性](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_MultiElement.js)
# Ver.1.1.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_MultiElement.js)  

#### 必須プラグイン
[共通処理](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_Base.js)  

アイテム、スキルに複数の属性を設定できます。  

## 設定
アイテム、スキルのメモ欄  
`<multElement:[id],[id],....>` データベースの設定属性に加えて属性ID[id]番の属性を持ちます。  
`[id]`:属性ID  
`<multElement:5>` 属性ID5番の属性を持ちます。  
`<multElement:5,6>` 属性ID5番と6番の複数属性を持ちます。  

`<multElementRate[id]:[rate]>` 指定の属性を付加する確率を設定します。  
`[id]`:属性ID  
`[rate]`:付加される確率  

## 更新履歴
2023/7/1 Ver.1.1.0  
付加する属性に確率を設定できる機能を追加。  
日本語以外での表示を英語表示に変更。  
2021/11/7 Ver.1.0.1  
一部の処理の修正。  
2021/8/8 Ver.1.0.0  
初版  
