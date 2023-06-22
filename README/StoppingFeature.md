# [踏み止まり特徴](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StoppingFeature.js)
# Ver.1.1.1
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StoppingFeature.js)

戦闘中のダメージで0になったときに、確率で戦闘不能にならずHPが１で止まる特徴を設定できます。    
条件付きベースプラグインと併用することで、特定の条件で踏み止まる特徴を設定できます。

### 設定
#### 特徴を有するメモ欄  
`<Stopping:[rate], [ratio]>`　踏み止まる特徴を設定します。  
[rate]：発動確立  
[ratio]：発動するダメージ前のHPの割合。残りHPが指定したHPの割合以上なら発動します。  
`<Stopping:100, 30>` HPが３０％以上で戦闘不能になったとき１００％の確率でダメージが１で踏み止まります。  

以下の設定は条件付きベースプラグインが必要です。  
`<Stopping:[rate], [ratio], [condMode]>`  
[condMode]：条件付きベースプラグインでの条件指定時のモード　※省略可能  

`<StoppingCond:[id], [id], [id]...>` 攻撃したバトラーが指定したIDの条件を満たしたときに発動。  
`<TargetStoppingCond:[id], [id], [id]...>` 撃破されたバトラーが指定したIDの条件を満たしたときに発動。  
`<PartyStoppingCond:[id], [id], [id]...>` パーティメンバーが指定したIDの条件を満たしたときに発動。  
`<TroopStoppingCond:[id], [id], [id]...>` 敵グループのメンバーが指定したIDの条件を満たしたときに発動。  

`<StoppingEraseState:[stateId]>` 踏み止まり成功時に指定のステートを解除します。  
[stateId]:ステートID  
 
#### スキル、アイテムのメモ欄
`<InvalidStopping:[rate]>` スキル、アイテムは踏み止まりを無効化します。  
[rate]：無効にする確立  
`<InvalidStopping:50>` 50％の確率で踏み止まりを無効化します。  

### 更新履歴
2023/6/22 Ver.1.1.1  
処理の修正。  
2023/6/21 Ver.1.1.0  
踏み止まった時に指定のステートを解除する機能を追加。  
2021/11/18 Ver.1.0.0  
初版  
