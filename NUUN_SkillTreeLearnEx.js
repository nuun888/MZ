/*:-----------------------------------------------------------------------------------
 * NUUN_SkillTreeLearnEx.js
 * 
 * Copyright (C) 2025 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Extended Skills Learning
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_SkillTree
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_SkillTree
 * @version 1.0.1
 * 
 * @help
 * Expand the skills you learn with the skill tree.
 * This plugin allows you to learn other skills in addition to the skills you are learning depending on the number of times you study.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Adult content: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 9/6/2025 Ver.1.0.1
 * Fixed so that conditions can be set.
 * Fixed so that condition text can be set.
 * 8/26/2025 Ver.1.0.0
 * First edition.
 * 
 * @param SkillTreeLearnExSetting
 * @text Extended skill learning settings
 * @desc Configure the skills for extended skill learning.
 * @default 
 * @type struct<SkillLearnExSetting>[]
 * 
 */
/*~struct~SkillLearnExSetting:
 * 
 * @param SkillId
 * @text Skill
 * @desc Specify the skills you want to apply.
 * @type skill
 * @default 0 
 * 
 * @param TypeId
 * @text Skill tree type Id
 * @desc Set the "Skill type identifier" of the target skill tree type. If not specified, all skill tree types will be targeted.
 * @type string
 * @default 
 * 
 * @param SkillLearnExList
 * @text Extended skills
 * @desc Set up the extended skills. The higher the condition in the list, the higher the priority.
 * @default []
 * @type struct<SkillTreeDataTable>[]
 * 
 */
/*~struct~SkillTreeDataTable:
 * 
 * @param Count
 * @text Number of applied learning
 * @desc Specify the number of learnings to apply.
 * @type number
 * @default 0
 * 
 * @param LearnCond
 * @text Learning conditions
 * @desc Enter the conditions for acquiring skills in JavaScript.
 * @type combo
 * @option 'v[0];//Variables'
 * @option 's[0];//Switches'
 * @option 'actor._level >= 10;//Actor level 10 or higher'
 * @default 
 * 
 * @param LearnCondText
 * @text Learning condition text
 * @desc The text of the learning conditions to be displayed in the cost window. Control characters can be used.
 * @type multiline_string
 * @default 
 * 
 * @param LearnSkillId
 * @text Learning skill Id
 * @desc Specify the skill you want to learn.
 * @type skill
 * @default 0
 * 
 * @param RemoveSkillId
 * @text Delete skill Id
 * @desc Specify the skills to be removed during the above learning.
 * @type skill
 * @default 0
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 拡張スキル習得
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_SkillTree
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_SkillTree
 * @version 1.0.1
 * 
 * @help
 * スキルツリーで習得するスキルを拡張させます。
 * このプラグインでは習得回数に応じて習得するスキルに対し別のスキルを習得させたりできます。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 成人向け：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2025/9/6 Ver.1.0.1
 * 条件設定を行えるように修正。
 * 条件テキストを設定できるように修正。
 * 2025/8/26 Ver.1.0.0
 * 初版
 * 
 * 
 * @param SkillTreeLearnExSetting
 * @text 拡張スキル習得設定
 * @desc 拡張スキル習得のスキルの設定を行います。
 * @default 
 * @type struct<SkillLearnExSetting>[]
 * 
 * 
 */
/*~struct~SkillLearnExSetting:ja
 * 
 * @param SkillId
 * @text スキル
 * @desc 適用するスキルを指定します。
 * @type skill
 * @default 0 
 * 
 * @param TypeId
 * @text スキルツリータイプID
 * @desc 対象スキルツリータイプの識別名を設定します。未指定の場合は全てのスキルツリータイプが対象です。
 * @type string
 * @default 
 * 
 * @param SkillLearnExList
 * @text 拡張スキル
 * @desc 拡張スキルの設定を行います。条件判定はリストの上側が優先度が高いです。
 * @default []
 * @type struct<SkillTreeDataTable>[]
 * 
 */
/*~struct~SkillTreeDataTable:ja
 * 
 * @param Count
 * @text 適用習得回数
 * @desc 適用する習得回数を指定します。
 * @type number
 * @default 0
 * 
 * @param LearnCond
 * @text 習得条件
 * @desc スキルを習得する条件をJavaScriptで記入します。
 * @type combo
 * @option 'v[0];//Variables'
 * @option 's[0];//Switches'
 * @option 'actor._level >= 10;//Actor level 10 or higher'
 * @default 
 * 
 * @param LearnCondText
 * @text 習得条件のテキスト
 * @desc コストウィンドウに表示させる習得条件のテキスト。制御文字使用可能
 * @type multiline_string
 * @default 
 * 
 * @param LearnSkillId
 * @text 習得スキルID
 * @desc 習得するスキルを指定します。
 * @type skill
 * @default 0
 * 
 * @param RemoveSkillId
 * @text 削除スキルID
 * @desc 上記の習得時に削除するスキルを指定します。
 * @type skill
 * @default 0
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_SkillTreeLearnEx = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    NuunManager.getSkillTreeLearnExSetting = function() {
        return params.SkillTreeLearnExSetting;
    };

    Game_Actor.prototype.forgetSkillTreeSkill = function(data) {
        data.removeLearnExSkill();//上位スキルを消去
        this.forgetSkill(data._id);
        this.removeLearnSkillTreeSkill(data._id);
    };

    Game_Actor.prototype.getSkillTreeLearnSkill = function(data) {
        return data.getLearnSkill();
    };

    Game_Actor.prototype.getSkillTreeRemoveSkill = function(data) {
        return data.getRemoveSkill();
    };
    
})();