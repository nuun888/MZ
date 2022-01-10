# [敵MPゲージ](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyMPGauge.js)
# Ver.1.0.1
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyMPGauge.js)  
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)Ver.1.4.2以降  

敵のバトラー上にMPゲージを表示します。  

![準備中](img/mpGauge1.png)  

### 設定方法

#### MPゲージの座標指定
敵キャラのメモ欄  
`<MPGaugeX:[position]>`MPゲージのX座標を調整します。（相対座標）  
`<MPGaugeY:[position]>` MPゲージのY座標を調整します。（相対座標）  
[position]:座標

バトルイベント1ページ目のの注釈  
`<MPGaugePosition:[Id],[x],[y]>` 敵グループの[Id]番目のモンスターのゲージの位置を調整します。（相対座標）  
[Id]：表示順番号  敵グループ設定で配置した順番のIDで指定します。モンスター画像の左上に番号が表示されますのでその番号を記入します。  
[x]：X座標  
[y]：Y座標  

#### MPゲージの表示
敵キャラのメモ欄  
`<NoMPGauge>` HPゲージを表示しません。  
`<MPGaugeMask:[eval]>` 条件に一致しなければMP値の表示を？？？にします。  
[eval]:評価式  
this 敵データ  
this.enemy() 敵のデータベースデータ  
例`<MPGaugeMask:this.hp < this.mmp * 0.3>`敵のMPが３０％未満の時にMP値を表示します。  

特徴を有するメモ欄  
`<MPGaugeVisible>`この特徴を持つアクターが存在すれば、敵のMPゲージが表示されます。  
`<EnemyMPGaugeVisible>` この特徴を持つ敵はMPゲージが表示されます。  

### 表示のタイミング設定
#### MPゲージ表示タイミング
`常に表示`  
常に表示されます。  
`選択時`  
敵対象選択時に表示します。  
`ダメージ時`   
敵のダメージ時に表示されます。  
`選択時、ダメージ時`  
敵選択時、敵のダメージ時に表示されます。  

#### 初期MPゲージ表示
初期状態でのMPゲージの表示を設定します。MPゲージが特徴によって表示、図鑑登録で表示する場合は非表示にします。

### モンスター図鑑の情報登録を反映
この機能を使用するには[モンスター図鑑](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EnemyBook.js)が必要です。
#### MPゲージ表示タイミング（モンスター図鑑）
初期MPゲージ表示をOFFにする必要があります。MPゲージ表示タイミングによって表示タイミングを指定できます。  
`図鑑登録後に表示`  
図鑑登録後にMPゲージを表示します。  
`図鑑情報登録後に表示`  
図鑑にモンスター情報が登録後にMPゲージを表示します。  

## 更新履歴
2022/1/10 Ver.1.0.1  
ゲージがラベル表示でも座標0から表示されてしまう問題を修正。  
2022/1/12 Ver.1.0.0  
初版  
