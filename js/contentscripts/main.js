$(document).ready(function () {
    var currentUrl = document.URL;
    var payrollManagerPattern = /\/app\/pub\/cli\/logon.html/;
    var normalPattern = /.honeysoftware.co.nz\/login.aspx|localhost:63653\/login.aspx|careers.crewships.com\/login.aspx/;
    var mode = null;
    var userObj; // use to store login account
    if (payrollManagerPattern.test(currentUrl)) {
        mode = "PAYROLL";
    } else if (normalPattern.test(currentUrl)) {
        mode = "NORMAL";
    }
    Controller.getAccountList(null, function (data) {
        if (!data || data.length == 0) return;
        userObj = {
            username: "admin",
            password: "12345"
        }
        for (var i = 0; i < data.length; i++) {
            var pattern = new RegExp(data[i].url);
            if (pattern.test(currentUrl)) {
                userObj = data[i];
                break;
            }
        }
        switch (mode) {
            case "NORMAL":
                doNormalLogin(userObj);
                break;
            case "PAYROLL":
                doLoginPayrollManager(userObj);
                break;
        }
    }, null);
});
