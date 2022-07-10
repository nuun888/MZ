# [イベント接触判定拡張](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EventRange.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EventRange.js)  

イベントの接触判定を拡張します。  

## 設定
イベントのメモ欄  

`<EventRange:range,[x],[y]>` 指定した範囲を中心に接触判定を拡大します。  
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

`<EventRange:circle,[r],[rad]>` 指定した半径からの接触判定を拡大します。角度を指定することで正面から角度に応じて接触判定を拡大します。  
`[r]`:半径  
`[rad]`:角度(0～180°)※省略可　省略時は360°  

接触半径を円にする。  
例:`<EventRange:circle,2>`  
![画像](img/NUUN_EventRange3.png)  
接触半径を正面から90°の範囲  
例:`<EventRange:circle,2,90>`  
![画像](img/NUUN_EventRange4.png)  

## 更新履歴
