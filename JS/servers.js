class UserServer {
    constructor(databaseAPI) {
        this.databaseAPI = databaseAPI; // object to manege the API 
    }

    handleRequest(request) {
        switch (request.action) {
            case "register":
                return this.registerUser(request);
            case "login":
                return this.loginUser(request);
            case "getCurrentUser":
                return this.getCurrentUser();
            case "deleteUser":
                return this.deleteUser(request);
            case "logout":
                return this.logoutUser();
            default:
                return { success: false, message: "Invalid action." };
        }
    }

    registerUser(request) {
        let users = this.databaseAPI.getUsers();

        if (users.some(user => user.username === request.username)) {
            return { success: false, message: "Username already exists!" };
        }

        let newUser = { username: request.username, email: request.email, password: request.password };
        this.databaseAPI.saveUser(newUser);
        return { success: true, message: "User registered successfully!" };
    }

    loginUser(request) {
        let users = this.databaseAPI.getUsers();
        let user = users.find(u => u.username === request.username && u.password === request.password);

        if (!user) {
            return { success: false, message: "Wrong username or password." };
        }

        this.databaseAPI.setCurrentUser(user);
        return { success: true, user };
    }

    getCurrentUser() {
        let user = this.databaseAPI.getCurrentUser();
        return { success: !!user, user };
    }

    logoutUser() {
        this.databaseAPI.clearCurrentUser(); // erase the current user 
        return { success: true, message: "User logged out successfully." };
    }

    deleteUser(request) {
        let success = this.databaseAPI.deleteUser(request.username);
        if (!success) {
            return { success: false, message: "User not found." };
        }
        return { success: true, message: "User deleted successfully!" };
    }
}


class TaskServer {
    constructor(databaseAPI) {
        this.databaseAPI = databaseAPI;
    }

    handleRequest(request) {
        switch (request.action) {
            case "createList":
                return this.createList(request);
            case "getLists":
                return this.getLists(request);
            case "addTask":
                return this.addTask(request);
            case "toggleTask":
                return this.toggleTask(request);
            case "deleteTask":
                return this.deleteTask(request);
            case "deleteList":
                return this.deleteList(request);
            default:
                return { success: false, message: "Invalid action." };
        }
    }

    createList(request) {
        let success = this.databaseAPI.createList(request.user, request.name);
        if (!success) {
            return { success: false, message: "Failed to create list." };
        }
        return { success: true, message: "List created successfully!" };
    }

    getLists(request) {
        console.log("📤 מחזיר את הרשימות של:", request.user);
        let lists = this.databaseAPI.getLists(request.user);
        console.log("📦 רשימות שנמצאו:", lists);
        return { success: true, lists };
    }

    addTask(request) {
        let success = this.databaseAPI.addTask(request.user, request.listId, request.task);
        if (!success) {
            return { success: false, message: "Failed to add task." };
        }
        return { success: true, message: "Task added successfully!" };
    }

    toggleTask(request) {
        let success = this.databaseAPI.toggleTask(request.user, request.listId, request.taskId);
        if (!success) {
            return { success: false, message: "Failed to toggle task." };
        }
        return { success: true, message: "Task status updated!" };
    }

    deleteTask(request) {
        let success = this.databaseAPI.deleteTask(request.user, request.listId, request.taskId);
        if (!success) {
            return { success: false, message: "Failed to delete task." };
        }
        // Return the updated lists along with the success message
        let lists = this.databaseAPI.getLists(request.user);
        return { success: true, message: "Task deleted successfully!", lists };
    }

    deleteList(request) {
        let success = this.databaseAPI.deleteList(request.user, request.listId);
        if (!success) {
            return { success: false, message: "Failed to delete list." };
        }
        return { success: true, message: "List deleted successfully!" };
    }
}
