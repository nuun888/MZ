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
 * @plugindesc Execute an animation on a battle actor
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @version 1.1.0
 * 
 * @help
 * The event command for battle animations can only target enemy troops by default.
 * This plugin allows animations to be played on actors as well.
 * Additionally, while the default system only lets you select up to the 8th enemy slot, this plugin enables selecting enemies beyond the 9th slot.
 * You can display animations on specific enemy IDs or actor IDs.
 * 
 * This plugin is an extension plugin for "NUUN_BattleStyleEX" for actors.
 * 
 * Animation display is executed via plugin commands.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 4/25/2026 Ver.1.1.0
 * Compatible with the new version of "NUUN_BattleStyleEX" (Ver. 1.0.24 and later).
 * Modified so that it is not executed outside of combat.
 * 5/7/2023 Ver.1.0.0
 * First edition.
 * 
 * @command BattleAnimation
 * @desc Displays the battle animations.
 * @text Display Battle Animation
 * 
 * @arg SetBattleAnimation
 * @desc Configures the animations displayed during battle.
 * @text Battle Animation Settings
 * @type struct<BattleAnimationData>
 * @default 
 * 
 * 
 */
/*~struct~BattleAnimationData:
 * 
 * @param Target
 * @desc “Target group for displaying animations.
 * @text Target
 * @type select
 * @option Enemy(1)
 * @value 0
 * @option Party(2)
 * @value 1
 * @default 1
 * 
 * @param TargetId
 * @desc “Specify the target ID. Use 0 for all targets.
 * @text Target Id
 * @type number
 * @default 0
 * @min 0
 * 
 * @param Animation
 * @desc Specify the animation.
 * @text Animation
 * @type animation
 * @default 0
 * @min 0
 * 
 * @param EnemyId
 * @desc Specify the enemy id.
 * @text Enemy id(1)
 * @type enemy
 * @default 0
 * 
 * @param ActorId
 * @desc Specify the actor id.
 * @text Actor id(2)
 * @type actor
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 戦闘中のアクターへのアニメーション実行
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @version 1.1.0
 * 
 * @help
 * イベントコマンドの戦闘アニメーションの表示では敵グループにしか選択できません。
 * このプラグインではアクターにも表示出来るようにします。
 * また敵グループはデフォルトだと8番目までしか選択できませんが9番目以降でも指定できるようになります。
 * 指定の敵ID、アクターIDにアニメーションを表示することができます。
 * 
 * このプラグインはアクターへのバトルスタイル拡張の拡張プラグインです。
 * 
 * アニメーション表示はプラグインコマンドから実行します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2026/5/7 Ver.1.1.0
 * NUUN_BattleStyleEX新版(Ver.1.0.24以降)に対応。
 * 戦闘中以外は実行しないように修正。
 * 2023/5/7 Ver.1.0.0
 * 初版
 * 
 * @command BattleAnimation
 * @desc 戦闘アニメーションの表示を行います。
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
/*~struct~BattleAnimationData:ja
 * 
 * @param Target
 * @desc アニメーションを表示する対象グループ。
 * @text 対象
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
        if (!$gameParty.inBattle()) return;
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
                const find = $gameParty.members().find(actor => actor.actorId() == Number(data.ActorId));
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
            if (!!BattleManager.bsAnimationShouldMirror) {
                mirror = !BattleManager.bsAnimationShouldMirror();
            } else {
                mirror = !NuunManager.bsAnimationShouldMirror();
            }
        };
        if (targets.length > 0) {
            $gameTemp.requestAnimation(targets, Number(data.Animation), mirror);
        }
    });
    
})();