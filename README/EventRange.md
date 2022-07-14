# [イベント接触判定拡張](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EventRange.js)
# Ver.1.2.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EventRange.js)  
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  
#### 拡張プラグイン
[場所範囲移動](https://github.com/nuun888/MZ/blob/master/README/RangeTransfer.md)    

イベントの接触判定を拡張します。  

## 設定
イベントのメモ欄  

`<EventRange:besideRange,[lx],[rx]>`  
`[lx]`:イベントの接触左側範囲  
`[ry]`:イベントの接触右側範囲  
例:`<EventRange:range,3,2>`  
![画像](img/NUUN_EventRange6.png)  

`<EventRange:verticalRange,[uy],[dy]>`  
`[ux]`:イベントの接触上側範囲  
`[dy]`:イベントの接触下側範囲  
例:`<EventRange:range,2,2>`  
![画像](img/NUUN_EventRange7.png)  

`<EventRange:range,[x],[y]>` 指定した範囲を中心に接触判定を拡大します。4と記入した場合はイベントを中心に4マスの範囲(９マス)でトリガーが起動します。  
`[x]`:イベントの接触横範囲(偶数)  
`[y]`:イベントの接触盾範囲(偶数)  
例:`<EventRange:range,4,4>`  
![画像](img/NUUN_EventRange1.png)  

`<EventRange:rangeEX,[x1],[y1],[x2],[y2],[x3],[y3],[x4],[y4]>` イベントから指定した範囲内の接触判定を拡大します。  
イベント座標より左、上を指定する場合はそのまま負の数で記入してください。  
`[x1]`:イベントの接触範囲点AX座標  
`[y1]`:イベントの接触範囲点AY座標  
`[x2]`:イベントの接触範囲点BX座標  
`[y2]`:イベントの接触範囲点BY座標  
`[x3]`:イベントの接触範囲点CX座標  
`[y3]`:イベントの接触範囲点CY座標  
`[x4]`:イベントの接触範囲点DX座標  
`[y4]`:イベントの接触範囲点DY座標  

接触判定をひし形にする。  
例:`<EventRange:rangeEX,0,-2,2,0,0,2,-2,0>`  
![画像](img/NUUN_EventRange2.png)  

`<EventRange:circle,[h],[rad]>` 指定した半径からの接触判定を拡大します。角度を指定することで正面から角度に応じて接触判定を拡大します。  
`[h]`:認識範囲
`[rad]`:角度(0～180°)※省略可　省略時は360°  

接触半径を円にする。  
例:`<EventRange:circle,2>`  
![画像](img/NUUN_EventRange3.png)  
接触半径を正面から90°の範囲  
例:`<EventRange:circle,2,90>`  
![画像](img/NUUN_EventRange4.png)  

`<EventRange:triangle,[h],[rad]>` 指定した認識範囲に対して、正面からの角度に応じて接触判定を拡大します。  
`[h]`:正面からの認識範囲  
`[rad]`:角度(0～180°)  
接触判定を三角形にする。(正面からの角度)   
例:`<EventRange:triangle,3,90>`  
![画像](img/NUUN_EventRange5.png)  

※画像の色付けしている部分は、画像表示用に接触範囲を視覚化するために表示しているためなので、エディタ、ゲーム上では表示されません。  

## 更新履歴
2022/7/14 Ver.1.2.0  
接触判定に横長、縦長を追加。  
プレイヤーからイベントまでの距離を代入する変数を指定できる機能を追加。  
2022/7/14 Ver.1.1.1  
円形、三角型の接触判定が正常に機能していなかった問題を修正。  
2022/7/11 Ver.1.1.0  
接触判定を行う範囲を設定する機能を追加。  
接触範囲モードに三角形型を追加。  
2022/7/11 Ver.1.0.0  
初版  
