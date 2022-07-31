# [先制、不意打ち独自定義](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_PreemptiveSurpriseEx.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_PreemptiveSurpriseEx.js)  

先制不意打ちを独自の式で定義できます。  
またイベントでのエンカウントでも先制不意打ちを適用することができます。  

## 設定
敵グループのバトルイベントの１ページ目に注釈(Comment)で記入  
`<Presur:[id]or[name]>`  
`[id]`:先制不意打ちのリストID  
`[name]`:先制不意打ちリストの指定の名称  

#### 評価式の取得変数  
members:パーティメンバー  
troop:敵グループ  
this:BattleManager  

ランダムエンカウントの場合上記のタグがない敵グループはデフォルト設定の判定になります。  
イベント判定では通常の処理になります。  

## 更新履歴
2022/7/31 Ver.1.0.0  
初版  
