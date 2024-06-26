# [バトルスタイル拡張設定用](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleStyleEX.js)
# Ver.1.6.3
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleStyleEX.js)
#### 必須プラグイン
[バトルスタイル拡張ベース](https://github.com/nuun888/MZ/blob/master/README/BattleStyleEXBase.md)  
#### 競合パッチ
木星ペンギン様の疑似３Dバトルと併用するときのパッチです。  
[バトルスタイル拡張疑似３Dバトル併用パッチ](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleStyleEXInMPP_Pseudo3DBattle.js)  
ケケー様のスピードスターバトルと併用しフロントビューでアニメーションを表示するためのパッチです。  
[バトルスタイル拡張スピードスターバトル併用](https://github.com/nuun888/MZ/blob/master/README/BSEX_Animation_KK_SSBattle.md)  

戦闘レイアウト及び一部仕様を変更、拡張します。  
このプラグインはレイアウト設定用のプラグインです。  
バトルスタイルを変更するには「NUUN_BattleStyleEX_Base」をこのプラグインよりも下に配置してください。  

## 設定方法
### 表示モードを指定
デフォルト  
![画像](img/BattleStyleEX4.png)  

MVスタイル  
![画像](img/BattleStyleEX3.png)  

XPスタイル  
![画像](img/BattleStyleEX2.png)  

### フロントビューでのエフェクト
フロントビューでアニメーション、ダメージエフェクトを表示には「フロントビューエフェクト表示」をONにしてください。
ダメージポップアップがステータスに隠れて見えづらい場合は、「ダメージエフェクトX座標」「ダメージエフェクトY座標」で調整してください。
![画像](img/BattleStyleEX5.png)  

### アクター画像設定
アクターの画像設定の画像設定から設定します。立ち絵、顔グラEXを導入している場合は立ち絵表示EX用画像設定で設定してください。  
なお立ち絵、顔グラEX導入時に立ち絵表示EX用画像設定でのアクターの設定は必ず設定してください。画像が表示されません。  
※以下はバトルスタイル拡張設定用での設定方法です。  
アクターの画像は特定の条件下で変化させることができます。  
 * 戦闘不能時（画像未設定、戦闘不能時アクター画像非表示ONの場合は画像が透明になります)  
 * 瀕死時
 * ダメージ時
 * 回復時
 * 詠唱時
 * 攻撃時
 * 回復スキル使用時
 * アイテム使用時
 * 勝利時
 * 非ステート時

デフォルトの立ち絵画像設定が設定されていない場合は顔グラが表示されます。  
インデックス番号は顔グラのインデックス番号です。

#### ステートでの画像変更
※以下はバトルスタイル拡張設定用での設定方法です。  
ステートでのアクターの画像を変更するにはステートに以下のタグを設定します。  
ステートのメモ欄  
`<ChangeImgId:[id]>`  
[id]:変化ID  
`<ChangeImgId:1>`  
被ステート時に顔グラまたは、グラフィック画像が変化ID１の画像に変化します。  
![画像](img/BattleStyleEX1.png)   
プロパティIDは適用する画像の優先度を指定します。数値が高いほど優先的に表示されます。  

#### 立ち絵、顔グラEXで画像設定
表示する画像の座標、表示範囲、拡大率を設定します。

### ステータス設定
アクターステータスのHP、MP、TP、TPB、ステート、顔グラ、名前の位置を変更できます。  
それぞれ変更するステータスの座標変更の許可をONに設定してください。  

### 敵攻撃時のデフォルトアニメーション
敵キャラのメモ欄  
`<AttackAnimation:[id]>` 敵の通常攻撃時のアニメーションを指定します。  
[id]:アニメーションID  
`<AttackAnimation:11>`  
敵キャラの通常攻撃時、11番のアニメーションが再生されます。  

## 更新履歴
