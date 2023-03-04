# [装備時ステート適用](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EquipsState.js)
# Ver.1.0.2
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EquipsState.js)  
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)

装備している時のみに適用するステートを設定できます。

## 設定方法
武器、防具のメモ欄  
`<EquipState:[id],[id],[id]...>` ステートを付与させます。  
`<EquipState:4>` 装備している間、ステート4番のステートが付与されます。  
`<EquipState:4,10>` 装備している間、ステート4番、10番のステートが付与されます。  

## 更新履歴
2023/3/4 Ver.1.0.2  
日本語以外での表示を英語表示に変更。  
ステート不可、解除時のメッセージを表示しないように修正。  
2022/2/27 Ver.1.0.1  
装備解除時にステートが解除されない問題を修正。  
2022/2/26 Ver.1.0.0  
初版  
