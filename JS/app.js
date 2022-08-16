const toDoItem = document.querySelector('.container .adding-item input');
const addBtn = document.querySelector('.container .adding-item button');
const listItemContainer = document.querySelector('.container .todo-list .list-items');
const clearAll = document.querySelector('.end .clear button');

let toDoItemArray = [];
let storage = localStorage.getItem('New Todo');

let pendingItems = document.querySelector('.end .left-task');
let pendingNum = 0, pendingItemsHtml;

pendingItemsHtml = `<p>No pending task</p>`;
pendingItems.innerHTML = pendingItemsHtml;

if (storage != null) {
    toDoItemArray = JSON.parse(storage);
    pendingNum = countPending(toDoItemArray);
    showList(toDoItemArray);
    pendingItemsHtml = `<p>You have ${pendingNum} pending task</p>`;
    pendingItems.innerHTML = pendingItemsHtml;

}
else{

}
//toggle highlighting addBtn
toDoItem.onkeyup = () => {
    var item = toDoItem.value;

    if (item.trim() != 0) {
        addBtn.classList.add('active');
    }
    else {
        addBtn.classList.remove('active');
    }

}
addBtn.addEventListener('click', () => {
    var item = toDoItem.value;

    if (toDoItem.value == "") {
        alert("Empty!!!!");
    }
    else {
        toDoItem.value = "";

        let getLocalStorage = localStorage.getItem("New Todo");
        if (getLocalStorage == null) {
            toDoItemArray = [];
        }
        else {
            toDoItemArray = JSON.parse(getLocalStorage); //transforming json string into object
        }
        toDoItemArray.push(item); //adding value to the list
        localStorage.setItem("New Todo", JSON.stringify(toDoItemArray)); //transforming js object into json string
        console.log(toDoItemArray);
        showList(toDoItemArray);
        pendingNum = countPending(toDoItemArray);
        pendingItemsHtml = `<p>You have ${pendingNum} pending task</p>`;
        pendingItems.innerHTML = pendingItemsHtml;

    }
})



clearAll.addEventListener('click', () => {
    if (localStorage.getItem('New Todo')) {
        localStorage.clear();
        toDoItemArray = [];
        showList(toDoItemArray);
        pendingItemsHtml = `<p>No pending task</p>`;
        pendingItems.innerHTML = pendingItemsHtml;
    }
})

function showList(array) {
    let html = '';
    array.forEach((item, index) => {
        html += `<div class="item">
        <li>${item}</li>
        <i onclick="deleteTask(${index})" class="fa fa-trash"></i>
    </div>`
    })


    listItemContainer.innerHTML = html;
}

function countPending(array) {
    return array.length;
}


function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    toDoItemArray = JSON.parse(getLocalStorage);
    toDoItemArray.splice(index, 1);
    countPending(toDoItemArray);
    localStorage.setItem('New Todo', JSON.stringify(toDoItemArray));
    showList(toDoItemArray);
    // console.log(pendingNum);
    pendingItemsHtml = `<p>You have ${pendingNum-1} pending task</p>`;
    pendingItems.innerHTML = pendingItemsHtml;


}

