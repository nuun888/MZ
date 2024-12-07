# [敵レベル](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyLevel.js)
# Ver.1.0.1
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyLevel.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)Ver.1.7.10以降  

敵にレベルを設定します。  

ステータスが変動するパラメータは以下の通りです。  
最大HP  
最大MP  
攻撃力   
防御力  
魔法力  
魔法防御  
敏捷性  
運  
獲得経験値  
獲得金額  

## 設定
データベースに設定したパラメータがレベル1のステータスになります。  
#### 必須敵のメモ欄
`<EnemyLevel:[Id]>` 敵レベルを適用する設定です。必ず記入して下さい。  
`[Id]`:敵レベル設定のID又は識別名を記入します。  

指定がないモンスターは全てレベル1になります。  

#### 任意
敵のメモ欄  
敵のレベル適用  
`<Level:[level], [variance]>` 戦闘開始時に指定のレベルで開始します。  
`[level]`:レベル  
`[variance]`:分散度  

敵のスキルの習得レベルまたは忘却レベル  
`<EnemyLevelLearnSkill[skillId]:[minlevel],[maxLevel]>` 敵のレベルが[minlevel]以上[maxLevel]以下なら[skillId]が敵の行動に追加されます。  
[maxLevel]は省略できます。その場合、敵のレベルが[minlevel]以上なら[skillId]が敵の行動に追加されます。  
`[skillId]`:スキルID  
`[minlevel]`:習得レベル  
`[maxLevel]`:忘却レベル  
`<EnemyLevelLearnSkill6:13>` スキルID6番のスキルはレベルが13以上の時に敵の行動に追加されます。  
`<EnemyLevelLearnSkill15:10,18>` スキルID15番のスキルはレベルが10以上でレベルが18以下の時に敵の行動に追加されます。  

マップのメモ欄  
`<MapEnemyLevel[EnemyId]:[level], [variance]>` 戦闘開始時に指定のレベルで開始します。  
`[EnemyId]`:敵ID  
`[level]`:レベル  
`[variance]`:分散度  

## モンスター図鑑(NUUN_EnemyBook)への適用
表示項目設定にレベルを指定することで表示されます。敵の情報、アナライズのみ  
図鑑モードでは現在開いているマップでのステータスが表示されます。  
変動ステータスを表示させたくない場合は各項目を削除してください。  

他作者様のモンスター図鑑プラグインへの競合サポートは行いませんのでご了承ください。  

## 更新履歴
2024/12/7 Ver 1.0.1  
モンスター図鑑でレベルステータス、分散を無効にする機能を追加。  
2024/11/9 Ver 1.0.0  
初版
