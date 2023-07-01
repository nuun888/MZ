# [属性吸収特徴](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ElementAbsorb.js)
# Ver.2.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ElementAbsorb.js)  

属性を吸収する特徴を設定できます。  
※Ver.1.0.1以前と設定方法が異なります。  

## 設定
特徴を有するメモ欄  
`<absorbElement[elementId]:[rate]>` 吸収する属性を設定します。  
`[elementId]`:属性ID  
`[rate]`:有効度(1以上整数で指定)  

`<absorbElementBoost[elementId]:[rate]>` 吸収効果率を設定します。  
`[elementId]`:属性ID 省略した場合、全ての属性で適用されます。  
`[rate]`:属性の吸収率を増減させます。(1以上で整数で指定) 乗算処理  

### 同一属性属性有効度処理設定
#### 絶対値最大値優先
通常の属性と吸収属性の絶対値が高いほうが適用されます。  
#### 吸収優先
吸収属性があれば一番低い(吸収効果率の高い)属性が適用されます。  
#### 加算
通常の属性と(吸収属性-100%)との差で適用されます。  

## 更新履歴
7/1/2023 Ver.2.0.0  
吸収属性の設定方法を変更。  
吸収効果率の機能を追加。  
2021/8/9 Ver.1.0.1  
吸収する属性にリスト設定していないIDを指定した場合エラーが出る問題を修正。  
2021/8/9 Ver.1.0.0  
初版  
