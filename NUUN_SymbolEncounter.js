/*:-----------------------------------------------------------------------------------
 * NUUN_SymbolEncounter.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Symbol encounter
 * @author NUUN
 * @version 1.0.4
 * @base NUUN_Base
 * @base NUUN_EventRange
 * @orderAfter NUUN_Base
 * 
 * @help
 * implements a symbol encounter system.
 * 
 * This plugin requires the following plugins.
 * NUUN_Base
 * https://github.com/nuun888/MZ/blob/master/README/Base.md
 * NUUN_EventRange
 * https://github.com/nuun888/MZ/blob/master/README/EventRange.md
 * 
 * Surprise attack and preemptive attack require a separate plug-in.
 * 
 * Event Notes
 * <SymbolEncEnemy:[id]> Events with this tag are symbol encounters.
 * [id]:Symbol encounter setting ID
 * 
 * plugin parameters
 * Visible range
 * <SymbolEncFindRange:besideRange,[lx],[rx]>
 * Enlarges the contact judgment within the specified horizontal range. Orientation is ignored.
 * [lx]:Contact left range of the event (positive integer)
 * [ry]:Contact right range of the event (positive integer)
 * 
 * <SymbolEncFindRange:verticalRange,[uy],[dy]>
 * Enlarges the contact judgment within the specified vertical range. Orientation is ignored.
 * [ux]:contact upper range of the event (positive integer)
 * [dy]:contact lower extent of the event (positive integer)
 * 
 * <SymbolEncFindRange:frontRange,[range]>
 * Expands the contact detection from the specified event to the range directly in front.
 * [range]:Contact range (integer)
 * 
 * <SymbolEncFindRange:range,[x],[y]>
 * Expands the contact detection around the specified range. If you enter 4, the trigger will be activated in the range of ±2 squares (5 squares) centered on the event.
 * [x]:contact lateral extent of the event (an even positive integer)
 * [y]:contact longitudinal extent of the event (an even positive integer)
 * 
 * <SymbolEncFindRange:rangeEX,[x1],[y1],[x2],[y2],[x3],[y3],[x4],[y4]>
 * Enlarge the contact judgment within the specified range from the event.
 * If you want to specify left or above the event coordinates, enter it as a negative number.
 * [x1]:Event contact range point AX coordinate (integer)
 * [y1]:Event contact range point AY coordinate (integer)
 * [x2]:Event contact range point BX coordinate (integer)
 * [y2]:Event contact range point BY coordinate (integer)
 * [x3]:Event contact range point CX coordinate (integer)
 * [y3]:Event contact range point CY coordinate (integer)
 * [x4]:Event contact range point DX coordinate (integer)
 * [y4]:Event contact range point DY coordinate (integer)
 * 
 * <SymbolEncFindRange:circle,[range],[rad]>
 * Expand the contact judgment from the specified radius. By specifying the angle, the contact detection is expanded according to the angle from the front.
 * [range]:contact range (integer)
 * [rad]:Angle (0 to 180°) *Can be omitted.If omitted, 360°
 * 
 * <SymbolEncFindRange:triangle,[range],[rad]>
 * Expands the contact detection according to the angle from the front for the specified recognition range.
 * [range]:Contact range from the front (integer)
 * [rad]:Angle (0 to 180°)
 * 
 * Escape conditions
 * e:this event
 * m:party member
 * p:player
 * 
 * Make settings for searching on the first page of the event.
 * It will not appear if the appearance conditions do not match.
 * Options and Priority are common to all pages. (Disabled when set individually)
 * Autonomous Movement will be the setting at the time of exploration.
 * Trigger goes into combat mode when the player and the event make contact. (Settings other than automatic execution and parallel processing)
 * 
 * Individual setting
 * Write comment on the execution contents of the event on each page.
 * Configure each process independently. () is set by the trigger inside ().
 * <SymbolEncMode:[mode]>
 * [mode]
 * 0:Explore
 * 1:Find(Parallel)
 * 2:Tracking
 * 3:Escape
 * 4:Battle(Autorun)
 * 5:Lose(Parallel)
 * 6:Victory(Parallel)
 * 7:Player escape(Parallel)
 * 8:Return
 * 
 * If chase, escape, and predetermined positions are set individually, the contents of the event page 1 will not be executed at the time of contact, and the contents of the current event page will be executed.
 * 
 * 
 * Plugin command
 * You can ignore the normal mode transition and transition to the specified mode.
 * 
 * Script
 * this.getSymbolEncSpeed()
 * Returns the current speed of symbol encounters.
 * 
 * this.getSymbolEncMode()
 * Returns the current mode id of the symbol encounter.
 * 
 * this.getSymbolEncDefeat()
 * Returns whether the current mode of symbol encounter is Defeat.
 * 
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 5/5/2025 Ver.1.0.4
 * Fixed an issue where an error would occur when specifying a dash reaction.
 * 4/29/2023 Ver.1.0.3
 * Fixed an issue where missing a player was not working properly.
 * 2/17/2023 Ver.1.0.2
 * Fixed an issue where battles would start continuously even if you set invincibility.
 * Fixed to initialize when the page is not applicable.
 * Added switch to hide symbol encounters.
 * 2/12/2023 Ver.1.0.1
 * Fixed an issue where Surprise Strike would not execute on recombat with the same symbol.
 * 2/7/2023 Ver.1.0.0
 * First edition.
 * 
 * 
 * @command SymbolEncTrackingMode
 * @desc Change the state of the event to tracking mode.
 * @text Event tracking mode change
 * 
 * @command SymbolEncBattleMode
 * @desc Change event state to battle mode.
 * @text Event battle mode change
 * 
 * @command SymbolEncEscapeMode
 * @desc Changes the state of the event to escape success mode.
 * @text Event escape success mode change
 * 
 * @command SymbolEncVictoryMode
 * @desc Changes the state of the event to Victory Mode
 * @text Event victory mode change
 * 
 * @command SymbolEncResetMode
 * @desc Changes the state of the event to initial mode.
 * @text Event initial mode change
 * 
 * 
 * 
 * @param SymbolEncountSetting
 * @type struct<SymbolEncountList>[]
 * @desc Configure symbol encounter settings.
 * @text Symbol encounter setting
 * @default ["{\"Name\":\"\",\"SymbolEncountRange\":\"circle,8,45\",\"FindMode\":\"0\",\"NotObstacles\":\"false\",\"SightBush\":\"50\",\"PlayerSearch\":\"10\",\"GoHome\":\"false\",\"AllCharacterImg\":\"true\",\"CommonEvent\":\"0\",\"FindSetting\":\"------------------------------\",\"FindBalloonId\":\"1\",\"FindSE\":\"{\\\"name\\\":\\\"Attack1\\\",\\\"volume\\\":\\\"90\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"FindCommonEvent\":\"0\",\"TrackingSetting\":\"------------------------------\",\"TrackingSpeed\":\"5\",\"SightRange\":\"12\",\"EscapeSetting\":\"------------------------------\",\"SightEscapeEval\":\"\",\"EscapeMode\":\"2\",\"EscapeSpeed\":\"5\",\"SightEscapeRange\":\"12\",\"LoseSetting\":\"------------------------------\",\"LoseBalloonId\":\"7\",\"LoseSE\":\"\",\"LoseCommonEvent\":\"0\",\"BattleSetting\":\"------------------------------\",\"BattleCommonEvent\":\"0\",\"DefeatSetting\":\"------------------------------\",\"DefeatCommonEvent\":\"0\",\"PlayerEscapeSetting\":\"------------------------------\",\"PlayerEscapeCommonEvent\":\"0\"}"]
 * 
 * @param EscapeInvincibleFrame
 * @text Number of player escape invincible frames
 * @desc Specifies the number of invincibility frames for the player when successfully escaping. disabled with 0
 * @type number
 * @default 200
 * 
 * @param VictoryInvincibleFrame
 * @text Number of invincible frames when player wins
 * @desc Specifies the number of invincibility frames for the player when winning. disabled with 0
 * @type number
 * @default 0
 * 
 * @param EventFreezesFrame
 * @text Enemy freeze frame when successfully escaping
 * @desc Freeze frames for symbol encounters on a successful escape.
 * @type number
 * @default 200
 * 
 * @param FindFollower
 * @text Find Follower
 * @desc Recognize your followers. At the time of contact, followers are also subject to contact.
 * @type boolean
 * @default false
 * 
 * @param SymbolEncountHideSwitch
 * @desc A switch to hide symbol encounters.
 * @text Hide symbol encounter switch
 * @type switch
 * @default 0
 * 
 */
/*~struct~SymbolEncountList:
 * 
 * @param Name
 * @text Identification name
 * @desc Identification name
 * @type string
 * @default 
 * 
 * @param SymbolEncountRange
 * @desc Sets the visibility range for symbol encounters.
 * @text Visible range
 * @type combo
 * @option circle,6,45
 * @option triangle,6,45
 * @option besideRange,3,3
 * @option verticalRange,3,3
 * @option frontRange,3
 * @option range,4,4
 * @option rangeEX,-3,-3,3,3,3,3,-3,-3
 * @default 
 * 
 * @param FindMode
 * @text Find mode
 * @desc Sets the find mode for symbol encounters.
 * @type select
 * @option Range
 * @value 0
 * @option No reaction
 * @value 1
 * @option Dash
 * @value 2
 * @option Move
 * @value 3
 * @default 0
 * 
 * @param NotObstacles
 * @text No obstacle detection
 * @desc No obstacle detection.
 * @type boolean
 * @default false
 * 
 * @param SightBush
 * @text Bush visibility
 * @desc Visibility of symbol encounters when the player enters bushes. (percentage)
 * @type number
 * @default 50
 * 
 * @param PlayerSearch
 * @text Player search range
 * @desc Player specifies search range from symbol encounter. 0 for unlimited
 * @type number
 * @default 10
 * 
 * @param GoHome
 * @text return to position
 * @desc Return to position.
 * @type boolean
 * @default false
 * 
 * @param AllCharacterImg
 * @text Same image valid for all pages
 * @desc Set the character image when setting individual pages to the same image on all pages.
 * @type boolean
 * @default true
 * 
 * @param CommonEvent
 * @text Common event
 * @desc Specifies a common common event to be executed at mode transition.
 * @type common_event
 * @default 0
 * 
 * @param FindSetting
 * @text Find setting
 * @default ------------------------------
 * 
 * @param FindBalloonId
 * @text Find balloon id
 * @desc Speech bubble ID when discovering a player.
 * @type number
 * @default 1
 * @parent FindSetting
 * 
 * @param FindSE
 * @text Find SE
 * @desc Play SE when player is found.
 * @type struct<SymbolEncountSE>
 * @default 
 * @parent FindSetting
 * 
 * @param FindCommonEvent
 * @text Common event
 * @desc Specifies a common event when a player is spotted.
 * @type common_event
 * @default 0
 * @parent FindSetting
 * 
 * @param TrackingSetting
 * @text Tracking setting
 * @default ------------------------------
 * 
 * @param TrackingSpeed
 * @text Tracking speed
 * @desc Speed when chasing players.
 * @type number
 * @default 4
 * @parent TrackingSetting
 * 
 * @param SightRange
 * @text Max visibility distance when tracking
 * @desc If the difference with the player becomes more than the visible distance, it will stop tracking.
 * @type number
 * @default 12
 * @parent TrackingSetting
 * 
 * @param EscapeSetting
 * @text Escape setting
 * @default ------------------------------
 * 
 * @param SightEscapeEval
 * @text Escape conditions
 * @desc Enter the conditions for escape in JavaScript. don't run away with a blank
 * @type combo
 * @option 
 * @option "true"
 * @option "$gameParty.partyAveLevel() > 10;//The average level of combat members is 10 or higher."
 * @option "$gameParty.allPartyAveLevel() > 10;//Average level of all members is 10 or higher"
 * @option "$gameParty.partySymbolEncState(id);//Some of the combat members are in the specified state"
 * @option "$gameParty.allPartySymbolEncState(id);//Some of all members are in the specified state"
 * @default 
 * @parent EscapeSetting
 * 
 * @param EscapeMode
 * @text Escape mode
 * @desc Specifies escape mode.
 * @type select
 * @option run away somehow
 * @value 0
 * @option run away
 * @value 1
 * @option desperately run away
 * @value 2
 * @default 2
 * @parent EscapeSetting
 * 
 * @param EscapeSpeed
 * @text Escape speed
 * @desc Speed when running away from the player.
 * @type number
 * @default 4
 * @parent EscapeSetting
 * 
 * @param SightEscapeRange
 * @text Escape stopping distance
 * @desc If the difference with the player becomes more than the maximum distance, it will stop escaping.
 * @type number
 * @default 12
 * @parent EscapeSetting
 * 
 * @param LoseSetting
 * @text Lose setting
 * @default ------------------------------
 * 
 * @param LoseBalloonId
 * @text Lose balloon id
 * @desc Balloon ID when you lose track of the player.
 * @type number
 * @default 7
 * @parent LoseSetting
 * 
 * @param LoseSE
 * @text Lose SE
 * @desc Specifies the SE when losing sight of the player.
 * @type struct<SymbolEncountSE>
 * @parent LoseSetting
 * 
 * @param LoseCommonEvent
 * @text Common event
 * @desc Specifies a common event when losing track of a player.
 * @type common_event
 * @default 0
 * @parent LoseSetting
 * 
 * @param BattleSetting
 * @text Battle setting
 * @default ------------------------------
 * 
 * @param BattleCommonEvent
 * @text Common event
 * @desc Specifies a common event when performing a battle.
 * @type common_event
 * @default 0
 * @parent BattleSetting
 * 
 * @param DefeatSetting
 * @text Defeat setting
 * @default ------------------------------
 * 
 * @param DefeatCommonEvent
 * @text Common event
 * @desc Specify the common event when defeating.
 * @type common_event
 * @default 0
 * @parent DefeatSetting
 * 
 * @param PlayerEscapeSetting
 * @text Player escape setting
 * @default ------------------------------
 * 
 * @param PlayerEscapeCommonEvent
 * @text Common event
 * @desc Specify the common event when escape is successful.
 * @type common_event
 * @default 0
 * @parent PlayerEscapeSetting
 * 
 */
/*~struct~SymbolEncountSE:
 * 
 * @param name
 * @text SE file
 * @desc Specify SE.
 * @type file
 * @dir audio/se
 * 
 * @param volume
 * @text SE volume
 * @desc Set the SE volume.
 * @type number
 * @default 90
 * @min 0
 * 
 * @param pitch
 * @text SE Pitch
 * @desc Sets the pitch of SE.
 * @type number
 * @default 100
 * 
 * @param pan
 * @text SE pan
 * @desc Set the pan to SE.
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc シンボルエンカウント
 * @author NUUN
 * @version 1.0.4
 * @base NUUN_Base
 * @base NUUN_EventRange
 * @orderAfter NUUN_Base
 * 
 * @help
 * シンボルエンカウントシステムを実装します。
 * 
 * このプラグインは以下のプラグインが必要になります。
 * 共通処理 NUUN_Base
 * https://github.com/nuun888/MZ/blob/master/README/Base.md
 * イベント接触判定拡張 NUUN_EventRange
 * https://github.com/nuun888/MZ/blob/master/README/EventRange.md
 * 不意打ち、先制攻撃は別途プラグインが必要です。
 * 
 * イベントのメモ欄
 * <SymbolEncEnemy:[id]> このタグがあるイベントはシンボルエンカウントとなります。
 * [id]:シンボルエンカウント設定ID
 * 
 * イベントの1ページ目の実行内容で注釈
 * <SymbolEncCond:[eval]> 出現条件
 * [eval]:条件式
 * イベントの条件の参照がマップ移動時のみ行われます。
 * 
 * プラグインパラメータ
 * 視認範囲
 * <SymbolEncFindRange:besideRange,[lx],[rx]>
 * 指定した横方向の範囲内の接触判定を拡大します。向きは無視されます。
 * [lx]:イベントの接触左側範囲(正の数の整数)
 * [ry]:イベントの接触右側範囲(正の数の整数)
 * 
 * <SymbolEncFindRange:verticalRange,[uy],[dy]>
 * 指定した縦方向の範囲内の接触判定を拡大します。向きは無視されます。
 * [ux]:イベントの接触上側範囲(正の数の整数)
 * [dy]:イベントの接触下側範囲(正の数の整数)
 * 
 * <SymbolEncFindRange:frontRange,[range]>
 * 指定したイベントからの真正面の範囲までの接触判定を拡大します。
 * [range]:接触範囲(整数)
 * 
 * <SymbolEncFindRange:range,[x],[y]>
 * 指定した範囲を中心に接触判定を拡大します。4と記入した場合はイベントを中心に±2マスの範囲(5マス)でトリガーが起動します。
 * [x]:イベントの接触横範囲(偶数の正の数の整数)
 * [y]:イベントの接触縦範囲(偶数の正の数の整数)
 * 
 * <SymbolEncFindRange:rangeEX,[x1],[y1],[x2],[y2],[x3],[y3],[x4],[y4]>
 * イベントから指定した範囲内の接触判定を拡大します。
 * イベント座標より左、上を指定する場合はそのまま負の数で記入してください。
 * [x1]:イベントの接触範囲点AX座標(整数)
 * [y1]:イベントの接触範囲点AY座標(整数)
 * [x2]:イベントの接触範囲点BX座標(整数)
 * [y2]:イベントの接触範囲点BY座標(整数)
 * [x3]:イベントの接触範囲点CX座標(整数)
 * [y3]:イベントの接触範囲点CY座標(整数)
 * [x4]:イベントの接触範囲点DX座標(整数)
 * [y4]:イベントの接触範囲点DY座標(整数)
 * 
 * <SymbolEncFindRange:circle,[range],[rad]>
 * 指定した半径からの接触判定を拡大します。角度を指定することで正面から角度に応じて接触判定を拡大します。
 * [range]:接触範囲(整数)
 * [rad]:角度(0～180°)※省略可　省略時は360°
 * 
 * <SymbolEncFindRange:triangle,[range],[rad]>
 * 指定した認識範囲に対して、正面からの角度に応じて接触判定を拡大します。
 * [range]:正面からの接触範囲(整数)
 * [rad]:角度(0～180°)
 * 
 * 逃走条件
 * e:このイベント
 * m:パーティメンバー
 * p:プレイヤー
 * 
 * イベント１ページ目に探索時の設定を行います。
 * 出現条件が一致しないと出現しなくなります。
 * オプション、プライオリティは全ページ共通になります。(個別設定時は無効)
 * 自立移動は探索時の設定になります。
 * トリガーはプレイヤーとイベントが接触したときに戦闘モードに移行します。(自動実行、並列処理以外設定)
 * 
 * 個別設定
 * 各ページのイベントの実行内容に注釈で記入
 * 各処理を独自に設定します。()は()内のトリガーで設定されます。
 * <SymbolEncMode:[mode]>
 * [mode]
 * 0:探索
 * 1:発見時(並列実行)
 * 2:追跡
 * 3:退避
 * 4:戦闘(自動実行)
 * 5:見失う(並列実行)
 * 6:勝利(並列実行)
 * 7:逃走成功(並列実行)
 * 8:所定位置に戻る
 * 
 * 追跡、退避、所定位置を個別設定している場合は接触時にイベントページ1の実行内容は実行されず現在のイベントページの
 * 実行内容が実行されます。
 * 
 * 
 * プラグインコマンド
 * 通常のモード移行を無視し指定のモードに移行することができます。
 * 
 * スクリプト
 * this.getSymbolEncSpeed()
 * シンボルエンカウントの現在の速度を返します。
 * 
 * this.getSymbolEncMode()
 * シンボルエンカウントの現在のモードIDを返します。
 * 
 * this.getSymbolEncDefeat()
 * シンボルエンカウントの現在のモードが撃破時か返します。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/5/5 Ver.1.0.4
 * ダッシュ反応を指定しているとエラーが出る問題を修正。
 * 2023/4/29 Ver.1.0.3
 * プレイヤーを見失った時の処理が正しく行われていなかった問題を修正。
 * 2023/2/17 Ver.1.0.2
 * 無敵状態を設定しても連続で戦闘が開始してしまう問題を修正。
 * ページが該当しなかったときに初期化するように修正。
 * シンボルエンカウンターを表示しないスイッチを追加。
 * 2023/2/12 Ver.1.0.1
 * 同一シンボルと再戦闘時に先制不意打ちが実行されなくなる問題を修正。
 * 2023/2/7 Ver.1.0.0
 * 初版
 * 
 * 
 * @command SymbolEncTrackingMode
 * @desc イベントの状態を追跡モードに変更します。
 * @text イベント追跡モード変更
 * 
 * @command SymbolEncBattleMode
 * @desc イベントの状態を戦闘モードに変更します。
 * @text イベント戦闘モード変更
 * 
 * @command SymbolEncEscapeMode
 * @desc イベントの状態を逃走成功モードに変更します。
 * @text イベント逃走成功モード変更
 * 
 * @command SymbolEncVictoryMode
 * @desc イベントの状態を勝利モードに変更します。
 * @text イベント勝利モード変更
 * 
 * @command SymbolEncResetMode
 * @desc イベントの状態を初期モードに変更します。
 * @text イベント初期モード変更
 * 
 * 
 * 
 * @param SymbolEncountSetting
 * @type struct<SymbolEncountList>[]
 * @desc シンボルエンカウントの設定を行います。
 * @text シンボルエンカウント設定
 * @default ["{\"Name\":\"\",\"SymbolEncountRange\":\"circle,8,45\",\"FindMode\":\"0\",\"NotObstacles\":\"false\",\"SightBush\":\"50\",\"PlayerSearch\":\"10\",\"GoHome\":\"false\",\"AllCharacterImg\":\"true\",\"CommonEvent\":\"0\",\"FindSetting\":\"------------------------------\",\"FindBalloonId\":\"1\",\"FindSE\":\"{\\\"name\\\":\\\"Attack1\\\",\\\"volume\\\":\\\"90\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"FindCommonEvent\":\"0\",\"TrackingSetting\":\"------------------------------\",\"TrackingSpeed\":\"5\",\"SightRange\":\"12\",\"EscapeSetting\":\"------------------------------\",\"SightEscapeEval\":\"\",\"EscapeMode\":\"2\",\"EscapeSpeed\":\"5\",\"SightEscapeRange\":\"12\",\"LoseSetting\":\"------------------------------\",\"LoseBalloonId\":\"7\",\"LoseSE\":\"\",\"LoseCommonEvent\":\"0\",\"BattleSetting\":\"------------------------------\",\"BattleCommonEvent\":\"0\",\"DefeatSetting\":\"------------------------------\",\"DefeatCommonEvent\":\"0\",\"PlayerEscapeSetting\":\"------------------------------\",\"PlayerEscapeCommonEvent\":\"0\"}"]
 * 
 * @param EscapeInvincibleFrame
 * @text プレイヤー逃走成功時無敵フレーム数
 * @desc 逃走成功時のプレイヤーの無敵フレーム数を指定します。0で無効
 * @type number
 * @default 200
 * 
 * @param VictoryInvincibleFrame
 * @text プレイヤー勝利時無敵フレーム数
 * @desc 勝利時のプレイヤーの無敵フレーム数を指定します。0で無効
 * @type number
 * @default 0
 * 
 * @param EventFreezesFrame
 * @text 逃走成功時敵硬直フレーム
 * @desc 逃走成功時のシンボルエンカウンターの硬直フレーム。
 * @type number
 * @default 200
 * 
 * @param SearchLimit
 * @text プレイヤーサーチ範囲
 * @desc プレイヤーのサーチ範囲を指定します。
 * @type number
 * @default 12
 * 
 * @param FindFollower
 * @text フォロワー認識
 * @desc フォロワーを認識します。接触時はフォロワーも接触対象になります。
 * @type boolean
 * @default false
 * 
 * @param SymbolEncountHideSwitch
 * @desc シンボルエンカウンターを非表示にするスイッチ。
 * @text シンボルエンカウンター非表示スイッチ
 * @type switch
 * @default 0
 * 
 */
/*~struct~SymbolEncountList:ja
 * 
 * @param Name
 * @text 識別名
 * @desc 識別名
 * @type string
 * @default 
 * 
 * @param SymbolEncountRange
 * @desc シンボルエンカウントの視認範囲を設定します。
 * @text 視認範囲
 * @type combo
 * @option circle,6,45
 * @option triangle,6,45
 * @option besideRange,3,3
 * @option verticalRange,3,3
 * @option frontRange,3
 * @option range,4,4
 * @option rangeEX,-3,-3,3,3,3,3,-3,-3
 * @default 
 * 
 * @param FindMode
 * @text 認識モード
 * @desc シンボルエンカウンターの認識モードを設定します。
 * @type select
 * @option 範囲
 * @value 0
 * @option 無反応
 * @value 1
 * @option ダッシュ時
 * @value 2
 * @option 移動
 * @value 3
 * @default 0
 * 
 * @param NotObstacles
 * @text 障害物検知なし
 * @desc 障害物検知しません。
 * @type boolean
 * @default false
 * 
 * @param SightBush
 * @text 茂み視認率
 * @desc プレイヤーが茂みに入った時のシンボルエンカウンターの視認率。(百分率)
 * @type number
 * @default 50
 * 
 * @param PlayerSearch
 * @text プレイヤー探索範囲
 * @desc プレイヤーがシンボルエンカウンターからの探索範囲を指定します。0で無制限
 * @type number
 * @default 10
 * 
 * @param GoHome
 * @text 所定位置戻る
 * @desc 所定位置に戻ります。
 * @type boolean
 * @default false
 * 
 * @param AllCharacterImg
 * @text 全同一画像有効
 * @desc 個別ページ設定時のキャラクター画像を全てのページで同じ画像にします。
 * @type boolean
 * @default true
 * 
 * @param CommonEvent
 * @text 共通コモンイベント
 * @desc モード移行時に実行する共通のコモンイベントを指定します。
 * @type common_event
 * @default 0
 * 
 * @param FindSetting
 * @text 発見時設定
 * @default ------------------------------
 * 
 * @param FindBalloonId
 * @text 発見時吹き出しID
 * @desc プレイヤーを発見したときのふきだしID
 * @type number
 * @default 1
 * @parent FindSetting
 * 
 * @param FindSE
 * @text プレイヤー発見時SE
 * @desc プレイヤー発見時のSEを再生します。
 * @type struct<SymbolEncountSE>
 * @default 
 * @parent FindSetting
 * 
 * @param FindCommonEvent
 * @text コモンイベント
 * @desc プレイヤー発見時のコモンイベントを指定します。
 * @type common_event
 * @default 0
 * @parent FindSetting
 * 
 * @param TrackingSetting
 * @text 追跡時設定
 * @default ------------------------------
 * 
 * @param TrackingSpeed
 * @text 追跡時スピード
 * @desc プレイヤーを追跡するときの速度。
 * @type number
 * @default 4
 * @parent TrackingSetting
 * 
 * @param SightRange
 * @text 追跡時最大視認距離
 * @desc 追跡時の最大視認距離。プレイヤーとの差が最大視認距離以上になった場合追跡をやめます。
 * @type number
 * @default 12
 * @parent TrackingSetting
 * 
 * @param EscapeSetting
 * @text 逃走時設定
 * @default ------------------------------
 * 
 * @param SightEscapeEval
 * @text 逃走条件
 * @desc 逃走時の条件をJavaScriptで記入します。無記入で逃走を行わない
 * @type combo
 * @option 
 * @option "true"
 * @option "$gameParty.partyAveLevel() > 10;//戦闘メンバーの平均レベルが10以上"
 * @option "$gameParty.allPartyAveLevel() > 10;//全てのメンバーの平均レベルが10以上"
 * @option "$gameParty.partySymbolEncState(id);//戦闘メンバーの誰かが指定のステートに掛かっている"
 * @option "$gameParty.allPartySymbolEncState(id);/全てのメンバーの誰かが指定のステートに掛かっている"
 * @default 
 * @parent EscapeSetting
 * 
 * @param EscapeMode
 * @text 逃げるモード
 * @desc 逃げるモードを指定します。
 * @type select
 * @option なんとなく逃げる
 * @value 0
 * @option 逃げる
 * @value 1
 * @option 必死に逃げる
 * @value 2
 * @default 2
 * @parent EscapeSetting
 * 
 * @param EscapeSpeed
 * @text 逃走時時スピード
 * @desc プレイヤーから逃げるときの速度。
 * @type number
 * @default 4
 * @parent EscapeSetting
 * 
 * @param SightEscapeRange
 * @text 逃走停止距離
 * @desc 逃走時の逃走停止距離。プレイヤーとの差が最大距離以上になった場合逃走をやめます。
 * @type number
 * @default 12
 * @parent EscapeSetting
 * 
 * @param LoseSetting
 * @text 見失った時設定
 * @default ------------------------------
 * 
 * @param LoseBalloonId
 * @text 見失い時吹き出しID
 * @desc プレイヤーを見失った時の吹き出しID
 * @type number
 * @default 7
 * @parent LoseSetting
 * 
 * @param LoseSE
 * @text プレイヤー見失い時SE
 * @desc 見失い時のSEを指定します。
 * @type struct<SymbolEncountSE>
 * @parent LoseSetting
 * 
 * @param LoseCommonEvent
 * @text コモンイベント
 * @desc プレイヤーを見失ったときのコモンイベントを指定します。
 * @type common_event
 * @default 0
 * @parent LoseSetting
 * 
 * @param BattleSetting
 * @text 戦闘時設定
 * @default ------------------------------
 * 
 * @param BattleCommonEvent
 * @text コモンイベント
 * @desc 戦闘を行う時のコモンイベントを指定します。
 * @type common_event
 * @default 0
 * @parent BattleSetting
 * 
 * @param DefeatSetting
 * @text 撃破時設定
 * @default ------------------------------
 * 
 * @param DefeatCommonEvent
 * @text コモンイベント
 * @desc 撃破時のコモンイベントを指定します。
 * @type common_event
 * @default 0
 * @parent DefeatSetting
 * 
 * @param PlayerEscapeSetting
 * @text 逃走成功時設定
 * @default ------------------------------
 * 
 * @param PlayerEscapeCommonEvent
 * @text コモンイベント
 * @desc 逃走成功時のコモンイベントを指定します。
 * @type common_event
 * @default 0
 * @parent PlayerEscapeSetting
 * 
 */
/*~struct~SymbolEncountSE:ja
 * 
 * @param name
 * @text SEファイル
 * @desc SEを指定します。
 * @type file
 * @dir audio/se
 * 
 * @param volume
 * @text SEの音量
 * @desc SEを音量を設定します。
 * @type number
 * @default 90
 * @min 0
 * 
 * @param pitch
 * @text SEのピッチ
 * @desc SEをピッチを設定します。
 * @type number
 * @default 100
 * 
 * @param pan
 * @text SEの位相
 * @desc SEを位相を設定します。
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * 
 */

var Imported = Imported || {};
Imported.NUUN_SymbolEncounter = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_SymbolEncounter');
    const SymbolEncountSetting = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SymbolEncountSetting'])) : [];
    const EscapeInvincibleFrame = Number(parameters['EscapeInvincibleFrame'] || 200);
    const VictoryInvincibleFrame = Number(parameters['VictoryInvincibleFrame'] || 0);
    const EventFreezesFrame = Number(parameters['EventFreezesFrame'] || 200);
    const PlayerSearchLimit = Number(parameters['SearchLimit'] || 12);
    const FindFollower = eval(parameters['FindFollower'] || "false");
    const SymbolEncountHideSwitch = Number(parameters['SymbolEncountHideSwitch'] || 0);
    const pluginName = "NUUN_SymbolEncounter";

    PluginManager.registerCommand(pluginName, 'SymbolEncTrackingMode', args => {
        const event = PluginManager.nuunEvent;
        if (event) {
            event.symbolEncTriggerOn = false;
            event.setTrackingMode();
        }
    });

    PluginManager.registerCommand(pluginName, 'SymbolEncBattleMode', args => {
        const event = PluginManager.nuunEvent;
        if (event) {
            event.symbolEncTriggerOn = false;
            event.setSymbolEncMode(4);
        }
    });

    PluginManager.registerCommand(pluginName, 'SymbolEncEscapeMode', args => {
        const event = PluginManager.nuunEvent;
        if (event) {
            event.symbolEncTriggerOn = false;
            event.setSymbolEncMode(7);
        }
    });

    PluginManager.registerCommand(pluginName, 'SymbolEncVictoryMode', args => {
        const event = PluginManager.nuunEvent;
        if (event) {
            event.symbolEncTriggerOn = false;
            event.setSymbolEncMode(6);
        }
    });

    PluginManager.registerCommand(pluginName, 'SymbolEncResetMode', args => {
        const event = PluginManager.nuunEvent;
        if (event) {
            event.symbolEncTriggerOn = false;
            event.setSymbolEncResetMode();
        }
    });

    const _Game_Player_initMembers = Game_Player.prototype.initMembers;
    Game_Player.prototype.initMembers = function() {
        _Game_Player_initMembers.call(this);
        this._symbolEncInvincibleCount = 0;
    };

    Game_Player.prototype.setSymbolEncInvincible = function(count) {
        if (this._symbolEncInvincibleCount === 0) {
            if (count > 0) {
                this.setOpacity(128);
                this._symbolEncInvincibleCount = count;
            }
        }
    };

    const _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        this.updateSymbolEncInvincible();
        _Game_Player_update.call(this, sceneActive);
    };

    Game_Player.prototype.updateSymbolEncInvincible = function() {
        if (!$gameParty.inBattle() && this._symbolEncInvincibleCount > 0) {
            this._symbolEncInvincibleCount--;
            if (this._symbolEncInvincibleCount === 0) {
                this.setOpacity(255);
            }
        }
    };

    Game_Player.prototype.isSymbolEncInvincible = function() {
        return this._symbolEncInvincibleCount > 0;
    };


    const _Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) {
        this.setSymbolEnc(eventId);
        _Game_Event_initialize.call(this, mapId, eventId);
    };
    
    const _Game_Event_initMembers = Game_Event.prototype.initMembers;
    Game_Event.prototype.initMembers = function() {
        _Game_Event_initMembers.call(this);
        if (this.isSymbolEnc()) {
            this._symbolEncRange = null;
            this._symbolEncHomeX = 0;
            this._symbolEncHomeY = 0;
            this._symbolEncMode = 0;
            this._symbolEncSpeed = 3;
            this._symbolEncFindMode = 0;
            this._sightBush = 0.5;
            this._symbolEncObstacleSensing = false;
            this._symbolEncSightRange = 0;
            this._symbolEncSightEscapeRange = 0; 
            this._symbolEncEscape = null;
            this._symbolEncReturn = false;
            this._symbolEncSeparatelyImg = false;
            this.symbolEncTriggerOn = false;
            this._symbolEncPage = false;
            this._symbolEncPlayerSearch = 0;
            this._SymbolEncEscapeMode = 2;
            this._commonEvent = 0;
            this._symbolEncOnCommonEvent = false;
            this._searchTarget = null;
            this._searchTargetIndex = 0;
            this._symbolEncCond = true;
            this._symbolEncMoveMode = 0;
        }
    };

    const _Game_Event_clearPageSettings = Game_Event.prototype.clearPageSettings;
    Game_Event.prototype.clearPageSettings = function() {
        _Game_Event_clearPageSettings.call(this);
        this._symbolEncInterpreter = null;
    };
    

    Game_Event.prototype.setSymbolEnc = function(eventId) {
        if ($dataMap) {
            this._symbolEnc = $dataMap.events[eventId] ? Number($dataMap.events[eventId].meta.SymbolEncEnemy) : 0;
        } else {
            this._symbolEnc = 0;
        }
    };

    Game_Event.prototype.isSymbolEnc = function() {
        return this._symbolEnc > 0;
    };

    const _Game_Character_searchLimit = Game_Character.prototype.searchLimit;
    Game_Character.prototype.searchLimit = function() {
        return this.isSymbolEnc && this.isSymbolEnc() ? PlayerSearchLimit : _Game_Character_searchLimit.call(this);
    };

    Game_Event.prototype.setSymbolEncMode = function(num) {
        let onRefresh = false;
        if (this._symbolEncMode !== num) {
            this._symbolEncMode = num;
            onRefresh = true;
        }
        const newPageIndex = this._erased ? -1 : this.findProperPageIndex();
        this.refresh();
        if (this._pageIndex === newPageIndex && onRefresh) {
            this.setupPage();
        }
    };

    const _Game_Event_lock = Game_Event.prototype.lock;
    Game_Event.prototype.lock = function() {
        if (this.isSymbolEnc()) {
            if (!this._locked) {
                //this._prelockDirection = this.direction();
                //this._locked = true;
            }
        } else {
            _Game_Event_lock.call(this);
        }
    };

    const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
        if (this.isSymbolEnc()) {
            const data = SymbolEncountSetting[this._symbolEnc - 1];
            try {
                if (!this._symbolEncRange) {
                    this.setupSymbolEnc(data);
                }
                if (data.AllCharacterImg) {
                    this.setupAllCharacterImg();
                }
            } catch (e) {
                const log = ($gameSystem.isJapanese() ? "無効なシンボルエンカウントIDが設定されています。" : "An invalid symbol encounter ID has been set.") + "(ID:"+ this._symbolEnc +")";
                throw [log];
            }
            if (this.page().trigger === 4) {
                this.symbolEncTriggerOn = true;
            }
            this._searchTarget = $gamePlayer;
            this._searchTargetIndex = 0;
        }
        _Game_Event_setupPageSettings.call(this);
        if (this.isSymbolEnc() && this._commonEvent > 0 && !this.symbolEncTriggerOn) {
            if (!this._symbolEncInterpreter) {
                this._symbolEncInterpreter = new Game_Interpreter();
            }
            this._symbolEncOnCommonEvent = true;
        }
    };
    
    Game_Event.prototype.setupSymbolEnc = function(data) {
        this._symbolEncRange = data.SymbolEncountRange;
        this._symbolEncFindMode = data.FindMode;
        this._symbolEncSightBush = data.SightBush / 100;
        this._symbolEncObstacleSensing = data.NotObstacles;
        this._symbolEncSightRange = data.SightRange;
        this._symbolEncSightEscapeRange = data.SightEscapeRange; 
        this._symbolEncEscape = data.SightEscapeEval
        this._symbolEncReturn = data.GoHome;
        this._symbolEncHomeX = this.x;
        this._symbolEncHomeY = this.y;
        this._symbolEncPlayerSearch = data.PlayerSearch;
        this._SymbolEncEscapeMode = data.EscapeMode;
        this._commonEvent = data.CommonEvent;
        this._symbolEncMoveMode = 0;
        if (!data.AllCharacterImg) {//画像のロード
            const pages = this.event().pages;
            for (const page of pages) {
                ImageManager.loadCharacter(page.image.characterName);
            }
        }
    };

    Game_Event.prototype.setupPageListSymbolEnc = function() {
        const symbolEncObj = {};
        for (const obj in this.event().pages[0]) {
            symbolEncObj[obj] = this.event().pages[0][obj];
        }
        return symbolEncObj;
    };

    Game_Event.prototype.setupAllCharacterImg = function() {
        if (this._pageIndex > 0) {
            const page = this.page();
            page.image = this.event().pages[0].image;
        }
    };

    const _Game_CharacterBase_update = Game_CharacterBase.prototype.update;
    Game_CharacterBase.prototype.update = function() {
        this.updateSymbolEncount();
        _Game_CharacterBase_update.call(this);
    };

    Game_CharacterBase.prototype.updateSymbolEncount = function() {
        
    };

    Game_Event.prototype.updateSymbolEncount = function() {
        if (this.isSymbolEnc() && !this.symbolEncTriggerOn) {
            if ((this.isMoving() || $gamePlayer.isMoving()) && !$gameMap.isEventRunning() && !this.isMoveRouteForcing() && !$gameMessage.isBusy()) {
                if (this._symbolEncMode === 0) {
                    this.updateSymbolEncountSearch();
                }
            } else {
                if (this._symbolEncMode === 1) {
                    this.updateSymbolEncountFind();
                    this.resetStopCount();
                } else if (this._symbolEncMode === 5) {
                    this.updateSymbolEncountLose();
                    this.resetStopCount();
                }
            }
        }
    };

    const _Game_Event_updateStop = Game_Event.prototype.updateStop;
    Game_Event.prototype.updateStop = function() {
        if (this.isSymbolEnc()) {
            if (this._locked) {
                this.resetStopCount();
            }
            Game_Character.prototype.updateStop.call(this);
            if (!$gameMap.isEventRunning() && !this.isMoveRouteForcing() && !$gameMessage.isBusy()) {
                this.updateSymbolEncountMovement();
            } else {
                if (!this.isMoveRouteForcing()) {
                    this.updateSelfMovement();
                }
            }
        } else {
            _Game_Event_updateStop.call(this);
        }
    };

    Game_Event.prototype.updateSymbolEncountMovement = function() {
        if (!this.symbolEncTriggerOn && !this._locked && this.isNearTheScreen() && this.checkStop(this.stopCountThreshold())) {
            switch (this._symbolEncMode) {
                case 0:
                    this.updateSymbolEncountSearch();
                    break;
                case 2:
                    this.updateSymbolEncountChase();
                    break;
                case 3:
                    this.updateSymbolEncountEscape();
                    break;
                case 6:
                this.updateSymbolEncountVictory();
                    break;
                case 7:
                this.updateSymbolEncountPlayerEscape();
                    break;
                case 8:
                    this.updateSymbolEncountReturn();
                    break;
            }
        }
    };

    Game_Event.prototype.updateSymbolEncountFind = function() {
        this.setTrackingMode();
    };

    Game_Event.prototype.updateSymbolEncountSearch = function() {
        if (!this._symbolEncNoReaction && this.symbolEncountSearch()) {
            this.setSymbolEncMode(1);
        }
        if (!this.isMoveRouteForcing()) {
            this.updateSelfMovement();
        }
    };

    Game_Event.prototype.updateSymbolEncountChase = function() {
        if (this._moveType === 0) {
            const direction = this.findDirectionTo(this._searchTarget.x, this._searchTarget.y);
            if (direction > 0) {
                this.moveStraight(direction);
            }
        } else {
            if (!this.isMoveRouteForcing()) {
                this.updateSelfMovement();
            }
        }
        if (this.symbolEncountLose()) {
            this.setSymbolEncMode(5);
        }
        if (this.getSymbolEncSight() === 0) {
            this.setSymbolEncResetMode();
        }
    };

    Game_Event.prototype.updateSymbolEncountReturn = function() {
        if (this._moveType === 0) {
            const direction = this.findDirectionTo(this._symbolEncHomeX, this._symbolEncHomeY);
            if (direction > 0) {
                this.moveStraight(direction);
            } else if (direction === 0) {
                this.setSymbolEncMode(0);
            }
        } else {
            if (this.symbolEncountLose()) {
                this.setSymbolEncMode(5);
            }
        }
        if (this.symbolEncountSearch()) {
            this.setSymbolEncMode(1);
        }
    };

    Game_Event.prototype.updateSymbolEncountEscape = function() {
        if (this._moveType === 0) {
            this.moveAwayFromPlayer();
        } else {
            if (!this.isMoveRouteForcing()) {
                this.updateSelfMovement();
            }
        }
        if (this.symbolEncountStopEscape()) {
            this.setSymbolEncMode(0);
        }
    };

    Game_Event.prototype.updateSymbolEncountLose = function() {
        this.setSymbolEncResetMode();
    };

    Game_Event.prototype.updateSymbolEncountVictory = function() {

    };

    Game_Event.prototype.updateSymbolEncountPlayerEscape = function() {
        this.setSymbolEncResetMode();
    };

    Game_Event.prototype.setTrackingMode = function() {
        const e = this;
        const m = $gameParty;
        const p = $gamePlayer;
        if (this._symbolEncEscape && eval(this._symbolEncEscape)) {
            this.setSymbolEncMode(3);//逃走
        } else {
            this.setSymbolEncMode(2);//追跡
        }
    };

    Game_Event.prototype.symbolEncountLose = function() {
        if (this._symbolEncSightRange > 0 && this._searchTarget) {
            const x = Math.abs(this.deltaXFrom(this._searchTarget.x));
            const y = Math.abs(this.deltaYFrom(this._searchTarget.y));
            return x > this._symbolEncSightRange || y > this._symbolEncSightRange;
        }
        return false;
    };

    Game_Event.prototype.symbolEncountStopEscape = function() {
        if(this._symbolEncSightEscapeRange > 0) {
            const x = Math.abs(this.deltaXFrom($gamePlayer.x));
            const y = Math.abs(this.deltaYFrom($gamePlayer.y));
            return x > this._symbolEncSightEscapeRange || y > this._symbolEncSightEscapeRange;
        }
        return false;
    };

    Game_Event.prototype.symbolEncountSearch = function() {
        const x = $gamePlayer.x;
        const y = $gamePlayer.y;
        return this.symbolEncountFindPlayer(x, y) || this.symbolEncountFindFollower();
    };

    Game_Event.prototype.symbolEncountFindFollower = function() {
        if (FindFollower) {
            for (const follower of $gamePlayer.followers().data()) {
                const x = follower.x;
                const y = follower.y;
                if (this.symbolEncountFindPlayer(x, y)) {
                    return true;
                }
            }
        }
        return false;
    };

    const _Game_Event_checkEventTriggerTouch = Game_Event.prototype.checkEventTriggerTouch;
    Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
        _Game_Event_checkEventTriggerTouch.call(this, x, y);
        if (this.isSymbolEnc() && FindFollower && !this.isStarting() && !$gameMap.isEventRunning()) {
            this.symbolEncChangeTarget();
            const followers = $gamePlayer.followers().data();
            for (const follower of followers) {
                if (this._trigger === 2 && follower.pos(x, y)) {
                    if (!this.isJumping() && this.isNormalPriority()) {
                        this.start();
                        break;
                    }
                }
            }
        }
    };

    Game_Event.prototype.symbolEncChangeTarget = function() {
        if (!this.isMovementSucceeded()) {
            this._searchTarget = $gamePlayer.followers().follower(this._searchTargetIndex);
            this._searchTargetIndex++;
            if (!this._searchTarget) {
                this.setSymbolEncResetMode();
            }
        }
    };

    Game_Event.prototype.setSymbolEncResetMode = function() {
        if (this._symbolEncReturn) {
            this.setSymbolEncMode(8);
        } else {
            this.setSymbolEncMode(0);
        }
    };

    const _Game_Event_start = Game_Event.prototype.start;
    Game_Event.prototype.start = function() {
        if (this.isSymbolEnc() && !$gamePlayer.isSymbolEncInvincible() && this.isSymbolEncTouch()) {
            this.setSymbolEncMode(4);
        }
        _Game_Event_start.call(this);
    };

    const _Game_Event_isTriggerIn = Game_Event.prototype.isTriggerIn;
    Game_Event.prototype.isTriggerIn = function(triggers) {
        return _Game_Event_isTriggerIn.call(this, triggers) && (this.isSymbolEnc() ? !$gamePlayer.isSymbolEncInvincible() : true);
    };

    Game_Event.prototype.isSymbolEncTouch = function() {
        switch (this._symbolEncMode) {
            case 0:case 2:case 3:case 5:case 8:
                return true;
            default:
                return false;
        }
    };

    const _Game_Event_meetsConditions = Game_Event.prototype.meetsConditions;
    Game_Event.prototype.meetsConditions = function(page) {
        const result = _Game_Event_meetsConditions.call(this, page);
        if (!result || !this.isSymbolEnc()) {
            return result;
        }
        return this.meetsSymbolEncPages(page);
    };

    Game_Event.prototype.meetsSymbolEncPages = function(page) {
        if (!this.meetsSymbolEncCond()) {
            return false;
        }
        if (this.isSymbolEnc()) {
            const symbolEncPage = this.setSymbolEncModeTag(page);
            this._symbolEncPage = (symbolEncPage === this._symbolEncMode);
            return symbolEncPage >= 0 ? this._symbolEncPage : true;
        }
    };

    const _Game_Event_page = Game_Event.prototype.page;
    Game_Event.prototype.page = function() {
        if (this.isSymbolEnc()) {
            if (this._symbolEncPage) {
                return this.getSymbolEncUserData();
            } else {
                return this.getSymbolEncData();
            }
        } else {
            return _Game_Event_page.call(this);
        }
    };

    const _Game_Event_findProperPageIndex = Game_Event.prototype.findProperPageIndex;
    Game_Event.prototype.findProperPageIndex = function() {
        const page = _Game_Event_findProperPageIndex.call(this);
        if (this.isSymbolEnc() && page < 0) {
            this.resetSymbolEnc();
        }
        return page;
    };

    Game_Event.prototype.getSymbolEncUserData = function() {
        const data = _Game_Event_page.call(this);
        switch (this._symbolEncMode) {
            case 0:
                break;
            case 1:
                data.trigger = 4;
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                data.trigger = 3;
                break;
            case 5:
                data.trigger = 4;
                break;
            case 6:
                data.trigger = 4;
                break;
            case 7:
                data.trigger = 4;
                break;
            case 8:
                break;
        }
        return data;
    };

    Game_Event.prototype.getSymbolEncData = function() {
        switch (this._symbolEncMode) {
            case 0:
                return _Game_Event_page.call(this);
            case 1:
                return this.getSymbolEncFind();
            case 2:
                return this.getSymbolEncTracking();
            case 3:
                return this.getSymbolEncEscape();
            case 4:
                return this.getSymbolEncBattle();
            case 5:
                return this.getSymbolEncLose();
            case 6:
                return this.getSymbolVictory();
            case 7:
                return this.getSymbolPlayerEscape();
            case 8:
                return this.getSymbolReturn();
            default:
                return _Game_Event_page.call(this);
        }
    };

    Game_Event.prototype.getSymbolEncFind = function() {
        const data = SymbolEncountSetting[this._symbolEnc - 1];
        const page = this.setupPageListSymbolEnc();
        if (data.FindCommonEvent > 0) {
            page.list = [{code: 117, indent: 0, parameters: [data.FindCommonEvent]},
                {code: 0, indent: 0, parameters: null}];
        } else {
            page.list = getFindCommand(data);
        }
        page.moveType = 0;
        page.trigger = 4;
        return page;
    };

    Game_Event.prototype.getSymbolEncTracking = function() {
        const data = SymbolEncountSetting[this._symbolEnc - 1];
        const page = this.setupPageListSymbolEnc();
        page.list = [{code: 0, indent: 0, parameters: null}];
        page.moveSpeed = data.TrackingSpeed;
        page.moveFrequency = 5;
        page.moveType = 0;
        return page;
    };

    Game_Event.prototype.getSymbolEncEscape = function() {
        const data = SymbolEncountSetting[this._symbolEnc - 1];
        const page = this.setupPageListSymbolEnc();
        page.list = [{code: 0, indent: 0, parameters: null}];
        page.moveSpeed = data.EscapeSpeed;
        page.moveFrequency = 5;
        page.moveType = 0;
        return page;
    };

    Game_Event.prototype.getSymbolEncBattle = function() {
        const data = SymbolEncountSetting[this._symbolEnc - 1];
        const page = this.setupPageListSymbolEnc();
        if (data.BattleCommonEvent > 0) {
            page.list = [{code: 117, indent: 0, parameters: [data.BattleCommonEvent]},
            {code: 0, indent: 0, parameters: null}];
        }
        page.trigger = 3;
        page.moveType = 0;
        return page;
    };

    Game_Event.prototype.getSymbolEncLose = function() {
        const data = SymbolEncountSetting[this._symbolEnc - 1];
        const page = this.setupPageListSymbolEnc();
        if (data.LoseCommonEvent > 0) {
            page.list = [{code: 117, indent: 0, parameters: [data.LoseCommonEvent]},
            {code: 0, indent: 0, parameters: null}];
        } else {
            page.list = getLoseCommand(data);
        }
        page.trigger = 4;
        page.moveType = 0;
        return page;
    };

    Game_Event.prototype.getSymbolReturn = function() {
        const data = SymbolEncountSetting[this._symbolEnc - 1];
        const page = this.setupPageListSymbolEnc();
        page.moveType = 0;
        page.moveFrequency = 5;
        return page;
    };

    Game_Event.prototype.getSymbolVictory = function() {
        const data = SymbolEncountSetting[this._symbolEnc - 1];
        const page = this.setupPageListSymbolEnc();
        if (data.DefeatCommonEvent > 0) {
            page.list = [{code: 117, indent: 0, parameters: [data.DefeatCommonEvent]},
            {code: 0, indent: 0, parameters: null}];
        } else {
            page.list = getVictoryCommand(data);
        }
        page.trigger = 4;
        page.moveType = 0;
        return page;
    };

    Game_Event.prototype.getSymbolPlayerEscape = function() {
        const data = SymbolEncountSetting[this._symbolEnc - 1];
        const page = this.setupPageListSymbolEnc();
        if (data.PlayerEscapeCommonEvent > 0) {
            page.list = [{code: 117, indent: 0, parameters: [data.PlayerEscapeCommonEvent]},
            {code: 0, indent: 0, parameters: null}];
        } else {
            page.list = getPlayerEscapeCommand(data);
        }
        page.trigger = 4;
        page.moveType = 0;
        return page;
    };

    const _Game_Event_updateParallel = Game_Event.prototype.updateParallel;
    Game_Event.prototype.updateParallel = function() {
        if (this.isSymbolEnc()) {
            if (this._symbolEncOnCommonEvent && this._symbolEncInterpreter) {
                const commonEvent = $dataCommonEvents[this._commonEvent].list;
                if (!this._symbolEncInterpreter.isRunning()) {
                    this._symbolEncInterpreter.setup(commonEvent, this._eventId);
                    this._symbolEncOnCommonEvent = false;
                }
                this._symbolEncInterpreter.update();
            }
            if (this._interpreter) {
                if (!this.symbolEncTriggerOn) {
                    return;
                }
                this.symbolEncTriggerOn = false;
            }
        }
        _Game_Event_updateParallel.call(this);
    };

    Game_Event.prototype.setSymbolEncModeTag = function(page) {//SymbolEncCond
        let symbolEncPage = -1;
        const re = /<(?:SymbolEncMode):\s*(.*)>/;
        page.list.forEach(tag => {
            if (tag.code === 108 || tag.code === 408) {
                const match = re.exec(tag.parameters[0]);
                if (match) {
                    symbolEncPage = Number(match[1]);
                }
            }
        });
        return symbolEncPage;
    };

    Game_Event.prototype.setSymbolEncCommentTag = function() {
        const list = this.event().pages[0].list;
        const re = /<(?:SymbolEncFindRange):\s*(.*)>/;
        const re2 = /<(?:SymbolEncEscape):\s*(.*)>/;
        const re3 = /<(?:SymbolEncLimit):\s*(.*)>/;
        const re4 = /<(?:SymbolEncReturn)>/;
        const re5 = /<(?:SymbolEncSeparatelyImg)>/;
        const re6 = /<(?:SymbolEncNoReaction)>/;
        const re7 = /<(?:SymbolEncBushRate):\s*(.*)>/;
        const re8 = /<(?:SymbolEncDash):\s*(.*)>/;
        list.forEach(tag => {
            if (tag.code === 108 || tag.code === 408) {
                const match = re.exec(tag.parameters[0]);
                const match2 = re2.exec(tag.parameters[0]);
                const match3 = re3.exec(tag.parameters[0]);
                const match4 = re4.exec(tag.parameters[0]);
                const match5 = re5.exec(tag.parameters[0]);
                const match6 = re6.exec(tag.parameters[0]);
                const match7 = re7.exec(tag.parameters[0]);
                const match8 = re8.exec(tag.parameters[0]);
                if (match) {
                    this._symbolEncRangeTag = match[1];
                } else if (match2) {
                    this._symbolEncEscape = match2[1];
                } else if (match3) {
                    this._symbolEncLimit = Number(match3[1]);
                } else if (match4) {
                    this._symbolEncReturn = match4[1];
                } else if (match5) {
                    this._symbolEncSeparatelyImg = match5[1];
                } else if (match6) {
                    this._symbolEncNoReaction = match6[1];
                } else if (match7) {
                    this._sightBush = Number(match7[1]) / 100;
                } else if (match8) {
                    this._symbolEncDash = match7[1];
                }
            }
        });
    };

    Game_Event.prototype.meetsSymbolEncCond = function() {
        if (SymbolEncountHideSwitch > 0 && $gameSwitches.value(SymbolEncountHideSwitch)) {
            return false;
        }
        return true;
    };

    Game_Event.prototype.resetSymbolEnc = function() {
        this._symbolEncPage = false;
        this._symbolEncMode = 0;
    };

    Game_Character.prototype.getSymbolEncSight = function() {
        return $gameParty.hasEncounterNone() ? 0.0 : ($gamePlayer.encounterProgressValue() * ($gamePlayer.isOnBush() ? this._symbolEncSightBush / 2 : 1.0));
    };

    Game_Character.prototype.isSymbolEncSightMode = function() {
        switch (this._symbolEncFindMode) {
            case 0:
                return true;
            case 1:
                return false;
            case 2:
                return $gamePlayer.isDashing();
            case 3:
                return $gamePlayer.isMoving();
        }
    };

    Game_Character.prototype.symbolEncountFindPlayer = function(x, y, e) {
        const event = e ? e : this;
        const sx = Math.abs(this.deltaXFrom(x));
        const sy = Math.abs(this.deltaYFrom(y));
        const data = event._symbolEncRange;
        const recognition = this._symbolEncPlayerSearch;
        if (recognition > 0 && (sx >= recognition || sy >= recognition)) {
            return false;
        }
        let result = false;
        if (data && this.isSymbolEncSightMode() && !$gamePlayer.isSymbolEncInvincible()) {
            const arr = data.split(',');
            const mode = arr[0].trim();
            const rate = this.getSymbolEncSight();
            if (rate > 0) {
                if (mode === 'range') {
                    result = (this.rangeX(x, Math.floor(Number(arr[1]) * rate)) && this.rangeY(y, Math.floor(Number(arr[2]) * rate)));
                } else if (mode === 'besideRange') {
                    result = this.besideRange(this.deltaXFrom(x), y, Math.floor(Number(arr[1]) * rate), Math.floor(Number(arr[2]) * rate));
                } else if (mode === 'verticalRange') {
                    result = this.verticalRange(x, this.deltaYFrom(y), Math.floor(Number(arr[1]) * rate), Math.floor(Number(arr[2]) * rate));
                } else if (mode === 'rangeEX') {
                    result = this.rangeEX(x, y, Math.floor(Number(arr[1]) * rate), Math.floor(Number(arr[2]) * rate), Math.floor(Number(arr[3]) * rate), Math.floor(Number(arr[4]) * rate), Math.floor(Number(arr[5]) * rate), Math.floor(Number(arr[6]) * rate), Math.floor(Number(arr[7]) * rate), Math.floor(Number(arr[8]) * rate));
                } else if (mode === 'circle') {
                    result = this.circleRange(x, y, Math.floor(Number(arr[1]) * rate), Number(arr[2]));
                } else if (mode === 'triangle') {
                    result = this.triangleRange(x, y, Math.floor(Number(arr[1]) * rate), Number(arr[2]));
                } else if (mode === 'frontRange') {
                    result = this.frontRange(x, y, Math.floor(Number(arr[1]) * rate));
                } else if (mode === 'donut') {
                    result = this.donutRange(x, y, Math.floor(Number(arr[1]) * rate));
                }
            }
        }
        if (result) {      
            return event.symbolEncObstacleJudgment(x, y);
        }
        return result;
    };

    Game_CharacterBase.prototype.symbolEncObstacleJudgment = function(x, y) {
        if (!this._symbolEncObstacleSensing) {
            const sx = this.deltaXFrom(x) * -1;
            const sy = this.deltaYFrom(y) * -1;
            const maxDelta = Math.max(Math.abs(x), Math.abs(y));
            for (let i = 0; i < maxDelta; i++) {
                const x2 = Math.round((sx / maxDelta) * (i + 1)) + this.x;
                const y2 = Math.round((sy / maxDelta) * (i + 1)) + this.y;
                if (!$gameMap.isObstacleJudgmentPassable(x2, y2)) {
                    return false;
                }
            }
        }
        return true;
    };

    const _Game_Character_moveAwayFromCharacter = Game_Character.prototype.moveAwayFromCharacter;
    Game_Character.prototype.moveAwayFromCharacter = function(character) {
        if (this.isSymbolEnc() && this._SymbolEncEscapeMode > 0) {
            this.moveAwayFromSymbolEnc(character);
        } else {
            _Game_Character_moveAwayFromCharacter.call(this, character);
        }
    };

    Game_Character.prototype.moveAwayFromSymbolEnc = function(character) {
        const sx = this.deltaXFrom(character.x);
        const sy = this.deltaYFrom(character.y);
        if (Math.abs(sx) > Math.abs(sy)) {
            if (sy === 0 && Math.random() < 0.3) {
                this.moveStraight(Math.floor(Math.random() * 2) > 0 ? 2 : 8);
            } else {
                this.moveStraight(sx > 0 ? 6 : 4);
            }
            if (!this.isMovementSucceeded()) {
                const r = Math.floor(Math.random() * 2) > 0;
                this.moveStraight(r ? 2 : 8);
                if (!this.isMovementSucceeded()) {
                    this.moveStraight(!r ? 8 : 2);
                }
                if (this._SymbolEncEscapeMode === 1 && !this.isMovementSucceeded()) {
                    this.moveStraight(sx > 0 ? 6 : 4);
                }
            }
            if (this._SymbolEncEscapeMode > 1 && !this.isMovementSucceeded()) {
                const sx2 = this.deltaXFrom(character.x);
                if (sx2 > 1) {
                    this.moveStraight(4);
                } else if (sx2 < -1) {
                    this.moveStraight(6);
                }
            }
        } else if (sy !== 0) {
            if (sx === 0 && Math.random() < 0.3) {
                this.moveStraight(Math.floor(Math.random() * 2) > 0 ? 6 : 4);
            } else {
                this.moveStraight(sy > 0 ? 2 : 8);
            }
            if (!this.isMovementSucceeded()) {
                const r = Math.floor(Math.random() * 2) > 0;
                this.moveStraight(r ? 6 : 4);
                if (!this.isMovementSucceeded()) {
                    this.moveStraight(!r ? 4 : 6);
                }
                if (this._SymbolEncEscapeMode === 1 && !this.isMovementSucceeded()) {
                    this.moveStraight(sy > 0 ? 2 : 8);
                }
            }
            if (this._SymbolEncEscapeMode > 1 && !this.isMovementSucceeded()) {
                const sy2 = this.deltaYFrom(character.y);
                if (sy2 > 1) {
                    this.moveStraight(8);
                } else if (sy2 < -1) {
                    this.moveStraight(2);
                }
            }
        }
    };

    Game_Party.prototype.partyAveLevel = function() {
        const members = this.battleMembers();
        return members.reduce((r, actor) => r + actor._level, 0) / members.length;
    };

    Game_Party.prototype.allPartyAveLevel = function() {
        const members = this.allMembers();
        return members.reduce((r, actor) => r + actor._level, 0) / members.length;
    };

    Game_Party.prototype.partySymbolEncState = function(id) {
        const members = this.battleMembers();
        return members.some(actor => actor.isStateAffected(id));
    };

    Game_Party.prototype.allPartySymbolEncState = function(id) {
        const members = this.allMembers();
        return members.some(actor => actor.isStateAffected(id));
    };


    const _Game_Interpreter_command601 = Game_Interpreter.prototype.command601;
    Game_Interpreter.prototype.command601 = function() {
        if (this._branch[this._indent] === 0) {
            const event = $gameMap._events[this.eventId()];
            if (event && event.isSymbolEnc()) {
                event.setSymbolEncMode(6);
            }
        }
        return _Game_Interpreter_command601.call(this);
    };

    const _Game_Interpreter_command602 = Game_Interpreter.prototype.command602;
    Game_Interpreter.prototype.command602 = function() {
        if (this._branch[this._indent] === 1) {
            const event = $gameMap._events[this.eventId()];
            if (event && event.isSymbolEnc()) {
                event.setSymbolEncMode(7);
            }
        }
        return _Game_Interpreter_command602.call(this);
    };

    const _Game_Interpreter_setup = Game_Interpreter.prototype.setup;
    Game_Interpreter.prototype.setup = function(list, eventId) {
        _Game_Interpreter_setup.call(this, list, eventId);
    };

    Game_Interpreter.prototype.getSymbolEncSpeed = function() {
        return $gameMap._events[this.eventId()]._moveSpeed;
    };

    Game_Interpreter.prototype.getSymbolEncMode = function() {
        return $gameMap._events[this.eventId()]._symbolEncMode;
    };

    Game_Interpreter.prototype.getSymbolEncDefeat = function() {
        return $gameMap._events[this.eventId()]._symbolEncMode === 6;
    };

    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        if (result === 0) {
            $gamePlayer.setSymbolEncInvincible(VictoryInvincibleFrame);
        } else if (this._escaped) {
            $gamePlayer.setSymbolEncInvincible(EscapeInvincibleFrame);
        }
        _BattleManager_endBattle.call(this, result);
    };

    function getFindCommand(data) {
        const list = [];
        list.push({code: 213, indent: 0, parameters: [0, data.FindBalloonId, false]});
        if (data.FindSE && !!data.FindSE.name) {
            list.push({code: 250, indent: 0, parameters: [data.FindSE]});
        }
        list.push({code: 0, indent: 0, parameters: null});
        return list;
    };

    function getLoseCommand(data) {
        const list = [];
        list.push({code: 213, indent: 0, parameters: [0, data.LoseBalloonId, false]});
        if (data.LoseSE && !!data.LoseSE.name) {
            list.push({code: 250, indent: 0, parameters: [data.LoseSE]});
        }
        list.push({code: 0, indent: 0, parameters: null});
        return list;
    };

    function getVictoryCommand(data) {
        const list = [];
        list.push({code: 205, indent: 0, parameters: [0, {list: getDefeatCommand(), repeat: false, skippable: false, wait: true}]});
        list.push({code: 214, indent: 0, parameters: null});
        list.push({code: 0, indent: 0, parameters: null});
        return list;
    };

    function getDefeatCommand() {
        return [{code: 42, parameters: [192], indent: 0},
        {code: 15, parameters: [30], indent: 0},
        {code: 42, parameters: [128], indent: 0},
        {code: 15, parameters: [30], indent: 0},
        {code: 42, parameters: [64], indent: 0},
        {code: 15, parameters: [30], indent: 0},
        {code: 42, parameters: [0], indent: 0},
        {code: 0}
        ];
    };

    function getPlayerEscapeCommand(data) {
        const list = [];
        if (EventFreezesFrame > 0) {
            list.push({code: 205, indent: 0, parameters: [0, {list: getEscapeCommand(data), repeat: false, skippable: false, wait: true}]});
        }
        list.push({code: 0, indent: 0, parameters: null});
        return list;
    };

    function getEscapeCommand(data) {
        return [{code: 42, parameters: [128], indent: 0},
        {code: 37, parameters: null, indent: 0},
        {code: 15, parameters: [EventFreezesFrame], indent: 0},
        {code: 38, parameters: null, indent: 0},
        {code: 42, parameters: [255], indent: 0},
        {code: 0}
        ];
    };
    
})();