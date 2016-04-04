var ViewList = {
    ViewGridAccounts: {
        selector: "#viewGridAccounts",
        grid: null
    }
}
var Data = {
    records: null,
    selected: null,
    orderBy: "id", // default sort column 
    orderAsc: true // default sort order
};
(function () {
    var columns = [
        { id: "id", name: "ID", field: "id", width: 50, selectable: true, editable: false, cssClass: "cell-title", cannotTriggerInsert: true, resizable: true, sortable: true },
        { id: "username", name: "Username", field: "username", width: 100, validator: requiredFieldValidator, editor: Slick.Editors.Text, editable: true, resizable: true, sortable: true },
        { id: "password", name: "Password", field: "password", width: 100, cssClass: "cell-title", editor: Slick.Editors.Text, validator: requiredFieldValidator, editable: true, resizable: true, sortable: true },
        { id: "url", name: "Link", field: "url", width: 300, editor: Slick.Editors.Text, cssClass: "cell-title", cannotTriggerInsert: true, editable: true, resizable: true, validator: requiredFieldValidator, sortable: true }
    ];
    var options = {
        editable: true,
        enableAddRow: true,
        enableCellNavigation: true,
        forceFitColumns: true,
        autoEdit: false
    };
    function requiredFieldValidator(value) {
        if (value == null || !value.length) {
            return { valid: false, msg: "This is a required field" };
        } else {
            return { valid: true, msg: null };
        }
    }
    function onRefresh(data) {
        var grid = ViewList.ViewGridAccounts.grid;
        if (data) {
            Data.records = data;
        }
        grid.invalidateAllRows();
        grid.updateRowCount();
        grid.render();
    }
    function onSave(event) {
        var grid = ViewList.ViewGridAccounts.grid;
        var parameters = {
            records: grid.getData()
        }
        Controller.saveGridAccounts(parameters, function (data, args) {
            $(ViewList.ViewGridAccounts.selector + " .message").html("Save Successfully");
            $(ViewList.ViewGridAccounts.selector + " .message").fadeIn(400).delay(3000).fadeOut(400); //fade out after 3 seconds
        }, null);
    }
    function onDelete(event) {
        var grid = ViewList.ViewGridAccounts.grid;
        var activeRow = grid.getDataItem(grid.getActiveCell().row);
        if (!activeRow) return;
        var userId = activeRow.id;
        for (var i = 0; i < Data.records.length; i++) {
            if (Data.records[i].id == userId) {
                Data.records.splice(i, 1);
                grid.invalidate();
                break;
            }
        }
    }
    function bindHeaderButtonEvents() {
        $(ViewList.ViewGridAccounts.selector + " .grid-header .btn-save").click(onSave);
        $(ViewList.ViewGridAccounts.selector + " .grid-header .btn-delete").click(onDelete);
    }
    function sortAsc(a, b) {
        switch (Data.orderBy) {
            case "username":
                return a.username.toString().localeCompare(b.username.toString());
            case "password":
                return a.password.toString().localeCompare(b.password.toString());
            case "url":
                return a.url.toString().localeCompare(b.url.toString());
            default: // id
                return a.id.toString().localeCompare(b.id.toString());
        }
    }
    function sortDesc(a, b) {
        switch (Data.orderBy) {
            case "username":
                return b.username.toString().localeCompare(a.username.toString());
            case "password":
                return b.password.toString().localeCompare(a.password.toString());
            case "url":
                return b.url.toString().localeCompare(a.url.toString());
            default: // id
                return b.id.toString().localeCompare(a.id.toString());
        }
    }
    // do sort function
    function sortData(orderBy, orderAsc) {
        if (orderAsc) {
            Data.records.sort(sortAsc);
        } else {
            Data.records.sort(sortDesc);
        }
    }
    // handle user's clicking sort button event
    function onSort(event, args) {
        Data.orderBy = args.sortCol.id;
        Data.orderAsc = args.sortAsc;
        sortData(Data.orderBy, Data.orderAsc);
        onRefresh();
    }
    $(document).ready(function () {
        // Load data and generate users grid
        var grid;
        Controller.getAccountList(null, function (accounts, args) {
            Data.records = accounts;
            // initiate grid
            ViewList.ViewGridAccounts.grid = new Slick.Grid(ViewList.ViewGridAccounts.selector + " .grid", Data.records, columns, options);
            // configure grid
            grid = ViewList.ViewGridAccounts.grid;
            grid.setSelectionModel(new Slick.RowSelectionModel());
            grid.onSort.subscribe(onSort);
            grid.onAddNewRow.subscribe(function (e, gArgs) {
                var item;
                if (grid.getData().length == 0) {
                    item = { id: 0 };
                }
                else {
                    item = { id: Data.records.length }; // id is counted from 0
                }
                $.extend(item, gArgs.item);
                Data.records.push(item);
                onRefresh();
            });
            // set default sort column
            sortData(Data.orderBy, Data.orderAsc);
            grid.setSortColumn(Data.orderBy, Data.orderAsc); // update UI
            onRefresh(); // refresh grid data
        }, null);
        bindHeaderButtonEvents();
    });
})();
