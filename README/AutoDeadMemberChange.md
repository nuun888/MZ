# [戦闘不能メンバー自動交代](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AutoDeadMemberChange.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AutoDeadMemberChange.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

メンバーが戦闘不能になった時に自動でメンバーを交代します。  

## 設定
### 戦闘不能毎に交代
有効化している場合、味方が戦闘不能毎に交代します。メンバーの交代は、1行動終了後に行います。  
無効化している場合は、メンバーが全滅時に交代します。  
メンバーに固定アクターなどが存在する場合、交代除外アクターで設定を行う必要があります。  
デフォルトでは全滅時に交代になっておりますので戦闘不能毎に交代する場合は、戦闘不能毎に交代に指定のスイッチIDを指定してtureに設定してください。  

### 交代除外アクター
メンバー交代から除外します。  
`actor.isFixed()`NUUN_ActorFixedで設定を行っている固定アクター  
`actor.isBattleFixed()`NUUN_SceneFormationで設定を行っている戦闘メンバーから外せないメンバー  

## 更新履歴
2025/4/29 Ver.1.0.0  
初版  
