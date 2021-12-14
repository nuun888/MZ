# [エネミー座標調整](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_NUUN_EnemyPosition.js)
# Ver.1.1.0

エネミーの座標、ダメージエフェクトをエネミー毎に設定できます。設定できる範囲外でも配置可能です。  

## 設定方法
座標は画面の左上が基準（0, 0)となります。    

#### 敵キャラのメモ欄
`<EnemyPosition_X:[Position]>` エネミーのX座標（絶対座標）を指定します。  
`<EnemyPosition_Y:[Position]>` エネミーのY座標（絶対座標）を指定します。  
`<EnemyPositionShift_X:[Shift]>` エネミーのX座標（相対座標）をずらします。  
`<EnemyPositionShift_Y:[Shift]>` エネミーのY座標（相対座標）をずらします。  

エネミーのダメージエフェクトの座標を指定します。座標はデフォルトで表示される位置からの座標となります。  
#### 敵キャラのメモ欄
`<EnemyDamage_X:[Position]>` エネミーのダメージエフェクトX座標（相対座標）を指定します。  
`<EnemyDamage_Y:[Position]>` エネミーのダメージエフェクトY座標（相対座標）を指定します。  
例
`[Position]`:座標  
例  
`<EnemyPosition_X:100>`  

## 更新履歴
2021/3/27 Ver.1.1.0  
敵の座標をシフトさせる機能を追加。  
2021/1/17 Ver.1.0.0  
初版  
