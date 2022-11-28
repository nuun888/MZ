# [先制、不意打ちEX](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_PreemptiveSurpriseEx.js)
# Ver.1.1.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_PreemptiveSurpriseEx.js)  
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  


先制不意打ちを独自の式で定義できます。  
またイベントでのエンカウントでも先制不意打ちを適用することができます。  

以下のプラグインと併用することでプレイヤーとイベントの向きによって先生、不意打ちを設定できます。  
[トリガー起動時のプレイヤーとイベントの向き状況取得](https://github.com/nuun888/MZ/blob/master/README/EventPlayerDirection.md)  

## 設定
敵グループのバトルイベントの１ページ目に注釈(Comment)で記入  
`<Presur:[id]or[name]>`  
`[id]`:先制不意打ちのリストID  
`[name]`:先制不意打ちリストの指定の名称  

#### 評価式の取得変数  
`members`:パーティメンバー  
`troop`:敵グループ  
`this`:BattleManager  

取得変数  
`$gameParty.preemptiveCounter`:先制攻撃した回数。  
`$gameParty.surpriseCounter`:不意打ちされた回数。  

ランダムエンカウントの場合上記のタグがない敵グループはデフォルト設定の判定になります。  
イベント判定では通常の処理になります。  

通常のエンカウント時、先制攻撃時、不意打ち時にそれぞれスクリプトを設定できます。  
スクリプトは複数設定できます。  
通常のエンカウント時、先制攻撃時、不意打ち時で別々のエンカウントエフェクトなどを設定できます。  
コンボボックスの  
`EncounterEffect.setType(1);//MPP_EncounterEffectタイプ変更`  
`EncounterEffect.setColor(255,255,255);//MPP_EncounterEffectカラー変更`  
は木星ペンギン様のエンカウント特殊演出(MPP_EncounterEffect Ver.4.0以降)が必要です。  

## 更新履歴
2022/11/28 Ver.1.1.0  
通常エンカウント時、先制時、不意打ち時に任意のスクリプトを実行できる機能を追加。  
必ず先制、不意打ちを実行できるスイッチを追加。  
イベントの先制、不意打ちを有効にできるスイッチを追加。  
先制された回数、不意打ちされた回数を取得できる機能を追加。  
2022/7/31 Ver.1.0.0  
初版  
