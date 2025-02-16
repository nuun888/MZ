# [会心力](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_CriticalPower.js)
# Ver.1.1.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_CriticalPower.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

会心力を実装します。  
通常の会心攻撃の倍率に乗算されます。  
会心効果率、会心防御率はいずれも乗算で計算されます。  

## 設定
会心力は特殊能力値扱いになります。  
特徴を有するメモ欄  
`<CrpEffectRate:[rate]>`   
[rate]:会心効果率(整数)  
`<CrdEffectRate:[rate]>` 
[rate]:会心防御率(整数)  

スキル、アイテムのメモ欄
`<CrpDamageFormula:[Formula]>` アイテム、スキルごとの会心ダメージの式を設定します。

取得パラメータ
`damage`:ダメージ  
`subject`:攻撃実行者  
`target`:対象  
以下のパラメータはsubject.またはtarget.の後に記入します。  
`crp`:会心効果率  
`crd`:会心防御率  
例  
`subject.crp`  
`target.crd`  

## 更新履歴  
2025/2/16 Ver.1.1.0
アイテム、スキルごとに会心ダメージの式を設定できる機能を追加。  
会心防御率を追加。  
会心効果率のタグ説明の誤表記を修正。  
2024/9/17 Ver.1.0.0   
初版  
