/*:-----------------------------------------------------------------------------------
 * NUUN_SceneBattleFormation.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Screen Formation (battle)
 * @author NUUN
 * @version 2.0.0
 * @base NUUN_SceneFormation
 * @orderAfter NUUN_SceneFormation
 * 
 * @help
 * Allows you to change members during battle.
 * This plugin is an extension plugin for the member change screen ("NUUN_SceneFormation").
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/22/2024 Ver.2.0.0
 * Changed the plug-in parameter specifications.
 * Added a function to end the turn of the actor who executed the command after switching members via actor command in TPB.
 * Added a function to grant a state when switching from a reserve member to a combat member.
 * 
 * @param BasicSetting
 * @text Basic setting
 * @default ------------------------------
 * 
 * @param MenuFormationLayout
 * @text Same as menu layout
 * @desc This will display the layout when opened from the menu. 
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param WindowCenter
 * @text Window center automatic adjustment
 * @desc Automatically adjusts the window to the center. It will be adjusted to the width of the waiting member window.
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param WindowZero
 * @text Window criteria 0
 * @desc Sets the coordinate reference of all windows to 0,0. Use this if you want to change the layout yourself.
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param CursorSwitchingDirection
 * @text Cursor switching direction
 * @desc The direction in which the cursor moves when switching between battle members and reserve members.
 * @type select
 * @option Battle members (top) Reserve members (bottom)
 * @value 0
 * @option Battle member (left) Reserve member (right)
 * @value 1
 * @default 0
 * @parent BasicSetting
 * 
 * @param CommandShowMode
 * @text Command display target
 * @desc The target for which the command should display sorting.
 * @type select
 * @option None
 * @value 'None'
 * @option PartyCommand
 * @value 'Party'
 * @option ActorCommand
 * @value 'Actor'
 * @default 'Party'
 * @parent BasicSetting
 * 
 * @param CommandIndex
 * @text Insert Index Number
 * @desc The party command index number to insert.
 * @type number
 * @default 1
 * @min 0
 * @parent BasicSetting
 * 
 * @param BattleFormationCommandName
 * @text Sort command name
 * @desc Set the command name for sorting (battle command). If left blank, the name in the database will be used.
 * @type string
 * @default 
 * @parent BasicSetting
 * 
 * @param CondFormationActor
 * @text Actor Command Sorting Conditions
 * @desc Specifies the conditions for opening the Actor Command Reordering screen.
 * @type combo
 * @option BattleManager.actor() === $gameParty.leader()://Leader only
 * @default
 * @parent BasicSetting
 * 
 * @param FormationActorState
 * @text After state
 * @desc A state is granted when a standby member is moved to a combat member.
 * @type state
 * @default 0
 * @parent BasicSetting
 * 
 * @param EndTurnAfteExecution
 * @text End of turn after TPB sorting
 * @desc After rearranging using the TPB, the turn ends. A turn does not end if it is executed from a party command, in battle, or when sub members are switched.
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param BattleMemberWindowSetting
 * @text Formation Window Settings
 * @default ------------------------------
 * 
 * @param BattleMemberNameSetting
 * @text Battle member name window settings
 * @default ------------------------------
 * @parent BattleMemberWindowSetting
 * 
 * @param BattleMemberName_X
 * @text Battle member name window X coordinate
 * @desc Battle member name window X coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberNameSetting
 * 
 * @param BattleMemberName_Y
 * @text Battle member name window Y coordinate
 * @desc Battle member name window Y coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberNameSetting
 * 
 * @param MemberNameSetting
 * @text Standby Member Name Window Settings
 * @default ------------------------------
 * @parent BattleMemberWindowSetting
 * 
 * @param MemberName_X
 * @text Standby member name window X coordinate
 * @desc Standby member name window X coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberNameSetting
 * 
 * @param MemberName_Y
 * @text Standby member name window Y-coordinate
 * @desc Standby member name window Y-coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberNameSetting
 * 
 * @param BattleMemberSetting
 * @text Battle Member Window Settings
 * @default ------------------------------
 * @parent BattleMemberWindowSetting
 * 
 * @param BattleMember_Cols
 * @text Battle member horizontally display number
 * @desc Battle member horizontally display number. If it is 0, the display width will change according to the maximum number of members.
 * @type number
 * @default 0
 * @min 0
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_Rows
 * @text Battle member vertical display number
 * @desc Battle member vertical display number.
 * @type number
 * @default 1
 * @min 1
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_X
 * @text Battle member window X coordinate
 * @desc Battle member window X coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_Y
 * @text Battle member window Y coordinate
 * @desc Battle member window Y coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberSetting
 * 
 * @param MemberSetting
 * @text Standby member window settings
 * @default ------------------------------
 * @parent BattleMemberWindowSetting
 * 
 * @param Member_Cols
 * @text Standby member horizontally display number
 * @desc Standby member horizontally display number.
 * @type number
 * @default 10
 * @min 0
 * @parent MemberSetting
 * 
 * @param Member_Rows
 * @text Standby member vertical display number
 * @desc Standby member vertical display number.
 * @type number
 * @default 1
 * @parent MemberSetting
 * 
 * @param Member_X
 * @text Standby member window X coordinate
 * @desc Standby member window X coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberSetting
 * 
 * @param Member_Y
 * @text Standby member window Y coordinate
 * @desc Standby member window Y coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberSetting
 * 
 * @param StatusSetting
 * @text Status Window Settings
 * @default ------------------------------
 * @parent BattleMemberWindowSetting
 * 
 * @param Status_X
 * @text Status window X coordinate
 * @desc Status window X coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param Status_Y
 * @text Status window Y coordinate
 * @desc Status window Y coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param Status_Width
 * @text Status window width
 * @desc Status window width.
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param Status_Height
 * @text Status window height
 * @desc Status window height.
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param ContentsSetting
 * @text Content Settings
 * @default ------------------------------
 * @parent StatusSetting
 * 
 * @param ActorStatus
 * @text Display actor status settings
 * @desc Actor Display Status Settings.
 * @default 
 * @type struct<ActorStatusList>[]
 * @parent ContentsSetting
 * 
 * @param ContentsCols
 * @text Contents cols
 * @desc Number of columns of content in an item.
 * @type number
 * @default 4
 * @min 1
 * @max 4
 * @parent ContentsSetting
 * 
 */
/*~struct~ActorStatusList:
 *
 * @param DateSelect
 * @text Status to display
 * @desc Specifies the status to display.
 * @type select
 * @option None
 * @value None
 * @option Nane(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option Face(1)(2)(3)(4)(26)
 * @value Face
 * @option Actor name(1)(2)(3)(4)(5)(9)(11)(12)
 * @value ActorName
 * @option Nickname(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Nickname
 * @option Class(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Class
 * @option Level(1)(2)(3)(4)(5)(6)(9)(11)(12)(13)
 * @value Level
 * @option State(1)(2)(3)(4)(5)(16※1)
 * @value State
 * @option State (same display as for battle)(1)(2)(3)(4)
 * @value State2
 * @option Original parameter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(17)(18)
 * @value OrgParam
 * @option HP Gauge(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value HpGauge
 * @option MP Gauge(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value MpGauge
 * @option TP Gauge(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value TpGauge
 * @option CircularHP(1)(2)(3)(4)(7)(20)(21)(23)(24)
 * @value HpCircularGauge
 * @option CircularMP(1)(2)(3)(4)(7)(20)(23)
 * @value MpCircularGauge
 * @option CircularTP(1)(2)(3)(4)(7)(20))(23)
 * @value TpCircularGauge
 * @option Exp Info(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(17)
 * @value ExpInfo
 * @option Next EXP(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(17)(18)
 * @value Exp
 * @option EXP Gauge(1)(2)(3)(4)(5)(7)(18)(20)(21)(23)(24)
 * @value ExpGauge
 * @option EXP Circle Gauge(1)(2)(3)(4)(18)(20)(23)
 * @value ExpCircularGauge
 * @option ATK(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Atk
 * @option DEF(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Def
 * @option MAT(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Mat
 * @option MDF(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Mdf
 * @option AGI(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Agi
 * @option LUK(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Luk
 * @option Hit(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Hit
 * @option Evasion(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Eva
 * @option Critcal rate(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Cri
 * @option Critcal evade(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value CritcalEvade
 * @option Magic evade(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MagicEvade
 * @option Magic reflect(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MagicrEflect
 * @option Counter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Counter
 * @option HP regen(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value HpRegen
 * @option MP regen(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value MpRegen
 * @option TP regen(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value TpRegen
 * @option Aggro(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Aggro
 * @option Guard(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Guard
 * @option Recovery(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Recovery
 * @option Item effect(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value ItemEffect
 * @option MP cost(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MpCost
 * @option TP charge(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value TpCharge
 * @option Physical damage(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value PhysicalDamage
 * @option Magical damage(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MagicalDamage
 * @option Floor damage(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value FloorDamage
 * @option Gain exp rate(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value GainExpRate
 * @option Original gauge(1)(2)(3)(4)(5)(7)(16)(18)(20)(21)(22)(23)(24)
 * @value OrgGauge
 * @option Equip(1)(2)(3)(4)(5)(6)(7)(8)(11)(12)(17)(30)(31)
 * @value Equip
 * @option Image(1)(2)(3)(4)(25)
 * @value Imges
 * @option Character chip(1)(2)(3)(4)(26)
 * @value Charchip
 * @option SV Actor(1)(2)(3)(4)(26)
 * @value SvActor
 * @option Free Text(1)(2)(3)(4)(35)
 * @value Freetext
 * @option Line(1)(2)(3)(4)(5)(8)
 * @value HorzLine
 * @default None
 * 
 * @param X_Position
 * @text X display col position(1)
 * @desc X display col position
 * @type number
 * @default 1
 * @min 1
 * @max 1
 * 
 * @param Y_Position
 * @desc Y display row position
 * @text Y display row position(2)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X coordinate (relative)(3)
 * @desc X coordinate (relative coordinate from X display col position)
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y coordinate (relative)(4)
 * @desc Y coordinate (relative coordinate from Y display row position)
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc Item, gauge width(0 for default width)
 * @text Item, gauge width(5)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc Width of item name (default width at 0)
 * @text Width of item name(6)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ParamName
 * @desc Set the item name.
 * @text Name(7)
 * @type string
 * @default
 * 
 * @param NameColor
 * @desc System color ID for system items. You can enter the color code in the text tab.
 * @text Name color(8)
 * @type color
 * @default 16
 * @min 0
 * 
 * @param Align
 * @desc Align.
 * @text Align(9)
 * @type select
 * @option Left
 * @value 'left'
 * @option Right
 * @value 'right'
 * @option Center
 * @value 'center'
 * @default 'left'
 * 
 * @param paramUnit
 * @desc Set the units.
 * @text Unit(10)
 * @type string
 * @default 
 * 
 * @param FontSize
 * @desc Font size (difference from main font)
 * @text Font size(11)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param FontFace
 * @desc Sets the font for item names.
 * @text Item name font(12)
 * @type string
 * @default 
 * 
 * @param ValueFontFace
 * @desc Sets the font for parameter text.
 * @text Parameter font(13)
 * @type string
 * @default 
 * 
 * @param Icon
 * @desc Set the icon.
 * @text Icon(14)
 * @type icon
 * @default 0
 * 
 * @param IconY
 * @desc Specifies the Y coordinate to adjust the icon (relative).
 * @text Icon adjustment Y coordinate(15)
 * @type number
 * @default 2
 * @min -99
 * 
 * @param DetaEval
 * @desc Enter an evaluation formula or string.
 * @text Evaluation formula or string(javaScript)(16)
 * @type combo
 * @option '$gameVariables.value(0);//Game variable'
 * @option 'actor;//Actor game data'
 * @option 'actor.actor();//Actor system data'
 * @default 
 * 
 * @param Back
 * @text Content background display(17)
 * @desc Shows the content background.
 * @type boolean
 * @default false
 * 
 * @param Decimal
 * @text Number of decimal places(18)
 * @desc The number of decimal places that can be displayed.
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * 
 * @param GaugeSetting
 * @text Gauge Settings
 * @default ------------------------------
 * 
 * @param GaugeID
 * @desc Identification ID.
 * @text  Identification ID(20)
 * @type string
 * @default 
 * @parent GaugeSetting
 * 
 * @param GaugeHeight
 * @desc Specifies the vertical width of a gauge.
 * @text Gauge vertical width(21)
 * @type number
 * @default 12
 * @min 0
 * @max 24
 * @parent GaugeSetting
 * 
 * @param DetaEval2
 * @desc Max value evaluation formula.
 * @text Max evaluation formula(javaScript)(22)
 * @type combo
 * @option '$gameVariables.value(0);//Game variable'
 * @option 'actor;//Actor game data'
 * @option 'actor.actor();//Actor system data'
 * @default 
 * @parent GaugeSetting
 * 
 * @param Color1
 * @desc Gauge system color ID (left). You can enter the color code in the text tab.
 * @text Gauge color (left)(23)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param Color2
 * @desc Gauge system color ID (right). You can enter the color code in the text tab.
 * @text Gauge color (right)(24)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param ImgSetting
 * @text Image settings
 * @default ------------------------------
 * 
 * @param ImgData
 * @desc Specifies the image to display.
 * @text Image(25)
 * @type file
 * @dir img/
 * @default 
 * @parent ImgSetting
 * 
 * @param BattleMemberOpacity
 * @text Non-battle member image translucency(26)
 * @desc Semi-transparency is enabled outside the battle members.
 * @type boolean
 * @default true
 * @parent ImgSetting
 * 
 * @param EquipSetting
 * @text Equipment Settings
 * @default ------------------------------
 * 
 * @param EquipStartIndex
 * @text Start Index(30)
 * @desc Specifies the starting index of the equipment column.
 * @type number
 * @default 0
 * @min 0
 * @max 99999
 * @parent EquipSetting
 * 
 * @param EquipNum
 * @text Display equipment number(31)
 * @desc Specifies the display of the equipment column. (No limit at 0)
 * @type number
 * @default 0
 * @parent EquipSetting
 * 
 * @param OtherSetting
 * @text Other settings
 * @default ------------------------------
 * 
 * @param Text
 * @desc Enter the text of the free text. (Text code can be used)
 * @text Free text text(35)
 * @type multiline_string
 * @default
 * @parent OtherSetting
 * 
 * @param CondSetting
 * @text Display condition settings
 * @default ------------------------------
 * 
 * @param Conditions
 * @desc Specify the conditions under which the item will be displayed. (JavaScript)
 * @text Item conditions
 * @type combo
 * @option '$gameVariables.value(0);//Game variable'
 * @option 'actor;//Actor game data'
 * @option 'actor.actor();//Actor system data'
 * @option '$dataSystem.optDisplayTp'//TP display
 * @default 
 *
 */
/*~struct~actorImgList:
 * 
 * @param ActorId
 * @text Actor
 * @desc Specify the actor.
 * @type actor
 * @default 0
 * 
 * @param ClassId
 * @text Class ID
 * @desc Specify your occupation.
 * @type class
 * @default 0
 * 
 * @param ActorImg
 * @text Actor image
 * @desc Display the image of the actor. If you want to switch the standing picture, please set the image in the list. 
 * @type file
 * @dir img/
 * @default 
 * 
 * @param Actor_X
 * @desc X coordinate of the image.
 * @text Image x-coordinate
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Y
 * @desc Y coordinate of the image.
 * @text Image y-coordinate
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SX
 * @desc The display start coordinate X of the image.
 * @text Image display start coordinate X
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SY
 * @desc The display start coordinate Y of the image.
 * @text Image display start coordinate Y
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *  
 */
/*:ja
 * @target MZ
 * @plugindesc メンバー変更画面(戦闘)
 * @author NUUN
 * @version 2.0.0
 * @base NUUN_SceneFormation
 * @orderAfter NUUN_SceneFormation
 * 
 * @help
 * 戦闘中にメンバーを変更できるようにします。
 * このプラグインはメンバー変更画面（NUUN_SceneFormation）の拡張機能です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/6/22 Ver.2.0.0
 * プラグインパラメータの仕様を変更。
 * TPBでアクターコマンドからのメンバー交代後で、実行したアクターのターンを終了させる機能を追加。
 * 控えメンバーから戦闘メンバーに移動したときに、ステートを付与させる機能を追加。
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param MenuFormationLayout
 * @text メニュー時レイアウトと同じ
 * @desc メニューから開いた時のレイアウトの表示にします。
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param WindowCenter
 * @text ウィンドウ中央自動調整
 * @desc ウィンドウを中央に自動調整します。待機メンバーウィンドウの横幅で調整されます。
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param WindowZero
 * @text ウィンドウ基準0
 * @desc すべてのウィンドウの座標基準を0,0にします。独自にレイアウトを変更したい場合に使用してください。
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param CursorSwitchingDirection
 * @text カーソル切り替え方向
 * @desc バトルメンバーと控えメンバーのカーソル移動切り替え時の方向。
 * @type select
 * @option バトルメンバー(上)控えメンバー(下)
 * @value 0
 * @option バトルメンバー(左)控えメンバー(右)
 * @value 1
 * @default 0
 * @parent BasicSetting
 * 
 * @param CommandShowMode
 * @text コマンド表示対象
 * @desc 並び替えをコマンドに表示させる対象。
 * @type select
 * @option なし
 * @value 'None'
 * @option パーティコマンド
 * @value 'Party'
 * @option アクターコマンド
 * @value 'Actor'
 * @default 'Party'
 * @parent BasicSetting
 * 
 * @param CommandIndex
 * @text 挿入インデックス番号
 * @desc 挿入するパーティコマンドインデックス番号。
 * @type number
 * @default 1
 * @min 0
 * @parent BasicSetting
 * 
 * @param BattleFormationCommandName
 * @text 並び替えコマンド名
 * @desc 並び替え(戦闘時のコマンド)のコマンド名を設定します。無記入の場合はデータベースの名称が適用されます。
 * @type string
 * @default 
 * @parent BasicSetting
 * 
 * @param CondFormationActor
 * @text アクターコマンドの並び替え条件
 * @desc アクターコマンドの並び替え画面を開ける条件を指定します。
 * @type combo
 * @option BattleManager.actor() === $gameParty.leader()://リーダーのみ
 * @default
 * @parent BasicSetting
 * 
 * @param FormationActorState
 * @text 交代後ステート
 * @desc 控えメンバーから戦闘メンバーに移動した際にステートを付与します。
 * @type state
 * @default 0
 * @parent BasicSetting
 * 
 * @param EndTurnAfteExecution
 * @text TPB並び替え後ターン終了
 * @desc TPBで並び替えを実行後、ターンを終了します。パーティコマンドからの実行、戦闘メンバー、控えメンバー同士の交代ではターン終了は行いません。
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param BattleMemberWindowSetting
 * @text メンバー変更ウィンドウ設定
 * @default ------------------------------
 * 
 * @param BattleMemberNameSetting
 * @text 戦闘メンバー名称ウィンドウ設定
 * @default ------------------------------
 * @parent BattleMemberWindowSetting
 * 
 * @param BattleMemberName_X
 * @text 戦闘メンバー名称ウィンドウX座標
 * @desc 戦闘時の戦闘メンバー名称ウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberNameSetting
 * 
 * @param BattleMemberName_Y
 * @text 戦闘メンバー名称ウィンドウY座標
 * @desc 戦闘時の戦闘メンバー名称ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberNameSetting
 * 
 * @param MemberNameSetting
 * @text 待機メンバー名称ウィンドウ設定設定
 * @default ------------------------------
 * @parent BattleMemberWindowSetting
 * 
 * @param MemberName_X
 * @text 待機メンバー名称ウィンドウX座標
 * @desc 戦闘時の待機メンバー名称ウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberNameSetting
 * 
 * @param MemberName_Y
 * @text 待機メンバー名称ウィンドウY座標
 * @desc 戦闘時の待機メンバー名称ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberNameSetting
 * 
 * @param BattleMemberSetting
 * @text 戦闘メンバーウィンドウ設定
 * @default ------------------------------
 * @parent BattleMemberWindowSetting
 * 
 * @param BattleMember_Cols
 * @text 戦闘メンバー横表示数
 * @desc 戦闘メンバー横表示数(戦闘) 0で最大メンバー数に応じて表示幅が変わります。
 * @type number
 * @default 0
 * @min 0
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_Rows
 * @text 戦闘メンバー縦表示数
 * @desc 戦闘メンバー縦表示数(戦闘)
 * @type number
 * @default 1
 * @min 1
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_X
 * @text 戦闘メンバーウィンドウX座標
 * @desc 戦闘時の戦闘メンバーウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_Y
 * @text 戦闘メンバーウィンドウY座標
 * @desc 戦闘時の戦闘メンバーウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberSetting
 * 
 * @param MemberSetting
 * @text 待機メンバーウィンドウ設定
 * @default ------------------------------
 * @parent BattleMemberWindowSetting
 * 
 * @param Member_Cols
 * @text 待機メンバー横表示数
 * @desc 待機メンバー横表示数(戦闘)
 * @type number
 * @default 10
 * @min 0
 * @parent MemberSetting
 * 
 * @param Member_Rows
 * @text 待機メンバー縦表示数
 * @desc 待機メンバー縦表示数(戦闘)
 * @type number
 * @default 1
 * @parent MemberSetting
 * 
 * @param Member_X
 * @text 待機メンバーウィンドウX座標
 * @desc 戦闘時の待機メンバーウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberSetting
 * 
 * @param Member_Y
 * @text 待機メンバーウィンドウY座標
 * @desc 戦闘時の待機メンバーウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberSetting
 * 
 * @param StatusSetting
 * @text ステータスウィンドウ設定
 * @default ------------------------------
 * @parent BattleMemberWindowSetting
 * 
 * @param Status_X
 * @text ステータスウィンドウX座標
 * @desc 戦闘時のステータスウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param Status_Y
 * @text ステータスウィンドウY座標
 * @desc 戦闘時のステータスウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param Status_Width
 * @text ステータスウィンドウ横幅
 * @desc ステータスウィンドウ横幅
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param Status_Height
 * @text ステータスウィンドウ縦幅
 * @desc ステータスウィンドウ縦幅
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param ContentsSetting
 * @text コンテンツ設定
 * @default ------------------------------
 * @parent StatusSetting
 * 
 * @param ActorStatus
 * @text 表示ステータス設定
 * @desc アクターの表示ステータス設定(空白でメニュー用と同じ)
 * @default
 * @type struct<ActorStatusList>[]
 * @parent ContentsSetting
 * 
 * @param ContentsCols
 * @text コンテンツ列数
 * @desc 項目のコンテンツ列数
 * @type number
 * @default 4
 * @min 1
 * @max 4
 * @parent ContentsSetting
 * 
 * @param ActorImgSetting
 * @text ステータスウィンドウアクター画像設定
 * @default ------------------------------
 * 
 * @param GraphicMode
 * @desc ステータスウィンドウに表示するアクター画像を指定します。
 * @text ステータスウィンドウ表示アクター画像
 * @type select
 * @option 表示なし
 * @value 'none'
 * @option 画像(アクターステータスウィンドウ内)
 * @value 'img'
 * @option 画像
 * @value 's_img'
 * @default 'none'
 * @parent ActorImgSetting
 * 
 * @param ActorsImgList
 * @text 画像設定
 * @desc アクターの画像設定
 * @default []
 * @type struct<actorImgList>[]
 * @parent ActorImgSetting
 * 
 * @param ActorPictureEXApp
 * @text 立ち絵表示EX適用
 * @desc 立ち絵表示EXの画像変更を適用します。OFFにした場合はこのプラグインでの設定が適用されます。
 * @type boolean
 * @default false
 * @parent ActorImgSetting
 * 
 * @param ActorImg_X
 * @text アクター画像基本X座標
 * @desc アクター画像の基本X座標
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorImgSetting
 * 
 * @param ActorImg_Y
 * @text アクター画像基本Y座標
 * @desc アクター画像の基本Y座標
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorImgSetting
 * 
 * @param ActorPosition
 * @text 立ち絵表示位置
 * @desc 立ち絵の表示位置を指定します。Apengは適用されません。
 * @type select
 * @option 左
 * @value Left
 * @option 中央
 * @value Center
 * @option 右
 * @value Right
 * @default Right
 * @parent ActorImgSetting
 * 
 */
/*~struct~ActorStatusList:ja
 *
 * @param DateSelect
 * @text 表示するステータス
 * @desc 表示するステータスを指定します。
 * @type select
 * @option なし
 * @value None
 * @option 名称のみ(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option 顔グラ(1)(2)(3)(4)(26)
 * @value Face
 * @option 立ち絵(1)(2)(3)(4)(26)
 * @value ActorGraphic
 * @option アクター名(1)(2)(3)(4)(5)(9)(11)(12)
 * @value ActorName
 * @option 二つ名(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Nickname
 * @option 職業(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Class
 * @option レベル(1)(2)(3)(4)(5)(6)(9)(11)(12)(13)
 * @value Level
 * @option ステート(1)(2)(3)(4)(5)(16※1)
 * @value State
 * @option ステート(戦闘用と同じ表示)(1)(2)(3)(4)
 * @value State2
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(17)(18)
 * @value OrgParam
 * @option HPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value HpGauge
 * @option MPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value MpGauge
 * @option TPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value TpGauge
 * @option CircularHP(1)(2)(3)(4)(7)(20)(21)(23)(24)
 * @value HpCircularGauge
 * @option CircularMP(1)(2)(3)(4)(7)(20)(23)
 * @value MpCircularGauge
 * @option CircularTP(1)(2)(3)(4)(7)(20))(23)
 * @value TpCircularGauge
 * @option 現在の経験値(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(17)
 * @value ExpInfo
 * @option 次のレベルまでの経験値(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(17)(18)
 * @value Exp
 * @option 経験値（ゲージあり）(1)(2)(3)(4)(5)(7)(18)(20)(21)(23)(24)
 * @value ExpGauge
 * @option 経験値サークルゲージ (1)(2)(3)(4)(18)(20)(23)
 * @value ExpCircularGauge
 * @option 攻撃力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Atk
 * @option 防御力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Def
 * @option 魔法力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Mat
 * @option 魔法防御(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Mdf
 * @option 敏捷性(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Agi
 * @option 運(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Luk
 * @option 命中率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Hit
 * @option 回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Eva
 * @option 会心率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Cri
 * @option 会心回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value CritcalEvade
 * @option 魔法回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MagicEvade
 * @option 魔法反射率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MagicrEflect
 * @option 反撃率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Counter
 * @option HP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value HpRegen
 * @option MP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value MpRegen
 * @option TP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value TpRegen
 * @option 狙われ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Aggro
 * @option 防御効果率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Guard
 * @option 回復効果率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Recovery
 * @option 薬の知識(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value ItemEffect
 * @option MP消費率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MpCost
 * @option TPチャージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value TpCharge
 * @option 物理ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value PhysicalDamage
 * @option 魔法ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MagicalDamage
 * @option 床ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value FloorDamage
 * @option 獲得経験値率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value GainExpRate
 * @option 独自ゲージ(1)(2)(3)(4)(5)(7)(16)(18)(20)(21)(22)(23)(24)
 * @value OrgGauge
 * @option 装備(1)(2)(3)(4)(5)(6)(7)(8)(11)(12)(17)(30)(31)
 * @value Equip
 * @option 画像(1)(2)(3)(4)(25)
 * @value Imges
 * @option キャラチップ(1)(2)(3)(4)(26)
 * @value Charchip
 * @option SVアクター(1)(2)(3)(4)(26)
 * @value SvActor
 * @option フリーテキスト(1)(2)(3)(4)(35)
 * @value Freetext
 * @option ライン(1)(2)(3)(4)(5)(8)
 * @value HorzLine
 * @default None
 * 
 * @param X_Position
 * @text X表示列位置(1)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 4
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(2)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X座標（相対）(3)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(4)
 * @desc Y座標（Y表示行位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目、ゲージ横幅（0でデフォルト幅）
 * @text 項目、ゲージ横幅(5)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc 項目名称の横幅（0でデフォルト幅）
 * @text 項目名称横幅(6)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(7)
 * @type string
 * @default
 * 
 * @param NameColor
 * @desc 項目名称のシステムカラーID。テキストタブでカラーコードを入力できます。
 * @text 項目名称文字色(8)
 * @type color
 * @default 16
 * @min 0
 * 
 * @param Align
 * @desc 文字揃え。
 * @text 文字揃え(9)
 * @type select
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @option 中央
 * @value 'center'
 * @default 'left'
 * 
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位(10)
 * @type string
 * @default 
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(11)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param FontFace
 * @desc 項目名称のフォントを設定します。
 * @text 項目名称フォント(12)
 * @type string
 * @default 
 * 
 * @param ValueFontFace
 * @desc 数値のフォントを設定します。
 * @text 数値フォント(13)
 * @type string
 * @default 
 * 
 * @param Icon
 * @desc アイコンを設定します。
 * @text アイコン(14)
 * @type icon
 * @default 0
 * 
 * @param IconY
 * @desc アイコンを調整するY座標を指定します。(相対)
 * @text アイコン調整Y座標(15)
 * @type number
 * @default 2
 * @min -99
 * 
 * @param DetaEval
 * @desc 評価式または文字列を記入します。
 * @text 評価式or文字列(javaScript)(16)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @default 
 * 
 * @param Back
 * @text コンテンツ背景表示(17)
 * @desc コンテンツ背景を表示させます。
 * @type boolean
 * @default false
 * 
 * @param Decimal
 * @text 小数点桁数(18)
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * 
 * @param GaugeSetting
 * @text ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeID
 * @desc 識別ID。
 * @text 識別ID(20)
 * @type string
 * @default 
 * @parent GaugeSetting
 * 
 * @param GaugeHeight
 * @desc ゲージの縦幅を指定します。
 * @text ゲージの縦幅(21)
 * @type number
 * @default 12
 * @min 0
 * @max 24
 * @parent GaugeSetting
 * 
 * @param DetaEval2
 * @desc 最大値の評価式。
 * @text 最大値評価式(javaScript)(22)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @default 
 * @parent GaugeSetting
 * 
 * @param Color1
 * @desc ゲージのシステムカラーID(左)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(左)(23)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param Color2
 * @desc ゲージのシステムカラーID(右)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(右)(24)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param ImgSetting
 * @text 画像設定
 * @default ------------------------------
 * 
 * @param ImgData
 * @desc 表示する画像を指定します。
 * @text 画像(25)
 * @type file
 * @dir img/
 * @default 
 * @parent ImgSetting
 * 
 * @param BattleMemberOpacity
 * @text 非バトルメンバー画像半透明(26)
 * @desc バトルメンバーではない時の半透明有効。
 * @type boolean
 * @default true
 * @parent ImgSetting
 * 
 * @param EquipSetting
 * @text 装備設定
 * @default ------------------------------
 * 
 * @param EquipStartIndex
 * @text 開始インデックス(30)
 * @desc 装備欄の開始インデックスを指定します。
 * @type number
 * @default 0
 * @min 0
 * @max 99999
 * @parent EquipSetting
 * 
 * @param EquipNum
 * @text 表示装備数(31)
 * @desc 装備欄の表示を指定します。(0で制限なし)
 * @type number
 * @default 0
 * @parent EquipSetting
 * 
 * @param OtherSetting
 * @text その他設定
 * @default ------------------------------
 * 
 * @param Text
 * @desc フリーテキストのテキストを記入します。(制御文字使用可能)
 * @text フリーテキストのテキスト(35)
 * @type multiline_string
 * @default
 * @parent OtherSetting
 * 
 * @param CondSetting
 * @text 表示条件設定
 * @default ------------------------------
 * 
 * @param Conditions
 * @desc 項目が表示される条件を指定します。(JavaScript)
 * @text 項目条件(all)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @option '$dataSystem.optDisplayTp'//TP表示
 * @default 
 *
 */
/*~struct~actorImgList:ja
 * 
 * @param ActorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * @default 0
 * 
 * @param ClassId
 * @text 職業ID
 * @desc 職業を指定します。職業のIDが指定されている場合はこちらが優先されます。
 * @type class
 * @default 0
 * 
 * @param ActorImg
 * @text アクター画像
 * @desc アクターの画像を表示します。
 * @type file
 * @dir img/
 * @default 
 * 
 * @param Actor_X
 * @desc 画像のX座標。
 * @text 画像X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Y
 * @desc 画像のY座標。
 * @text 画像Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SX
 * @desc 画像の表示開始座標X。
 * @text 画像表示開始座標X
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SY
 * @desc 画像の表示開始座標Y
 * @text 画像表示開始座標Y
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 *  
 */
var Imported = Imported || {};
Imported.NUUN_SceneBattleFormation = true;

(() => {

    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    function getBattleFormationCommandName() {
        return params.BattleFormationCommandName ? params.BattleFormationCommandName : TextManager.formation;
    }

    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.call(this);
        this.formationRefresh = false;
    };

    Game_Party.prototype.formationMakeActions = function() {
        if ($gameTemp.formationRefresh) {
            if (Imported.NUUN_SupportActor) {
                $gameParty.setWithSupportActorMember();
            }
            for (const member of this.members()) {
                member._actionInputIndex = 0;
                if (member._actions.length === 0) {
                    member.makeActions();
                }
            }
        }
    };

    Window_Command.prototype.addFormationCommand = function() {
        this.addCommand(getBattleFormationCommandName(), "formation", $gameParty.useFormation());
        this._list.splice(params.CommandIndex, 0, this._list.pop());
    };

    Window_Command.prototype.addFormationActorCommand = function() {
        this.addCommand(getBattleFormationCommandName(), "formation", $gameParty.useFormationActor());
        this._list.splice(params.CommandIndex, 0, this._list.pop());
    };

    const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
    Window_PartyCommand.prototype.makeCommandList = function() {
        _Window_PartyCommand_makeCommandList.call(this);
        if (params.CommandShowMode === "Party")
        this.addFormationCommand();
    };

    const _Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
    Window_ActorCommand.prototype.makeCommandList = function() {
        _Window_ActorCommand_makeCommandList.call(this);
        if (this._actor && params.CommandShowMode === "Actor") {
            this.addFormationActorCommand();
        }
    };

    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        this._formation = this.setNuun_Formation(true, params);
        this._formation.create();
    };
    
    const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function() {
        _Scene_Battle_createPartyCommandWindow.call(this);
        this._partyCommandWindow.setHandler("formation", this.commandFormation.bind(this));
    };

    const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function() {
        _Scene_Battle_createActorCommandWindow.call(this);
        this._actorCommandWindow.setHandler("formation", this.actorCommandFormation.bind(this));
    };
    
    Scene_Battle.prototype.commandFormation = function() {
        this._formation.setCommand(this._partyCommandWindow);
        this._formation.open();
    };
    
    Scene_Battle.prototype.actorCommandFormation = function() {
        this._formation.setCommand(this._actorCommandWindow);
        this._formation.open();
    };

    const _Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    Scene_Battle.prototype.isAnyInputWindowActive = function() {
        return (_Scene_Battle_isAnyInputWindowActive.call(this) ||
        this._formation._battleMemberWindow.active ||
        this._formation._memberWindow.active);
    };
    
    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        this._formation.update();
    };

    Scene_Battle.prototype.isFormationActive = function() {
        return this._formation._battleMemberWindow.active || this._formation._memberWindow.active;
    };
    
    const _Scene_Battle_needsInputWindowChange = Scene_Battle.prototype.needsInputWindowChange;
    Scene_Battle.prototype.needsInputWindowChange = function() {
        return _Scene_Battle_needsInputWindowChange.call(this) && !this.isFormationActive();
    };
    
    const _Scene_Battle_hideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows;
    Scene_Battle.prototype.hideSubInputWindows = function() {
        _Scene_Battle_hideSubInputWindows.call(this);
        this._formation._battleMemberWindow.deactivate();
        this._formation._memberWindow.deactivate();
        this._formation._battleMemberNameWindow.hide();
        this._formation._memberNameWindow.hide();
        this._formation._battleMemberWindow.hide();
        this._formation._memberWindow.hide();
        this._formation._memberStatusWindow.hide();
    };

    Game_Party.prototype.useFormationActor = function() {
        return (params.CondFormationActor ? eval(params.CondFormationActor) : true) && this.useFormation();
    };


    const _Spriteset_Battle_updateActors = Spriteset_Battle.prototype.updateActors;
    Spriteset_Battle.prototype.updateActors = function() {
        this.addCreateActors();
        _Spriteset_Battle_updateActors.apply(this, arguments);
    };
    

    Spriteset_Battle.prototype.addCreateActors = function() {
        if ($gameSystem.isSideView() && this._actorSprites && $gameParty.maxBattleMembers() > this._actorSprites.length) {
            const count = $gameParty.maxBattleMembers() - this._actorSprites.length;
            for (let i = 0; i < count; i++) {
                const sprite = new Sprite_Actor();
                sprite.startMove(0, 0, 0);//暫定
                this._actorSprites.push(sprite);
                this._battleField.addChild(sprite);
            }
        }
    };


    BattleManager.battleCommandRefresh = function() {
        if ($gameTemp.formationRefresh) {
            $gameTemp.formationRefresh = false;
            if (this.isTpb()) {
                if (this._currentActor) {
                    if (Imported.NUUN_SupportActor) {
                        $gameParty.setWithSupportActorMember();
                    }
                    const index = $gameParty.battleMembers().indexOf(this._currentActor);
                    if (index >= 0) {
                        SceneManager._scene._statusWindow.selectActor(this._currentActor);
                    } else {
                        this._currentActor = null;
                    }
                }
            } else {
                if (this._currentActor)
                this._currentActor = null;
            }
        }  
    };
    
})();