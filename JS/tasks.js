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
            // Create list card container
            let listCard = document.createElement("div");
            listCard.classList.add("list-card");

            // Create list name element
            let listName = document.createElement("span");
            listName.textContent = list.name;
            listName.className = "list-name";
            listName.onclick = function() { openListModal(list); };

            // Create delete button
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "×";
            deleteBtn.className = "delete-list-btn";
            deleteBtn.onclick = function(e) {
                e.stopPropagation(); // Prevent opening the list
                if (confirm("Are you sure you want to delete this list and all its tasks?")) {
                    deleteList(list.id);
                }
            };

            // Add elements to list card
            listCard.appendChild(listName);
            listCard.appendChild(deleteBtn);
            listsGrid.appendChild(listCard);
        });
    });
}

function openListModal(list) {
    const modal = document.getElementById("task-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalTaskList = document.getElementById("modal-task-list");
    const newTaskInput = document.getElementById("new-task-input");

    modalTitle.textContent = list.name;
    modalTaskList.innerHTML = '';
    newTaskInput.value = ''; // Clear input field

    list.tasks.forEach(task => {
        let taskItem = document.createElement("li");
        taskItem.className = "task-item";
        
        // Create checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.className = "task-checkbox";
        checkbox.onclick = function(e) {
            e.stopPropagation(); // Prevent li click event
            toggleTask(list.id, task.id);
        };
        
        // Create task text span
        let taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.className = task.completed ? "task-text completed" : "task-text";
        
        // Add double-click to edit functionality
        taskText.ondblclick = function(e) {
            e.stopPropagation();
            const input = document.createElement("input");
            input.type = "text";
            input.className = "edit-task-input";
            input.value = task.text;
            
            // Replace text with input
            taskText.replaceWith(input);
            input.focus();
            
            // Handle input blur and enter key
            input.onblur = finishEdit;
            input.onkeydown = function(e) {
                if (e.key === "Enter") {
                    finishEdit();
                } else if (e.key === "Escape") {
                    input.replaceWith(taskText);
                }
            };
            
            function finishEdit() {
                const newText = input.value.trim();
                if (newText && newText !== task.text) {
                    editTask(list.id, task.id, newText);
                } else {
                    input.replaceWith(taskText);
                }
            }
        };
        
        // Create delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";
        deleteBtn.className = "delete-task-btn";
        deleteBtn.onclick = function(e) {
            e.stopPropagation(); // Prevent li click event
            if (confirm("Are you sure you want to delete this task?")) {
                deleteTask(list.id, task.id);
            }
        };
        
        // Add elements to task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteBtn);
        modalTaskList.appendChild(taskItem);
    });

    modal.showModal();
}

function toggleTask(listId, taskId) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        console.error("No user logged in");
        return;
    }

    let xhr = new FXMLHttpRequest(network);
    xhr.open("POST", "tasks");
    xhr.send({ 
        action: "toggleTask", 
        user: currentUser.username,
        listId: listId,
        taskId: taskId
    }, function(response) {
        if (response.success) {
            console.log("✅ Task toggled successfully!");
            loadLists(); // Refresh all lists
            // Find and reopen the current list
            const modalTitle = document.getElementById("modal-title");
            const listName = modalTitle.textContent;
            const lists = response.lists || [];
            const list = lists.find(l => l.name === listName);
            if (list) {
                openListModal(list);
            }
        } else {
            console.error("Error toggling task:", response.message);
        }
    });
}

function addTask() {
    const taskInput = document.getElementById("new-task-input");
    const taskText = taskInput.value.trim();
    const modalTitle = document.getElementById("modal-title");
    const listName = modalTitle.textContent;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!taskText) {
        alert("Task name cannot be empty");
        return;
    }

    // Get the list ID from the list object
    let xhr = new FXMLHttpRequest(network);
    xhr.open("GET", "tasks");
    xhr.send({ action: "getLists", user: currentUser.username }, function(response) {
        if (!response.success) {
            console.error("Error getting lists:", response.message);
            return;
        }

        const list = response.lists.find(l => l.name === listName);
        if (!list) {
            console.error("List not found:", listName);
            return;
        }

        // Now add the task with the correct list ID
        let addTaskXhr = new FXMLHttpRequest(network);
        addTaskXhr.open("POST", "tasks");
        addTaskXhr.send({ 
            action: "addTask", 
            user: currentUser.username,
            listId: list.id,
            task: {
                id: Date.now().toString(), // Generate a unique ID
                text: taskText,
                completed: false
            }
        }, function(response) {
            if (response.success) {
                console.log("✅ Task added successfully!");
                taskInput.value = '';
                loadLists(); // Refresh the lists
                // Refresh the modal content
                const list = response.lists.find(l => l.name === listName);
                if (list) {
                    openListModal(list);
                }
            } else {
                console.error("Error adding task:", response.message);
            }
        });
    });
}

function deleteTask(listId, taskId) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        console.error("No user logged in");
        return;
    }

    let xhr = new FXMLHttpRequest(network);
    xhr.open("POST", "tasks");
    xhr.send({ 
        action: "deleteTask", 
        user: currentUser.username,
        listId: listId,
        taskId: taskId
    }, function(response) {
        if (response.success) {
            console.log("✅ Task deleted successfully!");
            loadLists(); // Refresh all lists
            // Find and reopen the current list
            const modalTitle = document.getElementById("modal-title");
            const listName = modalTitle.textContent;
            const lists = response.lists || [];
            const list = lists.find(l => l.name === listName);
            if (list) {
                openListModal(list);
            }
        } else {
            console.error("Error deleting task:", response.message);
        }
    });
}

function deleteList(listId) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        console.error("No user logged in");
        return;
    }

    let xhr = new FXMLHttpRequest(network);
    xhr.open("POST", "tasks");
    xhr.send({ 
        action: "deleteList", 
        user: currentUser.username,
        listId: listId
    }, function(response) {
        if (response.success) {
            console.log("✅ List deleted successfully!");
            loadLists(); // Refresh the lists display
            // Close the modal if it's open
            document.getElementById("task-modal").close();
        } else {
            console.error("Error deleting list:", response.message);
        }
    });
}

function editTask(listId, taskId, newText) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        console.error("No user logged in");
        return;
    }

    let xhr = new FXMLHttpRequest(network);
    xhr.open("POST", "tasks");
    xhr.send({ 
        action: "editTask", 
        user: currentUser.username,
        listId: listId,
        taskId: taskId,
        newText: newText
    }, function(response) {
        if (response.success) {
            console.log("✅ Task edited successfully!");
            loadLists(); // Refresh all lists
            // Find and reopen the current list
            const modalTitle = document.getElementById("modal-title");
            const listName = modalTitle.textContent;
            const lists = response.lists || [];
            const list = lists.find(l => l.name === listName);
            if (list) {
                openListModal(list);
            }
        } else {
            console.error("Error editing task:", response.message);
        }
    });
}

function closeModle() {
    document.getElementById("task-modal").close();
}
