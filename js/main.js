// Used for PayrollManager pages
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
// Select User Role
var doLoginWithRole = function () {
    var insertedNodes = [];
    var observer = new MutationObserver(function (mutations) {
        var roleList = $('select option');
        var isTriggered = false;
        for (var i = 0; i < mutations.length; i++) {
            if (mutations[i].attributeName == "style") {
                isTriggered = true;
            }
        }
        if (isTriggered) {
            if (roleList.length > 2) {
                for (var i = 0; i < roleList.length; i++) {
                    if ($(roleList[i]).text() == "Manager") {
                        $(roleList[i]).prop('selected', true);
                        var script = document.createElement('script');
                        script.textContent = "$('select').change();";
                        (document.head || document.documentElement).appendChild(script);
                        script.parentNode.removeChild(script);
                        break;
                    }
                }
            }
        }
    });
    var roleSelectNode = $('.brID-RoleType')[0];
    observer.observe(roleSelectNode, { attributes: true });

}
// Specific action to do login in normal honey pages
var doLoginActions = function (userObj) {
    $('.brID-Username input').val(userObj.username);
    $('.brID-Username input').focus();
    $('.brID-Password input').val(userObj.password);
    $('.brID-Password input').focus();
    $('.btn_login .brID-actionButton.br-button input').focus();
    $('.btn_login .brID-actionButton.br-button input').click();
    doLoginWithRole();
}

// Used for all normal honey pages
var doNormalLogin = function (userObj) {
    if (!document.hasFocus()) {
        // can't get focus priority from console so I have to set this event.
        $(window).focus(function () {
            doLoginActions(userObj);
        });
    } else {
        doLoginActions(userObj)
    }
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
        var userObj = {
            username: "admin",
            password: "12345"
        }
        switch (true) {
            case /draketest.honeysoftware.co.nz/.test(currentURL):
                userObj = setSpecialLoginData("admin", "aaa");
                break;
            case /hiltontest-adminnoncrm/.test(currentURL):
                userObj = setSpecialLoginData("phil", "123");
                break;
        }
        doNormalLogin(userObj);
    }
});
