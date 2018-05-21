//设置初始值
let del = document.getElementById("del");
let old = document.getElementById("old");
let colsAttrinput = [];
let row = document.getElementById("row");
let setAttr = document.getElementsByClassName("setAttr");
let columnsInput = [];
let tables = [];//储存表格
let setname = document.getElementById("setname");
let setnum = document.getElementById("setnum");
let select2 = document.getElementById("select2");
let bgTable = document.getElementById("bgTable");
let col = document.getElementById("col");
let commit = document.getElementById("commit");
let creatOP = document.getElementById("creatOP");
let creatTB = document.getElementById("creatTB");
let select1 = document.getElementById("select1");

//下拉框事件
select1.onchange = function () {

    switch (select1.value) {
        case "SELECT ONE":
            bgTable.innerHTML = "";
            row.innerHTML = "";
            col.innerHTML = "";
            creatTB.style.display = "none";
            commit.style.display = "none";
            old.selected = true;
            break;
        case "CREATE TABLE":
            del.innerHTML = "";
            row.innerHTML = "";
            creatTB.style.display = "block";
            creatOP.style.display = "block";
            break;


        case "ADD ROW":
            del.innerHTML = "";
            row.innerHTML = "";
            creatTB.style.display = "none";
            let number = 0;
            if (select2.value != "Select")
                number = tables[select2.value].getElementsByTagName("th").length;
            else {
                return;
            }
            let ths = tables[select2.value].getElementsByTagName("th");


            for (let i = 0; i < number; i++) {
                columnsInput[i] = document.createElement("input");
                columnsInput[i].type = "text";
                columnsInput[i].placeholder = ths[i] ? ths[i].innerHTML : "Attribute";
                row.appendChild(columnsInput[i]);
            }
            break;
        case"DELETE ROW":
            del.innerHTML = "";
            row.innerHTML = "";
            creatTB.style.display = "none";
            let numberd = 0;
            if (select2.value != "Select")
                numberd = tables[select2.value].getElementsByTagName("th").length;
            else {
                return;
            }
            let thsd = tables[select2.value].getElementsByTagName("th");
            for (let i = 0; i < numberd; i++) {
                columnsInput[i] = document.createElement("input");
                columnsInput[i].type = "text";
                columnsInput[i].placeholder = thsd[i] ? thsd[i].innerHTML : "Attribute";
                del.appendChild(columnsInput[i]);
            }

            break;
        case"DELETE TABLE":
            bgTable.innerHTML = "";
            row.innerHTML = "";
            col.innerHTML = "";
            creatTB.style.display = "none";
            commit.style.display = "none";
            window.alert("You can not ");
            break;

    }
}

setnum.onchange = function () {
    col.innerHTML = "";
    let cols = this.value;
    if (cols > 0) {
        commit.style.display = "block";
        for (i = 0; i < cols; i++) {
            let input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Attribute";
            input.id = "Attr" + i;
            col.appendChild(input);

        }
    }
}


commit.onclick = function () {
    switch (select1.value) {
        case "CREATE TABLE":
            let colsInput = [];//储存输入框信息
            for (let i = 0; i < parseInt(setnum.value); i++) {
                let ids = "Attr" + i;

                colsInput[i] = document.getElementById(ids).value;
            }
            colsAttrinput[setname.value] = colsInput;
            addOption(setname.value);
            tables[setname.value] = document.createElement("table");
            let thead = document.createElement("thead");
            for (let i = 0; i < parseInt(setnum.value); i++) {
                let th = document.createElement("th");
                th.innerHTML = colsInput[i] || "Attribute";
                thead.appendChild(th);
            }

            tables[setname.value].appendChild(thead);
            showTable(tables[setname.value]);
            break;
        case"ADD ROW":
            let number = 0;
            if (select2.value != "Select")
                number = tables[select2.value].getElementsByTagName("th").length;
            else {
                return;
            }
            let tr = document.createElement("tr");
            for (let i = 0; i < number; i++) {
                let td = document.createElement("td");
                if (columnsInput[i].value != null) {
                    td.innerHTML = columnsInput[i].value;
                }
                else {
                    td.innerHTML = "";
                }
                tr.appendChild(td);
            }
            tables[select2.value].appendChild(tr);
            showTable(tables[select2.value]);


            break;
        case "DELETE ROW":

            let numberd = 0;
            if (select2.value != "Select")
                numberd = tables[select2.value].getElementsByTagName("tr").length;
            else {
                return;
            }

            let names = [];

            for (let i = 0; i < columnsInput.length; i++) {
                if (columnsInput[i].value != null)
                    names[i] = columnsInput[i].value;
                else names[i] = "";
            }
            let trs = tables[select2.value].getElementsByTagName("tr");
            for (let i = 0; i < numberd; i++) {
                let check = false;
                let tds = [];
                tds = trs[i].getElementsByTagName("td");
                let nums = tds.length;
                for (let i = 0; i < nums; i++) {
                    if ((names[i] == tds[i].innerHTML) || (names[i] = "")) {
                        check = true;
                    }
                    else {
                        check = false;
                        break;
                    }

                }
                if (check) {
                    tables[select2.value].removeChild(trs[i]);

                }
            }
            showTable(tables[select2.value]);
            break;

        case "DELETE TABLE":
            let options = select2.getElementsByTagName("option");

            for (let option of options) {
                if (option.selected) {
                    if (option.value == "Select") {
                        return;
                    }
                    else {
                        select2.removeChild(option);
                        tables[option.value] = null;
                        bgTable = "";
                        if (select2.getElementsByTagName("option")[1]) {
                            select2.getElementsByTagName("option")[1].selected = true;
                            showTable(tables[select2.getElementsByTagName("option")[1].value]);
                        }
                        else{
                            select2.old.selected=true;
                        }

                    }

                }
            }
            break;


    }
}

//在第二个下拉框添加选项并选中
function addOption(optionValue) {
    let option = document.createElement("option");
    select2.appendChild(option);
    option.innerHTML = optionValue;
    option.value = optionValue;
    option.selected = true;
}

function showTable(table) {
    if (bgTable.firstChild) {
        bgTable.removeChild(bgTable.firstChild);
    }


    if (!(select2.value == "Select")) {
        bgTable.appendChild(table);
    }
}

select2.onchange = function () {
    showTable(tables[this.value]);

}

