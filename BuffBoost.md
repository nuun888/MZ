# [バフ、デバフ倍率効果率増減特徴](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BuffBoost.js)
# Ver.1.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_BuffBoost.js)

バフ、デバフの倍率の効果率を増減する特徴を設定できます。  
通常のバフ、デバフの倍率は1段階につき25%になっていますが、特徴によって倍率を増減させます。  
倍率が1.2倍の時はバフまたはデバフの倍率が30%になります。  

## 設定方法
特徴を有するメモ欄
`<BuffBoost[BuffId]:[rate]>`
`[BuffId]`:バフID 0:HP 1:MP 2:攻撃力 3:防御力 4:魔法力 5:魔法防御 6:敏捷性 7:運
`[rate]`:倍率(正数)　100で1.0倍 120ならバフ時に1.2倍

`<DebuffBoost[BuffId]:[rate]>`
`[BuffId]`:デバフID 0:HP 1:MP 2:攻撃力 3:防御力 4:魔法力 5:魔法防御 6:敏捷性 7:運
`[rate]`:倍率(正数)　100で1.0倍 80ならバフ時に0.8倍

## 更新履歴
2022/2/12 Ver.1.0.0  
初版  
