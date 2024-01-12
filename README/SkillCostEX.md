# [スキルコスト拡張](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SkillCostEX.js)
# Ver.1.3.2
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SkillCostEX.js)  
[スキルコスト表示拡張](https://github.com/nuun888/MZ/blob/master/README/SkillCostShowEX.md)  

スキルコストにさまざまなコストを設定できます。  

## 設定方法
### HP消費スキル
`<SkillHPCost:[cost]>` コストとしてHPを消費します。  
`<SkillHPCostMR:[rate]>` コストとして最大HPの割合（百分率）％を消費します。  
`<SkillHPCostR:[rate]>` コストとして残りHPの割合（百分率）％を消費します。  
`<HPCostDead>` 消費による戦闘不能を許可します。  
### MP消費スキル
`<SkillMPCost:[cost]>` コストとしてMPを消費します。  
`<SkillMPCostMR:[rate]>` コストとして最大MPの割合（百分率）％を消費します。  
`<SkillMPCostR:[rate]>` コストとして残りMPの割合（百分率）％を消費します。  
`<MPCostNoMcr>` ＭＰ消費率の効果を適用しません。  
### TP消費スキル
`<SkillTPCostR:[rate]>` コストとして残りTPの割合（百分率）％を消費します。  
### 所持金消費スキル
`<SkillGoldCost:[cost]>`　コストとして所持金を消費します。  
`<SkillGoldCostR:[rate]>` コストとして所持金の割合（百分率）％を消費します。  
### 経験値消費スキル
`<SkillExpCost:[cost]>` コストとして経験値を失います。  
`<SkillLavelExpCost>` 現在のレベルの獲得経験値から消費させます。  
`<SkillExpCostR:[rate]>` 次のレベルの経験値までの獲得経験値の割合（百分率）％を消費します。  
### アイテム消費スキル
`<SkillItemCost:[itemType],[itemId],[num],[mode]>` コストとしてアイテム、武器、防具を消費します。  
`[itemType]`:アイテムタイプ　I アイテム　W 武器　A 防具  
`[itemId]`:アイテム、武器、防具ID  
`[num]`:消費個数  
`[mode]`:装備品を含む　0:含まない 1:含む  
`[mode]`は装備アイテムを装備する場合有効です。所持していない場合は装備している武器、防具から消費されます。  
### 装備品消費スキル
複数指定する場合はすべてのアイテムがある場合、使用することができます。  
`<SkillEquipCost:[itemType],[itemId],[num]>` コストとして装備中の武器、防具を消費します。  
`[itemType]`:アイテムタイプ　W 武器　A 防具  
`[itemId]`:武器、防具ID  
`[num]`:0で消費なし、1で消失  
### ゲーム変数から消費
`<SkillVarCost:[id],[cost]>` ゲーム変数に設定した数値から消費します。  
`<SkillVarCostR:[id],[max],[rate]>` ゲーム変数に設定した数値から[max]の[rate]%を消費します。  
[max]が0の場合は、現在の値から[rate]%を消費します。  
### 評価式
`<SkillEvalCost:[eval]>` 消費を判定するための評価式を記入します。   
`<SkillEvalCons:[eval]>` 消費するための評価式を記入します。  
  
`[cost]`:消費コスト（固定値）  
`[rate]`:割合（百分率）％  
`[itemType]`:アイテムタイプ　I アイテム　W 武器　A 防具  
`[itemId]`:アイテム、武器、防具ID  
`[num]`:消費個数  
`[id]`:ゲーム変数ID  
`[eval]`:評価式  
`[max]`:最大値
※[]は記入しないでください。

### 取得パラメータ
`this.consBHp`:消費前の発動者のHPを格納します。  
`this.consBMp`:消費前の発動者のMPを格納します。  
`this.consBTp`:消費前の発動者のTPを格納します。  
`this.consBGold`:消費前の発動者の所持金を格納します。  
`this.consBExp`:消費前の発動者の現レベルの獲得経験値を格納します。  
  
スキルのダメージの計算式にa.consBMp * 1.5 と記入することで消費前のMPの1.5倍のダメージを与えることができます。  

### 消費しない特徴
特徴を有するメモ欄  
`<NoConsumptionCost[id]:±[rate]>` 消費しない確率を指定します。  
`[id]`:  
 1:MP 2:TP 3:HP 4:Gold  
`[rate]`:消費無効率(±)　初期値は0です。  

## 更新履歴
2024/1/13 Ver.1.3.2  
スキルコスト倍率調整プラグインでMP、TP以外でも機能するように対応。  
2023/7/23 Ver.1.3.1  
HP、Goldが消費しない問題を修正。  
2023/7/13 Ver.1.3.0  
MP、TP、HP、Goldを確率で消費しない機能を追加。  
2023/7/9 Ver.1.2.4  
HPが0の時にスキルが選択できなくなる問題を修正。  
2023/2/19 Ver.1.2.3  
アイテム消費で所持していない場合は装備している武器、防具を消失する機能を追加。  
装備消費で条件を指定しない場合に、装備が消費されない問題を修正。  
2023/2/15 Ver.1.2.2  
条件一致で装備している装備を消失するコストを設定できる機能を追加。  
2022/12/17 Ver.1.2.1  
微修正  
2022/12/4 Ver.1.2.0  
ゲーム変数から割合で消費できるコストを追加。  
2022/11/25 Ver.1.1.1  
MPのスキルコストを追加。(コストを10000以上設定できます)  
日本語以外での表示を英語表示に変更。  
2022/4/2 Ver.1.1.0  
装備中の武器、防具を消費して発動するスキルを設定できる機能を追加。  
2021/12/5 Ver.1.0.0  
初版
