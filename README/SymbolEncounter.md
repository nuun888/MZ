# [シンボルエンカウント](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SymbolEncounter.js)
# Ver.1.0.4
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SymbolEncounter.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)Ver.1.6.3以降  
[イベント接触判定拡張](https://github.com/nuun888/MZ/blob/master/README/EventRange.md)  
#### オプション
シンボルエンカウントで不意打ち、先制を行う場合以下のプラグインを使用する場合、2つのプラグインを一緒に導入してください。  
[先制、不意打ちEX](https://github.com/nuun888/MZ/blob/master/README/PreemptiveSurpriseEx.md)  
[トリガー起動時のプレイヤーとイベントの向き状況取得](https://github.com/nuun888/MZ/blob/master/README/EventPlayerDirection.md)  

シンボルエンカウントシステムを実装します。  

## 設定
イベントのメモ欄  
`<SymbolEncEnemy:[id]>` このタグがあるイベントはシンボルエンカウントとなります。  
`[id]`:シンボルエンカウント設定ID  

### プラグインパラメータ
#### 視認範囲
`<SymbolEncFindRange:besideRange,[lx],[rx]>`  
指定した横方向の範囲内の接触判定を拡大します。向きは無視されます。  
`[lx]`:イベントの接触左側範囲(正の数の整数)  
`[ry]`:イベントの接触右側範囲(正の数の整数)  

`<SymbolEncFindRange:verticalRange,[uy],[dy]>`  
指定した縦方向の範囲内の接触判定を拡大します。向きは無視されます。  
`[ux]`:イベントの接触上側範囲(正の数の整数)  
`[dy]`:イベントの接触下側範囲(正の数の整数)  

`<SymbolEncFindRange:frontRange,[range]>`  
指定したイベントからの真正面の範囲までの接触判定を拡大します。  
`[range]`:接触範囲(整数)  

`<SymbolEncFindRange:range,[x],[y]>`  
指定した範囲を中心に接触判定を拡大します。4と記入した場合はイベントを中心に±2マスの範囲(5マス)でトリガーが起動します。  
`[x]`:イベントの接触横範囲(偶数の正の数の整数)  
`[y]`:イベントの接触縦範囲(偶数の正の数の整数)  

`<SymbolEncFindRange:rangeEX,[x1],[y1],[x2],[y2],[x3],[y3],[x4],[y4]>`  
イベントから指定した範囲内の接触判定を拡大します。  
イベント座標より左、上を指定する場合はそのまま負の数で記入してください。  
`[x1]`:イベントの接触範囲点AX座標(整数)  
`[y1]`:イベントの接触範囲点AY座標(整数)  
`[x2]`:イベントの接触範囲点BX座標(整数)  
`[y2]`:イベントの接触範囲点BY座標(整数)  
`[x3]`:イベントの接触範囲点CX座標(整数)  
`[y3]`:イベントの接触範囲点CY座標(整数)  
`[x4]`:イベントの接触範囲点DX座標(整数)  
`[y4]`:イベントの接触範囲点DY座標(整数)  
 
`<SymbolEncFindRange:circle,[range],[rad]>`  
指定した半径からの接触判定を拡大します。角度を指定することで正面から角度に応じて接触判定を拡大します。  
`[range]`:接触範囲(整数)  
`[rad]`:角度(0～180°)※省略可　省略時は360°  

`<SymbolEncFindRange:triangle,[range],[rad]>`  
指定した認識範囲に対して、正面からの角度に応じて接触判定を拡大します。  
`[range]`:正面からの接触範囲(整数)  
`[rad]`:角度(0～180°)  

#### 逃走条件  
e:このイベント  
m:パーティメンバー  
p:プレイヤー  
`"true"`:常に逃げ出します。  
`"$gameParty.partyAveLevel() > 10"`:戦闘メンバーのレベル平均が10以上なら逃げ出します。  
`"$gameParty.partySymbolEncState(id)"`:戦闘メンバーの誰かが指定のステートに掛かっていれば逃げ出します。  
空欄、または`"false"`で逃走を行いません。  


イベント１ページ目に探索時の設定を行います。  
出現条件が一致しないと出現しなくなります。  
オプション、プライオリティは全ページ共通になります。(個別設定時は無効)  
自立移動は探索時の設定になります。  
トリガーはプレイヤーとイベントが接触したときに戦闘モードに移行します。(自動実行、並列処理以外設定)  

#### 個別設定
各ページのイベントの実行内容に注釈で記入  
各処理を独自に設定します。()は()内のトリガーで設定されます。  
`<SymbolEncMode:[mode]>`  
`[mode]`  
0:探索  
1:発見時(並列実行)  
2:追跡  
3:退避  
4:戦闘(自動実行)  
5:見失う(並列実行)  
6:勝利(並列実行)  
7:逃走成功(並列実行)  
8:所定位置に戻る  

追跡、退避、所定位置を個別設定している場合は接触時にイベントページ1の実行内容は実行されず現在のイベントページの実行内容が実行されます。  

### プラグインコマンド
通常のモード移行を無視し指定のモードに移行することができます。  

### スクリプト  
`this.getSymbolEncSpeed()`  
シンボルエンカウントの現在の速度を返します。  

`this.getSymbolEncMode()`  
シンボルエンカウントの現在のモードIDを返します。  
 
`this.getSymbolEncDefeat()`  
シンボルエンカウントの現在のモードが撃破時か返します。  

## 更新履歴
2025/5/5 Ver.1.0.4  
ダッシュ反応を指定しているとエラーが出る問題を修正。  
2023/4/29 Ver.1.0.3  
プレイヤーを見失った時の処理が正しく行われていなかった問題を修正。  
2023/2/17 Ver.1.0.2  
無敵状態を設定しても連続で戦闘が開始してしまう問題を修正。  
ページが該当しなかったときに初期化するように修正。  
シンボルエンカウンターを表示しないスイッチを追加。  
2023/2/12 Ver.1.0.1  
同一シンボルと再戦闘時に先制不意打ちが実行されなくなる問題を修正。  
2023/2/7 Ver.1.0.0  
初版  
