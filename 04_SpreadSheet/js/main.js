const spreadSheetContainer = document.querySelector('#spreadsheet-container');
const exportBtn = document.querySelector('#export-btn');
const selectValue = document.querySelector('#cell-value');
const ROWS = 6 + 1; // 열 칸 수
const COLS = 5 + 1; // 행 칸 수
const spreadsheet = [];
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 'x', 'y', 'z'];

class Cell {
    constructor(isHeader, disabled, data, row, column, rowName, columnName, active = false) {
        this.isHeader = isHeader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.column = column;
        this.rowName = rowName;
        this.columnName = columnName;
        this.active = active;
    }
};

exportBtn.onclick = function(e) {
    let csv = '';
    for(let i = 0; i < spreadsheet.length; i++ ) {
        if(i === 0) continue;
        csv +=
            spreadsheet[i]
                .filter(item => !item.isHeader)
                .map(item => item.data)
                .join(',') + '\r\n';
    }
    
    const csvObj = new Blob([csv]);
    const csvUrl = URL.createObjectURL(csvObj);
    console.log('csv', csvUrl);

    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = 'spreadsheet name.csv';
    a.click();
}

function initSpreadsheet() {
    for(let i = 0; i < ROWS; i++) {
        let spreadsheetRow = [];
        for(let j = 0; j < COLS; j++) {
            let cellData = '';
            let isHeader = false;
            let disabled = false;

            if(j === 0) (cellData = i, isHeader = true, disabled = true);
            if(i === 0) (cellData = alphabet[j - 1] != undefined ? alphabet[j - 1].toUpperCase() : '', isHeader = true, disabled = true);

            if(cellData <= 0) cellData = '';

            const rowName = i;
            const columnName = alphabet[j - 1];

            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, columnName, false);
            spreadsheetRow.push(cell);
        }
        spreadsheet.push(spreadsheetRow);
    }
    drawSheet();
    // console.log(spreadsheet);
}

function createCellEl(cell) {
    const cellEl = document.createElement('input');
    cellEl.className = 'cell';
    cellEl.id = 'cell_' + cell.row + cell.column;
    cellEl.value = cell.data;
    cellEl.disabled = cell.disabled;

    if(cell.isHeader) {
        cellEl.classList.add('header');
    }

    cellEl.onclick = e => handleCellClick(e.target, cell);
    cellEl.onchange = e => handleOnChange(e.target.value, cell);
    cellEl.onkeyup = e => handleOnKeyDown(e.target.value);
    

    return cellEl;
}

function handleOnKeyDown(data) {
    selectValue.innerHTML = data;
}

function handleOnChange(data, cell) {
    cell.data = data;
}

function handleCellClick(e, cell) {
    const columnHeader = spreadsheet[0][cell.column];
    const rowHeader = spreadsheet[cell.row][0];
    const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
    const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);

    clearHeaderActiveStates();
    columnHeaderEl.classList.add('active');
    rowHeaderEl.classList.add('active');
    e.classList.add('on');
    document.querySelector('#cell-status').innerHTML = cell.columnName.toUpperCase() + cell.rowName;
    selectValue.innerHTML = cell.data;

    
    // console.log(columnHeaderEl, rowHeaderEl);
}

function clearHeaderActiveStates() {
    const headers = document.querySelectorAll('.header');
    const cells = document.querySelectorAll('.on');

    headers.forEach(header => {
        header.classList.remove('active');
    });

    cells.forEach(cell => {
        cell.classList.remove('on');
    })
}

function getElFromRowCol(row, col) {
    return document.querySelector('#cell_' + row + col);
}

function drawSheet() {
    for(let i = 0; i < spreadsheet.length; i++) {
        const rowContainerEl = document.createElement('div');
        rowContainerEl.className = 'cell-row'
        for(let j = 0;j < spreadsheet[i].length; j++) {
            const cell = spreadsheet[i][j];
            rowContainerEl.append(createCellEl(cell));
        }
        spreadSheetContainer.append(rowContainerEl);
    }
}


function init() {
    initSpreadsheet();
}

init();