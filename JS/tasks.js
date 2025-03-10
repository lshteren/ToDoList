
function addList() {
    const listName = prompt("הכנס שם לרשימה חדשה:"); 
    if (!listName) {
        alert("השם לא יכול להיות ריק");
        return;
    }
    let currentUser = JSON.parse(localStorage.getItem("currentUser")); //  current username
    if (!currentUser) {
        alert("אין משתמש מחובר!");
        return;
    }

    let xhr = new FXMLHttpRequest(network);
    xhr.open("POST", "tasks");
    xhr.send({ 
        action: "createList", 
        user: currentUser.username, // current username
        name: listName 
    }, function(response) {
        if (response.success) {
            console.log("✅ רשימה נוצרה בהצלחה!");
            loadLists(); // load only this user's lists
        } else {
            console.error(" שגיאה ביצירת הרשימה:", response.message);
        }
    });
}


function loadLists() {
    //using fet request to load all lists of tasks:
    let xhr = new FXMLHttpRequest(network);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        console.error("❌ אין משתמש מחובר!");
        return;
    }
    xhr.open("GET", "tasks");
    console.log("📥 טוען רשימות עבור המשתמש:", currentUser.username);
    xhr.send({ action: "getLists", user: currentUser.username }, function(response) {
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

