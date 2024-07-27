# [アイテム、スキル使用効果コモンイベント実行時に画面を閉じない](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ContinuationItemWindowCommon.js)
# Ver.1.1.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ContinuationItemWindowCommon.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

メニュー画面から使用効果でコモンイベントを実行するアイテム、スキルを使用すると、使用後にウィンドウが自動で閉じてしまいます。  
このプラグインでは登録したコモンイベントを実行してもウィンドウを閉じないようにします。  

## 設定
プラグインパラメータの画面継続コモンイベントで使用効果で画面を閉じないコモンイベントIDを設定します。コモンイベントは複数設定できます。  
リストにないコモンイベントが使用効果で実行されたときは、通常通り画面が閉じます。  

アイテム、スキルのメモ欄(Notes)  
`<CommonContinuation>`:このアイテム、スキルはコモンイベントを実行してもウィンドウが閉じなくなります。  

### 仕様
イベントコマンドのウエイトは非対応です。  

## 更新履歴
2024/7/27 Ver.1.1.0  
指定のアイテム、スキルから実行したコモンイベントでもメニューを閉じないアイテムを設定できる機能を追加。  
2023/7/11 Ver.1.0.1  
処理の修正。  
2023/7/9 Ver.1.0.0  
初版  
