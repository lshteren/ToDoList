//show the users lists
function getUserLists(userId) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let userTodos = todos.find(todo => todo.userId === userId);
    return userTodos ? userTodos.lists : [];
}

//add list to local storage
function addList(userId, listName) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let userTodos = todos.find(todo => todo.userId === userId);

    let newList = { id: Date.now(), name: listName, tasks: [] };

    if (userTodos) {
        userTodos.lists.push(newList);
    } else {
        todos.push({ userId, lists: [newList] });
    }

    localStorage.setItem("todos", JSON.stringify(todos));
    return newList;
}

//show the lists tasks
function getTasks(userId, listId) {
    let lists = getUserLists(userId);
    let list = lists.find(l => l.id === listId);
    return list ? list.tasks : [];
}

//add task to the list
function addTask(userId, listId, taskName) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let userTodos = todos.find(todo => todo.userId === userId);
    let list = userTodos.lists.find(l => l.id === listId);

    let newTask = { id: Date.now(), name: taskName, completed: false };
    list.tasks.push(newTask);

    localStorage.setItem("todos", JSON.stringify(todos));
    return newTask;
}

//complete and delete task
function completeTask(userId, listId, taskId) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let userTodos = todos.find(todo => todo.userId === userId);
    let list = userTodos.lists.find(l => l.id === listId);

    list.tasks = list.tasks.filter(task => task.id !== taskId);

    localStorage.setItem("todos", JSON.stringify(todos));
}

