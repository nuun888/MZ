# [盗みスキル](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StealableItems.js)
# Ver.1.3.1

敵からアイテム、お金を盗むアイテム、スキルまたは、敵からアイテム、お金を盗まれるアイテム、スキルを設定できます。

### 設定方法
#### 敵の盗めるアイテムの設定
敵のメモ欄  
\<steal [itemType]:[id], [rate]> 盗めるアイテムを設定します。  
[itemType]：アイテムタイプ　I アイテム　W 武器　A 防具　M 金額  
[id]:アイテム、武器、防具のID  
[rate]：確率  

\<steal I:5, 100>  
５番のアイテムを１００％の確率で盗むことができます。  
\<steal W:22, 60>  
２２番の武器を６０％の確率で盗むことができます。  
\<steal A:13, 13>  
１３番の武器を１３％の確率で盗むことができます。  
\<steal M:300, 100>  
１００％の確率で３００G盗むことができます。  

以下の設定は条件付きベースプラグインが必要です。  
\<steal [itemType]:[id], [rate], [condTag], [condMode]>　条件が一致すればアイテムを盗めます。  
[condTag]：条件タグ　条件付きベースが必要です。  
[condMode]：条件モード ※省略可能　条件付きベースが必要です。0:一部一致 1:全て一致  

条件付き盗めるアイテム
\<Steal[condTag]:[id],[id],[id]...> 盗みスキル発動者が指定したIDの条件を満たしたときに盗めます。  
\<TargetSteal[condTag]:[id],[id],[id]...> 盗み対象が指定したIDの条件を全て満たしたときに盗めます。  
\<PartySteal[condTag]:[id],[id],[id]...> パーティメンバーの指定したIDの条件を全て満たしたときに盗めます。  
\<TroopSteal[condTag]:[id],[id],[id]...> 敵グループの指定したIDの条件を全て満たしたときに盗めます。  
[mode]：条件モード　0:一部一致 1：全て一致  
[id]：条件リストのID  

\<steal I:5, 100, cond1, 0>  
\<StealCond1: 1,14,15>  
発動者が条件リストID1,14,15番が一致したときに条件を満たしときに１００％の確率でID５番のアイテムを盗めます。

#### 盗みスキル、アイテムの設定
アイテム、スキルのメモ欄  
\<stealSkill:[rate]> 盗みアイテム、スキルを設定します。アクター、敵両方で設定できます。  
 [rate]:成功率  
\<stealSkill:80> ８０％の確率でアイテムを盗めます。  

\<goldStealSkill:[rate]>　お金を盗むアイテム、スキルを設定します。  アクター専用です。
[rate]:成功率  
\<goldStealSkill:50> ５０％の確率でお金を盗めます。  
※敵の所持金からは盗めません。

\<goldStealSkill:[rate],[gold]> お金を盗むスキルを設定します。敵専用です。  
[rate]:成功率  
[gold]:盗める金額  

\<goldStealSkillRate:[gold],[goldRate]>　お金を割合で盗むスキルを設定します。敵専用です。  
[rate]:成功率  
[goldRate]:盗める金額割合  
\<goldStealSkill:100, 400> 100%の確率で400Ｇ奪われます。  
\<goldStealSkillRate:70, 30> 70%の確率で所持金の30%が奪われます。  

#### 盗み成功率
特徴を有するメモ欄  
<steal_sr: [±追加確率]> 盗みの成功率が加算増減します。  
<steal_sr_Percent: [%追加確率]> 盗みの成功率が割合増減します。  
[±追加確率]:増減値  
[%追加確率]:増減する割合（正数で記入）  

#### 盗み抵抗
<stealResist: [%確率]> 盗まれる確率を軽減します。  
[%確率]:盗まれる軽減率（正数で記入）  

#### 敵から盗まれるアイテムを設定
敵から盗まれるアイテムを設定するには、プラグインパラメータの「敵から奪われるアイテム設定」から設定します。
### 盗まれるアイテムID
盗まれるアイテムを指定します。武器、防具は設定できません。
### 重み
盗まれるアイテムの頻度を指定します。数値が高い程盗まれやすくなります。
### スイッチ
盗まれるアイテム条件のスイッチ番号を指定します。

### 取得パラメータ
アイテムを盗んだ回数。  
 $gameSystem._stealCount  
 $gameSystem.getBattleSteal()  
 
 お金を盗んだ合計金額。  
 $gameSystem._stealGoldSum  
 $gameSystem.getBattleStealGold()  
 
 アイテムを盗まれた回数。  
 $gameSystem._stolenCount  
 $gameSystem.getBattleStolen()  
 
 お金を盗まれた合計金額。  
 $gameSystem._stolenGoldSum  
 $gameSystem.getBattleStolenGold()  
