# [敵グループの個別ＢＧＭ](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleBGM.js)
# Ver.1.1.0
 [ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleBGM.js)

敵グループごとに戦闘BGMを設定できます。

### 設定方法
敵グループのバトルイベントの１ページ目に忠作で記入（フロー制御の一番下のコマンド）  

`<battleBGMN:[name],[eval]>`  [name]で指定したBGMが再生されます。※[eval]は省略できます。  
`<battleBGMId:[id],[eval]>` [id]で指定したリストの[id]番目のBGMが再生されます。※[eval]は省略できます。  
`<battleBGMR:[id],[id],[id]...>`  設定した[id]のBGMのうち一つがランダムに再生されます。条件指定をしたい場合は下のタグを記入します。  
`<battleBGMREval:[id],[id],[id]...,[eval]>`  [eval]がtrueの場合に、設定した[id]のBGMのうち一つがランダムに再生されます。  
[name]:ファイル名（拡張子なし）  
[id]:リストId  
[eval]:再生条件（評価式）  

以下は直接ファイルを指定する方法です。リストに設定しなくても再生できます。  
`<battleBGM:[name],[volume],[pitch],[pan],[eval]>` [name]で指定したBGMが再生られます。  
※[eval]は省略できます。  
[name]:ファイル名（拡張子なし）  
[id]:リストId  
[volume]:音量  
[pitch]:ピッチ  
[pan]:位相  
[eval]:再生条件（評価式）  

条件付きのBGMはなるべく優先度の高い順に上から記入してください。  
仕様上、一番最初に再生可能な条件が一致したときのBGMが再生されます。  

#### BGM変更スイッチ
0に設定した場合は、常時このプラグインで設定したBGMが再生されます。  
スイッチを指定した場合は該当のスイッチがONの時にこのプラグインで設定したBGMが再生されます。  

`<battleBGMN:Battle3>`  リスト内にBattle3が設定されていれば、Battle3がBGMが再生られます。  
`<battleBGMR:1,2,3>` リストの１，２，３番目のBGMのうち一つがランダムに再生されます。  
`<battleBGM:Battle2, 90, 100, 0>` Battle2のBGMが音量90、ピッチ100、位相0で再生されます。  
`<battleBGMN:Battle2,$gameSwitches.value(2)>` スイッチ番号２番がTrueでリスト内にBattle2が設定されていれば、Battle2が再生られます。  

### 更新履歴
2022/11/27 Ver 1.1.0  
このプラグインでの設定を有効にするスイッチを設定できる機能を追加。  
日本語以外での表示を英語表示に変更。  
2020/12/1 Ver 1.0.1  
ID指定でBGMを再生できる機能を追加。  
2020/11/27 Ver 1.0.0  
初版  

