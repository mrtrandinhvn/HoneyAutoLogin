var ViewList = {
    ViewGridAccounts: {
        selector: "#viewGridAccounts",
        grid: null
    }
}
var Data = {
    records: null,
    selected: null
};
(function () {
    var Data = {
        records: []
    };
    var columns = [
        { id: "id", name: "ID", field: "id", width: 50, selectable: true, editable: false, cssClass: "cell-title", cannotTriggerInsert: true, resizable: true },
        { id: "username", name: "Username", field: "username", width: 100, validator: requiredFieldValidator, editor: Slick.Editors.Text, editable: true, resizable: true },
        { id: "password", name: "Password", field: "password", width: 100, cssClass: "cell-title", editor: Slick.Editors.Text, validator: requiredFieldValidator, editable: true, resizable: true },
        { id: "url", name: "Link", field: "url", width: 300, editor: Slick.Editors.Text, cssClass: "cell-title", cannotTriggerInsert: true, editable: true, resizable: true, validator: requiredFieldValidator }
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
        grid.invalidateRows([Data.records.length - 1]);
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
    $(document).ready(function () {
        Controller.getAccountList(null, function (accounts, args) {
            Data.records = accounts;
            ViewList.ViewGridAccounts.grid = new Slick.Grid(ViewList.ViewGridAccounts.selector + " .grid", Data.records, columns, options);
            ViewList.ViewGridAccounts.grid.setSelectionModel(new Slick.RowSelectionModel());
            ViewList.ViewGridAccounts.grid.onAddNewRow.subscribe(function (e, gArgs) {
                var grid = this; // == ViewList.ViewGridAccounts.grid;
                var item;
                if (grid.getData().length == 0) {
                    item = { id: 0 };
                }
                else {
                    var currentCell = grid.getActiveCell();
                    var currentRow = currentCell.row;
                    var previousRowData = grid.getDataItem(currentRow - 1);
                    item = { id: previousRowData.id + 1 };
                }
                $.extend(item, gArgs.item);
                Data.records.push(item);
                onRefresh();
            });
        }, null);
        bindHeaderButtonEvents();
    });
})();
