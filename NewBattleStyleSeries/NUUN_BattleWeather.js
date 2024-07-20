/*:-----------------------------------------------------------------------------------
 * NUUN_BS_ActorStatusWindowVisible.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Weather applied during battle
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_BattleStyleEX
 * @version 1.0.0
 * 
 * @help
 * Weather conditions are applied even during battle.
 * This plugin is an extension plugin for Battle Style Expansion EX (Ver.4.0.0 or later).
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/20/2024 Ver.1.0.0
 * First edition.
 * 
 * @param BattleShowWeather
 * @text Weather display settings during battle.
 * @desc Sets the weather display during battle.
 * @type select
 * @option Bring to Front
 * @value 'Show'
 * @option Displayed on actor image
 * @value 'ShowFront'
 * @option Display on the battlefield
 * @value 'BattleField'
 * @default 'Show'
 * @parent WeatherSetting
 * 
 * @param BattleWeatherSwitch
 * @desc Weather display switch during battle (ON for display)
 * @text Weather switch during battle
 * @type switch
 * @default 0
 * @parent WeatherSetting
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 戦闘中天候適用
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_BattleStyleEX
 * @version 1.0.0
 * 
 * @help
 * 戦闘中でも天候を適用します。
 * このプラグインはバトルスタイル拡張EX(Ver.4.0.0以降)の拡張プラグインです。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/7/20 Ver.1.0.0
 * 初版
 * 
 * @param BattleShowWeather
 * @text 戦闘時天候表示設定。
 * @desc 戦闘時の天候の表示設定を行います。
 * @type select
 * @option 最前面に表示
 * @value 'Show'
 * @option アクター画像上に表示
 * @value 'ShowFront'
 * @option バトルフィールドに表示
 * @value 'BattleField'
 * @default 'Show'
 * @parent WeatherSetting
 * 
 * @param BattleWeatherSwitch
 * @desc 戦闘中の天候の表示スイッチ(ONで表示)
 * @text 戦闘中天候スイッチ
 * @type switch
 * @default 0
 * @parent WeatherSetting
 * 
 * 
 */


var Imported = Imported || {};
Imported.NUUN_BattleWeather = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const parameters = PluginManager.parameters('NUUN_BattleWeather');

    const _Spriteset_Battle_createStatusLayer = Spriteset_Battle.prototype.createStatusLayer;
    Spriteset_Battle.prototype.createStatusLayer = function() {
        _Spriteset_Battle_createStatusLayer.apply(this, arguments);
        this.createBsWeather();
    };


    Spriteset_Battle.prototype.createBsWeather = function() {
        switch (params.BattleShowWeather) {
            case "ShowFront":
                return this.createWeather(this._battleHudBase);
            case "Show":
                return this.createWeather(this);
            case "BattleField":
                return this.createWeather(this._effectsContainer);
        }
    };

    Spriteset_Battle.prototype.createWeather = function(sprite) {
        this._weather = new Weather();
        sprite.addChild(this._weather);
    };
    
    Spriteset_Battle.prototype.updateWeather = function() {    
        this._weather.type = $gameScreen.weatherType();
        this._weather.power = $gameScreen.weatherPower();
    };
    
    
    const _Spriteset_Battle_updateBsEffects = Spriteset_Battle.prototype.updateBsEffects;
    Spriteset_Battle.prototype.updateBsEffects = function() {
        _Spriteset_Battle_updateBsEffects.apply(this, arguments);
        if (isBattleWeather()) {
            this.updateBattleFieldWeather();
            this.updateWeather();
        }
    
    };

    Spriteset_Battle.prototype.updateBattleFieldWeather = function() {
        if (isWeatherBattleField()) {
            const sprites = this._effectsContainer.children;
            const index = sprites.findIndex(sprite => "Weather" === String(sprite.constructor.name));
            if (index >= 0 && sprites.length - 1 > index) {
                const weather = sprites.splice(index, 1);//天候は常に前面に表示
                Array.prototype.push.apply(sprites, weather);
            }
        }
    };
    

    const _Game_Interpreter_command236 = Game_Interpreter.prototype.command236;
    Game_Interpreter.prototype.command236 = function(c_params) {
        if ($gameParty.inBattle() && isBattleWeather()) {
            $gameScreen.changeWeather(c_params[0], c_params[1], c_params[2]);
            if (c_params[3]) {
                this.wait(c_params[2]);
            }
        }
        return _Game_Interpreter_command236.apply(this, arguments);
    };

    function isBattleWeather() {
        return params.BattleWeatherSwitch > 0 ? $gameSwitches.value(params.BattleWeatherSwitch) : true;
    };

    function isWeatherBattleField() {
        return params.BattleShowWeather === "BattleField";
    };

   
})();