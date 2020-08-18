var myList = document.getElementById("myUL");
var myNodeList = document.getElementsByTagName("LI");


for (var i = 0; i < myNodeList.length; i++) {
    var span = document.createElement("SPAN");
    var iTag = document.createElement("i");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    iTag.className = "far fa-edit";
    iTag.setAttribute("onclick", "editBtn(this)")
    span.appendChild(txt);
    myNodeList[i].appendChild(span);
    myNodeList[i].appendChild(iTag);
}


/*************** Firebase Database ***************/
firebase.database().ref('todo-list').on('child_added', function(data) {
    console.log(data.val());

    var li = document.createElement("li");
    var liTxt = document.createTextNode(data.val().ItemAdded);
    li.appendChild(liTxt);
    document.getElementById("myUL").appendChild(li);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.setAttribute("id", data.val().key);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";

            // Firebase Database Item Delete
            firebase.database().ref('todo-list').child(div.id).remove();
        }
    }

    var iTag = document.createElement("i");
    iTag.className = "far fa-edit";
    iTag.setAttribute("id", data.val().key);
    iTag.setAttribute("onclick", "editBtn(this)")
    li.appendChild(iTag);
})



function newElement() {
    var input = document.getElementById("myTodo");

    // Firebase Database 
    var database = firebase.database().ref('todo-list')
    var databaseKey = database.push().key;
    var todoList = {
        ItemAdded: input.value,
        key: databaseKey
    }
    database.child(databaseKey).set(todoList);

    if (input === '') {
        alert("You must write something!");
    } else {
        input.value = "";
    }
}

function deleteAll() {
    myList.innerHTML = "";

    // Firebase Database DeleteAll
    firebase.database().ref('todo-list').remove();
}

function editBtn(edit) {
    var val = prompt("Enter value to update", edit.parentNode.firstChild.nodeValue);
    // Firebase Database Edit
    firebase.database().ref('todo-list').child(edit.id).set({
        ItemAdded: val,
        key: edit.id
    })

    edit.parentNode.firstChild.nodeValue = val;
    var alertTxt = "Press edit button to edit";
    if (val === "") {
        alert("You must write something!");
        edit.parentNode.firstChild.nodeValue = alertTxt;
    }
}



var close = document.getElementsByClassName("close");
for (var i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";

        // Firebase Database Item Delete
        firebase.database().ref('todo-list').child(div.id).remove();
    }
}


var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);