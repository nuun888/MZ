# [装備ステータス表示拡張](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EquipStatusEX.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EquipStatusEX.js)  
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

装備ステータスの表示を拡張します。  

## 設定
各項目の設定は装備ステータスページ設定で設定します。  
通常能力値の他、HP、MP(数値またはゲージ)、追加能力値、特殊能力値、属性耐性、ステート耐性、独自のパラメータが表示できます。  
ゲージは仕様上差分表示されません。  

表示させる属性、ステートはプラグインパラメータの属性耐性、ステート耐性で設定します。  

当プラグインは、立ち絵、顔グラ表示EXに対応しています。  
立ち絵表示EX適用をOFFにすることで立ち絵、顔グラ表示EX導入時でも、このプラグインの立ち絵設定が適用されます。  
個別に設定する場合は各アクター画像設定の画像X座標、画像Y座標で設定します。  
画像のアクターが表示されている部分を中央に表示させたい場合は各アクター画像設定の画像表示開始座標X、画像表示開始座標Yで設定します。  

APNGを表示するにはNUUN_Base Ver.1.6.0とトリアコンタン様のAPNGピクチャプラグインが必要です。  

## 操作
QWキー:ページ切り替え  
装備コマンドが選択中の時は、アクターが切り替わります。  
装備スロット、アイテム選択中はステータスのページが切り替わります。  

![画像](img/EquipStatusEX1.png)  
![画像](img/EquipStatusEX2.png)  
![画像](img/EquipStatusEX3.png)  


## 更新履歴
2022/11/13 Ver.1.0.0  
初版  
