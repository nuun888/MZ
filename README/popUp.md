# [ステート、バフポップアップ](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_popUp.js)
# Ver.1.1.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_popUp.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

ステート、バフ付加解除時にステート、バフをポップアップさせます。

## 設定
ステートのメモ欄
`<PopUpStateName>` ポップアップするステート名。無記入の場合はデータベースのステート名が表示されます。  
`<PositiveState>` このステートは良いステートと判定します。  
`<BatState>` このステートは悪いステートと判定します。  
`<NoPopUp>` ポップアップを表示しません。  
`<AddNoPopUp>` 付与時のポップアップを表示しません。  
`<RemoveNoPopUp>` 解除時のポップアップを表示しません。  
`<PopUpColor:[colorIndex]>` ポップアップ時の色を指定します。`[colorIndex]`:カラーインデックス番号　例：`<PopUpColor:17>`  
上記のタグを記入したステートはプラググインパラメータより優先して適用されます。

仕様  
戦闘行動結果ポップアッププラグインと併用時、このプラグインを戦闘行動結果ポップアッププラグインより下に設定した場合、ステート、バフのポップアップはこのプラグインでの表示になります。  

## 更新履歴
2022/4/30 Ver 1.1.0  
一部プラグインとの競合解消。  
処理の最適化。  
ポップアップテキストの仕様変更。  
2021/7/17 Ver 1.0.1  
バトルスタイル拡張プラグインの互換モード対応。  
2021/7/17 Ver 1.0.0  
初版  
