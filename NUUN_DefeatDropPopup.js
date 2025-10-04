/*:-----------------------------------------------------------------------------------
 * NUUN_DefeatDropPopup.js
 * 
 * Copyright (C) 2025 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Defeat Drop Pop-up
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_PopupEx
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_PopupEx
 * @version 1.0.1
 * 
 * @help
 * The rewards obtained after defeating an enemy will be displayed in a pop-up window during the battle.
 * The reward will be received upon completion of the battle.
 * Please note that this plugin is an extension of the "NUUN_PopupEx" plugin.
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
 * 10/4/2025 Ver.1.0.1
 * Fixed an issue where an error would occur when an actor died.
 * 9/30/2025 Ver.1.0.0
 * First edition.
 * 
 * @param ShowPopUpRewardsExp
 * @desc Display the exp popup.
 * @text Exp popup display
 * @type boolean
 * @default true
 * 
 * @param ShowPopUpRewardsGold
 * @desc Display the gold popup.
 * @text Gold popup display
 * @type boolean
 * @default true
 * 
 * @param ShowPopUpRewards
 * @desc Display the item popup.
 * @text item popup display
 * @type boolean
 * @default true
 * 
 * @param PopUpRewardsExp
 * @text Exp popup settings
 * @desc Configure the settings for the exp popup.
 * @default {"PopUpText":"Exp %1","PopUpWidth":"240","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * 
 * @param PopUpRewardsGold
 * @text Gold popup settings
 * @desc Configure the settings for the gold popup.
 * @default {"PopUpText":"%1 G","PopUpWidth":"240","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * 
 * @param PopUpRewards
 * @text Item drop popup settings
 * @desc Configure the settings for item drop popup.
 * @default {"PopUpText":"%1","PopUpWidth":"240","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * 
 */
/*~struct~PopUpData:
 * 
 * @param PopUpText
 * @desc Popup text. %1: Pop-up item name (price, experience points)
 * @text Popup Text
 * @type string 
 * @default %1
 * 
 * @param PopUpWidth
 * @desc Specify the popup message width. (Default: 240)
 * @text Message Width
 * @type number
 * @default 240
 * 
 * @param PopupColor
 * @desc Popup color. (System color or Color Code (Text tab))
 * @text Popup text color
 * @type color
 * @default 0
 * 
 * @param PopupIconIndex
 * @desc The icon ID of the popup.
 * @text Popup Icon ID
 * @type icon
 * @default 0
 * 
 * @param PopupFontSize
 * @desc Font size (difference from main font)
 * @text Font size
 * @type number
 * @default 4
 * @min -99
 * 
 * @param PopupFontFace
 * @desc Specify any font (without extension).
 * @text Text font
 * @type string
 * @default 
 * 
 * @param PopupMode
 * @text Popup plugins to apply
 * @desc Specify the popup plugin to be applied. If no plugin is found, the default will be used.
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 撃破時ドロップポップアップ
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_PopupEx
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_PopupEx
 * @version 1.0.1
 * 
 * @help
 * 敵を倒した際に得る報酬を撃破時にポップアップ表示します。報酬は戦闘終了時に取得されます。
 * なおこのプラグインはNUUN_PopupExの拡張プラグインです。
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
 * 2025/10/4 Ver.1.0.1
 * アクター死亡時にエラーが出る問題を修正。
 * 2025/9/30 Ver.1.0.0
 * 初版
 * 
 * @param ShowPopUpRewardsExp
 * @desc 経験値ポップアップを表示します。
 * @text 経験値ポップアップ表示
 * @type boolean
 * @default true
 * 
 * @param ShowPopUpRewardsGold
 * @desc 所持金ポップアップを表示します。
 * @text 所持金ポップアップ表示
 * @type boolean
 * @default true
 * 
 * @param ShowPopUpRewards
 * @desc アイテムポップアップを表示します。
 * @text アイテムポップアップ表示
 * @type boolean
 * @default true
 * 
 * @param PopUpRewardsExp
 * @text 経験値ポップアップ設定
 * @desc 経験値のポップアップ設定をします。
 * @default {"PopUpText":"Exp %1","PopUpWidth":"240","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * 
 * @param PopUpRewardsGold
 * @text 所持金ドロップポップアップ設定
 * @desc 所持金ドロップのポップアップ設定をします。
 * @default {"PopUpText":"%1 G","PopUpWidth":"240","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * 
 * @param PopUpRewards
 * @text アイテムドロップポップアップ設定
 * @desc アイテムドロップのポップアップ設定をします。
 * @default {"PopUpText":"%1","PopUpWidth":"240","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * 
 */
/*~struct~PopUpData:ja
 * 
 * @param PopUpText
 * @desc ポップアップテキスト。%1:ポップアップするアイテム名(金額、経験値)
 * @text ポップアップテキスト
 * @type string 
 * @default %1
 * 
 * @param PopUpWidth
 * @desc ポップアップメッセージ幅を指定します。（デフォルト240）
 * @text メッセージ幅
 * @type number
 * @default 240
 * 
 * @param PopupColor
 * @desc ポップアップカラー。(システムカラーまたはカラーコード(テキストタブ))
 * @text ポップアップ文字色
 * @type color
 * @default 0
 * 
 * @param PopupIconIndex
 * @desc ポップアップのアイコンID。
 * @text ポップアップアイコンID
 * @type icon
 * @default 0
 * 
 * @param PopupFontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default 4
 * @min -99
 * 
 * @param PopupFontFace
 * @desc 任意のフォントを指定します。(拡張子なし)
 * @text テキスト部のフォント
 * @type string
 * @default 
 * 
 * @param PopupMode
 * @text 適用するポップアッププラグイン
 * @desc 適用させるポップアッププラグインを指定をします。プラグインが見つからない場合はデフォルトになります。
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 */

var Imported = Imported || {};
Imported.NUUN_DefeatDropPopup = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    NuunManager.getRewardPopupParams = function() {
        return params.PopUpRewards;
    };

    NuunManager.getRewardGoldPopupParams = function() {
        return params.PopUpRewardsGold;
    };

    NuunManager.getRewardExpPopupParams = function() {
        return params.PopUpRewardsExp;
    };


    const _Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
    Game_Enemy.prototype.performCollapse = function() {
        _Game_Enemy_performCollapse.call(this);
        this.makeRewards();
    };

    Game_Enemy.prototype.makeRewards = function() {
        if (!!this._rewards) return;
        this._rewards = {
            gold: this.gold(),
            exp: this.exp(),
            items: this.makeDropItems()
        };
    };

    Game_Enemy.prototype.getRewards = function() {
        return this._rewards;
    };

    Game_Enemy.prototype.getRewardExp = function() {
        return this._rewards.exp || 0;
    };

    Game_Enemy.prototype.getRewardGold = function() {
        return this._rewards.gold || 0;
    };

    Game_Enemy.prototype.getRewardDropItems = function() {
        return this._rewards.items || [];
    };

    Game_Troop.prototype.expTotal = function() {
        return this.deadMembers().reduce((r, enemy) => r + enemy.getRewardExp(), 0);
    };

    Game_Troop.prototype.goldTotal = function() {
        const members = this.deadMembers();
        return members.reduce((r, enemy) => r + enemy.getRewardGold(), 0) * this.goldRate();
    };

    Game_Troop.prototype.makeDropItems = function() {
        const members = this.deadMembers();
        return members.reduce((r, enemy) => {
            Array.prototype.push.apply(r, enemy.getRewardDropItems());
            return r;
        }, [])
    };

    Game_Troop.prototype.clearDropRewards = function() {
        const members = this.deadMembers();
        for (const member of members) {
             member._rewards = {};
        }
    };


    Window_BattleLog.prototype.displayRewards = function(target) {
        if (target.isActor()) return;
        const rewards = target.getRewards();
        if (rewards.exp > 0 && params.ShowPopUpRewardsExp && !!params.PopUpRewardsExp) {
            this.popupRewardExp(target, rewards);
        }
        if (rewards.gold > 0 && params.ShowPopUpRewardsGold && !!params.PopUpRewardsGold) {
            this.popupRewardGold(target, rewards);
        }
        if (params.ShowPopUpRewards && !!params.PopUpRewards) {
            for (const item of rewards.items) {
                this.popupRewardItem(target, item);
            }
        }
    };

    Window_BattleLog.prototype.popupRewardExp = function(target, rewards) {
        const popupData = new PopupData("rewardsExp");
        popupData.setup(rewards.exp);
        this.setupPopupList(target, popupData);
    };

    Window_BattleLog.prototype.popupRewardGold = function(target, rewards) {
        const popupData = new PopupData("rewardsGold");
        popupData.setup(rewards.gold);
        this.setupPopupList(target, popupData);
    };

    Window_BattleLog.prototype.popupRewardItem = function(target, item) {
        const popupData = new PopupData("rewardsItem");
        popupData.setup(item);
        this.setupPopupList(target, popupData);
    };

    const _Window_BattleLog_performCollapse = Window_BattleLog.prototype.performCollapse;
    Window_BattleLog.prototype.performCollapse = function(target) {
        _Window_BattleLog_performCollapse.apply(this, arguments);
        this.displayRewards(target);
    };

})();