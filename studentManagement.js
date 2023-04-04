var selectedRow = null;
var originalTableData = null;

function onFormSubmit(event) {
    event.preventDefault();
    var formData = readFormData();
    if (selectedRow === null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["email"] = document.getElementById("email").value;
    formData["gpa"] = document.getElementById("gpa").value;
    formData["age"] = document.getElementById("age").value;
    formData["degree"] = document.getElementById("degree").value;
    return formData;
}

// function insertNewRecord(data) {
//     var table = document.getElementById("studentList").getElementsByTagName('tbody')[0];
//     var newRow = table.insertRow(table.length);
//     newRow.setAttribute('data-search', `${data.fullName.toLowerCase()} ${data.email.toLowerCase()} ${data.degree.toLowerCase()}`);

//     var cell1 = newRow.insertCell(0);
//     cell1.innerHTML = data.fullName;
//     var cell2 = newRow.insertCell(1);
//     cell2.innerHTML = data.email;
//     var cell3 = newRow.insertCell(2);
//     cell3.innerHTML = data.gpa;
//     var cell4 = newRow.insertCell(3);
//     cell4.innerHTML = data.age;
//     var cell5 = newRow.insertCell(4);
//     cell5.innerHTML = data.degree;
//     var cell6 = newRow.insertCell(5);
//     cell6.innerHTML = `<a href="#" onClick='onEdit(this)'>Edit</a>
//     <a href="#" onClick='onDelete(this)'>Delete</a>`;
// }

function insertNewRecord(data) {
    var table = document.getElementById("studentList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var id = new Date().getTime(); // generate unique ID based on current timestamp
    newRow.setAttribute('data-id', id);
    newRow.setAttribute('data-search', `${data.fullName.toLowerCase()} ${data.email.toLowerCase()} ${data.degree.toLowerCase()}`);

    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = id;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.fullName;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.age;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.gpa;
    var cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.degree;
    var cell7 = newRow.insertCell(6);
    cell7.innerHTML = `<a href="#" onClick='onEdit(this)'><i class="fas fa-edit"></i></a>
    <a href="#" onClick='onDelete(this)'><i class="fas fa-trash-alt"></i></a>`;

     // store the entire row element in originalTableData object
  originalTableData[id] = newRow.outerHTML;
}


// function searchTable() {
//     var input = document.getElementById("searchInput");
//     var filter = input.value.toLowerCase();
//     var rows = document.querySelector("#studentList tbody").rows;
  

//     // Store original table data in a Map object
//     if (originalTableData === null) {
//         originalTableData = new Map();
//         for (var i = 0; i < rows.length; i++) {
//             var id = rows[i].getAttribute('data-id');
//             originalTableData.set(id, rows[i].innerHTML);
//         }
//     }

//     for (var i = 0; i < rows.length; i++) {
//       var searchAttr = rows[i].getAttribute('data-search');
//       if (searchAttr.indexOf(filter) > -1) {
//         rows[i].style.display = "";
//       } else {
//         rows[i].style.display = "none";
//       }
//     }
//   }

function searchTable() {
    var input = document.getElementById("searchInput");
    var filter = input.value.toLowerCase();
    var rows = document.querySelector("#studentList tbody").rows;

    // Store original table data in a Map object
    if (originalTableData === null) {
        originalTableData = new Map();
        for (var i = 0; i < rows.length; i++) {
            var id = rows[i].getAttribute('data-id');
            originalTableData.set(id, rows[i].innerHTML);
        }
    }

    // Filter table based on search input
    for (var i = 0; i < rows.length; i++) {
        var searchAttr = rows[i].getAttribute('data-search');
        if (searchAttr.indexOf(filter) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }

    // Replace filtered table with original table data if search input is empty
    if (filter === "") {
        for (var i = 0; i < rows.length; i++) {
            var id = rows[i].getAttribute('data-id');
            rows[i].innerHTML = originalTableData.get(id);
        }
    }
}





 

  

function resetForm() {
    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('gpa').value = '';
    document.getElementById('age').value = '';
    document.getElementById('degree').value = '';
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById('fullName').value = selectedRow.cells[1].innerHTML;
    document.getElementById('email').value = selectedRow.cells[2].innerHTML;
    document.getElementById('gpa').value = selectedRow.cells[4].innerHTML;
    document.getElementById('age').value = selectedRow.cells[3].innerHTML;
    document.getElementById('degree').value = selectedRow.cells[5].innerHTML;
}

function updateRecord(formData) {
    var id = selectedRow.getAttribute('data-id');
    selectedRow.cells[0].innerHTML = id ;
    selectedRow.cells[1].innerHTML = formData.fullName;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.age;
    selectedRow.cells[4].innerHTML = formData.gpa;
    selectedRow.cells[5].innerHTML = formData.degree;
    

}



function onDelete(td) {
    if (confirm('Are you sure you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('studentList').deleteRow(row.rowIndex);
        resetForm();
    }
}
