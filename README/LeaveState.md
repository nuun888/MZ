# [離脱ステート](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_LeaveState.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_LeaveState.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

見方が戦闘から離脱するステートを制作できます。  

仕様  
敵に対して離脱させることは出来ません。  
複数の離脱ステートに対して離脱者リストは同一になります。  
離脱ステート以外で離脱した場合、パーティの復帰は出来ません。  

## 設定
ステートのメモ欄  
`<LeaveState:[SE]>` 離脱ステートを設定します。  
`[SE]`:離脱時SEのID  

スキル、アイテムのメモ欄  
`<ComebackSkill>` 離脱したバトラーを呼び戻します。  

敵キャラのメモ欄  
`<LeaveActionCond[id]:[cond]>` 指定のスイッチIDに対応する敵の行動条件設定を設定します。  
`[id]`:敵の行動条件設定で設定しているスイッチID  
`[cond]`:行動条件 この条件が優先されます。  

## 更新履歴  
2025/8/8 Ver.1.0.0  
初版  
