// //show the users lists
// function getUserLists(userId) {
//     let todos = JSON.parse(localStorage.getItem("todos")) || [];
//     let userTodos = todos.find(todo => todo.userId === userId);
//     return userTodos ? userTodos.lists : [];
// }

// //add list to local storage
// function addList(userId, listName) {
//     let todos = JSON.parse(localStorage.getItem("todos")) || [];
//     let userTodos = todos.find(todo => todo.userId === userId);

//     let newList = { id: Date.now(), name: listName, tasks: [] };

//     if (userTodos) {
//         userTodos.lists.push(newList);
//     } else {
//         todos.push({ userId, lists: [newList] });
//     }

//     localStorage.setItem("todos", JSON.stringify(todos));
//     return newList;
// }

// //show the lists tasks
// function getTasks(userId, listId) {
//     let lists = getUserLists(userId);
//     let list = lists.find(l => l.id === listId);
//     return list ? list.tasks : [];
// }

// //add task to the list
// function addTask(userId, listId, taskName) {
//     let todos = JSON.parse(localStorage.getItem("todos")) || [];
//     let userTodos = todos.find(todo => todo.userId === userId);
//     let list = userTodos.lists.find(l => l.id === listId);

//     let newTask = { id: Date.now(), name: taskName, completed: false };
//     list.tasks.push(newTask);

//     localStorage.setItem("todos", JSON.stringify(todos));
//     return newTask;
// }

// //complete and delete task
// function completeTask(userId, listId, taskId) {
//     let todos = JSON.parse(localStorage.getItem("todos")) || [];
//     let userTodos = todos.find(todo => todo.userId === userId);
//     let list = userTodos.lists.find(l => l.id === listId);

//     list.tasks = list.tasks.filter(task => task.id !== taskId);

//     localStorage.setItem("todos", JSON.stringify(todos));
// }


function addList() {
    const listName = prompt("הכנס שם לרשימה חדשה:"); // הצגת תיבת שיחה למשתמש
    if (listName) {
        let xhr = new FXMLHttpRequest(network);
        xhr.open("POST", "tasks");
        xhr.send({ 
            action: "createList", 
            user: "currentUser", 
            name: listName 
        }, function(response) {
            if (response.success) {
                console.log("רשימה נוצרה בהצלחה!");
                loadLists(); // טוען מחדש את הרשימות (אם אתה רוצה לעדכן את הדף)
            } else {
                console.error("שגיאה ביצירת הרשימה:", response.message);
            }
        });
    } else {
        alert("השם לא יכול להיות ריק");
    }
}


function loadLists() {
    //using fet request to load all lists of tasks:
    let xhr = new FXMLHttpRequest(network);
    //const currentUsername = (JSON.parse(localStorage.getItem("currentUser"))).username;
    xhr.open("GET", "tasks");
    xhr.send({ action: "getLists", user: currentUsername }, function(response) {
        if (!response.success) {
            console.error(" שגיאה בטעינת הרשימות:", response.message);
            return;
        }

        const listsGrid = document.getElementById("lists-grid");
        listsGrid.innerHTML = '';

        response.lists.forEach(list => {
            //creating element for each list of tasks in the main page  :
            let listCard = document.createElement("div");
            listCard.classList.add("list-card");
            listCard.textContent = list.name;
            listCard.onclick = function() { openListModal(list); };
            listsGrid.appendChild(listCard);
        });
    });
}

function openListModal(list) {
    const modal = document.getElementById("task-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalTaskList = document.getElementById("modal-task-list");

    modalTitle.textContent = list.name;
    modalTaskList.innerHTML = '';

    list.tasks.forEach(task => {
        let taskItem = document.createElement("li");
        taskItem.textContent = task.text;
        taskItem.onclick = function() { toggleTask(list.id, task.id); };
        modalTaskList.appendChild(taskItem);
    });

    modal.showModal();
}



function closeModle() {
    document.getElementById("task-modal").close();
}

