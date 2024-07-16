/*:-----------------------------------------------------------------------------------
 * NUUN_ActorPicture.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
 /*:
 * @target MZ
 * @plugindesc Actor Graphics, Face Graphics Display EX
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.7.2
 * 
 * @help
 * This is a plugin that processes the display of actor graphics and face graphics images.
 * A compatible plugin is required to display them.
 * Actor graphics and face graphics can be changed automatically depending on the conditions.
 * 
 * All conditions match
 * An image will be displayed when all of the All Conditions Matched conditions are met.
 * Conditions that are not set will not be judged and true will be returned.
 * The priority of standing image and facial graphics display is judged from the top, and the first setting whose conditions are met will be applied.
 * Set conditional standing image and facial graphics settings high in the list.
 * 
 * Condition setting
 * Set by selecting some part in the change scene.
 * 
 * The index numbers of the face graphics are from the top left
 * 0 1 2 3
 * 4 5 6 7
 * 8 9 10 11
 * 12 13 14 15
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/16/2021 Ver.1.7.2
 * Change display in languages ​​other than Japanese to English.
 * 7/15/2021 Ver.1.7.1
 * Fixed an issue where an error would occur when opening certain scenes.。
 * 7/13/2024 Ver.1.7.0
 * Added the ability to specify which classes can be displayed.
 * 3/26/2021 Ver.1.0.0
 * First edition.
 * 
 * @param ButlerActors
 * @text Display actor settings
 * @desc Specifies the actor that will display the image.
 * @type struct<ActorButlerList>[]
 * @default []
 * 
 */
/*~struct~ActorButlerList:
 * 
 * @param ImgName
 * @text Actor Image Name
 * @desc A name to distinguish the actor image.
 * @type string
 * @default
 * 
 * @param actorId
 * @text Actor ID
 * @desc Set the actor ID.
 * @type actor
 * @default 0
 * 
 * @param ClassId
 * @text Class Id
 * @desc Specifies the class. If a job ID is specified, this takes precedence.
 * @type class
 * @default 0
 * 
 * @param ButlerActorImg
 * @text Image settings
 * @desc Set the actor image.
 * @type struct<ActorButlerImgList>[]
 * @default []
 * 
 */
/*~struct~ActorButlerImgList:
 * 
 * @param GraphicImg
 * @text Actor Image
 * @desc Set the actor image. If multiple images are specified, they will be displayed randomly.
 * @type file[]
 * @dir img/
 * 
 * @param FaceImg
 * @text Face graphics image
 * @desc Set the sprite sheet for the face graphic image.
 * @type file
 * @dir img/faces
 * 
 * @param FaceIndex
 * @text Face Gra Index ID
 * @desc he index ID of the face graphic.
 * @type number
 * @default -1
 * @min -1
 * 
 * @param Opacity
 * @text Image Opacity
 * @desc Specifies the opacity of the image.
 * @type number
 * @default 255
 * @min 0
 * @max 255
 * 
 * @param AllMatch
 * @text All conditions match
 * @default ------------------------------
 * 
 * @param ImgHP
 * @text Remaining HP
 * @desc Changes when the remaining HP is within the specified range or numerical value.
 * @type struct<CondValue>
 * @default {"CondValid":"false","UpLimit":"0","DwLimit":"0"}
 * @parent AllMatch
 * 
 * @param ImgSwitch
 * @text Switch
 * @desc Changes when all the specified switches are ON.
 * @type switch[]
 * @default
 * @parent AllMatch
 * 
 * @param ImgWeapon
 * @text Weapon
 * @desc The condition is met when all of the specified weapons are equipped.
 * @type weapon[]
 * @default 
 * @parent AllMatch
 * 
 * @param ImgArmor
 * @text Armor
 * @desc The condition is met when all of the specified armor is equipped.
 * @type armor[]
 * @default 
 * @parent AllMatch
 * 
 * @param ImgClass
 * @text Class
 * @desc Certain professions qualify.
 * @type class
 * @default 0
 * @parent AllMatch
 * 
 * @param ImgStateAll
 * @text State
 * @desc The condition is met when all of the specified states are applied.
 * @type state[]
 * @default 
 * @parent AllMatch
 * 
 * @param FilteringClass
 * @text Filtering class settings
 * @desc Window class to apply. If not specified, it will be reflected in all windows. (Multiple specifications are possible)
 * @type combo[]
 * @option 'Scene_Battle'
 * @option 'Scene_Menu'
 * @option 'Scene_Status'
 * @option 'Scene_Formation'
 * @option 'Scene_Equip'
 * @option 'Window_FormationStatus'
 * @option 'Window_ItemMenuActor'
 * @default []
 * 
 * @param ChangeGraphicScenes
 * @text Changing scene
 * @desc Select the graphic change scene.
 * @type select
 * @option Default
 * @value 'default'
 * @option Death
 * @value 'death'
 * @option Dying
 * @value 'dying'
 * @option Damage
 * @value 'damage'
 * @option Cridamage
 * @value 'cridamage'
 * @option Recovery
 * @value 'recovery'
 * @option Attack(1)
 * @value 'attack'
 * @option RecoverySkill(1)
 * @value 'recoverySkill'
 * @option UseItem(2)
 * @value 'item'
 * @option Counter
 * @value 'counter'
 * @option Reflection
 * @value 'reflection'
 * @option CounterEX(CounterExtend)(4)
 * @value 'counterEX'
 * @option Guard
 * @value 'guard'
 * @option Chant
 * @value 'chant'
 * @option Victory
 * @value 'victory'
 * @option State(3)
 * @value 'state'
 * @option Command Selection
 * @value 'command'
 * @option Final Attack (1) NUUN_FinalAttack required
 * @value 'finalAttack'
 * @default 'default'
 * @parent AllMatch
 * 
 * @param CondSetting
 * @text Condition setting
 * @default ------------------------------
 * 
 * @param Skill
 * @text Skill(1)
 * @desc Select a skill. Applies when using any skill. Blank or none applies to all skills.
 * @type skill[]
 * @default
 * @parent CondSetting
 * 
 * @param Item
 * @text Item(2)
 * @desc Select an item. Applies when using any item. Blank or None applies to all items.
 * @type item[]
 * @default
 * @parent CondSetting
 * 
 * @param stateId
 * @text Received state(3)
 * @desc Select a state. Applies to all states.
 * @type state[]
 * @default 
 * @parent CondSetting
 * 
 * @param Id
 * @text Identification tag(4)
 * @desc Specifies an identification tag. Applies when all identification tags are applicable.
 * @type string[]
 * @default 
 * @parent CondSetting
 * 
 */
/*~struct~CondValue:
 * 
 * @param CondValid
 * @desc Activate the HP condition.
 * @text HP condition valid
 * @type boolean
 * @default false
 * 
 * @param UpLimit
 * @text Upper limit
 * @desc Upper limit.
 * @type number
 * @default 0
 * 
 * @param DwLimit
 * @text Lower limit
 * @desc Lower limit.
 * @type number
 * @default 0
 * 
 */
 /*:ja
 * @target MZ
 * @plugindesc 立ち絵、顔グラ表示EX
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.7.2
 * 
 * @help
 * アクターグラフィック、顔グラ画像を表示する処理を行うプラグインです。
 * 表示されるには対応のプラグインが必要になります。
 * 立ち絵、顔グラは条件により自動的に変化させることができます。
 * 
 * 全条件一致
 * 全条件一致の条件がすべて一致したときに画像が表示されます。
 * 設定していない条件は判定されずtrueを返します。
 * 立ち絵、顔グラ表示の優先度は上から判定して最初に条件が一致した設定が適用されます。
 * 条件付きの立ち絵、顔グラ設定はリストの上のほうに設定してください。
 * 
 * 条件設定
 * 変化シーンでの一部の選択で設定します。
 * 
 * 顔グラのインデックス番号は左上から順に
 * 0 1 2 3
 * 4 5 6 7
 * 8 9 10 11
 * 12 13 14 15
 * となります。
 * 
 * このプラグインは「NUUN_Base」が必要です。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/7/16 Ver.1.7.2
 * 日本語以外での表示を英語表示に変更。
 * 2024/7/15 Ver.1.7.1
 * 特定のシーンを開くとエラーが出る問題を修正。。
 * 2024/7/13 Ver.1.7.0
 * 表示出来るクラスを指定できる機能を追加。
 * 2023/12/28 Ver.1.6.5
 * 戦闘不能時の画像設定状態が正常に取得されていなかった問題を修正。
 * 一部の処理をバトルスタイル拡張側で処理するように修正。
 * 2023/12/23 Ver.1.6.4
 * 戦闘不能ステートの判定が正常に行われていなかった問題を修正。
 * ステート条件設定に0を指定していると他の条件も一致しなくなる問題を修正。
 * 2023/12/18 Ver.1.6.3
 * 戦闘中の立ち絵で画像が切り替わらない問題を修正。
 * 2023/9/2 Ver.1.6.2
 * 条件を満たしていなくても画像が切り替わってしまう問題を修正。
 * 2023/7/30 Ver.1.6.1
 * 味方の画像切り替えでランダムに表示できる機能を追加。
 * 2023/7/20 Ver.1.6.0
 * アクターIDではなく職業IDで指定できる機能を追加。
 * 2023/6/26 Ver.1.5.5
 * カウンターの画像切り替え処理を修正。
 * 2023/5/22 Ver.1.5.4
 * 条件アクター画像にクリティカルダメージ時の設定を追加。
 * 2023/4/11 Ver.1.5.3
 * CounterExtend(トリアコンタン氏)に対応。
 * 2023/2/26 Ver.1.5.2
 * 通常攻撃の画像が変化しなかった問題を修正。
 * 2023/2/24 Ver 1.5.1
 * 戦闘アニメーションがないスキルを使用後、ステートを付加させると攻撃時の画像が瞬間表示される問題を修正。
 * 2022/8/26 Ver 1.5.0
 * アクター画像変化条件に防御時、反撃時、魔法反射時を追加。
 * 2022/6/19 Ver 1.4.0
 * アクター画像条件にコマンド選択時を追加。
 * アクター画像条件に不透明度を指定できる機能を追加。
 * 全条件一致ステートの条件が機能していなかった問題を修正。
 * 2022/5/7 Ver 1.3.2
 * 条件にステートを指定するとエラーが出る問題を修正。
 * 2022/5/6 Ver 1.3.1
 * スイッチで条件判定するとエラーが出る問題を修正。
 * 2022/4/10 Ver 1.3.0
 * アクター画像設定のスイッチ、武器、防具、ステートの条件に複数指定できるように変更。
 * アクター画像設定に残りHPの条件を追加。 
 * アクター画像設定のスキル、アイテム条件が適用されていなかった問題を修正。
 * 2022/3/24 Ver 1.2.5
 * ステート条件が取得できなかった問題を修正。
 * 画像指定の仕様を変更。
 * 2022/1/8 Ver 1.2.4
 * 説明文を修正。
 * ステートによる変化が適用されない問題を修正。
 * 2021/12/15 Ver 1.2.3
 * 一部処理の修正。
 * 2021/12/12 Ver 1.2.2
 * インデックスIDに-1を設定できるように変更。（-1:デフォルトのインデックスID）
 * 2021/12/11 Ver 1.2.1
 * 顔グラのインデックスIDが正常に取得できない問題を修正。
 * 2021/12/11 Ver 1.2.0
 * 立ち絵の設定方法を再度変更。
 * ステータス表示拡張に対応。
 * 2021/7/15 Ver 1.1.1
 * アイテム使用時の画像が取得できなかった問題を修正。
 * 2021/7/12 Ver 1.1.0
 * プラグインパラメータの仕様を大幅に見直し。
 * 戦闘を行うとセーブが出来なくなる問題を修正。
 * 2021/4/20 Ver 1.0.1
 * プラグイン導入後に戦闘を開始するとエラーが出る問題を修正。
 * 2021/3/26 Ver 1.0.0
 * 初版
 * 
 * @param ButlerActors
 * @text 表示アクター設定
 * @desc 画像を表示するアクターを指定します。
 * @type struct<ActorButlerList>[]
 * @default []
 * 
 */
/*~struct~ActorButlerList:ja
 * 
 * @param actorId
 * @text アクターID
 * @desc アクターIDを設定します。
 * @type actor
 * @default 0
 * 
 * @param ClassId
 * @text 職業ID
 * @desc 職業を指定します。職業のIDが指定されている場合はこちらが優先されます。
 * @type class
 * @default 0
 * 
 * @param ImgName
 * @text アクター画像名称
 * @desc アクター画像を区別するための名称。
 * @type string
 * @default
 * 
 * @param ButlerActorImg
 * @text 画像設定
 * @desc 画像を指定します。
 * @type struct<ActorButlerImgList>[]
 * @default []
 * 
 */
/*~struct~ActorButlerImgList:ja
 * 
 * @param GraphicImg
 * @text アクター画像
 * @desc アクターの画像を設定します。複数指定の場合はランダムに表示されます。
 * @type file[]
 * @dir img/
 * 
 * @param FaceImg
 * @text 顔グラ画像
 * @desc 顔グラ画像のスプライトシートを設定します。
 * @type file
 * @dir img/faces
 * 
 * @param FaceIndex
 * @text 顔グラのインデックスID
 * @desc 顔グラのインデックスID。
 * @type number
 * @default -1
 * @min -1
 * 
 * @param Opacity
 * @text 画像不透明度
 * @desc 画像の不透明度を指定します。（現バージョンではバトルスタイル拡張のみ）
 * @type number
 * @default 255
 * @min 0
 * @max 255
 * 
 * @param AllMatch
 * @text 全条件一致
 * @default ------------------------------
 * 
 * @param ImgHP
 * @text 残りHP
 * @desc 残りHPが指定の範囲内または数値の時に変化します。
 * @type struct<CondValue>
 * @default {"CondValid":"false","UpLimit":"0","DwLimit":"0"}
 * @parent AllMatch
 * 
 * @param ImgSwitch
 * @text スイッチ
 * @desc 指定したスイッチが全てONの時に変化します。
 * @type switch[]
 * @default
 * @parent AllMatch
 * 
 * @param ImgWeapon
 * @text 武器
 * @desc 指定した武器を全て装備している時に条件を満たします。
 * @type weapon[]
 * @default 
 * @parent AllMatch
 * 
 * @param ImgArmor
 * @text 防具
 * @desc 指定した防具を全て装備している時に条件を満たします。
 * @type armor[]
 * @default 
 * @parent AllMatch
 * 
 * @param ImgClass
 * @text 職業
 * @desc 特定の職業なら条件を満たします。
 * @type class
 * @default 0
 * @parent AllMatch
 * 
 * @param ImgStateAll
 * @text ステート
 * @desc 指定したステートに全てかかっている時に条件を満たします。
 * @type state[]
 * @default 
 * @parent AllMatch
 * 
 * @param FilteringClass
 * @text フィルタリングクラス設定
 * @desc 適用するウィンドウクラスを指定します。無指定の場合は全てのウィンドウで反映されます。(複数指定可)
 * @type combo[]
 * @option 'Scene_Battle'
 * @option 'Scene_Menu'
 * @option 'Scene_Status'
 * @option 'Scene_Formation'
 * @option 'Scene_Equip'
 * @option 'Window_FormationStatus'
 * @option 'Window_ItemMenuActor'
 * @default []
 * 
 * @param ChangeGraphicScenes
 * @text 変化シーン
 * @desc グラフィックの変化シーンを選択します。
 * @type select
 * @option 通常
 * @value 'default'
 * @option 戦闘不能
 * @value 'death'
 * @option 瀕死
 * @value 'dying'
 * @option ダメージ時
 * @value 'damage'
 * @option クリティカルダメージ時
 * @value 'cridamage'
 * @option 回復時
 * @value 'recovery'
 * @option 攻撃スキル使用時(1)
 * @value 'attack'
 * @option 回復スキル使用時(1)
 * @value 'recoverySkill'
 * @option アイテム使用時(2)
 * @value 'item'
 * @option 反撃時
 * @value 'counter'
 * @option 魔法反射時
 * @value 'reflection'
 * @option 反撃時(CounterExtend)(4)
 * @value 'counterEX'
 * @option 防御時
 * @value 'guard'
 * @option 詠唱時
 * @value 'chant'
 * @option 勝利時
 * @value 'victory'
 * @option 被ステート(3)
 * @value 'state'
 * @option コマンド選択時
 * @value 'command'
 * @option ファイナルアタック時(1) 要NUUN_FinalAttack
 * @value 'finalAttack'
 * @default 'default'
 * @parent AllMatch
 * 
 * @param CondSetting
 * @text 条件設定
 * @default ------------------------------
 * 
 * @param Skill
 * @text スキル(1)
 * @desc スキルを選択します。いずれかのスキル使用時に適用します。空白の場合は全てのスキルが対象です。スキルID0は通常攻撃です。
 * @type skill[]
 * @default
 * @parent CondSetting
 * 
 * @param Item
 * @text アイテム(2)
 * @desc アイテムを選択します。いずれかのアイテム使用時に適用します。空白の場合は全てのアイテムが対象です。
 * @type item[]
 * @default
 * @parent CondSetting
 * 
 * @param stateId
 * @text 被ステート(3)
 * @desc ステートを選択します。全てのステートにかかっている時に適用します。
 * @type state[]
 * @default 
 * @parent CondSetting
 * 
 * @param Id
 * @text 識別タグ(4)
 * @desc 識別タグを指定します。全ての識別タグが該当しているときに適用します。
 * @type string[]
 * @default 
 * @parent CondSetting
 * 
 */
/*~struct~CondValue:ja
 * 
 * @param CondValid
 * @desc HP条件を有効にします。
 * @text HP条件有効
 * @type boolean
 * @default false
 * 
 * @param UpLimit
 * @text 上限値
 * @desc 上限値
 * @type number
 * @default 0
 * 
 * @param DwLimit
 * @text 下限値
 * @desc 下限値
 * @type number
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ActorPicture = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const parameters = PluginManager.parameters('NUUN_ActorPicture');

    class Nuun_ActorGraphics {
        constructor(_class) {
            this._class = _class;
            this._battler = null;
            this._data = null;
            this._actorImgIndex = -1;
            this._actorGraphicIndex = -1;
            this._actorGraphicOpacity = 255;
            this._actorGraphicName = null;
            this._actorGraphicFace = null;
            this._imgScenes = 'default';
        }

        setup(battler) {
            this._battler = battler;
            this._data = this.getGraphicsData(battler);
            this.update();
        }

        actor() {
            return this._battler;
        }

        update() {
            this.graphicRefresh();
        }

        getActorGraphicName(data) {
            const images = data.GraphicImg;
            if (Array.isArray(images)) {
                if (images.length > 1) {
                    return images[Math.randomInt(images.length)];
                } else {
                    return images[0];
                }
            } else {
                return images;
            }
        }

        getActorFaceName(data) {
            return data && data.FaceImg ? data.FaceImg : this._battler.faceName();
        }


        getGraphicsData(actor) {
            return params.ButlerActors ? params.ButlerActors.find(data => actor && data.actorId === actor.actorId()) || [] : [];
        }

        condActorImg(data, actor) {
            if (data.actorId === actor.actorId() && actor._classId === data.ClassId) {
                return true;
            } else if (data.ClassId === 0 && data.actorId === actor.actorId()) {
                return true;
            } else if (data.actorId === 0 && actor._classId === data.ClassId) {
                return true;
            }
            return false;
        }
        
        graphicRefresh() {
            if (!this._battler) {
                return;
            }
            let imgIndex = -1;
            let index = -1;
            this._isDeadImg = false;
            this._imgScenes = 'default';
            index = this._data ? this._data.ButlerActorImg.findIndex(data => this.matchConditions(data)) : -1;
            const oldFileName = this._actorGraphicName;
            const oldFileFace = this._actorGraphicFace;
            if (index >= 0) {
                const data = this._data.ButlerActorImg[index];
                this._actorGraphicName = this.getActorGraphicName(data);
                this._actorGraphicFace = this.getActorFaceName(data);
                imgIndex = this.getActorFaceIndex(data);
                this._isDeadImg = this.isActorGraphicDead(data);
                this._actorGraphicOpacity = data.Opacity || 255;
            } else {
                this._actorGraphicName = null;
                this._actorGraphicFace = this.faceName();
                imgIndex = this.faceIndex();
                this._actorGraphicOpacity = 255;
            }
            this._actorGraphicIndex = index;
            this._actorImgIndex = imgIndex;
            if (oldFileName !== this._actorGraphicName && !!this._actorGraphicName) {
                ImageManager.nuun_LoadPictures(this._actorGraphicName);
            }
            if (oldFileFace !== this._actorGraphicFace && !!this._actorGraphicFace) {
                ImageManager.loadFace(this._actorGraphicFace);
            }
        }

        matchConditions(data) {
            if (data._Class > 0 && !this.filteringClass(data)) {
                return false;
            }
            if (data.ImgHP && data.ImgHP.CondValid && !conditionsParam(data.ImgHP, this._battler.hp, this._battler.param(0))) {
                return false;
            }
            if (data.ImgSwitch && !this.isSwitchImg(data)) {
                return false;
            }
            if (data.ImgWeapon && !this.isWeaponImg(data)) {
                return false;
            }
            if (data.ImgArmor && !this.isArmorImg(data)) {
                return false;
            }
            if (data.ImgStateAll && !this.isStateImg(data, data.ImgStateAll)) {
                return false;
            }
            if (data.ImgClass > 0 && !this.isClassImg(data)) {
                return false;
            }
            if (!this.matchChangeGraphic(data)) {
                return false;
            }
            return true;
        }

        matchChangeGraphic(data) {
            const changeData = data.ChangeGraphicScenes;
            this._imgScenes = changeData;
            switch (changeData) {
                case 'default' :
                    return true;
                case 'finalAttack':
                    return this.isFinalAttack(data.Skill);
                case 'death' :
                    return this.isDead();
                case 'b_appeared' :
                    return !this.isAppeared();
                case 'command' :
                    return this.isInputting();
                case 'dying' :
                    return this.isDying();
                case 'damage' :
                    return this.getImgId(1) || this.getImgId(3);
                case 'cridamage' :
                    return this.getImgId(3);
                case 'recovery' :
                    return this.getImgId(2);
                case 'attack' :
                    return this.getImgId(10) && this.isUseItemImg(data.Skill);
                case 'recoverySkill' :
                    return this.getImgId(11) && this.isUseItemImg(data.Skill);
                case 'item' :
                    return this.getImgId(12) && this.isUseItemImg(data.Item);
                case 'chant' :
                    return this.isChanting();
                case 'victory' :
                    return this.getImgId(20);
                case 'state' :
                    return this.isStateImg(data, data.stateId);
                case 'counter' :
                    return this.isCounter();
                case 'reflection' :
                    return this.isReflection();
                case 'counterEX' :
                    return this.isCounterEX(data);
                case 'guard' :
                    return this.getImgId(15);
            }
        }

        getActorGraphicImg() {
            return this._actorGraphicName;
        }

        getActorGraphicFace() {
            return this._actorGraphicFace || this._battler.faceName();
        }

        getActorGraphicFaceInde() {
            return this._actorImgIndex || this._battler.faceIndex();
        }

        loadActorGraphic() {
            return ImageManager.nuun_LoadPictures(this.getActorGraphicImg());
        }

        loadActorFace() {
            return ImageManager.loadFace(this.getActorGraphicFace());
        }

        isDeadImg() {
            return this._isDeadImg;
        }

        isActorGraphicDead(data) {
            return data && (!!data.ImgStateAll && this.getStateData(data.ImgStateAll)) || data.ChangeGraphicScenes === 'death' || (data.ChangeGraphicScenes === 'state' && (data.stateId && this.getStateData(data.stateId)));
        }

        getStateData(data) {
            return data.some(s => s === this._battler.deathStateId());
        }

        getActorFaceIndex(data) {
            return data && data.FaceIndex >= 0 ? data.FaceIndex : this._battler.faceIndex();
        }

        getImgId(id) {
            return this._battler.onImgId[id];
        }

        isDead() {
            return this._battler.isDead();
        }

        isAppeared() {
            return this._battler.isAppeared();
        }

        isInputting() {
            return this._battler.isInputting();
        }

        isDying() {
            return this._battler.isDying();
        }

        isChanting() {
            return this._battler.isChanting();
        }

        isCounter() {
            return this._battler.result().counterEx;
        }

        isReflection() {
            return this._battler.result().reflectionEx;
        }

        isSwitchImg(data) {
            return data.ImgSwitch.every(id => $gameSwitches.value(id));
        }

        isWeaponImg(data) {
            return data.ImgWeapon.every(id => this._battler.isEquipped($dataWeapons[id]));
        }

        isArmorImg(data) {
            return data.ImgArmor.every(id => this._battler.isEquipped($dataArmors[id]));
        }

        isClassImg(data) {
            return data.ImgClass ? this._battler._classId === data.ImgClass : true;
        }

        isUseItemImg(item) {
            return item && item[0] > 0 ? item.includes(this._battler.nuun_useItemId) : true;
        }

        isStateImg(data, states) {
            return states.every(id => id > 0 ? this._battler.isStateAffected(id) : true);
        }

        filteringClass(data) {
            const className = NuunManager.isFilterClass(this._class);
            if (data.FilteringClass && data.FilteringClass.length > 0) {
                return data.FilteringClass.some(filterClass => filterClass === String(SceneManager._scene.constructor.name) || filterClass === className);
            } else {
                return true;
            }
        }
    }

    window.Nuun_ActorGraphics = Nuun_ActorGraphics;

    function conditionsParam(data, param, maxParam) {
        return (param >= maxParam * data.DwLimit / 100 && (data.UpLimit > 0 ? (param <= maxParam * data.UpLimit / 100) : true));
    };

    function condActorImg(data, actor) {
        if (data.actorId === actor.actorId() && actor._classId === data.ClassId) {
            return true;
        } else if (data.ClassId === 0 && data.actorId === actor.actorId()) {
            return true;
        } else if (data.actorId === 0 && actor._classId === data.ClassId) {
            return true;
        }
        return false;
    };

    function getActorGraphicName(data) {//廃止予定
        const images = data.GraphicImg;
        if (Array.isArray(images)) {
            if (images.length > 1) {
                return images[Math.randomInt(images.length)];
            } else {
                return images[0];
            }
        } else {
            return images;
        }
    }


    NuunManager.getBattlerActors = function() {
        return params.ButlerActors;
    };

    NuunManager.setupClassName = function(className) {
        this._className = className;
    };
      
    NuunManager.getClassName = function() {
        return this._className;
    };

    const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _Game_Actor_initMembers.call(this);
        this.nuun_useItemId = -1;
        this._onImgId = -1;//廃止予定
        this.onImgId = [];
        this._actorGraphicIndex = -1;
        this._actorGraphicOpacity = 255;
        this._actorGraphicName = null;
        this._actorGraphicFace = null;
        this._imgScenes = 'default';
    };

      
    Game_Actor.prototype.getActorGraphicList = function() {
        return params.ButlerActors.find(data => condActorImg(data, this));
    };
      
    Game_Actor.prototype.getActorGraphicIndex = function() {
        return params.ButlerActors.findIndex(data => condActorImg(data, this));
    };
      
    Game_Actor.prototype.getActorGraphic = function() {
        const imgData = this.getActorGraphicList();
        return imgData ? imgData.ButlerActorImg.find(data => this.matchConditions(data)) : null;
    };
      
    Game_Actor.prototype.getActorGraphicData = function() {
        const data = this.getActorGraphicList();
        return data ? data.ButlerActorImg[this._actorGraphicIndex] : null;
    };

    Game_Actor.prototype.imgRefresh = function() {
        this.setActorGraphicData();
    };
      
    Game_Actor.prototype.setActorGraphicData = function() {
        const imgData = this.getActorGraphicList();
        const index = imgData ? imgData.ButlerActorImg.findIndex(data => this.matchConditions(data)) : -1;
        this._actorGraphicIndex = index;
        if (index >= 0) {
            const data = imgData.ButlerActorImg[index];
            this._actorGraphicName = getActorGraphicName(data);
            this._actorGraphicFace = data.FaceImg || this.faceName();
            this._actorImgIndex = data.FaceIndex >= 0 ? data.FaceIndex : this.faceIndex();
            this._actorGraphicOpacity = data.Opacity || 255;
        } else {
            this._actorGraphicName = null;
            this._actorGraphicFace = this.faceName();
            this._actorImgIndex = this.faceIndex();
            this._actorGraphicOpacity = 255;
        }
    };
      
    Game_Actor.prototype.matchConditions = function(data) {
        if (data._Class && data._Class > 0 && !this.filteringClass(data)) {
            return false;
        }
        if (data.ImgHP && data.ImgHP.CondValid && !conditionsParam(data.ImgHP, this.hp, this.param(0))) {
            return false;
        }
        if (data.ImgSwitch && !this.isCondSwitchImg(data)) {
            return false;
        }
        if (data.ImgWeapon && !this.isCondWeaponImg(data)) {
            return false;
        }
        if (data.ImgArmor && !this.isCondArmorImg(data)) {
            return false;
        }
        if (data.ImgStateAll && !this.isCondStateImg(data, data.ImgStateAll)) {
            return false;
        }
        if (data.ImgClass > 0 && !this.isCondClassImg(data)) {
            return false;
        }
        if (!this.matchChangeGraphic(data)) {
            return false;
        }
        return true;
    };
      
    Game_Actor.prototype.matchChangeGraphic = function(data) {
        const changeData = data.ChangeGraphicScenes;
        this._imgScenes = changeData;
        switch (changeData) {
          case 'default' :
            return true;
          case 'death' :
            return this.isDead();
          case 'command' :
            return this.isInputting();
          case 'dying' :
            return this.isDying();
          case 'damage' :
              return this._onImgId === 1 || this._onImgId === 3;
          case 'cridamage' :
              return this._onImgId === 3;
          case 'recovery' :
            return this._onImgId === 2;
          case 'attack' :
            return this._onImgId === 10 && this.isCondUseItemImg(data.Skill);
          case 'recoverySkill' :
            return this._onImgId === 11 && this.isCondUseItemImg(data.Skill);
          case 'item' :
            return this._onImgId === 12 && this.isCondUseItemImg(data.Item);
          case 'chant' :
            return this.isChanting();
          case 'victory' :
            return this._onImgId === 20;
          case 'state' :
            return this.isCondStateImg(data, data.stateId);
          case 'counter' :
            return this.result().counterEx;
          case 'reflection' :
            return this.result().reflectionEx;
          case 'counterEX' :
            return this.result().counterExtend && this.isCondUseItemImg(data.Id);
          case 'guard' :
            return this._onImgId === 15;
        }
    };
      
    Game_Actor.prototype.isCondSwitchImg = function(data) {
        return data.ImgSwitch.every(id => $gameSwitches.value(id));
    };
      
    Game_Actor.prototype.isCondWeaponImg = function(data) {
        return data.ImgWeapon.every(id => this.isEquipped($dataWeapons[id]));
    };
      
    Game_Actor.prototype.isCondArmorImg = function(data) {
        return data.ImgArmor.every(id => this.isEquipped($dataArmors[id]));
    };
      
    Game_Actor.prototype.isCondStateImg = function(data, states) {
        return states.every(id => id > 0 ? this.isStateAffected(id) : true);
    };
      
    Game_Actor.prototype.isCondClassImg = function(data) {
        return data.ImgClass ? this._classId === data.ImgClass : true;
    };
      
    Game_Actor.prototype.isCondUseItemImg = function(data) {
        return data ? data.includes(this.nuun_useItemId) : true;
    };
      
    Game_Actor.prototype.isClassNameImg = function(data) {
        const className = NuunManager.getClassName();
        return data.some(name => className === name);
    };
      
    Game_Actor.prototype.getActorGraphicImg = function() {
        return this._actorGraphicName;
    };
      
    Game_Actor.prototype.getActorGraphicFace = function() {
        return this._actorGraphicFace || this.faceName();
    };
      
    Game_Actor.prototype.getActorGraphicFaceIndex = function() {
        return this._actorImgIndex || this.faceIndex();
    };
      
    Game_Actor.prototype.getIsActorGraphicImg = function() {
        return !!this._actorGraphicName;
    };
      
    Game_Actor.prototype.setAttackImgId = function(action) {
        if (action.item().animationId !== 0) {
            this.nuun_useItemId = action.item().id;
            if (action.isRecover()) {
                this._onImgId = 11;
                this._actionBattlerImg = "recovery";
            } else if (action.isAttack() && action.isDamage()) {
                this._onImgId = 10;
                this._actionBattlerImg = "attack";
            } else if (action.isMagicSkill()) {
                this._onImgId = 10;
                this._actionBattlerImg = "attack";
            } else if (action.isSkill() && action.isDamage()) {
                this._onImgId = 10;
                this._actionBattlerImg = "attack";
            } else if (action.isItem()) {
                this._onImgId = 12;
                this._actionBattlerImg = "item";
            } else {
                this._onImgId = 0;
                this._actionBattlerImg = null;
                this.nuun_useItemId = -1;
            }
            this.imgRefresh();
        }
    };
      
    Game_Actor.prototype.resetImgId = function() {
        this._onImgId = 0;
        this.nuun_useItemId = -1;
        this.imgRefresh();
    };
      
    Game_Actor.prototype.loadActorGraphic = function() {
        return ImageManager.nuun_LoadPictures(this.getActorGraphicImg());
    };
      
    Game_Actor.prototype.loadActorFace = function() {
        return ImageManager.loadFace(this.getActorGraphicFace());
    };
      
    Game_Actor.prototype.isActorGraphicDead = function(data) {
        return data && (data.ImgStateAll && this.getStateData(data.ImgStateAll)) || data.ChangeGraphicScenes === 'death' || (data.ChangeGraphicScenes === 'state' && (data.stateId && this.getStateData(data.stateId)));
    };

    Window_StatusBase.prototype.actorPictureEXDrawFace = function(actor, x, y, width, height) {
        this.drawFace(actor.getActorGraphicFace(), actor.getActorGraphicFaceIndex(), x, y, width, height);
    };
      


})();
