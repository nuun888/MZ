# [行動時ブースト特徴](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_boostEX.js)
# Ver.1.2.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_boostEX.js)

攻撃時に特定の行動によってダメージを補正する効果を得ることができます。

## 設定方法
特徴を有するメモ欄  
`<BoostEX:EL, [Id], [rate]>`  
攻撃時の属性が[Id]の時にダメージを増幅させます。  
`<BoostEX:WT, [Id], [rate]>`  
装備している武器のタイプが[Id]の時にダメージを増減させます。  
`<BoostEX:AT, [Id], [rate]>`  
装備している防具のタイプが[Id]の時にダメージを増減させます。  
`<BoostEX:ITI, [Id], [rate]>`  
アイテム[Id]番のアイテム使用時にダメージを増幅させます。  
`<BoostEX:SKI, [Id], [rate]>`  
スキル[Id]番のスキル使用時にダメージを増幅させます。  
`<BoostEX:PH, [rate]>`  
命中タイプが物理の時にダメージを増幅させます。  
`<BoostEX:MG, [rate]>`  
命中タイプが魔法の時にダメージを増幅させます。  
`<BoostEX:CH, [rate]>`  
命中タイプが必中の時にダメージを増幅させます。  
`<BoostEX:CR, [rate]>`  
クリティカル発生時にダメージを増幅させます。  
`<BoostEX:HE, [rate]>`  
ダメージタイプがHP回復、MP回復の時ににダメージを増幅させます。  
`<BoostEX:IT, [rate]>`  
アイテムを仕様時ににダメージを増幅させます。  
`<BoostEX:CNT, [rate]>`
反撃時にダメージを増幅させます。  
`<BoostEX:MRF, [rate]>`  
魔法反射時にダメージを増幅させます。    
`<BoostEX:SMeta, [tag], [rate]>`  
使用者のメモ欄に以下のタグがある場合にダメージを増幅させます。  
`<BoostEX:TMeta, [tag], [rate]>`  
対象のメモ欄に以下のタグがある場合にダメージを増幅させます。  

以下は条件付きベースが必要です。  
<BoostCond:[rate],[condMode]>  
条件付きベースの条件が一致した時にダメージを増幅させます。  
下記のタグがひとつもない場合はtrueを返します。  
`<CondBoost:[id],[id]....>`   
`<TargetCondBoost:[id],[id]....>`   
`<PartyCondBoost:[id],[id]....>`   
`<TroopCondBoost:[id],[id]....>`   

`[rate]`:増幅率±(整数)  
`[condMode]`：条件モード（省略可）0:一部一致 1:全て一致  

２つ以上該当する場合は加算した合計で算出されます。  
魔法属性+20%と炎属性+30の場合は50%ダメージが増幅されます。  
数値、文字列は[]は括らずに記入してください。　例:`<BoostEX:CNT, [rate]>` → `<BoostEX:CNT, 50>`  

更新履歴
2021/4/2 Ver.1.2.0  
条件にメモ欄に特定のタグが記入してあれば増幅する機能を追加。  
2021/11/13 Ver.1.1.2  
条件付きベースの条件が正常に取得できていなかった問題を修正。  
条件付きベースの定義変更による条件タグの設定方法を変更。  
2021/10/30 Ver.1.1.1  
属性ブーストの特徴を持つバトラーがスキル攻撃したときにエラーが出る問題を修正。  
2021/9/13 Ver.1.1.0  
条件付きベースに対応。  
2021/8/20 Ver.1.0.0  
初版
