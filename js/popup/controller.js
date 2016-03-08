// chrome extension objects
var chromeStorage = chrome.storage.sync;
var chromeAppManifest = chrome.runtime.getManifest();
var Controller = {
    getAccountList: function (parameters, callback, callbackArgs) {
        var accounts = [];
        chromeStorage.get(null, function (data) {
            if (data.HoneyAutoLogin && data.HoneyAutoLogin.Accounts) {
                accounts = data.HoneyAutoLogin.Accounts;
            }
            if (callback != undefined && typeof (callback) == "function") {
                callback(accounts, callbackArgs);
            }
        });
    },
    saveGridAccounts: function (parameters, callback, callbackArgs) {
        if (!parameters.records) {
            parameters.records = [];
        }
        var data = {
            Accounts: parameters.records
        }
        chromeStorage.set({ HoneyAutoLogin: data }, function () {
            if (callback != undefined && typeof (callback) == "function") {
                callback(callbackArgs);
            }
        });
    },
    deleteAccount: function (parameters, callback, callbackArgs) {
        chromeStorage.set({ youtubeSettingsObj: youtubeSettingsObj }, function () {
            document.getElementById("message").innerHTML = "Save successfully.";
            if (callback != undefined && typeof (callback) == "function") {
                callback(callbackArgs);
            }
        });
    }
}