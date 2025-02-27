
let storage_users = JSON.parse(localStorage.getItem("storage_users")) || [];

//create default admin user
let adminUser = {
    username: "admin",
    email: "admin@admin.co.il",
    password: "admin"
}
storage_users.push(adminUser);
localStorage.setItem("storage_users", JSON.stringify(storage_users));


function register() {
    const username = document.getElementById("uname").value;
    const password = document.getElementById("psw").value;
    const email = document.getElementById("email").value;
    const rePassword = document.getElementById("re-password").value;
    
    if (storage_users.some(user => user.username === username)) {
        alert("שם משתמש כבר קיים!");
        return false;
    }
    if (password === rePassword) { 
        storage_users.push({ email:email, username:username, password:password });
        localStorage.setItem("storage_users", JSON.stringify(storage_users));
    } else{
        return false;
    }
    return true;

}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // let storage_users = JSON.parse(localStorage.getItem("users")) || [];
    const user = storage_users.find(user => user.username === username && user.password === password);
    if (!user) {
        return false;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    //loadTasks();

    return user;
}

function logout() {
    localStorage.removeItem("currentUser");
}
