/*:-----------------------------------------------------------------------------------
 * NUUN_ActorCommandCustomize.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
 /*:
 * @target MZ
 * @plugindesc アクターコマンドカスタマイズ
 * @author NUUN
 * @version 1.0.0
 * 
 * 
 * @help
 * アクターコマンドの表示をカスタマイズします。
 * 
 * このプラグインを配置する場所により動作が異なります。
 * 下のほうに配置することにより全てのコマンドの表示順を設定できます。他プラグインによるコマンド追加を行う場合は「Commandkey」
 * に該当する文字列を記入してください。
 * 他プラグインのコマンド追加をこのプラグインで設定せずに追加する場合は、それらのプラグインの上に配置してください。
 * 
 * 仕様
 * コマンドリストが設定されていない場合はデフォルトのコマンドリストが表示されます。
 * 
 * 更新履歴
 * 2021/7/23 Ver.1.0.0
 * 初版
 * 
 * @param ActorCommand
 * @text アクターのコマンドリスト
 * @desc アクターのコマンドの設定。
 * @default 
 * @type struct<ActorCommandSetting>[]
 */
/*~struct~ActorCommandSetting:
 * 
 * @param ActorId
 * @desc アクター
 * @text アクター
 * @type actor
 * 
 * @param ActorCommandData
 * @text コマンドリスト
 * @desc コマンドの設定。
 * @default 
 * @type struct<ActorCommandList>[]
 * 
 */
/*~struct~ActorCommandList:
 * @param CommandName
 * @text コマンド名
 * @desc コマンド名を設定します。
 * @type string
 * 
 * @param Commandkey
 * @text 表示コマンドキー
 * @desc 適用、除外するクラスを指定します。無指定の場合は全てのコマンドで反映されます。
 * @type combo[]
 * @option 'attack'
 * @option 'skill'
 * @option 'guard'
 * @option 'item'
 * @option 'escape'
 * @default
 * 
 * @param CommandEval
 * @type string
 * @default 
 * @text コマンド使用条件。
 * @desc コマンドが使用できる条件。
 * 
 * @param CommandFuncEval
 * @type string
 * @default 
 * @text コマンド処理評価式
 * @desc コマンドを処理する評価式を定義します。
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ActorCommandCustomize = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ActorCommandCustomize');
const ActorCommand = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorCommand'])) : null) || [];

const _Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList = function() {
  if (this._actor) {
    const commandList = ActorCommand.find(actor => actor.ActorId === this._actor.actorId());
    if (commandList && commandList.ActorCommandData && commandList.ActorCommandData.length > 0) {
      for (const data of commandList.ActorCommandData) {
        const key = data.Commandkey[0];
        let text = data.CommandName;
        let dataFunc = data.CommandFuncEval;console.log(key)
        switch (key) {
          case "escape":
            if (dataFunc) {
              eval(data.CommandFuncEval);
              break;
            }
            text = !text ? TextManager.escape : text;console.log(key)
            this.addCommand(text, key, data.CommandEval ? eval(data.CommandEval) : BattleManager.canEscape());
            break;
          case "attack":
            if (dataFunc) {
              eval(data.CommandFuncEval);
              break;
            }
            text = !text ? TextManager.fight : text;
            this.addCommand(text, "attack", data.CommandEval ? eval(data.CommandEval) : this._actor.canAttack());
            break;
          case "skill":
            if (dataFunc) {
              eval(data.CommandFuncEval);
              break;
            }
            this.addSkillCommands();
            break;
          case "guard":
            if (dataFunc) {
              eval(data.CommandFuncEval);
              break;
            }
            text = !text ? TextManager.guard : text;
            this.addCommand(TextManager.guard, "guard", data.CommandEval ? eval(data.CommandEval) : this._actor.canGuard());
            break;
          case "item":
            if (dataFunc) {
              eval(data.CommandFuncEval);
              break;
            }
            text = !text ? TextManager.item : text;
            this.addCommand(TextManager.item, "item", eval(data.CommandEval));
            break;
          default:
            if (dataFunc) {
              eval(data.CommandFuncEval);
              break;
            }
            this.addCommand(TextManager.item, key, eval(data.CommandEval));
            break;
        }
      }
    } else {
      _Window_ActorCommand_makeCommandList.call(this);
    }
  }
};

const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
  _Scene_Battle_createActorCommandWindow.call(this);
  this._actorCommandWindow.setHandler("escape", this.commandEscape.bind(this));
};

})();