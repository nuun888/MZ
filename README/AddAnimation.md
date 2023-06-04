# [追加アニメーション表示](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AddAnimation.js)
# Ver.1.1.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AddAnimation.js)  

アイテム、スキルのアニメーションを複数または追加で再生させます。  

![GIF](img/AddAnimation.gif)  

## 設定
スキル、アイテムのメモ欄  
`<AddAnimation:[id],[id]...>` 複数のアニメーションを同時に再生します。  
`[id]`:アニメーションID  

`<WaitAddAnimation:[id],[id]...>`  一つのアニメーションが終わった後に次のアニメーションを再生します。  
`[id]`:アニメーションID  
`[Number]`:識別ID(整数) 最初のタグは数字を省略します。２番目以降は2と記入します。  
`<AddAnimationWaitFrame[Number]:[WaitFrame]>`　上記のアニメーションの再生を指定のフレーム数遅延再生します。  
`[WaitFrame]`;遅延フレーム数 -1と記入した場合は、アニメーションが再生し終わるまで待ちます。  
`[Number]`:識別ID(整数) 最初のタグは数字を省略します。２番目以降は2と記入します。  

例
`<AddAnimation:13>`  
`<AddAnimation2:14>`  
`<AddAnimationWaitFrame:30>`  
`<AddAnimationWaitFrame2:45>`  
最初のアニメーションが再生されて３０フレーム後にアニメーションID13が再生され、４５フレーム後にアニメーションID14番が再生されます。  

### 更新履歴
2023/6/4 Ver 1.1.0  
指定のフレーム数遅延して再生できる機能を追加。  
2023/6/3 Ver 1.0.0  
初版  
