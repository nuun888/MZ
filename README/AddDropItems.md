# [ドロップアイテム追加](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AddDropItems.js)
# Ver.1.0.2
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AddDropItems.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

デフォルトでは敵のドロップアイテムは３つまでしか設定できませんが、このプラグインはドロップアイテムを４つ以上設定することが出来ます。  

## 設定方法
敵のメモ欄  
`<DropItem [type]:[id],[rate]>` 追加するドロップアイテムを設定します。追加のドロップアイテムは幾つでも設定できます。  
`[type]`:I アイテム　W 武器　A 防具  
`[id]`:アイテム、武器、防具のID  
`[rate]`:確率の分母を記入します。分子は一律で1です。  
`<DropItem I:13,20>` 設定した敵のドロップアイテムに13番のアイテムがドロップ率1/20の確率追加されます。  
`<DropItem W:18,16>` 設定した敵のドロップアイテムに18番の武器がドロップ率1/16の確率追加されます。  
`<DropItem A:35,32>` 設定した敵のドロップアイテムに35番の防具がドロップ率1/32の確率追加されます。  

## 更新履歴
2022/12/29 Ver.1.0.2  
日本語以外での表示を英語表示に変更。  
2021/10/3 Ver.1.0.1  
メモに設定するときの説明が間違っていた問題を修正。  
2020/12/31 Ver.1.0.0  
初版  
