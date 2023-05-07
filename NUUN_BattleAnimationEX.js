/*:-----------------------------------------------------------------------------------
 * NUUN_BattleAnimationEX.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc 戦闘中のアクターへのアニメーション実行
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * 戦闘アニメーションをアクターにも表示出来るようにします。
 * また敵グループはデフォルトだと8番目までしか選択できませんが9番目以降でも指定できるようになります。
 * 指定の敵ID、アクターIDにアニメーションを表示することができます。
 * 
 * このプラグインはアクターへのバトルスタイル拡張(Ver.3.10.8以降)の拡張プラグインです。
 * 
 * アニメーション表示はプラグインコマンドから実行します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/5/7 Ver.1.0.0
 * 初版
 * 
 * @command BattleAnimation
 * @desc 戦闘アニメーションの表示
 * @text 戦闘アニメーションの表示
 * 
 * @arg SetBattleAnimation
 * @desc 戦闘中に表示するアニメーションを設定をします。
 * @text 戦闘中アニメーション設定
 * @type struct<BattleAnimationData>
 * @default 
 * 
 * 
 */
/*~struct~BattleAnimationData:
 * 
 * @param Target
 * @desc アニメーションを表示する対象グループ。
 * @text 属性番号
 * @type select
 * @option エネミー(1)
 * @value 0
 * @option 味方(2)
 * @value 1
 * @default 1
 * 
 * @param TargetId
 * @desc ターゲットのIDを指定します。0で全体
 * @text ターゲットID
 * @type number
 * @default 0
 * @min 0
 * 
 * @param Animation
 * @desc アニメーションを指定します。
 * @text アニメーション
 * @type animation
 * @default 0
 * @min 0
 * 
 * @param EnemyId
 * @desc 敵キャラのIDを指定します。
 * @text 敵キャラID(1)
 * @type enemy
 * @default 0
 * 
 * @param ActorId
 * @desc アクターのIDを指定します。
 * @text アクターID(2)
 * @type actor
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleAnimationEX = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_BattleAnimationEX');
    const pluginName = "NUUN_BattleAnimationEX";

    PluginManager.registerCommand(pluginName, 'BattleAnimation', args => {
        const data = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(args.SetBattleAnimation)) : {};
        const targets = [];
        let mirror = false;
        if (Number(data.Target) === 0 && Number(data.TargetId) >= 0) {
            if (Number(data.EnemyId) > 0) {
                const find = $gameTroop.members().find(enemy => enemy.enemyId() === Number(data.EnemyId));
                if (find && find.isAlive()) {
                    targets.push(find);
                }
            } else {
                Game_Interpreter.prototype.iterateEnemyIndex.call(this, Number(data.TargetId) - 1, enemy => {
                    if (enemy.isAlive()) {
                        targets.push(enemy);
                    }
                });
            }
        } else if (Number(data.Target) === 1 && Number(data.TargetId) >= 0) {
            if (Number(data.ActorId) > 0) {
                const find = $gameParty.members().find(actor => actor.actorId() === Number(data.ActorId));
                if (find && find.isAlive()) {
                    targets.push(find);
                }
            } else {
                Game_Interpreter.prototype.iterateActorIndex.call(this, Number(data.TargetId) - 1, actor => {
                    if (actor.isAlive()) {
                        targets.push(actor);
                    }
                });
            }
            try {
                mirror = !NuunManager.bsAnimationShouldMirror();
            } catch (error) {
                const log = $gameSystem.isJapanese() ? 'NUUN_BattleStyleEXが存在しないあるいは、バージョンがVer.3.10.8以降ではありません。' : "NUUN_BattleStyleEX does not exist or the version is not Ver.3.10.8 or later.";
                throw ["LoadError", log];
            }
        };
        if (targets.length > 0) {
            $gameTemp.requestAnimation(targets, Number(data.Animation), mirror);
        }
    });
    
})();