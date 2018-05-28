//设置初始值
let select1 = document.getElementById("select1");
let select2 = document.getElementById("select2");
let main = document.getElementById("main");
let bgTable = document.getElementById("bgTable");
let commit = document.getElementById("commit");
let tables = [];
let br = document.createElement("br");

//设置表格类，定义属性
class Table {
    constructor(name, attr) {
        this.name = name;
        this.attr = attr;
        this.tableContent = [];
    }
}

//两个下拉框事件
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
    let setName = document.createElement("input");
    let setNum = document.createElement("input");
    setName.placeholder = "Set Name";
    setNum.placeholder = "Set Number";
    setNum.type = "number";
    setName.type = "text";
    main.appendChild(setName);
    main.appendChild(setNum);
    main.appendChild(br);

    setNum.onchange = function () {
        for (let i = 0; i < parseInt(setNum.value); i++) {
            let input = document.createElement("input");
            input.placeholder = "Attr" + (i + 1);
            input.id = "Attr" + (i + 1);
            main.appendChild(input);
        }
        commit.style.display = "block";
        commit.onclick = function () {
            let attr = [];
            for (let i = 0; i < parseInt(setNum.value); i++) {
                let id = "Attr" + (i + 1);
                attr[i] = document.getElementById(id).value;
            }


            let option = document.createElement("option");
            option.innerHTML = setName.value;
            select2.appendChild(option);
            option.selected = "true";
            tables[option.index] = new Table(setName.value, attr);//只需要两个值

            changeTable();

        }

    }


}

//改变并显示table
function changeTable() {
    bgTable.innerHTML = "";
    let index = select2.selectedIndex;
    if (index === 0) {
        bgTable = "";
        return;
        //select的情况
    }
    let table = document.createElement("table");
    //设置表头
    let thead = document.createElement("tr");
    for (let i = 0; i < tables[index].attr.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = tables[index].attr[i];
        thead.appendChild(th);
    }
    table.appendChild(thead);


    for (let i = 0; i < tables[index].tableContent.length; i++) {
        let tr = document.createElement("tr");

        for (let j = 0; j < tables[index].attr.length; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = tables[index].tableContent[i][j];
        }
        table.appendChild(tr);
    }


    bgTable.appendChild(table);
}


function addRow() {
    main.innerHTML = "";
    commit.style.display = "block";
    let index = select2.selectedIndex;
    if (index === 0) {
        commit.style.display = "none";
        return;
    }
    for (let i = 0; i < tables[index].attr.length; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = tables[index].attr[i];
        input.id = "Attr" + (i + 1);
        main.appendChild(input);
    }
    commit.onclick = function () {
        let array = [];
        for (let i = 0; i < tables[index].attr.length; i++) {
            let id = "Attr" + (i + 1);
            array[i] = document.getElementById(id).value;
        }
        tables[index].tableContent.push(array);
        changeTable();
    }
}

function deleteRow() {
    main.innerHTML = "";

    commit.style.display = "block";
    let index = select2.selectedIndex;
    if (index === 0) {
        commit.style.display = "none";
        return;
    }
    for (let i = 0; i < tables[index].attr.length; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = tables[index].attr[i];
        input.id = "Attr" + (i + 1);
        main.appendChild(input);
    }
    commit.onclick = function () {
        let array = [];
        for (let i = 0; i < tables[index].attr.length; i++) {
            let id = "Attr" + (i + 1);
            array[i] = document.getElementById(id).value;
        }
        for (let i = 0; i < tables[index].tableContent.length; i++) {
            let check = false;

            for (let j = 0; j < tables[index].attr.length; j++) {
                if ((array[j] != "") && array[j] != tables[index].tableContent[i][j]) {
                    break;
                }
                if (j == tables[index].attr.length - 1) {
                    check = true;
                }

            }
            if (check) {
                tables[index].tableContent[i] = null;
            }
        }
        let newTableContent = [];
        for (let i = 0; i < tables[index].tableContent.length; i++) {
            if (tables[index].tableContent[i] !== null) {
                newTableContent.push(tables[index].tableContent[i]);
            }
        }
        tables[index].tableContent = newTableContent;
        changeTable();


    }

}

function deleteTable() {
    let index = select2.selectedIndex;
    if (index == 0) {
        commit.style.display = "none";
        bgTable = "";
        return;
    }
    commit.style.display = "block";
    let warn = document.createElement("div");
    warn.innerHTML = "<p>You can not undo this action!</p>"
    main.appendChild(warn);
    commit.onclick = function () {
        index = select2.selectedIndex;//数据不会自动更新？
        tables.splice(index, 1);//去除删掉的table
        select2.removeChild(select2.options[index]);
        if (select2.options.length == 1) {
            select2.options[0].selected = "true";//此时选中不算onchange！
        }
        else {
            select2.options[1].selected = "true";
        }

        changeTable();
    }


}
