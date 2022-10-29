# [ステート、バフ残りターン表示](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StateTurn.js)
# Ver.1.1.1
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StateTurn.js)

ステートアイコンに残りターンを表示します。  

![画像](img/StateTurn1.png)   

## 設定方法
#### 表示ターンモード  
'remaining'指定時のデフォルトの補正値は1です。  
'elapsed'指定時はターン数補正を-1に設定してください。  
経過ターンを表示させるには[ステート経過ターンカウント](https://github.com/nuun888/MZ/blob/master/README/StateTurnCount.md)プラグインが必要です。  

## 競合情報
MOG_BattleHudには対応しておりません。  

## 更新履歴
2022/10/29 Ver.1.1.1  
不利、ステート、バフのターン数の文字色を変更できる機能を追加。  
2022/1/21 Ver.1.1.0  
ステートのターンの表示方法に経過ターンを追加。（要ステート経過ターンカウント）  
2021/9/16 Ver.1.0.2  
競合が起きないよう一部の関数名を変更。  
不要な処理を削除。  
2021/9/15 Ver.1.0.1  
ターン表示が正常に取得できていなかった問題を修正。  
自動解除のないステートのターンが表示されていた問題を修正。  
2021/9/9 Ver.1.0.0  
初版  
