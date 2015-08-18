var doLoginPayrollManager = function (userObj) {
    var username = userObj.username;
    var password = userObj.password;
    var actualCode = ["$('#un').val('" + username + "');",
                  " $('#pwd').val('" + password + "');",
                  " doAuthenticate();"
    ].join('\n');
    var script = document.createElement('script');
    script.textContent = actualCode;
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
}
var doNormalLogin = function () {
    // inject script into the page after the page has loaded
    var s = document.createElement('script');
    // TODO: add "script.js" to web_accessible_resources in manifest.json
    s.src = chrome.extension.getURL('js/donormallogin.js');
    s.onload = function () {
        this.parentNode.removeChild(this);
    };
    (document.head || document.documentElement).appendChild(s);
}
var setSpecialLoginData = function (username, password) {
    var userObj = {
        username: username,
        password: password
    };
    return userObj;
}
$(document).ready(function () {
    var currentURL = document.URL;
    var payrollManagerPattern = /\/app\/pub\/cli\/logon.html/;
    var normalPattern = /.honeysoftware.co.nz\/login.aspx|localhost:63653\/login.aspx/
    if (payrollManagerPattern.test(currentURL)) {
        var userObj = {
            username: "admin",
            password: "goseitest"
        }
        switch (true) {
            case /asptest-adminnoncrm/.test(currentURL):
                userObj = setSpecialLoginData("admin", "clover");
                break;
            case /hiltontest-adminnoncrm/.test(currentURL):
                userObj = setSpecialLoginData("admin", "hiltonadmin");
                break;
        }
        doLoginPayrollManager(userObj);
    } else if (normalPattern.test(currentURL)) {
        doNormalLogin();
    }
});
