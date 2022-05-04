# [敵グループの個別戦闘勝利敗北ME](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleME.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BattleME.js)  

敵グループごとに戦闘勝利敗北MEを設定できます。

### 設定
敵グループのバトルイベントの１ページ目に注釈(Coment)で記入してください。  

#### 戦闘勝利時のME
`<battleVictoryME:[name],[volume],[pitch],[pan],[eval]>` [name]で指定したMEが再生られます。  
※[eval]は省略できます。  

#### 戦闘敗北時のME  
`<battleDefeatME:[name],[volume],[pitch],[pan],[eval]>` [name]で指定したMEが再生られます。  
※[eval]は省略できます。  

`[name]`:MEファイル名（拡張子なし）  
`[volume]`:音量  
`[pitch]`:ピッチ  
`[pan]`:位相  
`[eval]`:再生条件（評価式）  

例
`<battleVictoryME:Victory2, 90, 100, 50>` 勝利時のMEがVictory2になります。  
`<battleDefeatME:Defeat2, 90, 100, 50>` 敗北時のMEがDefeat2になります。  
`<battleVictoryME:Victory3, 90, 100, 50, $gameSwitches.value(3)>` スイッチID３番がTrueの時、勝利時のMEがVictory3になります。  

条件付きのMEはなるべく優先度の高い順に上から記入してください。  
仕様上、一番最初に再生可能なMEが見つかったらそのMEが再生されます。  

## 更新履歴
2020/11/29 Ver 1.0.0  
初版  
