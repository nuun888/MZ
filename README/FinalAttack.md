# [ファイナルアタック特徴](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_FinalAttack.js)
# Ver.1.1.7
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_FinalAttack.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

ファイナルアタックを実装します。  

## 設定
特徴を有するメモ欄  
`<FinalAttack:1>`  
戦闘不能になった時にファイナルアタック設定の１番で指定したスキルが発動します。  
スキルのコストは考慮してませんのでスキルコストがある場合数値がマイナスに表示される場合があります。  

## スキル設定
### ターゲットモード
設定スキルのターゲット  
設定スキルの範囲の対象。
とどめを刺したバトラー
戦闘不能にしたバトラーに対して攻撃します。（範囲が敵単体のみ）

### スキル設定
戦闘不能時に発動するスキルを設定します。  
設定できるスキルは複数指定できます。  
各スキルには発動率を設定できます。  

### 仕様
２回行動以上でファイナルアタックが割り込んだ場合その時点で行動が終了します。  

※1:更新後全てのファイナルアタックのコスト有効がOFFになっています。全てのファイナルアタックのスキル設定を開きスキルコストを適用させてください。  

## 更新履歴
2024/7/27 Ver.1.1.7  
一部処理を修正。  
2024/7/21 Ver.1.1.6  
メニュー画面からアクターに対しアイテムを使用するとエラーが出る問題を修正。  
2024/7/13 Ver.1.1.5  
一部プラグインでの競合対応。  
ファイナルアタックのスキル選定のタイミングを修正。  
2024/7/3 Ver.1.1.4  
スキルコストが消費されない設定が適用されない問題を修正。  
対象のメンバー全員が戦闘不能になっている場合、スキルを発動しないように修正。  
2024/6/30 Ver.1.1.3  
戦闘終了時にモンスター画像が消えず、ファイナルアタックが実行されない問題を修正。  
スキルコストを有効にする機能を追加。※1  
2024/6/4 Ver.1.1.2  
スキルコストが足りない場合ファイナルアタックのスキルを追加しないように修正。  
2022/11/12 Ver.1.1.1  
日本語以外での表示を英語表示に変更。  
2022/5/8 Ver.1.1.0  
とどめを刺したバトラーに攻撃する機能の追加。  
スキルの設定されていないidを指定するとエラーが出る問題を修正。  
2021/5/3 Ver.1.0.1  
少し修正。  
2021/5/3 Ver.1.0.0  
 初版  
