
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

    //build admin if not exist 
    adminExists() {
        let users = this.getUsers();
        if (!users.some(user => user.username === "admin")) {
            let adminUser = { username: "admin", email: "admin@admin.com", password: "admin" };
            users.push(adminUser);
            localStorage.setItem("storage_users", JSON.stringify(users));
            console.log(" משתמש admin נוסף למערכת!");
        }
    }

    saveUser(user) {
        let users = this.getUsers();
        users.push(user);
        localStorage.setItem("storage_users", JSON.stringify(users));
    }

    setCurrentUser(user) {
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
        let lists = JSON.parse(localStorage.getItem("task_lists")) || {};
        return lists[user] || [];
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

    addTask(user, listId, taskText) {
        let lists = this.getLists(user);
        let list = lists.find(l => l.id === listId);
        if (!list) return false;

        let newTask = { id: Date.now(), text: taskText, completed: false };
        list.tasks.push(newTask);
        this.saveLists(user, lists);
        return true;
    }
}
