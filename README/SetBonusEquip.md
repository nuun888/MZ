# [セットボーナス](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SetBonusEquip.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SetBonusEquip.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

特定の装備と同時に装備したときにセットボーナスを発動させます。  
該当する全ての装備を装備している時に効果が適用されます。  

## 設定方法
適用するセットボーナスのパラメータはデータベースの武器でセットボーナス用のデータを作成します。  

セットボーナス適用元の装備  
 武器、防具のメモ欄  
`<SetBonus:[id], [id]...>` セットボーナスを適用します。  
`[id]`:セットボーナス設定のリスト番号  

#### 仕様
同じ装備のセットボーナスまたは、同じセットボーナスIDは１つまでとなっています。

## 更新履歴
2022/1/22 Ver.1.0.0  
初版  
