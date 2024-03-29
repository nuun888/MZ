# [踏み止まり特徴](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StoppingFeature.js)
# Ver.1.3.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StoppingFeature.js)

戦闘中のダメージでHPが2以上から0になったときに、戦闘不能にならずHPが1で止まる特徴を設定できます。  
HPが1の時は踏み止まりが発生しません。  
条件付きベースプラグインと併用することで、特定の条件で踏み止まる特徴を設定できます。

### 設定
#### 特徴を有するメモ欄  
`<Stopping:[rate], [ratio]>`　踏み止まる特徴を設定します。  
[rate]：発動確立  
[ratio]：発動するダメージ前のHPの割合。残りHPが指定したHPの割合以上なら発動します。  
`<Stopping:100, 30>` HPが３０％以上で戦闘不能になったとき１００％の確率でダメージが１で踏み止まります。  
`<StoppingValue:[rate], [hp oe more]>` 指定のHP以上で発動します。  
[hp oe more]：発動するHPの数値　　
`<MaxStoppingCount:[count]>` 一回の戦闘での踏み止まる回数を指定します。複数存在する場合は最大の有限回数が適用されます。  
[count]:回数  

以下の設定は条件付きベースプラグインが必要です。  
`<Stopping:[rate], [ratio], [condMode]>`  
[condMode]：条件付きベースプラグインでの条件指定時のモード　※省略可能  
`<StoppingValue:[rate], [hp oe more], [condMode]>` 指定のHP以上で発動します。
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

`<ResetStoppingCount>` 踏み止まりの回数をリセットします。  

### 更新履歴
2023/12/2 Ver.1.3.0  
発動できる回数を設定できる機能を追加。  
発動確率を評価式に設定する方式に変更。  
2023/10/14 Ver.1.2.0  
固定値以上で発動できる機能を追加。  
HPが2以上の時に発動するように修正。  
2023/6/22 Ver.1.1.1  
処理の修正。  
2023/6/21 Ver.1.1.0  
踏み止まった時に指定のステートを解除する機能を追加。  
2021/11/18 Ver.1.0.0  
初版  
