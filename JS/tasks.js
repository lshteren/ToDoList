function loadTasks() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let userTasks = tasks.filter(task => task.userId === user.id);
    
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    
    userTasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.title;
        li.style.textDecoration = task.completed ? "line-through" : "none";
        
        li.onclick = function () {
            task.completed = !task.completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        };

        let delButton = document.createElement("button");
        delButton.textContent = "🗑";
        delButton.onclick = function (event) {
            event.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        };

        li.appendChild(delButton);
        taskList.appendChild(li);
    });
}

function addTask() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    let taskTitle = document.getElementById("taskInput").value;
    if (!taskTitle) return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ id: tasks.length + 1, userId: user.id, title: taskTitle, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("taskInput").value = "";
    loadTasks();
}
