# [サポートアクター呼び出し](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_CallSupportActor.js)
# Ver.1.1.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_CallSupportActor.js)
### 必須プラグイン
[サポートアクター](https://github.com/nuun888/MZ/blob/master/README/SupportActor.md)  

サポートアクターを呼び出すスキル、アイテムを設定できます。  

## 設定方法
#### スキル、アイテムのメモ欄
`<CallSupportActor:[actorId],[turn],[deadCallActor]>` サポートアクターを呼び出します。  
`[actorId]`:アクターID  
`[turn]`:呼び出しターン　-1 無制限　-2 戦闘終了まで  
`[deadCallActor]`:1 呼び出し者が戦闘不能になった場合、ターン終了時に戦闘から離脱します。0 指定なし  

`<CallSupportActorId:[id]>` サポートアクターを呼び出します。  
`[id]`:プラグインパラメータの設定リストのIDまたは識別名  

## 更新履歴
2024/12/8 Ver.1.1.0  
サポートアクター2.0.0更新による修正。  
2022/3/29 Ver.1.0.2  
一部の関数が重複していたため修正。  
2022/3/28 Ver.1.0.1  
サポートアクター更新により定義変更。  
2021/12/25 Ver.1.0.0  
初版
