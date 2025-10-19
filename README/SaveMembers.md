# [パーティメンバーの保存、呼び出し](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SaveMembers.js)
# Ver.1.0.6   
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SaveMembers.js)  
#### 必須プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

指定のパーティの並び順をパーティを登録、呼び出しする機能を実装します。  

デフォルトのキー操作  
登録パーティの消去 登録パーティ画面でQ（Oageup）キー  

## NUUN_SceneFormationから表示
この機能を行うには別途 [NUUN_SceneFormation](https://github.com/nuun888/MZ/blob/master/README/SceneFormation.md)Ver.2.1.3以降が必要です。  
当プラグインのSceneFormation登録画面表示をtrueに設定することでNUUN_SceneFormationからQキー(デフォルト)で開くことが出来ます。  

## 更新履歴
2025/10/19 Ver.1.0.6  
表示アクター数を1以上に設定した場合に、セーブメンバー画面を表示するとエラーが出る問題を修正。  
2025/5/23 Ver.1.0.5  
戦闘中のウィンドウの座標を指定できる機能を追加。(NUUN_SceneFormation使用時)  
2025/5/5 Ver.1.0.4  
戦闘中に登録メンバーウィンドウがずれて表示される問題を修正。  
戦闘中にパーティ登録画面を表示するときに、メンバー変更画面が閉じ、アクターコマンドがアクティブ化する問題を修正。  
2025/5/4 Ver.1.0.3  
NUUN_SceneFormation(Ver.2.1.4以降)で戦闘中に実行できる機能を追加。  
2025/4/24 Ver.1.0.2  
NUUN_SceneFormation(Ver.2.1.3以降)で登録パーティ画面を開けるように修正。  
登録パーティ消去のボタンを追加。  
メンバー選択を開くと登録時SEが再生される問題を修正。  
登録時SEが設定されていない場合、ブザー音が再生される問題を修正。  
2025/4/20 Ver.1.0.1  
登録パーティがいない状態で決定キーを押すとエラーが出る問題を修正。  
登録時のSEを設定できる機能を追加。  
2025/4/19 Ver.1.0.0  
初版。  
