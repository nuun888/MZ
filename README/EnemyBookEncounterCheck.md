# [モンスター図鑑マップ遭遇チェック](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyBookEncounterCheck.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyBookEncounterCheck.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  
[モンスター図鑑](https://github.com/nuun888/MZ/blob/master/README/EnemyBook.md)  

現在のマップでモンスター図鑑に登録または、情報登録されているモンスター数を取得します。  
マップ上でエンカウントがない場合は-1を返します。  

## 設定
取得はプラグインコマンドから実行し、指定のゲーム変数に代入します。  

#### スクリプト取得変数
`NuunManager.getNotEncounterEnemies([mode], [commonEventID]);`  
`[mode]`:  
'Enc'    未遭遇  
'Status' 情報未登録  
`[commonEventID]`:コモンイベントID 指定しない場合は0  

#### イベントのメモ欄
`<EncTroop:[id],[id]...>` 敵グループIDを記入します。複数入力できます。イベントコマンドで戦闘の処理を行う場合で、ランダムエンカウントと同じ以外でエンカウントさせる場合に使用します。ランダムエンカウントと同じ場合は自動で判別されます。  
`[id]`:敵グループID  
イベントコマンド戦闘の処理で指定している敵グループIDを記入して下さい。  

## 更新履歴
2023/4/3 Ver.1.0.0  
初版  
