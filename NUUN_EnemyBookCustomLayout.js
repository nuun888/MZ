/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBookCustomLayout.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Enemy book layout customization
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Customize the layout of your enemy book.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 10/14/2024 Ver.1.0.0
 * First edition.
 * 
 * @param EnemyBookSetting
 * @text Enemy book settings
 * @default //////////////////////////////
 * 
 * @param EnemyBookLayoutEnabled
 * @desc Enables you to change the layout of the enemy book.
 * @text Change the layout of the enemy book
 * @type boolean
 * @default true
 * @parent EnemyBookSetting
 * 
 * @param CategoryNameSindowSetting
 * @text Category Name Window Settings
 * @default ------------------------------
 * @parent EnemyBookSetting
 * 
 * @param CategoryNameX
 * @text Category name window X coordinate
 * @desc X coordinate of the category name window.
 * @type number
 * @default 0
 * @min -9999
 * @parent CategoryNameSindowSetting
 * 
 * @param CategoryNameY
 * @desc Y coordinate of the category name window.
 * @text Category Name Window Y Coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent CategoryNameSindowSetting
 * 
 * @param CategoryNameWidth
 * @desc The width of the category name window.
 * @text Category Name Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent CategoryNameSindowSetting
 * 
 * 
 * @param EnemyBookCategoryWindowSetting
 * @text Category Window Settings
 * @default ------------------------------
 * @parent EnemyBookSetting
 * 
 * @param CategoryX
 * @text Category window X coordinate
 * @desc X coordinate of the category window.
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookCategoryWindowSetting
 * 
 * @param CategoryY
 * @desc Y coordinate of the category window.
 * @text Category window Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookCategoryWindowSetting
 * 
 * @param CategoryWidth
 * @desc The width of the category window.
 * @text Category Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookCategoryWindowSetting
 * 
 * @param CategoryHeight
 * @text Category window height
 * @desc Height of the category window. 0 is main area height
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookCategoryWindowSetting
 * 
 * @param CategoryRows
 * @text Category Window Rows
 * @desc Number of rows in category window
 * @type number
 * @default 12
 * @min 0
 * @parent EnemyBookCategoryWindowSetting
 * 
 * 
 * @param EnemyBookSelectWindowSetting
 * @text Enemy selection window settings
 * @default ------------------------------
 * @parent EnemyBookSetting
 * 
 * @param EnemyIndexX
 * @text Enemy selection window X coordinate
 * @desc X coordinate of the Enemy selection window.
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookSelectWindowSetting
 * 
 * @param EnemyIndexY
 * @desc Y coordinate of the Enemy selection window.
 * @text Enemy selection window Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookSelectWindowSetting
 * 
 * @param EnemyIndexWidth
 * @desc The width of the enemy selection window.
 * @text Enemy selection Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookSelectWindowSetting
 * 
 * @param EnemyIndexHeight
 * @text Enemy selection window height
 * @desc Height of the enemy selection window. 0 is main area height
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookSelectWindowSetting
 * 
 * @param EnemyIndexRows
 * @text Enemy selection Window Rows
 * @desc Number of rows in enemy selection window
 * @type number
 * @default 12
 * @min 0
 * @parent EnemyBookSelectWindowSetting
 * 
 * 
 * @param EnemyBookPercentWindowSetting
 * @text Completeness window settings
 * @default ------------------------------
 * @parent EnemyBookSetting
 * 
 * @param PercentX
 * @text Completeness window X coordinate
 * @desc X coordinate of the completion window.
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookPercentWindowSetting
 * 
 * @param PercentY
 * @desc Completeness window Y coordinate
 * @desc Y coordinate of the completion window.
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookPercentWindowSetting
 * 
 * @param PercentWidth
 * @desc The width of the completion window.
 * @text Completion Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookPercentWindowSetting
 * 
 * 
 * @param EnemyBookPageWindowSetting
 * @text Page Window Settings
 * @default ------------------------------
 * @parent EnemyBookSetting
 * 
 * @param PageX
 * @text Page window X coordinate
 * @desc X coordinate of the page window.
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookPageWindowSetting
 * 
 * @param PageY
 * @desc Page window Y coordinate
 * @desc Y coordinate of the page window.
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookPageWindowSetting
 * 
 * @param PageWidth
 * @desc The width of the page window.
 * @text Page Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookPageWindowSetting
 * 
 * @param PageRows
 * @text Page Window Rows
 * @desc Number of rows in page window
 * @type number
 * @default 1
 * @min 1
 * @parent EnemyBookPageWindowSetting
 * 
 * 
 * @param EnemyBookWindowSetting
 * @text Enemy Status Window Settings
 * @default ------------------------------
 * @parent EnemyBookSetting
 * 
 * @param EnemyStatusX
 * @text Enemy Status Window X Coordinate
 * @desc X coordinate of the enemy Status window.
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookWindowSetting
 * 
 * @param EnemyStatusY
 * @desc Enemy Status Window Y Coordinate
 * @desc Y coordinate of the enemy Status window.
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookWindowSetting
 * 
 * @param EnemyStatusWidth
 * @desc The width of the enemy Status window.
 * @text Enemy Status Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookWindowSetting
 * 
 * @param EnemyStatusHeight
 * @text Enemy Status window height
 * @desc Height of the enemy Status window. 0 is main area height
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookWindowSetting
 * 
 * 
 * @param BattleEnemyBookSetting
 * @text Enemy book settings during battle
 * @default //////////////////////////////
 * 
 * @param BattleEnemyBookLayoutEnabled
 * @desc Enables you to change the layout of the enemy book during battle.
 * @text Enable layout change of the enemy book during battle
 * @type boolean
 * @default true
 * @parent BattleEnemyBookSetting
 * 
 * @param BattleCategoryNameSindowSetting
 * @text Category Name Window Settings
 * @default ------------------------------
 * @parent BattleEnemyBookSetting
 * 
 * @param BattleCategoryNameX
 * @text Category name window X coordinate
 * @desc X coordinate of the category name window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleCategoryNameSindowSetting
 * 
 * @param BattleCategoryNameY
 * @desc Y coordinate of the category name window.
 * @text Category Name Window Y Coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleCategoryNameSindowSetting
 * 
 * @param BattleCategoryNameWidth
 * @desc The width of the category name window.
 * @text Category Name Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent BattleCategoryNameSindowSetting
 * 
 * 
 * @param BattleEnemyBookCategoryWindowSetting
 * @text Category Window Settings
 * @default ------------------------------
 * @parent BattleEnemyBookSetting
 * 
 * @param BattleCategoryX
 * @text Category window X coordinate
 * @desc X coordinate of the category window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookCategoryWindowSetting
 * 
 * @param BattleCategoryY
 * @desc Category window Y coordinate
 * @desc Y coordinate of the category window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookCategoryWindowSetting
 * 
 * @param BattleCategoryWidth
 * @desc The width of the category window.
 * @text Category Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookCategoryWindowSetting
 * 
 * @param BattleCategoryHeight
 * @text Category window height
 * @desc Height of the category window. 0 is main area height
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookCategoryWindowSetting
 * 
 * @param BattleCategoryRows
 * @text Category Window Rows
 * @desc Number of rows in category window
 * @type number
 * @default 12
 * @min 0
 * @parent BattleEnemyBookCategoryWindowSetting
 * 
 * 
 * @param BattleEnemyBookSelectWindowSetting
 * @text Enemy selection window settings
 * @default ------------------------------
 * @parent BattleEnemyBookSetting
 * 
 * @param BattleEnemyIndexX
 * @text Enemy selection window X coordinate
 * @desc X coordinate of the Enemy selection window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookSelectWindowSetting
 * 
 * @param BattleEnemyIndexY
 * @desc Enemy selection window Y coordinate
 * @desc Y coordinate of the Enemy selection window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookSelectWindowSetting
 * 
 * @param BattleEnemyIndexWidth
 * @desc The width of the enemy selection window.
 * @text Enemy selection Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookSelectWindowSetting
 * 
 * @param BattleEnemyIndexHeight
 * @text Enemy selection window height
 * @desc Height of the enemy selection window. 0 is main area height
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookSelectWindowSetting
 * 
 * @param BattleEnemyIndexRows
 * @text Enemy selection Window Rows
 * @desc Number of rows in enemy selection window
 * @type number
 * @default 12
 * @min 0
 * @parent BattleEnemyBookSelectWindowSetting
 * 
 * 
 * @param BattleEnemyBookPercentWindowSetting
 * @text Completeness window settings
 * @default ------------------------------
 * @parent BattleEnemyBookSetting
 * 
 * @param BattlePercentX
 * @text Completeness window X coordinate
 * @desc X coordinate of the completion window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookPercentWindowSetting
 * 
 * @param BattlePercentY
 * @desc Completeness window Y coordinate
 * @desc Y coordinate of the completion window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookPercentWindowSetting
 * 
 * @param BattlePercentWidth
 * @desc The width of the completion window.
 * @text Completion Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookPercentWindowSetting
 * 
 * 
 * @param BattleEnemyBookPageWindowSetting
 * @text Page Window Settings
 * @default ------------------------------
 * @parent BattleEnemyBookSetting
 * 
 * @param BattlePageX
 * @text Page window X coordinate
 * @desc X coordinate of the page window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookPageWindowSetting
 * 
 * @param BattlePageY
 * @desc Page window Y coordinate
 * @desc Y coordinate of the page window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookPageWindowSetting
 * 
 * @param BattlePageWidth
 * @desc The width of the page window.
 * @text Page Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookPageWindowSetting
 * 
 * @param BattlePageRows
 * @text Page Window Rows
 * @desc Number of rows in page window
 * @type number
 * @default 1
 * @min 1
 * @parent BattleEnemyBookPageWindowSetting
 * 
 * 
 * @param BattleEnemyBookWindowSetting
 * @text Enemy Status Window Settings
 * @default ------------------------------
 * @parent BattleEnemyBookSetting
 * 
 * @param BattleEnemyStatusX
 * @text Enemy Status Window X Coordinate
 * @desc X coordinate of the enemy Status window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookWindowSetting
 * 
 * @param BattleEnemyStatusY
 * @desc Enemy Status Window Y Coordinate
 * @desc Y coordinate of the enemy Status window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookWindowSetting
 * 
 * @param BattleEnemyStatusWidth
 * @desc The width of the enemy Status window.
 * @text Enemy Status Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookWindowSetting
 * 
 * @param BattleEnemyStatusHeight
 * @text Enemy Status window height
 * @desc Height of the enemy Status window. 0 is main area height
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookWindowSetting
 * 
 * @param BattleEnemyInfoSetting
 * @text Enemy information settings
 * @default //////////////////////////////
 * 
 * @param EnemyInfoLayoutEnabled
 * @desc Enables enemy information layout changes.
 * @text Enemy info layout change enabled
 * @type boolean
 * @default true
 * @parent BattleEnemyInfoSetting
 * 
 * @param BattleEnemyInfoIndexWindowSetting
 * @text Enemy selection window settings
 * @default ------------------------------
 * @parent BattleEnemyInfoSetting
 * 
 * @param InfoIndexX
 * @text Enemy selection window X coordinate
 * @desc X coordinate of the Enemy selection window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyInfoIndexWindowSetting
 * 
 * @param InfoIndexY
 * @desc Enemy selection window Y coordinate
 * @desc Y coordinate of the Enemy selection window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyInfoIndexWindowSetting
 * 
 * @param InfoIndexWidth
 * @desc The width of the enemy selection window.
 * @text Enemy selection Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyInfoIndexWindowSetting
 * 
 * @param InfoIndexHeight
 * @text Enemy selection window height
 * @desc Height of the enemy selection window. 0 is main area height
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyInfoIndexWindowSetting
 * 
 * @param InfoIndexRows
 * @text Enemy selection Window Rows
 * @desc Number of rows in enemy selection window
 * @type number
 * @default 12
 * @min 0
 * @parent BattleEnemyInfoIndexWindowSetting
 * 
 * @param BattleEnemyInfoPageWindowSetting
 * @text Enemy Info Page Window Settings
 * @default ------------------------------
 * @parent BattleEnemyInfoSetting
 * 
 * @param InfoPageX
 * @text Page window X coordinate
 * @desc X coordinate of the page window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyInfoPageWindowSetting
 * 
 * @param InfoPageY
 * @desc Page window Y coordinate
 * @desc Y coordinate of the page window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyInfoPageWindowSetting
 * 
 * @param InfoPageWidth
 * @desc The width of the page window.
 * @text Page Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyInfoPageWindowSetting
 * 
 * @param InfoPageRows
 * @text Page Window Rows
 * @desc Number of rows in page window
 * @type number
 * @default 1
 * @min 1
 * @parent BattleEnemyInfoPageWindowSetting
 * 
 * @param BattleEnemyInfoWindowSetting
 * @text Enemy Information Status Window Settings
 * @default ------------------------------
 * @parent BattleEnemyInfoSetting
 * 
 * @param InfoStatusX
 * @text Enemy Status Window X Coordinate
 * @desc X coordinate of the enemy Status window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyInfoWindowSetting
 * 
 * @param InfoStatusY
 * @desc Enemy Status Window Y Coordinate
 * @desc Y coordinate of the enemy Status window.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyInfoWindowSetting
 * 
 * @param InfoStatusWidth
 * @desc The width of the enemy Status window.
 * @text Enemy Status Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyInfoWindowSetting
 * 
 * @param InfoStatusHeight
 * @text Enemy Status window height
 * @desc Height of the enemy Status window. 0 is main area height
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyInfoWindowSetting
 * 
 * @param AnalyzeSetting
 * @text Analyze Settings
 * @default //////////////////////////////
 * 
 * @param AnalyzeLayoutEnabled
 * @desc Enables analyze layout changes.
 * @text Analyze layout change enabled
 * @type boolean
 * @default true
 * @parent AnalyzeSetting
 * 
 * @param AnalyzePageWindowSetting
 * @text Analyze Page Window Settings
 * @default ------------------------------
 * @parent AnalyzeSetting
 * 
 * @param AnalyzePageX
 * @text Page window X coordinate
 * @desc X coordinate of the page window.
 * @type number
 * @default 0
 * @min -9999
 * @parent AnalyzePageWindowSetting
 * 
 * @param AnalyzePageY
 * @desc Page window Y coordinate
 * @desc Y coordinate of the page window.
 * @type number
 * @default 0
 * @min -9999
 * @parent AnalyzePageWindowSetting
 * 
 * @param AnalyzePageWidth
 * @desc The width of the page window.
 * @text Page Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent AnalyzePageWindowSetting
 * 
 * @param AnalyzePageRows
 * @text Page Window Rows
 * @desc Number of rows in page window
 * @type number
 * @default 1
 * @min 1
 * @parent AnalyzePageWindowSetting
 * 
 * @param AnalyzeWindowSetting
 * @text Analyze Status Window Settings
 * @default ------------------------------
 * @parent AnalyzeSetting
 * 
 * @param AnalyzeStatusX
 * @text Enemy Status Window X Coordinate
 * @desc X coordinate of the enemy Status window.
 * @type number
 * @default 0
 * @min -9999
 * @parent AnalyzeWindowSetting
 * 
 * @param AnalyzeStatusY
 * @desc Enemy Status Window Y Coordinate
 * @desc Y coordinate of the enemy Status window.
 * @type number
 * @default 0
 * @min -9999
 * @parent AnalyzeWindowSetting
 * 
 * @param AnalyzeStatusWidth
 * @desc The width of the enemy Status window.
 * @text Enemy Status Window Width
 * @type number
 * @default 0
 * @min 0
 * @parent AnalyzeWindowSetting
 * 
 * @param AnalyzeStatusHeight
 * @text Enemy Status window height
 * @desc Height of the enemy Status window. 0 is main area height
 * @type number
 * @default 0
 * @min 0
 * @parent AnalyzeWindowSetting
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc モンスター図鑑レイアウトカスタマイズ
 * @base NUUN_Base
 * @base NUUN_EnemyBook
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_EnemyBook
 * @version 1.0.0
 * 
 * @help
 * モンスター図鑑のレイアウトをカスタマイズします。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/10/14 Ver.1.0.0
 * 初版
 * 
 * @param EnemyBookSetting
 * @text モンスター図鑑設定
 * @default //////////////////////////////
 * 
 * @param EnemyBookLayoutEnabled
 * @desc 図鑑のレイアウト変更有効。
 * @text 図鑑のレイアウト変更有効
 * @type boolean
 * @default true
 * @parent EnemyBookSetting
 * 
 * @param CategoryNameSindowSetting
 * @text カテゴリー名ウィンドウ設定
 * @default ------------------------------
 * @parent EnemyBookSetting
 * 
 * @param CategoryNameX
 * @text カテゴリー名ウィンドウX座標
 * @desc カテゴリー名ウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CategoryNameSindowSetting
 * 
 * @param CategoryNameY
 * @desc カテゴリー名ウィンドウのY座標
 * @text カテゴリー名ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CategoryNameSindowSetting
 * 
 * @param CategoryNameWidth
 * @desc カテゴリー名ウィンドウの横幅。
 * @text カテゴリー名ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent CategoryNameSindowSetting
 * 
 * 
 * @param EnemyBookCategoryWindowSetting
 * @text カテゴリーウィンドウ設定
 * @default ------------------------------
 * @parent EnemyBookSetting
 * 
 * @param CategoryX
 * @text カテゴリーウィンドウX座標
 * @desc カテゴリーウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookCategoryWindowSetting
 * 
 * @param CategoryY
 * @desc カテゴリーウィンドウのY座標
 * @text カテゴリーウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookCategoryWindowSetting
 * 
 * @param CategoryWidth
 * @desc カテゴリーウィンドウの横幅。
 * @text カテゴリーウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookCategoryWindowSetting
 * 
 * @param CategoryHeight
 * @text カテゴリーウィンドウ縦幅
 * @desc カテゴリーウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookCategoryWindowSetting
 * 
 * @param CategoryRows
 * @text カテゴリーウィンドウ行数
 * @desc カテゴリーウィンドウの行数
 * @type number
 * @default 12
 * @min 0
 * @parent EnemyBookCategoryWindowSetting
 * 
 * 
 * @param EnemyBookSelectWindowSetting
 * @text モンスター選択ウィンドウ設定
 * @default ------------------------------
 * @parent EnemyBookSetting
 * 
 * @param EnemyIndexX
 * @text モンスター選択ウィンドウX座標
 * @desc モンスター選択ウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookSelectWindowSetting
 * 
 * @param EnemyIndexY
 * @desc モンスター選択ウィンドウのY座標
 * @text モンスター選択ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookSelectWindowSetting
 * 
 * @param EnemyIndexWidth
 * @desc モンスター選択ウィンドウの横幅。
 * @text モンスター選択ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookSelectWindowSetting
 * 
 * @param EnemyIndexHeight
 * @text モンスター選択ウィンドウ縦幅
 * @desc モンスター選択ウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookSelectWindowSetting
 * 
 * @param EnemyIndexRows
 * @text モンスター選択ウィンドウ行数
 * @desc モンスター選択ウィンドウの行数
 * @type number
 * @default 12
 * @min 0
 * @parent EnemyBookSelectWindowSetting
 * 
 * 
 * @param EnemyBookPercentWindowSetting
 * @text 完成度ウィンドウ設定
 * @default ------------------------------
 * @parent EnemyBookSetting
 * 
 * @param PercentX
 * @text 完成度ウィンドウX座標
 * @desc 完成度ウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookPercentWindowSetting
 * 
 * @param PercentY
 * @desc 完成度ウィンドウのY座標
 * @text 完成度ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookPercentWindowSetting
 * 
 * @param PercentWidth
 * @desc 完成度ウィンドウの横幅。
 * @text 完成度ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookPercentWindowSetting
 * 
 * 
 * @param EnemyBookPageWindowSetting
 * @text ページウィンドウ設定
 * @default ------------------------------
 * @parent EnemyBookSetting
 * 
 * @param PageX
 * @text ページウィンドウX座標
 * @desc ページウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookPageWindowSetting
 * 
 * @param PageY
 * @desc ページウィンドウのY座標
 * @text ページウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookPageWindowSetting
 * 
 * @param PageWidth
 * @desc ページウィンドウの横幅。
 * @text ページウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookPageWindowSetting
 * 
 * @param PageRows
 * @text ページウィンドウ行数
 * @desc ページウィンドウの行数
 * @type number
 * @default 1
 * @min 1
 * @parent EnemyBookPageWindowSetting
 * 
 * 
 * @param EnemyBookWindowSetting
 * @text モンスターステータスウィンドウ設定
 * @default ------------------------------
 * @parent EnemyBookSetting
 * 
 * @param EnemyStatusX
 * @text モンスターステータスウィンドウX座標
 * @desc モンスターステータスウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookWindowSetting
 * 
 * @param EnemyStatusY
 * @desc モンスターステータスウィンドウのY座標
 * @text モンスターステータスウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyBookWindowSetting
 * 
 * @param EnemyStatusWidth
 * @desc モンスターステータスウィンドウの横幅。
 * @text モンスターステータスウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookWindowSetting
 * 
 * @param EnemyStatusHeight
 * @text モンスターステータスウィンドウ縦幅
 * @desc モンスターステータスウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyBookWindowSetting
 * 
 * 
 * @param BattleEnemyBookSetting
 * @text 戦闘中モンスター図鑑設定
 * @default //////////////////////////////
 * 
 * @param BattleEnemyBookLayoutEnabled
 * @desc 戦闘中の図鑑のレイアウト変更有効。
 * @text 戦闘中図鑑のレイアウト変更有効
 * @type boolean
 * @default true
 * @parent BattleEnemyBookSetting
 * 
 * @param BattleCategoryNameSindowSetting
 * @text カテゴリー名ウィンドウ設定
 * @default ------------------------------
 * @parent BattleEnemyBookSetting
 * 
 * @param BattleCategoryNameX
 * @text カテゴリー名ウィンドウX座標
 * @desc カテゴリー名ウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleCategoryNameSindowSetting
 * 
 * @param BattleCategoryNameY
 * @desc カテゴリー名ウィンドウのY座標
 * @text カテゴリー名ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleCategoryNameSindowSetting
 * 
 * @param BattleCategoryNameWidth
 * @desc カテゴリー名ウィンドウの横幅。
 * @text カテゴリー名ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent BattleCategoryNameSindowSetting
 * 
 * 
 * @param BattleEnemyBookCategoryWindowSetting
 * @text カテゴリーウィンドウ設定
 * @default ------------------------------
 * @parent BattleEnemyBookSetting
 * 
 * @param BattleCategoryX
 * @text カテゴリーウィンドウX座標
 * @desc カテゴリーウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookCategoryWindowSetting
 * 
 * @param BattleCategoryY
 * @desc カテゴリーウィンドウのY座標
 * @text カテゴリーウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookCategoryWindowSetting
 * 
 * @param BattleCategoryWidth
 * @desc カテゴリーウィンドウの横幅。
 * @text カテゴリーウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookCategoryWindowSetting
 * 
 * @param BattleCategoryHeight
 * @text カテゴリーウィンドウ縦幅
 * @desc カテゴリーウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookCategoryWindowSetting
 * 
 * @param BattleCategoryRows
 * @text カテゴリーウィンドウ行数
 * @desc カテゴリーウィンドウの行数
 * @type number
 * @default 12
 * @min 0
 * @parent BattleEnemyBookCategoryWindowSetting
 * 
 * 
 * @param BattleEnemyBookSelectWindowSetting
 * @text モンスター選択ウィンドウ設定
 * @default ------------------------------
 * @parent BattleEnemyBookSetting
 * 
 * @param BattleEnemyIndexX
 * @text モンスター選択ウィンドウX座標
 * @desc モンスター選択ウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookSelectWindowSetting
 * 
 * @param BattleEnemyIndexY
 * @desc モンスター選択ウィンドウのY座標
 * @text モンスター選択ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookSelectWindowSetting
 * 
 * @param BattleEnemyIndexWidth
 * @desc モンスター選択ウィンドウの横幅。
 * @text モンスター選択ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookSelectWindowSetting
 * 
 * @param BattleEnemyIndexHeight
 * @text モンスター選択ウィンドウ縦幅
 * @desc モンスター選択ウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookSelectWindowSetting
 * 
 * @param BattleEnemyIndexRows
 * @text モンスター選択ウィンドウ行数
 * @desc モンスター選択ウィンドウの行数
 * @type number
 * @default 12
 * @min 0
 * @parent BattleEnemyBookSelectWindowSetting
 * 
 * 
 * @param BattleEnemyBookPercentWindowSetting
 * @text 完成度ウィンドウ設定
 * @default ------------------------------
 * @parent BattleEnemyBookSetting
 * 
 * @param BattlePercentX
 * @text 完成度ウィンドウX座標
 * @desc 完成度ウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookPercentWindowSetting
 * 
 * @param BattlePercentY
 * @desc 完成度ウィンドウのY座標
 * @text 完成度ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookPercentWindowSetting
 * 
 * @param BattlePercentWidth
 * @desc 完成度ウィンドウの横幅。
 * @text 完成度ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookPercentWindowSetting
 * 
 * 
 * @param BattleEnemyBookPageWindowSetting
 * @text ページウィンドウ設定
 * @default ------------------------------
 * @parent BattleEnemyBookSetting
 * 
 * @param BattlePageX
 * @text ページウィンドウX座標
 * @desc ページウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookPageWindowSetting
 * 
 * @param BattlePageY
 * @desc ページウィンドウのY座標
 * @text ページウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookPageWindowSetting
 * 
 * @param BattlePageWidth
 * @desc ページウィンドウの横幅。
 * @text ページウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookPageWindowSetting
 * 
 * @param BattlePageRows
 * @text ページウィンドウ行数
 * @desc ページウィンドウの行数
 * @type number
 * @default 1
 * @min 1
 * @parent BattleEnemyBookPageWindowSetting
 * 
 * 
 * @param BattleEnemyBookWindowSetting
 * @text モンスターステータスウィンドウ設定
 * @default ------------------------------
 * @parent BattleEnemyBookSetting
 * 
 * @param BattleEnemyStatusX
 * @text モンスターステータスウィンドウX座標
 * @desc モンスターステータスウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookWindowSetting
 * 
 * @param BattleEnemyStatusY
 * @desc モンスターステータスウィンドウのY座標
 * @text モンスターステータスウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyBookWindowSetting
 * 
 * @param BattleEnemyStatusWidth
 * @desc モンスターステータスウィンドウの横幅。
 * @text モンスターステータスウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookWindowSetting
 * 
 * @param BattleEnemyStatusHeight
 * @text モンスターステータスウィンドウ縦幅
 * @desc モンスターステータスウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyBookWindowSetting
 * 
 * @param BattleEnemyInfoSetting
 * @text 敵の情報設定
 * @default //////////////////////////////
 * 
 * @param EnemyInfoLayoutEnabled
 * @desc 敵の情報のレイアウト変更有効。
 * @text 敵の情報のレイアウト変更有効
 * @type boolean
 * @default true
 * @parent BattleEnemyInfoSetting
 * 
 * @param BattleEnemyInfoIndexWindowSetting
 * @text 敵の情報選択ウィンドウ設定
 * @default ------------------------------
 * @parent BattleEnemyInfoSetting
 * 
 * @param InfoIndexX
 * @text モンスター選択ウィンドウX座標
 * @desc モンスター選択ウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyInfoIndexWindowSetting
 * 
 * @param InfoIndexY
 * @desc モンスター選択ウィンドウのY座標
 * @text モンスター選択ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyInfoIndexWindowSetting
 * 
 * @param InfoIndexWidth
 * @desc モンスター選択ウィンドウの横幅。
 * @text モンスター選択ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyInfoIndexWindowSetting
 * 
 * @param InfoIndexHeight
 * @text モンスター選択ウィンドウ縦幅
 * @desc モンスター選択ウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyInfoIndexWindowSetting
 * 
 * @param InfoIndexRows
 * @text モンスター選択ウィンドウ行数
 * @desc モンスター選択ウィンドウの行数
 * @type number
 * @default 12
 * @min 0
 * @parent BattleEnemyInfoIndexWindowSetting
 * 
 * @param BattleEnemyInfoPageWindowSetting
 * @text 敵の情報ページウィンドウ設定
 * @default ------------------------------
 * @parent BattleEnemyInfoSetting
 * 
 * @param InfoPageX
 * @text ページウィンドウX座標
 * @desc ページウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyInfoPageWindowSetting
 * 
 * @param InfoPageY
 * @desc ページウィンドウのY座標
 * @text ページウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyInfoPageWindowSetting
 * 
 * @param InfoPageWidth
 * @desc ページウィンドウの横幅。
 * @text ページウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyInfoPageWindowSetting
 * 
 * @param InfoPageRows
 * @text ページウィンドウ行数
 * @desc ページウィンドウの行数
 * @type number
 * @default 1
 * @min 1
 * @parent BattleEnemyInfoPageWindowSetting
 * 
 * @param BattleEnemyInfoWindowSetting
 * @text 敵の情報ステータスウィンドウ設定
 * @default ------------------------------
 * @parent BattleEnemyInfoSetting
 * 
 * @param InfoStatusX
 * @text モンスターステータスウィンドウX座標
 * @desc モンスターステータスウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyInfoWindowSetting
 * 
 * @param InfoStatusY
 * @desc モンスターステータスウィンドウのY座標
 * @text モンスターステータスウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleEnemyInfoWindowSetting
 * 
 * @param InfoStatusWidth
 * @desc モンスターステータスウィンドウの横幅。
 * @text モンスターステータスウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyInfoWindowSetting
 * 
 * @param InfoStatusHeight
 * @text モンスターステータスウィンドウ縦幅
 * @desc モンスターステータスウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 0
 * @min 0
 * @parent BattleEnemyInfoWindowSetting
 * 
 * @param AnalyzeSetting
 * @text アナライズ設定
 * @default //////////////////////////////
 * 
 * @param AnalyzeLayoutEnabled
 * @desc アナライズのレイアウト変更有効。
 * @text アナライズのレイアウト変更有効
 * @type boolean
 * @default true
 * @parent AnalyzeSetting
 * 
 * @param AnalyzePageWindowSetting
 * @text 敵の情報ページウィンドウ設定
 * @default ------------------------------
 * @parent AnalyzeSetting
 * 
 * @param AnalyzePageX
 * @text ページウィンドウX座標
 * @desc ページウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent AnalyzePageWindowSetting
 * 
 * @param AnalyzePageY
 * @desc ページウィンドウのY座標
 * @text ページウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent AnalyzePageWindowSetting
 * 
 * @param AnalyzePageWidth
 * @desc ページウィンドウの横幅。
 * @text ページウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent AnalyzePageWindowSetting
 * 
 * @param AnalyzePageRows
 * @text ページウィンドウ行数
 * @desc ページウィンドウの行数
 * @type number
 * @default 1
 * @min 1
 * @parent AnalyzePageWindowSetting
 * 
 * @param AnalyzeWindowSetting
 * @text 敵の情報ステータスウィンドウ設定
 * @default ------------------------------
 * @parent AnalyzeSetting
 * 
 * @param AnalyzeStatusX
 * @text モンスターステータスウィンドウX座標
 * @desc モンスターステータスウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent AnalyzeWindowSetting
 * 
 * @param AnalyzeStatusY
 * @desc モンスターステータスウィンドウのY座標
 * @text モンスターステータスウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent AnalyzeWindowSetting
 * 
 * @param AnalyzeStatusWidth
 * @desc モンスターステータスウィンドウの横幅。
 * @text モンスターステータスウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent AnalyzeWindowSetting
 * 
 * @param AnalyzeStatusHeight
 * @text モンスターステータスウィンドウ縦幅
 * @desc モンスターステータスウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 0
 * @min 0
 * @parent AnalyzeWindowSetting
 * 
 * 
 */


var Imported = Imported || {};
Imported.NUUN_EnemyBookCustomLayout = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    
    if (params.EnemyBookLayoutEnabled) {
        Scene_EnemyBook.prototype.percentWindowRect = function() {
            const wx = params.PercentX;
            const wy = this.mainAreaTop() + params.PercentY;
            const ww = params.PercentWidth > 0 ? params.PercentWidth : this.indexWidth();
            const wh = this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        };
        
        Scene_EnemyBook.prototype.enemyWindowPageRect = function() {
            const wx = params.PageX;
            const wh = this.calcWindowHeight(params.PageRows, true);
            const wy = (this.isPageWindowsShow() ? this.mainAreaTop() : (wh + (Graphics.height - Graphics.boxHeight) / 2) * -1) + params.PageY;
            const ww = params.PageWidth > 0 ? params.PageWidth : this.enemyWindowWidth();
            return new Rectangle(wx, wy, ww, wh);
        };
        
        Scene_EnemyBook.prototype.indexWindowRect = function() {
            const wx = params.EnemyIndexX;
            const wy = this.mainAreaTop() + params.EnemyIndexY;
            const ww = params.EnemyIndexWidth > 0 ? params.EnemyIndexWidth : this.indexWidth();
            const wh = Math.min((params.EnemyIndexRows > 0 ? this.calcWindowHeight(params.EnemyIndexRows, true) : (params.EnemyIndexHeight > 0 ? params.EnemyIndexHeight : Graphics.boxHeight)), Graphics.boxHeight - wy);
            return new Rectangle(wx, wy, ww, wh);
        };
        
        Scene_EnemyBook.prototype.categoryWindowRect = function() {
            const wx = params.CategoryX;
            const wy = this.mainAreaTop() + params.CategoryY;
            const ww = params.CategoryWidth > 0 ? params.CategoryWidth : this.indexWidth();
            const wh = Math.min((params.CategoryRows > 0 ? this.calcWindowHeight(params.CategoryRows, true) : (params.CategoryHeight > 0 ? params.CategoryHeight : Graphics.boxHeight)), Graphics.boxHeight - wy);
            return new Rectangle(wx, wy, ww, wh);
        };
        
        Scene_EnemyBook.prototype.categoryNameWindowRect = function() {
            const wx = params.CategoryNameX;
            const wy = this.mainAreaTop() + params.CategoryNameY;
            const ww = params.CategoryNameWidth > 0 ? params.CategoryNameWidth : this.indexWidth();
            const wh = this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        };
        
        Scene_EnemyBook.prototype.enemyWindowRect = function() {
            const wx = params.EnemyStatusX;
            const wy = this.mainAreaTop() + params.EnemyStatusY;
            const ww = params.EnemyStatusWidth > 0 ? params.EnemyStatusWidth : this.enemyWindowWidth();
            const wh = Math.min((params.EnemyStatusHeight > 0 ? params.EnemyStatusHeight : Graphics.boxHeight), Graphics.boxHeight - wy);
            return new Rectangle(wx, wy, ww, wh);
        };

    }
    
    if (params.BattleEnemyBookLayoutEnabled) {
        Scene_Battle.prototype.enemyBookPercentWindowRect = function() {
            const wx = params.BattlePercentX;
            const wy = this.enemyBookMainAreaTop() + params.BattlePercentY;
            const ww = params.BattlePercentWidth > 0 ? params.BattlePercentWidth : this.enemyBookIndexWidth();
            const wh = this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        };
        
        Scene_Battle.prototype.enemyBookCategoryNameWindowRect = function() {
            const wx = params.BattleCategoryNameX;
            const wy = this.enemyBookMainAreaTop() + params.BattleCategoryNameY;
            const ww = params.BattleCategoryNameWidth > 0 ? params.BattleCategoryNameWidth : this.enemyBookIndexWidth();
            const wh = this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        };
        
        Scene_Battle.prototype.enemyBookCategoryWindowRect = function() {
            const wx = params.BattleCategoryX;
            const wy = this.enemyBookMainAreaTop() + params.BattleCategoryY;
            const ww = params.BattleCategoryWidth > 0 ? params.BattleCategoryWidth : this.enemyBookIndexWidth();
            const wh = Math.min((params.BattleCategoryRows > 0 ? this.calcWindowHeight(params.BattleCategoryRows, true) : (params.BattleCategoryHeight > 0 ? params.BattleCategoryHeight : Graphics.boxHeight)), Graphics.boxHeight - wy);
            return new Rectangle(wx, wy, ww, wh);
        };
        
        Scene_Battle.prototype.enemyBookIndexWindowRect = function() {
            const wx = params.BattleEnemyIndexX;
            const wy = this.enemyBookMainAreaTop() + params.BattleEnemyIndexY;
            const ww = params.BattleEnemyIndexWidth > 0 ? params.BattleEnemyIndexWidth : this.enemyBookIndexWidth();
            const wh = Math.min((params.BattleEnemyIndexRows > 0 ? this.calcWindowHeight(params.BattleEnemyIndexRows, true) : (params.BattleEnemyIndexHeight > 0 ? params.BattleEnemyIndexHeight : Graphics.boxHeight)), Graphics.boxHeight - wy);
            return new Rectangle(wx, wy, ww, wh);
        };
        
        Scene_Battle.prototype.enemyBookPageWindowRect = function() {
            const wx = params.BattlePageX;
            const wh = this.calcWindowHeight(params.BattlePageRows, true);
            const wy = (this.isPageWindowsShow() ? this.mainAreaTop() : (wh + (Graphics.height - Graphics.boxHeight) / 2) * -1) + params.BattlePageY;
            const ww = params.BattlePageWidth > 0 ? params.BattlePageWidth : this.enemyBookWindowWidth();
            return new Rectangle(wx, wy, ww, wh);
        };
        
        Scene_Battle.prototype.enemyBookWindowRect = function() {
            const wx = params.BattleEnemyStatusX;
            const wy = this.enemyBookMainAreaTop() + params.BattleEnemyStatusY;
            const ww = params.BattleEnemyStatusWidth > 0 ? params.BattleEnemyStatusWidth : this.enemyBookWindowWidth();
            const wh = Math.min((params.BattleEnemyStatusHeight > 0 ? params.BattleEnemyStatusHeight : Graphics.boxHeight), Graphics.boxHeight - wy);
            return new Rectangle(wx, wy, ww, wh);
        };
    }

    if (params.EnemyInfoLayoutEnabled) {
        Scene_Battle.prototype.enemyBookInfoIndexWindowRect = function() {
            const wx = params.InfoIndexX;
            const wy = this.enemyBookMainAreaTop() + params.InfoIndexY;
            const ww = params.InfoIndexWidth > 0 ? params.InfoIndexWidth : this.enemyBookIndexWidth();
            const wh = Math.min((params.InfoIndexRows > 0 ? this.calcWindowHeight(params.InfoIndexRows, true) : (params.InfoIndexHeight > 0 ? params.InfoIndexHeight : Graphics.boxHeight)), Graphics.boxHeight - wy);
            return new Rectangle(wx, wy, ww, wh);
        };

        Scene_Battle.prototype.enemyInfoPageWindowRect = function() {
            const wx = params.InfoPageX;
            const wh = this.calcWindowHeight(params.InfoPageRows, true);
            const wy = (this.isPageWindowsShow() ? this.mainAreaTop() : (wh + (Graphics.height - Graphics.boxHeight) / 2) * -1) + params.InfoPageY;
            const ww = params.InfoPageWidth > 0 ? params.InfoPageWidth : this.enemyBookWindowWidth();
            return new Rectangle(wx, wy, ww, wh);
        };

        Scene_Battle.prototype.enemyInfoWindowRect = function() {
            const wx = params.InfoStatusX;
            const wy = this.enemyBookMainAreaTop() + params.InfoStatusY;
            const ww = params.InfoStatusWidth > 0 ? params.InfoStatusWidth : this.enemyBookWindowWidth();
            const wh = Math.min((params.InfoStatusHeight > 0 ? params.InfoStatusHeight : Graphics.boxHeight), Graphics.boxHeight - wy);
            return new Rectangle(wx, wy, ww, wh);
        };
    }

    if (params.AnalyzeLayoutEnabled) {

        Scene_Battle.prototype.analyzePageWindowRect = function() {
            const wx = params.AnalyzePageX;
            const wh = this.calcWindowHeight(params.AnalyzePageRows, true);
            const wy = (this.isPageWindowsShow() ? this.mainAreaTop() : (wh + (Graphics.height - Graphics.boxHeight) / 2) * -1) + params.AnalyzePageY;
            const ww = params.AnalyzePageWidth > 0 ? params.AnalyzePageWidth : this.enemyBookWindowWidth();
            return new Rectangle(wx, wy, ww, wh);
        };

        Scene_Battle.prototype.analyzeWindowRect = function() {
            const wx = params.AnalyzeStatusX;
            const wy = this.enemyBookMainAreaTop() + params.AnalyzeStatusY;
            const ww = params.AnalyzeStatusWidth > 0 ? params.AnalyzeStatusWidth : this.enemyBookWindowWidth();
            const wh = Math.min((params.AnalyzeStatusHeight > 0 ? params.AnalyzeStatusHeight : Graphics.boxHeight), Graphics.boxHeight - wy);
            return new Rectangle(wx, wy, ww, wh);
        };

        Scene_Battle.prototype.setupAnalyzeRect = function(data) {
            const rect = this.analyzeWindowRect();
            const pageRect = this.analyzePageWindowRect();
            this._analyzePageWindow.y = pageRect.y - (this.pageWindowsShowMode(data) ? 0 : this._analyzePageWindow.height + pageRect.y) + this.enemyBookWindowUi_Y() - (Graphics.height - Graphics.boxHeight) / 2;
        };
    }


})();