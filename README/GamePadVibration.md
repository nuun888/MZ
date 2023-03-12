# [ゲームパッド振動](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_GamePadVibration.js)
# Ver.1.0.1
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_GamePadVibration.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

X Inputでのゲームパッドを振動させるためのプラグインです。  

## 設定
プラグインコマンドで振動を実行します。  
#### 開始ディレイ
振動を開始するまでのディレイ(フレーム数)を指定します。  

#### 振動フレーム数
振動するフレーム数を指定します。  

#### 高周波ランブル強度
高周波 (弱い) ランブル モーターのランブル強度を指定します。(0.0～1.0)  

#### 低周波ランブル強度
低周波 (強い) ランブル モーターのランブル強度を指定します。(0.0～1.0)  

#### スクリプトから指定
`NuunManager.sprictGamePadVibration(StartDelay, Duration, WeakMagnitude, StrongMagnitude)`  
バトルスタイル拡張プラグインでの開始ディレイもフレーム数指定になります。  

## 更新履歴 
2023/3/12 Ver.1.0.1  
振動を開始する設定をミリ秒からフレーム数に変更。  
スクリプトから容易に指定できるように対応。  
2023/2/26 Ver.1.0.0  
初版。  
