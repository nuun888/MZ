# [マナシールド](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ManaShield.js)
# Ver.1.0.1

HPダメージの代わりにMPにダメージを受けさせます。  
1000のHPダメージを受けた時に５０％の場合はMPが５００減りHPは５００だけ減ります。    
MPの変換後負担率が６０％の場合はMPが３００減りHPは５００のダメージを受けます。  

### 設定方法
特徴を有するメモ欄  
`<ManaShield:[rate]>` マナシールドを発動する特徴を設定します。  
[rate]:肩代わりするダメージの割合  
`<ManaShield:50>` HPダメージの50％がMPダメージに変換されます。  

![gif](img/DamagePopUpSimulDisplay1.gif)  

### 更新履歴
2021/8/1 Ver.1.0.1  
MPダメージを受けてないのにSEが再生される問題を修正。  
MP不足だった時のHPダメージが正常に計算されていなかった問題を修正。  
回復時にも影響していた問題を修正。  
2021/8/1 Ver.1.0.0  
初版  
