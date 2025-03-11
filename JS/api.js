class UserDatabaseAPI {
    constructor(){
        let users = this.getUsers();
        if (!users.some(user => user.username === "admin")) {
            let adminUser = { username: "admin", email: "admin@admin.com", password: "admin" };
            users.push(adminUser);
            localStorage.setItem("storage_users", JSON.stringify(users));
            console.log(" משתמש admin נוסף למערכת!");
        }
    }

    getUsers() {
        return JSON.parse(localStorage.getItem("storage_users")) || [];
    }


    saveUser(user) {
        let users = this.getUsers();
        users.push(user);
        localStorage.setItem("storage_users", JSON.stringify(users));
    }

    setCurrentUser(user) {
        //localStorage.setItem("currentUser", JSON.stringify(user));
        if (!user || !user.username) {
            console.error("❌ שגיאה: מנסים לשמור משתמש לא תקין!", user);
            return;
        }
        console.log("💾 שומר משתמש מחובר:", user);
        localStorage.setItem("currentUser", JSON.stringify(user));
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("currentUser")) || null;
    }

    deleteUser(username) {
        let users = this.getUsers();
        let filteredUsers = users.filter(user => user.username !== username);

        if (users.length === filteredUsers.length) {
            return false; // המשתמש לא נמצא
        }

        localStorage.setItem("storage_users", JSON.stringify(filteredUsers));
        return true; // המשתמש נמחק בהצלחה
    }

    clearCurrentUser() { // מוחקת את המשתמש המחובר
        localStorage.removeItem("currentUser");
    }
}

class TaskDatabaseAPI {
    getLists(user) {
        let allLists = JSON.parse(localStorage.getItem("task_lists")) || {};
        return allLists[user] || [];
    }

    saveLists(user, lists) {
        let allLists = JSON.parse(localStorage.getItem("task_lists")) || {};
        allLists[user] = lists;
        localStorage.setItem("task_lists", JSON.stringify(allLists));
    }

    createList(user, name) {
        let lists = this.getLists(user);
        let newList = { id: Date.now(), name, tasks: [] };
        lists.push(newList);
        this.saveLists(user, lists);
        return true;
    }

    addTask(user, listId, task) {
        let lists = this.getLists(user);
        let list = lists.find(l => l.id === listId);
        if (!list) return false;

        list.tasks.push(task);
        this.saveLists(user, lists);
        return true;
    }

    toggleTask(user, listId, taskId) {
        let lists = this.getLists(user);
        let list = lists.find(l => l.id === listId);
        if (!list) return false;

        let task = list.tasks.find(t => t.id === taskId);
        if (!task) return false;

        task.completed = !task.completed;
        this.saveLists(user, lists);
        return true;
    }

    deleteTask(user, listId, taskId) {
        let lists = this.getLists(user);
        let list = lists.find(l => l.id === listId);
        if (!list) return false;

        const taskIndex = list.tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return false;

        list.tasks.splice(taskIndex, 1);
        this.saveLists(user, lists);
        return true;
    }

    deleteList(user, listId) {
        let lists = this.getLists(user);
        const listIndex = lists.findIndex(l => l.id === listId);
        if (listIndex === -1) return false;

        lists.splice(listIndex, 1);
        this.saveLists(user, lists);
        return true;
    }

    editTask(user, listId, taskId, newText) {
        let lists = this.getLists(user);
        let list = lists.find(l => l.id === listId);
        if (!list) return false;

        let task = list.tasks.find(t => t.id === taskId);
        if (!task) return false;

        task.text = newText;
        this.saveLists(user, lists);
        return true;
    }
}
