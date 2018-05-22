//设置初始值
let select1 = document.getElementById("select1");
let select2 = document.getElementById("select2");
let main = document.getElementById("main");
let bgTable = document.getElementById("bgTable");
let commit = document.getElementById("commit");
let tables = [];


//设置表格类，定义属性
class Table {
    constructor(name, attr) {
        this.name = name;
        this.attr = attr;
        this.tableContent = [];
    }
}

//下拉框事件
select1.onchange = function () {
    changeAction();
}

select2.onchange = function () {
    changeTable();
    changeAction();
}

function changeAction() {
    //清空内容
    main.innerHTML = "";
//五种情况
    switch (select1.selectedIndex) {
        case 0:
            commit.style.display = "none";
            break;
        case 1:
            commit.style.display = "none";
            createTable();
            break;
        case 2:
            commit.style.display = "none";
            addRow();
            break;
        case 3:
            deleteRow();
            break;
        case 4:
            deleteTable();
            break;
    }
}

function createTable() {
    //设置名字和数量
    let inputName = document.createElement("input");
    inputName.type = "text";
    inputName.placeholder = "Set Name";
    main.appendChild(inputName);

    let inputNumber = document.createElement("input");
    inputNumber.type = "number";
    inputNumber.placeholder = "Set Number";
    main.appendChild(inputNumber);
//属性值
    let attrBox = document.createElement("div");
    main.appendChild(attrBox);

    inputNumber.onchange = function () {
        attrBox.innerHTML = "";
        if (inputNumber.value > 0) {

            for (let i = 0; i < inputNumber.value; i++) {
                let inputAttr = document.createElement("input");
                inputAttr.type = "text";
                inputAttr.placeholder = "Attribute";
                inputAttr.className = "inputAttr";
                attrBox.appendChild(inputAttr);
            }
            commit.style.display = "block";
        }
    }

    commit.onclick = function () {
        let newTable = document.createElement("option");
        select2.appendChild(newTable);

        let attr = [];
        let attrList = document.getElementsByClassName("inputAttr");
        for (let i = 0; i < inputNumber.value; i++) {
            attr[i] = attrList[i].value;
        }
        //设置第x个table
        tables[newTable.index] = new Table(inputName.value, attr);

        newTable.innerHTML = tables[newTable.index].name;
        newTable.selected = true;

        changeTable();
    }
}

//改变并显示table
function changeTable() {
    bgTable.innerHTML = "";
    let index = select2.selectedIndex;
    if (index === 0) {
        return;
        //select的情况
    }
//设置表头
    let table = document.createElement("table");
    let rowHead = document.createElement("tr");
    for (let i = 0; i < tables[index].attr.length; i++) {
        if (tables[index].attr[i] !== "") {
            let tableHead = document.createElement("th");
            tableHead.innerHTML = tables[index].attr[i];
            rowHead.appendChild(tableHead);
        }
    }
    table.appendChild(rowHead);

    for (let rowNum = 0; rowNum < tables[index].tableContent.length; rowNum++) {
        let tableRow = document.createElement("tr");

        for (let colNum = 0; colNum < tables[index].attr.length; colNum++) {
            let tableCell = document.createElement("td");
            tableCell.innerHTML = tables[index].tableContent[rowNum][colNum];
            tableRow.appendChild(tableCell);
        }
        table.appendChild(tableRow);
    }

    bgTable.appendChild(table);
}


function addRow() {
    let index = select2.selectedIndex;
    if (index === 0) {
        commit.style.display = "none";
        return;
    }

    let currentTable = tables[index];
    let attrBox = document.createElement("div");
    main.appendChild(attrBox);
    for (let i = 0; i < currentTable.attr.length; i++) {
        let inputAttr = document.createElement("input");
        inputAttr.type = "text";
        inputAttr.placeholder = currentTable.attr[i];
        inputAttr.className = "inputAttr";
        attrBox.appendChild(inputAttr);
    }
    commit.style.display = "block";

    commit.onclick = function () {
        let newRow = [];
        let attrList = document.getElementsByClassName("inputAttr");
        for (let i = 0; i < currentTable.attr.length; i++) {
            newRow[i] = attrList[i].value;
        }
        currentTable.tableContent.push(newRow);

        changeTable();
    }
}

function deleteRow() {
    let index = select2.selectedIndex;
    if (index === 0) {
        commit.style.display = "none";
        return;
    }

    let currentTable = tables[index];
    let attrBox = document.createElement("div");
    main.appendChild(attrBox);
    for (let i = 0; i < currentTable.attr.length; i++) {
        let inputAttr = document.createElement("input");
        inputAttr.type = "text";
        inputAttr.placeholder = "Attr" + (i + 1);
        inputAttr.className = "inputAttr";
        attrBox.appendChild(inputAttr);
        commit.style.display = "block";
    }

    commit.onclick = function () {
        let attrList = document.getElementsByClassName("inputAttr");
        for (let rowNum = 0; rowNum < currentTable.tableContent.length; rowNum++) {
            let colNum = 0;
            for (; colNum < currentTable.attr.length; colNum++) {
                if (attrList[colNum].value !== "" &&
                    currentTable.tableContent[rowNum][colNum] !== attrList[colNum].value) {
                    break;
                }
            }
            if (colNum === currentTable.attr.length) {
                currentTable.tableContent[rowNum] = null;
            }
        }
//赋值
        let newTableContent = [];
        for (let rowNum = 0; rowNum < currentTable.tableContent.length; rowNum++) {
            if (currentTable.tableContent[rowNum] !== null) {
                newTableContent.push(currentTable.tableContent[rowNum]);
            }
        }
        currentTable.tableContent = newTableContent;

        changeTable();
    }
}

function deleteTable() {
    let index = select2.selectedIndex;
    if (index === 0) {
        commit.style.display = "none";
        return;
    }

    let warningBox = document.createElement("div");
    warningBox.innerHTML = "<p>WARNING: You cannot undo this action!</p>";
    main.appendChild(warningBox);
    commit.style.display = "block";

    commit.onclick = function () {
        index = select2.selectedIndex;
        tables.splice(index, 1);
        select2.removeChild(select2.options[index]);
        if (select2.options.length === 1) {
            select2.options[0].selected = true;
            commit.style.display = "none";
            main.innerHTML = "";
        }
        else {
            select2.options[1].selected = true;
        }
        changeTable();
    }
}
