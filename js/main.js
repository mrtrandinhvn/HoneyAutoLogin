$(document).ready(function () {
    var actualCode = ["$('#un').val('admin');",
                  " $('#pwd').val('goseitest');",
                  " doAuthenticate();"
    ].join('\n');
    var script = document.createElement('script');
    script.textContent = actualCode;
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
});