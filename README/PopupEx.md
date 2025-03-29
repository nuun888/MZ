# [ポップアップ拡張](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_PopupEx.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_PopupEx.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  
#### 対応ポップアッププラグイン
[盗みスキルのポップアップ](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StealPopUp.js)  
[スキルラーニングポップアップ](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SkillLearningPopUp.js)  
[アップフェードアウトポップアップ](https://github.com/nuun888/MZ/blob/master/README/UpFadeoutPopup.md)  
[スライドフェードアウトポップアップ](https://github.com/nuun888/MZ/blob/master/README/SlideFadeoutPopup.md)  
[バウンドポップアップ](https://github.com/nuun888/MZ/blob/master/README/LateralBoundPopUp.md)  

ポップアップを拡張します。  
このプラグインでは以下のポップアップを追加します。  
ステート  
バフ、デバフ  
クリティカル  
回避  
反撃  
反射  
かばう  
撃破  
属性耐性  
属性弱点  
属性無効  
#### 以下のポップアップは既存のポップアップを拡張します。  
失敗  
#### オプション  
盗み時(要NUUN_StealableItems)  

## 設定
#### ステートのポップアップ
不利なステートに設定されているステートは不利状態のステートになります。  
指定がないステートは全て有利なステートになります。  

ステートのメモ欄  
`<BatStatePopupId:[id]>` 不利なステートのポップアップデータIDを指定します。  
`[id]`:プラグインパラメータ「不利なステートポップアップ設定」の設定ID  
`<StatePopupId:[id]>` 有利なステートのポップアップデータIDを指定します。  
`[id]`:プラグインパラメータ「有利なステートポップアップ設定」の設定ID  
`<PopUpStateName:[text]>` ポップアップするステート名。無記入の場合はデータベースのステート名が表示されます。   
`[text]`:ポップアップテキスト  
%1:ステート名  
`<PopUpColor:[colorIndex]>` ポップアップ時の色を指定します。  
`[colorIndex]`:カラーインデックス番号またはカラーコード　  
例：`<PopUpColor:17>`  

付加時のテキストはポップアップテキストで記入します。  
解除時のテキストは解除時、消失時ポップアップテキストで記入します。  
ポップアップテキストフォーマット  
%1:ステート名  

#### バフ、デバフのポップアップ
ポップアップテキスト、解除時、消失時ポップアップテキスト、ポップアップ文字色、ポップアップアイコンID、ポップアップ画像の指定は配列型なっております。  
リストのIDがバフレベルになっております。  
2段階強化の場合はポップアップバフ設定の2番目に設定。  
2段階弱体の場合はポップアップデバフ設定の2番目に設定。  

付加時のテキストはポップアップテキストで記入します。  
解除時のテキストは解除時、消失時ポップアップテキストで記入します。  
ポップアップテキストフォーマット  
%1:能力値  

#### クリティカル、回避、失敗、反撃、反射、かばう、撃破、属性耐性、属性弱点、属性無効 のポップアップ
テキストはポップアップテキストで記入します。  
ポップアップテキストフォーマット  
%1:パラメータ(クリティカル等)  

#### 盗み時のポップアップ
盗みを行って成功した時または、盗まれたときにポップアップを行います。なおNUUN_StealableItems Ver.1.5.2以降が必要です。  
[盗みスキルのポップアップ](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StealPopUp.js)  

#### スキルラーニングでスキル習得時のポップアップ
スキルラーニングでスキル習得時に習得した対象にポップアップを表示させます。なおNUUN_PopupEx、NUUN_SkillLearning(Ver.1.1.3以降)が必要になります。  
[スキルラーニングポップアップ](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SkillLearningPopUp.js)  

## 更新履歴
2025/3/21 Ver.1.0.0
初版
