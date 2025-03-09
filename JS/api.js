
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
