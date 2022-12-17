# [スキルラーニング](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SkillLearning.js)
# Ver.1.0.1
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SkillLearning.js)  

相手が使用したスキルを習得することができます。  

## 設定
スキルのメモ欄  
`<SkillLearning:[rate], [skill], [mode]>` 攻撃を受けた時に習得可能スキルならスキルを確率で習得します。  
`[rate]`:習得確率(百分率)  
`[skill]`:習得スキル　0で発動スキルを習得します。 １以上で指定のスキル  
`[mode]`:習得対象 0で敵味方　1で味方のみ　2で敵のみ  
例:`<SkillLearning:80, 0, 0>` 攻撃を受けた時80%の確率で攻撃スキルを習得します。  
`<SkillLearning:100, 52, 1>` 攻撃を受けた時100%の確率で習得者が味方ならスキルID52番のスキルを習得します。  

`<WatchingSkillLearning:[rate], [skill], [mode]>` 相手がスキルを使用した時に習得可能スキルならスキルを確率で習得します。  
`[rate]`:習得確率(百分率)  
`[skill]`習得スキル　0で発動スキルを習得します。  
`[mode]`:習得対象 0で敵味方　1で味方のみ　2で敵のみ  
 
特徴を持つメモ欄(敵キャラを含む)  
`<SkillLearningAbility>`  
攻撃を受けたときに習得可能スキルならスキルを習得します。  
`<WatchingSkillLearningAbility>`  
相手がスキルを使用したときに習得可能スキルならスキルを習得します。  
`<SkillLearningCorrection:[rorrection]>`  
`[rorrection]`:±補正率  

敵が習得したスキルのレーティングは全て5で設定されます。  

## 更新履歴
2022/12/17 Ver.1.0.1  
モンスター図鑑の敵の使用スキル適用による定義追加。  
2022/12/17 Ver.1.0.0  
初版  
