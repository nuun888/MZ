# バトルスタイル拡張

## バトルスタイル拡張ベース
### Ver.3.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleStyleEX.js)
## 設定用プラグイン
[バトルスタイル拡張デフォルト設定用](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleStyleEX_Default.js)  
[バトルスタイル拡張スタンダード設定用](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleStyleEX_Standard.js)  
[バトルスタイル拡張XPスタイル設定用](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleStyleEX_XP.js)  

バトルスタイル拡張デフォルト設定用  
![画像](img/BattleStyleEX1.png)  

バトルスタイル拡張スタンダード設定用  
![画像](img/BattleStyleEX2.png)  

バトルスタイル拡張XPスタイル設定用  
![画像](img/BattleStyleEX3.png)  

## 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  
  
  
バトルレイアウトをXP風に変更します。  
このプラグインでは他に以下の機能を実装します。  
フロントビューでのアクターへのアニメーション  
立ち絵表示  
条件付き立ち絵切り替え  
ステータスパラメータの表示座標変更  
各ウィンドウの背景画像指定  
コマンドの表示変更  

アクターの顔グラを立ち絵にする場合は、プラグインパラメータのデフォルトアクター画像設定またはアクター画像座標拡大率設定でアクターの画像モードを画像に設定してください。  
アクター画像座標拡大率設定を設定してない場合はのデフォルトアクター画像設定の設定が適用されます。  

アクターの画像設定で条件で顔グラまたは立ち絵を切り替える事ができます。また立ち絵、顔グラ表示EXに対応していますが、プラグインパラメータの立ち絵表示EX適用をONにしてください。  
条件の優先度は上から順に一致した条件が適用されます。通常時に適用される画像は一番下に設定してください。  

各ステータスの座標位置を変更したい場合は、各項目の「〇〇の座標変更」をtureにしてください。  

## 設定方法
敵キャラのメモ欄  
`<AttackAnimation:11>`
敵キャラの通常攻撃時、11番のアニメーションが再生されます。指定がない場合はプラグインパラメータのデフォルト値が適用されます。  

## 競合対策パッチ  
木星ペンギン氏作疑似３Dバトルプラグインと併用して、フロントビューで味方にアニメーションを表示させる場合は別途バトルスタイル拡張疑似３Dバトル併用パッチを導入してください。  
木星ペンギン様の疑似３Dバトルと併用するときのパッチです。  
[バトルスタイル拡張疑似３Dバトル併用パッチ](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleStyleEXInMPP_Pseudo3DBattle.js)  

ケケー氏作スピードスターバトルプラグインと併用して、フロントビューで味方にアニメーションを表示させる場合は別途バトルスタイル拡張スピードスターバトル併用を導入してください。  
ケケー様のスピードスターバトルと併用しフロントビューでアニメーションを表示するためのパッチです。  
[バトルスタイル拡張スピードスターバトル併用](https://github.com/nuun888/MZ/blob/master/README/BSEX_Animation_KK_SSBattle.md)Ver.2.6.10以降  

## 旧バージョン
[バトルスタイル拡張ベース](https://raw.githubusercontent.com/nuun888/MZ/master/oldBS/NUUN_BattleStyleEX_Base.js) Ver.2.6.13  
[バトルスタイル拡張設定用](https://raw.githubusercontent.com/nuun888/MZ/master/oldBS/NUUN_BattleStyleEX.js) Ver.1.6.3  

## 更新履歴
2022/3/24 Ver.3.0.0  
リニューアル版初版  
