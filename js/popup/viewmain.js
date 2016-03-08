var accounts = [
    { id: 0, username: "admin", password: "12345", url: "localhost:8081" }
];
var Controller = {
    loadAccountList: function (parameters, callback, callbackArgs) {
        chromeStorage.get(null, function (data) {
            if (data.HoneyAccounts) {
                accounts = data.HoneyAccounts;
            }
        });
        if (callback != undefined && typeof (callback) == "function") {
            callback(accounts, callbackArgs);
        }
    },
    addEditAccount: function (parameters, callback, callbackArgs) {
        chromeStorage.set({ youtubeSettingsObj: youtubeSettingsObj }, function () {
            document.getElementById("message").innerHTML = "Saved Setting: " + successMessage;
        });
        if (callback != undefined && typeof (callback) == "function") {
            callback(callbackArgs);
        }
    },
    deleteAccount: function (parameters, callback, callbackArgs) {
        chromeStorage.set({ youtubeSettingsObj: youtubeSettingsObj }, function () {
            document.getElementById("message").innerHTML = "Saved Setting: " + successMessage;
        });
        if (callback != undefined && typeof (callback) == "function") {
            callback(callbackArgs);
        }
    }
}