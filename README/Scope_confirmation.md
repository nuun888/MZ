# [全体、ランダム、敵味方全体攻撃でも対象選択](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_Scope_confirmation.js)
# Ver.1.6.3
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_Scope_confirmation.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  
[メニュー画面の全体対象時のカーソル表示修正](https://github.com/nuun888/MZ/blob/master/README/MenuStatusAllSelectFix.md)  

全体、ランダム、敵味方全体攻撃でも対象選択させます。

## 設定方法
#### アイテム、スキルのメモ欄
`<NoTargetSelect>` : このアイテム、スキルは対象選択しません。デフォルトと同様に省略されます。  
対象が全体、ランダム、敵味方全て、使用者のみ（対象使用者のみ選択表示をON）で有効です。  
以下のタグは範囲を全体、ランダム、敵味方全てにしたときに有効です。  

#### 独自に定義
対象範囲が全体、ランダム、敵味方全体時のウィンドウカーソルの表示対象を独自に定義することが出来ます。  
なおエネミー画像、SV画像、アクター画像には反映されません。また複数対象カーソル個別表示がONの時のみ有効です。  
`subject` = 使用者;  
`members` = 対象のメンバー;  
取得するデータはカーソル表示させるメンバーを配列として取得します。  
例：`members.filter(member => member.isAlive() && member !== subject)`  
使用者以外にカーソルが表示させます。  

タグはアイテム、スキルのメモ欄に記述します。  
`<[tag]>` [tag]：全カーソル表示時対象設定で設定したタグ名  
例：`<NotUserTarget>` NotUserTargetは全カーソル表示時対象設定のタグ名を変更してない限り、使用者以外のカーソルを表示します。  

デフォルトタグ  
`<NotUserTarget>` 使用者以外。  
`<DeathTarget>` 戦闘不能者を含む全て。  

以下の機能は[XPスタイル対象選択ウィンドウ](https://github.com/nuun888/MZ/blob/master/README/XPSelectWindow.md)プラグインが必要です。  
敵味方対象選択時の表示名  
`%1`:連続回数  
`%2`:ランダム回数  

## 更新履歴
2024/9/5 Ver.1.6.3  
防御コマンドでキャンセルを行うとコマンドカーソル位置が先頭に戻ってしまう問題を修正。  
2021/5/30 Ver.1.6.2  
メニュー画面アクター全体選択時のカーソル不具合を別プラグイン化による定義修正。  
2021/3/27 Ver.1.6.1  
XP風対象選択ウィンドウのプラグイン名が間違っていたので修正。  
2021/3/27 Ver.1.6.0  
XPスタイル対象選択ウィンドウに対応するための定義追加。  
全カーソル表示で対象のカーソル表示を判定させる評価式の仕様を変更。  
2021/7/18 Ver.1.5.1  
全カーソル表示時対象設定で設定したタグが取得できていない問題を修正。  
スクロールしたときに選択対象になっていないアクターにカーソルが表示されてしまう問題を修正。  
2021/7/17 Ver.1.5.0  
複数対象カーソル個別表示をメニューにも対応。  
2021/7/14 Ver.1.4.1  
敵の対象選択時にエラーが出る問題を修正。  
カーソル選択中にモンスターが倒されるとエラーが出る問題を修正。  
2021/7/14 Ver.1.4.0  
全体カーソル表示時のウィンドウのカーソル表示対象指定を独自に定義できる機能を追加。  
2021/7/14 Ver.1.3.2  
味方に戦闘不能者がいるときに全体選択するとエラーが出る問題を修正。  
2021/7/10 Ver.1.3.1  
処理を一部変更。  
2021/7/8 Ver.1.3.0  
全体、ランダム攻撃対象選択を敵選択時のみ表示させる機能を追加。  
2021/7/7 Ver.1.2.0  
全体選択の時にカーソルを一つにまとめずに別々に表示する機能を追加。  
2021/7/6 Ver.1.1.0  
敵味方全体対象の時に味方にも点滅するように変更。  
対象選択の表示省略をアイテム、スキルごとに設定できる機能を追加。  
2021/7/5 Ver.1.0.2  
カーソル全体選択時の処理を修正。  
プラグインパラメータのパラメータが間違っていたので修正。  
2021/7/5 Ver.1.0.1  
味方が奇数の時にカーソル全選択時の表示が正常に表示されない問題を修正。  
2021/7/4 Ver.1.0.0  
初版  

