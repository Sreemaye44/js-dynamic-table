const tableData = document.getElementById("tableData");
const tableHead = document.getElementById("table-head");
const tBody = document.getElementById("table-body");

let tableColumns = 1;

function addColumn() {
    const headData = document.getElementById("inputColumn").value;
    if (headData === '' || headData === null) {
        alert("Column name can't be blank!");
        return;
    } 
    const th = document.createElement('th');
    th.innerHTML =`<span>${headData}</span> <input type="button"  class="btn btn-danger" value="X" onclick="deleteColumn(${tableColumns})"></input>` ;
    tableHead.appendChild(th);
        for (let i = 0; i < tBody.rows.length; i++){
            tBody.rows[i].insertCell(tableColumns).innerHTML = 
            `
                <td>
                <input type="text" class="form-control d-inline-block" placeholder="Insert ${tableData.rows[0].cells[tableColumns].innerText}">
                <span class="d-none"></span>
                </td>
            `
    }
    tableColumns++;
    document.getElementById("inputColumn").value = "";

}

function addRow() {
    const tableColumnLength = tableData.rows[0].cells.length;
    if (tableColumnLength < 2) {
        alert("Column need to be added first!");
        return;
    }
    let inputCell = ``;
    for (let i = 1; i < tableColumnLength; i++){
        inputCell += 
        `
            <td>
            <input type="text" class="form-control d-inline-block" placeholder="Insert  ${tableData.rows[0].cells[i].innerText}">
            <span class="d-none"></span>
            </td>
        `
    }
    let bodyRow = document.createElement("tr");

    bodyRow.setAttribute("id", `row_${tBody.rows.length}`);
    bodyRow.innerHTML =
    `
            <td>
                <input type="button"  class="btn btn-primary" value="Save" onclick="saveRow(${tBody.rows.length})"></input>
                <input type="button"  class="btn btn-warning" value="Delete" onclick="deleteRow(${tBody.rows.length})"></input>
            </td>
            ${inputCell}
    `

    tBody.appendChild(bodyRow);

}

function deleteRow(rowId) {
    updateRowIndex(rowId);
    const selectedRow = document.getElementById(`row_${rowId}`);
    tBody.removeChild(selectedRow);

}

function deleteColumn(columnId) {
    updateColumnIndex(columnId);
    tableData.rows[0].cells[columnId].remove();
    for (let i = 0; i < tBody.rows.length; i++){
        tBody.rows[i].cells[columnId].remove();
    }
    tableColumns--;
    if (tableColumns === 1) {
        for (let i = 0; i < tBody.rows.length; i++) {
            tBody.innerHTML= '';
        }
    }

}

function updateRowIndex(rowId) {
    for (let i = rowId + 1; i < tBody.rows.length; i++){
        tBody.rows[i].cells[0].lastElementChild.setAttribute("onclick", `deleteRow(${i - 1})`);
        tBody.rows[i].setAttribute("id", `row_${i - 1}`);
        let firstElementValue = tBody.rows[i].cells[0].firstElementChild.getAttribute("onClick");
        if (firstElementValue.includes("edit")) {
            tBody.rows[i].cells[0].firstElementChild.setAttribute("onclick", `editRow(${i - 1})`); 
        } else {
            tBody.rows[i].cells[0].firstElementChild.setAttribute("onclick", `saveRow(${i - 1})`);
        }
    }
}

function updateColumnIndex(columnId) {
    for (let i = columnId + 1; i < tableData.rows[0].cells.length; i++){
        tableData.rows[0].cells[i].lastElementChild.setAttribute("onclick", `deleteColumn(${i - 1})`);
    }
}

function saveRow(rowId) {
    for (let i = 1; i < tBody.rows[rowId].cells.length; i++){
        tBody.rows[rowId].cells[i].lastElementChild.classList.remove("d-none");
        tBody.rows[rowId].cells[i].lastElementChild.classList.add("d-inline-block");
        tBody.rows[rowId].cells[i].lastElementChild.innerText = tBody.rows[rowId].cells[i].firstElementChild.value;
        tBody.rows[rowId].cells[i].firstElementChild.classList.remove("d-inline-block");
        tBody.rows[rowId].cells[i].firstElementChild.classList.add("d-none");
    }
    tBody.rows[rowId].cells[0].firstElementChild.value = "Edit";
    tBody.rows[rowId].cells[0].firstElementChild.setAttribute("onclick", `editRow(${rowId})`);
}

function editRow(rowId) {
    tBody.rows[rowId].cells[0].firstElementChild.value = "Update";
    for (let i = 1; i < tBody.rows[rowId].cells.length; i++){
        tBody.rows[rowId].cells[i].firstElementChild.classList.remove("d-none");
        tBody.rows[rowId].cells[i].firstElementChild.classList.add("d-inline-block");
        tBody.rows[rowId].cells[i].firstElementChild.value = tBody.rows[rowId].cells[i].lastElementChild.innerText;
        tBody.rows[rowId].cells[i].firstElementChild.classList.remove("d-inline-block");
        tBody.rows[rowId].cells[i].lastElementChild.classList.add("d-none");
    }
    tBody.rows[rowId].cells[0].firstElementChild.setAttribute("onclick", `saveRow(${rowId})`);
    
}

