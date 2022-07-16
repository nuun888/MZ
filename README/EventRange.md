# [イベント接触判定拡張](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EventRange.js)
# Ver.1.2.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_EventRange.js)  
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  
#### 拡張プラグイン
[場所範囲移動](https://github.com/nuun888/MZ/blob/master/README/RangeTransfer.md)    
  
## 概要
イベントの接触判定を拡張します。  

## 設定
#### メモ欄またはイベントの実行内容の注釈(Comment)  
※前者は全EVページに適用されます。後者は記入したページの時に適用します。  

`<EventRange:besideRange,[lx],[rx]>`指定した横方向の範囲内の接触判定を拡大します。  
`[lx]`:イベントの接触左側範囲(正の数の整数)  
`[ry]`:イベントの接触右側範囲(正の数の整数)  
例:`<EventRange:range,3,2>`  
![画像](img/NUUN_EventRange6.png)  

`<EventRange:verticalRange,[uy],[dy]>`指定した縦方向の範囲内の接触判定を拡大します。  
`[ux]`:イベントの接触上側範囲(正の数の整数)  
`[dy]`:イベントの接触下側範囲(正の数の整数)  
例:`<EventRange:range,2,2>`  
![画像](img/NUUN_EventRange7.png)  

`<EventRange:frontRange,[range]>`指定したイベントからの真正面の範囲までの接触判定を拡大します。  
[range]:接触範囲(整数)  
例:`<EventRange:frontRange,3>`  
![画像](img/NUUN_EventRange8.png)  

`<EventRange:range,[x],[y]>` 指定した範囲を中心に接触判定を拡大します。4と記入した場合はイベントを中心に4マスの範囲(９マス)でトリガーが起動します。  
`[x]`:イベントの接触横範囲(偶数の正の数の整数)  
`[y]`:イベントの接触縦範囲(偶数の正の数の整数)  
例:`<EventRange:range,4,4>`  
![画像](img/NUUN_EventRange1.png)  

`<EventRange:rangeEX,[x1],[y1],[x2],[y2],[x3],[y3],[x4],[y4]>` イベントから指定した範囲内の接触判定を拡大します。  
イベント座標より左、上を指定する場合はそのまま負の数で記入してください。  
`[x1]`:イベントの接触範囲点AX座標(整数)  
`[y1]`:イベントの接触範囲点AY座標(整数)  
`[x2]`:イベントの接触範囲点BX座標(整数)  
`[y2]`:イベントの接触範囲点BY座標(整数)  
`[x3]`:イベントの接触範囲点CX座標(整数)  
`[y3]`:イベントの接触範囲点CY座標(整数)  
`[x4]`:イベントの接触範囲点DX座標(整数)  
`[y4]`:イベントの接触範囲点DY座標(整数)  

接触判定をひし形にする。  
例:`<EventRange:rangeEX,0,-2,2,0,0,2,-2,0>`  
![画像](img/NUUN_EventRange2.png)  

`<EventRange:circle,[range],[rad]>` 指定した半径からの接触判定を拡大します。角度を指定することで正面から角度に応じて接触判定を拡大します。  
`[range]`:接触範囲(整数)
`[rad]`:角度(0～180°)※省略可　省略時は360°  

接触半径を円にする。  
例:`<EventRange:circle,2>`  
![画像](img/NUUN_EventRange3.png)  
接触半径を正面から90°の範囲  
例:`<EventRange:circle,2,90>`  
![画像](img/NUUN_EventRange4.png)  

`<EventRange:triangle,[range],[rad]>` 指定した認識範囲に対して、正面からの角度に応じて接触判定を拡大します。  
`[range]`:正面からの接触範囲(整数)  
`[rad]`:角度(0～180°)  
接触判定を三角形にする。(正面からの角度)   
例:`<EventRange:triangle,3,90>`  
![画像](img/NUUN_EventRange5.png)  

実行内容に注釈(Comment)は、ページ毎の接触範囲となります。現在の条件になっているページの接触範囲となります。  
イベントのメモ欄と注釈(Comment)に同時に記入がある場合、注釈のタグが優先されます。  

#### レイヤー距離X変数ID、イベントプレイヤー距離Y変数ID  
接触拡張を持つイベント実行時にイベントからプレイヤーまでの距離を代入する変数を指定します。  
プレイヤーがイベントより左、上にいる場合はマイナス座標が代入されます。  

※画像の色付けしている部分は、画像表示用に接触範囲を視覚化するために表示しているためなので、エディタ、ゲーム上では表示されません。  

## 更新履歴
2022/7/16 Ver.1.3.0
イベントページ毎に範囲を指定できる機能を追加。  
接触範囲にイベントの真正面からの範囲内を追加。  
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
