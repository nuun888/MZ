# [レーダーチャートベース](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_RadarChartBase.js)
# Ver.1.2.2
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_RadarChartBase.js)  
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  
#### 対応プラグイン
[ステータス表示拡張](https://github.com/nuun888/MZ/blob/master/README/StatusScreen.md)  
[モンスター図鑑](https://github.com/nuun888/MZ/blob/master/README/EnemyBook.md)  

レーダーチャートを実装するためのベースプラグインです。  

## 設定
職業のメモ欄  
`<ChartStatusId:[id]>` ステータス最大値設定のIDを指定します。レーダーチャートのステータスは表示最大値から一番近いステータスを元に表示されます。  
指定がない場合はプラグインパラメータ「ステータス最大値設定」の一番上のIDの設定が適用されます。  
`[id]`:ステータス最大値設定のID  

## 更新履歴
2025/8/8 Ver.1.2.2  
アイコン、パラメータ名を両方表示できるように修正。  
2025/8/2 Ver.1.2.1  
数値に評価式を適用できるように修正。  
属性、ステートの耐性率に耐性、弱点による文字色を変更できるように修正。  
2025/7/20 Ver.1.2.0  
ステータスのレーダーチャート機能を追加。  
レーダーチャートの最大表示値を設定できる機能を追加。  
耐性値の表示を修正。  
2025/6/5 Ver.1.1.0  
数値を表示する機能を追加。  
2022/2/6 Ver.1.0.2  
カラーコード指定により定義追加。  
2022/1/12 Ver.1.0.1  
マイナスになると表示が不自然になるため修正。  
2021/7/18 Ver.1.0.0  
初版  
