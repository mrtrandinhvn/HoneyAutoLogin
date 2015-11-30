$(document).ready(function () {
    var moduleMatching = {
        ROLEPROFILE: "Job Design",
        TRAIN: "Training",
        TIMECLOCK: "Time & Attendance",
        TEMPPAYROLL: "Contingent Labour",
        TIMECLOCKLOG: "Timeclock Login",
        ADMIN1: "Task Management",
        RECRUITHONEY: "Recruitment",
        DEVCOM: "Development Companion",
        ROSTER: "Rostering",
        EXIT: "Exit Interviews",
        ED: "Employee Development",
        PAYROLLADMIN: "Payroll Adminstrator",
        ConnectAdmin: "System Administration",
        BUSINESSLOCATOR: "Business Locator",
        AUDIT: "Audit",
        AL: "Analytics",
        CMSS: "Manager Self Service",
        CESS: "Employee Self Service",
        "H&S": "Health and Safety",
        PAYROLLPROCESSING: "Payroll Manager",
        AS: "Performance",
        RECRUIT: "Recruitment - ASP",
        ORGANISATION: "Organisation",
        INDUCTION: "Induction"
    };
    function getQuery() {
        var inputData = {
            ModuleName: null,
            UserModuleId: null
        };
        var i;
        inputData.ModuleName = $("#input-moduleName").val();
        inputData.UserModuleId = $("#input-userModuleId").val();
        for (i in moduleMatching) {
            if (moduleMatching[i].toLowerCase().includes(inputData.ModuleName.toLowerCase())) {
                $("#span-moduleCode").text(i);
                break;
            }
        }
        $("#span-userModuleId").text(inputData.UserModuleId.replace(/\"/g, ''));
        $("#output").show();
        $("#input").hide();
    }
    function doSubmit(event) {
        switch (event.type) {
            case "keydown":
                if (event.keyCode == 13) {
                    getQuery();
                }
                break;
        }
    }
    document.getElementById("input-userModuleId").onkeydown = doSubmit;
});