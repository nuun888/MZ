# [立ち絵、顔グラ表示EX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ActorPicture.js)
# Ver.1.2.5
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ActorPicture.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  
#### 対応プラグイン
[バトルスタイル拡張](https://github.com/nuun888/MZ/blob/master/README/BattleStyleEX.md)  
[ステータス表示拡張](https://github.com/nuun888/MZ/blob/master/README/StatusScreen.md)  
[メンバー変更画面](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SceneFormation.js)  
[リザルト](https://github.com/nuun888/MZ/blob/master/NUUN_Result.md)  
[メニュー画面タイプ１](https://github.com/nuun888/MZ/blob/master/README/MenuScreen.md)  
[メニュー画面タイプ２](https://github.com/nuun888/MZ/blob/master/README/MenuScreen_2.md)  
[XP風対象選択ウィンドウ](https://github.com/nuun888/MZ/blob/master/README/XPSelectWindow.md)

立ち絵、顔グラの表示を条件により自動的に変更します。  
スイッチがON、特定の武器を装備、特定の防具を装備、特定のステート、特定の職業、ダメージ時、攻撃時、勝利時などの時にアクターの立ち絵、顔グラを自動的に変更できます。  

## 設定方法
全条件一致の条件がすべて一致したときに画像が表示されます。  
設定していない条件は判定されずtrueを返します。  
立ち絵、顔グラ表示の優先度は上から判定して最初に条件が一致した設定が適用されます。  
条件付きの立ち絵、顔グラ設定はリストの上のほうに設定してください。

### 変化シーン
選択した条件を選択します。
ステートのみステートIDを指定します。

## 各プラグインでの設定
座標、拡大率の設定は各プラグインの立ち絵表示EX用画像設定で設定してください。
### バトルスタイル拡張
バトルスタイル拡張では立ち絵表示EX用画像設定で設定しないと、このプラグインでの設定が適用されませんので必ず各アクターの設定をしてください。

### ステータス表示拡張、メンバー変更画面
ステータス表示拡張では立ち絵表示EX用画像設定での設定なしでも適用されます。

## 更新履歴
2022/3/24 Ver 1.2.5  
ステート条件が取得できなかった問題を修正。  
画像指定の仕様を変更。  
2022/1/8 Ver 1.2.4  
説明文を修正。  
ステートによる変化が適用されない問題を修正。  
2021/12/15 Ver 1.2.3  
一部処理の修正。  
2021/12/12 Ver 1.2.2  
インデックスIDに-1を設定できるように変更。（-1:デフォルトのインデックスID）  
2021/12/11 Ver 1.2.1  
顔グラのインデックスIDが正常に取得できない問題を修正。  
2021/12/11 Ver 1.2.0  
立ち絵の設定方法を再度変更。  
ステータス表示拡張に対応。  
2021/7/15 Ver 1.1.1  
アイテム使用時の画像が取得できなかった問題を修正。  
2021/7/12 Ver 1.1.0  
プラグインパラメータの仕様を大幅に見直し。  
戦闘を行うとセーブが出来なくなる問題を修正。  
2021/4/20 Ver 1.0.1  
プラグイン導入後に戦闘を開始するとエラーが出る問題を修正。  
2021/3/26 Ver 1.0.0  
初版  
