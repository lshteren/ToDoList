
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
