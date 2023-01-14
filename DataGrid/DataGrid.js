import stylesheet from '/js/DataGrid/DataGrid.css' assert { type: 'css' };
document.adoptedStyleSheets.push(stylesheet);

function _buildGrid(options, data) {
    let tableHeaderColumns = '';
    options.fields.forEach(field => {
        tableHeaderColumns += `<th>${field.alias}</th>`;
    });
    let tableHeaderRow = `<tr>${tableHeaderColumns}</tr>`;

    let tableRows = '';
    data.forEach(record => {
        let tableRowColumns = '';
        options.fields.forEach(field => {
            tableRowColumns += `<td>${record[field.name]}</td>`;
        });

        tableRows += `<tr>${tableRowColumns}</tr>`;
    });

    let table = `<table><thead>${tableHeaderRow}</thead><tbody>${tableRows}</tbody></table`;

    if (options.container instanceof Element) { options.container.innerHTML = table; }
    else {
        document.getElementById(options.container).innerHTML = table;
    }
};

class DataGrid {
    options = null;
    data = null;

    constructor(options) {
        if (!options) { return; }
        if (!options.container) { return; }
        if (!options.fields) { return; }

        this.options = options;
    };

    load(data) {
        this.data = data;

        _buildGrid(this.options, data);
    };

    refresh() {
        _buildGrid(this.options, this.data);
    };
};

export default DataGrid;